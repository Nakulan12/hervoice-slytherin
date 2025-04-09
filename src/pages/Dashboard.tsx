
import { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";
import VoiceNavigation from "@/components/VoiceNavigation";
import CourseCard from "@/components/CourseCard";
import { coursesData } from "@/data/coursesData";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/lib/supabase";

const Dashboard = () => {
  const { user } = useUser();
  const [greeting, setGreeting] = useState("");
  const [recommended, setRecommended] = useState(coursesData.slice(0, 3));
  const [inProgressCourse, setInProgressCourse] = useState<{
    id: string;
    title: string;
    progress: number;
    module: number;
  } | null>(null);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good morning");
    else if (hour < 18) setGreeting("Good afternoon");
    else setGreeting("Good evening");
    
    // Simulate AI recommendations by randomly selecting courses
    const shuffled = [...coursesData].sort(() => 0.5 - Math.random());
    setRecommended(shuffled.slice(0, 3));
    
    // Fetch user's in-progress courses
    if (user) {
      fetchInProgressCourse();
    }
  }, [user]);

  const fetchInProgressCourse = async () => {
    if (!user) return;
    
    try {
      // Get the most recently updated course progress
      const { data, error } = await supabase
        .from("user_progress")
        .select(`
          progress,
          course_id,
          courses (
            title
          )
        `)
        .eq("user_id", user.id)
        .lt("progress", 100) // Not completed
        .order("enrolled_at", { ascending: false })
        .limit(1);
        
      if (error) throw error;
      
      if (data && data.length > 0) {
        // Find the course details from coursesData
        const courseId = data[0].course_id;
        const courseDetails = coursesData.find(c => c.id === courseId);
        
        if (courseDetails) {
          setInProgressCourse({
            id: courseId,
            title: data[0].courses?.title || courseDetails.title,
            progress: data[0].progress,
            module: Math.ceil((data[0].progress / 100) * 5) // Assuming 5 modules total
          });
        }
      } else {
        // If no course in progress, use a default
        setInProgressCourse({
          id: "digital-basics",
          title: "Digital Literacy Basics",
          progress: 35,
          module: 2
        });
      }
    } catch (error) {
      console.error("Error fetching in-progress course:", error);
      // Fall back to default
      setInProgressCourse({
        id: "digital-basics",
        title: "Digital Literacy Basics",
        progress: 35,
        module: 2
      });
    }
  };

  return (
    <div className="container px-4 py-6">
      <VoiceNavigation />
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-1">
          {greeting}, <span className="text-primary">{user?.name || "User"}</span>!
        </h1>
        <p className="text-muted-foreground">Ready to continue your learning journey?</p>
      </div>
      
      {/* Continue Learning Section */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Continue Learning</h2>
          <Link to="/courses" className="text-primary text-sm font-medium flex items-center gap-1 hover:underline">
            View all
            <ArrowRight size={16} />
          </Link>
        </div>
        
        {inProgressCourse && (
          <div className="relative rounded-lg p-4 border border-border bg-muted/30 mb-4">
            <div className="space-y-2">
              <h3 className="font-medium">{inProgressCourse.title}</h3>
              <div className="h-2 bg-muted rounded-full">
                <div 
                  className="h-full bg-primary rounded-full" 
                  style={{ width: `${inProgressCourse.progress}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>{inProgressCourse.progress}% complete</span>
                <span>Module {inProgressCourse.module} of 5</span>
              </div>
            </div>
            <Link to={`/courses/${inProgressCourse.id}`} className="absolute inset-0" aria-hidden="true"></Link>
          </div>
        )}
      </section>
      
      {/* AI Recommended Courses */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Recommended for You</h2>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {recommended.map(course => (
            <CourseCard
              key={course.id}
              id={course.id}
              title={course.title}
              description={course.description}
              image={course.image}
              duration={course.duration}
              level={course.level}
            />
          ))}
        </div>
      </section>
      
      {/* Quick Actions */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 gap-4">
          <Button variant="outline" className="h-20 flex flex-col gap-1" asChild>
            <Link to="/chatbot">
              <span className="text-lg">AI Assistant</span>
              <span className="text-xs text-muted-foreground">Get personalized help</span>
            </Link>
          </Button>
          <Button variant="outline" className="h-20 flex flex-col gap-1" asChild>
            <Link to="/courses">
              <span className="text-lg">Explore Courses</span>
              <span className="text-xs text-muted-foreground">Browse learning paths</span>
            </Link>
          </Button>
        </div>
      </section>
      
      {/* Achievement Badge */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Latest Achievement</h2>
        <div className="her-card p-4 flex items-center gap-4">
          <div className="rounded-full bg-primary/20 p-3">
            <div className="rounded-full bg-primary text-primary-foreground h-12 w-12 flex items-center justify-center text-lg font-bold">1</div>
          </div>
          <div>
            <h3 className="font-medium">First Step</h3>
            <p className="text-sm text-muted-foreground">Completed your first lesson</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
