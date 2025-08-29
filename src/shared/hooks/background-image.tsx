import { useCallback, useEffect, useState } from 'react';
import { BackgroundImageStorage } from '@/shared/utils/storage';

interface BackgroundImageData {
  url: string;
  timestamp: number;
  fileName?: string;
  fileSize?: number;
  fileType?: string;
}

export function useBackgroundImage() {
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [imageInfo, setImageInfo] = useState<BackgroundImageData | null>(null);

  // Load background image from localStorage on mount
  useEffect(() => {
    try {
      const savedData = BackgroundImageStorage.load();

      if (savedData && savedData.url) {
        if (savedData.url.length > 0) {
          if (
            savedData.url.startsWith('data:image/') ||
            savedData.url.startsWith('http://') ||
            savedData.url.startsWith('https://')
          ) {
            setBackgroundImage(savedData.url);
            setImageInfo(savedData);
          } else {
            BackgroundImageStorage.remove();
            setBackgroundImage(null);
            setImageInfo(null);
          }
        }
      }
    } catch (error) {
      console.error('Error loading background image from localStorage:', error);

      BackgroundImageStorage.remove();
      setBackgroundImage(null);
      setImageInfo(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateBackgroundImage = useCallback(
    (
      imageUrl: string | null,
      metadata?: {
        fileName?: string;
        fileSize?: number;
        fileType?: string;
      }
    ) => {
      try {
        if (imageUrl) {
          const backgroundData: BackgroundImageData = {
            url: imageUrl,
            timestamp: Date.now(),
            fileName: metadata?.fileName,
            fileSize: metadata?.fileSize,
            fileType: metadata?.fileType,
          };

          const success = BackgroundImageStorage.save(backgroundData);

          if (success) {
            setBackgroundImage(imageUrl);
            setImageInfo(backgroundData);
          } else {
            console.error('Failed to save background image to localStorage');
            // Still update the state even if localStorage fails
            setBackgroundImage(imageUrl);
          }
        } else {
          // Remove background
          BackgroundImageStorage.remove();
          setBackgroundImage(null);
          setImageInfo(null);
        }
      } catch (error) {
        console.error('Error saving background image to localStorage:', error);
        // Still update the state even if localStorage fails
        setBackgroundImage(imageUrl);
      }
    },
    []
  );

  const clearBackgroundImage = useCallback(() => {
    try {
      const success = BackgroundImageStorage.remove();
      if (success) {
        setBackgroundImage(null);
        setImageInfo(null);
      } else {
        console.error('Failed to clear background image from localStorage');
        setBackgroundImage(null);
        setImageInfo(null);
      }
    } catch (error) {
      console.error(
        'Error clearing background image from localStorage:',
        error
      );
      setBackgroundImage(null);
      setImageInfo(null);
    }
  }, []);

  const getBackgroundImageInfo = useCallback(() => {
    return imageInfo;
  }, [imageInfo]);

  const hasBackgroundImage = useCallback(() => {
    return BackgroundImageStorage.exists();
  }, []);

  return {
    backgroundImage,
    updateBackgroundImage,
    clearBackgroundImage,
    getBackgroundImageInfo,
    hasBackgroundImage,
    isLoading,
  };
}
