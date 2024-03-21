import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";

import { renderStatusBox } from "../molecules/StatusBox";
import { useWindowDimensions } from "../../utils/mediaQuery";
import { Task } from "../../types";

interface TableProps {
  data: Task[];
  taskCount: number;
  rowsPerPage: number;
  page: number;
  handleChangePage: (event: unknown, newPage: number) => void;
  handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void;
  refetch?: () => void;
}

export const TasksTable = ({
  data,
  taskCount,
  rowsPerPage,
  page,
  handleChangePage,
  handleChangeRowsPerPage,
  refetch,
}: TableProps) => {
  const { width } = useWindowDimensions();
  return width > 900 ? (
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
                Company
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
              data.map((row: Task, index: number) => (
                <TableRow
                  key={`row-${row.id}-${index}`}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{ maxWidth: "200px" }}
                  >
                    <Typography
                      sx={{
                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: "1",
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                      }}
                    >
                      {row.name}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ maxWidth: "200px" }}>
                    <Typography
                      sx={{
                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: "1",
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                      }}
                    >
                      {row.email}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography width={"100px"}>
                      {row.taskDate.substring(0, 10)}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ maxWidth: "340ch" }}>
                    <Typography
                      sx={{
                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: "3",
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                      }}
                    >
                      {row.taskDescription}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ maxWidth: "50ch" }}>
                    <Typography
                      sx={{
                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: "1",
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                      }}
                    >
                      {row.company}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ width: width > 1240 ? "230px" : "auto" }}>
                    {renderStatusBox(row.status, row.id, refetch)}
                  </TableCell>
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
  ) : (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer>
        <Table aria-label="mobile-task table">
          <TableHead>
            <TableRow>
              <TableCell
                sx={{ backgroundColor: "rgb(40, 44, 52)", color: "white" }}
              >
                Task details
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data.map((row: Task, index: number) => (
                <TableRow
                  key={`card-${row.id}-${index}`}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <Box
                      display={"flex"}
                      flexDirection={"column"}
                      gap={"0.5rem"}
                    >
                      <Typography
                        sx={{
                          display: "-webkit-box",
                          WebkitBoxOrient: "vertical",
                          WebkitLineClamp: "1",
                          textOverflow: "ellipsis",
                          overflow: "hidden",
                        }}
                      >
                        Task owner: {row.name}
                      </Typography>
                      <Typography
                        sx={{
                          display: "-webkit-box",
                          WebkitBoxOrient: "vertical",
                          WebkitLineClamp: "1",
                          textOverflow: "ellipsis",
                          overflow: "hidden",
                        }}
                      >
                        Owner email: {row.email}
                      </Typography>
                      <Typography
                        sx={{
                          display: "-webkit-box",
                          WebkitBoxOrient: "vertical",
                          WebkitLineClamp: "1",
                          textOverflow: "ellipsis",
                          overflow: "hidden",
                        }}
                      >
                        Owner company: {row.company}
                      </Typography>
                      <Typography>
                        Task date: {row.taskDate.substring(0, 10)}
                      </Typography>
                      <Typography
                        sx={{
                          display: "-webkit-box",
                          WebkitBoxOrient: "vertical",
                          WebkitLineClamp: "3",
                          textOverflow: "ellipsis",
                          overflow: "hidden",
                        }}
                      >
                        Task description: {row.taskDescription}
                      </Typography>
                      <Box>{renderStatusBox(row.status, row.id, refetch)}</Box>
                    </Box>
                  </TableCell>
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
