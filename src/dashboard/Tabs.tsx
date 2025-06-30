import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
const nodecg = (window as any).nodecg;

export default function ScrollableTabsButtonPrevent({
  names,
  urls,
}: {
  names: string[];
  urls: string[];
}) {
  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <Box sx={{ bgcolor: "background.paper" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons={false}
          aria-label="scrollable prevent tabs example"
        >
          {names.map((name: string, idx: number) => (
            <Tab
              label={name}
              onClick={() => {
                setValue(idx);
                nodecg.log.info(`Opening ${name} in browser`);
                nodecg.sendMessage("openBrowser", name);
              }}
            />
          ))}
        </Tabs>
      </Box>
      <iframe
        src="http://localhost:7900/?autoconnect=1&resize=scale&password=secret"
        title="noVNC Viewer"
        width={1080}
        height={720}
        loading="eager"
      ></iframe>
    </>
  );
}
