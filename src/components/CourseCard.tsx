
import { Link } from "react-router-dom";

interface CourseCardProps {
  id: string;
  title: string;
  description: string;
  image: string;
  progress?: number;
  duration: string;
  level: string;
}

const CourseCard: React.FC<CourseCardProps> = ({
  id,
  title,
  description,
  image,
  progress = 0,
  duration,
  level,
}) => {
  return (
    <Link to={`/courses/${id}`} className="block">
      <div className="her-card group">
        <div className="relative h-40 overflow-hidden">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {progress > 0 && (
            <div className="absolute bottom-0 left-0 w-full h-1.5 bg-muted">
              <div 
                className="h-full bg-primary" 
                style={{ width: `${progress}%` }}
              />
            </div>
          )}
        </div>
        
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-1">{title}</h3>
          <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{description}</p>
          <div className="flex justify-between text-xs">
            <span className="bg-muted px-2 py-1 rounded">{duration}</span>
            <span className="bg-muted px-2 py-1 rounded">{level}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
