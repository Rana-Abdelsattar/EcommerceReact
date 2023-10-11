import axios from "axios";
import React from "react";
import { BallTriangle } from "react-loader-spinner";
import { useQuery } from "react-query";
import { Helmet } from "react-helmet";
export default function Brands() {
  function getBrandData() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/brands`);
  }
  let { isLoading, data } = useQuery("brandData", getBrandData);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Brands</title>
      </Helmet>
      <h1 className="text-main fw-bolder text-center mt-5">All Brands</h1>
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
          {data?.data.data.map((brand) => {
            return (
              <div className="col-md-3">
                <div className="product card text-center">
                  <img src={brand.image} className="w-100" alt={brand.name} />
                  <h4>{brand.name}</h4>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
