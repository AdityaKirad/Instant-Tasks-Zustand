import App from "./App";
import { RootRoute, Router, Route } from "@tanstack/react-router";
import {
  Completed,
  Directories,
  Directory,
  Error404,
  Home,
  Id,
  Important,
  Incomplete,
  Layout,
  Today,
} from "./routes";

const rootRoute = new RootRoute({
  component: App,
});

const layoutRoute = new Route({
  getParentRoute: () => rootRoute,
  component: Layout,
  id: "Layout",
});

const error404Route = new Route({
  getParentRoute: () => rootRoute,
  component: Error404,
  path: "/*",
});

const indexRoute = new Route({
  getParentRoute: () => layoutRoute,
  component: Home,
  path: "/",
});

const completedRoute = new Route({
  getParentRoute: () => layoutRoute,
  component: Completed,
  path: "completed",
});

const incompleteRoute = new Route({
  getParentRoute: () => layoutRoute,
  component: Incomplete,
  path: "incomplete",
});

const importantRoute = new Route({
  getParentRoute: () => layoutRoute,
  component: Important,
  path: "important",
});

const todayRoute = new Route({
  getParentRoute: () => layoutRoute,
  component: Today,
  path: "today",
});

const directoriesRoute = new Route({
  getParentRoute: () => layoutRoute,
  component: Directories,
  path: "directories",
});

const directoryRoute = new Route({
  getParentRoute: () => directoriesRoute,
  component: Directory,
  path: "$directory",
});

const idRoute = new Route({
  getParentRoute: () => layoutRoute,
  component: Id,
  path: "/id",
});

const routeTree = rootRoute.addChildren([
  layoutRoute.addChildren([
    indexRoute,
    completedRoute,
    incompleteRoute,
    importantRoute,
    todayRoute,
    directoriesRoute.addChildren([directoryRoute]),
    idRoute,
  ]),
  error404Route,
]);

export const router = new Router({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
