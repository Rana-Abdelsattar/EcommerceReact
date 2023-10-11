import axios from "axios";
import React from "react";
import { BallTriangle } from "react-loader-spinner";
import { useQuery } from "react-query";
import {Helmet} from "react-helmet";
export default function Categories() {
  function getData() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
  }
  let { isLoading, data } = useQuery("categoryData", getData);
  console.log(data?.data.data);
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Categories</title>
      </Helmet>
      {isLoading ? (
        <>
          <p className="vh-100 d-flex justify-content-center align-items-center">
            <BallTriangle
              height={100}
              width={100}
              radius={5}
              color="#4fa94d"
              ariaLabel="ball-triangle-loading"
              wrapperClass={{}}
              wrapperStyle=""
              visible={true}
            />
          </p>
        </>
      ) : (
        <div className="row gy-4 my-5">
          {data?.data.data.map((product) => {
            return (
              <div className="col-md-4">
                <div className="card product text-center">
                  <img
                    src={product.image}
                    height={300}
                    className="w-100"
                    alt={product.name}
                  />
                  <h4 className="text-main mt-3 fw-bolder p-4">
                    {product.name}
                  </h4>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
