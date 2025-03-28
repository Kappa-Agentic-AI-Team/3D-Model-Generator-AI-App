
import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/shared/Button";
import { initThreeScene } from "@/lib/three";
import { useTheme } from "@/context/ThemeContext";
import { Layers, RotateCcw, ZoomIn, ZoomOut } from "lucide-react";

interface ModelViewerProps {
  prompt?: string;
  imageFile?: File;
}

export const ModelViewer: React.FC<ModelViewerProps> = ({ prompt, imageFile }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [sceneApi, setSceneApi] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    if (containerRef.current) {
      const api = initThreeScene(containerRef.current);
      setSceneApi(api);
      
      // Set initial background color based on theme
      api.setBackgroundColor(theme === 'light' ? '#f5f5f7' : '#1d1d1f');
      
      return () => {
        api.dispose();
      };
    }
  }, []);
  
  // Update background when theme changes
  useEffect(() => {
    if (sceneApi) {
      sceneApi.setBackgroundColor(theme === 'light' ? '#f5f5f7' : '#1d1d1f');
    }
  }, [theme, sceneApi]);
  
  // Handle prompt or image changes
  useEffect(() => {
    if (!sceneApi) return;
    
    if (prompt || imageFile) {
      generateModel();
    }
  }, [prompt, imageFile, sceneApi]);
  
  const generateModel = () => {
    if (!sceneApi) return;
    
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      sceneApi.addRoom('preset');
      setIsLoading(false);
      setIsGenerated(true);
    }, 2000);
  };
  
  const resetView = () => {
    if (sceneApi) {
      sceneApi.controls.reset();
    }
  };
  
  const zoomIn = () => {
    if (sceneApi) {
      sceneApi.camera.position.z -= 0.5;
    }
  };
  
  const zoomOut = () => {
    if (sceneApi) {
      sceneApi.camera.position.z += 0.5;
    }
  };
  
  const toggleWireframe = () => {
    if (sceneApi) {
      sceneApi.scene.traverse((object: any) => {
        if (object.isMesh) {
          object.material.wireframe = !object.material.wireframe;
        }
      });
    }
  };

  return (
    <div className="w-full h-[500px] rounded-lg overflow-hidden relative border border-border">
      {isLoading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/80 backdrop-blur-sm">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full border-4 border-kappa-200 border-t-kappa-600 animate-spin mb-4"></div>
            <p className="text-lg font-medium">Generating 3D Model...</p>
            <p className="text-sm text-muted-foreground mt-2">This may take a few moments</p>
          </div>
        </div>
      )}
      
      <div 
        ref={containerRef} 
        className="w-full h-full"
        aria-label="3D model viewer"
      ></div>
      
      {isGenerated && (
        <div className="absolute bottom-4 right-4 flex flex-col gap-2">
          <Button
            size="icon"
            variant="secondary"
            onClick={resetView}
            aria-label="Reset view"
          >
            <RotateCcw className="w-4 h-4" />
          </Button>
          <Button
            size="icon"
            variant="secondary"
            onClick={zoomIn}
            aria-label="Zoom in"
          >
            <ZoomIn className="w-4 h-4" />
          </Button>
          <Button
            size="icon"
            variant="secondary"
            onClick={zoomOut}
            aria-label="Zoom out"
          >
            <ZoomOut className="w-4 h-4" />
          </Button>
          <Button
            size="icon"
            variant="secondary"
            onClick={toggleWireframe}
            aria-label="Toggle wireframe mode"
          >
            <Layers className="w-4 h-4" />
          </Button>
        </div>
      )}
      
      {!prompt && !imageFile && !isGenerated && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/50">
          <div className="text-center p-6 max-w-md">
            <h3 className="text-lg font-medium mb-2">No Visualization Yet</h3>
            <p className="text-muted-foreground">
              Enter a description or upload an image to generate a 3D visualization.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
