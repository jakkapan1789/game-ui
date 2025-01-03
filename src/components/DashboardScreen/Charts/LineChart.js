"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Stack } from "@mui/material";
import CustomWaveSkeleton from "@/components/CustomSkeleton/CustomWaveSkeleton";
const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

const LineChart = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setInterval(() => {
      setIsLoading(false);
    }, 3000);
  }, []);
  const [state, setState] = React.useState({
    series: [
      {
        name: "Project",
        data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "straight",
      },
      title: {
        text: "Total Task Complete by Month",
        align: "left",
        fontSize: "14px",
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5,
        },
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
        ],
      },
    },
  });
  if (isLoading) {
    return (
      <>
        <Stack
          direction={"row"}
          display={"flex"}
          justifyContent={"space-between"}
        >
          <CustomWaveSkeleton height={40} sx={{ width: "20%", mt: -1 }} />
          <CustomWaveSkeleton height={40} sx={{ width: "3%", mt: -1 }} />
        </Stack>
        <CustomWaveSkeleton height={530} sx={{ width: "100%", mt: -13 }} />
      </>
    );
  }

  return (
    <ApexChart
      options={state.options}
      series={state.series}
      type="line"
      height={350}
    />
  );
};

export default LineChart;
