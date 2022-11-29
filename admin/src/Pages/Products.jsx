import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import axios from "axios";
import { Box } from "@mui/system";
import { Button } from "@mui/material";
import { Edit } from "@mui/icons-material";
const columns = [
  { id: "name", label: "Name", minWidth: 200, align: "center" },
  { id: "category", label: "Category", minWidth: 30, align: "center" },
  {
    id: "price",
    label: "Price (PKR)",
    minWidth: 30,
    align: "center",
    // format: (value) => "PKR " + value.toLocaleString("en-US"),
  },
  {
    id: "quantity",
    label: "Quantity Available",
    minWidth: 30,
    align: "center",
  },
  { id: "NumberSold", label: "Quantity Sold", minWidth: 30, align: "center" },
  {
    id: "Warranty",
    label: "Warranty",
    minWidth: 30,
    align: "center",
  },
  {
    id: "Return",
    label: "Return",
    minWidth: 30,
    align: "center",
  },
  {
    id: "StandardShipping",
    label: "Standard Shipping",
    minWidth: 30,
    align: "center",
  },
  {
    id: "FastShipping",
    label: "Fast Shipping",
    minWidth: 30,
    align: "center",
  },
  { id: "createdAt", label: "Date Added", minWidth: 30, align: "center" },
];

export default function Products() {
  const [users, setUsers] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  React.useEffect(() => {
    fetchUsers();
    return () => {};
  }, []);

  const fetchUsers = () => {
    // const data = { userId: user._id };
    axios.get("http://localhost:8000/shop/showAllProducts").then((res) => {
      console.log(res.data.products);
      setUsers(res.data.products);
    });
  };

  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: "50px",
          backgroundColor: "white",
          borderBottom: "1px solid #c2c2c2",
        }}
      ></Box>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth, fontWeight: "700" }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {users
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {
                              // (column.format && typeof value === "boolean") ||
                              // typeof value === "number"
                              //   ? column.format(value)
                              //   :
                              value
                            }
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={users.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
}
