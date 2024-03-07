import { Box, Stack, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { fetchTaskCount, fetchTaskPage, fetchTaskPerDate } from "../utils";
import { useEffect, useState } from "react";
import { AllTasksTable } from "../components/TaskTable";
import { DateFilter } from "./DateFilter";
import dayjs, { Dayjs } from "dayjs";

export const ViewByDatePanel = () => {
  const [start, setStart] = useState<Dayjs>(dayjs());
  const [end, setEnd] = useState<Dayjs>(dayjs().add(1, "day"));

  const { data, error, refetch } = useQuery({
    queryKey: ["tasksPerDate"],
    queryFn: async () => {
      const response = await fetchTaskPerDate(
        start.format("YYYY-MM-DD"),
        end.format("YYYY-MM-DD")
      );
      console.log(response);
      return response.data;
    },
    enabled: false,
  });

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

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
        <Typography variant="h5" paddingBottom={"1rem"}>
          Filter tasks by date range
        </Typography>
      </Box>
      <DateFilter
        handleDateSearch={() => {
          refetch();
        }}
        start={start}
        end={end}
        setStart={setStart}
        setEnd={setEnd}
      />
      {!!data && (
        <AllTasksTable
          data={
            rowsPerPage > 0
              ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : data
          }
          taskCount={data.length}
          page={page}
          rowsPerPage={rowsPerPage}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
        />
      )}
    </Stack>
  );
};
