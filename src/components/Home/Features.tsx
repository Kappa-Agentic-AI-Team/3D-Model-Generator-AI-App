
import React from "react";
import { cn } from "@/lib/utils";
import { Search, Upload, Layers, MessageSquare } from "lucide-react";

interface FeatureProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  delay: string;
}

const Feature: React.FC<FeatureProps> = ({ title, description, icon, delay }) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center text-center p-6 rounded-2xl transition-all duration-300",
        "hover:bg-background/50 hover:shadow-lg hover:-translate-y-1",
        "border border-border",
        "animate-fade-in",
        delay
      )}
    >
      <div className="w-14 h-14 rounded-xl bg-kappa-100 dark:bg-kappa-900/30 flex items-center justify-center mb-4 text-kappa-600">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

export const Features: React.FC = () => {
  const features = [
    {
      title: "Text to 3D",
      description: "Describe your space and watch our AI transform your words into detailed 3D visualizations.",
      icon: <Search className="w-7 h-7" />,
      delay: "animate-delay-100",
    },
    {
      title: "Image Upload",
      description: "Upload photos of your room and let our AI enhance and transform them into interactive 3D models.",
      icon: <Upload className="w-7 h-7" />,
      delay: "animate-delay-200",
    },
    {
      title: "3D Interaction",
      description: "Rotate, zoom, and explore your generated space from every angle with intuitive controls.",
      icon: <Layers className="w-7 h-7" />,
      delay: "animate-delay-300",
    },
    {
      title: "Voice Description",
      description: "Describe your ideal space using your voice and let our AI interpret your vision.",
      icon: <MessageSquare className="w-7 h-7" />,
      delay: "animate-delay-400",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-secondary/50">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-fade-in">How It Works</h2>
          <p className="text-lg text-muted-foreground animate-fade-in animate-delay-100">
            Our AI-powered platform makes it easy to visualize interior spaces from text descriptions or images.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <Feature
              key={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              delay={feature.delay}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
