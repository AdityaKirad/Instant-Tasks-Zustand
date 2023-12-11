import { type ReactNode } from "react";
import { Box } from "@mui/material";
import SearchAndNavbar from "./SearchAndNavbar";
import TodosSortAndOrder from "./TodosSortAndOrder";

function Main({ children }: { children: ReactNode }) {
  return (
    <Box component="main" width={{ xl: "60%" }} mx="auto">
      <Box
        component="header"
        position="sticky"
        top="0"
        padding="1rem 2rem"
        bgcolor="#22283180"
        zIndex={10}
        sx={{ backdropFilter: "blur(1rem)" }}
      >
        <SearchAndNavbar />
        <TodosSortAndOrder />
      </Box>
      {children}
    </Box>
  );
}
export default Main;
