import React from "react";
import Banner from "../Banner/Banner";
import Brands from "../Brands/Brands";
import Reviews from "../Reviews/Reviews";
import Coverage from "../../Coverage/Coverage";
import Hero from "../HeroSection";
import HeroSection from "../HeroSection";
import HomeServices from "../HomeServices";
import TopDecorators from "../TopDecorators";

const reviewsPromise = fetch('/reviews.json').then(res => res.json())

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <Brands></Brands>
      <HeroSection></HeroSection>
      <HomeServices></HomeServices>
      <TopDecorators></TopDecorators>
      <Coverage></Coverage>
      <Reviews reviewsPromise={reviewsPromise}></Reviews>
    </div>
  );
};

export default Home;
