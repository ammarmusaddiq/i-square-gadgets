"use client";
import React from "react";
import shop from "../assets/shop.jpg";

const AboutUsSection = () => {
  return (
    <section className="bg-black text-white py-16 px-6 md:px-20">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Left Side - Image with Glow */}
        <div className="relative w-full h-80 md:h-[450px] rounded-lg overflow-hidden shadow-lg">
          {/* Glow Effect */}
          <div className="absolute -inset-4 bg-red-600 rounded-full blur-3xl opacity-40 animate-pulse"></div>
          {console.log(shop)}
          <img
            src={shop.src} // Change to your image path
            alt="About Us"
            fill
            className="object-cover relative z-10 rounded-lg"
          />
        </div>

        {/* Right Side - Text */}
        <div className="relative z-20">
          <h2 className="text-4xl font-bold mb-6">About Us</h2>
          <p className="text-lg text-gray-300 leading-relaxed mb-6">
            We are passionate about delivering exceptional services to our
            customers. Our team is dedicated to providing high-quality products,
            innovative solutions, and outstanding support that exceeds
            expectations.
          </p>
          <p className="text-lg text-gray-300 leading-relaxed mb-8">
            With years of experience and a commitment to excellence, we strive
            to create a positive impact and build long-lasting relationships
            with our clients.
          </p>

          {/* Button */}
          <button className="bg-sony hover:shadow-md hover:shadow-white transition-all px-6 py-3 rounded-lg font-semibold shadow-lg">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;
