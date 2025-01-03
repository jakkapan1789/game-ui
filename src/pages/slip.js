import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  TextField,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import axios from "axios";

const UploadPaymentSlip = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [error, setError] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        setError("Please select an image file.");
        return;
      }
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
      setError("");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedFile) {
      setError("No file selected. Please upload an image.");
      return;
    }
    // const axios = require("axios");
    // const FormData = require("form-data");
    // const fs = require("fs");

    try {
      const formData = new FormData();
      //   formData.append("file", fs.createReadStream("IMAGE_PATH"));
      formData.append("file", selectedFile);

      const { data } = await axios.post(
        "https://developer.easyslip.com/api/v1/verify",
        formData,
        {
          headers: {
            Authorization: "Bearer 8f0cacfe-1f57-4c67-8505-e9851105c7f2",
          },
        }
      );

      console.log(data);
    } catch (error) {
      console.error("Error", error);
    }

    // Perform upload logic here (e.g., send to an API)
    console.log("Uploading file:", selectedFile);
    alert("Payment slip uploaded successfully!");
  };

  return (
    <Box sx={{ p: 3, maxWidth: 400, mx: "auto", textAlign: "center" }}>
      <Typography variant="h6" gutterBottom>
        Upload Payment Slip
      </Typography>
      <Card variant="outlined" sx={{ p: 2, mb: 2 }}>
        {preview ? (
          <CardMedia
            component="img"
            height="200"
            image={preview}
            alt="Preview of the uploaded payment slip"
          />
        ) : (
          <CardContent sx={{ textAlign: "center", py: 5 }}>
            <ImageIcon sx={{ fontSize: 48, color: "gray" }} />
            <Typography variant="body2" color="textSecondary">
              No image selected
            </Typography>
          </CardContent>
        )}
      </Card>
      <Button variant="contained" component="label" fullWidth sx={{ mb: 2 }}>
        Choose File
        <input type="file" hidden onChange={handleFileChange} />
      </Button>
      {error && (
        <Typography variant="body2" color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleSubmit}
        disabled={!selectedFile}
      >
        Upload
      </Button>
    </Box>
  );
};

export default UploadPaymentSlip;
