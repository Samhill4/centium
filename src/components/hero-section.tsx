import { FlickeringTextGrid } from "@/components/flickering-text-grid";
import { Hero } from "@/components/ui/animated-hero";

interface HeroSectionProps {
  onGetInTouch: () => void;
}

export function HeroSection({ onGetInTouch }: HeroSectionProps) {
  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">
      {/* Background with FlickeringTextGrid */}
      <div className="absolute inset-0">
        <FlickeringTextGrid
          className="h-full w-full"
          text=""
          squareSize={3}
          gridGap={4}
          color="#8B9BB4"
          maxOpacity={0.25}
          flickerChance={0.15}
          fontSize={24}
          textColor="#FFFFFF"
          textOpacity={1}
          textFlickerChance={0.03}
          textMinOpacity={0.98}
          textGlow={false}
          textYOffset={40}
        />
      </div>

      {/* Animated Hero */}
      <div className="absolute inset-0 flex items-center justify-center">
        <Hero onGetInTouch={onGetInTouch} />
      </div>

      {/* Gradient fade at the bottom */}
      <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-b from-transparent to-black"></div>
    </div>
  );
}