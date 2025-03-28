
import React, { useState, useRef } from "react";
import { Button } from "@/components/shared/Button";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { TextInput } from "./TextInput";

interface ImageUploadProps {
  onUpload: (file: File, prompt: string) => void;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({ onUpload }) => {
  const [image, setImage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [prompt, setPrompt] = useState<string | undefined>();
  const [imageFile, setImageFile] = useState<File | undefined>();
  

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      handleFile(file);
    }
  };

  const handleFile = (file: File) => {
    if (!file.type.match('image.*')) {
      alert('Please select an image file');
      return;
    }
    setImageFile(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setImage(e.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const removeImage = () => {
    setImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="w-full animate-fade-in animate-delay-100">
      <div className="mb-4">
        <h3 className="text-lg font-medium mb-2">Upload an Image</h3>
        <p className="text-muted-foreground text-sm mb-4">
          Upload a photo of your room to generate a 3D visualization.
        </p>
      </div>

      {image ? (
        <div className="relative rounded-lg overflow-hidden border border-border">
          <img 
            src={image} 
            alt="Uploaded room" 
            className="w-full h-64 object-cover"
          />
          <Button
            size="icon"
            variant="destructive"
            onClick={removeImage}
            className="absolute top-2 right-2 rounded-full w-8 h-8"
            aria-label="Remove image"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      ) : (
        <div
          onClick={triggerFileInput}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={cn(
            "border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center cursor-pointer transition-all duration-200",
            "min-h-64",
            isDragging 
              ? "border-kappa-500 bg-kappa-50 dark:bg-kappa-900/20" 
              : "border-border hover:border-kappa-300 dark:hover:border-kappa-700"
          )}
        >
          <div className="w-16 h-16 rounded-full bg-kappa-100 dark:bg-kappa-900/30 flex items-center justify-center mb-4 text-kappa-600">
            <ImageIcon className="w-8 h-8" />
          </div>
          <p className="font-medium mb-1">Drag & drop an image here</p>
          <p className="text-muted-foreground text-sm mb-4">
            or click to browse your files
          </p>
          <p className="text-xs text-muted-foreground">
            Supports JPG, PNG, and WEBP (max 10MB)
          </p>
        </div>
      )}
      <div className="my-3"></div>
      <TextInput onSubmit={(text)=>{
        setPrompt(text);
        if(imageFile){
          onUpload(imageFile, text);
        }
      }} />
                    

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />

      {/* {image && (
        <Button 
          className="w-full mt-4 bg-kappa-600 hover:bg-kappa-700 transition-colors"
        >
          Generate from Image
        </Button>
      )} */}
    </div>
  );
};
