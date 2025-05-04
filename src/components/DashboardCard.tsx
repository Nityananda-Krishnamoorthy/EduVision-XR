
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
        "bg-white rounded-lg shadow-md p-4 card-hover-effect",
        fullHeight && "h-full",
        className
      )}
    >
      <h3 className="text-lg font-medium text-ar-blue mb-3 border-b pb-2">{title}</h3>
      <div className={cn(fullHeight && "h-[calc(100%-2.5rem)]")}>
        {children}
      </div>
    </div>
  );
};

export default DashboardCard;
