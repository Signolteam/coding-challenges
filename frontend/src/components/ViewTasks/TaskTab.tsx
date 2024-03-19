import { Box, Tab, Tabs } from "@mui/material";

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

interface TabProps {
  value: number;
  handleChange: (event: React.SyntheticEvent, newValue: number) => void;
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
          <Tab label="View by date" {...a11yProps(1)} />
          <Tab label="View by string" {...a11yProps(2)} />
        </Tabs>
      </Box>
    </>
  );
};
