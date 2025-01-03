"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Stack } from "@mui/material";
import CustomWaveSkeleton from "@/components/CustomSkeleton/CustomWaveSkeleton";

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

const DonutChart = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setInterval(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  const [state, setState] = React.useState({
    series: [10, 41, 35, 51],
    options: {
      chart: {
        type: "donut",
        animations: { enabled: true },
      },
      labels: ["Complete", "Pending", "Hold", "Cancel"],
      fill: {
        type: "gradient",
      },
      stroke: {
        width: 2,
        colors: ["#fff"],
      },
      title: {
        text: "Summary of current work",
        align: "left",
        fontSize: "14px",
      },
      legend: {
        position: "bottom",
        labels: { colors: ["#000"] },
      },
      tooltip: {
        theme: "dark",
        y: { formatter: (value) => `${value}` },
      },
      dataLabels: {
        enabled: true,
      },
    },
  });

  if (isLoading) {
    return (
      <Stack
        direction="column"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <CustomWaveSkeleton
          height={40}
          sx={{ width: "40%", alignSelf: "flex-start" }}
        />
        <CustomWaveSkeleton height={270} width={270} variant="circular" />
        <CustomWaveSkeleton height={40} sx={{ width: "60%", mt: 0.5 }} />
      </Stack>
    );
  }

  return (
    <ApexChart
      options={state.options}
      series={state.series}
      type="donut"
      height={350}
    />
  );
};

export default DonutChart;
