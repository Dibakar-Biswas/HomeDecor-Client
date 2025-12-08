import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home/Home";
import About from "../pages/About/About";
import Story from "../pages/About/Story";
import Mission from "../pages/About/Mission";
import Success from "../pages/About/Success";
import Team from "../pages/About/Team";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
        {
            index: true,
            Component: Home,
            loader: () => fetch('/serviceCenters.json').then(res => res.json())
        },
        {
        path: "/about",
        Component: About,
        children: [
          {
            path: "/about/story",
            Component: Story,
          },
          {
            path: "/about/mission",
            Component: Mission,
          },
          {
            path: "/about/success",
            Component: Success,
          },
          {
            path: "/about/team",
            Component: Team,
          },
        ],
      },
    ]
  },
]);