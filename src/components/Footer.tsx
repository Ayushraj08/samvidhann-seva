import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Mail, Linkedin } from 'lucide-react';
import logo from '@/assets/logo.png';

const Footer = () => {
  const { t } = useTranslation();

  const quickLinks = [
    { to: '/', label: t('nav.home') },
    { to: '/learn', label: t('nav.learn') },
    { to: '/games', label: t('nav.games') },
    { to: '/resources', label: t('nav.resources') },
    { to: '/team', label: t('nav.team') },
    { to: '/contact', label: t('nav.contact') },
  ];

  return (
    <footer className="bg-hero text-hero-foreground mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and Mission */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src={logo} alt="Samvidhann Seva" className="h-12 w-12" />
              <span className="font-bold text-xl">Samvidhann Seva</span>
            </div>
            <p className="text-hero-foreground/80 text-sm leading-relaxed">
              {t('footer.mission')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">{t('footer.quickLinks')}</h3>
            <div className="flex flex-col gap-2">
              {quickLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-hero-foreground/80 hover:text-gold transition-colors text-sm"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-lg mb-4">{t('footer.email')}</h3>
            <a
              href="mailto:samvidhannseva@gmail.com"
              className="flex items-center gap-2 text-hero-foreground/80 hover:text-gold transition-colors text-sm mb-4"
            >
              <Mail size={16} />
              samvidhannseva@gmail.com
            </a>
            
            <h3 className="font-bold text-lg mb-4 mt-6">Connect</h3>
            <a
              href="https://www.linkedin.com/in/ayussh-raj"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-hero-foreground/80 hover:text-gold transition-colors text-sm"
            >
              <Linkedin size={16} />
              Ayush Raj on LinkedIn
            </a>
          </div>
        </div>

        <div className="border-t border-hero-foreground/20 mt-8 pt-6 text-center text-sm text-hero-foreground/60">
          <p>© {new Date().getFullYear()} Samvidhann Seva. Making constitutional education accessible to all.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
