// "use client";
// import React, { useState, useEffect, useRef } from "react";
// import {
//   Grid,
//   Box,
//   Typography,
//   Card,
//   Stack,
//   TextField,
//   InputAdornment,
//   Button,
//   Autocomplete,
//   Chip,
// } from "@mui/material";

// import { useRouter } from "next/router";

// import AddProjectDialog from "../CustomFormDialog/AddProjectDialog";

// import DialogExport from "../CustomDialog/ExportDialog";
// import LineChart from "./Charts/LineChart";
// import DonutChart from "./Charts/DonutChart";
// import ColumnChart from "./Charts/ColumnChart";

// import ToggleButton from "@mui/material/ToggleButton";
// import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
// import GroupIcon from "@mui/icons-material/Group";
// import PersonIcon from "@mui/icons-material/Person";
// const DashboardScreen = ({ username }) => {
//   const [value, setValue] = React.useState(0);
//   const router = useRouter();

//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };
//   const [activeButton, setActiveButton] = React.useState("Personal");

//   const handleButtonClick = (event, value) => {
//     setActiveButton(value);
//   };

//   const [person, setPerson] = useState("JakkapanP");

//   const [openFormAdd, setOpenFormAdd] = useState(false);
//   const [download, setDownload] = useState(false);
//   return (
//     <Box>
//       <DialogExport open={download} onClose={() => setDownload(false)} />
//       <AddProjectDialog
//         open={openFormAdd}
//         onClose={() => setOpenFormAdd(false)}
//       />
//       <Grid container spacing={1.5} justifyContent="center">
//         <Grid item xs={12} sm={12} md={12}>
//           <Stack
//             display={"flex"}
//             justifyContent={"space-between"}
//             direction={"row"}
//             alignItems={"center"}
//             spacing={1}
//           >
//             <Typography variant="h6">Dashboard</Typography>
//             <Stack direction="row" spacing={0.5}>
//               <Box
//                 sx={{ display: activeButton === "Personal" ? "block" : "none" }}
//               >
//                 <Autocomplete
//                   options={["JakkapanP", "KamonwatS"]}
//                   getOptionLabel={(option) => option}
//                   size="small"
//                   value={person}
//                   onChange={(e, value) => setPerson(value)}
//                   filterSelectedOptions
//                   sx={{ minWidth: 200 }}
//                   renderInput={(params) => (
//                     <TextField
//                       {...params}
//                       size="small"
//                       placeholder="Enter User"
//                     />
//                   )}
//                   renderTags={(value, getTagProps) =>
//                     value.map((option, index) => (
//                       <Box key={index} sx={{ width: "100%" }}>
//                         <Chip
//                           {...getTagProps({ index })}
//                           label={option}
//                           size="small"
//                           color="error"
//                           sx={{
//                             justifyContent: "flex-start",
//                             borderRadius: "15px",
//                             pt: -1,
//                             pb: -1,
//                           }}
//                         />
//                       </Box>
//                     ))
//                   }
//                 />
//               </Box>

//               <ToggleButtonGroup
//                 value={activeButton}
//                 exclusive
//                 onChange={handleButtonClick}
//                 aria-label="text alignment"
//                 size="small"
//                 color="primary"
//               >
//                 <ToggleButton
//                   value="Personal"
//                   aria-label="left aligned"
//                   sx={{
//                     fontSize: "0.85rem",
//                     padding: "7px 8px",
//                   }}
//                 >
//                   <PersonIcon sx={{ fontSize: 25, pr: 1 }} />
//                   Personal
//                 </ToggleButton>
//                 <ToggleButton
//                   value="Team"
//                   aria-label="centered"
//                   sx={{
//                     fontSize: "0.85rem",
//                     padding: "7px 8px",
//                   }}
//                 >
//                   <GroupIcon sx={{ fontSize: 25, pr: 1 }} />
//                   Team
//                 </ToggleButton>
//               </ToggleButtonGroup>
//             </Stack>
//           </Stack>
//         </Grid>
//         <Grid item md={8} xs={6}>
//           <Card sx={{ p: 2, bgcolor: "white", minHeight: 150, minHeight: 400 }}>
//             <ColumnChart />
//           </Card>
//         </Grid>
//         <Grid item md={4} xs={6}>
//           <Grid container spacing={1}>
//             <Grid item md={12} xs={12}>
//               <Card sx={{ p: 2, bgcolor: "white", minHeight: 195 }}>x</Card>
//             </Grid>
//             <Grid item md={12} xs={12}>
//               <Card sx={{ p: 2, bgcolor: "white", minHeight: 195 }}>x</Card>
//             </Grid>
//           </Grid>
//         </Grid>

//         <Grid item md={4} xs={12}>
//           <Card sx={{ p: 2, bgcolor: "white", minHeight: 400 }}>
//             <DonutChart />
//           </Card>
//         </Grid>
//         <Grid item md={8} xs={12}>
//           <Card sx={{ p: 2 }}>
//             <LineChart />
//           </Card>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };

// export default DashboardScreen;

"use client";
import React, { useState } from "react";
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
  ToggleButton,
  ToggleButtonGroup,
  Divider,
} from "@mui/material";

import { useRouter } from "next/router";

import AddProjectDialog from "../CustomFormDialog/AddProjectDialog";
import DialogExport from "../CustomDialog/ExportDialog";
import LineChart from "./Charts/LineChart";
import DonutChart from "./Charts/DonutChart";
import ColumnChart from "./Charts/ColumnChart";

import GroupIcon from "@mui/icons-material/Group";
import PersonIcon from "@mui/icons-material/Person";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

const DashboardScreen = ({ username }) => {
  const [activeButton, setActiveButton] = useState("Personal");
  const [person, setPerson] = useState("JakkapanP");
  const [openFormAdd, setOpenFormAdd] = useState(false);
  const [download, setDownload] = useState(false);

  const handleButtonClick = (_, value) => {
    if (value !== null) setActiveButton(value);
  };

  return (
    <Box>
      <DialogExport open={download} onClose={() => setDownload(false)} />
      <AddProjectDialog
        open={openFormAdd}
        onClose={() => setOpenFormAdd(false)}
      />

      <Grid container spacing={1.5} justifyContent="center">
        <Grid item xs={12}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={1}
          >
            <Typography variant="h6">Dashboard</Typography>
            <Stack direction="row" spacing={0.5}>
              {activeButton === "Personal" && (
                <Autocomplete
                  options={["JakkapanP", "KamonwatS"]}
                  value={person}
                  onChange={(_, value) => setPerson(value)}
                  size="small"
                  sx={{ minWidth: 200 }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      size="small"
                      placeholder="Enter User"
                    />
                  )}
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                      <Chip
                        key={index}
                        {...getTagProps({ index })}
                        label={option}
                        size="small"
                        color="error"
                        sx={{ borderRadius: "15px" }}
                      />
                    ))
                  }
                />
              )}

              <ToggleButtonGroup
                value={activeButton}
                exclusive
                onChange={handleButtonClick}
                aria-label="text alignment"
                size="small"
                color="primary"
              >
                <ToggleButton
                  value="Personal"
                  sx={{ fontSize: "0.85rem", padding: "7px 8px" }}
                >
                  <PersonIcon sx={{ fontSize: 25, pr: 1 }} /> Personal
                </ToggleButton>
                <ToggleButton
                  value="Team"
                  sx={{ fontSize: "0.85rem", padding: "7px 8px" }}
                >
                  <GroupIcon sx={{ fontSize: 25, pr: 1 }} /> Team
                </ToggleButton>
              </ToggleButtonGroup>
            </Stack>
          </Stack>
        </Grid>

        <Grid item md={8} xs={12}>
          <Card sx={{ p: 2, bgcolor: "white", minHeight: 400, maxHeight: 400 }}>
            <ColumnChart />
          </Card>
        </Grid>

        <Grid item md={4} xs={12}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Card
                sx={{ p: 2, bgcolor: "white", minHeight: 400, maxHeight: 400 }}
              ></Card>
            </Grid>
          </Grid>
        </Grid>

        <Grid item md={4} xs={12}>
          <Card sx={{ p: 2, bgcolor: "white", minHeight: 400, maxHeight: 400 }}>
            <DonutChart />
          </Card>
        </Grid>

        <Grid item md={8} xs={12}>
          <Card sx={{ p: 2, bgcolor: "white", minHeight: 400, maxHeight: 400 }}>
            <LineChart />
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardScreen;
