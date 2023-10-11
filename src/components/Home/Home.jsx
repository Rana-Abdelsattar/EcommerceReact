import React from 'react'
import FeaturedProduct from '../FeaturedProduct/FeaturedProduct'
import CategorySlider from '../CategorySlider/CategorySlider'
import {Helmet} from "react-helmet";
import MainSlider from '../MainSlider/MainSlider';

export default function Home() {
  return (
    <div>
   <Helmet>
                <meta charSet="utf-8" />
                <title>Fresh Cart Home</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
       <MainSlider/>
      <CategorySlider/>
      <FeaturedProduct/>
    </div>
  )
}
