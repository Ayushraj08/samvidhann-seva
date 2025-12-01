import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { BookOpen, Languages, Gamepad2, GraduationCap, Users, Briefcase, School, Trophy } from 'lucide-react';
import heroIllustration from '@/assets/hero-illustration.png';

const Home = () => {
  const { t } = useTranslation();

  const whyCards = [
    {
      icon: BookOpen,
      title: t('home.whyCard1Title'),
      description: t('home.whyCard1Desc'),
    },
    {
      icon: GraduationCap,
      title: t('home.whyCard2Title'),
      description: t('home.whyCard2Desc'),
    },
    {
      icon: Gamepad2,
      title: t('home.whyCard3Title'),
      description: t('home.whyCard3Desc'),
    },
    {
      icon: Languages,
      title: t('home.whyCard4Title'),
      description: t('home.whyCard4Desc'),
    },
  ];

  const howSteps = [
    t('home.howStep1'),
    t('home.howStep2'),
    t('home.howStep3'),
    t('home.howStep4'),
  ];

  const whoCards = [
    {
      title: t('home.whoSchool'),
      description: t('home.whoSchoolDesc'),
      icon: School,
    },
    {
      title: t('home.whoHigh'),
      description: t('home.whoHighDesc'),
      icon: GraduationCap,
    },
    {
      title: t('home.whoExam'),
      description: t('home.whoExamDesc'),
      icon: Trophy,
    },
    {
      title: t('home.whoTeacher'),
      description: t('home.whoTeacherDesc'),
      icon: Users,
    },
    {
      title: t('home.whoCitizen'),
      description: t('home.whoCitizenDesc'),
      icon: Briefcase,
    },
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="gradient-maroon text-hero-foreground py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                {t('home.heroTitle')}
              </h1>
              <p className="text-lg md:text-xl text-hero-foreground/90 leading-relaxed">
                {t('home.heroSubtitle')}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/learn">
                  <Button size="lg" className="btn-gold text-lg">
                    {t('home.startLearning')}
                  </Button>
                </Link>
                <Link to="/games">
                  <Button size="lg" variant="outline" className="bg-transparent border-hero-foreground text-hero-foreground hover:bg-hero-foreground hover:text-hero text-lg">
                    {t('home.playGames')}
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex justify-center">
              <img 
                src={heroIllustration} 
                alt="Constitutional Learning" 
                className="rounded-2xl shadow-2xl w-full max-w-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-maroon">
            {t('home.whyTitle')}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {whyCards.map((card, index) => (
              <Card key={index} className="card-hover border-gold/20">
                <CardContent className="p-6">
                  <card.icon className="w-12 h-12 text-gold mb-4" />
                  <h3 className="text-xl font-bold mb-3 text-maroon">{card.title}</h3>
                  <p className="text-muted-foreground">{card.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-maroon">
            {t('home.howTitle')}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {howSteps.map((step, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-maroon to-gold flex items-center justify-center text-white font-bold text-2xl mb-4 shadow-lg">
                  {index + 1}
                </div>
                <p className="text-lg text-foreground">{step}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/learn">
              <Button size="lg" className="btn-hero">
                {t('home.startLearning')}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Who Is It For */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-maroon">
            {t('home.whoTitle')}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {whoCards.map((card, index) => (
              <Card key={index} className="card-hover border-maroon/20">
                <CardContent className="p-6">
                  <card.icon className="w-10 h-10 text-maroon mb-4" />
                  <h3 className="text-xl font-bold mb-3 text-maroon">{card.title}</h3>
                  <p className="text-muted-foreground">{card.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-maroon text-hero-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {t('home.ctaTitle')}
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/learn">
              <Button size="lg" className="btn-gold text-lg">
                {t('home.ctaLearn')}
              </Button>
            </Link>
            <Link to="/games">
              <Button size="lg" variant="outline" className="bg-transparent border-hero-foreground text-hero-foreground hover:bg-hero-foreground hover:text-hero text-lg">
                {t('home.ctaGames')}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
