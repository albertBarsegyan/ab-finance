import { useState, useEffect } from 'react';
import { Button } from '@/shared/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import { X, Download, WifiOff } from 'lucide-react';

interface PWAUpdateNotificationProps {
  onUpdate: () => void;
  onDismiss: () => void;
  isOfflineReady?: boolean;
}

export function PWAUpdateNotification({
  onUpdate,
  onDismiss,
  isOfflineReady = false,
}: PWAUpdateNotificationProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm">
      <Card className="shadow-lg border-l-4 border-l-green-500">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {isOfflineReady ? (
                <WifiOff className="h-5 w-5 text-green-600" />
              ) : (
                <Download className="h-5 w-5 text-blue-600" />
              )}
              <CardTitle className="text-sm font-semibold">
                {isOfflineReady ? 'App Ready Offline' : 'Update Available'}
              </CardTitle>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setIsVisible(false);
                onDismiss();
              }}
              className="h-6 w-6 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <CardDescription className="text-sm mb-3">
            {isOfflineReady
              ? 'Your app is now ready to work offline. You can use it without an internet connection.'
              : 'A new version of the app is available. Update to get the latest features and improvements.'}
          </CardDescription>
          <div className="flex gap-2">
            {!isOfflineReady && (
              <Button
                onClick={() => {
                  setIsVisible(false);
                  onUpdate();
                }}
                size="sm"
                className="flex-1"
              >
                Update Now
              </Button>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setIsVisible(false);
                onDismiss();
              }}
              className="flex-1"
            >
              {isOfflineReady ? 'Got it' : 'Later'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
