import React, { useRef, useEffect } from "react";

export default function AnnotatedImage({ imageUrl, predictions, className = "" }) {
  const canvasRef = useRef(null);
  const imgRef = useRef(null);

  useEffect(() => {
   

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = imgRef.current;

    if (!imageUrl || !predictions || !predictions.predictions || predictions.predictions.length === 0) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (img) img.classList.remove('hidden');
      return;
    }

    const draw = () => {

      const displayedWidth = img.clientWidth;
      const displayedHeight = img.clientHeight;
      canvas.width = displayedWidth;
      canvas.height = displayedHeight;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.drawImage(img, 0, 0, displayedWidth, displayedHeight);
      img.classList.add('hidden');

      const roboflowImageWidth = predictions?.image?.width || img.naturalWidth;
      const roboflowImageHeight = predictions?.image?.height || img.naturalHeight;

      if (!roboflowImageWidth || !roboflowImageHeight) {
        console.error("Image dimensions not available.", predictions);
        return;
      }

      const scaleX = displayedWidth / roboflowImageWidth;
      const scaleY = displayedHeight / roboflowImageHeight;
      const averageScale = (scaleX + scaleY) / 2;

      predictions.predictions
        .filter(pred => pred.confidence * 100 >= 30) 
        .forEach(pred => {


          if (
            !pred ||
            typeof pred.x === "undefined" ||
            typeof pred.y === "undefined" ||
            typeof pred.width === "undefined" ||
            typeof pred.height === "undefined"
          ) {
            console.warn("Skipping invalid prediction object:", pred);
            return;
          }
          const x = (pred.x - pred.width / 2) * scaleX;
          const y = (pred.y - pred.height / 2) * scaleY;
          const w = pred.width * scaleX;
          const h = pred.height * scaleY;

          ctx.strokeStyle = "#00FF00";
          ctx.lineWidth = 2;
          ctx.strokeRect(x, y, w, h);

          const label = `${pred.class} (${(pred.confidence * 100).toFixed(1)}%)`;

          const baseFontSize = 14;
          const scaledFontSize = Math.max(8, baseFontSize * averageScale);
          ctx.font = `${scaledFontSize}px Arial`;

          const textMetrics = ctx.measureText(label);
          const textWidth = textMetrics.width;
          const textHeight =
            textMetrics.actualBoundingBoxAscent +
            textMetrics.actualBoundingBoxDescent;

          let labelX = x;
          let labelY = y - 5;

          if (labelX < 0) {
            labelX = 0;
          }
          if (labelX + textWidth > displayedWidth) {
            labelX = displayedWidth - textWidth;
          }

          if (labelY - textHeight < 0) {
            labelY = y + textHeight + 5;
          }

          const padding = 4 * averageScale;
          ctx.fillStyle = "rgba(255, 89, 0, 0.7)";
          ctx.fillRect(
            labelX,
            labelY - textHeight - padding,
            textWidth + 2 * padding,
            textHeight + 2 * padding
          );

          ctx.fillStyle = "#000";
          ctx.fillText(label, labelX + padding, labelY - padding);
        });
    };

    if (img && img.complete) {
      draw();
    } else if (img) {
      img.onload = draw;
    }
    return () => {
      if (img) img.onload = null;
    };
  }, [imageUrl, predictions]);

  return (
    <div className={`relative w-full h-full ${className}`}>
      <img
        key={imageUrl}
        ref={imgRef}
        src={imageUrl}
        alt="Analyzed"
        className="block w-full h-full object-fill"
        crossOrigin="anonymous"
      />
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
      />
    </div>
  );
}