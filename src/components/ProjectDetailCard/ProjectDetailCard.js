import React, { useState } from "react";
import {
  Card,
  Stack,
  Typography,
  Divider,
  Chip,
  IconButton,
  Tooltip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
const ProjectDetailCard = ({ initialData, onEdit, onDelete }) => {
  const [projectData, setProjectData] = useState(initialData);

  const handleEdit = () => {
    if (onEdit) {
      const updatedData = onEdit(projectData); // Assume onEdit returns updated data
      setProjectData(updatedData);
    }
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete(projectData);
    }
  };

  return (
    <Card sx={{ p: 2 }}>
      <Stack direction="column">
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography
            variant="body"
            sx={{
              color: "#455A64",
              fontWeight: "bold",
            }}
          >
            Project Detail
          </Typography>
          <Stack direction="row" spacing={1}>
            <IconButton
              onClick={handleEdit}
              size="small"
              sx={{
                border: "1px solid gray",
                borderRadius: 2,
                ":hover": { color: "#FF9D3D", border: "1px solid #FF9D3D" },
              }}
            >
              <EditOutlinedIcon sx={{ fontSize: 16 }} />
            </IconButton>

            <IconButton
              onClick={handleDelete}
              size="small"
              sx={{
                border: "1px solid gray",
                borderRadius: 2,
                ":hover": { color: "red", border: "1px solid red" },
              }}
            >
              <DeleteOutlineIcon sx={{ fontSize: 16 }} />
            </IconButton>
          </Stack>
        </Stack>
        <Divider sx={{ my: 1 }} />
      </Stack>

      <Stack direction="column" spacing={1}>
        <DetailRow label="BU Name:" value={projectData.buName} />
        <DetailRow label="Project Name:" value={projectData.projectName} />
        <DetailRow label="Job Type:" value={projectData.jobType} />
        <DetailRow label="Reference:" value={projectData.reference} />

        <Stack direction="row" spacing={1} alignItems="center">
          <Typography
            variant="body"
            sx={{
              color: "#455A64",
              fontWeight: "bold",
            }}
          >
            Priority:
          </Typography>
          <Chip
            size="small"
            sx={{
              px: 0.5,
              bgcolor: projectData.priority === "High" ? "#FAD4D4" : "#DFF2BF",
              color: projectData.priority === "High" ? "#FF4C4C" : "#4CAF50",
              border: `1px solid ${
                projectData.priority === "High" ? "#FF4C4C" : "#4CAF50"
              }`,
            }}
            label={projectData.priority}
          />
        </Stack>

        <Stack direction="row" spacing={1} alignItems="center">
          <Typography
            variant="body"
            sx={{
              color: "#455A64",
              fontWeight: "bold",
            }}
          >
            Status:
          </Typography>
          <Chip
            size="small"
            sx={{
              px: 0.5,
              bgcolor: projectData.status === "Pending" ? "#FFF8E1" : "#DFF2BF",
              color: projectData.status === "Pending" ? "#FF852C" : "#4CAF50",
              border: `1px solid ${
                projectData.status === "Pending" ? "#FF852C" : "#4CAF50"
              }`,
            }}
            label={projectData.status}
          />
        </Stack>
      </Stack>
    </Card>
  );
};

const DetailRow = ({ label, value }) => (
  <>
    <Typography
      variant="body"
      sx={{
        color: "#455A64",
        fontWeight: "bold",
      }}
    >
      {label}
    </Typography>
    <Typography variant="body" sx={{ color: "#455A64" }}>
      {value}
    </Typography>
  </>
);

export default ProjectDetailCard;
