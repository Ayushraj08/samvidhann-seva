import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Trophy, RotateCcw } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import quizData from '@/data/quizQuestions.json';
import Confetti from 'react-confetti';

const Quiz = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const questions = quizData.slice(0, 10);

  const handleAnswer = (index: number) => {
    if (answered) return;
    
    setSelectedAnswer(index);
    setAnswered(true);

    if (index === questions[currentQuestion].correct) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setAnswered(false);
    } else {
      setShowResult(true);
      const percentage = ((score + (selectedAnswer === questions[currentQuestion].correct ? 1 : 0)) / questions.length) * 100;
      if (percentage >= 70) {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 5000);
      }
      
      // Save best score
      const bestScore = localStorage.getItem('quiz_best_score') || '0';
      const finalScore = score + (selectedAnswer === questions[currentQuestion].correct ? 1 : 0);
      if (finalScore > parseInt(bestScore)) {
        localStorage.setItem('quiz_best_score', finalScore.toString());
      }
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setAnswered(false);
  };

  const getBestScore = () => {
    return localStorage.getItem('quiz_best_score') || '0';
  };

  if (showResult) {
    const finalScore = score + (selectedAnswer === questions[currentQuestion].correct ? 1 : 0);
    const percentage = (finalScore / questions.length) * 100;

    return (
      <div className="min-h-screen py-12 bg-muted">
        {showConfetti && <Confetti />}
        <div className="container mx-auto px-4">
          <Card className="max-w-2xl mx-auto border-gold/20">
            <CardContent className="p-8 text-center">
              <Trophy className="w-20 h-20 text-gold mx-auto mb-6" />
              <h2 className="text-3xl font-bold mb-4 text-maroon">{t('games.yourScore')}</h2>
              <div className="text-6xl font-bold text-gold mb-4">
                {finalScore} / {questions.length}
              </div>
              <p className="text-xl text-muted-foreground mb-2">
                {percentage}% {t('games.correct')}
              </p>
              <p className="text-sm text-muted-foreground mb-8">
                {t('games.bestScore')}: {getBestScore()} / {questions.length}
              </p>
              <div className="flex gap-4 justify-center">
                <Button onClick={resetQuiz} className="btn-hero">
                  <RotateCcw className="mr-2" size={18} />
                  {t('games.playAgain')}
                </Button>
                <Button onClick={() => navigate('/games')} variant="outline">
                  <ArrowLeft className="mr-2" size={18} />
                  {t('games.tryAgain')}
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
          {/* Progress */}
          <Card className="mb-6 border-gold/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-maroon">
                  {t('games.score')}: {score}
                </span>
                <span className="text-sm text-muted-foreground">
                  Question {currentQuestion + 1} / {questions.length}
                </span>
              </div>
              <Progress value={((currentQuestion + 1) / questions.length) * 100} />
            </CardContent>
          </Card>

          {/* Question Card */}
          <Card className="border-maroon/20">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-8 text-maroon">{question.question}</h2>
              
              <div className="space-y-4 mb-8">
                {question.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(index)}
                    disabled={answered}
                    className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                      answered
                        ? index === question.correct
                          ? 'bg-green-100 border-green-500 text-green-800'
                          : index === selectedAnswer
                          ? 'bg-red-100 border-red-500 text-red-800'
                          : 'bg-muted border-border'
                        : selectedAnswer === index
                        ? 'bg-gold/20 border-gold'
                        : 'bg-card border-border hover:border-gold hover:bg-gold/10'
                    }`}
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

              {answered && (
                <div className={`p-4 rounded-lg mb-6 ${
                  selectedAnswer === question.correct ? 'bg-green-100' : 'bg-blue-100'
                }`}>
                  <p className="font-semibold mb-2">
                    {selectedAnswer === question.correct ? '✓ ' + t('games.correct') : 'ℹ️ Explanation'}
                  </p>
                  <p className="text-sm">{question.explanation}</p>
                </div>
              )}

              {answered && (
                <Button onClick={handleNext} className="btn-hero w-full">
                  {currentQuestion < questions.length - 1 ? t('games.nextQuestion') : t('games.submit')}
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
