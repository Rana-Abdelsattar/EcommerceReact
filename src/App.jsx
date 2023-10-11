import "./App.css";
import { createBrowserRouter, createHashRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home/Home.jsx";
import Products from "./components/Products/Products";
import Register from "./components/Register/Register";
import Signin from "./components/Signin/Signin";
import Notfound from "./components/Notfound/Notfound";
import Layout from "./components/Layout/Layout";
import Cart from "./components/Cart/Cart";
import Categories from "./components/Categories/Categories";
import Brands from "./components/Brands/Brands";
import { useContext, useEffect } from "react";
import { userTokenContext } from "./Context/UserToken";
import ProtectedRouter from "./components/ProtectedRouter/ProtectedRouter";
import Details from "./components/Details/Details";
import CartContextProvider from "./Context/CartContext";
import { Toaster } from 'react-hot-toast';
import Profile from "./components/Profile/Profile";
import UserProfileContextProvider from "./Context/UserProfileContext";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import ResetPassword from "./components/ResetPassword/ResetPassword";
import UserAddress from "./components/UserAddress/UserAddress";
import Orders from "./components/Orders/Orders";
import CashPayment from "./components/CashPayment/CashPayment";
import MainSlider from "./components/MainSlider/MainSlider";

let Router = createHashRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path:"",
        element: (
          <ProtectedRouter>
            <Home />
          </ProtectedRouter>
        ),
      },
      {
        path: "home",
        element: (
          <ProtectedRouter>
            <Home />
          </ProtectedRouter>
        ),
      },
      {
        path: "products",
        element: (
          <ProtectedRouter>
            <Products />
          </ProtectedRouter>
        ),
      },
      {
        path: "categories",
        element: (
          <ProtectedRouter>
            <Categories />
          </ProtectedRouter>
        ),
      },
      {
        path: "details/:id",
        element: (
          <ProtectedRouter>
            <Details />
          </ProtectedRouter>
        ),
      },
      {
        path: "brands",
        element: (
          <ProtectedRouter>
            <Brands />
          </ProtectedRouter>
        ),
      },
      {
        path: "cart",
        element: (
          <ProtectedRouter>
            <Cart />
          </ProtectedRouter>
        ),
      },
      {
        path: "allorders",
        element: (
          <ProtectedRouter>
            <Orders />
          </ProtectedRouter>
        ),
      },

      {
        path: "ForgotPassword",
        element: (
          
            <ForgotPassword/>
      
        ),
      },
      ,
      {
        path: "ResetPassword",
        element: (
          
            <ResetPassword/>
      
        ),
      },
      ,
      {
        path: "profile",
        element: (
          <ProtectedRouter>
            <Profile/>
          </ProtectedRouter>
        ),
      },
      {
        path: "userAddress",
        element: (
          <ProtectedRouter>
            <UserAddress/>
          </ProtectedRouter>
        ),
      },
      {
        path: "CashPayment",
        element: (
          <ProtectedRouter>
            <CashPayment/>
          </ProtectedRouter>
        ),
      },

      { path: "register", element: <Register /> },
      { path: "signin", element: <Signin /> },

      { path: "*", element: <Notfound/> },
    ],
  },
]);
function App() {
  let { setToken } = useContext(userTokenContext);
  useEffect(() => {
    if (localStorage.getItem("userToken") !== null) {
      setToken(localStorage.getItem("userToken"));
    }
  }, []);

  return (
    <>
    <UserProfileContextProvider>
    <CartContextProvider>
        <RouterProvider router={Router}></RouterProvider>
<Toaster/>
      </CartContextProvider>
    </UserProfileContextProvider>
  
    </>
  );
}

export default App;
