import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LandingPage, SignUp, Login } from "../components/pages";
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
    ]);

  return (
    <RouterProvider router={router} />
  )
}

export default Routes;