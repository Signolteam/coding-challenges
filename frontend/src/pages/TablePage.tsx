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
import { AllTasksTable } from "../components/TaskTable";
import { AllTasksPanel } from "../components/AllTasksPanel";
import { TaskTab } from "../components/TaskTab";
import { ViewByDatePanel } from "../components/ViewByDatePanel";

export const TablePage = () => {
  //for tabs
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
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
      </Box>
      <TaskTab value={value} handleChange={handleChange} />
      {value === 0 && <AllTasksPanel />}
      {value === 1 && <ViewByDatePanel />}
    </Stack>
  );
};
