import React from "react";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Chip } from "@mui/material";

let channelInfo = {
  "Prompt Plus เว็ปไซต์ และแอปพลิเคชั่น": "chanel_pplus_status",
  "Line OA": "chanel_lineoa_status",
  SMS: "chanel_sms_status",
  "Notification บน Prompt Plus": "chanel_noti_pplus_status",
  "Notification บน Chang Family": "chanel_noti_chang_status",
};

function getChannel(campaigns) {
  let activeChannelCount = 0;
  const activeChannels = Object.entries(channelInfo).reduce(
    (acc, [title, key]) => {
      if (campaigns[key]) {
        acc.push({ no: acc.length + 1, title });
        activeChannelCount++;
      }
      return acc;
    },
    []
  );

  return { activeChannels, activeChannelCount };
}

const ChanelTooltip = ({ data }) => {
  let check = getChannel(data);
  return (
    <Tooltip
      title={
        <React.Fragment>
          <Typography variant="body2" sx={{ fontSize: 12, fontWeight: "bold" }}>
            {data.chanel_amount} ช่องทาง
          </Typography>
          <Box sx={{ mt: 0.5 }}>
            {check.activeChannels.map((val, index) => {
              return (
                <Typography key={index} variant="body2" sx={{ fontSize: 12 }}>
                  {val.no}. {val.title}
                </Typography>
              );
            })}
          </Box>
        </React.Fragment>
      }
      arrow
    >
      <Chip label={data.chanel_amount} />
    </Tooltip>
  );
};

export default ChanelTooltip;
