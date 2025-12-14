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
import PaymentHistory from "../pages/Dashboard/PaymentHistory/PaymentHistory";
import Decorator from "../pages/Decorator/Decorator";
import ApproveDecorator from "../pages/Dashboard/ApproveDecorator/ApproveDecorator";
import UsersManagement from "../pages/Dashboard/UsersManagement/UsersManagement";
import AdminRoute from "./AdminRoute";
import AssignDecorator from "../pages/Dashboard/AssignDecorator/AssignDecorator";
import AssignedProjects from "../pages/Dashboard/AssignedProjects/AssignedProjects";
import DecoratorRoute from "./DecoratorRoute";
import Contact from "../pages/Contact/Contact";
import ProjectStatus from "../pages/Dashboard/ProjectStatus/ProjectStatus";
import EarningSummer from "../pages/Dashboard/EarningSummery/EarningSummer";
import DashboardHome from "../pages/Dashboard/DashboardHome/DashboardHome";
import Analytics from "../pages/Dashboard/Analytics/Analytics";
import Error from "../pages/Error/Error";



export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    errorElement: <Error></Error>,
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
        path: 'contact',
        element: <Contact></Contact>
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
        index: true,
        Component: DashboardHome
      },
      {
        path: 'analytics',
        element: <AdminRoute><Analytics></Analytics></AdminRoute>
      },
      {
        path: 'my-decorations',
        element: <AdminRoute><MyDecorations></MyDecorations></AdminRoute>
      },
      {
        path:'create-decoration',
        element: <AdminRoute><CreateDecoration></CreateDecoration></AdminRoute>
      },
      {
        path: 'payment/:decorationId',
        Component: Payment
      },
      {
        path: 'payment-history',
        Component: PaymentHistory
      },
      {
        path: 'become-decorator',
        Component: Decorator
      },
      {
        path: 'approve-decorator',
        element: <AdminRoute><ApproveDecorator></ApproveDecorator></AdminRoute>
      },
      {
        path: 'assign-decorator',
        element: <AdminRoute><AssignDecorator></AssignDecorator></AdminRoute>
      },
      {
        path: 'assigned-projects',
        element: <DecoratorRoute><AssignedProjects></AssignedProjects></DecoratorRoute>
      },
      {
        path: 'earning-summery',
        element: <DecoratorRoute><EarningSummer></EarningSummer></DecoratorRoute>
      },
      {
        path: 'project-status',
        element: <DecoratorRoute><ProjectStatus></ProjectStatus></DecoratorRoute>
      },
      {
        path: 'payment-success',
        Component: PaymentSuccess
      },
      {
        path: 'payment-cancelled',
        Component: PaymentCancelled
      
      },
      {
        path: 'users-management',
        element: <AdminRoute><UsersManagement></UsersManagement></AdminRoute>      
      },
      {
        path: 'profile',
        Component: Profile
      }
    ]
  },
]);
