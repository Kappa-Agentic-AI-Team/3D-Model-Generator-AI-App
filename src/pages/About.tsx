
import React from "react";
import { Navbar } from "@/components/Layout/Navbar";
import { ThemeProvider } from "@/context/ThemeContext";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24">
        <section className="py-16 md:py-24">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="max-w-3xl mx-auto">
              <h1 className="text-4xl font-bold mb-6">About Kappa AI Visualizer</h1>
              <p className="text-lg mb-6">
                Kappa AI Visualizer is a cutting-edge platform that leverages artificial intelligence 
                to transform text descriptions and images into detailed 3D visualizations of interior spaces.
              </p>
              <p className="text-lg mb-6">
                Our mission is to make interior design and space planning more accessible to everyone, 
                from professional designers to homeowners looking to reimagine their living spaces.
              </p>
              <h2 className="text-2xl font-bold mt-10 mb-4">How It Works</h2>
              <p className="text-lg mb-6">
                Using advanced AI and 3D modeling technology, our platform can interpret natural language 
                descriptions or analyze uploaded images of spaces. The AI then generates a detailed 3D model 
                that you can explore, customize, and refine in real-time.
              </p>
              <h2 className="text-2xl font-bold mt-10 mb-4">Our Technology</h2>
              <p className="text-lg mb-6">
                We combine state-of-the-art natural language processing, computer vision, and 3D rendering 
                technologies to create our visualizations. Our platform is built using React, Three.js, and 
                other modern web technologies to ensure a seamless user experience.
              </p>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="py-8 border-t">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} Kappa AI Visualizer. All rights reserved.
              </p>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default About;
