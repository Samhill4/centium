"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface FlickeringTextGridProps {
  text: string;
  subtext?: string;
  secondSubtext?: string;
  squareSize?: number;
  gridGap?: number;
  flickerChance?: number;
  color?: string;
  width?: number;
  height?: number;
  className?: string;
  maxOpacity?: number;
  fontSize?: number;
  subtextFontSize?: number;
  secondSubtextFontSize?: number;
  subtextYOffset?: number;
  secondSubtextYOffset?: number;
  textYOffset?: number;
  textColor?: string;
  textGlow?: boolean;
  glowColor?: string;
  glowBlur?: number;
  textOpacity?: number;
  textFlickerChance?: number;
  textMinOpacity?: number;
}

export const FlickeringTextGrid: React.FC<FlickeringTextGridProps> = ({
  text,
  subtext,
  secondSubtext,
  squareSize = 4,
  gridGap = 6,
  flickerChance = 0.3,
  color = "rgb(0, 0, 0)",
  width,
  height,
  className,
  maxOpacity = 0.3,
  fontSize = 120,
  subtextFontSize = 40,
  secondSubtextFontSize = 30,
  subtextYOffset = 100,
  secondSubtextYOffset = 160,
  textYOffset = 0,
  textColor = "#000000",
  textGlow = false,
  glowColor = "rgba(255, 255, 255, 0.5)",
  glowBlur = 5,
  textOpacity = 1,
  textFlickerChance = 0.1,
  textMinOpacity = 0.8
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
  const textCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const textOpacityRef = useRef<number>(textOpacity);

  const memoizedColor = useMemo(() => {
    const toRGBA = (color: string) => {
      if (typeof window === "undefined") {
        return `rgba(0, 0, 0,`;
      }
      const canvas = document.createElement("canvas");
      canvas.width = canvas.height = 1;
      const ctx = canvas.getContext("2d");
      if (!ctx) return "rgba(255, 0, 0,";
      ctx.fillStyle = color;
      ctx.fillRect(0, 0, 1, 1);
      const [r, g, b] = Array.from(ctx.getImageData(0, 0, 1, 1).data);
      return `rgba(${r}, ${g}, ${b},`;
    };
    return toRGBA(color);
  }, [color]);

  const createTextCanvas = useCallback((width: number, height: number) => {
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, width, height);
    
    const verticalCenter = height / 2 + textYOffset;
    
    ctx.font = `bold ${fontSize}px sans-serif`;
    
    if (textGlow) {
      ctx.shadowColor = glowColor;
      ctx.shadowBlur = glowBlur;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
    }
    
    ctx.fillStyle = textColor;
    ctx.globalAlpha = textOpacityRef.current;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(text, width / 2, verticalCenter);
    
    if (subtext) {
      ctx.font = `bold ${subtextFontSize}px sans-serif`;
      ctx.fillStyle = textColor;
      ctx.fillText(subtext, width / 2, verticalCenter + subtextYOffset);
    }
    
    if (secondSubtext) {
      ctx.font = `${secondSubtextFontSize}px sans-serif`;
      ctx.fillStyle = textColor;
      ctx.fillText(secondSubtext, width / 2, verticalCenter + secondSubtextYOffset);
    }
    
    textCanvasRef.current = canvas;
    return canvas;
  }, [text, subtext, secondSubtext, fontSize, subtextFontSize, secondSubtextFontSize, subtextYOffset, secondSubtextYOffset, textYOffset, textColor, textGlow, glowColor, glowBlur]);

  const setupCanvas = useCallback(
    (canvas: HTMLCanvasElement, width: number, height: number) => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      
      const cols = Math.floor(width / (squareSize + gridGap));
      const rows = Math.floor(height / (squareSize + gridGap));

      if (!textCanvasRef.current) {
        createTextCanvas(width, height);
      }

      const textCanvas = textCanvasRef.current;
      const textCtx = textCanvas?.getContext("2d");
      const textData = textCtx?.getImageData(0, 0, width, height).data;

      const verticalCenter = height / 2 + textYOffset;
      const squares = new Float32Array(cols * rows);
      
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * (squareSize + gridGap);
          const y = j * (squareSize + gridGap);
          
          let hasText = false;
          if (textData) {
            const pixelIndex = (y * width + x) * 4;
            hasText = textData[pixelIndex] > 200;
          }
          
          squares[i * rows + j] = hasText ? textOpacity : (Math.random() * maxOpacity);
        }
      }

      return { cols, rows, squares, dpr };
    },
    [squareSize, gridGap, maxOpacity, createTextCanvas, textOpacity]
  );

  const updateSquares = useCallback(
    (squares: Float32Array, deltaTime: number, cols: number, rows: number) => {
      const textCanvas = textCanvasRef.current;
      if (!textCanvas) return;
      
      const textCtx = textCanvas.getContext("2d");
      if (!textCtx) return;
      
      const width = textCanvas.width;
      const height = textCanvas.height;
      const textData = textCtx.getImageData(0, 0, width, height).data;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const index = i * rows + j;
          const x = i * (squareSize + gridGap);
          const y = j * (squareSize + gridGap);
          
          const pixelIndex = (y * width + x) * 4;
          const hasText = textData[pixelIndex] > 200;
          
          if (hasText) {
            if (Math.random() < textFlickerChance * deltaTime) {
              squares[index] = textMinOpacity + Math.random() * (textOpacity - textMinOpacity);
            }
          } else {
            if (Math.random() < flickerChance * deltaTime) {
              squares[index] = Math.random() * maxOpacity;
            }
          }
        }
      }
    },
    [flickerChance, maxOpacity, squareSize, gridGap, textOpacity, textFlickerChance, textMinOpacity]
  );

  const drawGrid = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      width: number,
      height: number,
      cols: number,
      rows: number,
      squares: Float32Array,
      dpr: number,
    ) => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "transparent";
      ctx.fillRect(0, 0, width, height);

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const opacity = squares[i * rows + j];
          if (opacity > 0) {
            ctx.fillStyle = `${memoizedColor}${opacity})`;
            ctx.fillRect(
              i * (squareSize + gridGap) * dpr,
              j * (squareSize + gridGap) * dpr,
              squareSize * dpr,
              squareSize * dpr,
            );
          }
        }
      }
    },
    [memoizedColor, squareSize, gridGap]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let gridParams: ReturnType<typeof setupCanvas>;

    const updateCanvasSize = () => {
      const newWidth = width || container.clientWidth;
      const newHeight = height || container.clientHeight;
      setCanvasSize({ width: newWidth, height: newHeight });
      
      if (textCanvasRef.current) {
        textCanvasRef.current = null;
      }
      
      gridParams = setupCanvas(canvas, newWidth, newHeight);
    };

    updateCanvasSize();

    let lastTime = 0;
    const animate = (time: number) => {
      if (!isInView) return;

      const deltaTime = (time - lastTime) / 1000;
      lastTime = time;

      updateSquares(gridParams.squares, deltaTime, gridParams.cols, gridParams.rows);
      drawGrid(
        ctx,
        canvas.width,
        canvas.height,
        gridParams.cols,
        gridParams.rows,
        gridParams.squares,
        gridParams.dpr,
      );
      animationFrameId = requestAnimationFrame(animate);
    };

    const resizeObserver = new ResizeObserver(() => {
      updateCanvasSize();
    });

    resizeObserver.observe(container);

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0 },
    );

    intersectionObserver.observe(canvas);

    if (isInView) {
      animationFrameId = requestAnimationFrame(animate);
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
    };
  }, [setupCanvas, updateSquares, drawGrid, width, height, isInView]);

  return (
    <div ref={containerRef} className={cn("w-full h-full", className)}>
      <canvas
        ref={canvasRef}
        className="pointer-events-none"
        style={{
          width: canvasSize.width,
          height: canvasSize.height,
        }}
      />
    </div>
  );
};