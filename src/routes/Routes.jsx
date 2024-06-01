import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LandingPage, SignUp, Login, Dashboard, BusinessProfileSetup, AdProfileSetup, UserProfileSetup } from "../components/pages";
import { PageNotFound } from "../components/errorPages";
function Routes() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <LandingPage />,
            errorElement: <PageNotFound />
        },
        {
            path: "/signup",
            element: <SignUp />,
            errorElement: <PageNotFound />
        },
        {
            path: "/login",
            element: <Login />,
            errorElement: <PageNotFound />
        },
        {
            path: "/dashboard",
            element: <Dashboard />,
            errorElement: <PageNotFound />
        },
        {
            path: "/businessprofilesetup",
            element: <BusinessProfileSetup />,
            errorElement: <PageNotFound />
        },
        {
            path: "/adprofilesetup",
            element: <AdProfileSetup />,
            errorElement: <PageNotFound />
        },
        {
            path: "/userprofilesetup",
            element: <UserProfileSetup />,
            errorElement: <PageNotFound />
        },
    ]);

  return (
    <RouterProvider router={router} />
  )
}

export default Routes;