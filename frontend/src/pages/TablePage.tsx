import {
  Box,
  Button,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { fetchTaskCount, fetchTaskList, fetchTaskPage } from "../utils";
import { useEffect, useState } from "react";
import { AllTasksTable } from "../components/TaskTable";
import { AllTasksPanel } from "../components/AllTasksPanel";
import { TaskTab } from "../components/TaskTab";
import { ViewByDatePanel } from "../components/ViewByDatePanel";
import { AddTasksPanel } from "../components/AddTasksPanel";

export const TablePage = () => {
  //for add tasks options
  const [add, setAdd] = useState(false);

  //for view tasks tabs
  const [value, setValue] = useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Stack
      display={"flex"}
      flexDirection={"column"}
      alignItems={"stretch"}
      margin={"0 50px"}
    >
      <Box
        margin={"50px 0"}
        display={"flex"}
        flexDirection={"row"}
        justifyContent={"space-between"}
        textAlign={"left"}
      >
        <Typography variant="h4">Tasks</Typography>
        <Button
          variant={!add ? "contained" : "outlined"}
          onClick={() => setAdd(!add)}
        >
          {!add ? "Add tasks" : "Back"}{" "}
        </Button>
      </Box>
      {!!add ? (
        <AddTasksPanel />
      ) : (
        <>
          <TaskTab value={value} handleChange={handleChange} />
          {value === 0 && <AllTasksPanel />}
          {value === 1 && <ViewByDatePanel />}
        </>
      )}
    </Stack>
  );
};
