import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home/Home";
import About from "../pages/About/About";
import Story from "../pages/About/Story";
import Mission from "../pages/About/Mission";
import Success from "../pages/About/Success";
import Team from "../pages/About/Team";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Register/Register";
import PrivateRoute from "./PrivateRoute";
import Decorator from "../pages/Service/Service";
import DecorationItem from "../pages/DecorationItem/DecorationItem";
import DashboardLayout from "../layouts/DashboardLayout";
import Statistics from "../components/Dashboard/Statistics/Statistics";
import AddDecoration from "../pages/Dashboard/Admin/AddDecoration";
import MyInventory from "../pages/Dashboard/Admin/MyInventory";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";
import MyOrders from "../pages/Dashboard/Customer/MyOrders";
import ManageOrders from "../pages/Dashboard/Decorator/ManageOrders";
import Service from "../pages/Service/Service";
import DecorationDetails from "../pages/DecorationDetails/DecorationDetails";



export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
        loader: () => fetch("/serviceCenters.json").then((res) => res.json()),
      },
      {
        path: 'decoration/:id',
        element: <DecorationDetails></DecorationDetails>
      },
      {
        path: '/service',
        element: <Service></Service>
      },
      // {
      //   path: "decorator",
      //   element: (
      //     <PrivateRoute>
      //       <Decorator></Decorator>
      //     </PrivateRoute>
      //   ),
      // },
      // {
      //   path: "decoration-item",
      //   element: (
      //     <PrivateRoute>
      //       <DecorationItem></DecorationItem>
      //     </PrivateRoute>
      //   ),
      // },
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
    ],
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <PrivateRoute>
            <Statistics />
          </PrivateRoute>
        ),
      },
      {
        path: "add-decoration",
        element: (
          <PrivateRoute>
            <AddDecoration></AddDecoration>
          </PrivateRoute>
        ),
      },
      {
        path: "my-inventory",
        element: (
          <PrivateRoute>
            <MyInventory></MyInventory>
          </PrivateRoute>
        ),
      },
      {
        path: "manage-users",
        element: (
          <PrivateRoute>
            <ManageUsers></ManageUsers>
          </PrivateRoute>
        ),
      },
      // {
      //   path: 'profile',
      //   element: (
      //     <PrivateRoute>
      //       <Profile />
      //     </PrivateRoute>
      //   ),
      // },
      {
        path: "my-orders",
        element: (
          <PrivateRoute>
            <MyOrders></MyOrders>
          </PrivateRoute>
        ),
      },
      {
        path: "manage-orders",
        element: <ManageOrders></ManageOrders>,
      },
    ],
  },
]);
