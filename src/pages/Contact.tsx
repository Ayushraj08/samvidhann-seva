import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Mail, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const isJoinTeam = searchParams.get('joinTeam') === 'true';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    subject: isJoinTeam ? 'joinTeam' : '',
    message: '',
  });

  useEffect(() => {
    if (isJoinTeam) {
      setFormData((prev) => ({
        ...prev,
        subject: 'joinTeam',
        message: `Namaste Samvidhann Seva team,\n\nI am interested in joining the Samvidhann Seva team as a volunteer. Please let me know how I can contribute to simplifying and spreading awareness about the Constitution of India.\n\nRegards,\n[Your Name]`,
      }));
    }
  }, [isJoinTeam]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.role || !formData.subject || !formData.message) {
      toast({
        title: "Error",
        description: t('contact.error'),
        variant: "destructive",
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Error",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    console.log('Contact Form Submitted:', formData);

    toast({
      title: "Success!",
      description: t('contact.success'),
    });

    // Reset form
    setFormData({
      name: '',
      email: '',
      role: '',
      subject: '',
      message: '',
    });
  };

  return (
    <div className="min-h-screen py-12 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-maroon">
            {t('contact.title')}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {/* Email Display */}
          <Card className="mb-8 border-gold/20">
            <CardContent className="p-6 text-center">
              <Mail className="w-12 h-12 text-gold mx-auto mb-4" />
              <a
                href="mailto:samvidhannseva@gmail.com"
                className="text-xl font-semibold text-maroon hover:text-gold transition-colors"
              >
                samvidhannseva@gmail.com
              </a>
            </CardContent>
          </Card>

          {/* Contact Form */}
          <Card className="border-maroon/20">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name">{t('contact.name')} *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="email">{t('contact.email')} *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="role">{t('contact.youAre')} *</Label>
                  <Select value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value })}>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Select..." />
                    </SelectTrigger>
                    <SelectContent className="bg-background z-[100]">
                      <SelectItem value="student">{t('contact.student')}</SelectItem>
                      <SelectItem value="parent">{t('contact.parent')}</SelectItem>
                      <SelectItem value="teacher">{t('contact.teacher')}</SelectItem>
                      <SelectItem value="admin">{t('contact.admin')}</SelectItem>
                      <SelectItem value="professional">{t('contact.professional')}</SelectItem>
                      <SelectItem value="ngo">{t('contact.ngo')}</SelectItem>
                      <SelectItem value="other">{t('contact.other')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="subject">{t('contact.subject')} *</Label>
                  <Select value={formData.subject} onValueChange={(value) => setFormData({ ...formData, subject: value })}>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Select..." />
                    </SelectTrigger>
                    <SelectContent className="bg-background z-[100]">
                      <SelectItem value="general">{t('contact.generalQuestion')}</SelectItem>
                      <SelectItem value="feedback">{t('contact.feedback')}</SelectItem>
                      <SelectItem value="session">{t('contact.session')}</SelectItem>
                      <SelectItem value="collaborate">{t('contact.collaborate')}</SelectItem>
                      <SelectItem value="joinTeam">{t('contact.joinTeam')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="message">{t('contact.message')} *</Label>
                  <Textarea
                    id="message"
                    rows={6}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    className="mt-2"
                  />
                </div>

                <Button type="submit" size="lg" className="btn-hero w-full">
                  <Send className="mr-2" size={18} />
                  {t('contact.send')}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Contact;
