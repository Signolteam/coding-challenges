import { Stack, Typography } from "@mui/material";

import { FileUpload } from "../organisms/FileUpload";
import { TaskForm } from "../organisms/TaskForm";

export const AddTasksPanel = () => {
  return (
    <Stack display={"flex"} textAlign={"left"} gap={"2rem"}>
      <Typography variant="h6"> Add tasks by uploading a csv file</Typography>
      <FileUpload />

      <Typography variant="h6"> Or add a task manually</Typography>
      <TaskForm />
    </Stack>
  );
};
