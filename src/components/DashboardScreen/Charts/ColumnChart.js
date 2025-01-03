//
"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Stack } from "@mui/material";
import CustomWaveSkeleton from "@/components/CustomSkeleton/CustomWaveSkeleton";
const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

const ColumnChart = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setInterval(() => {
      setIsLoading(false);
    }, 500);
  }, []);
  const [state, setState] = React.useState({
    series: [
      {
        data: [21, 22, 10, 28, 16, 21, 13, 30],
        name: "Task",
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "bar",
        events: {
          click: function (chart, w, e) {},
        },
      },
      plotOptions: {
        bar: {
          columnWidth: "45%",
          distributed: true,
        },
      },
      dataLabels: {
        enabled: true, // Enables data labels
        style: {
          fontSize: "12px", // Adjust font size
          colors: ["#213555"], // Text color for data labels
        },
        formatter: function (val) {
          return val; // Displays the value directly
        },
      },
      legend: {
        show: false,
      },
      xaxis: {
        categories: [
          "Meeting",
          "Bug fixing",
          "Analysis",
          "Implementation",
          "Development",
          "Audit",
          "Compliance",
          "Infrastructure",
        ],
        labels: {
          style: {
            fontSize: "12px",
          },
        },
        fill: {
          type: "gradient",
        },
      },
      title: {
        text: "Summary of Job Type",
        align: "left",
        style: {
          fontSize: "14px",
          fontWeight: "bold",
        },
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
      type="bar"
      height={350}
    />
  );
};

export default ColumnChart;
