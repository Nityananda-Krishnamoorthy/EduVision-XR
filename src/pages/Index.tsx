
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import DashboardCard from '@/components/DashboardCard';
import SubjectSelector from '@/components/SubjectSelector';
import ARModelViewer from '@/components/ARModelViewer';
import LearningObjectives from '@/components/LearningObjectives';
import ARFeatures from '@/components/ARFeatures';
import Stats from '@/components/Stats';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { ArrowUpRight, BookOpen } from 'lucide-react';

const Index = () => {
  const [activeSubject, setActiveSubject] = useState<'mechanical' | 'brain'>('mechanical');
  const { toast } = useToast();

  const handleSelectSubject = (subject: 'mechanical' | 'brain') => {
    setActiveSubject(subject);
    toast({
      title: subject === 'mechanical' ? 'Mechanical Engineering' : 'Brain Medical Science',
      description: `Loading ${subject === 'mechanical' ? 'mechanical engineering' : 'brain science'} AR models and data.`,
      duration: 2000,
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-grow px-4 py-6 md:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-ar-purple mb-2">Augmented Reality in Education</h1>
          <p className="text-foreground/80 max-w-3xl">
            Explore interactive 3D models for Mechanical Engineering and Brain Medical Science. 
            Enhance learning through immersive visualization and hands-on virtual experiences.
          </p>
          
          <div className="mt-6">
            <SubjectSelector activeSubject={activeSubject} onSelectSubject={handleSelectSubject} />
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main AR Viewer */}
          <div className="lg:col-span-2">
            <DashboardCard 
              title={activeSubject === 'mechanical' ? "Mechanical Engineering AR Model" : "Brain Medical Science AR Model"} 
              fullHeight
            >
              <ARModelViewer type={activeSubject} className="h-full" />
            </DashboardCard>
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            <DashboardCard title="Learning Objectives">
              <LearningObjectives type={activeSubject} />
            </DashboardCard>
            
            <DashboardCard title="AR Features">
              <ARFeatures />
            </DashboardCard>
          </div>
          
          {/* Stats Section */}
          <div className="lg:col-span-2 h-64">
            <DashboardCard title="Learning Analytics" fullHeight>
              <Stats type={activeSubject} />
            </DashboardCard>
          </div>
          
          {/* Resources Section */}
          <div>
            <DashboardCard title="Educational Resources">
              <div className="space-y-3">
                <p className="text-sm text-foreground/80">
                  Access supplementary materials to enhance your AR learning experience.
                </p>
                
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-between border-ar-purple/30 hover:bg-ar-purple/20 text-foreground" onClick={() => window.open('#', '_blank')}>
                    <div className="flex items-center">
                      <BookOpen className="h-4 w-4 mr-2 text-ar-purple" />
                      <span>{activeSubject === 'mechanical' ? 'Engine Design Manual' : 'Neuroanatomy Guide'}</span>
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-ar-purple" />
                  </Button>
                  
                  <Button variant="outline" className="w-full justify-between border-ar-purple/30 hover:bg-ar-purple/20 text-foreground" onClick={() => window.open('#', '_blank')}>
                    <div className="flex items-center">
                      <BookOpen className="h-4 w-4 mr-2 text-ar-purple" />
                      <span>{activeSubject === 'mechanical' ? 'Video Tutorials' : 'Brain Mapping Resources'}</span>
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-ar-purple" />
                  </Button>
                </div>
              </div>
            </DashboardCard>
          </div>
        </div>
      </main>
      
      <footer className="bg-ar-black text-ar-light-purple py-4 border-t border-ar-purple/20">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm">
          <p>© 2025 EduVision XR - Augmented Reality for Educational Excellence | Developed by Nityananda</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
