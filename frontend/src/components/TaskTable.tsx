import {
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";

interface TableProps {
  data: any;
  taskCount: number;
  rowsPerPage: number;
  page: number;
  handleChangePage: any;
  handleChangeRowsPerPage: any;
}
export const TaskTable = ({
  data,
  taskCount,
  rowsPerPage,
  page,
  handleChangePage,
  handleChangeRowsPerPage,
}: TableProps) => {
  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 600 }}>
        <Table stickyHeader sx={{ minWidth: 650 }} aria-label="task table">
          <TableHead>
            <TableRow>
              <TableCell
                sx={{ backgroundColor: "rgb(40, 44, 52)", color: "white" }}
              >
                Task owner
              </TableCell>
              <TableCell
                sx={{ backgroundColor: "rgb(40, 44, 52)", color: "white" }}
              >
                Email
              </TableCell>
              <TableCell
                sx={{ backgroundColor: "rgb(40, 44, 52)", color: "white" }}
              >
                Task date
              </TableCell>
              <TableCell
                sx={{ backgroundColor: "rgb(40, 44, 52)", color: "white" }}
              >
                Task description
              </TableCell>
              <TableCell
                sx={{ backgroundColor: "rgb(40, 44, 52)", color: "white" }}
              >
                Status
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data.map((row: any) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.taskDate}</TableCell>
                  <TableCell>{row.taskDescription}</TableCell>
                  <TableCell>{row.status}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 20]}
        component="div"
        count={taskCount}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};
