"use client";
import { useRef, useState } from "react";

export default function ImageMagnifier({
  src,
  zoom = 2,
  width = 400,
  height = 400,
}) {
  const imgRef = useRef(null);
  const [backgroundPos, setBackgroundPos] = useState("0% 0%");
  const [showZoom, setShowZoom] = useState(false);

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.pageX - left - window.scrollX) / width) * 100;
    const y = ((e.pageY - top - window.scrollY) / height) * 100;
    setBackgroundPos(`${x}% ${y}%`);
  };

  return (
    <div className="flex gap-6">
      {/* Main Image */}
      <div
        className="border border-gray-300 overflow-hidden"
        style={{ width, height }}
        onMouseEnter={() => setShowZoom(true)}
        onMouseLeave={() => setShowZoom(false)}
        onMouseMove={handleMouseMove}
      >
        <img
          ref={imgRef}
          src={src}
          alt="Product"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Zoomed Side Preview */}
      {showZoom && (
        <div
          className="border border-gray-300"
          style={{
            width,
            height,
            backgroundImage: `url(${src})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: `${width * zoom}px ${height * zoom}px`,
            backgroundPosition: backgroundPos,
          }}
        />
      )}
    </div>
  );
}
