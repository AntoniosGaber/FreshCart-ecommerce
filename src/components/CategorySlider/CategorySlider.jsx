import React, { useEffect, useState } from "react";
import styles from "./CategorySlider.module.css";
import axios from "axios";
import Slider from "react-slick";

export default function CategorySlider() { 
   const settings = {
  dots: false,
  infinite: true,
  speed: 600,
  slidesToShow: 4,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2500,
  arrows: false,

  responsive: [
    {
      breakpoint: 1280, // laptop
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 1024, // tablet
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 640, // mobile
      settings: {
        slidesToShow: 1,
        centerMode: true,
        centerPadding: "20px",
      },
    },
  ],
};

  const [categories, setCategories] = useState([]);
  async function getCategories() { 
try { 
   let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`) ;
   // console.log(data.data);
    setCategories(data.data);
} catch (error) {
    console.log(error);
  
} 
   
  
   }
useEffect(()=>{
  getCategories();
} ,[])


  return <> 
<Slider {...settings}>
  {categories.map((category) => (
    <div key={category._id} className="px-2">
      
      <div className="h-[160px] sm:h-[200px] overflow-hidden rounded-xl">
        <img
          src={category.image}
          alt={category.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      <h3 className="mt-2 text-center text-sm sm:text-base font-medium">
        {category.name}
      </h3>

    </div>
  ))}
</Slider>

  
  </>
}

