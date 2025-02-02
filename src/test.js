import React, { useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getExpandedRowModel,
  ColumnDef,
} from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  IconButton,
} from '@mui/material';
import { ArrowDropUp, ArrowDropDown, ExpandMore, ExpandLess } from '@mui/icons-material';
import DOMPurify from 'dompurify';

// Define the data structure
interface RowData {
  id: number;
  name: string;
  age: number;
  job: string;
  description: string;
  fixtext: string;
}

const data: RowData[] = [
  {
    id: 1,
    name: "Alice",
    age: 30,
    job: "Engineer",
    description:
      "<xhtml:div><xhtml:p>This security setting requires changes</xhtml:p><xhtml:div><xhtml:a>some link</xhtml:a> <xhtml:code>some code here</xhtml:code></xhtml:div></xhtml:div>",
    fixtext:
      "<xhtml:div>Working at <xhtml:a href='https://example.com'>XYZ Corp.</xhtml:a></xhtml:div><xhtml:p>Has experience in various technologies.</xhtml:p>",
  },
  {
    id: 2,
    name: "Bob",
    age: 25,
    job: "Designer",
    description:
      "<xhtml:div><xhtml:p>Bob is a creative designer. <xhtml:code>CSS</xhtml:code> and <xhtml:code>Photoshop</xhtml:code> are his main tools.</xhtml:p></xhtml:div>",
    fixtext:
      "<xhtml:div>Freelancer working with various clients.</xhtml:div><xhtml:p>Specialized in UI/UX design.</xhtml:p>",
  },
  // Add more data entries as needed...
];

const columns: ColumnDef<RowData>[] = [
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'age', header: 'Age' },
  { accessorKey: 'job', header: 'Job' },
  { accessorKey: 'id', header: 'ID' },
];

// Function to parse custom xhtml tags and sanitize the HTML using DOMPurify
const parseAndSanitizeHtml = (html: string): string => {
  const parsedHtml = html
    .replace(/<xhtml:div>/g, '<div>')
    .replace(/<\/xhtml:div>/g, '</div>')
    .replace(/<xhtml:p>/g, '<p>')
    .replace(/<\/xhtml:p>/g, '</p>')
    .replace(/<xhtml:a>/g, '<a>')
    .replace(/<\/xhtml:a>/g, '</a>')
    .replace(/<xhtml:code>/g, '<code>')
    .replace(/<\/xhtml:code>/g, '</code>');
  return DOMPurify.sanitize(parsedHtml);
};

const TableComponent: React.FC = () => {
  // Global state for search, sorting, pagination, and expanded rows.
  const [globalFilter, setGlobalFilter] = useState<string>('');
  const [sorting, setSorting] = useState<any[]>([]);
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const [expanded, setExpanded] = useState<{ [key: number]: boolean }>(() =>
    data.reduce((acc, _, index) => {
      acc[index] = true; // Initially expand all rows
      return acc;
    }, {} as { [key: number]: boolean })
  );

  const table = useReactTable<RowData>({
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
      // Custom filter function that searches across all row fields,
      // including expanded section data (description, fixtext, and id)
      text: (row, columnId, filterValue) => {
        const cellValue = row.getValue(columnId);
        const { description, fixtext, id } = row.original;
        const fullText = `${String(cellValue)} ${description} ${fixtext} ${id}`.toLowerCase();
        return fullText.includes(filterValue.toLowerCase());
      },
    },
  });

  // Expand all rows
  const expandAllRows = () => {
    const newExpanded = data.reduce((acc, _, index) => {
      acc[index] = true;
      return acc;
    }, {} as { [key: number]: boolean });
    setExpanded(newExpanded);
  };

  // Collapse all rows
  const collapseAllRows = () => {
    const newExpanded = data.reduce((acc, _, index) => {
      acc[index] = false;
      return acc;
    }, {} as { [key: number]: boolean });
    setExpanded(newExpanded);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      {/* Header: Search Field and Expand/Collapse All Buttons (aligned horizontally) */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
        <TextField
          label="Search"
          variant="outlined"
          size="small"
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          style={{ width: '200px' }}
        />
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <IconButton onClick={expandAllRows}>
            <ExpandMore />
          </IconButton>
          <IconButton onClick={collapseAllRows}>
            <ExpandLess />
          </IconButton>
        </div>
      </div>

      {/* Table */}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Expand</TableCell>
              {table.getHeaderGroups().map((headerGroup) =>
                headerGroup.headers.map((header) => (
                  <TableCell
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    style={{ cursor: 'pointer', backgroundColor: '#f1f1f1' }}
                  >
                    {header.column.columnDef.header}
                    {header.column.getIsSorted() === 'asc'
                      ? ' 🔼'
                      : header.column.getIsSorted() === 'desc'
                      ? ' 🔽'
                      : ''}
                  </TableCell>
                ))
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <React.Fragment key={row.id}>
                <TableRow>
                  <TableCell>
                    <IconButton onClick={row.getToggleExpandedHandler()}>
                      {row.getIsExpanded() ? <ArrowDropUp /> : <ArrowDropDown />}
                    </IconButton>
                  </TableCell>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{cell.renderValue()}</TableCell>
                  ))}
                </TableRow>
                {row.getIsExpanded() && (
                  <TableRow>
                    <TableCell colSpan={columns.length + 1}>
                      <div>
                        <strong>ID:</strong> {row.original.id}
                        <br />
                        <strong>Description:</strong>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: parseAndSanitizeHtml(row.original.description),
                          }}
                          style={{ padding: '10px 0' }}
                        />
                        <strong>Fixtext:</strong>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: parseAndSanitizeHtml(row.original.fixtext),
                          }}
                          style={{ padding: '10px 0' }}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination Controls aligned to the bottom-right */}
      <TablePagination
        component="div"
        count={data.length}
        page={pagination.pageIndex}
        onPageChange={(event, newPage) =>
          setPagination({ ...pagination, pageIndex: newPage })
        }
        rowsPerPage={pagination.pageSize}
        onRowsPerPageChange={(event) =>
          setPagination({ ...pagination, pageSize: Number(event.target.value) })
        }
      />
    </div>
  );
};

export default TableComponent;
