import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Linkedin } from 'lucide-react';
import ayushImage from '@/assets/ayush-raj-real.png';

const Team = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleJoinTeam = () => {
    navigate('/contact?joinTeam=true');
  };

  return (
    <div className="min-h-screen py-12 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-maroon">
            {t('team.title')}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('team.subtitle')}
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Founder Card */}
          <Card className="border-gold/20 mb-12">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <img
                  src={ayushImage}
                  alt="Ayush Raj"
                  className="w-48 h-48 rounded-full object-cover shadow-xl border-4 border-gold mx-auto md:mx-0"
                />
                <div className="flex-1">
                  <div className="mb-2">
                    <span className="text-sm font-semibold text-gold uppercase tracking-wide">
                      {t('team.founder')}
                    </span>
                  </div>
                  <h2 className="text-3xl font-bold mb-4 text-maroon">Ayush Raj</h2>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {t('team.founderBio')}
                  </p>
                  <a
                    href="https://www.linkedin.com/in/ayussh-raj"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button className="btn-hero">
                      <Linkedin className="mr-2" size={18} />
                      {t('team.linkedin')}
                    </Button>
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Join Team CTA */}
          <Card className="gradient-maroon text-hero-foreground border-0">
            <CardContent className="p-12 text-center">
              <h2 className="text-3xl font-bold mb-4">{t('team.joinCTA')}</h2>
              <p className="text-lg text-hero-foreground/90 mb-6 max-w-2xl mx-auto">
                Join us in our mission to make the Constitution accessible and engaging for every Indian. 
                We're looking for passionate educators, developers, designers, and volunteers!
              </p>
              <Button 
                size="lg" 
                className="btn-gold text-lg"
                onClick={handleJoinTeam}
              >
                {t('team.joinButton')}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Team;
