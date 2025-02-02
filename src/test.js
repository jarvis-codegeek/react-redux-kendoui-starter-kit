<TableHead>
  <TableRow>
    <TableCell style={{ width: '30px', textAlign: 'center' }}>Expand</TableCell>
    {table.getHeaderGroups().map(headerGroup =>
      headerGroup.headers.map(header => {
        // If the accessorKey is 'name', apply extra style to increase its width.
        const extraStyle: React.CSSProperties =
          header.column.columnDef.accessorKey === 'name'
            ? { width: '300px' }
            : {};
        return (
          <TableCell
            key={header.id}
            onClick={header.column.getToggleSortingHandler()}
            style={{ cursor: 'pointer', backgroundColor: '#f1f1f1', ...extraStyle }}
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
