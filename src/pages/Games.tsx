import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Brain, Zap, LinkIcon, Scale, MapPin, BookMarked } from 'lucide-react';
import { Link } from 'react-router-dom';

const Games = () => {
  const { t } = useTranslation();
  const [selectedLevel, setSelectedLevel] = useState('level1');

  const gamesConfig = {
    level1: [
      {
        id: 'quiz',
        icon: Brain,
        title: t('games.quiz'),
        description: 'Simple multiple choice questions about Constitution basics',
        difficulty: t('games.easy'),
        path: '/games/quiz',
        questionCount: '10 questions',
      },
      {
        id: 'true-false',
        icon: Zap,
        title: t('games.trueFalse'),
        description: 'Quick true/false statements to test your understanding',
        difficulty: t('games.easy'),
        path: '/games/true-false',
        questionCount: '15 questions',
      },
    ],
    level2: [
      {
        id: 'quiz',
        icon: Brain,
        title: t('games.quiz'),
        description: 'Detailed questions covering curriculum topics',
        difficulty: t('games.medium'),
        path: '/games/quiz',
        questionCount: '15 questions',
      },
      {
        id: 'true-false',
        icon: Zap,
        title: t('games.trueFalse'),
        description: 'Timed true/false challenge with explanations',
        difficulty: t('games.medium'),
        path: '/games/true-false',
        questionCount: '20 questions',
      },
      {
        id: 'article-match',
        icon: LinkIcon,
        title: t('games.articleMatch'),
        description: 'Match articles with their descriptions',
        difficulty: t('games.medium'),
        path: '/games/article-match',
        questionCount: '12 pairs',
      },
    ],
    level3: [
      {
        id: 'quiz',
        icon: Brain,
        title: t('games.quiz'),
        description: 'Competitive exam level MCQs with case-based questions',
        difficulty: t('games.hard'),
        path: '/games/quiz',
        questionCount: '25 questions',
      },
      {
        id: 'true-false',
        icon: Zap,
        title: t('games.trueFalse'),
        description: 'Advanced statements testing deep knowledge',
        difficulty: t('games.hard'),
        path: '/games/true-false',
        questionCount: '30 questions',
      },
      {
        id: 'article-match',
        icon: LinkIcon,
        title: t('games.articleMatch'),
        description: 'Complex article matching with amendments',
        difficulty: t('games.hard'),
        path: '/games/article-match',
        questionCount: '20 pairs',
      },
      {
        id: 'rights-duties',
        icon: Scale,
        title: t('games.rightsDuties'),
        description: 'Advanced rights and duties classification',
        difficulty: t('games.hard'),
        path: '/games/rights-duties',
        questionCount: '25 items',
      },
    ],
    level4: [
      {
        id: 'quiz',
        icon: Brain,
        title: t('games.quiz'),
        description: 'Practical scenarios from everyday life',
        difficulty: t('games.medium'),
        path: '/games/quiz',
        questionCount: '15 questions',
      },
      {
        id: 'true-false',
        icon: Zap,
        title: t('games.trueFalse'),
        description: 'Real-world constitutional facts',
        difficulty: t('games.medium'),
        path: '/games/true-false',
        questionCount: '20 questions',
      },
      {
        id: 'rights-duties',
        icon: Scale,
        title: t('games.rightsDuties'),
        description: 'Sort rights and duties from daily situations',
        difficulty: t('games.medium'),
        path: '/games/rights-duties',
        questionCount: '15 items',
      },
    ],
  };

  const games = gamesConfig[selectedLevel as keyof typeof gamesConfig];

  return (
    <div className="min-h-screen py-12 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-maroon">
            {t('games.title')}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('games.subtitle')}
          </p>
        </div>

        {/* Level Selector */}
        <Tabs value={selectedLevel} onValueChange={setSelectedLevel} className="mb-12">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full max-w-4xl mx-auto bg-card p-2 gap-2">
            <TabsTrigger 
              value="level1"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-maroon data-[state=active]:to-maroon/80 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:scale-105 transition-all duration-300 hover:scale-102 hover:bg-maroon/10"
            >
              {t('learn.level1')}
            </TabsTrigger>
            <TabsTrigger 
              value="level2"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-maroon data-[state=active]:to-maroon/80 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:scale-105 transition-all duration-300 hover:scale-102 hover:bg-maroon/10"
            >
              {t('learn.level2')}
            </TabsTrigger>
            <TabsTrigger 
              value="level3"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-maroon data-[state=active]:to-maroon/80 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:scale-105 transition-all duration-300 hover:scale-102 hover:bg-maroon/10"
            >
              {t('learn.level3')}
            </TabsTrigger>
            <TabsTrigger 
              value="level4"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-maroon data-[state=active]:to-maroon/80 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:scale-105 transition-all duration-300 hover:scale-102 hover:bg-maroon/10"
            >
              {t('learn.level4')}
            </TabsTrigger>
          </TabsList>

          <TabsContent value={selectedLevel} className="mt-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {games.map((game) => (
                <Card key={game.id} className="card-hover border-maroon/20">
                  <CardContent className="p-6">
                    <game.icon className="w-12 h-12 text-gold mb-4" />
                    <h3 className="text-2xl font-bold mb-3 text-maroon">{game.title}</h3>
                    <p className="text-muted-foreground mb-3 text-sm">{game.description}</p>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-xs px-2 py-1 rounded-full bg-gold/20 text-maroon font-medium">
                        {t('games.difficulty')}: {game.difficulty}
                      </span>
                      <span className="text-xs px-2 py-1 rounded-full bg-maroon/10 text-maroon">
                        {game.questionCount}
                      </span>
                    </div>
                    <Link to={game.path}>
                      <Button className="btn-hero w-full">
                        {t('games.play')}
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Games;
