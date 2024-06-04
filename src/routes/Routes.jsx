import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LandingPage, SignUp, Login, BusinessProfileSetup, AdProfileSetup, UserProfileSetup,
    AdminLayout, Profile, FavoriteBusiness, LogOut, Messages, CreateBusiness,
    MyBusiness,
 } from "../components/pages";
 import {BusinessDashboardLayout, Leads, BusinessLogOut, BusinessMessages, BusinessProfile, Posts, Timeline,
  Reviews, Wallet
 } from '../components/businessDashboard/index'
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

          //business dashboard layout
          {
            path: `/businessDashboard/:id`,
            element: <BusinessDashboardLayout />,
            errorElement: <PageNotFound />,
            children: [
              {
                path: 'posts',
                element: <Posts />,
                errorElement: <PageNotFound />
              },
              {
                path: 'leads',
                element: <Leads />,
                errorElement: <PageNotFound />
              },
              {
                path: 'businessmessages',
                element: <BusinessMessages />,
                errorElement: <PageNotFound />
              },
              {
                path: 'businesslogout',
                element: <BusinessLogOut />,
                errorElement: <PageNotFound />
              },
              {
                path: 'businessprofile',
                element: <BusinessProfile />,
                errorElement: <PageNotFound />
              },
              {
                path: 'timeline',
                element: <Timeline />,
                errorElement: <PageNotFound />
              },
              {
                path: 'reviews',
                element: <Reviews />,
                errorElement: <PageNotFound />
              },
              {
                path: 'wallet',
                element: <Wallet />,
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