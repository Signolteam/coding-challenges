import { Box, Tab, Tabs } from "@mui/material";

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

interface TabProps {
  value: any;
  handleChange: any;
}
export const TaskTab = ({ value, handleChange }: TabProps) => {
  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="All tasks" {...a11yProps(0)} />
          <Tab label="Tasks by date" {...a11yProps(1)} />
          <Tab label="Tasks by search" {...a11yProps(2)} />
        </Tabs>
      </Box>
    </>
  );
};
