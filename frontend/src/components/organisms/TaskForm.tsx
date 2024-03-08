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
import { createOneTask, createTasks, fetchUsers } from "../../utils/axios";
export const TaskForm = () => {
  const [user, setUser] = useState<User>();
  const [createStatus, setCreateStatus] = useState<String | null>(null);
  const initialState = {
    name: "",
    email: "",
    company: "",
    taskDate: "",
    taskDescription: "",
  };
  const reducer = (state: any, action: { type: string; value: any }) => {
    switch (action.type) {
      case "UPDATE_FIELD":
        return { ...state, ...action.value };
      case "INITIALISE":
        return initialState;
      default:
        return state;
    }
  };
  const [taskState, taskDispatch] = useReducer(reducer, initialState);

  const { data: users, error: usersError } = useQuery({
    queryKey: ["userList"],
    queryFn: async () => {
      const result = await fetchUsers();
      return result;
    },
  });

  const createTask = useMutation({
    mutationFn: async () => {
      setCreateStatus("Creation ongoing...");
      return await createOneTask({ ...taskState, status: "IN_REVIEW" });
    },
    onSuccess: () => {
      setCreateStatus("Successfully created task");
      taskDispatch({ type: "INITIALISE", value: null });
    },
  });
  const handleCreateTask = () => {
    const data = Object.values(taskState) as string[];
    const isValid = data.every((el) => el.toString().length > 0);
    if (!isValid) {
      setCreateStatus("Please provide information for all fields");
      return;
    }
    createTask.mutate();
  };

  return (
    <Box display={"flex"} flexDirection={"column"} gap={"1rem"}>
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={users ? users : []}
        sx={{ width: 300 }}
        getOptionLabel={(option: any) => option.name}
        onChange={(event: any, newValue: any) => {
          setUser(newValue);
          taskDispatch({
            type: "UPDATE_FIELD",
            value: {
              name: newValue.name,
              email: newValue.email,
              company: newValue.company,
            },
          });
        }}
        renderInput={(params) => <TextField {...params} label="Users" />}
      />
      <Typography>Name of task owner</Typography>
      <TextField
        required
        value={taskState.name}
        onChange={(e) =>
          taskDispatch({
            type: "UPDATE_FIELD",
            value: { name: e.target.value },
          })
        }
      />
      <Typography>Their email</Typography>
      <TextField
        required
        value={taskState.email}
        onChange={(e) =>
          taskDispatch({
            type: "UPDATE_FIELD",
            value: { email: e.target.value },
          })
        }
      />
      <Typography>Their company</Typography>
      <TextField
        required
        value={taskState.company}
        onChange={(e) =>
          taskDispatch({
            type: "UPDATE_FIELD",
            value: { company: e.target.value },
          })
        }
      />
      <Typography>Task description</Typography>
      <TextField
        required
        value={taskState.taskDescription}
        onChange={(e) =>
          taskDispatch({
            type: "UPDATE_FIELD",
            value: { taskDescription: e.target.value },
          })
        }
      />
      <Typography>Task date</Typography>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["DatePicker"]}>
          <DatePicker
            label="Start date"
            value={taskState.taskDate}
            onChange={(newValue) =>
              taskDispatch({
                type: "UPDATE_FIELD",
                value: { taskDate: newValue.format("YYYY-MM-DD") },
              })
            }
          />
        </DemoContainer>
      </LocalizationProvider>
      <Box
        display={"flex"}
        flexDirection={"column"}
        padding={"1rem 0"}
        gap={"1rem"}
      >
        <Box display={"flex"} flexDirection={"row"} gap={"1rem"}>
          <Button
            variant="outlined"
            onClick={() => taskDispatch({ type: "INITIALISE", value: null })}
          >
            Clear
          </Button>
          <Button variant="contained" onClick={handleCreateTask}>
            Create task
          </Button>
        </Box>
        {createStatus && createStatus.length > 0 && (
          <Typography sx={{ fontStyle: "italic" }}>{createStatus}</Typography>
        )}
      </Box>
    </Box>
  );
};
