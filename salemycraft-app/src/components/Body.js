import Browse from "./Browse";
import Login from "./Login";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";

const Body = () => {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "//browser",
      element: <Browse />,
    },
  ]);
  return (
    <div>
      <Toaster position="top-center" />
      <RouterProvider router={appRouter} />
    </div>
  );
};
export default Body;
