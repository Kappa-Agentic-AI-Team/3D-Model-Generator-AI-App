
import { useState, useEffect, useMemo, useCallback } from 'react';
import { toast } from '@/hooks/use-toast';
import {viewerAPI} from "@/services/api";
import useAuth from './useAuth';

export const useModelViewer = () => {
  const {auth} = useAuth();
  const {username, password} = useMemo(() => auth, [auth]);

  const get3DImage = useCallback(async (prompt: string): Promise<string> => {
    try {
      const {image} = await viewerAPI.getImageFromText(prompt);
      return image;
    } catch (error) {
      toast({
        title: 'Query Error',
        description: 'Failed to generate model. Please try again',
        variant: 'destructive'
      });
      throw error;
    }
    
  }, []);

  const get3DFromImage = useCallback(async (file: File, prompt: string): Promise<string> => {
    try {
      const {image} = await viewerAPI.getFromImage(file, prompt);
      return image;
    } catch (error) {
      toast({
        title: 'Query Error',
        description: 'Failed to generate model. Please try again',
        variant: 'destructive'
      });
      throw error;
    }
    
  }, []);

  
  return {
    get3DImage,
    get3DFromImage
  };
};
