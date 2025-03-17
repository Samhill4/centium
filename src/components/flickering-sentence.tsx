"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface FlickeringSentenceProps {
  text: string;
  className?: string;
  color?: string;
  fontSize?: string;
  fontWeight?: string;
  flickerChance?: number;
}

export const FlickeringSentence: React.FC<FlickeringSentenceProps> = ({
  text,
  className,
  color = "text-indigo-400",
  fontSize = "text-2xl sm:text-3xl md:text-4xl",
  fontWeight = "font-medium",
  flickerChance = 0.01,
}) => {
  const [displayText, setDisplayText] = useState(text);
  const intervalRef = useRef<number | null>(null);
  const originalText = useRef(text);

  const flickerText = useCallback(() => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const textArray = originalText.current.split("");
    
    // Randomly replace some characters
    const newTextArray = textArray.map(char => {
      if (char === " ") return " ";
      return Math.random() < flickerChance ? characters.charAt(Math.floor(Math.random() * characters.length)) : char;
    });
    
    setDisplayText(newTextArray.join(""));
  }, [flickerChance]);

  useEffect(() => {
    // Update original text if prop changes
    originalText.current = text;
    
    // Start flickering
    if (intervalRef.current === null) {
      intervalRef.current = window.setInterval(flickerText, 100);
    }
    
    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [text, flickerText]);

  return (
    <div className={cn("text-center", fontSize, fontWeight, color, className)}>
      {displayText}
    </div>
  );
};