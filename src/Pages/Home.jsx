import React from "react";
import HeroSection from "../Components/HeroSection";
import ProductsCollection from "../Components/ProductsCollection";
import ProductsCollectionBelow from "../Components/ProductsCollectionBelow.jsx";
import CTA from "../Components/CTA";
import Deals from "../Components/Deals";
import Banners from "../Components/Banners";

const Home = () => {
  return (
    <div>
      <HeroSection />
      <ProductsCollection color={"#db2777"} />
      <CTA />
      <ProductsCollectionBelow color={"#2563eb"} />
      <Deals />
      <Banners />
    </div>
  );
};

export default Home;
