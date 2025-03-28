
import React from "react";
import { Navbar } from "@/components/Layout/Navbar";
import { Hero } from "@/components/Home/Hero";
import { Features } from "@/components/Home/Features";
import { TextInput } from "@/components/Visualizer/TextInput";
import { ImageUpload } from "@/components/Visualizer/ImageUpload";
import { ModelViewer } from "@/components/Visualizer/ModelViewer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

const Index = () => {
  const [prompt, setPrompt] = useState<string | undefined>();
  const [imageFile, setImageFile] = useState<File | undefined>();

  const handleTextSubmit = (text: string) => {
    setPrompt(text);
    setImageFile(undefined);
  };

  const handleImageUpload = (file: File) => {
    setImageFile(file);
    setPrompt(undefined);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <Hero />
        <Features />
        
        <section className="py-16 md:py-24">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-fade-in">Try It Now</h2>
              <p className="text-lg text-muted-foreground animate-fade-in animate-delay-100">
                Experience the power of AI visualization. Describe your space or upload an image.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              <div>
                <Tabs defaultValue="text" className="w-full">
                  <TabsList className="grid grid-cols-2 mb-6">
                    <TabsTrigger value="text">Text Description</TabsTrigger>
                    <TabsTrigger value="image">Image Upload</TabsTrigger>
                  </TabsList>
                  <TabsContent value="text">
                    <TextInput onSubmit={handleTextSubmit} />
                  </TabsContent>
                  <TabsContent value="image">
                    <ImageUpload onUpload={handleImageUpload} />
                  </TabsContent>
                </Tabs>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-4">Visualization</h3>
                <ModelViewer prompt={prompt} imageFile={imageFile} />
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-16 bg-kappa-50 dark:bg-kappa-950/20">
          <div className="container px-4 md:px-6 mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Space?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of users visualizing their dream spaces with our AI technology.
            </p>
            <button className="px-8 py-3 text-lg font-medium bg-kappa-600 hover:bg-kappa-700 text-white rounded-lg transition-colors btn-shine">
              Get Started Now
            </button>
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

export default Index;
