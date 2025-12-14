import React from "react";
import ProductCard from "./ProductCard";
import { useAppContext } from "@/context/AppContext";

const HomeProducts = () => {
  const { products, router } = useAppContext();

  return (
    <>
    {/* <div className="absolute top-40 left-1/4 w-96 h-96 bg-pink-600/20 rounded-full blur-3xl"/>
    <div className="absolute top-400 right-0 w-96 h-96 bg-pink-600/20 rounded-full blur-3xl"/>
    <div className="absolute top-400 left-0 w-96 h-96 bg-pink-600/20 rounded-full blur-3xl "/> */}
    
    
    <div className="flex flex-col items-center pt-14">
      {/* <p className="text-2xl font-medium text-white text-left w-full">
        Popular products
      </p> */}
      <div className="flex flex-col items-center">
        <p className="text-3xl text-white font-medium">Popular Products</p>
        <div className="w-28 h-0.5 bg-sony mt-2"></div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 flex-col items-center gap-6 mt-12 pb-14 w-full">
        {products.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
      <button
        onClick={() => {
          router.push("/all-products");
        }}
        className="px-12 py-2.5 rounded text-white bg-sony hover:shadow-md hover:shadow-white transition"
      >
        See more
      </button>
    </div>
    </>
  );
};

export default HomeProducts;
