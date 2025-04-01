
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Download, CheckCircle } from "lucide-react";
import VoiceNavigation from "@/components/VoiceNavigation";
import { coursesData, Course } from "@/data/coursesData";
import { useUser } from "@/context/UserContext";
import { toast } from "@/components/ui/use-toast";

const CourseDetails = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const { user } = useUser();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Find the course based on courseId
    const foundCourse = coursesData.find(c => c.id === courseId);
    
    if (foundCourse) {
      setCourse(foundCourse);
    }
    setLoading(false);
  }, [courseId]);

  const handleDownload = () => {
    toast({
      title: "Course Downloaded",
      description: "This course is now available offline.",
    });
  };

  const handleEnrollment = () => {
    toast({
      title: "Enrollment Successful",
      description: "You are now enrolled in this course.",
    });
  };

  if (loading) {
    return (
      <div className="container px-4 py-6 flex items-center justify-center min-h-screen">
        <div className="animate-pulse">Loading course...</div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="container px-4 py-6">
        <div className="text-center">
          <h1 className="text-2xl font-semibold mb-4">Course Not Found</h1>
          <p className="text-muted-foreground mb-6">The course you're looking for doesn't exist.</p>
          <Button onClick={() => navigate("/courses")}>Browse All Courses</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container px-4 py-6">
      <VoiceNavigation />
      
      <div className="mb-6 flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft size={20} />
        </Button>
        <h1 className="text-2xl font-semibold">{course.title}</h1>
      </div>
      
      <div className="rounded-lg overflow-hidden mb-6 aspect-video">
        <img 
          src={course.image} 
          alt={course.title} 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="grid gap-6 grid-cols-1 md:grid-cols-3 mb-8">
        <div className="bg-muted/30 p-4 rounded-lg text-center">
          <p className="text-sm text-muted-foreground">Level</p>
          <p className="font-medium">{course.level}</p>
        </div>
        <div className="bg-muted/30 p-4 rounded-lg text-center">
          <p className="text-sm text-muted-foreground">Duration</p>
          <p className="font-medium">{course.duration}</p>
        </div>
        <div className="bg-muted/30 p-4 rounded-lg text-center">
          <p className="text-sm text-muted-foreground">Category</p>
          <p className="font-medium">{course.category}</p>
        </div>
      </div>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">About This Course</h2>
        <p className="text-muted-foreground">{course.description}</p>
      </div>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Course Content</h2>
        <Accordion type="single" collapsible className="mb-4">
          {course.modules.map((module, index) => (
            <AccordionItem key={module.id} value={module.id}>
              <AccordionTrigger className="hover:bg-muted/30 px-4 py-2">
                <div className="flex items-center gap-3 w-full">
                  <div className="bg-primary/20 h-8 w-8 rounded-full flex items-center justify-center">
                    <span className="font-medium">{index + 1}</span>
                  </div>
                  <div className="text-left">
                    <p className="font-medium">{module.title}</p>
                    <p className="text-xs text-muted-foreground">{module.description}</p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4">
                <div className="pl-11">
                  <p className="text-muted-foreground mb-4">{module.content}</p>
                  {module.videoUrl && (
                    <div className="flex items-center gap-2 mb-2 text-sm text-primary">
                      <CheckCircle size={16} />
                      <span>Video Tutorial Available</span>
                    </div>
                  )}
                  {module.quizzes && module.quizzes.length > 0 && (
                    <div className="flex items-center gap-2 text-sm text-primary">
                      <CheckCircle size={16} />
                      <span>Quiz Available</span>
                    </div>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Your Progress</h2>
        <Progress value={33} className="mb-2" />
        <p className="text-sm text-muted-foreground">33% complete</p>
      </div>
      
      <div className="flex flex-col gap-4 sm:flex-row">
        <Button className="flex-1" onClick={handleEnrollment}>
          Continue Learning
        </Button>
        <Button variant="outline" className="flex-1 gap-2" onClick={handleDownload}>
          <Download size={18} />
          Download for Offline
        </Button>
      </div>
    </div>
  );
};

export default CourseDetails;
