import { createBrowserRouter } from "react-router";
import LoginScreen from "./screens/LoginScreen";
import TasksScreen from "./screens/TasksScreen";
import CompletedScreen from "./screens/CompletedScreen";
import CompletedReviewingScreen from "./screens/CompletedReviewingScreen";
import CompletedReworkScreen from "./screens/CompletedReworkScreen";
import MessagesAdminScreen from "./screens/MessagesAdminScreen";
import MessagesTeamScreen from "./screens/MessagesTeamScreen";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: LoginScreen,
  },
  {
    path: "/tasks",
    Component: TasksScreen,
  },
  {
    path: "/completed",
    Component: CompletedScreen,
  },
  {
    path: "/completed/reviewing",
    Component: CompletedReviewingScreen,
  },
  {
    path: "/completed/rework",
    Component: CompletedReworkScreen,
  },
  {
    path: "/messages/admin",
    Component: MessagesAdminScreen,
  },
  {
    path: "/messages/team",
    Component: MessagesTeamScreen,
  },
]);
