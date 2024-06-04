import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  LandingPage, SignUp, Login, BusinessProfileSetup, AdProfileSetup, UserProfileSetup,
  AdminLayout, Profile, FavoriteBusiness, LogOut, Messages, CreateBusiness,
  MyBusiness,
  Wallet,
} from "../components/pages";
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
      path: "/wallet",
      element: <Wallet />,
      errorElement: <PageNotFound />
    },
    {
      path: "/login",
      element: <Login />,
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

    {
      path: '/dashboard',
      element: <AdminLayout />,
      errorElement: <PageNotFound />,
      children: [
        {
          path: 'profile',
          element: <Profile />,
          errorElement: <PageNotFound />
        },
        {
          path: 'favoritebusiness',
          element: <FavoriteBusiness />,
          errorElement: <PageNotFound />
        },
        {
          path: 'messages',
          element: <Messages />,
          errorElement: <PageNotFound />
        },
        {
          path: 'createbuisness',
          element: <CreateBusiness />,
          errorElement: <PageNotFound />
        },
        {
          path: 'logout',
          element: <LogOut />,
          errorElement: <PageNotFound />
        },
        {
          path: 'mybusiness',
          element: <MyBusiness />,
          errorElement: <PageNotFound />
        },

      ]
    },
  ]);

  return (
    <RouterProvider router={router} />
  )
}

export default Routes;