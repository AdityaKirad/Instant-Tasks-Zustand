import { lazy, Suspense } from "react";
import { Outlet } from "@tanstack/react-router";
import {
  CssBaseline,
  GlobalStyles,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { theme } from "./utils/theme";

const TanStackRouterDevtools =
  import.meta.env.MODE === "production"
    ? () => null
    : lazy(() =>
        import("@tanstack/router-devtools").then((res) => ({
          default: res.TanStackRouterDevtools,
        }))
      );

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles
        styles={{ html: { fontSize: "62.5%" }, body: { overflowX: "hidden" } }}
      />
      <Outlet />
      <Suspense
        fallback={<Typography>Tanstack router devtools are loading</Typography>}
      >
        <TanStackRouterDevtools position="bottom-right" />
      </Suspense>
    </ThemeProvider>
  );
}

export default App;
