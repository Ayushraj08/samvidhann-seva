import { Card } from '@/components/ui/card';
import { Calendar } from 'lucide-react';

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
}

interface TimelineProps {
  title: string;
  events: TimelineEvent[];
}

const Timeline = ({ title, events }: TimelineProps) => {
  return (
    <Card className="my-6 p-6 border-gold/20">
      <div className="flex items-center gap-2 mb-6">
        <Calendar className="w-6 h-6 text-gold" />
        <h4 className="font-bold text-xl text-maroon">{title}</h4>
      </div>
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-maroon via-gold to-maroon" />
        
        <div className="space-y-8">
          {events.map((event, index) => (
            <div key={index} className="relative pl-20">
              {/* Timeline dot */}
              <div className="absolute left-6 top-2 w-5 h-5 rounded-full bg-gold border-4 border-background shadow-lg" />
              
              <div className="bg-muted/50 rounded-lg p-4 hover:bg-muted/70 transition-all hover:shadow-md">
                <div className="font-bold text-lg text-maroon mb-1">{event.year}</div>
                <div className="font-semibold text-foreground mb-2">{event.title}</div>
                <div className="text-sm text-muted-foreground">{event.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default Timeline;
