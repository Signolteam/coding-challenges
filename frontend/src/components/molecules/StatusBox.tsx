import { Box, Button, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import { updateStatus } from "../../utils/axios";

export const renderStatusBox = (status: string, id: string, refetch?: any) => {
  const handleStatusUpdate = async (newStatus: string, id: string) => {
    const body = { id, status: newStatus };
    await updateStatus(body);
    refetch && refetch();
  };

  return status === "REJECTED" ? (
    <Typography
      width={"100px"}
      display={"flex"}
      alignItems={"center"}
      gap={"1rem"}
    >
      <CloseIcon sx={{ backgroundColor: "error.main", color: "white" }} />{" "}
      Rejected
    </Typography>
  ) : status === "APPROVED" ? (
    <Typography
      width={"100px"}
      display={"flex"}
      alignItems={"center"}
      gap={"1rem"}
    >
      <CheckIcon sx={{ backgroundColor: "success.main", color: "white" }} />
      Approved
    </Typography>
  ) : (
    <Box display={"flex"} flexDirection={"row"} flexWrap={"wrap"} gap={"1rem"}>
      <Button
        onClick={() => handleStatusUpdate("APPROVED", id.toString())}
        variant={"contained"}
        color="success"
      >
        Approve
      </Button>
      <Button
        onClick={() => handleStatusUpdate("REJECTED", id.toString())}
        variant={"contained"}
        color="error"
      >
        Reject
      </Button>
    </Box>
  );
};
