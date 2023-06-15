import { RouterProvider, createBrowserRouter } from "react-router-dom"
import MainLayout from "./Layouts/MainLayout";
import Home from "./Pages/Home";
import Waitlist from "./Pages/Waitlist";
import Signup from "./Pages/Signup";
import Blog from "./Pages/Blog";
import BlogArticle from "./Pages/BlogArticle";
import AdminLayout from "./Layouts/AdminLayout";
import PrivacyPolicy from "./Pages/PrivacyPolicy";
import InGameActionsLayout from "./Layouts/InGameActionsLayout";
import GetNFT from "./Pages/GetNFT";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/waitlist",
                element: <Waitlist />
            },
            {
                path: "/signup",
                element: <Signup />,
            },
            {
                path: "/blog",
                element: <Blog />
            },
            {
                path: "/blog/:id",
                element: <BlogArticle />
            },
            {

                path: "/privacy-policy",
                element: <PrivacyPolicy />
            }
        ]
    },
    {
        path: "/admin",
        element: <AdminLayout />,
        children: [
            {
                path: "",
                element: <h1>Hello</h1>
            }
        ]
    },
    {
        path: "ingameactions",
        element: <InGameActionsLayout />,
        children: [
            {  
                // path: "getnft/:game/:type/:id",
                path: "getnft",
                element: <GetNFT />
            }
        ]
    }
    // {
    //     path: "*",
    //     element: <>
    //         <h1 style={{textAlign:"center"}}>404 - Not found</h1>
    //         <h2 style={{textAlign:"center"}}>Who/Where?</h2>
    //     </>
    // }
]);


const Routes = () => {
    return <RouterProvider router={router} />
};

export default Routes;