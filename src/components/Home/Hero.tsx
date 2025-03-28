
import React from "react";
import { Button } from "@/components/shared/Button";
import { Link } from "react-router-dom";

export const Hero: React.FC = () => {
  return (
    <section className="pt-28 pb-16 md:pt-40 md:pb-24 relative overflow-hidden">
      <div className="container px-4 md:px-6 mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 md:mb-6 animate-fade-in">
            Transform Your Space with <span className="text-gradient">AI Visualization</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 md:mb-10 animate-fade-in animate-delay-200">
            Turn text descriptions into stunning 3D visualizations of interior spaces. 
            Upload images or describe your dream room and watch it come to life.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in animate-delay-300">
            <Link to="/visualize">
              <Button size="lg" className="w-full sm:w-auto bg-kappa-600 hover:bg-kappa-700 transition-colors" hasArrow hasShine>
                Start Visualizing
              </Button>
            </Link>
            <Button 
              size="lg" 
              variant="outline" 
              className="w-full sm:w-auto border-kappa-200 hover:border-kappa-300 hover:bg-kappa-50 dark:border-kappa-800 dark:hover:border-kappa-700 dark:hover:bg-kappa-900/30 transition-colors"
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>

      {/* Background Elements */}
      <div className="absolute top-0 left-0 right-0 -z-10 overflow-hidden">
        <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-kappa-400/10 dark:bg-kappa-600/10 rounded-full filter blur-3xl animate-float"></div>
        <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-kappa-300/10 dark:bg-kappa-500/10 rounded-full filter blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>
    </section>
  );
};
