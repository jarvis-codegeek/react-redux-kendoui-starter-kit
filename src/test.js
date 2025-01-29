components={{
          Footer: () => (
            <Grid container alignItems="center" justifyContent="space-between" sx={{ p: 1, bgcolor: "gray.100" }}>
              <Typography variant="body2">Total Results: {rows.length}</Typography>
              <Grid item>
                {/* Default MUI pagination controls */}
                <DataGrid.Pagination />
              </Grid>
            </Grid>
          ),
        }}
