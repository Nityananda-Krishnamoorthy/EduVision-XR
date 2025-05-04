
import { useEffect, useRef, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ARModelViewerProps {
  type: 'mechanical' | 'brain';
  className?: string;
}

const ARModelViewer = ({ type, className }: ARModelViewerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'3d' | 'exploded'>('3d');

  useEffect(() => {
    // Simulate loading a 3D model
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [type]);

  const ModelPlaceholder = () => {
    if (type === 'mechanical') {
      return (
        <div className="w-full h-full flex items-center justify-center">
          <div className="relative">
            {/* Central gear */}
            <div className="w-32 h-32 rounded-full border-4 border-ar-blue flex items-center justify-center animate-rotate-gear">
              <div className="w-24 h-24 rounded-full border-8 border-ar-teal"></div>
            </div>
            {/* Smaller surrounding gears */}
            <div className="absolute -top-8 -right-8 w-16 h-16 rounded-full border-4 border-ar-light-teal flex items-center justify-center animate-rotate-gear" style={{ animationDirection: 'reverse' }}></div>
            <div className="absolute -bottom-8 -left-8 w-20 h-20 rounded-full border-4 border-ar-teal flex items-center justify-center animate-rotate-gear" style={{ animationDirection: 'reverse' }}></div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="w-full h-full flex items-center justify-center">
          <div className="relative">
            {/* Brain shape representation */}
            <div className="w-36 h-28 bg-ar-teal rounded-[60%] flex items-center justify-center animate-pulse-neuron">
              <div className="w-32 h-24 bg-ar-light-teal rounded-[60%] rotate-12"></div>
            </div>
            {/* Neural connections */}
            {[...Array(8)].map((_, i) => (
              <div 
                key={i} 
                className="absolute w-2 h-2 bg-ar-blue rounded-full"
                style={{
                  top: `${10 + Math.random() * 80}%`,
                  left: `${10 + Math.random() * 80}%`,
                  animationDelay: `${Math.random() * 2}s`
                }}
              >
                <div className="absolute w-6 h-0.5 bg-ar-blue origin-left rotate-45" style={{ transformOrigin: '0% 50%' }}></div>
              </div>
            ))}
          </div>
        </div>
      );
    }
  };

  return (
    <div className={cn("ar-viewer", className)} ref={containerRef}>
      {isLoading ? (
        <div className="w-full h-full flex flex-col items-center justify-center">
          <Loader2 className="h-12 w-12 text-ar-blue animate-spin mb-4" />
          <p className="text-ar-blue text-lg">Loading {type === 'mechanical' ? 'Mechanical' : 'Brain'} Model...</p>
        </div>
      ) : (
        <div className="w-full h-full relative">
          <ModelPlaceholder />
          
          {/* AR Controls */}
          <div className="absolute bottom-4 right-4 flex gap-2">
            <div className="bg-white bg-opacity-70 backdrop-blur-sm rounded-lg shadow-lg p-2 flex gap-2">
              <Button
                variant={viewMode === '3d' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('3d')}
                className="text-xs"
              >
                3D View
              </Button>
              <Button
                variant={viewMode === 'exploded' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('exploded')}
                className="text-xs"
              >
                Exploded View
              </Button>
            </div>
          </div>
          
          {/* Information Overlay */}
          <div className="absolute top-4 left-4 max-w-[250px]">
            <div className="info-panel">
              <h4 className="font-medium text-ar-blue">
                {type === 'mechanical' ? 'Engine Component' : 'Brain Region'}
              </h4>
              <p className="text-sm text-gray-600 mt-1">
                {type === 'mechanical' 
                  ? 'This mechanical assembly demonstrates the key components of a combustion engine system.'
                  : 'The cerebral cortex is responsible for higher-order brain functions including cognition and sensory processing.'}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ARModelViewer;
