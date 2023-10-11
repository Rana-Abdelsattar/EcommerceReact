import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import cart from "../../assets/images/cart.svg.png";
import { userTokenContext } from "../../Context/UserToken";
import { cartContext } from "../../Context/CartContext";

export default function Navbar() {
  let navigate = useNavigate();
  let { userToken, setToken } = useContext(userTokenContext);
  let { numberOfItemInCart, setNumbrtOfItem } = useContext(cartContext);

  function logOut() {
    localStorage.removeItem("userToken");
    setToken(null);
    navigate("/signin");
  }

  useEffect(()=>{
    setNumbrtOfItem()
  })
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container">
          <a className="navbar-brand" href="/">
            <img src={cart} alt="" width={70} />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {userToken ? (
              <ul className="navbar-nav m-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link
                    className="nav-link active fs-5"
                    aria-current="page"
                    to="home"
                  >
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link fs-5" to="products">
                    Products
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link fs-5 position-relative me-3"
                    to="cart"
                  >
                    Carts
                    <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {numberOfItemInCart}
                      <span class="visually-hidden">unread messages</span>
                    </span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link fs-5" to="categories">
                    Categories
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link fs-5" to="brands">
                    Brands
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link fs-5" to="allorders">
                    Orders
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link fs-5" to="profile">
                    Profile
                  </Link>
                </li>
              </ul>
            ) : (
              ""
            )}

            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 d-flex align-items-center">
              <li className="nav-item">
                <i className="fab mx-2 fa-facebook"></i>
                <i className="fab mx-2 fa-instagram"></i>
                <i className="fab mx-2 fa-twitter"></i>
                <i className="fab mx-2 fa-tiktok"></i>
                <i className="fab mx-2 fa-linkedin"></i>
              </li>

              {userToken === null ? (
                <>
                  <li className="nav-item">
                    <Link
                      className="nav-link active fs-4"
                      aria-current="page"
                      to="signin"
                    >
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link fs-4" to="register">
                      Register
                    </Link>
                  </li>
                </>
              ) : (
                <li className="nav-item">
                  <Link
                    onClick={() => {
                      logOut();
                    }}
                    className="nav-link fs-4 fw-bold"
                    to="signin"
                  >
                    LogOut
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
