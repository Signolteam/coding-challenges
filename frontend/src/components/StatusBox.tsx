import { Box, Button, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";

export const renderStatusBox = (status: string) => {
  return status === "REJECTED" ? (
    <Typography width={"100px"}>
      <CloseIcon sx={{ backgroundColor: "red", color: "white" }} /> Rejected
    </Typography>
  ) : status === "APPROVED" ? (
    <Typography>
      <CheckIcon sx={{ backgroundColor: "green", color: "white" }} /> Approved
    </Typography>
  ) : (
    <Box display={"flex"} flexDirection={"row"} flexWrap={"wrap"} gap={"1rem"}>
      <Button
        onClick={() => console.log("approving")}
        variant={"contained"}
        color="success"
      >
        Approve
      </Button>
      <Button
        onClick={() => console.log("rejecting")}
        variant={"contained"}
        color="error"
      >
        Reject
      </Button>
    </Box>
  );
};
