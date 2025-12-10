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
import DashboardLayout from "../layouts/DashboardLayout";
import Service from "../pages/Service/Service";
import Profile from "../pages/Profile/Profile";
import CreateDecoration from "../pages/CreateDecoration/CreateDecoration";
import MyDecorations from "../pages/Dashboard/MyDecorations/MyDecorations";
import Payment from "../pages/Dashboard/Payment/Payment";
import PaymentSuccess from "../pages/Dashboard/Payment/PaymentSuccess";
import PaymentCancelled from "../pages/Dashboard/Payment/PaymentCancelled";
import ServiceDetails from "../pages/Service/ServiceDetails";



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
        path: '/service',
        element: <Service></Service>
      },
      {
        path: '/service/:id',
        element: <ServiceDetails></ServiceDetails>
      },
      {
        path: 'profile',
        element: <PrivateRoute><Profile></Profile></PrivateRoute>
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
    path: "dashboard",
    element:
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ,
    children: [
      {
        path: 'my-decorations',
        Component: MyDecorations
      },
      {
        path:'create-decoration',
        Component: CreateDecoration
      },
      {
        path: 'payment/:decorationId',
        Component: Payment
      },
      {
        path: 'payment-success',
        Component: PaymentSuccess
      },
      {
        path: 'payment-cancelled',
        Component: PaymentCancelled
      }
    ]
  },
]);
