import React, { useState } from 'react';
import { Table, TableBody, TableContainer, TableHead, TablePagination } from '@mui/material';
import './TableViewTemplate.css'; // Import CSS file

const TableViewTemplate = ({ columns, rows }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  return (
    <div className="table-view-wrapper">
      <TableContainer className="table-view-container">
        <Table stickyHeader aria-label="sticky table" className="table-view">
          <TableHead>
            <tr className="table-view-header-row">
              {columns.map((column, index) => (
                <th
                  key={index}
                  className="table-view-header-cell"
                  style={{ minWidth: column.minWidth, textAlign: column.align }}
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </TableHead>

          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <tr className="table-view-row" key={row.id}>
                  {columns.map((column, index) => {
                    const value = row[column.id];
                    return (
                      <td
                        key={index}
                        className="table-view-cell"
                        style={{ textAlign: column.align }}
                      >
                        {column.format && typeof value === 'number'
                          ? column.format(value)
                          : value}
                      </td>
                    );
                  })}
                </tr>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(event, newPage) => setPage(newPage)}
        onRowsPerPageChange={(event) => {
          setRowsPerPage(parseInt(event.target.value, 10));
          setPage(0);
        }}
      />
    </div>
  );
};

export default TableViewTemplate;
