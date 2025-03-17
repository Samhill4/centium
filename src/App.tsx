import { useRef } from "react";
import { HeroSection } from "@/components/hero-section";
import { ContactForm } from "@/components/contact-form";
import { GlowingEffectDemo } from "@/components/demo/glowing-effect-demo";

function App() {
  const contactFormRef = useRef<HTMLDivElement>(null);

  const scrollToContact = () => {
    if (contactFormRef.current) {
      contactFormRef.current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <div className="min-h-screen w-full">
      <div className="flex min-h-screen w-full flex-col overflow-hidden">
        <div className="h-screen w-full">
          <HeroSection onGetInTouch={scrollToContact} />
        </div>
        
        {/* Features Section */}
        <div className="w-full bg-black">
          <div className="relative z-10 w-full px-4 py-24 md:px-8 lg:px-12">
            <div className="mx-auto max-w-7xl">
              <GlowingEffectDemo />
            </div>
          </div>
        </div>

        {/* Contact Form Section */}
        <div ref={contactFormRef} id="contact-form" className="w-full bg-black">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}

export default App