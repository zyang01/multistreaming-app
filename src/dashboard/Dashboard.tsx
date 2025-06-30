import React from "react";
import Button from "@mui/material/Button";
import ScrollableTabsButtonPrevent from "./Tabs";
import config from "../../config.json";

export function Dashboard() {
  const [names, urls] = Object.entries(config).reduce<[string[], string[]]>(
    ([names, urls], [name, url]) => [
      [...names, name],
      [...urls, String(url)],
    ],
    [[], []]
  );
  return <ScrollableTabsButtonPrevent names={names} urls={urls} />;
}
