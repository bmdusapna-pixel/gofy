import React from "react";
import AboutHeroSection from "../Components/AboutHeroSection";
import Feature from "../Components/Feature";
import VideoThumbnail from "../Components/VideoThumbnail.jsx";
import TestimonialsPage from "../Components/Testemonials.jsx";
import OfferBanner from "../Components/OfferBanner.jsx";
import Brands from "../Components/Brands.jsx";
import Subscribe from "../Components/SubscribeComp.jsx";

const About = () => {
  return (
    <div>
      <AboutHeroSection />
      <Feature />
      <VideoThumbnail />
      <TestimonialsPage />
      <OfferBanner />
      <Brands />
      <Subscribe />
    </div>
  );
};

export default About;
