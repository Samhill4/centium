"use client";

import { Bot, LineChart, MessageSquare, Sparkles, Target } from "lucide-react";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { cn } from "@/lib/utils";

export function GlowingEffectDemo() {
  return (
    <ul className="grid grid-cols-1 grid-rows-none gap-4 md:grid-cols-12 md:grid-rows-3 lg:gap-4 xl:max-h-[34rem] xl:grid-rows-2">
      <GridItem
        area="md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]"
        icon={<Target className="h-4 w-4 text-white" />}
        title="Lead Generation"
        description="Fully personalised outreach via email, SMS & calls and social media. For both B2B and B2C increasing open and reply rates. Double verified emails of founders and CEOs in a high quality list of leads."
      />
      <GridItem
        area="md:[grid-area:1/7/2/13] xl:[grid-area:2/1/3/5]"
        icon={<MessageSquare className="h-4 w-4 text-white" />}
        title="Customer Support"
        description="Enhance your customer service with AI-driven chatbots and voice agents that provide instant, reliable support—day or night. 24/7 meetings booked, calls taken, money made and no sick days from this powerhouse agent"
      />
      <GridItem
        area="md:[grid-area:2/1/3/7] xl:[grid-area:1/5/3/9]"
        icon={<Bot className="h-4 w-4 text-white" />}
        title="How It Works"
        description={
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-white">Discovery</h4>
              <p>We analyze your current processes to identify key automation opportunities.</p>
            </div>
            <div>
              <h4 className="font-semibold text-white">Design</h4>
              <p>Our experts design custom AI agents tailored to your specific requirements.</p>
            </div>
            <div>
              <h4 className="font-semibold text-white">Deploy</h4>
              <p>Implementation typically takes days, not months, with minimal disruption.</p>
            </div>
            <div>
              <h4 className="font-semibold text-white">Optimize</h4>
              <p>Continuous learning ensures your AI agents improve over time, delivering increasing value.</p>
            </div>
            <div>
              <h4 className="font-semibold text-white">Results</h4>
              <p className="font-bold text-emerald-500">Guaranteed</p>
            </div>
          </div>
        }
      />
      <GridItem
        area="md:[grid-area:2/7/3/13] xl:[grid-area:1/9/2/13]"
        icon={<Bot className="h-4 w-4 text-white" />}
        title="AI Agents"
        description="Our AI agents seamlessly integrate with your existing systems to automate routine workflows. From invoice processing to customer inquiries, our solutions work 24/7 with superhuman accuracy and zero fatigue."
      />
      <GridItem
        area="md:[grid-area:3/1/4/13] xl:[grid-area:2/9/3/13]"
        icon={<Sparkles className="h-4 w-4 text-white" />}
        title="Proven Results"
        description="Typical cost savings of 30-70%, Our clients reclaim an average of 20+ hours per week per department, allowing teams to focus on strategic initiatives rather than repetitive tasks."
      />
    </ul>
  );
}

interface GridItemProps {
  area: string;
  icon: React.ReactNode;
  title: string;
  description: React.ReactNode;
}

const GridItem = ({ area, icon, title, description }: GridItemProps) => {
  return (
    <li className={cn("min-h-[14rem] list-none", area)}>
      <div className="relative h-full rounded-[1.25rem] border-[0.75px] border-zinc-800 p-2 md:rounded-[1.5rem] md:p-3">
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
          borderWidth={3}
        />
        <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border-[0.75px] border-zinc-800 bg-black p-6 shadow-sm md:p-6">
          <div className="relative flex flex-1 flex-col justify-between gap-3">
            <div className="w-fit rounded-lg border-[0.75px] border-zinc-800 bg-zinc-900 p-2">
              {icon}
            </div>
            <div className="space-y-3">
              <h3 className="pt-0.5 text-xl leading-[1.375rem] font-semibold font-sans tracking-[-0.04em] md:text-2xl md:leading-[1.875rem] text-balance text-white">
                {title}
              </h3>
              <div className="[&_b]:md:font-semibold [&_strong]:md:font-semibold font-sans text-sm leading-[1.125rem] md:text-base md:leading-[1.375rem] text-zinc-400">
                {description}
              </div>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};