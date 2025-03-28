
import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/shared/Button";
import { MessageSquare } from "lucide-react";

interface TextInputProps {
  onSubmit: (text: string) => void;
}

export const TextInput: React.FC<TextInputProps> = ({ onSubmit }) => {
  const [text, setText] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onSubmit(text.trim());
    }
  };

  const presets = [
    "A minimalist living room with white walls and wooden floors",
    "A cozy bedroom with a large window and natural light",
    "A modern kitchen with marble countertops and stainless steel appliances",
    "A home office with a large desk and bookshelves",
  ];

  const handlePresetClick = (preset: string) => {
    setText(preset);
  };

  // Mock voice recording functionality
  const toggleRecording = () => {
    setIsRecording(!isRecording);
    
    if (!isRecording) {
      // This would actually start recording with Web Speech API
      setTimeout(() => {
        setText("A modern space with large windows and minimalist furniture");
        setIsRecording(false);
      }, 3000);
    }
  };

  return (
    <div className="w-full animate-fade-in">
      <div className="mb-4">
        <h3 className="text-lg font-medium mb-2">Describe Your Space</h3>
        <p className="text-muted-foreground text-sm mb-4">
          Be as detailed as possible about colors, materials, layout, and style.
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="e.g., A modern living room with light gray walls, wooden floors, and floor-to-ceiling windows..."
            className="min-h-32 resize-none p-4 pr-14"
          />
          <Button
            type="button"
            size="icon"
            variant={isRecording ? "destructive" : "ghost"}
            onClick={toggleRecording}
            className="absolute bottom-3 right-3"
            aria-label={isRecording ? "Stop recording" : "Start voice recording"}
          >
            <MessageSquare className={`w-5 h-5 ${isRecording ? "animate-pulse" : ""}`} />
          </Button>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <p className="w-full text-sm text-muted-foreground mb-1">Try a preset:</p>
          {presets.map((preset, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handlePresetClick(preset)}
              className="text-xs px-3 py-1.5 rounded-full bg-secondary hover:bg-secondary/80 text-secondary-foreground transition-colors"
            >
              {preset.length > 30 ? preset.substring(0, 30) + "..." : preset}
            </button>
          ))}
        </div>
        
        <Button 
          type="submit" 
          disabled={!text.trim()} 
          className="w-full bg-kappa-600 hover:bg-kappa-700 transition-colors"
        >
          Generate Visualization
        </Button>
      </form>
    </div>
  );
};
