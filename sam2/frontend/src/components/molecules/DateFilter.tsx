import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useState } from "react";
import { Dayjs } from "dayjs";
import { Box, Button, Typography } from "@mui/material";

interface DateFilterProps {
  start: Dayjs;
  end: Dayjs;
  setStart: (start: any) => void;
  setEnd: (end: any) => void;
  handleDateSearch: (start: Dayjs, end: Dayjs) => void;
}

export const DateFilter = ({
  handleDateSearch,
  start,
  end,
  setStart,
  setEnd,
}: DateFilterProps) => {
  const [error, setError] = useState<string | null>(null);

  const handleSearch = () => {
    if (start && end && start < end) {
      setError(null);
      handleDateSearch(start, end);
    } else {
      setError("Please pick a valid date range");
    }
  };
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      alignItems={"left"}
      textAlign={"left"}
      paddingBottom={"2rem"}
      gap={"2rem"}
    >
      <Box
        display={"flex"}
        flexDirection={"row"}
        flexWrap={"wrap"}
        gap={"2rem"}
        id={"date-filter-container"}
      >
        <Box display={"flex"} flexDirection={"column"} gap={"1rem"}>
          <Box
            display={"flex"}
            flexDirection={"row"}
            flexWrap={"wrap"}
            gap={"2rem"}
            id={"date-filter-container"}
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  label="Start date"
                  value={start}
                  onChange={(newValue) => setStart(newValue)}
                />
              </DemoContainer>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  label="End date"
                  value={end}
                  onChange={(newValue) => setEnd(newValue)}
                />
              </DemoContainer>
            </LocalizationProvider>
          </Box>
          {!!error && <Typography color={"error"}>{error}</Typography>}
        </Box>
        <Box paddingTop={"8px"}>
          <Button
            sx={{ height: "56px" }}
            variant="contained"
            onClick={handleSearch}
          >
            Search
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
