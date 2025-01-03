import {
  Box,
  Typography,
  Stack,
  Divider,
  Button,
  IconButton,
  TextField,
  Dialog,
  DialogContent,
  Select,
  MenuItem,
  Zoom,
  Autocomplete,
  Chip,
  Checkbox,
  FormControlLabel,
  Grid,
} from "@mui/material";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import DatePickerComponent from "../DatePickerComponent";
import TooltipMainProject from "../CustomTooltip/TooltipMainProject";
import useDialog from "../CustomDialog/useDialog";

const AddProjectDialog = ({ open, onClose }) => {
  const [showDialog, DialogComponent] = useDialog();
  const [detail, setDetail] = useState();

  const handleSave = async () => {
    const result = await showDialog({
      title: "Confirmation",
      message: "Are you sure you want to delete this item?",
      icon: "error",
      btnConfirmText: "Delete",
      btnCancelText: "Cancel",
    });
  };
  return (
    <Dialog
      open={open}
      maxWidth="lg"
      fullWidth
      TransitionComponent={Zoom}
      BackdropProps={{
        sx: {
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        },
      }}
      PaperProps={{
        sx: {
          p: 1,
          borderRadius: 2,
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
          border: "1px solid #e0e0e0",
        },
      }}
    >
      {DialogComponent}
      <DialogContent sx={{ position: "relative" }}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ mb: 2 }}
        >
          <Typography variant="subtitle1">New Project / Task</Typography>
          <IconButton onClick={onClose} size="small">
            <CloseIcon sx={{ fontSize: 20 }} />
          </IconButton>
        </Stack>

        <Box component={Stack} spacing={1} sx={{ ml: -1 }}>
          <Divider
            sx={{
              mt: -1,
              mb: 1,
              height: "2px",
              border: "none",
              backgroundImage: "linear-gradient(to right, #1e3a8a, #3b82f6)",
            }}
          />

          <Grid container spacing={1}>
            <Grid item md={6} xs={12}>
              <Stack spacing={1} sx={{ width: "100%" }}>
                <Typography variant="body1" fontWeight="medium">
                  BU Name
                </Typography>
                <Autocomplete
                  options={[
                    "Information Technology-PH",
                    "Information Technology-CB",
                  ]}
                  getOptionLabel={(option) => option}
                  size="small"
                  filterSelectedOptions
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      size="small"
                      placeholder="Entry BU Name"
                    />
                  )}
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                      <Box key={index} sx={{ width: "100%" }}>
                        <Chip
                          {...getTagProps({ index })}
                          label={option}
                          size="small"
                          color="error"
                          sx={{
                            justifyContent: "flex-start",
                            borderRadius: "15px",
                          }}
                        />
                      </Box>
                    ))
                  }
                />
              </Stack>
            </Grid>
            <Grid item md={3} xs={6}>
              <Stack spacing={1} sx={{ width: "100%" }}>
                <Stack direction={"row"} alignItems={"center"} spacing={0.5}>
                  <Typography variant="body1" fontWeight="medium">
                    Reference
                  </Typography>
                  <Typography
                    variant="caption"
                    fontWeight="medium"
                    sx={{ color: "gray" }}
                  >
                    (Optional)
                  </Typography>
                </Stack>

                <TextField size="small" />
              </Stack>
            </Grid>
            <Grid item md={3} xs={6}>
              <Stack spacing={1} sx={{ width: "100%" }}>
                <Typography variant="body1" fontWeight="medium">
                  Priority
                </Typography>
                <Select
                  size="small"
                  defaultValue=""
                  displayEmpty
                  sx={{
                    "& .MuiSelect-outlined": {
                      padding: "10px 12px",
                    },
                  }}
                >
                  <MenuItem value="" disabled>
                    Select priority
                  </MenuItem>
                  <MenuItem value={10}>Hight</MenuItem>
                  <MenuItem value={20}>Critical</MenuItem>
                  <MenuItem value={30}>Meduim</MenuItem>
                  <MenuItem value={40}>Low</MenuItem>
                </Select>
              </Stack>{" "}
            </Grid>
            <Grid item md={6} xs={12}>
              <Stack spacing={1} sx={{ width: "100%" }}>
                <Typography variant="body1" fontWeight="medium">
                  Requestor
                </Typography>
                <Autocomplete
                  options={["Jakkapan Pakeerat", "Jakkapan2 Pakeerat2"]}
                  getOptionLabel={(option) => option}
                  size="small"
                  filterSelectedOptions
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      size="small"
                      placeholder="Enter Requestor"
                    />
                  )}
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                      <Box key={index} sx={{ width: "100%" }}>
                        <Chip
                          {...getTagProps({ index })}
                          label={option}
                          size="small"
                          color="error"
                          sx={{
                            justifyContent: "flex-start",
                            borderRadius: "15px",
                          }}
                        />
                      </Box>
                    ))
                  }
                />
              </Stack>
            </Grid>
            <Grid item md={3} xs={6}>
              <Stack spacing={1} sx={{ width: "100%" }}>
                <Typography variant="body1" fontWeight="medium">
                  Start Date
                </Typography>
                <DatePickerComponent />
              </Stack>
            </Grid>
            <Grid item md={3} xs={6}>
              <Stack spacing={1} sx={{ width: "100%" }}>
                <Stack direction={"row"} alignItems={"center"} spacing={0.5}>
                  <Typography variant="body1" fontWeight="medium">
                    Finish Date
                  </Typography>
                  <Typography
                    variant="caption"
                    fontWeight="medium"
                    sx={{ color: "gray" }}
                  >
                    (Optional)
                  </Typography>
                </Stack>
                <DatePickerComponent />
              </Stack>
            </Grid>
            <Grid item md={12} xs={12}>
              <Divider sx={{ py: 1 }} />
            </Grid>

            <Grid item md={6} xs={12}>
              <Stack spacing={1} sx={{ width: "100%" }}>
                <Stack direction={"row"} alignItems={"center"} spacing={1}>
                  <Typography variant="body1" fontWeight="medium">
                    Job Type
                  </Typography>
                </Stack>

                <Autocomplete
                  options={[
                    "Analysis",
                    "Audit",
                    "Complince",
                    "Implementation",
                    "Straegy",
                    "Research",
                    "Infrastructure",
                    "Web Application",
                    "Migration",
                    "Meeting",
                    "Development",
                    "Optimization",
                    "Bug Fixing",
                    "Report",
                  ]}
                  getOptionLabel={(option) => option}
                  size="small"
                  filterSelectedOptions
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      size="small"
                      placeholder="Entry Job Type"
                    />
                  )}
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                      <Box key={index} sx={{ width: "100%" }}>
                        <Chip
                          {...getTagProps({ index })}
                          label={option}
                          size="small"
                          color="error"
                          sx={{
                            justifyContent: "flex-start",
                            borderRadius: "15px",
                          }}
                        />
                      </Box>
                    ))
                  }
                />
              </Stack>
            </Grid>
            <Grid item md={6} xs={12}>
              <Stack spacing={1} sx={{ width: "100%" }}>
                <Stack direction={"row"} alignItems={"center"} spacing={1}>
                  <Typography variant="body1" fontWeight="medium">
                    Application
                  </Typography>
                </Stack>

                <Autocomplete
                  options={[
                    "FITS",
                    "DataEntry",
                    "Auto Collection",
                    "GOLF",
                    "Other",
                  ]}
                  getOptionLabel={(option) => option}
                  size="small"
                  filterSelectedOptions
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      size="small"
                      placeholder="Entry Application"
                    />
                  )}
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                      <Box key={index} sx={{ width: "100%" }}>
                        <Chip
                          {...getTagProps({ index })}
                          label={option}
                          size="small"
                          color="error"
                          sx={{
                            justifyContent: "flex-start",
                            borderRadius: "15px",
                          }}
                        />
                      </Box>
                    ))
                  }
                />
              </Stack>
            </Grid>
            <Grid item md={6} xs={12}>
              <Stack direction={"row"} spacing={1}>
                <FormControlLabel
                  control={<Checkbox size="small" defaultChecked={false} />}
                  label="Main Project"
                />
                <TooltipMainProject />
              </Stack>
            </Grid>
            <Grid item md={12} xs={12}>
              <Stack spacing={1} sx={{ width: "100%" }}>
                <Stack direction={"row"} alignItems={"center"} spacing={1}>
                  <Typography variant="body1" fontWeight="medium">
                    Project / Task name
                  </Typography>
                </Stack>

                <TextField size="small" />
              </Stack>
            </Grid>
            <Grid item md={12} xs={12}>
              <Stack spacing={1}>
                <Typography variant="body1" fontWeight="medium">
                  Description / Detail
                </Typography>
                <TextField
                  variant="outlined"
                  size="small"
                  value={detail}
                  onChange={(e) => setDetail(e.target.value)}
                  multiline
                  minRows={4}
                  maxRows={16}
                  inputProps={{ maxLength: 500 }}
                  placeholder="Enter details here..."
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      padding: 1.5,
                    },
                  }}
                />
                <Typography
                  variant="body1"
                  fontWeight="medium"
                  sx={{ color: "#616161", alignSelf: "flex-end", mt: 1 }}
                >
                  {detail ? detail.length : 0}/500
                </Typography>
              </Stack>
            </Grid>
          </Grid>
        </Box>

        <Stack
          direction="row"
          spacing={1}
          justifyContent="flex-end"
          sx={{ mt: 1, mr: -1 }}
        >
          <Button
            onClick={onClose}
            variant="outlined"
            size="small"
            sx={{
              px: 3,
              textTransform: "none",
              borderColor: "#1e3a8a",
              color: "#1e3a8a",
              "&:hover": {
                backgroundColor: "#e0e7ff",
              },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => handleSave()}
            type="submit"
            variant="contained"
            size="small"
            sx={{
              px: 3,
              textTransform: "none",
              color: "#fff",
              backgroundImage: "linear-gradient(to right, #1e3a8a, #3b82f6)",
              "&:hover": {
                backgroundImage: "linear-gradient(to right, #1d4ed8, #2563eb)",
              },
            }}
          >
            Save
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default AddProjectDialog;
