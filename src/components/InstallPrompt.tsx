import { useState } from 'react';
import { usePWA } from '@/hooks/usePWA';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Download, X, Smartphone } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export function InstallPrompt() {
  const { isInstallable, isInstalled, installApp } = usePWA();
  const [isDismissed, setIsDismissed] = useState(false);

  if (!isInstallable || isInstalled || isDismissed) {
    return null;
  }

  const handleInstall = async () => {
    const success = await installApp();
    if (success) {
      toast({
        title: "App Installing",
        description: "KHUSHI Homes is being installed on your device.",
      });
    } else {
      toast({
        title: "Installation Cancelled",
        description: "You can install the app later from your browser menu.",
        variant: "destructive",
      });
    }
  };

  const handleDismiss = () => {
    setIsDismissed(true);
    toast({
      title: "Install Prompt Dismissed",
      description: "You can still install the app from your browser menu.",
    });
  };

  return (
    <Card className="fixed bottom-4 left-4 right-4 z-50 border border-blue-500/30 bg-gradient-to-r from-blue-50 to-blue-100 shadow-xl animate-slide-up md:left-auto md:right-4 md:w-96">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shrink-0">
            <Smartphone className="w-5 h-5 text-white" />
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-blue-900 mb-1">Install KHUSHI Homes</h3>
            <p className="text-sm text-blue-700 mb-3">
              Install our app for quick access and offline functionality.
            </p>
            
            <div className="flex gap-2">
              <Button
                onClick={handleInstall}
                size="sm"
                className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Install App
              </Button>
              
              <Button
                onClick={handleDismiss}
                variant="ghost"
                size="sm"
                className="text-blue-600 hover:text-blue-700 hover:bg-blue-200/50"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
