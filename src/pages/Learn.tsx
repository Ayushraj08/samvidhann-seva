import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, Clock, CheckCircle2 } from 'lucide-react';
import LessonViewer from '@/components/LessonViewer';
import lessonData from '@/data/lessonContent.json';

const Learn = () => {
  const { t } = useTranslation();
  const [selectedLevel, setSelectedLevel] = useState('level1');
  const [selectedLesson, setSelectedLesson] = useState<string | null>(null);

  const topics = [
    {
      id: 'preamble',
      title: t('learn.topicPreamble'),
      description: t('learn.topicPreambleDesc'),
      time: 5,
    },
    {
      id: 'fundamental-rights',
      title: t('learn.topicFundamentalRights'),
      description: t('learn.topicFundamentalRightsDesc'),
      time: 8,
    },
    {
      id: 'fundamental-duties',
      title: t('learn.topicFundamentalDuties'),
      description: t('learn.topicFundamentalDutiesDesc'),
      time: 6,
    },
    {
      id: 'directive-principles',
      title: t('learn.topicDirectivePrinciples'),
      description: t('learn.topicDirectivePrinciplesDesc'),
      time: 7,
    },
    {
      id: 'parliament',
      title: t('learn.topicParliament'),
      description: t('learn.topicParliamentDesc'),
      time: 10,
    },
    {
      id: 'president',
      title: t('learn.topicPresident'),
      description: t('learn.topicPresidentDesc'),
      time: 8,
    },
    {
      id: 'judiciary',
      title: t('learn.topicJudiciary'),
      description: t('learn.topicJudiciaryDesc'),
      time: 9,
    },
    {
      id: 'elections',
      title: t('learn.topicElections'),
      description: t('learn.topicElectionsDesc'),
      time: 6,
    },
  ];

  const getCompletedTopics = () => {
    const completed = localStorage.getItem(`completed_${selectedLevel}`) || '[]';
    return JSON.parse(completed);
  };

  const markTopicComplete = (topicId: string) => {
    const completed = getCompletedTopics();
    if (!completed.includes(topicId)) {
      completed.push(topicId);
      localStorage.setItem(`completed_${selectedLevel}`, JSON.stringify(completed));
    }
  };

  const completedTopics = getCompletedTopics();

  if (selectedLesson) {
    const lessonContent = (lessonData as any)[selectedLesson]?.[selectedLevel];
    if (!lessonContent) {
      setSelectedLesson(null);
      return null;
    }
    return (
      <LessonViewer
        lessonId={selectedLesson}
        lessonContent={lessonContent}
        level={selectedLevel}
        onComplete={() => markTopicComplete(selectedLesson)}
        onBack={() => setSelectedLesson(null)}
      />
    );
  }

  return (
    <div className="min-h-screen py-12 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-maroon">
            {t('learn.title')}
          </h1>
          <p className="text-xl text-muted-foreground">
            {t('learn.selectLevel')}
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
            <div className="max-w-5xl mx-auto">
              {/* Progress Bar */}
              <Card className="mb-8 border-gold/20">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-maroon">{t('learn.progress')}</span>
                    <span className="text-sm text-muted-foreground">
                      {completedTopics.length} / {topics.length} {t('learn.completed')}
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-3">
                    <div
                      className="h-3 rounded-full gradient-gold transition-all duration-500"
                      style={{ width: `${(completedTopics.length / topics.length) * 100}%` }}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Topics Grid */}
              <div className="grid md:grid-cols-2 gap-6">
                {topics.map((topic) => {
                  const isCompleted = completedTopics.includes(topic.id);
                  return (
                    <Card key={topic.id} className="card-hover border-maroon/20 relative overflow-hidden">
                      {isCompleted && (
                        <div className="absolute top-4 right-4">
                          <CheckCircle2 className="w-6 h-6 text-green-600" />
                        </div>
                      )}
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <BookOpen className="w-10 h-10 text-maroon flex-shrink-0" />
                          <div className="flex-1">
                            <h3 className="text-xl font-bold mb-2 text-maroon">{topic.title}</h3>
                            <p className="text-sm text-muted-foreground mb-4">{topic.description}</p>
                            <div className="flex items-center justify-between">
                              <span className="flex items-center gap-1 text-sm text-muted-foreground">
                                <Clock size={16} />
                                {topic.time} {t('learn.minutesRead')}
                              </span>
                              <Button 
                                className="btn-hero"
                                onClick={() => setSelectedLesson(topic.id)}
                              >
                                {t('learn.openLesson')}
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Learn;
