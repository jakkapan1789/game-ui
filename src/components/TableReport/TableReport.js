import * as React from "react";
import { styled } from "@mui/material/styles";
import { tableCellClasses } from "@mui/material/TableCell";
import {
  Box,
  Stack,
  Typography,
  Grid,
  Pagination,
  Select,
  Card,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
} from "@mui/material";
import SearchOffIcon from "@mui/icons-material/SearchOff";
import ChipStatus from "./ChipStatus/ChipStatus";
import StyledTableRow from "./StyledTableRow/StyledTableRow";
import { useRouter } from "next/router";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import useDialog from "../CustomDialog/useDialog";
import { useLoading } from "@/context/hook";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#1e3a8a",
    // backgroundColor: "#3b82f6",
    console: "#616161",
    color: "white",
    fontWeight: "bold",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));
export default function TableReport({ rows }) {
  const [showDialog, DialogComponent] = useDialog();
  const { startLoading, stopLoading } = useLoading();
  const router = useRouter();
  const defaultRowHeight = 60;
  const rowsPerPage = 8;
  const [page, setPage] = React.useState(1);
  const [pageCount, setPageCount] = React.useState(
    Math.ceil(rows.length / rowsPerPage)
  );
  const [paginatedRows, setPaginatedRows] = React.useState([]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleSelectChange = (event) => {
    setPage(event.target.value);
  };

  React.useEffect(() => {
    let filteredRows = rows;
    const startIndex = (page - 1) * rowsPerPage;
    const endIndex = Math.min(startIndex + rowsPerPage, filteredRows.length);
    const newPaginatedRows = filteredRows.slice(startIndex, endIndex);

    setPaginatedRows(newPaginatedRows);
  }, [page, rows]);

  React.useEffect(() => {
    setPageCount(Math.ceil(rows.length / rowsPerPage));
  }, [rows]);
  const mockApiCall = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("success");
      }, 3000);
    });
  };

  const handleDelete = async () => {
    const result = await showDialog({
      title: "Confirmation",
      message: "Are you sure you want to delete this item?",
      icon: "error",
      btnConfirmText: "Delete",
      btnCancelText: "Cancel",
    });

    if (result) {
      startLoading();
      await mockApiCall();
      stopLoading();
      await showDialog({
        title: "Notification",
        message: "This item has been deleted",
        icon: "success",
        btnConfirmText: "OK",
      });
    } else {
      console.log("Deletion canceled.");
    }
  };

  return (
    <>
      {DialogComponent}
      <Box
        component={Card}
        sx={{ borderRadius: "8px", bgcolor: "#F3F5F7", mt: 2 }}
      >
        <TableContainer
          style={{
            minHeight: defaultRowHeight * 9.5,
            maxHeight: defaultRowHeight * 9.5,
            overflow: "auto",
            borderRadius: "8px",
          }}
        >
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>BU</StyledTableCell>
                <StyledTableCell align="left">Project / Task</StyledTableCell>
                <StyledTableCell align="left">Job Type</StyledTableCell>
                <StyledTableCell align="left">Reference</StyledTableCell>
                <StyledTableCell align="left">Requestor</StyledTableCell>
                <StyledTableCell align="left">
                  Start Date - Finish Date
                </StyledTableCell>
                <StyledTableCell align="left">Duration</StyledTableCell>
                <StyledTableCell align="center">Status</StyledTableCell>
                <StyledTableCell align="left">Actions</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedRows.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} sx={{ border: "none" }}>
                    <Grid container>
                      <Grid item xs={12}>
                        <Stack
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: 60,
                            marginTop: 10,
                          }}
                        >
                          <SearchOffIcon
                            sx={{ color: "#455A64", fontSize: 40 }}
                          />
                          <Typography
                            sx={{ color: "#455A64", fontWeight: "bold" }}
                          >
                            The results you are looking for are not found.
                          </Typography>
                          <Typography sx={{ color: "#455A64" }}>
                            Please try using another search term and try
                            searching again.
                          </Typography>
                        </Stack>
                      </Grid>
                    </Grid>
                  </TableCell>
                </TableRow>
              ) : (
                paginatedRows.map((row, index) => (
                  <StyledTableRow
                    key={index}
                    sx={{
                      minHeight: 60,
                      height: "100%",
                      maxHeight: 60,
                      cursor: "pointer",
                      transition: "transform 0.3s ease;",
                      ":hover": { bgcolor: "#EEEEEE" },
                    }}
                    // onClick={() => router.push("/tasks/edit")}
                  >
                    <StyledTableCell component="th" scope="row">
                      {row.buName}
                    </StyledTableCell>
                    <StyledTableCell
                      align="left"
                      style={{
                        color: "rgb(21,119,245)",
                        fontWeight: "bold",

                        textDecoration: "underline",
                      }}
                      onClick={() => router.push("/tasks/edit")}
                    >
                      {row.projectName}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {row.jobType}
                    </StyledTableCell>
                    <StyledTableCell align="left">{row.ref}</StyledTableCell>
                    <StyledTableCell align="left">
                      {row.requestor}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {row.lastUpdate
                        ? new Date(row.lastUpdate).toISOString().split("T")[0]
                        : ""}{" "}
                      - Present
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {row.duration}
                    </StyledTableCell>

                    <StyledTableCell align="center">
                      <ChipStatus status={row.status} reApp={row.has_history} />
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      <Stack direction={"row"} spacing={0.4}>
                        <IconButton
                          sx={{
                            border: "1px solid gray",
                            borderRadius: 2,
                            ":hover": {
                              color: "#FF9D3D",
                              border: "1px solid #FF9D3D",
                            },
                          }}
                          size="small"
                        >
                          <EditOutlinedIcon sx={{ fontSize: 16 }} />
                        </IconButton>

                        <IconButton
                          sx={{
                            border: "1px solid gray",
                            borderRadius: 2,
                            ":hover": { color: "red", border: "1px solid red" },
                          }}
                          size="small"
                          onClick={() => handleDelete()}
                        >
                          <DeleteOutlineIcon sx={{ fontSize: 16 }} />
                        </IconButton>
                      </Stack>
                    </StyledTableCell>
                  </StyledTableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            bgcolor: "white",
            paddingTop: 2,
          }}
        >
          <Grid container>
            <Grid
              item
              xs={4}
              md={4}
              lg={4}
              sx={{ textAlign: "left", paddingLeft: 2, paddingBottom: 1 }}
            >
              <Typography>Total {rows.length} </Typography>
            </Grid>
            <Grid
              item
              xs={4}
              md={4}
              lg={4}
              sx={{
                display: "flex",
                justifyContent: "center",
                textAlign: "center",
                paddingBottom: 1,
              }}
            >
              <Pagination
                count={pageCount}
                page={page}
                onChange={handlePageChange}
              />
            </Grid>
            <Grid
              item
              xs={4}
              md={4}
              lg={4}
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                paddingRight: 2,
                paddingBottom: 1,
              }}
            >
              <Typography sx={{ marginRight: 1 }}>Page</Typography>
              <Select
                size="small"
                value={page}
                onChange={handleSelectChange}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      maxHeight: 200,
                      mt: -8,
                    },
                  },
                }}
              >
                {Array.from({ length: pageCount ? pageCount : 1 }, (_, i) => (
                  <MenuItem key={i + 1} value={i + 1}>
                    {i + 1}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
}
