import React, { useState, useEffect } from "react";
import {
  Grid,
  Box,
  Typography,
  Card,
  Stack,
  TextField,
  InputAdornment,
  Button,
  Autocomplete,
  Chip,
} from "@mui/material";

import TableReport from "../TableReport/TableReport";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import CustomTabPanel from "../TableReport/CustomTabPanel/CustomTabPanel";
import Transition from "../Transition";
import { useRouter } from "next/router";
import SearchIcon from "@mui/icons-material/Search";
import DatePickerComponent from "../DatePickerComponent";
import AddProjectDialog from "../CustomFormDialog/AddProjectDialog";
import AddIcon from "@mui/icons-material/Add";
import SearchCard from "../SearchCard/SearchCard";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import EmailIcon from "@mui/icons-material/Email";
import DialogExport from "../CustomDialog/ExportDialog";
import WeekFilter from "../WeekFilter";
const mocks = [
  {
    buName: "Finance",
    projectName: "Budget Tracker",
    jobType: "Analysis",
    ref: "REF001",
    lastUpdate: "2024-12-11T09:30:00Z",
    priority: "High",
    status: 1,
    requestor: "Jakkapan Pakeerat",
    duration: "15 days",
  },
  {
    buName: "HR",
    projectName: "Employee Onboarding",
    jobType: "Development",
    ref: "REF002",
    lastUpdate: "2024-12-10T14:15:00Z",
    priority: "Medium",
    status: 0,
    requestor: "Jakkapan Pakeerat",
    duration: "7 days",
  },
  {
    buName: "IT",
    projectName: "Network Upgrade",
    jobType: "Infrastructure",
    ref: "REF003",
    lastUpdate: "2024-12-09T11:00:00Z",
    priority: "High",
    status: 1,
    requestor: "Jakkapan Pakeerat",
    duration: "20 hrs",
  },
  {
    buName: "Marketing",
    projectName: "Campaign Analysis",
    jobType: "Research",
    ref: "REF004",
    lastUpdate: "2024-12-08T16:45:00Z",
    priority: "Low",
    status: 0,
    requestor: "Jakkapan Pakeerat",
    duration: "31 days",
  },
  {
    buName: "Operations",
    projectName: "Logistics Optimization",
    jobType: "Strategy",
    ref: "REF005",
    lastUpdate: "2024-12-07T13:30:00Z",
    priority: "Medium",
    status: 1,
    requestor: "Jakkapan Pakeerat",
    duration: "20 minutes",
  },
  {
    buName: "Sales",
    projectName: "CRM Enhancement",
    jobType: "Implementation",
    ref: "REF006",
    lastUpdate: "2024-12-06T10:15:00Z",
    priority: "Medium",
    status: 0,
    requestor: "Jakkapan Pakeerat",
    duration: "15 days",
  },
  {
    buName: "Procurement",
    projectName: "Supplier Review",
    jobType: "Audit",
    ref: "REF007",
    lastUpdate: "2024-12-05T09:00:00Z",
    priority: "High",
    status: 1,
    requestor: "Jakkapan Pakeerat",
    duration: "3 hrs",
  },
  {
    buName: "Legal",
    projectName: "Policy Update",
    jobType: "Compliance",
    ref: "REF008",
    lastUpdate: "2024-12-04T15:45:00Z",
    priority: "Low",
    status: 0,
    requestor: "Jakkapan Pakeerat",
    duration: "45 days",
  },
  {
    buName: "Admin",
    projectName: "Office Renovation",
    jobType: "Facility Management",
    ref: "REF009",
    lastUpdate: "2024-12-03T08:30:00Z",
    priority: "Medium",
    status: 1,
    requestor: "Jakkapan Pakeerat",
    duration: "10 days",
  },
  {
    buName: "R&D",
    projectName: "Product Prototype",
    jobType: "Innovation",
    ref: "REF010",
    lastUpdate: "2024-12-02T17:15:00Z",
    priority: "Medium",
    status: 1,
    requestor: "Jakkapan Pakeerat",
    duration: "12 days",
  },
];

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const HomeScreen = ({ username }) => {
  const [value, setValue] = React.useState(0);
  const router = useRouter();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [openFormAdd, setOpenFormAdd] = useState(false);
  const [download, setDownload] = useState(false);
  return (
    <Box>
      <DialogExport open={download} onClose={() => setDownload(false)} />
      <AddProjectDialog
        open={openFormAdd}
        onClose={() => setOpenFormAdd(false)}
      />
      <Grid container spacing={1} justifyContent="center">
        <Grid item xs={12} sm={12} md={12}>
          <Typography variant="h6">Search options</Typography>
        </Grid>
        <SearchCard />

        <Grid item xs={12} sm={12} md={12}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
              <Box
                sx={{
                  borderBottom: 1,
                  borderColor: "divider",
                  position: "relative",
                }}
              >
                <Stack
                  sx={{ position: "absolute", right: 1, top: 9 }}
                  direction={"row"}
                  spacing={1}
                >
                  <Button
                    variant="contained"
                    size="small"
                    sx={{
                      textTransform: "none",
                      backgroundImage:
                        "linear-gradient(to right, #FCC737, #FFB200)",
                      zIndex: 99,
                    }}
                    startIcon={<EmailIcon />}
                  >
                    Send Mail
                  </Button>
                  <Button
                    variant="contained"
                    size="small"
                    sx={{
                      textTransform: "none",
                      backgroundImage:
                        "linear-gradient(to right, #118B50, #118B50)",
                      zIndex: 99,
                    }}
                    startIcon={<DownloadForOfflineIcon />}
                    onClick={() => setDownload(true)}
                  >
                    Downlaod Excel.xls
                  </Button>
                  <Button
                    variant="contained"
                    size="small"
                    sx={{
                      textTransform: "none",
                      backgroundImage:
                        "linear-gradient(to right, #1e3a8a, #3b82f6)",
                      zIndex: 99,
                    }}
                    startIcon={<AddIcon />}
                    onClick={() => setOpenFormAdd(true)}
                  >
                    Add New
                  </Button>
                </Stack>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                  sx={{
                    "& .MuiTabs-indicator": {
                      backgroundImage:
                        "linear-gradient(to right, #1e3a8a, #3b82f6)",
                    },
                  }}
                >
                  <Tab
                    // label="All Task"
                    label={
                      <>
                        <Stack direction={"row"} spacing={1}>
                          <Typography variant="body1">All Task</Typography>{" "}
                          <Chip
                            size="small"
                            label="12"
                            sx={{
                              backgroundImage:
                                value === 0
                                  ? "linear-gradient(to right, #1e3a8a, #3b82f6)"
                                  : null,
                              color: value === 0 ? "white" : null,
                            }}
                          />
                        </Stack>
                      </>
                    }
                    sx={{
                      textTransform: "none",
                    }}
                    {...a11yProps(0)}
                  />
                  <Tab
                    // label="Complete"
                    label={
                      <>
                        <Stack direction={"row"} spacing={1}>
                          <Typography variant="body1">Complete</Typography>{" "}
                          <Chip
                            size="small"
                            label="7"
                            sx={{
                              backgroundImage:
                                value === 1
                                  ? "linear-gradient(to right, #1e3a8a, #3b82f6)"
                                  : null,
                              color: value === 1 ? "white" : null,
                            }}
                          />
                        </Stack>
                      </>
                    }
                    sx={{ textTransform: "none" }}
                    {...a11yProps(1)}
                  />
                  <Tab
                    // label="Pending"
                    label={
                      <>
                        <Stack direction={"row"} spacing={1}>
                          <Typography variant="body1">Pending</Typography>{" "}
                          <Chip
                            size="small"
                            label="5"
                            sx={{
                              backgroundImage:
                                value === 2
                                  ? "linear-gradient(to right, #1e3a8a, #3b82f6)"
                                  : null,
                              color: value === 2 ? "white" : null,
                            }}
                          />
                        </Stack>
                      </>
                    }
                    sx={{ textTransform: "none" }}
                    {...a11yProps(2)}
                  />
                  <Tab
                    // label="Hold"
                    label={
                      <>
                        <Stack direction={"row"} spacing={1}>
                          <Typography variant="body1">Hold</Typography>{" "}
                          <Chip
                            size="small"
                            label="0"
                            sx={{
                              backgroundImage:
                                value === 3
                                  ? "linear-gradient(to right, #1e3a8a, #3b82f6)"
                                  : null,
                              color: value === 3 ? "white" : null,
                            }}
                          />
                        </Stack>
                      </>
                    }
                    sx={{ textTransform: "none" }}
                    {...a11yProps(3)}
                  />
                  <Tab
                    // label="Cancel"
                    label={
                      <>
                        <Stack direction={"row"} spacing={1}>
                          <Typography variant="body1">Cancel</Typography>{" "}
                          <Chip
                            size="small"
                            label="0"
                            sx={{
                              backgroundImage:
                                value === 4
                                  ? "linear-gradient(to right, #1e3a8a, #3b82f6)"
                                  : null,
                              color: value === 4 ? "white" : null,
                            }}
                          />
                        </Stack>
                      </>
                    }
                    sx={{ textTransform: "none" }}
                    {...a11yProps(4)}
                  />
                </Tabs>
              </Box>

              <CustomTabPanel value={value} index={0}>
                <Transition>
                  <TableReport rows={mocks} />
                </Transition>
              </CustomTabPanel>
              <CustomTabPanel value={value} index={1}>
                <Transition>
                  <TableReport rows={[]} />
                </Transition>
              </CustomTabPanel>
              <CustomTabPanel value={value} index={2}>
                <Transition>
                  <TableReport rows={[]} />
                </Transition>
              </CustomTabPanel>
              <CustomTabPanel value={value} index={3}>
                <Transition>
                  <TableReport rows={[]} />
                </Transition>
              </CustomTabPanel>
              <CustomTabPanel value={value} index={4}>
                <Transition>
                  <TableReport rows={[]} />
                </Transition>
              </CustomTabPanel>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HomeScreen;
