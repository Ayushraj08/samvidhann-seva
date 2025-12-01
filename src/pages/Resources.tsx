import { useTranslation } from 'react-i18next';
import { Card, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { BookOpen, FileText, Download, ExternalLink, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Resources = () => {
  const { t } = useTranslation();

  const faqs = [
    {
      question: t('resources.faq1Q'),
      answer: t('resources.faq1A'),
    },
    {
      question: t('resources.faq2Q'),
      answer: t('resources.faq2A'),
    },
    {
      question: t('resources.faq3Q'),
      answer: t('resources.faq3A'),
    },
    {
      question: t('resources.faq4Q'),
      answer: t('resources.faq4A'),
    },
    {
      question: t('resources.faq5Q'),
      answer: t('resources.faq5A'),
    },
    {
      question: t('resources.faq6Q'),
      answer: t('resources.faq6A'),
    },
    {
      question: t('resources.faq7Q'),
      answer: t('resources.faq7A'),
    },
    {
      question: t('resources.faq8Q'),
      answer: t('resources.faq8A'),
    },
    {
      question: t('resources.faq9Q'),
      answer: t('resources.faq9A'),
    },
    {
      question: t('resources.faq10Q'),
      answer: t('resources.faq10A'),
    },
  ];

  const officialResources = [
    {
      title: t('resources.constitutionPDF'),
      description: t('resources.constitutionPDFDesc'),
      link: 'https://legislative.gov.in/constitution-of-india',
      icon: FileText,
    },
    {
      title: t('resources.parliamentWebsite'),
      description: t('resources.parliamentWebsiteDesc'),
      link: 'https://www.sansad.in/',
      icon: ExternalLink,
    },
    {
      title: t('resources.ecWebsite'),
      description: t('resources.ecWebsiteDesc'),
      link: 'https://eci.gov.in/',
      icon: ExternalLink,
    },
    {
      title: t('resources.scWebsite'),
      description: t('resources.scWebsiteDesc'),
      link: 'https://main.sci.gov.in/',
      icon: ExternalLink,
    },
  ];

  const educationalResources = [
    {
      title: t('resources.ncertBooks'),
      description: t('resources.ncertBooksDesc'),
      icon: BookOpen,
    },
    {
      title: t('resources.videoLectures'),
      description: t('resources.videoLecturesDesc'),
      icon: BookOpen,
    },
    {
      title: t('resources.practiceTests'),
      description: t('resources.practiceTestsDesc'),
      icon: BookOpen,
    },
  ];

  return (
    <div className="min-h-screen py-12 bg-muted">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-maroon">
            {t('resources.title')}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('resources.subtitle')}
          </p>
        </div>

        {/* Official Resources */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-maroon flex items-center gap-2">
            <FileText className="w-8 h-8" />
            {t('resources.officialResources')}
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {officialResources.map((resource, index) => (
              <Card key={index} className="card-hover border-maroon/20">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <resource.icon className="w-10 h-10 text-gold flex-shrink-0" />
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2 text-maroon">{resource.title}</h3>
                      <p className="text-muted-foreground mb-4">{resource.description}</p>
                      <a
                        href={resource.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block"
                      >
                        <Button className="btn-hero">
                          {t('resources.visitWebsite')}
                          <ExternalLink className="ml-2 w-4 h-4" />
                        </Button>
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Educational Resources */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-maroon flex items-center gap-2">
            <BookOpen className="w-8 h-8" />
            {t('resources.educationalResources')}
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {educationalResources.map((resource, index) => (
              <Card key={index} className="card-hover border-gold/20">
                <CardContent className="p-6">
                  <resource.icon className="w-12 h-12 text-maroon mb-4" />
                  <h3 className="text-xl font-bold mb-2 text-maroon">{resource.title}</h3>
                  <p className="text-muted-foreground">{resource.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* FAQs */}
        <section>
          <h2 className="text-3xl font-bold mb-6 text-maroon flex items-center gap-2">
            <HelpCircle className="w-8 h-8" />
            {t('resources.faqTitle')}
          </h2>
          <Card className="border-maroon/20">
            <CardContent className="p-6">
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left text-lg font-semibold text-maroon hover:text-gold">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </section>

        {/* Download Section */}
        <section className="mt-16">
          <Card className="gradient-gold border-gold/20">
            <CardContent className="p-8 text-center">
              <Download className="w-16 h-16 text-maroon mx-auto mb-4" />
              <h2 className="text-3xl font-bold mb-4 text-maroon">{t('resources.downloadTitle')}</h2>
              <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
                {t('resources.downloadDesc')}
              </p>
              <a
                href="https://legislative.gov.in/constitution-of-india"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="lg" className="btn-hero">
                  <Download className="mr-2" />
                  {t('resources.downloadButton')}
                </Button>
              </a>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default Resources;
