import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <div 
        className="hero min-h-[70vh] mt-8" 
        style={{ backgroundImage: "url('https://i.ibb.co/TxHSnQ9L/framer.jpg')"}} 
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md">
          <motion.h1
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-5 text-5xl font-bold text-white"
          >
            Dream Events, <br/> <span className="text-primary">Realized.</span>
          </motion.h1>

          <motion.p
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mb-5 text-gray-200"
          >
            From intimate gatherings to grand celebrations, we bring your vision to life with expert decoration services.
          </motion.p>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1, type: "spring" }}
          >
            <Link to="/service">
                <button className="btn btn-primary btn-lg border-none">Book Decoration Service</button>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
