import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Gamepad2, CheckCircle2 } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import ReactMarkdown from 'react-markdown';
import VideoEmbed from './lesson/VideoEmbed';
import Timeline from './lesson/Timeline';
import CaseStudyCard from './lesson/CaseStudyCard';
import Infographic from './lesson/Infographic';

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
}

interface CaseStudy {
  title: string;
  year: string;
  background: string;
  decision: string;
  impact: string;
  keyTakeaway: string;
}

interface InfoItem {
  icon?: string;
  title: string;
  value: string;
  description?: string;
}

interface LessonSection {
  heading: string;
  content: string;
  example?: string;
  keyPoints?: string[];
  remember?: string;
  video?: {
    title: string;
    videoId: string;
    description?: string;
  };
  timeline?: {
    title: string;
    events: TimelineEvent[];
  };
  caseStudies?: CaseStudy[];
  infographic?: {
    title: string;
    items: InfoItem[];
    layout?: 'grid' | 'flow';
  };
}

interface QuizQuestion {
  question: string;
  options: string[];
  correct: number;
}

interface LessonContent {
  title: string;
  sections: LessonSection[];
  quiz?: QuizQuestion[];
}

interface LessonViewerProps {
  lessonId: string;
  lessonContent: LessonContent;
  level: string;
  onComplete: () => void;
  onBack: () => void;
}

const LessonViewer = ({ lessonId, lessonContent, level, onComplete, onBack }: LessonViewerProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [currentSection, setCurrentSection] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<number[]>([]);
  const [currentQuizQuestion, setCurrentQuizQuestion] = useState(0);
  const [showQuizResult, setShowQuizResult] = useState(false);

  const totalSections = lessonContent.sections.length;
  const progress = ((currentSection + 1) / totalSections) * 100;

  const handleNext = () => {
    if (currentSection < totalSections - 1) {
      setCurrentSection(currentSection + 1);
    } else if (lessonContent.quiz && lessonContent.quiz.length > 0) {
      setQuizStarted(true);
    } else {
      completeLesson();
    }
  };

  const handlePrevious = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  const handleQuizAnswer = (answerIndex: number) => {
    const newAnswers = [...quizAnswers, answerIndex];
    setQuizAnswers(newAnswers);

    if (lessonContent.quiz && currentQuizQuestion < lessonContent.quiz.length - 1) {
      setCurrentQuizQuestion(currentQuizQuestion + 1);
    } else {
      setShowQuizResult(true);
    }
  };

  const completeLesson = () => {
    onComplete();
    onBack();
  };

  const calculateQuizScore = () => {
    if (!lessonContent.quiz) return 0;
    let correct = 0;
    lessonContent.quiz.forEach((q, index) => {
      if (quizAnswers[index] === q.correct) correct++;
    });
    return correct;
  };

  if (quizStarted && lessonContent.quiz) {
    if (showQuizResult) {
      const score = calculateQuizScore();
      const total = lessonContent.quiz.length;
      const percentage = (score / total) * 100;

      return (
        <div className="min-h-screen py-12 bg-muted">
          <div className="container mx-auto px-4">
            <Card className="max-w-2xl mx-auto border-gold/20">
              <CardContent className="p-8 text-center">
                <CheckCircle2 className="w-20 h-20 text-gold mx-auto mb-6" />
                <h2 className="text-3xl font-bold mb-4 text-maroon">Quiz Complete!</h2>
                <div className="text-6xl font-bold text-gold mb-4">
                  {score} / {total}
                </div>
                <p className="text-xl text-muted-foreground mb-8">
                  You scored {percentage.toFixed(0)}%!
                </p>
                <div className="flex gap-4 justify-center">
                  <Button onClick={completeLesson} className="btn-hero">
                    Complete Lesson
                  </Button>
                  <Button onClick={() => navigate('/games')} variant="outline">
                    <Gamepad2 className="mr-2" size={18} />
                    Play Games
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      );
    }

    const question = lessonContent.quiz[currentQuizQuestion];

    return (
      <div className="min-h-screen py-12 bg-muted">
        <div className="container mx-auto px-4">
          <Card className="max-w-3xl mx-auto">
            <CardContent className="p-8">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-maroon">Check Your Understanding</span>
                  <span className="text-sm text-muted-foreground">
                    Question {currentQuizQuestion + 1} / {lessonContent.quiz.length}
                  </span>
                </div>
                <Progress value={((currentQuizQuestion + 1) / lessonContent.quiz.length) * 100} />
              </div>

              <h3 className="text-2xl font-bold mb-8 text-maroon">{question.question}</h3>

              <div className="space-y-4">
                {question.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuizAnswer(index)}
                    className="w-full p-4 text-left rounded-lg border-2 border-border hover:border-gold hover:bg-gold/10 transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-full bg-maroon text-white flex items-center justify-center font-bold">
                        {String.fromCharCode(65 + index)}
                      </span>
                      <span className="font-medium">{option}</span>
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const section = lessonContent.sections[currentSection];

  return (
    <div className="min-h-screen py-12 bg-muted">
      <div className="container mx-auto px-4">
        <Button onClick={onBack} variant="ghost" className="mb-6">
          <ArrowLeft className="mr-2" size={18} />
          {t('learn.backToTopics')}
        </Button>

        <div className="max-w-4xl mx-auto">
          <Card className="mb-6 border-gold/20">
            <CardContent className="p-6">
              <h1 className="text-3xl font-bold mb-4 text-maroon">{lessonContent.title}</h1>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Section {currentSection + 1} of {totalSections}
                </span>
                <Progress value={progress} className="w-48" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-maroon/20">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6 text-maroon">{section.heading}</h2>
              
              <div className="prose prose-lg max-w-none mb-6">
                <ReactMarkdown>{section.content}</ReactMarkdown>
              </div>

              {section.video && (
                <VideoEmbed
                  title={section.video.title}
                  videoId={section.video.videoId}
                  description={section.video.description}
                />
              )}

              {section.infographic && (
                <Infographic
                  title={section.infographic.title}
                  items={section.infographic.items}
                  layout={section.infographic.layout}
                />
              )}

              {section.timeline && (
                <Timeline
                  title={section.timeline.title}
                  events={section.timeline.events}
                />
              )}

              {section.example && (
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 rounded">
                  <p className="font-semibold text-blue-900 mb-2">💡 Example:</p>
                  <p className="text-blue-800">{section.example}</p>
                </div>
              )}

              {section.keyPoints && section.keyPoints.length > 0 && (
                <div className="bg-gold/10 border-l-4 border-gold p-4 mb-6 rounded">
                  <p className="font-semibold text-maroon mb-2">🔑 Key Points:</p>
                  <ul className="list-disc list-inside space-y-1">
                    {section.keyPoints.map((point, index) => (
                      <li key={index} className="text-foreground">{point}</li>
                    ))}
                  </ul>
                </div>
              )}

              {section.caseStudies && section.caseStudies.length > 0 && (
                <div className="space-y-4">
                  {section.caseStudies.map((caseStudy, index) => (
                    <CaseStudyCard key={index} caseStudy={caseStudy} />
                  ))}
                </div>
              )}

              {section.remember && (
                <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6 rounded">
                  <p className="font-semibold text-green-900 mb-2">⭐ Remember:</p>
                  <p className="text-green-800">{section.remember}</p>
                </div>
              )}

              <div className="flex justify-between items-center mt-8">
                <Button
                  onClick={handlePrevious}
                  disabled={currentSection === 0}
                  variant="outline"
                >
                  Previous
                </Button>

                <Button onClick={handleNext} className="btn-hero">
                  {currentSection < totalSections - 1 
                    ? 'Next Section' 
                    : lessonContent.quiz && lessonContent.quiz.length > 0
                    ? 'Take Quiz'
                    : 'Complete Lesson'}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6 border-gold/20">
            <CardContent className="p-6">
              <Button onClick={() => navigate('/games')} variant="outline" className="w-full">
                <Gamepad2 className="mr-2" size={18} />
                {t('learn.playGame')}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LessonViewer;
