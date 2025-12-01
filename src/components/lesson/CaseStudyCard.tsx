import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Scale, ChevronDown, ChevronUp } from 'lucide-react';

interface CaseStudy {
  title: string;
  year: string;
  background: string;
  decision: string;
  impact: string;
  keyTakeaway: string;
}

interface CaseStudyCardProps {
  caseStudy: CaseStudy;
}

const CaseStudyCard = ({ caseStudy }: CaseStudyCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card className="my-6 border-2 border-gold/30 hover:border-gold/60 transition-all hover:shadow-lg">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="bg-gradient-to-br from-maroon to-maroon/80 p-3 rounded-lg">
            <Scale className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h4 className="font-bold text-xl text-maroon mb-1">{caseStudy.title}</h4>
                <p className="text-sm text-gold font-semibold">{caseStudy.year}</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsExpanded(!isExpanded)}
                className="hover:bg-gold/10"
              >
                {isExpanded ? (
                  <ChevronUp className="w-5 h-5" />
                ) : (
                  <ChevronDown className="w-5 h-5" />
                )}
              </Button>
            </div>

            <div className="mt-4">
              <div className="bg-blue-50 border-l-4 border-blue-500 p-3 rounded mb-3">
                <p className="text-sm font-semibold text-blue-900 mb-1">Background:</p>
                <p className="text-sm text-blue-800">{caseStudy.background}</p>
              </div>

              {isExpanded && (
                <div className="space-y-3 animate-fade-in">
                  <div className="bg-green-50 border-l-4 border-green-500 p-3 rounded">
                    <p className="text-sm font-semibold text-green-900 mb-1">Court Decision:</p>
                    <p className="text-sm text-green-800">{caseStudy.decision}</p>
                  </div>

                  <div className="bg-purple-50 border-l-4 border-purple-500 p-3 rounded">
                    <p className="text-sm font-semibold text-purple-900 mb-1">Impact:</p>
                    <p className="text-sm text-purple-800">{caseStudy.impact}</p>
                  </div>

                  <div className="bg-gold/10 border-l-4 border-gold p-3 rounded">
                    <p className="text-sm font-semibold text-maroon mb-1">⭐ Key Takeaway:</p>
                    <p className="text-sm text-foreground font-medium">{caseStudy.keyTakeaway}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CaseStudyCard;
