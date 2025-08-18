"use client";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

export default function ProductImageZoom({ imageUrl }) {
  return (
    <div className="max-w-lg mx-auto">
      <Zoom>
        <img
          src={imageUrl}
          alt="Product Image"
          className="w-full object-cover"
        />
      </Zoom>
    </div>
  );
}
