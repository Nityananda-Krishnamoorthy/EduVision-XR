
import { CheckCircle2 } from "lucide-react";

interface LearningObjectivesProps {
  type: 'mechanical' | 'brain';
}

const LearningObjectives = ({ type }: LearningObjectivesProps) => {
  const objectives = type === 'mechanical' 
    ? [
        'Understand the basic principles of combustion engines',
        'Visualize how mechanical components interact in 3D space',
        'Identify key engine parts and their functions',
        'Analyze mechanical stress points in dynamic systems',
        'Learn assembly and disassembly sequences'
      ]
    : [
        'Identify major brain structures and their functions',
        'Understand neuronal connections and pathways',
        'Visualize brain activity patterns during cognition',
        'Explore the relationship between brain regions',
        'Learn about neurosurgical approaches and considerations'
      ];

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-medium text-ar-blue">Learning Objectives</h3>
      <ul className="space-y-2">
        {objectives.map((objective, index) => (
          <li key={index} className="flex items-start">
            <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
            <span className="text-gray-700">{objective}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LearningObjectives;
