import {
  Autocomplete,
  Box,
  Button,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import dayjs, { Dayjs } from "dayjs";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { ChangeEvent, useReducer, useState } from "react";
import Papa from "papaparse";
import DeleteIcon from "@mui/icons-material/Delete";
import { User, csvItem } from "../../types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createTasks, fetchUsers } from "../../utils/axios";

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
