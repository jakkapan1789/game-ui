import { styled } from "@mui/material/styles";
import TableRow from "@mui/material/TableRow";
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(even)": {
    // backgroundColor: "#F3F5F7",
    backgroundColor: "#F3F5F7",
  },
  "&:nth-of-type(odd)": {
    backgroundColor: "#FFFFFF",
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default StyledTableRow;
