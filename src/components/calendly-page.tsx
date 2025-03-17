import { useEffect } from 'react';

declare global {
  interface Window {
    Calendly: any;
  }
}

export function CalendlyPage() {
  useEffect(() => {
    // Add Calendly widget script
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="w-full h-screen bg-black">
      <div 
        className="calendly-inline-widget w-full h-full"
        data-url="https://calendly.com/s482127h111/discovery-call"
      />
    </div>
  );
}