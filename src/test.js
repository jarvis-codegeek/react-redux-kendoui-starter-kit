import React, { useState } from "react";
import { useReactTable, getCoreRowModel, getSortedRowModel, getFilteredRowModel, getPaginationRowModel, getExpandedRowModel } from "@tanstack/react-table";
import { ArrowDropUp, ArrowDropDown, ExpandMore, ExpandLess } from "@mui/icons-material"; // Import MUI Icons
import DOMPurify from "dompurify"; // Import DOMPurify for sanitization

const data = [
  {
    id: 1,
    name: "Alice",
    description: "<xhtml:div><xhtml:p>This security setting requires changes</xhtml:p><xhtml:div><xhtml:a>some link</xhtml:a> <xhtml:code>some code here</xhtml:code></xhtml:div></xhtml:div>",
    fixtext: "<xhtml:div>Working at <xhtml:a href='https://example.com'>XYZ Corp.</xhtml:a></xhtml:div><xhtml:p>Has experience in various technologies.</xhtml:p>",
  },
  {
    id: 2,
    name: "Bob",
    description: "<xhtml:div><xhtml:p>Bob is a creative designer. <xhtml:code>CSS</xhtml:code> and <xhtml:code>Photoshop</xhtml:code> are his main tools.</xhtml:p></xhtml:div>",
    fixtext: "<xhtml:div>Freelancer working with various clients.</xhtml:div><xhtml:p>Specialized in UI/UX design.</xhtml:p>",
  }
];

const columns = [
  { accessorKey: "name", header: "Name" },
];

// Function to parse the xhtml tags and sanitize the input text using DOMPurify
const parseAndSanitizeHtml = (html) => {
  // Replace custom <xhtml:div>, <xhtml:p>, <xhtml:a>, <xhtml:code> tags with standard HTML tags
  const parsedHtml = html
    .replace(/<xhtml:div>/g, "<div>")
    .replace(/<\/xhtml:div>/g, "</div>")
    .replace(/<xhtml:p>/g, "<p>")
    .replace(/<\/xhtml:p>/g, "</p>")
    .replace(/<xhtml:a>/g, "<a>")
    .replace(/<\/xhtml:a>/g, "</a>")
    .replace(/<xhtml:code>/g, "<code>")
    .replace(/<\/xhtml:code>/g, "</code>");

  // Sanitize the parsed HTML using DOMPurify
  return DOMPurify.sanitize(parsedHtml);
};

export default function TableComponent() {
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState([]);
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });

  // Set all rows expanded by default
  const [expanded, setExpanded] = useState(() => {
    return data.reduce((acc, _, index) => {
      acc[index] = true; // Expand all rows initially
      return acc;
    }, {});
  });

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    state: { globalFilter, sorting, expanded, pagination },
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    onExpandedChange: setExpanded,
    onPaginationChange: setPagination,
    getRowCanExpand: () => true,
    filterFns: {
      // Custom filter to apply on all columns for global search
      text: (row, columnId, filterValue) => {
        const cellValue = row.getValue(columnId);

        // Access expanded data (description, fixtext, id) for the current row
        const expandedData = row.original;
        const fullText = `${String(cellValue)} ${expandedData.description} ${expandedData.fixtext} ${expandedData.id}`.toLowerCase();

        // Perform search on the fullText (column data + expanded section data)
        return fullText.includes(filterValue.toLowerCase());
      },
    },
  });

  // Function to expand all rows
  const expandAllRows = () => {
    const newExpanded = data.reduce((acc, _, index) => {
      acc[index] = true; // Expand all rows
      return acc;
    }, {});
    setExpanded(newExpanded);
  };

  // Function to collapse all rows
  const collapseAllRows = () => {
    const newExpanded = data.reduce((acc, _, index) => {
      acc[index] = false; // Collapse all rows
      return acc;
    }, {});
    setExpanded(newExpanded);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      {/* Header with Search and Expand/Collapse Buttons */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search..."
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          style={{
            padding: "5px",
            width: "200px",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        />

        {/* Expand/Collapse All Buttons */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <button
            onClick={expandAllRows}
            style={{
              padding: "5px 10px",
              marginLeft: "10px",
              display: "flex",
              alignItems: "center",
              gap: "5px",
            }}
          >
            <ExpandMore /> Expand All
          </button>
          <button
            onClick={collapseAllRows}
            style={{
              padding: "5px 10px",
              marginLeft: "10px",
              display: "flex",
              alignItems: "center",
              gap: "5px",
            }}
          >
            <ExpandLess /> Collapse All
          </button>
        </div>
      </div>

      {/* Table */}
      <table border="1" cellPadding="5" style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              <th style={{ width: "50px", textAlign: "center" }}>Expand</th>
              {headerGroup.headers.map((header) => (
                <th key={header.id} onClick={header.column.getToggleSortingHandler()} style={{ cursor: "pointer", padding: "8px", backgroundColor: "#f1f1f1" }}>
                  {header.column.columnDef.header}{" "}
                  {header.column.getIsSorted() === "asc" ? "🔼" : header.column.getIsSorted() === "desc" ? "🔽" : ""}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <React.Fragment key={row.id}>
              <tr>
                <td style={{ width: "50px", textAlign: "center" }}>
                  <button
                    onClick={row.getToggleExpandedHandler()}
                    style={{ border: "none", background: "none", cursor: "pointer", fontSize: "16px" }}
                  >
                    {row.getIsExpanded() ? <ArrowDropUp /> : <ArrowDropDown />} {/* Use MUI icons */}
                  </button>
                </td>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} style={{ padding: "8px" }}>{cell.renderValue()}</td>
                ))}
              </tr>
              {row.getIsExpanded() && (
                <tr>
                  <td colSpan={columns.length + 1} style={{ backgroundColor: "#f9f9f9", padding: "10px" }}>
                    {/* Render ID */}
                    <div><strong>ID:</strong> {row.original.id}</div>
                    <strong>Description:</strong>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: parseAndSanitizeHtml(row.original.description),
                      }}
                      style={{ padding: "10px 0" }}
                    />
                    <strong>Fixtext:</strong>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: parseAndSanitizeHtml(row.original.fixtext),
                      }}
                      style={{ padding: "10px 0" }}
                    />
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div
        style={{
          marginTop: "10px",
          display: "flex",
          justifyContent: "flex-end", // Align to the right
          alignItems: "center",
        }}
      >
        {/* Previous Page Button */}
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          style={{
            padding: "5px 10px",
            marginRight: "5px",
            cursor: table.getCanPreviousPage() ? "pointer" : "not-allowed",
          }}
        >
          ⬅️ Previous
        </button>

        {/* Page Number Indicator */}
        <span style={{ margin: "0 10px" }}>
          Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </span>

        {/* Next Page Button */}
        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          style={{
            padding: "5px 10px",
            marginLeft: "5px",
            cursor: table.getCanNextPage() ? "pointer" : "not-allowed",
          }}
        >
          Next ➡️
        </button>

        {/* Page Size Dropdown */}
        <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => table.setPageSize(Number(e.target.value))}
          style={{ marginLeft: "10px", padding: "5px" }}
        >
          {[5, 10, 15, 20].map((size) => (
            <option key={size} value={size}>
              Show {size}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
