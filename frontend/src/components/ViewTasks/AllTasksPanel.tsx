import { Box, Stack } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { fetchTaskCount, fetchTaskPage } from "../../utils/axios";
import { useEffect, useState } from "react";
import { TasksTable } from "../organisms/TaskTable";

export const AllTasksPanel = () => {
  const { data, error, refetch } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const response = await fetchTaskPage(page, rowsPerPage);
      return response;
    },
  });

  const { data: taskCount, error: taskCountError } = useQuery({
    queryKey: ["taskCount"],
    queryFn: fetchTaskCount,
  });

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
      margin={"20px"}
    >
      <Box textAlign={"left"}>
        <h2>
          All tasks {"("}
          {taskCount ? taskCount : 0}
          {")"}
        </h2>
      </Box>
      {!!data && !!taskCount && (
        <TasksTable
          data={data}
          taskCount={taskCount}
          page={page}
          rowsPerPage={rowsPerPage}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          refetch={refetch}
        />
      )}
    </Stack>
  );
};
