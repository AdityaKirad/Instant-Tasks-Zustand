import { Box } from "@mui/material";
import { Outlet } from "@tanstack/react-router";

export function Directories() {
  return (
    <Box>
      Directories
      <Outlet />
    </Box>
  );
}

export function Directory() {
  return <Box>This is directory sub layout</Box>;
}
