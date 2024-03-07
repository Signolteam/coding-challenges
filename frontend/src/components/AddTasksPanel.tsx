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
import { User, csvItem } from "../types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createTasks, fetchUsers } from "../utils";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

export const AddTasksPanel = () => {
  //for csv upload
  const [csvData, setCsvData] = useState<csvItem[]>([]);
  const [filename, setFilename] = useState<String>("");
  const [createStatus, setCreateStatus] = useState<String | null>(null);
  //for manual query
  const [user, setUser] = useState<User>();
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

  //query
  const { data: users, error: usersError } = useQuery({
    queryKey: ["userList"],
    queryFn: async () => {
      const result = await fetchUsers();
      return result;
    },
  });

  const createManyTasks = useMutation({
    mutationFn: async () => {
      setCreateStatus("ongoing");
      return await createTasks(csvData);
    },
    onSuccess: () => {
      setCreateStatus("success");
    },
  });

  const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }
    const file = e.target.files[0];
    const { name } = file;
    setFilename(name);

    Papa.parse(e.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        const preppedContent: csvItem[] = [];
        if (results!! && !!results.data) {
          results.data.forEach((item: any) => {
            preppedContent.push({
              name: item.task_owner,
              email: item.email,
              company: item.company_name,
              taskDate: item.task_date,
              taskDescription: item.task_description,
              status: "IN_REVIEW",
            });
          });
        }
        setCsvData(preppedContent);
      },
    });
  };

  return (
    <Stack display={"flex"} textAlign={"left"} gap={"2rem"}>
      <Typography variant="h6"> Add tasks by uploading a csv file</Typography>

      <Box display={"flex"} flexDirection={"row"} gap={"1rem"}>
        <Button
          component="label"
          variant="outlined"
          startIcon={<UploadFileIcon />}
          sx={{ marginRight: "1rem" }}
        >
          Upload CSV
          <input type="file" accept=".csv" hidden onChange={handleFileUpload} />
        </Button>
        <Box
          display={"flex"}
          flexDirection={"row"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Typography sx={{ fontStyle: "italic" }}>{filename}</Typography>
        </Box>
        {filename.length > 0 && (
          <Box
            display={"flex"}
            flexDirection={"row"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <DeleteIcon
              sx={{ color: "error.main", cursor: "pointer" }}
              onClick={() => {
                setFilename("");
                setCsvData([]);
              }}
            />
          </Box>
        )}
      </Box>
      {filename.length > 0 && csvData.length > 0 ? (
        <Box
          display={"flex"}
          flexDirection={"row"}
          gap={"2rem"}
          alignItems={"center"}
        >
          <CheckCircleOutlineIcon sx={{ color: "success.main" }} />
          <Typography>The file contains: {csvData.length} tasks.</Typography>
          <Button variant="contained" onClick={() => createManyTasks.mutate()}>
            {"Create tasks"}
          </Button>
        </Box>
      ) : (
        filename.length > 0 &&
        csvData.length === 0 && (
          <Box
            display={"flex"}
            flexDirection={"row"}
            gap={"2rem"}
            alignItems={"center"}
          >
            <HighlightOffIcon sx={{ color: "error.main" }} />
            <Typography>
              The file doesn't contain any tasks. Please pick another file
            </Typography>
          </Box>
        )
      )}
      {createStatus && createStatus.length > 0 && (
        <Typography sx={{ fontStyle: "italic" }}>
          {createStatus === "ongoing"
            ? "Creation in progress ..."
            : createStatus === "success"
            ? "The tasks were successfully created."
            : "The items could not be created at this time. Try again later."}{" "}
        </Typography>
      )}

      <Typography variant="h6"> Or add a task manually</Typography>
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={users ? users : []}
        sx={{ width: 300 }}
        getOptionLabel={(option: any) => option.name}
        onChange={(event: any, newValue: any) => {
          setUser(newValue);
        }}
        renderInput={(params) => <TextField {...params} label="Users" />}
      />
      <Typography>Name of task owner</Typography>
      <TextField
        onChange={(e) =>
          taskDispatch({
            type: "UPDATE_FIELD",
            value: { name: e.target.value },
          })
        }
      />
      <Typography>Their email</Typography>
      <TextField
        onChange={(e) =>
          taskDispatch({
            type: "UPDATE_FIELD",
            value: { email: e.target.value },
          })
        }
      />
      <Typography>Their company</Typography>
      <TextField
        onChange={(e) =>
          taskDispatch({
            type: "UPDATE_FIELD",
            value: { company: e.target.value },
          })
        }
      />
      <Typography>Task description</Typography>
      <TextField
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
    </Stack>
  );
};
