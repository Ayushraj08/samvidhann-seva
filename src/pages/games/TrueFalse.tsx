import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Trophy, RotateCcw, Timer } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import trueFalseData from '@/data/trueFalseQuestions.json';
import Confetti from 'react-confetti';

const TrueFalse = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameActive, setGameActive] = useState(true);
  const [selectedAnswer, setSelectedAnswer] = useState<boolean | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);

  const questions = trueFalseData.slice(0, 15);

  useEffect(() => {
    if (gameActive && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      endGame();
    }
  }, [timeLeft, gameActive]);

  const handleAnswer = (answer: boolean) => {
    if (!gameActive) return;

    setSelectedAnswer(answer);
    
    if (answer === questions[currentQuestion].answer) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
      } else {
        endGame();
      }
    }, 1000);
  };

  const endGame = () => {
    setGameActive(false);
    const percentage = (score / questions.length) * 100;
    if (percentage >= 70) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000);
    }
  };

  const resetGame = () => {
    setCurrentQuestion(0);
    setScore(0);
    setTimeLeft(60);
    setGameActive(true);
    setSelectedAnswer(null);
  };

  if (!gameActive) {
    const percentage = (score / currentQuestion) * 100;

    return (
      <div className="min-h-screen py-12 bg-muted">
        {showConfetti && <Confetti />}
        <div className="container mx-auto px-4">
          <Card className="max-w-2xl mx-auto border-gold/20">
            <CardContent className="p-8 text-center">
              <Trophy className="w-20 h-20 text-gold mx-auto mb-6" />
              <h2 className="text-3xl font-bold mb-4 text-maroon">{t('games.yourScore')}</h2>
              <div className="text-6xl font-bold text-gold mb-4">
                {score} / {currentQuestion}
              </div>
              <p className="text-xl text-muted-foreground mb-8">
                {percentage.toFixed(0)}% {t('games.correct')}
              </p>
              <div className="flex gap-4 justify-center">
                <Button onClick={resetGame} className="btn-hero">
                  <RotateCcw className="mr-2" size={18} />
                  {t('games.playAgain')}
                </Button>
                <Button onClick={() => navigate('/games')} variant="outline">
                  <ArrowLeft className="mr-2" size={18} />
                  Back to Games
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];

  return (
    <div className="min-h-screen py-12 bg-muted">
      <div className="container mx-auto px-4">
        <Button onClick={() => navigate('/games')} variant="ghost" className="mb-6">
          <ArrowLeft className="mr-2" size={18} />
          Back to Games
        </Button>

        <div className="max-w-3xl mx-auto">
          {/* Timer and Score */}
          <Card className="mb-6 border-gold/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Timer className="text-maroon" />
                  <span className="font-bold text-2xl text-maroon">{timeLeft}s</span>
                </div>
                <span className="font-semibold text-maroon">
                  {t('games.score')}: {score}
                </span>
              </div>
              <Progress value={((currentQuestion + 1) / questions.length) * 100} />
              <p className="text-sm text-muted-foreground mt-2 text-center">
                Question {currentQuestion + 1} / {questions.length}
              </p>
            </CardContent>
          </Card>

          {/* Question Card */}
          <Card className="border-maroon/20">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-12 text-maroon text-center leading-relaxed">
                {question.statement}
              </h2>
              
              <div className="grid grid-cols-2 gap-6">
                <Button
                  onClick={() => handleAnswer(true)}
                  size="lg"
                  className={`h-24 text-xl font-bold ${
                    selectedAnswer === true
                      ? question.answer === true
                        ? 'bg-green-600 hover:bg-green-700'
                        : 'bg-red-600 hover:bg-red-700'
                      : 'btn-hero'
                  }`}
                  disabled={selectedAnswer !== null}
                >
                  ✓ TRUE
                </Button>
                <Button
                  onClick={() => handleAnswer(false)}
                  size="lg"
                  className={`h-24 text-xl font-bold ${
                    selectedAnswer === false
                      ? question.answer === false
                        ? 'bg-green-600 hover:bg-green-700'
                        : 'bg-red-600 hover:bg-red-700'
                      : 'btn-hero'
                  }`}
                  disabled={selectedAnswer !== null}
                >
                  ✗ FALSE
                </Button>
              </div>

              {selectedAnswer !== null && (
                <div className={`mt-6 p-4 rounded-lg ${
                  selectedAnswer === question.answer ? 'bg-green-100' : 'bg-blue-100'
                }`}>
                  <p className="text-sm">{question.explanation}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TrueFalse;
