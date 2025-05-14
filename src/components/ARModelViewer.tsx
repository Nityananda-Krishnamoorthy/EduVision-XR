import { useEffect, useRef, useState } from 'react';
import { Loader2, RotateCw, ZoomIn, ZoomOut, Brain, Cog, Gauge, Cylinder as CylinderIcon, Beaker } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

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
  const [activeTab, setActiveTab] = useState('overview');
  
  // Model-specific data
  const modelDimensions: Record<string, ModelDimensions> = {
    engine: { width: 650, height: 450, depth: 600, unit: 'mm' },
    pump: { width: 300, height: 200, depth: 250, unit: 'mm' },
    cylinder: { width: 85, height: 120, depth: 85, unit: 'mm' },
    brain: { width: 140, height: 110, depth: 170, unit: 'mm' },
    cerebellum: { width: 120, height: 90, depth: 130, unit: 'mm' },
    neuron: { width: 0.1, height: 0.1, depth: 0.1, unit: 'mm' },
    transmission: { width: 450, height: 380, depth: 350, unit: 'mm' },
    valve: { width: 120, height: 80, depth: 80, unit: 'mm' },
  };
  
  const [currentModel, setCurrentModel] = useState<string>(
    type === 'mechanical' ? 'engine' : 'brain'
  );
  
  const mechanicalModels = ['engine', 'pump', 'cylinder', 'transmission', 'valve'];
  const brainModels = ['brain', 'cerebellum', 'neuron'];
  
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
      setZoomLevel(prevZoom => Math.min(prevZoom + 0.1, 2));
    }
  };

  const handleZoomOut = () => {
    if (zoomLevel > 0.5) {
      setZoomLevel(prevZoom => Math.max(prevZoom - 0.1, 0.5));
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
      case 'transmission':
        return (
          <div className="w-full h-full flex items-center justify-center">
            <div 
              className={`relative ${isRotating ? 'animate-rotate-model' : ''}`} 
              style={{transform: `scale(${zoomLevel})`}}
            >
              {/* Enhanced transmission visualization */}
              <div className="w-56 h-44 bg-purple-900/80 rounded-lg flex items-center justify-center relative">
                {/* Transmission body with gradient */}
                <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-br from-purple-900 to-black rounded-lg border border-pink-500/30"></div>
                
                {/* Gears with interaction */}
                <div className="absolute left-1/4 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full border-2 border-pink-500 animate-rotate-gear">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-600/30 to-pink-400/30 rounded-full"></div>
                  
                  {/* Gear teeth */}
                  {[...Array(12)].map((_, i) => (
                    <div 
                      key={i} 
                      className="absolute w-2 h-4 bg-pink-400"
                      style={{
                        left: '50%',
                        top: '50%',
                        transform: `rotate(${i * 30}deg) translateY(-10px)`,
                        transformOrigin: 'bottom center'
                      }}
                    ></div>
                  ))}
                </div>
                
                <div className="absolute right-1/4 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full border-2 border-pink-500 animate-rotate-gear" style={{animationDirection: 'reverse', animationDuration: '15s'}}>
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-600/30 to-pink-400/30 rounded-full"></div>
                  
                  {/* Gear teeth */}
                  {[...Array(16)].map((_, i) => (
                    <div 
                      key={i} 
                      className="absolute w-2 h-5 bg-pink-400"
                      style={{
                        left: '50%',
                        top: '50%',
                        transform: `rotate(${i * 22.5}deg) translateY(-12px)`,
                        transformOrigin: 'bottom center'
                      }}
                    ></div>
                  ))}
                </div>
                
                {/* Output shaft */}
                <div className="absolute -right-8 top-1/2 transform -translate-y-1/2 w-8 h-4 bg-gradient-to-r from-purple-700 to-black"></div>
                
                {/* Input shaft */}
                <div className="absolute -left-8 top-1/2 transform -translate-y-1/2 w-8 h-4 bg-gradient-to-l from-purple-700 to-black"></div>
                
                {/* Housing details */}
                <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-pink-500/20 via-pink-400/40 to-pink-500/20"></div>
              </div>
              
              {showDimensions && (
                <>
                  {/* Width dimension */}
                  <div className="dimension-line bottom-0 left-0 right-0 border-t border-pink-400"></div>
                  <div className="dimension-label bottom-3 left-1/2 transform -translate-x-1/2 bg-black text-pink-400">
                    {modelDimensions.transmission.width}{modelDimensions.transmission.unit}
                  </div>
                  
                  {/* Height dimension */}
                  <div className="dimension-line top-0 bottom-0 right-0 border-r border-pink-400"></div>
                  <div className="dimension-label top-1/2 right-3 transform -translate-y-1/2 rotate-90 bg-black text-pink-400">
                    {modelDimensions.transmission.height}{modelDimensions.transmission.unit}
                  </div>
                </>
              )}
            </div>
          </div>
        );
      case 'valve':
        return (
          <div className="w-full h-full flex items-center justify-center">
            <div 
              className={`relative ${isRotating ? 'animate-rotate-model' : ''}`} 
              style={{transform: `scale(${zoomLevel})`}}
            >
              {/* Enhanced valve with animation */}
              <div className="w-32 h-32 relative">
                {/* Valve body */}
                <div className="absolute top-1/3 left-0 right-0 h-12 bg-gradient-to-b from-purple-800 to-black rounded-md border border-pink-500/30"></div>
                
                {/* Valve inlet */}
                <div className="absolute left-1/2 top-0 transform -translate-x-1/2 -translate-y-1/4 w-6 h-16 bg-gradient-to-t from-purple-800 to-black rounded-t-md border border-pink-400/30"></div>
                
                {/* Valve outlet */}
                <div className="absolute bottom-0 left-0 w-6 h-12 bg-gradient-to-l from-purple-800 to-black rounded-l-md border border-pink-400/30"></div>
                
                <div className="absolute bottom-0 right-0 w-6 h-12 bg-gradient-to-r from-purple-800 to-black rounded-r-md border border-pink-400/30"></div>
                
                {/* Valve disc with animation */}
                <div className="absolute top-1/3 left-1/2 w-20 h-2 bg-pink-500 transform -translate-x-1/2 rotate-45 origin-center" 
                     style={{ 
                       animation: isRotating ? 'rotate 3s ease-in-out infinite alternate' : 'none',
                     }}>
                </div>
                
                {/* Valve stem */}
                <div className="absolute left-1/2 top-0 transform -translate-x-1/2 -translate-y-1/4 w-2 h-16 bg-gradient-to-t from-pink-600 to-pink-400"></div>
                
                {/* Valve handle */}
                <div className="absolute left-1/2 top-0 transform -translate-x-1/2 -translate-y-6 w-10 h-4 bg-pink-400 rounded"></div>
              </div>
              
              {showDimensions && (
                <>
                  {/* Width dimension */}
                  <div className="dimension-line bottom-0 left-0 right-0 border-t border-pink-400"></div>
                  <div className="dimension-label bottom-3 left-1/2 transform -translate-x-1/2 bg-black text-pink-400">
                    {modelDimensions.valve.width}{modelDimensions.valve.unit}
                  </div>
                  
                  {/* Height dimension */}
                  <div className="dimension-line top-0 bottom-0 right-0 border-r border-pink-400"></div>
                  <div className="dimension-label top-1/2 right-3 transform -translate-y-1/2 rotate-90 bg-black text-pink-400">
                    {modelDimensions.valve.height}{modelDimensions.valve.unit}
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
    switch (currentModel) {
      case 'brain':
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
{/* 3D View Button for Brain */}
          <a
            href="https://human.biodigital.com/widget/?be=2REV&background.colors=255,255,255,1,51,64,77,1&initial.hand-hint=true&ui-fullscreen=true&ui-center=false&ui-dissect=true&ui-zoom=true&ui-help=true&ui-tools-display=primary&ui-info=true&uaid=3bHQC"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-block px-4 py-2 bg-pink-600 text-white rounded-lg shadow-md hover:bg-pink-700 transition"
          >
            View 3D Brain Model
          </a>
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
        </div>
          </div>
        );
      case 'cerebellum':
        return (
          <div className="w-full h-full flex items-center justify-center">
            <div 
              className={`relative ${isRotating ? 'animate-rotate-model' : ''}`} 
              style={{transform: `scale(${zoomLevel})`}}
            >
              {/* Enhanced cerebellum visualization */}
              <div className="w-32 h-24 bg-gradient-to-br from-purple-700 to-pink-800 rounded-[70%] flex items-center justify-center relative">
                {/* Main cerebellum shape */}
                <div className="w-28 h-20 bg-gradient-to-br from-pink-600 to-purple-800 rounded-[70%] rotate-6 relative overflow-hidden">
                  {/* Cerebellum texture - foliated pattern */}
                  <div className="absolute top-0 left-0 right-0 bottom-0">
                    {[...Array(12)].map((_, i) => (
                      <div 
                        key={i} 
                        className="absolute w-full h-1 bg-pink-400/30"
                        style={{
                          top: `${i * 2 + 2}px`,
                          transform: 'rotate(6deg)'
                        }}
                      ></div>
                    ))}
                  </div>
                </div>
                
                {/* Brain stem connection */}
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-5 h-8 bg-gradient-to-b from-pink-600 to-purple-700 rounded-b-md"></div>
              </div>
              
              {/* Neural connections */}
              {[...Array(10)].map((_, i) => (
                <div 
                  key={i} 
                  className="absolute w-1.5 h-1.5 bg-pink-500/80 rounded-full animate-pulse-neuron"
                  style={{
                    top: `${20 + Math.random() * 60}%`,
                    left: `${20 + Math.random() * 60}%`,
                    animationDelay: `${Math.random() * 2}s`,
                    boxShadow: '0 0 8px rgba(236,72,153,0.7)'
                  }}
                >
                  <div className="absolute w-4 h-0.5 bg-gradient-to-r from-pink-500 to-transparent origin-left rotate-45" style={{ transformOrigin: '0% 50%' }}></div>
                </div>
              ))}
              
              {showDimensions && (
                <>
                  {/* Width dimension */}
                  <div className="dimension-line bottom-0 left-0 right-0 border-t border-pink-400"></div>
                  <div className="dimension-label bottom-3 left-1/2 transform -translate-x-1/2 bg-black text-pink-400">
                    {modelDimensions.cerebellum.width}{modelDimensions.cerebellum.unit}
                  </div>
                  
                  {/* Height dimension */}
                  <div className="dimension-line top-0 bottom-0 right-0 border-r border-pink-400"></div>
                  <div className="dimension-label top-1/2 right-3 transform -translate-y-1/2 rotate-90 bg-black text-pink-400">
                    {modelDimensions.cerebellum.height}{modelDimensions.cerebellum.unit}
                  </div>
                </>
              )}
            </div>
          </div>
        );
      case 'neuron':
        return (
          <div className="w-full h-full flex items-center justify-center">
            <div 
              className={`relative ${isRotating ? 'animate-rotate-model' : ''}`} 
              style={{transform: `scale(${zoomLevel})`}}
            >
              {/* Enhanced neuron visualization */}
              <div className="w-64 h-48 relative">
                {/* Cell body (soma) */}
                <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full border border-pink-300/50 shadow-[0_0_15px_rgba(219,39,119,0.5)]"></div>
                
                {/* Nucleus */}
                <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-gradient-to-br from-purple-800 to-purple-900 rounded-full border border-pink-400/30"></div>
                
                {/* Dendrites */}
                {[...Array(12)].map((_, i) => (
                  <div 
                    key={i} 
                    className="absolute bg-gradient-to-r from-pink-400 to-transparent"
                    style={{
                      width: `${15 + Math.random() * 30}px`,
                      height: '2px',
                      left: '50%',
                      top: '50%',
                      transform: `rotate(${i * 30}deg) translateX(8px)`,
                      transformOrigin: 'left center'
                    }}
                  >
                    {/* Dendrite branches */}
                    <div 
                      className="absolute bg-gradient-to-r from-pink-400 to-transparent w-1/2 h-2 -rotate-45"
                      style={{ 
                        right: 0,
                        top: 0,
                        transformOrigin: 'left bottom'
                      }}
                    ></div>
                  </div>
                ))}
                
                {/* Axon */}
                <div className="absolute left-1/2 top-1/2 transform translate-x-3 -translate-y-1/2 w-40 h-4 bg-gradient-to-r from-pink-500 to-pink-400/70 rounded-full"></div>
                
                {/* Axon terminal */}
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 w-8 h-10 flex flex-col items-center justify-end space-y-1">
                  {[...Array(3)].map((_, i) => (
                    <div 
                      key={i} 
                      className="w-4 h-4 bg-gradient-to-br from-pink-400 to-purple-600 rounded-full border border-pink-300/50"
                      style={{ animationDelay: `${i * 0.2}s` }}
                    ></div>
                  ))}
                </div>
                
                {/* Myelin sheath */}
                {[...Array(4)].map((_, i) => (
                  <div 
                    key={i} 
                    className="absolute top-1/2 transform -translate-y-1/2 h-6 bg-pink-200/30 rounded-full border border-pink-300/20"
                    style={{
                      left: `${32 + i * 10}%`,
                      width: '12px'
                    }}
                  ></div>
                ))}
                
                {/* Neural signals animation */}
                <div 
                  className="absolute top-1/2 transform -translate-y-1/2 w-3 h-3 bg-pink-300 rounded-full opacity-80"
                  style={{
                    left: '30%',
                    animation: 'travel 4s linear infinite',
                    boxShadow: '0 0 10px rgba(236,72,153,0.8)'
                  }}
                ></div>
              </div>
              
              {showDimensions && (
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-70 text-pink-400 text-xs px-2 py-1 rounded">
                  Neural scale: ~0.1mm (cell body diameter)
                </div>
              )}
            </div>
          </div>
        );
      default:
        return null;
    }
  };
  
  // Add information tabs functionality
  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="text-sm text-foreground/80 mt-1">
            {type === 'mechanical' 
              ? currentModel === 'engine' 
                ? 'Four-cylinder internal combustion engine with cutting-edge efficiency design.'
                : currentModel === 'pump'
                ? 'Centrifugal pump with impeller design for fluid transfer systems.'
                : currentModel === 'cylinder'
                ? 'Engine cylinder with piston, showing compression and power strokes.'
                : currentModel === 'transmission'
                ? 'Automotive manual transmission with gear system for power transfer.'
                : 'Flow control valve with adjustable disc for regulating fluid movement.'
              : currentModel === 'brain'
              ? 'The cerebral cortex processes sensory information and controls motor functions.'
              : currentModel === 'cerebellum'
              ? 'The cerebellum coordinates movement, posture, and balance in the body.'
              : 'Neurons are specialized cells that transmit nerve impulses through the body.'}
          </div>
        );
      case 'specs':
        return (
          <div className="text-xs space-y-1 text-foreground/80 mt-1">
            <p>Width: {modelDimensions[currentModel].width}{modelDimensions[currentModel].unit}</p>
            <p>Height: {modelDimensions[currentModel].height}{modelDimensions[currentModel].unit}</p>
            <p>Depth: {modelDimensions[currentModel].depth}{modelDimensions[currentModel].unit}</p>
            {type === 'mechanical' ? (
              <p>Material: {currentModel === 'engine' ? 'Aluminum alloy' : 
                           currentModel === 'pump' ? 'Stainless steel' :
                           currentModel === 'cylinder' ? 'Cast iron' :
                           currentModel === 'transmission' ? 'Hardened steel' : 'Brass'}</p>
            ) : (
              <p>Region: {currentModel === 'brain' ? 'Cerebrum' : 
                         currentModel === 'cerebellum' ? 'Posterior brain' : 'Neural system'}</p>
            )}
          </div>
        );
      case 'details':
        return (
          <div className="text-xs text-foreground/80 mt-1">
            {type === 'mechanical' 
              ? currentModel === 'engine' 
                ? 'Features variable valve timing, direct injection, and turbocharged design for maximum power output.'
                : currentModel === 'pump'
                ? 'High-efficiency centrifugal pump with ceramic bearings and optimized flow chamber.'
                : currentModel === 'cylinder'
                ? 'Hardened cylinder with precision-honed walls and anti-friction coating.'
                : currentModel === 'transmission'
                ? 'Synchronized gearbox with helical cut gears for smooth power delivery and reduced noise.'
                : 'Quarter-turn ball valve with PTFE seals for corrosion resistance in harsh environments.'
              : currentModel === 'brain'
              ? 'The brain contains approximately 86 billion neurons and consumes 20% of the body\'s oxygen.'
              : currentModel === 'cerebellum'
              ? 'Contains more neurons than the rest of the brain combined despite being only 10% of brain volume.'
              : 'Neurons can transmit signals at speeds of up to 120 meters per second using electrical impulses.'}
          </div>
        );
      default:
        return null;
    }
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
          
          {/* Model Selector */}
          <div className="absolute top-4 right-4 bg-black bg-opacity-70 backdrop-blur-sm rounded-lg shadow-lg p-2 border border-pink-500/30">
            <div className="flex gap-2 flex-wrap">
              {(type === 'mechanical' ? mechanicalModels : brainModels).map((model) => (
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
          
          {/* Enhanced Information Panel */}
          <div className="absolute top-4 left-4 max-w-[250px]">
            <div className="info-panel border border-pink-500/30 bg-black bg-opacity-70">
              <h4 className="font-medium text-pink-400">
                {type === 'mechanical' 
                  ? currentModel.charAt(0).toUpperCase() + currentModel.slice(1)
                  : currentModel === 'brain' ? 'Brain Region' 
                  : currentModel === 'cerebellum' ? 'Cerebellum'
                  : 'Neuron Cell'
                }
              </h4>
              
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mt-2">
                <TabsList className="grid grid-cols-3 w-full bg-black/60 border border-pink-500/20 h-7">
                  <TabsTrigger value="overview" className="text-xs h-5 data-[state=active]:bg-pink-600 data-[state=active]:text-black">Overview</TabsTrigger>
                  <TabsTrigger value="specs" className="text-xs h-5 data-[state=active]:bg-pink-600 data-[state=active]:text-black">Specs</TabsTrigger>
                  <TabsTrigger value="details" className="text-xs h-5 data-[state=active]:bg-pink-600 data-[state=active]:text-black">Details</TabsTrigger>
                </TabsList>
              </Tabs>
              
              {renderTabContent()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ARModelViewer;
