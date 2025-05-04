
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BrainCircuit, Cog } from 'lucide-react';

interface SubjectSelectorProps {
  activeSubject: 'mechanical' | 'brain';
  onSelectSubject: (subject: 'mechanical' | 'brain') => void;
}

const SubjectSelector: React.FC<SubjectSelectorProps> = ({ 
  activeSubject, 
  onSelectSubject 
}) => {
  return (
    <Tabs 
      defaultValue={activeSubject} 
      onValueChange={(value) => onSelectSubject(value as 'mechanical' | 'brain')}
      className="w-full"
    >
      <TabsList className="grid grid-cols-2 w-full bg-black border border-pink-500/20">
        <TabsTrigger value="mechanical" className="flex items-center justify-center gap-2 data-[state=active]:bg-pink-600 data-[state=active]:text-black">
          <Cog className="h-4 w-4" />
          <span>Mechanical Engineering</span>
        </TabsTrigger>
        <TabsTrigger value="brain" className="flex items-center justify-center gap-2 data-[state=active]:bg-pink-600 data-[state=active]:text-black">
          <BrainCircuit className="h-4 w-4" />
          <span>Brain Medical Science</span>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default SubjectSelector;
