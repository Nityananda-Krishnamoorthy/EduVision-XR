
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
              {/* Enhanced Engine model with more detailed visualization */}
              <div className="w-64 h-40 bg-pink-700/70 rounded-md flex items-center justify-center relative">
                {/* Engine block with improved aesthetics */}
                <div className="absolute top-0 left-0 right-0 h-40 w-64 bg-gradient-to-b from-black/70 to-purple-900/80 rounded-md border border-pink-500/30"></div>
                
                {/* Cylinders with glowing effect */}
                <div className="absolute top-4 left-6 w-10 h-24 bg-black rounded-full border-2 border-pink-400/70 shadow-[0_0_15px_rgba(219,39,119,0.5)]"></div>
                <div className="absolute top-4 left-20 w-10 h-24 bg-black rounded-full border-2 border-pink-400/70 shadow-[0_0_15px_rgba(219,39,119,0.5)]"></div>
                <div className="absolute top-4 left-34 w-10 h-24 bg-black rounded-full border-2 border-pink-400/70 shadow-[0_0_15px_rgba(219,39,119,0.5)]"></div>
                <div className="absolute top-4 left-48 w-10 h-24 bg-black rounded-full border-2 border-pink-400/70 shadow-[0_0_15px_rgba(219,39,119,0.5)]"></div>
                
                {/* Crankshaft with metallic effect */}
                <div className="absolute bottom-2 left-0 right-0 h-3 bg-gradient-to-r from-purple-700 via-pink-500 to-purple-700 w-56 mx-auto"></div>
                
                {/* Engine head with improved design */}
                <div className="absolute -top-4 left-0 right-0 h-4 bg-gradient-to-r from-purple-800 to-purple-600 w-60 mx-auto rounded-t-md border-t border-pink-500/50"></div>
                
                {/* Decorative elements */}
                <div className="absolute top-10 left-[80px] right-0 w-1 h-14 bg-pink-500/40"></div>
                <div className="absolute top-10 left-[120px] right-0 w-1 h-14 bg-pink-500/40"></div>
              </div>
              
              {showDimensions && (
                <>
                  {/* Width dimension */}
                  <div className="dimension-line bottom-0 left-0 right-0 border-t border-pink-400"></div>
                  <div className="dimension-label bottom-3 left-1/2 transform -translate-x-1/2 bg-black text-pink-400">
                    {modelDimensions.engine.width}{modelDimensions.engine.unit}
                  </div>
                  
                  {/* Height dimension */}
                  <div className="dimension-line top-0 bottom-0 right-0 border-r border-pink-400"></div>
                  <div className="dimension-label top-1/2 right-3 transform -translate-y-1/2 rotate-90 bg-black text-pink-400">
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
              {/* Enhanced pump with more details */}
              <div className="w-40 h-32 bg-purple-900/80 rounded-lg flex items-center justify-center relative">
                {/* Pump body with gradient */}
                <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-br from-purple-900 to-black rounded-lg border border-pink-500/30"></div>
                
                {/* Pump inlet */}
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1/2 w-16 h-10 bg-gradient-to-l from-purple-800 to-black rounded-l-full border border-pink-400/30"></div>
                
                {/* Pump outlet */}
                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2 w-16 h-8 bg-gradient-to-r from-purple-800 to-black rounded-r-full border border-pink-400/30"></div>
                
                {/* Impeller with glowing effect */}
                <div className="w-20 h-20 rounded-full border-4 border-pink-500 animate-rotate-gear relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-600/30 to-pink-400/30"></div>
                  
                  {/* Impeller blades */}
                  {[...Array(8)].map((_, i) => (
                    <div 
                      key={i} 
                      className="absolute top-1/2 left-1/2 w-1 h-8 bg-pink-400"
                      style={{
                        transform: `translate(-50%, 0) rotate(${i * 45}deg)`,
                        transformOrigin: 'bottom center'
                      }}
                    ></div>
                  ))}
                </div>
                
                {/* Motor connection */}
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-8 h-6 bg-black border border-pink-500/40"></div>
              </div>
              
              {showDimensions && (
                <>
                  {/* Width dimension */}
                  <div className="dimension-line bottom-0 left-0 right-0 border-t border-pink-400"></div>
                  <div className="dimension-label bottom-3 left-1/2 transform -translate-x-1/2 bg-black text-pink-400">
                    {modelDimensions.pump.width}{modelDimensions.pump.unit}
                  </div>
                  
                  {/* Height dimension */}
                  <div className="dimension-line top-0 bottom-0 right-0 border-r border-pink-400"></div>
                  <div className="dimension-label top-1/2 right-3 transform -translate-y-1/2 rotate-90 bg-black text-pink-400">
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
              {/* Enhanced cylinder with more realistic appearance */}
              <div className="w-24 h-32 bg-gradient-to-b from-purple-900 to-black rounded-xl flex items-center justify-center relative overflow-hidden border border-pink-500/30">
                {/* Cylinder bore with metal texture */}
                <div className="w-20 h-28 bg-gradient-to-b from-purple-800/60 to-black/60 rounded-xl relative">
                  {/* Piston with metallic effect */}
                  <div className="absolute w-18 h-12 bg-gradient-to-b from-pink-400 to-purple-600 top-16 left-3 right-3 rounded-t-lg animate-bounce border-t border-pink-300/50" style={{animationDuration: '3s'}}></div>
                  
                  {/* Piston rings with glow */}
                  <div className="absolute w-18 h-1 bg-pink-500 top-16 left-3 right-3 shadow-[0_0_5px_rgba(236,72,153,0.7)]"></div>
                  <div className="absolute w-18 h-1 bg-pink-500 top-18 left-3 right-3 shadow-[0_0_5px_rgba(236,72,153,0.7)]"></div>
                  
                  {/* Cylinder wall details */}
                  <div className="absolute top-0 bottom-0 left-2 w-0.5 h-full bg-gradient-to-b from-pink-500/10 to-pink-300/30"></div>
                  <div className="absolute top-0 bottom-0 right-2 w-0.5 h-full bg-gradient-to-b from-pink-500/10 to-pink-300/30"></div>
                </div>
                
                {/* Connecting rod */}
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-4 h-10 bg-gradient-to-b from-purple-600 to-pink-500"></div>
              </div>
              
              {showDimensions && (
                <>
                  {/* Width dimension */}
                  <div className="dimension-line bottom-0 left-0 right-0 border-t border-pink-400"></div>
                  <div className="dimension-label bottom-3 left-1/2 transform -translate-x-1/2 bg-black text-pink-400">
                    {modelDimensions.cylinder.width}{modelDimensions.cylinder.unit}
                  </div>
                  
                  {/* Height dimension */}
                  <div className="dimension-line top-0 bottom-0 right-0 border-r border-pink-400"></div>
                  <div className="dimension-label top-1/2 right-3 transform -translate-y-1/2 rotate-90 bg-black text-pink-400">
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
          {/* Enhanced brain visualization with updated colors */}
          <div className="w-36 h-28 bg-gradient-to-br from-purple-800 to-pink-700 rounded-[60%] flex items-center justify-center animate-pulse-neuron relative">
            {/* Main brain shape with smoother appearance */}
            <div className="w-32 h-24 bg-gradient-to-br from-pink-500 to-purple-600 rounded-[60%] rotate-12 relative overflow-hidden">
              {/* Brain texture details */}
              <div className="absolute top-0 left-0 right-0 bottom-0 opacity-30">
                <div className="absolute top-1/4 left-1/4 w-1/2 h-1/3 border border-pink-300/40 rounded-full"></div>
                <div className="absolute bottom-1/4 right-1/4 w-1/3 h-1/4 border border-pink-300/40 rounded-full"></div>
                <div className="absolute top-1/3 right-1/5 w-1/4 h-1/4 border border-pink-300/40 rounded-full"></div>
              </div>
            </div>
            
            {/* Brain hemisphere division */}
            <div className="absolute top-1/4 bottom-1/4 left-1/2 w-[1px] bg-pink-300/50 transform -rotate-12"></div>
          </div>
          
          {/* Neural connections with enhanced visual effect */}
          {[...Array(15)].map((_, i) => (
            <div 
              key={i} 
              className="absolute w-2 h-2 bg-pink-500 rounded-full animate-pulse-neuron"
              style={{
                top: `${10 + Math.random() * 80}%`,
                left: `${10 + Math.random() * 80}%`,
                animationDelay: `${Math.random() * 2}s`,
                boxShadow: '0 0 8px rgba(236,72,153,0.7)'
              }}
            >
              <div className="absolute w-6 h-0.5 bg-gradient-to-r from-pink-500 to-transparent origin-left rotate-45" style={{ transformOrigin: '0% 50%' }}></div>
              <div className="absolute w-4 h-0.5 bg-gradient-to-r from-pink-500 to-transparent origin-left -rotate-45" style={{ transformOrigin: '0% 50%' }}></div>
            </div>
          ))}
          
          {/* Neural pathways */}
          <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 rounded-full">
            {[...Array(5)].map((_, i) => (
              <div 
                key={i} 
                className="absolute w-full h-full border border-pink-400/20 rounded-full"
                style={{
                  transform: `scale(${0.5 + i * 0.1})`,
                  animationDelay: `${i * 0.5}s`
                }}
              ></div>
            ))}
          </div>
          
          {showDimensions && (
            <>
              {/* Width dimension */}
              <div className="dimension-line bottom-0 left-0 right-0 border-t border-pink-400"></div>
              <div className="dimension-label bottom-3 left-1/2 transform -translate-x-1/2 bg-black text-pink-400">
                {modelDimensions.brain.width}{modelDimensions.brain.unit}
              </div>
              
              {/* Height dimension */}
              <div className="dimension-line top-0 bottom-0 right-0 border-r border-pink-400"></div>
              <div className="dimension-label top-1/2 right-3 transform -translate-y-1/2 rotate-90 bg-black text-pink-400">
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
          <Loader2 className="h-12 w-12 text-pink-500 animate-spin mb-4" />
          <p className="text-pink-500 text-lg">Loading {currentModel} model...</p>
        </div>
      ) : (
        <div className="w-full h-full relative">
          {type === 'mechanical' ? <MechanicalModelPlaceholder /> : <BrainModelPlaceholder />}
          
          {/* Model Selector - Only for mechanical type */}
          {type === 'mechanical' && (
            <div className="absolute top-4 right-4 bg-black bg-opacity-70 backdrop-blur-sm rounded-lg shadow-lg p-2 border border-pink-500/30">
              <div className="flex gap-2">
                {mechanicalModels.map((model) => (
                  <Button
                    key={model}
                    variant={currentModel === model ? "default" : "outline"}
                    size="sm"
                    onClick={() => selectModel(model)}
                    className={`text-xs ${currentModel === model ? 'bg-pink-600 hover:bg-pink-700 text-white' : 'text-pink-400 border-pink-500/50 hover:bg-pink-500/20'}`}
                  >
                    {model.charAt(0).toUpperCase() + model.slice(1)}
                  </Button>
                ))}
              </div>
            </div>
          )}
          
          {/* AR Controls */}
          <div className="ar-controls border border-pink-500/30">
            <Button
              variant="outline"
              size="sm"
              onClick={toggleRotation}
              className="text-pink-400 border-pink-500/50 hover:bg-pink-500/20"
            >
              <RotateCw className={`h-4 w-4 ${isRotating ? 'text-pink-400' : 'text-muted-foreground'}`} />
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={handleZoomIn}
              className="text-pink-400 border-pink-500/50 hover:bg-pink-500/20"
              disabled={zoomLevel >= 2}
            >
              <ZoomIn className="h-4 w-4" />
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={handleZoomOut}
              className="text-pink-400 border-pink-500/50 hover:bg-pink-500/20"
              disabled={zoomLevel <= 0.5}
            >
              <ZoomOut className="h-4 w-4" />
            </Button>
            
            <Button
              variant={showDimensions ? "default" : "outline"}
              size="sm"
              onClick={() => setShowDimensions(!showDimensions)}
              className={`text-xs ${showDimensions ? 'bg-pink-600 hover:bg-pink-700 text-white' : 'text-pink-400 border-pink-500/50 hover:bg-pink-500/20'}`}
            >
              Dimensions
            </Button>
            
            <Button
              variant={viewMode === 'exploded' ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode(viewMode === '3d' ? 'exploded' : '3d')}
              className={`text-xs ${viewMode === 'exploded' ? 'bg-pink-600 hover:bg-pink-700 text-white' : 'text-pink-400 border-pink-500/50 hover:bg-pink-500/20'}`}
            >
              {viewMode === '3d' ? 'Exploded View' : '3D View'}
            </Button>
          </div>
          
          {/* Information Overlay */}
          <div className="absolute top-4 left-4 max-w-[250px]">
            <div className="info-panel border border-pink-500/30 bg-black bg-opacity-70">
              <h4 className="font-medium text-pink-400">
                {type === 'mechanical' 
                  ? currentModel.charAt(0).toUpperCase() + currentModel.slice(1)
                  : 'Brain Region'
                }
              </h4>
              <p className="text-sm text-purple-200/80 mt-1">
                {type === 'mechanical' 
                  ? currentModel === 'engine' 
                    ? 'Four-cylinder internal combustion engine with 650mm width, 450mm height, and 600mm depth.'
                    : currentModel === 'pump'
                    ? 'Centrifugal pump with impeller design for fluid transfer systems.'
                    : 'Engine cylinder with piston, showing compression and power strokes.'
                  : 'The cerebral cortex is responsible for higher-order brain functions including cognition and sensory processing.'}
              </p>
              {showDimensions && (
                <div className="mt-2 text-xs text-pink-300">
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
