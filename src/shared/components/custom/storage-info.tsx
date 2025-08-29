import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { Progress } from '@/shared/components/ui/progress';
import { Button } from '@/shared/components/ui/button';
import { HardDrive, Trash2, RefreshCw } from 'lucide-react';
import { storageManager } from '@/shared/utils/storage';
import { useBackgroundImage } from '@/shared/hooks/background-image';

export function StorageInfo() {
  const [storageSize, setStorageSize] = useState(0);
  const [availableSpace, setAvailableSpace] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const { getBackgroundImageInfo, hasBackgroundImage } = useBackgroundImage();

  const loadStorageInfo = () => {
    setIsLoading(true);
    try {
      const size = storageManager.getSize();
      const available = storageManager.getAvailableSpace();
      setStorageSize(size);
      setAvailableSpace(available);
    } catch (error) {
      console.error('Error loading storage info:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadStorageInfo();
  }, []);

  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getUsagePercentage = (): number => {
    if (availableSpace === 0) return 0;
    return Math.min((storageSize / availableSpace) * 100, 100);
  };

  const backgroundImageInfo = getBackgroundImageInfo();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <HardDrive className="h-5 w-5" />
          Storage Information
        </CardTitle>
        <CardDescription>
          Local storage usage and background image details
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span>Storage Usage</span>
            <span>{formatBytes(storageSize)} / {formatBytes(availableSpace)}</span>
          </div>
          <Progress value={getUsagePercentage()} className="h-2" />
          <p className="text-xs text-muted-foreground">
            {getUsagePercentage().toFixed(1)}% of available space used
          </p>
        </div>

        {backgroundImageInfo && (
          <div className="space-y-2 p-3 bg-gray-50 rounded-lg">
            <h4 className="text-sm font-medium">Background Image</h4>
            <div className="space-y-1 text-xs text-muted-foreground">
              {backgroundImageInfo.fileName && (
                <div>File: {backgroundImageInfo.fileName}</div>
              )}
              {backgroundImageInfo.fileSize && (
                <div>Size: {formatBytes(backgroundImageInfo.fileSize)}</div>
              )}
              <div>Added: {new Date(backgroundImageInfo.timestamp).toLocaleDateString()}</div>
            </div>
          </div>
        )}

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={loadStorageInfo}
            disabled={isLoading}
            className="flex-1"
          >
            <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          {hasBackgroundImage() && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                if (confirm('Are you sure you want to clear all local storage data?')) {
                  storageManager.clear();
                  loadStorageInfo();
                }
              }}
              className="flex-1"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Clear All
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
