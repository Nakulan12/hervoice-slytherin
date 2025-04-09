import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Download, CheckCircle, Clock, BookOpen, Users, Award, Video } from "lucide-react";
import VoiceNavigation from "@/components/VoiceNavigation";
import { coursesData, Course } from "@/data/coursesData";
import { useUser } from "@/context/UserContext";
import { toast } from "@/components/ui/use-toast";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const CourseDetails = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const { user, updateCourseProgress, getUserProgressForCourse } = useUser();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [selectedModuleId, setSelectedModuleId] = useState<string | null>(null);
  const [currentProgress, setCurrentProgress] = useState(0);
  
  useEffect(() => {
    // Simulate database fetch with delay
    const fetchCourse = async () => {
      setLoading(true);
      try {
        // Simulate network delay for realism
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const foundCourse = coursesData.find(c => c.id === courseId);
        
        if (foundCourse) {
          setCourse(foundCourse);
          
          // Check if user is enrolled in this course by fetching progress
          if (user) {
            // Get current progress
            const checkProgress = async () => {
              const progress = await getUserProgressForCourse(courseId as string);
              if (progress > 0) {
                setIsEnrolled(true);
              }
              setCurrentProgress(progress);
            };
            
            checkProgress();
            
            // Set the first module as selected by default
            if (foundCourse.modules.length > 0) {
              setSelectedModuleId(foundCourse.modules[0].id);
            }
          }
        }
      } catch (error) {
        console.error("Error fetching course:", error);
        toast({
          title: "Error",
          description: "Failed to load course details. Please try again.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchCourse();
  }, [courseId, user, getUserProgressForCourse]);

  const handleDownload = () => {
    toast({
      title: "Course Downloaded",
      description: "This course is now available offline.",
    });
  };

  const handleModuleSelect = (moduleId: string) => {
    setSelectedModuleId(moduleId);
    
    // Update progress when user engages with module content
    if (isEnrolled && user) {
      // Calculate progress based on modules engaged
      const totalModules = course?.modules.length || 1;
      const moduleIndex = course?.modules.findIndex(m => m.id === moduleId) || 0;
      const newProgress = Math.min(Math.round(((moduleIndex + 1) / totalModules) * 100), 100);
      
      updateCourseProgress(courseId as string, newProgress);
      setCurrentProgress(newProgress);
    }
  };

  const handleEnrollment = () => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login to enroll in this course.",
        variant: "destructive"
      });
      return;
    }
    
    // Initialize progress for this course at 0%
    updateCourseProgress(courseId as string, 0);
    setCurrentProgress(0);
    setIsEnrolled(true);
    
    // Set first module as selected after enrollment
    if (course?.modules.length) {
      setSelectedModuleId(course.modules[0].id);
    }
    
    toast({
      title: "Enrollment Successful",
      description: "You've successfully enrolled in this course!",
    });
  };

  const handleSubmitQuiz = () => {
    if (!selectedModuleId || !course) return;
    
    // Get current module index
    const moduleIndex = course.modules.findIndex(m => m.id === selectedModuleId);
    if (moduleIndex === -1) return;
    
    // Calculate new progress (advance to next module)
    const totalModules = course.modules.length;
    const nextModuleIndex = Math.min(moduleIndex + 1, totalModules - 1);
    const newProgress = Math.round(((nextModuleIndex + 1) / totalModules) * 100);
    
    // Update progress
    updateCourseProgress(courseId as string, newProgress);
    setCurrentProgress(newProgress);
    
    // Move to next module if available
    if (nextModuleIndex > moduleIndex) {
      setSelectedModuleId(course.modules[nextModuleIndex].id);
    }
    
    toast({
      title: "Quiz Completed",
      description: "Great job! Your progress has been updated.",
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

  // Selected module
  const selectedModule = course.modules.find(m => m.id === selectedModuleId);

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
        <div className="bg-muted/30 p-4 rounded-lg flex items-center gap-3">
          <BookOpen className="text-primary" size={24} />
          <div>
            <p className="text-sm text-muted-foreground">Level</p>
            <p className="font-medium">{course.level}</p>
          </div>
        </div>
        <div className="bg-muted/30 p-4 rounded-lg flex items-center gap-3">
          <Clock className="text-primary" size={24} />
          <div>
            <p className="text-sm text-muted-foreground">Duration</p>
            <p className="font-medium">{course.duration}</p>
          </div>
        </div>
        <div className="bg-muted/30 p-4 rounded-lg flex items-center gap-3">
          <Users className="text-primary" size={24} />
          <div>
            <p className="text-sm text-muted-foreground">Category</p>
            <p className="font-medium">{course.category}</p>
          </div>
        </div>
      </div>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">About This Course</h2>
        <p className="text-muted-foreground">{course.description}</p>
        
        <div className="mt-4 grid gap-3 grid-cols-1 md:grid-cols-2">
          <div className="flex items-center gap-2 text-sm">
            <CheckCircle size={16} className="text-green-500" />
            <span>Self-paced learning</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <CheckCircle size={16} className="text-green-500" />
            <span>Interactive quizzes</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <CheckCircle size={16} className="text-green-500" />
            <span>Video tutorials</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <CheckCircle size={16} className="text-green-500" />
            <span>Certificate of completion</span>
          </div>
        </div>
      </div>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Learning Outcomes</h2>
        <ul className="space-y-2">
          <li className="flex items-start gap-2">
            <Award size={18} className="text-primary mt-0.5" />
            <span>Understand key concepts in {course.category}</span>
          </li>
          <li className="flex items-start gap-2">
            <Award size={18} className="text-primary mt-0.5" />
            <span>Develop practical skills for everyday technology use</span>
          </li>
          <li className="flex items-start gap-2">
            <Award size={18} className="text-primary mt-0.5" />
            <span>Build confidence in using digital tools</span>
          </li>
          <li className="flex items-start gap-2">
            <Award size={18} className="text-primary mt-0.5" />
            <span>Apply learned techniques to real-world scenarios</span>
          </li>
        </ul>
      </div>
      
      <div className="mb-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <h2 className="text-xl font-semibold mb-4">Course Content</h2>
          <Accordion 
            type="single" 
            collapsible 
            className="mb-4"
            value={selectedModuleId || undefined}
            onValueChange={(value) => value && handleModuleSelect(value)}
          >
            {course.modules.map((module, index) => (
              <AccordionItem key={module.id} value={module.id}>
                <AccordionTrigger className="hover:bg-muted/30 px-4 py-2">
                  <div className="flex items-center gap-3 w-full">
                    <div className={`h-8 w-8 rounded-full flex items-center justify-center ${isEnrolled && currentProgress >= ((index + 1) / course.modules.length * 100) ? 'bg-primary text-primary-foreground' : 'bg-primary/20'}`}>
                      <span className="font-medium">{index + 1}</span>
                    </div>
                    <div className="text-left">
                      <p className="font-medium">{module.title}</p>
                      <p className="text-xs text-muted-foreground">{module.description}</p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="pl-11 text-muted-foreground text-sm">
                    {module.videoUrl && (
                      <div className="flex items-center gap-2 mb-2 text-sm text-primary">
                        <Video size={16} />
                        <span>Video Tutorial Available</span>
                      </div>
                    )}
                    {module.quizzes && module.quizzes.length > 0 && (
                      <div className="flex items-center gap-2 mb-4 text-sm text-primary">
                        <CheckCircle size={16} />
                        <span>{module.quizzes.length} Quiz{module.quizzes.length > 1 ? "zes" : ""} Available</span>
                      </div>
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        
        <div className="lg:col-span-2">
          {selectedModule && isEnrolled ? (
            <div className="bg-muted/30 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">{selectedModule.title}</h3>
              <p className="mb-6">{selectedModule.content}</p>
              
              {selectedModule.videoUrl && (
                <div className="mb-6">
                  <h4 className="font-medium mb-2">Video Tutorial</h4>
                  <div className="aspect-video bg-black/10 rounded-lg flex items-center justify-center">
                    <Video className="text-muted-foreground" size={48} />
                    <span className="sr-only">Video player placeholder</span>
                  </div>
                </div>
              )}
              
              {selectedModule.quizzes && selectedModule.quizzes.length > 0 && (
                <div>
                  <h4 className="font-medium mb-4">Knowledge Check</h4>
                  {selectedModule.quizzes.map((quiz, index) => (
                    <div key={index} className="mb-6 p-4 bg-card shadow-sm rounded-md">
                      <p className="font-medium mb-2">Question {index + 1}: {quiz.question}</p>
                      <div className="space-y-2">
                        {quiz.options.map((option, optionIndex) => (
                          <div key={optionIndex} className="flex items-center gap-2 p-2 hover:bg-accent rounded-md cursor-pointer">
                            <div className="h-5 w-5 rounded-full border border-primary flex-shrink-0"></div>
                            <span>{option}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                  <Button className="w-full" onClick={handleSubmitQuiz}>Submit Answers</Button>
                </div>
              )}
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center p-8 bg-muted/30 rounded-lg">
              <h3 className="text-xl font-medium mb-4 text-center">{isEnrolled ? "Select a module to begin" : "Enroll to access course content"}</h3>
              <p className="text-muted-foreground text-center mb-6">
                {isEnrolled 
                  ? "Click on a module from the left sidebar to view its content" 
                  : "This course has comprehensive materials to help you learn at your own pace"}
              </p>
              {!isEnrolled && (
                <Button onClick={handleEnrollment}>Enroll Now</Button>
              )}
            </div>
          )}
        </div>
      </div>
      
      {isEnrolled && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-semibold">Your Progress</h2>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="sm">Get Certificate</Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="space-y-2">
                  <h4 className="font-medium">Course Certificate</h4>
                  <p className="text-sm text-muted-foreground">Complete 100% of the course to receive your certificate.</p>
                  <Progress value={currentProgress} className="mb-1" />
                  <p className="text-xs text-muted-foreground">{currentProgress}% complete</p>
                </div>
              </PopoverContent>
            </Popover>
          </div>
          <Progress value={currentProgress} className="mb-2" />
          <p className="text-sm text-muted-foreground">{currentProgress}% complete - {currentProgress < 100 ? `${100 - currentProgress}% remaining` : "Course completed"}</p>
        </div>
      )}
      
      <div className="flex flex-col gap-4 sm:flex-row">
        {!isEnrolled ? (
          <Button className="flex-1" onClick={handleEnrollment}>
            Enroll Now
          </Button>
        ) : (
          <Button className="flex-1" onClick={() => selectedModule ? null : setSelectedModuleId(course.modules[0]?.id)}>
            Continue Learning
          </Button>
        )}
        <Button variant="outline" className="flex-1 gap-2" onClick={handleDownload}>
          <Download size={18} />
          Download for Offline
        </Button>
      </div>
    </div>
  );
};

export default CourseDetails;
