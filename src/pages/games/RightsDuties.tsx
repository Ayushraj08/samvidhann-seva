import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Trophy, RotateCcw } from 'lucide-react';
import rightsDutiesData from '@/data/rightsDutiesData.json';
import Confetti from 'react-confetti';

const RightsDuties = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const items = [...rightsDutiesData].sort(() => Math.random() - 0.5);

  const handleDrop = (type: string) => {
    setSelected(type);
    const isCorrect = items[currentIndex].type === type;
    
    if (isCorrect) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (currentIndex < items.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setSelected(null);
      } else {
        setShowResult(true);
        const finalScore = score + (isCorrect ? 1 : 0);
        const percentage = (finalScore / items.length) * 100;
        if (percentage >= 70) {
          setShowConfetti(true);
          setTimeout(() => setShowConfetti(false), 5000);
        }
      }
    }, 1500);
  };

  const resetGame = () => {
    setCurrentIndex(0);
    setScore(0);
    setSelected(null);
    setShowResult(false);
  };

  if (showResult) {
    const percentage = (score / items.length) * 100;

    return (
      <div className="min-h-screen py-12 bg-muted">
        {showConfetti && <Confetti />}
        <div className="container mx-auto px-4">
          <Card className="max-w-2xl mx-auto border-gold/20">
            <CardContent className="p-8 text-center">
              <Trophy className="w-20 h-20 text-gold mx-auto mb-6" />
              <h2 className="text-3xl font-bold mb-4 text-maroon">{t('games.yourScore')}</h2>
              <div className="text-6xl font-bold text-gold mb-4">
                {score} / {items.length}
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

  const currentItem = items[currentIndex];
  const isCorrect = selected === currentItem.type;

  return (
    <div className="min-h-screen py-12 bg-muted">
      <div className="container mx-auto px-4">
        <Button onClick={() => navigate('/games')} variant="ghost" className="mb-6">
          <ArrowLeft className="mr-2" size={18} />
          Back to Games
        </Button>

        <div className="max-w-4xl mx-auto">
          <Card className="mb-6 border-gold/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-maroon">{t('games.rightsDuties')}</h1>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">
                    Question {currentIndex + 1} / {items.length}
                  </p>
                  <p className="font-semibold text-maroon">
                    {t('games.score')}: {score}
                  </p>
                </div>
              </div>
              <p className="text-muted-foreground mt-2">
                Drag each statement to the correct category
              </p>
            </CardContent>
          </Card>

          {/* Statement Card */}
          <Card className="mb-8 border-maroon/20">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <p className="text-2xl font-bold text-maroon leading-relaxed">
                  "{currentItem.statement}"
                </p>
                {selected && (
                  <p className="text-sm text-muted-foreground mt-4">
                    {currentItem.article}
                  </p>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <button
                  onClick={() => handleDrop('right')}
                  disabled={selected !== null}
                  className={`p-8 rounded-xl border-4 transition-all ${
                    selected === 'right'
                      ? isCorrect
                        ? 'bg-green-100 border-green-500'
                        : 'bg-red-100 border-red-500'
                      : 'bg-card border-gold hover:border-maroon hover:shadow-xl'
                  }`}
                >
                  <h3 className="text-2xl font-bold mb-2 text-maroon">
                    Fundamental Right
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Rights guaranteed by the Constitution
                  </p>
                </button>

                <button
                  onClick={() => handleDrop('duty')}
                  disabled={selected !== null}
                  className={`p-8 rounded-xl border-4 transition-all ${
                    selected === 'duty'
                      ? isCorrect
                        ? 'bg-green-100 border-green-500'
                        : 'bg-red-100 border-red-500'
                      : 'bg-card border-gold hover:border-maroon hover:shadow-xl'
                  }`}
                >
                  <h3 className="text-2xl font-bold mb-2 text-maroon">
                    Fundamental Duty
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Duties of every Indian citizen
                  </p>
                </button>
              </div>

              {selected && (
                <div className={`mt-6 p-4 rounded-lg text-center ${
                  isCorrect ? 'bg-green-100' : 'bg-red-100'
                }`}>
                  <p className="font-semibold">
                    {isCorrect ? '✓ ' + t('games.correct') : '✗ ' + t('games.incorrect')}
                  </p>
                  {!isCorrect && (
                    <p className="text-sm mt-2">
                      This is a {currentItem.type === 'right' ? 'Fundamental Right' : 'Fundamental Duty'}
                    </p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RightsDuties;
