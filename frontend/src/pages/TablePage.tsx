import {
  Box,
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
import { useQuery } from "@tanstack/react-query";
import { fetchTaskCount, fetchTaskList, fetchTaskPage } from "../utils";
import { useEffect, useState } from "react";
import { TaskTable } from "../components/TaskTable";

export const TablePage = () => {
  const { data, error, refetch } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const response = await fetchTaskPage(page, rowsPerPage);
      console.log(response);
      return response;
    },
  });

  const { data: taskCount, error: taskCountError } = useQuery({
    queryKey: ["taskCount"],
    queryFn: fetchTaskCount,
  });

  console.log(data);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  useEffect(() => {
    refetch();
  }, [page]);

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Stack
      display={"flex"}
      flexDirection={"column"}
      alignItems={"stretch"}
      margin={"50px"}
    >
      <Box textAlign={"left"}>
        <h1>Tasks</h1>
        <h2>All tasks - {taskCount}</h2>
        <h2>Result table</h2>
      </Box>
      {data && (
        <TaskTable
          data={data}
          taskCount={taskCount}
          page={page}
          rowsPerPage={rowsPerPage}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
        />
      )}
    </Stack>
  );
};
