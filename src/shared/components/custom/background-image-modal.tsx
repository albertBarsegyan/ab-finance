import { useEffect, useRef, useState } from 'react';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/components/ui/dialog';
import { FileImage, Image, Trash2, Upload } from 'lucide-react';
import { useAlert } from '@/shared/hooks/alert';

export type BackgroundImageModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentBackgroundImage?: string;
  onBackgroundImageChange: (
    imageUrl: string | null,
    metadata?: {
      fileName?: string;
      fileSize?: number;
      fileType?: string;
    }
  ) => void;
};

export function BackgroundImageModal({
  open,
  onOpenChange,
  currentBackgroundImage,
  onBackgroundImageChange,
}: Readonly<BackgroundImageModalProps>) {
  const { setAlert } = useAlert();

  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    currentBackgroundImage || null
  );
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setPreviewUrl(currentBackgroundImage || null);
  }, [currentBackgroundImage]);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setAlert({
        message: 'Please select a valid image file (JPG, PNG, GIF)',
        variant: 'destructive',
      });
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setAlert({
        message: 'Image size must be less than 5MB',
        variant: 'destructive',
      });
      return;
    }

    setSelectedFile(file);

    // Create preview URL
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  };

  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        resolve(result);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleUpload = async () => {
    if (!previewUrl || !selectedFile) {
      setAlert({
        message: 'Please select an image first',
        variant: 'destructive',
      });
      return;
    }

    setIsUploading(true);

    try {
      // Convert file to base64 for persistent storage
      const base64Data = await convertFileToBase64(selectedFile);

      // Pass metadata along with the image URL
      const metadata = {
        fileName: selectedFile.name,
        fileSize: selectedFile.size,
        fileType: selectedFile.type,
      };

      onBackgroundImageChange(base64Data, metadata);

      setAlert({
        message: 'Background image updated successfully!',
        variant: 'success',
      });

      onOpenChange(false);
    } catch (error) {
      console.error('Error uploading image:', error);
      setAlert({
        message: 'Failed to upload image. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveBackground = () => {
    onBackgroundImageChange(null);
    setPreviewUrl(null);
    setSelectedFile(null);

    setAlert({
      message: 'Background image removed successfully!',
      variant: 'success',
    });

    onOpenChange(false);
  };

  const handleClose = () => {
    // Reset preview if not saved
    if (previewUrl !== currentBackgroundImage) {
      setPreviewUrl(currentBackgroundImage || null);
      setSelectedFile(null);
    }
    onOpenChange(false);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Image className="h-5 w-5" />
            Customize Background
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="background-image">Upload Background Image</Label>
            <div className="flex items-center gap-2">
              <Input
                id="background-image"
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileSelect}
                className="flex-1"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Supported formats: JPG, PNG, GIF. Max size: 5MB
            </p>
          </div>

          {selectedFile && (
            <div className="space-y-2">
              <Label>Selected File</Label>
              <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                <FileImage className="h-4 w-4 text-gray-500" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">
                    {selectedFile.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {formatFileSize(selectedFile.size)}
                  </p>
                </div>
              </div>
            </div>
          )}

          {previewUrl && (
            <div className="space-y-2">
              <Label>Preview</Label>
              <div className="relative">
                <img
                  src={previewUrl}
                  alt="Background preview"
                  className="w-full h-32 object-cover rounded-lg border"
                />
              </div>
            </div>
          )}

          {currentBackgroundImage && !previewUrl && (
            <div className="space-y-2">
              <Label>Current Background</Label>
              <div className="relative">
                <img
                  src={currentBackgroundImage}
                  alt="Current background"
                  className="w-full h-32 object-cover rounded-lg border opacity-60"
                />
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="flex flex-col gap-2 sm:flex-row">
          {currentBackgroundImage && (
            <Button
              variant="outline"
              onClick={handleRemoveBackground}
              className="w-full sm:w-auto"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Remove Background
            </Button>
          )}
          <div className="flex gap-2 w-full sm:w-auto">
            <Button
              variant="outline"
              onClick={handleClose}
              className="flex-1 sm:flex-none"
            >
              Cancel
            </Button>
            <Button
              onClick={handleUpload}
              disabled={!previewUrl || !selectedFile || isUploading}
              className="flex-1 sm:flex-none"
            >
              {isUploading ? 'Uploading...' : 'Apply Background'}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
