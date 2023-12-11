import { Outlet } from "@tanstack/react-router";
import { SnackbarProvider } from "notistack";
import { useSliders } from "../store";
import Slider from "../components/Slider";
import Navbar from "../components/Navbar";
import TodaysTaskBar from "../components/TodaysTaskBar";
import Main from "../components/Main";

function Layout() {
  const [menu, todaysTasks, menuSet, todaysTasksSet] = useSliders((state) => [
    state.menu,
    state.todaysTasks,
    state.menuSet,
    state.todaysTasksSet,
  ]);
  return (
    <SnackbarProvider>
      <Slider open={menu} onClose={() => menuSet(false)} direction="left">
        <Navbar />
      </Slider>
      <Main>
        <Outlet />
      </Main>
      <Slider
        open={todaysTasks}
        onClose={() => todaysTasksSet(false)}
        direction="right"
      >
        <TodaysTaskBar />
      </Slider>
    </SnackbarProvider>
  );
}
export default Layout;
