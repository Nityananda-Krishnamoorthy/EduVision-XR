
import { cn } from '@/lib/utils';

interface DashboardCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  fullHeight?: boolean;
}

const DashboardCard = ({ 
  title, 
  children, 
  className,
  fullHeight = false 
}: DashboardCardProps) => {
  return (
    <div 
      className={cn(
        "bg-card rounded-lg shadow-md p-4 card-hover-effect border border-ar-purple/20",
        fullHeight && "h-full",
        className
      )}
    >
      <h3 className="text-lg font-medium text-ar-purple mb-3 border-b border-ar-purple/30 pb-2">{title}</h3>
      <div className={cn(fullHeight && "h-[calc(100%-2.5rem)]")}>
        {children}
      </div>
    </div>
  );
};

export default DashboardCard;
