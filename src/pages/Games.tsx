
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Gamepad, Trophy, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "@/components/ui/use-toast";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const digitalLiteracyQuiz = [
  {
    question: "Which of these is a strong password?",
    options: [
      "password123",
      "myname",
      "P@ssw0rd!2023",
      "12345678"
    ],
    correctAnswer: "P@ssw0rd!2023"
  },
  {
    question: "What should you do if you receive an email asking for your bank details?",
    options: [
      "Reply with the information requested",
      "Click on the links in the email",
      "Ignore it and delete it",
      "Forward it to friends to warn them"
    ],
    correctAnswer: "Ignore it and delete it"
  },
  {
    question: "What is two-factor authentication?",
    options: [
      "Using two different passwords",
      "Using an additional security step beyond password",
      "Logging in from two devices",
      "Changing your password twice a month"
    ],
    correctAnswer: "Using an additional security step beyond password"
  }
];

const financialLiteracyQuiz = [
  {
    question: "What is a budget?",
    options: [
      "A government tax",
      "A plan for spending and saving money",
      "A type of bank account",
      "A loan from a bank"
    ],
    correctAnswer: "A plan for spending and saving money"
  },
  {
    question: "What does UPI stand for?",
    options: [
      "Universal Payment Interface",
      "Unified Payments Interface",
      "United Payment Integration",
      "User Payment Identity"
    ],
    correctAnswer: "Unified Payments Interface"
  },
  {
    question: "Which of these is a good saving habit?",
    options: [
      "Spending all your income immediately",
      "Saving only when you have extra money",
      "Setting aside a portion of income before spending",
      "Borrowing money for non-essential purchases"
    ],
    correctAnswer: "Setting aside a portion of income before spending"
  }
];

const Games: React.FC = () => {
  const navigate = useNavigate();
  const [activeGame, setActiveGame] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const startQuiz = (quizType: string) => {
    setActiveGame(quizType);
    setCurrentQuestion(0);
    setScore(0);
    setQuizCompleted(false);
    setSelectedAnswer("");
  };

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
  };

  const handleNextQuestion = () => {
    // Check if answer is correct
    const currentQuiz = activeGame === "digital" ? digitalLiteracyQuiz : financialLiteracyQuiz;
    
    if (selectedAnswer === currentQuiz[currentQuestion].correctAnswer) {
      setScore(score + 1);
      toast({
        title: "Correct!",
        description: "Well done! That's the right answer.",
      });
    } else {
      toast({
        title: "Not quite right",
        description: `The correct answer was: ${currentQuiz[currentQuestion].correctAnswer}`,
        variant: "destructive",
      });
    }

    // Move to next question or end quiz
    if (currentQuestion < currentQuiz.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer("");
    } else {
      setQuizCompleted(true);
    }
  };

  const backToGames = () => {
    setActiveGame(null);
  };

  const renderQuiz = () => {
    const currentQuiz = activeGame === "digital" ? digitalLiteracyQuiz : financialLiteracyQuiz;
    
    if (quizCompleted) {
      const totalQuestions = currentQuiz.length;
      const percentage = Math.round((score / totalQuestions) * 100);
      
      return (
        <Card className="w-full">
          <CardHeader className="text-center">
            <CardTitle className="text-xl">Quiz Completed!</CardTitle>
            <CardDescription>
              You scored {score} out of {totalQuestions} ({percentage}%)
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <Trophy size={60} className={`mb-4 ${percentage >= 60 ? 'text-yellow-500' : 'text-muted-foreground'}`} />
            {percentage >= 80 && (
              <p className="text-center mb-4 font-medium text-green-600">Excellent work! You're a master!</p>
            )}
            {percentage >= 60 && percentage < 80 && (
              <p className="text-center mb-4 font-medium text-yellow-600">Good job! Keep learning!</p>
            )}
            {percentage < 60 && (
              <p className="text-center mb-4 font-medium text-blue-600">Keep practicing! You'll improve!</p>
            )}
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button onClick={backToGames} className="w-full">
              <ArrowLeft className="mr-2" size={16} />
              Back to Games
            </Button>
          </CardFooter>
        </Card>
      );
    }

    const question = currentQuiz[currentQuestion];
    
    return (
      <Card className="w-full">
        <CardHeader>
          <div className="flex justify-between items-center mb-2">
            <Button variant="ghost" size="icon" onClick={backToGames}>
              <ArrowLeft size={16} />
            </Button>
            <span className="text-sm text-muted-foreground">
              Question {currentQuestion + 1} of {currentQuiz.length}
            </span>
          </div>
          <CardTitle className="text-lg">{question.question}</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup value={selectedAnswer} onValueChange={handleAnswerSelect}>
            {question.options.map((option, index) => (
              <div className="flex items-center space-x-2 mb-3" key={index}>
                <RadioGroupItem value={option} id={`option-${index}`} />
                <label htmlFor={`option-${index}`} className="cursor-pointer w-full">
                  {option}
                </label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
        <CardFooter>
          <Button 
            onClick={handleNextQuestion} 
            className="w-full"
            disabled={!selectedAnswer}
          >
            {currentQuestion < currentQuiz.length - 1 ? "Next Question" : "Finish Quiz"}
          </Button>
        </CardFooter>
      </Card>
    );
  };

  const renderGameSelection = () => {
    return (
      <>
        <div className="grid grid-cols-1 gap-4">
          <Card className="transition-all duration-300 hover:shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Gamepad className="mr-2 text-primary" />
                Digital Literacy Quiz
              </CardTitle>
              <CardDescription>
                Test your knowledge about internet safety and digital skills
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                3 questions about online security, passwords, and email safety
              </p>
              <Button onClick={() => startQuiz("digital")} className="w-full">
                Start Quiz
              </Button>
            </CardContent>
          </Card>
          
          <Card className="transition-all duration-300 hover:shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Gamepad className="mr-2 text-primary" />
                Financial Literacy Quiz
              </CardTitle>
              <CardDescription>
                Test your knowledge about money management and digital payments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                3 questions about budgeting, UPI, and saving habits
              </p>
              <Button onClick={() => startQuiz("financial")} className="w-full">
                Start Quiz
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 text-center">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">Need Help?</Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">Customer Support</h4>
                  <p className="text-sm text-muted-foreground">
                    Call <a href="tel:9842887813" className="text-primary">9842887813</a> for assistance
                  </p>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </>
    );
  };

  return (
    <div className="container px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">
        Interactive Games & Quizzes
      </h1>
      
      {activeGame ? renderQuiz() : renderGameSelection()}
      
      <p className="text-center text-xs text-muted-foreground mt-8">
        Learning is fun with HerVoice! Powered by Slytherin
      </p>
    </div>
  );
};

export default Games;
