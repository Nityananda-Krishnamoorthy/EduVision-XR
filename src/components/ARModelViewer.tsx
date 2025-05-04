
import { useEffect, useRef, useState } from 'react';
import { Loader2, RotateCw, ZoomIn, ZoomOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ARModelViewerProps {
  type: 'mechanical' | 'brain';
  className?: string;
}

interface ModelDimensions {
  width: number;
  height: number;
  depth: number;
  unit: string;
}

const ARModelViewer = ({ type, className }: ARModelViewerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'3d' | 'exploded'>('3d');
  const [isRotating, setIsRotating] = useState(true);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [showDimensions, setShowDimensions] = useState(false);
  
  // Model-specific data
  const modelDimensions: Record<string, ModelDimensions> = {
    engine: { width: 650, height: 450, depth: 600, unit: 'mm' },
    pump: { width: 300, height: 200, depth: 250, unit: 'mm' },
    cylinder: { width: 85, height: 120, depth: 85, unit: 'mm' },
    brain: { width: 140, height: 110, depth: 170, unit: 'mm' },
  };
  
  const [currentModel, setCurrentModel] = useState<string>(
    type === 'mechanical' ? 'engine' : 'brain'
  );
  
  const mechanicalModels = ['engine', 'pump', 'cylinder'];
  
  useEffect(() => {
    // Reset model when type changes
    if (type === 'mechanical') {
      setCurrentModel('engine');
    } else {
      setCurrentModel('brain');
    }
    
    // Simulate loading a 3D model
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [type]);

  const handleZoomIn = () => {
    if (zoomLevel < 2) {
      setZoomLevel(prevZoom => prevZoom + 0.1);
    }
  };

  const handleZoomOut = () => {
    if (zoomLevel > 0.5) {
      setZoomLevel(prevZoom => prevZoom - 0.1);
    }
  };

  const toggleRotation = () => {
    setIsRotating(!isRotating);
  };
  
  const selectModel = (model: string) => {
    setIsLoading(true);
    setCurrentModel(model);
    
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  };

  const MechanicalModelPlaceholder = () => {
    switch (currentModel) {
      case 'engine':
        return (
          <div className="w-full h-full flex items-center justify-center">
            <div 
              className={`relative ${isRotating ? 'animate-rotate-model' : ''}`} 
              style={{transform: `scale(${zoomLevel})`}}
            >
              {/* Engine block */}
              <div className="w-64 h-40 bg-ar-dark-purple/80 rounded-md flex items-center justify-center relative">
                {/* Cylinders */}
                <div className="absolute top-4 left-6 w-10 h-24 bg-ar-black rounded-full border-2 border-ar-light-purple/50"></div>
                <div className="absolute top-4 left-20 w-10 h-24 bg-ar-black rounded-full border-2 border-ar-light-purple/50"></div>
                <div className="absolute top-4 left-34 w-10 h-24 bg-ar-black rounded-full border-2 border-ar-light-purple/50"></div>
                <div className="absolute top-4 left-48 w-10 h-24 bg-ar-black rounded-full border-2 border-ar-light-purple/50"></div>
                
                {/* Crankshaft */}
                <div className="absolute bottom-2 left-0 right-0 h-3 bg-ar-purple w-56 mx-auto"></div>
                
                {/* Engine head */}
                <div className="absolute -top-4 left-0 right-0 h-4 bg-ar-purple w-60 mx-auto rounded-t-md"></div>
              </div>
              
              {showDimensions && (
                <>
                  {/* Width dimension */}
                  <div className="dimension-line bottom-0 left-0 right-0 border-t"></div>
                  <div className="dimension-label bottom-3 left-1/2 transform -translate-x-1/2">
                    {modelDimensions.engine.width}{modelDimensions.engine.unit}
                  </div>
                  
                  {/* Height dimension */}
                  <div className="dimension-line top-0 bottom-0 right-0 border-r"></div>
                  <div className="dimension-label top-1/2 right-3 transform -translate-y-1/2 rotate-90">
                    {modelDimensions.engine.height}{modelDimensions.engine.unit}
                  </div>
                </>
              )}
            </div>
          </div>
        );
      case 'pump':
        return (
          <div className="w-full h-full flex items-center justify-center">
            <div 
              className={`relative ${isRotating ? 'animate-rotate-model' : ''}`} 
              style={{transform: `scale(${zoomLevel})`}}
            >
              {/* Pump body */}
              <div className="w-40 h-32 bg-ar-purple/80 rounded-lg flex items-center justify-center relative">
                {/* Pump inlet */}
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1/2 w-16 h-10 bg-ar-dark-purple rounded-l-full"></div>
                
                {/* Pump outlet */}
                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2 w-16 h-8 bg-ar-dark-purple rounded-r-full"></div>
                
                {/* Impeller */}
                <div className="w-20 h-20 rounded-full border-4 border-ar-light-purple animate-rotate-gear"></div>
                
                {/* Motor connection */}
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-8 h-6 bg-ar-black"></div>
              </div>
              
              {showDimensions && (
                <>
                  {/* Width dimension */}
                  <div className="dimension-line bottom-0 left-0 right-0 border-t"></div>
                  <div className="dimension-label bottom-3 left-1/2 transform -translate-x-1/2">
                    {modelDimensions.pump.width}{modelDimensions.pump.unit}
                  </div>
                  
                  {/* Height dimension */}
                  <div className="dimension-line top-0 bottom-0 right-0 border-r"></div>
                  <div className="dimension-label top-1/2 right-3 transform -translate-y-1/2 rotate-90">
                    {modelDimensions.pump.height}{modelDimensions.pump.unit}
                  </div>
                </>
              )}
            </div>
          </div>
        );
      case 'cylinder':
        return (
          <div className="w-full h-full flex items-center justify-center">
            <div 
              className={`relative ${isRotating ? 'animate-rotate-model' : ''}`} 
              style={{transform: `scale(${zoomLevel})`}}
            >
              {/* Cylinder block */}
              <div className="w-24 h-32 bg-ar-black/80 rounded-xl flex items-center justify-center relative overflow-hidden">
                {/* Cylinder bore */}
                <div className="w-20 h-28 bg-ar-dark-purple rounded-xl">
                  {/* Piston */}
                  <div className="absolute w-18 h-12 bg-ar-light-purple top-16 left-3 right-3 rounded-t-lg animate-bounce" style={{animationDuration: '3s'}}></div>
                  
                  {/* Piston rings */}
                  <div className="absolute w-18 h-1 bg-ar-purple top-16 left-3 right-3"></div>
                  <div className="absolute w-18 h-1 bg-ar-purple top-18 left-3 right-3"></div>
                </div>
                
                {/* Connecting rod */}
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-4 h-10 bg-ar-purple"></div>
              </div>
              
              {showDimensions && (
                <>
                  {/* Width dimension */}
                  <div className="dimension-line bottom-0 left-0 right-0 border-t"></div>
                  <div className="dimension-label bottom-3 left-1/2 transform -translate-x-1/2">
                    {modelDimensions.cylinder.width}{modelDimensions.cylinder.unit}
                  </div>
                  
                  {/* Height dimension */}
                  <div className="dimension-line top-0 bottom-0 right-0 border-r"></div>
                  <div className="dimension-label top-1/2 right-3 transform -translate-y-1/2 rotate-90">
                    {modelDimensions.cylinder.height}{modelDimensions.cylinder.unit}
                  </div>
                </>
              )}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const BrainModelPlaceholder = () => {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div 
          className={`relative ${isRotating ? 'animate-rotate-model' : ''}`} 
          style={{transform: `scale(${zoomLevel})`}}
        >
          {/* Brain shape representation */}
          <div className="w-36 h-28 bg-ar-purple rounded-[60%] flex items-center justify-center animate-pulse-neuron">
            <div className="w-32 h-24 bg-ar-light-purple rounded-[60%] rotate-12"></div>
          </div>
          {/* Neural connections */}
          {[...Array(12)].map((_, i) => (
            <div 
              key={i} 
              className="absolute w-2 h-2 bg-ar-dark-purple rounded-full"
              style={{
                top: `${10 + Math.random() * 80}%`,
                left: `${10 + Math.random() * 80}%`,
                animationDelay: `${Math.random() * 2}s`
              }}
            >
              <div className="absolute w-6 h-0.5 bg-ar-light-purple origin-left rotate-45" style={{ transformOrigin: '0% 50%' }}></div>
            </div>
          ))}
          
          {showDimensions && (
            <>
              {/* Width dimension */}
              <div className="dimension-line bottom-0 left-0 right-0 border-t"></div>
              <div className="dimension-label bottom-3 left-1/2 transform -translate-x-1/2">
                {modelDimensions.brain.width}{modelDimensions.brain.unit}
              </div>
              
              {/* Height dimension */}
              <div className="dimension-line top-0 bottom-0 right-0 border-r"></div>
              <div className="dimension-label top-1/2 right-3 transform -translate-y-1/2 rotate-90">
                {modelDimensions.brain.height}{modelDimensions.brain.unit}
              </div>
            </>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className={cn("ar-viewer", className)} ref={containerRef}>
      {isLoading ? (
        <div className="w-full h-full flex flex-col items-center justify-center">
          <Loader2 className="h-12 w-12 text-ar-purple animate-spin mb-4" />
          <p className="text-ar-purple text-lg">Loading {currentModel} model...</p>
        </div>
      ) : (
        <div className="w-full h-full relative">
          {type === 'mechanical' ? <MechanicalModelPlaceholder /> : <BrainModelPlaceholder />}
          
          {/* Model Selector - Only for mechanical type */}
          {type === 'mechanical' && (
            <div className="absolute top-4 right-4 bg-ar-black bg-opacity-70 backdrop-blur-sm rounded-lg shadow-lg p-2">
              <div className="flex gap-2">
                {mechanicalModels.map((model) => (
                  <Button
                    key={model}
                    variant={currentModel === model ? "default" : "outline"}
                    size="sm"
                    onClick={() => selectModel(model)}
                    className={`text-xs ${currentModel === model ? 'bg-ar-purple text-ar-black' : 'text-ar-purple'}`}
                  >
                    {model.charAt(0).toUpperCase() + model.slice(1)}
                  </Button>
                ))}
              </div>
            </div>
          )}
          
          {/* AR Controls */}
          <div className="ar-controls">
            <Button
              variant="outline"
              size="sm"
              onClick={toggleRotation}
              className="text-ar-purple border-ar-purple/50 hover:bg-ar-purple/20"
            >
              <RotateCw className={`h-4 w-4 ${isRotating ? 'text-ar-purple' : 'text-muted-foreground'}`} />
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={handleZoomIn}
              className="text-ar-purple border-ar-purple/50 hover:bg-ar-purple/20"
              disabled={zoomLevel >= 2}
            >
              <ZoomIn className="h-4 w-4" />
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={handleZoomOut}
              className="text-ar-purple border-ar-purple/50 hover:bg-ar-purple/20"
              disabled={zoomLevel <= 0.5}
            >
              <ZoomOut className="h-4 w-4" />
            </Button>
            
            <Button
              variant={showDimensions ? "default" : "outline"}
              size="sm"
              onClick={() => setShowDimensions(!showDimensions)}
              className={`text-xs ${showDimensions ? 'bg-ar-purple text-ar-black' : 'text-ar-purple border-ar-purple/50 hover:bg-ar-purple/20'}`}
            >
              Dimensions
            </Button>
            
            <Button
              variant={viewMode === 'exploded' ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode(viewMode === '3d' ? 'exploded' : '3d')}
              className={`text-xs ${viewMode === 'exploded' ? 'bg-ar-purple text-ar-black' : 'text-ar-purple border-ar-purple/50 hover:bg-ar-purple/20'}`}
            >
              {viewMode === '3d' ? 'Exploded View' : '3D View'}
            </Button>
          </div>
          
          {/* Information Overlay */}
          <div className="absolute top-4 left-4 max-w-[250px]">
            <div className="info-panel border border-ar-purple/30">
              <h4 className="font-medium text-ar-purple">
                {type === 'mechanical' 
                  ? currentModel.charAt(0).toUpperCase() + currentModel.slice(1)
                  : 'Brain Region'
                }
              </h4>
              <p className="text-sm text-foreground/80 mt-1">
                {type === 'mechanical' 
                  ? currentModel === 'engine' 
                    ? 'Four-cylinder internal combustion engine with 650mm width, 450mm height, and 600mm depth.'
                    : currentModel === 'pump'
                    ? 'Centrifugal pump with impeller design for fluid transfer systems.'
                    : 'Engine cylinder with piston, showing compression and power strokes.'
                  : 'The cerebral cortex is responsible for higher-order brain functions including cognition and sensory processing.'}
              </p>
              {showDimensions && (
                <div className="mt-2 text-xs text-ar-light-purple">
                  <p>Width: {modelDimensions[currentModel].width}{modelDimensions[currentModel].unit}</p>
                  <p>Height: {modelDimensions[currentModel].height}{modelDimensions[currentModel].unit}</p>
                  <p>Depth: {modelDimensions[currentModel].depth}{modelDimensions[currentModel].unit}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ARModelViewer;
