import { Box, Button, Typography } from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { ChangeEvent, useState } from "react";
import Papa from "papaparse";
import { csvItem } from "../../types";
import { createTasks } from "../../utils/axios";
import { useMutation } from "@tanstack/react-query";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

export const FileUpload = () => {
  dayjs.extend(customParseFormat);
  const [filename, setFilename] = useState<String>("");
  const [csvData, setCsvData] = useState<csvItem[]>([]);
  const [createStatus, setCreateStatus] = useState<String | null>(null);

  const createManyTasks = useMutation({
    mutationFn: async () => {
      setCreateStatus("Creation ongoing");
      return await createTasks(csvData);
    },
    onSuccess: (data) => {
      setCreateStatus(`Successfully created ${data.executed / 2} tasks`);
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
              taskDate: dayjs(item.task_date, "DD/MM/YYYY").format(
                "YYYY-MM-DD"
              ),
              taskDescription: item.task_description,
              status: "IN_REVIEW",
            });
          });
        }
        setCsvData(preppedContent);
      },
    });
  };

  console.log(csvData);
  return (
    <>
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
        <Typography sx={{ fontStyle: "italic" }}>{createStatus}</Typography>
      )}
    </>
  );
};
