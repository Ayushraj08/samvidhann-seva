import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Trophy, RotateCcw } from 'lucide-react';
import articleData from '@/data/articleMatchData.json';
import Confetti from 'react-confetti';

const ArticleMatch = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [selectedArticle, setSelectedArticle] = useState<string | null>(null);
  const [selectedDescription, setSelectedDescription] = useState<string | null>(null);
  const [matches, setMatches] = useState<Record<string, string>>({});
  const [attempts, setAttempts] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const articles = [...articleData].sort(() => Math.random() - 0.5);
  const descriptions = [...articleData].map(d => d.description).sort(() => Math.random() - 0.5);

  const handleArticleClick = (article: string) => {
    if (matches[article]) return;
    setSelectedArticle(article);
    if (selectedDescription) {
      checkMatch(article, selectedDescription);
    }
  };

  const handleDescriptionClick = (description: string) => {
    if (Object.values(matches).includes(description)) return;
    setSelectedDescription(description);
    if (selectedArticle) {
      checkMatch(selectedArticle, description);
    }
  };

  const checkMatch = (article: string, description: string) => {
    setAttempts(attempts + 1);
    const correctMatch = articleData.find(a => a.article === article);
    
    if (correctMatch && correctMatch.description === description) {
      setMatches({ ...matches, [article]: description });
      setSelectedArticle(null);
      setSelectedDescription(null);
      
      if (Object.keys(matches).length + 1 === articles.length) {
        setShowResult(true);
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 5000);
      }
    } else {
      setTimeout(() => {
        setSelectedArticle(null);
        setSelectedDescription(null);
      }, 800);
    }
  };

  const resetGame = () => {
    setMatches({});
    setAttempts(0);
    setShowResult(false);
    setSelectedArticle(null);
    setSelectedDescription(null);
  };

  if (showResult) {
    const accuracy = ((articles.length / attempts) * 100).toFixed(0);

    return (
      <div className="min-h-screen py-12 bg-muted">
        {showConfetti && <Confetti />}
        <div className="container mx-auto px-4">
          <Card className="max-w-2xl mx-auto border-gold/20">
            <CardContent className="p-8 text-center">
              <Trophy className="w-20 h-20 text-gold mx-auto mb-6" />
              <h2 className="text-3xl font-bold mb-4 text-maroon">Congratulations!</h2>
              <div className="text-6xl font-bold text-gold mb-4">
                {articles.length} / {articles.length}
              </div>
              <p className="text-xl text-muted-foreground mb-2">
                Completed in {attempts} attempts
              </p>
              <p className="text-lg text-muted-foreground mb-8">
                Accuracy: {accuracy}%
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

  return (
    <div className="min-h-screen py-12 bg-muted">
      <div className="container mx-auto px-4">
        <Button onClick={() => navigate('/games')} variant="ghost" className="mb-6">
          <ArrowLeft className="mr-2" size={18} />
          Back to Games
        </Button>

        <div className="max-w-6xl mx-auto">
          <Card className="mb-6 border-gold/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-maroon">{t('games.articleMatch')}</h1>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Attempts: {attempts}</p>
                  <p className="font-semibold text-maroon">Matched: {Object.keys(matches).length} / {articles.length}</p>
                </div>
              </div>
              <p className="text-muted-foreground mt-2">Click an article, then click its matching description</p>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Articles Column */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-maroon mb-4">Articles</h2>
              {articles.map((item) => (
                <button
                  key={item.article}
                  onClick={() => handleArticleClick(item.article)}
                  disabled={!!matches[item.article]}
                  className={`w-full p-4 text-left rounded-lg border-2 transition-all font-semibold ${
                    matches[item.article]
                      ? 'bg-green-100 border-green-500 text-green-800 cursor-not-allowed'
                      : selectedArticle === item.article
                      ? 'bg-gold border-gold text-maroon shadow-lg scale-105'
                      : 'bg-card border-border hover:border-maroon hover:shadow-md'
                  }`}
                >
                  {item.article}
                </button>
              ))}
            </div>

            {/* Descriptions Column */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-maroon mb-4">Descriptions</h2>
              {descriptions.map((description) => (
                <button
                  key={description}
                  onClick={() => handleDescriptionClick(description)}
                  disabled={Object.values(matches).includes(description)}
                  className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                    Object.values(matches).includes(description)
                      ? 'bg-green-100 border-green-500 text-green-800 cursor-not-allowed'
                      : selectedDescription === description
                      ? 'bg-gold border-gold text-maroon shadow-lg scale-105'
                      : 'bg-card border-border hover:border-maroon hover:shadow-md'
                  }`}
                >
                  {description}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleMatch;
