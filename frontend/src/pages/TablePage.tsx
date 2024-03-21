import { Box, Button, Stack, Typography } from "@mui/material";

import { useState } from "react";
import { AllTasksPanel } from "../components/ViewTasks/AllTasksPanel";
import { TaskTab } from "../components/ViewTasks/TaskTab";
import { ViewByDatePanel } from "../components/ViewTasks/ViewByDatePanel";
import { AddTasksPanel } from "../components/AddTasks/AddTasksPanel";
// import { fetchTaskList } from "../utils/axios";
// import { useQuery } from "@tanstack/react-query";
import { SearchByStringPanel } from "../components/ViewTasks/SearchByStringPanel";

export const TablePage = () => {
  //for add tasks panel
  const [add, setAdd] = useState(false);

  //for view tasks tabs/panels
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
          {value === 2 && <SearchByStringPanel />}
        </>
      )}
    </Stack>
  );
};
