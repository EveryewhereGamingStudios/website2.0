import { RouterProvider, createBrowserRouter } from "react-router-dom";
import MainLayout from "./Layouts/MainLayout";
import Home from "./Pages/Home";
import Waitlist from "./Pages/Waitlist";
import Signup from "./Pages/Signup";
import Blog from "./Pages/Blog";
import BlogArticle from "./Pages/BlogArticle";
import PrivacyPolicy from "./Pages/PrivacyPolicy";
import InGameActionsLayout from "./Layouts/InGameActionsLayout";
import GetNFT from "./Pages/GetNFT";
import Invest from "./Pages/Invest";
import { Footer } from "./Components/Footer";
import Deck from "./Pages/Deck";
import CreateArticle from "./Pages/CreateArticle";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/waitlist",
        element: (
          <div className="flex flex-col min-h-[85vh] min-w-screen overflow-hidden supports-[overflow:clip]:overflow-clip">
            <Waitlist />
            <Footer />
          </div>
        ),
      },
      {
        path: "/signup",
        element: (
          <div className="flex flex-col min-h-[85vh] min-w-screen overflow-hidden supports-[overflow:clip]:overflow-clip">
            <Signup />
            <Footer />
          </div>
        ),
      },
      {
        path: "/deck",
        element: (
          <div className="flex flex-col min-h-[85vh] min-w-screen overflow-hidden supports-[overflow:clip]:overflow-clip">
            <Deck />
            <Footer />
          </div>
        ),
      },
      {
        path: "/blog",
        element: (
          <div className="flex flex-col min-h-[85vh] min-w-screen overflow-hidden supports-[overflow:clip]:overflow-clip">
            <Blog />
            <Footer />
          </div>
        ),
      },
      {
        path: "/article/:id",
        element: (
          <div className="flex flex-col min-h-[85vh] min-w-screen overflow-hidden supports-[overflow:clip]:overflow-clip">
            <BlogArticle />
            <Footer />
          </div>
        ),
      },
      {
        path: "/privacy-policy",
        element: <PrivacyPolicy />,
      },
      {
        path: "/invest",
        element: (
          <div className="flex flex-col min-h-[85vh] min-w-screen overflow-hidden supports-[overflow:clip]:overflow-clip">
            <Invest />
            <Footer />
          </div>
        ),
      },
    ],
  },
  {
    path: "ingameactions",
    element: <InGameActionsLayout />,
    children: [
      {
        // path: "getnft/:game/:type/:id",
        path: "getnft",
        element: <GetNFT />,
      },
    ],
  },
  {
    path: "/createarticle",
    element: <CreateArticle />,
  },
  {
    path: "*",
    element: (
      <div className="bg-slate-800 h-screen items-center justify-center flex">
        <h1 style={{ textAlign: "center" }}>404 - Not found</h1>
        <h2 style={{ textAlign: "center" }}>Who/Where?</h2>
      </div>
    ),
  },
]);

const Routes = () => {
  return <RouterProvider router={router} />;
};

export default Routes;
