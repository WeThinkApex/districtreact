import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TablePagination,
} from '@mui/material';
import './TableTemplate.css'; // Import CSS file

const TableTemplate = ({ buttonHaver: ButtonHaver, columns, rows }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  return (
    <div className="table-wrapper">
      <TableContainer className="table-container">
        <Table stickyHeader aria-label="sticky table" className="styled-table">
          <TableHead>
            <tr className="table-header-row">
              {columns.map((column) => (
                <th
                  key={column.id}
                  className="table-header-cell"
                  style={{ minWidth: column.minWidth, textAlign: column.align }}
                >
                  {column.label}
                </th>
              ))}
              <th className="table-header-cell" style={{ textAlign: 'center' }}>
                Actions
              </th>
            </tr>
          </TableHead>

          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <tr className="table-row" key={row.id}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <td
                        key={column.id}
                        className="table-cell"
                        style={{ textAlign: column.align }}
                      >
                        {column.format && typeof value === 'number'
                          ? column.format(value)
                          : value}
                      </td>
                    );
                  })}
                  <td className="table-cell action-cell">
                    <ButtonHaver row={row} />
                  </td>
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

export default TableTemplate;
