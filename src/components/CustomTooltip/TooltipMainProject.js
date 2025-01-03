import * as React from "react";
import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import InfoIcon from "@mui/icons-material/Info";
import { Typography, IconButton, Box } from "@mui/material";

const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} placement="right" />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#ffffff",
    color: "#333333",
    width: "100%",
    maxWidth: 320,
    fontSize: theme.typography.pxToRem(14),
    padding: theme.spacing(2),
    border: "1px solid #e0e0e0",
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[1],
  },
}));

export default function TooltipMainProject() {
  return (
    <HtmlTooltip
      title={
        <React.Fragment>
          <Typography
            sx={{ color: "#1e3a8a", fontWeight: "bold" }}
            textAlign={"center"}
          >
            ข้อพิจราณาการเป็น Main Project
          </Typography>
          <Box
            component="ul"
            sx={{ pl: 2, mb: 0, typography: "body2", color: "text.secondary" }}
          >
            <li>
              โปรเจค เล็ก กลาง ใหญ่ ที่มีเนื้อหาชัดเจนว่า BU มาขอให้ทำงานให้
              และควรมี GOLF ID.
            </li>
            <li>BU Management กลับมาอ่านแล้วต้องเข้าใจว่าทำอะไรไปให้กับ BU</li>
            <li>
              งานเหล่านี้ไม่ถือเป็น Main Project:
              <Box component="ul" sx={{ pl: 2, mt: 1 }}>
                <li>A. เป็นงานย่อยของโปรเจคหลักอื่น</li>
                <li>B. แก้ Bug ของเราเอง</li>
                <li>C. Meeting</li>
                <li>D. วิเคราห์ แก้ไขปัญหาเบื้องต้น</li>
                <li>E. งานที่มีขนาดเล็กมาก เช่น ใช้เวลาน้อยกว่า 1 ชม.</li>
              </Box>
            </li>
          </Box>
        </React.Fragment>
      }
    >
      <IconButton size="small">
        <InfoIcon
          sx={{
            color: "#1e3a8a",
          }}
        />
      </IconButton>
    </HtmlTooltip>
  );
}
