import React, { useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getExpandedRowModel,
  flexRender,
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

function TableComponent({ data, columns, renderExpandedContent }) {
  const [globalFilter, setGlobalFilter] = useState('');
  const [sorting, setSorting] = useState([]);
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  // TanStack Table expects the expanded state to be an object with string keys.
  const [expanded, setExpanded] = useState(() =>
    data.reduce((acc, _, index) => {
      acc[index.toString()] = true;
      return acc;
    }, {})
  );

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
      // Custom filter function that searches across all row fields
      text: (row, columnId, filterValue) => {
        const cellValue = row.getValue(columnId);
        const { description, fixtext, id } = row.original;
        const fullText = `${String(cellValue)} ${description} ${fixtext} ${id}`.toLowerCase();
        return fullText.includes(filterValue.toLowerCase());
      },
    },
  });

  const expandAllRows = () => {
    const newExpanded = data.reduce((acc, _, index) => {
      acc[index.toString()] = true;
      return acc;
    }, {});
    setExpanded(newExpanded);
  };

  const collapseAllRows = () => {
    const newExpanded = data.reduce((acc, _, index) => {
      acc[index.toString()] = false;
      return acc;
    }, {});
    setExpanded(newExpanded);
  };

  // Function to parse custom <xhtml:*> tags and sanitize the HTML using DOMPurify.
  const parseAndSanitizeHtml = (html) => {
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

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      {/* Header: Search Field and Expand/Collapse All Buttons */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '10px',
        }}
      >
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
        <Table style={{ border: '1px solid lightblue', borderCollapse: 'collapse' }}>
          <TableHead>
            <TableRow style={{ backgroundColor: 'lightblue', height: '30px' }}>
              {/* Narrow Expand column */}
              <TableCell style={{ width: '30px', textAlign: 'center', padding: '4px', border: '1px solid lightblue' }}>
                Expand
              </TableCell>
              {table.getHeaderGroups().map((headerGroup) =>
                headerGroup.headers.map((header) => {
                  // Increase width for the "Name" column.
                  const extraStyle =
                    header.column.columnDef.accessorKey === 'name'
                      ? { width: '300px' }
                      : {};
                  return (
                    <TableCell
                      key={header.id}
                      onClick={header.column.getToggleSortingHandler()}
                      style={{
                        cursor: 'pointer',
                        backgroundColor: 'lightblue',
                        padding: '4px',
                        height: '30px',
                        border: '1px solid lightblue',
                        ...extraStyle,
                      }}
                    >
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {header.column.getIsSorted() === 'asc'
                        ? ' 🔼'
                        : header.column.getIsSorted() === 'desc'
                        ? ' 🔽'
                        : ''}
                    </TableCell>
                  );
                })
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <React.Fragment key={row.id}>
                <TableRow style={{ height: '30px' }}>
                  <TableCell style={{ textAlign: 'center', padding: '4px', border: '1px solid lightblue' }}>
                    <IconButton onClick={row.getToggleExpandedHandler()} style={{ padding: '4px' }}>
                      {row.getIsExpanded() ? <ArrowDropUp fontSize="small" /> : <ArrowDropDown fontSize="small" />}
                    </IconButton>
                  </TableCell>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} style={{ padding: '4px', border: '1px solid lightblue' }}>
                      {flexRender(cell.column.columnDef.cell || (() => cell.renderValue()), cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
                {row.getIsExpanded() && (
                  <TableRow style={{ height: '30px' }}>
                    <TableCell colSpan={columns.length + 1} style={{ padding: '4px', border: '1px solid lightblue' }}>
                      {renderExpandedContent ? (
                        renderExpandedContent(row.original)
                      ) : (
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
                      )}
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={data.length}
        page={pagination.pageIndex}
        onPageChange={(event, newPage) => setPagination({ ...pagination, pageIndex: newPage })}
        rowsPerPage={pagination.pageSize}
        onRowsPerPageChange={(event) =>
          setPagination({ ...pagination, pageSize: Number(event.target.value) })
        }
      />
    </div>
  );
}

export default TableComponent;
