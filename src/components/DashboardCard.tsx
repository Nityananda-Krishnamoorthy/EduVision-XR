
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { Minus, Plus } from 'lucide-react';
import { Button } from './ui/button';

interface DashboardCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  fullHeight?: boolean;
  collapsible?: boolean;
  headerAction?: React.ReactNode;
}

const DashboardCard = ({ 
  title, 
  children, 
  className,
  fullHeight = false,
  collapsible = false,
  headerAction
}: DashboardCardProps) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div 
      className={cn(
        "bg-card rounded-lg shadow-md p-4 card-hover-effect border border-pink-500/20",
        fullHeight && "h-full",
        className
      )}
    >
      <div className="flex justify-between items-center mb-3 border-b border-pink-500/30 pb-2">
        <h3 className="text-lg font-medium text-pink-500">{title}</h3>
        <div className="flex items-center gap-2">
          {headerAction}
          {collapsible && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setCollapsed(!collapsed)}
              className="h-6 w-6 p-0 hover:bg-pink-500/20 text-pink-400"
            >
              {collapsed ? <Plus className="h-4 w-4" /> : <Minus className="h-4 w-4" />}
            </Button>
          )}
        </div>
      </div>
      <div 
        className={cn(
          fullHeight && "h-[calc(100%-2.5rem)]",
          collapsed && "hidden"
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default DashboardCard;
