import { Box, Stack, TextField, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { fetchTaskPerString } from "../../utils/axios";
import { useEffect, useState } from "react";
import { TasksTable } from "../organisms/TaskTable";

export const SearchByStringPanel = () => {
  const [string, setString] = useState<string>("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const { data, refetch } = useQuery({
    queryKey: ["tasksPerString"],
    queryFn: async () => {
      const response = await fetchTaskPerString(string);
      return response.data;
    },
    enabled: false,
  });

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      if (string.length > 0) refetch();
    }, 1000);

    return () => {
      clearTimeout(handler);
    };
  }, [string, refetch]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setString(event.target.value);
  };

  return (
    <Stack
      display={"flex"}
      flexDirection={"column"}
      gap={"2rem"}
      alignItems={"stretch"}
      margin={"20px"}
    >
      <Box textAlign={"left"}>
        <Typography variant="h5" paddingBottom={"1rem"}>
          Filter tasks by string
        </Typography>
        <TextField
          fullWidth
          id="outlined-controlled"
          label="Description"
          value={string}
          onChange={handleInputChange}
        />
      </Box>
      <Box textAlign={"left"}>
        {!data ? (
          <Typography>There is no data to display.</Typography>
        ) : data.length === 0 ? (
          <Typography>
            There are no results matching your search string.
          </Typography>
        ) : (
          <Typography>{data.length} results</Typography>
        )}
      </Box>
      {!!data && (
        <TasksTable
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
          refetch={refetch}
        />
      )}
    </Stack>
  );
};
