
import { Layers, RotateCw, ZoomIn, Crosshair } from "lucide-react";

const ARFeatures = () => {
  const features = [
    {
      icon: <RotateCw className="h-5 w-5 text-ar-teal" />,
      title: "360° Rotation",
      description: "Rotate models freely to view from any angle"
    },
    {
      icon: <ZoomIn className="h-5 w-5 text-ar-teal" />,
      title: "Zoom & Pan",
      description: "Get closer to study specific details"
    },
    {
      icon: <Layers className="h-5 w-5 text-ar-teal" />,
      title: "Layer Toggle",
      description: "Show or hide different component layers"
    },
    {
      icon: <Crosshair className="h-5 w-5 text-ar-teal" />,
      title: "Interactive Points",
      description: "Click on highlighted areas for detailed information"
    }
  ];

  return (
    <div className="grid grid-cols-2 gap-4">
      {features.map((feature, index) => (
        <div key={index} className="p-3 bg-white bg-opacity-60 backdrop-blur-sm rounded-lg shadow-sm flex items-start space-x-3">
          <div className="rounded-full bg-ar-blue/10 p-2">
            {feature.icon}
          </div>
          <div>
            <h4 className="font-medium text-ar-blue">{feature.title}</h4>
            <p className="text-sm text-gray-600">{feature.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ARFeatures;
