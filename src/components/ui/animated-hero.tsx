import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeroProps {
  onGetInTouch: () => void;
}

function Hero({ onGetInTouch }: HeroProps) {
  const [titleNumber, setTitleNumber] = useState(0);
  const titles = useMemo(
    () => ["powerful", "revolutionary", "smart", "proven", "advanced"],
    []
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (titleNumber === titles.length - 1) {
        setTitleNumber(0);
      } else {
        setTitleNumber(titleNumber + 1);
      }
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);

  return (
    <div className="w-full">
      <div className="container mx-auto">
        <div className="flex gap-8 py-20 lg:py-40 items-center justify-center flex-col">
          <div className="flex gap-4 flex-col">
            <h1 className="text-5xl md:text-7xl max-w-2xl tracking-tighter text-center font-regular text-white">
              <span>This is something</span>
              <span className="relative flex w-full justify-center overflow-hidden text-center md:pb-4 md:pt-1">
                &nbsp;
                {titles.map((title, index) => (
                  <motion.span
                    key={index}
                    className="absolute font-semibold text-white"
                    initial={{ opacity: 0, y: "-100" }}
                    transition={{ type: "spring", stiffness: 50 }}
                    animate={
                      titleNumber === index
                        ? {
                            y: 0,
                            opacity: 1,
                          }
                        : {
                            y: titleNumber > index ? -150 : 150,
                            opacity: 0,
                          }
                    }
                  >
                    {title}
                  </motion.span>
                ))}
              </span>
            </h1>

            <p className="text-lg md:text-xl leading-relaxed tracking-tight text-muted-foreground max-w-2xl text-center text-white">
              Every business faces unique challenges. Our team designs tailor-made AI agents that address your specific operational bottlenecks, creating personalised solutions to increase your bottom line.
            </p>
          </div>
          <div className="flex flex-row gap-3">
            <Button 
              size="lg" 
              variant="outline"
              className="gap-4 bg-white text-black hover:bg-gray-100 hover:text-black transition-colors cursor-pointer z-10" 
              onClick={onGetInTouch}
            >
              Jump on a call <PhoneCall className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;

export { Hero }