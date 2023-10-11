import React, { useContext, useEffect, useState } from "react";
import { cartContext } from "../../Context/CartContext";
import { BallTriangle } from "react-loader-spinner";
import {Helmet} from "react-helmet";
import { Link } from "react-router-dom";
export default function Cart() {
  let { getLoggedUserCart, UpdateCartProductQuantity, removeItem, clearCart,setNumbrtOfItem } =
    useContext(cartContext);
  let [cartDetails, setCartDetails] = useState(null);

  async function getCart() {
    let { data } = await getLoggedUserCart();
    // console.log(data?.numOfCartItems)
    setCartDetails(data);
   

  }
  useEffect(() => {
    getCart();
  }, []);

  async function updateQuantity(id, count) {
    let { data } = await UpdateCartProductQuantity(id, count);
    setCartDetails(data);
    setNumbrtOfItem();
  }
  async function deleteItemFromCart(productId) {
    let { data } = await removeItem(productId);
    setCartDetails(data);
    setNumbrtOfItem();
  }

  async function clearAllItemFromCart() {
    let { data } = await clearCart();
    setCartDetails(data);
    setNumbrtOfItem()

  }
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>My Cart</title>
        
      </Helmet>

      <div className="my-5 mx-5 bg-light p-5">
        <h3>Shop Cart:</h3>
        {
          cartDetails && cartDetails.numOfCartItems >= 0 ? (
            <div>
              <h4 className="h6 text-main mb-4">
                Total Cart Price: {cartDetails.data.totalCartPrice} EGP
              </h4>
              <h4 className="h6 text-main">
                Number of Items: {cartDetails.numOfCartItems}
              </h4>
              {cartDetails.data.products.map((product) => {
                return (
                  <div key={product.product.id} className="row gy-1">
                    <div className="col-md-2">
                      <img
                        className="w-100"
                        src={product.product.imageCover}
                        alt={product.title}
                      />
                    </div>
                    <div className="col-md-10 d-flex align-items-center justify-content-between">
                      <div className="right">
                        <h4>{product.product.title.split(' ').slice(0,3).join(' ')}</h4>
                        <h6 className="text-main">Price: {product.price}</h6>
                        <button
                          onClick={() => deleteItemFromCart(product.product.id)}
                          className="btn"
                        >
                          <i className="fas fa-trash text-main me-2"></i>Remove
                        </button>
                      </div>

                      <div className="right">
                        <button
                          onClick={() => {
                            updateQuantity(
                              product.product.id,
                              product.count + 1
                            );
                          }}
                          className="btn brdr-main"
                        >
                          +
                        </button>
                        <span className="mx-2">{product.count}</span>
                        <button
                          onClick={() => {
                            updateQuantity(product.product.id, product.count--);
                          }}
                          className="btn brdr-main"
                        >
                          -
                        </button>
                      </div>
                    </div>
                    <hr />
                  </div>
                );
              })}
              {cartDetails.numOfCartItems > 0 ? (
                <>
                <div>
                  <Link to='/userAddress' className="btn bg-main text-light me-4 mt-3">Online Payment</Link>
                  <Link to='/CashPayment' className="btn bg-main text-light mt-3">Cash on delivery</Link>
                  <button
                  onClick={() => clearAllItemFromCart()}
                  className="w-25 float-end d-block text-white py-2 mt-3 m-auto btn bg-danger"
                >
                  Clear Cart
                </button>
                </div>
                
                </>
               
              ) : (
                ""
              )}
            </div>
          ) : (
            ""
          )
          //   <><p className='vh-100 d-flex justify-content-center align-items-center' ><BallTriangle
          //   height={100}
          //   width={100}
          //   radius={5}
          //   color="#4fa94d"
          //   ariaLabel="ball-triangle-loading"
          //   wrapperClass={{}}
          //   wrapperStyle=""
          //   visible={true}
          // /></p></>
        }
      </div>
    </>
  );
}
