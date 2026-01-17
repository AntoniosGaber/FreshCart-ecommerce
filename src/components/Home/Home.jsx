import React from "react";
import styles from "./Home.module.css";
import RecentProducts from "../RecentProducts/RecentProducts";
import Loading from "../Loading/Loading";
import MainSlider from "../MainSlider/MainSlider";
import CategorySlider from "../CategorySlider/CategorySlider";

export default function Home() {
  return <>
  <MainSlider/>
  <CategorySlider/>
  <RecentProducts/>
  
  </>
}
