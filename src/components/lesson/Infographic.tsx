import { Card } from '@/components/ui/card';
import { Info } from 'lucide-react';

interface InfoItem {
  icon?: string;
  title: string;
  value: string;
  description?: string;
}

interface InfographicProps {
  title: string;
  items: InfoItem[];
  layout?: 'grid' | 'flow';
}

const Infographic = ({ title, items, layout = 'grid' }: InfographicProps) => {
  return (
    <Card className="my-6 p-6 border-gold/20 bg-gradient-to-br from-muted/30 to-muted/10">
      <div className="flex items-center gap-2 mb-6">
        <Info className="w-6 h-6 text-gold" />
        <h4 className="font-bold text-xl text-maroon">{title}</h4>
      </div>
      
      <div className={layout === 'grid' ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-4' : 'flex flex-wrap gap-4 justify-center'}>
        {items.map((item, index) => (
          <div 
            key={index}
            className={`bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-all hover:scale-105 ${
              layout === 'flow' ? 'flex-1 min-w-[200px]' : ''
            }`}
          >
            {item.icon && (
              <div className="text-4xl mb-2 text-center">{item.icon}</div>
            )}
            <div className="text-center">
              <div className="font-bold text-2xl text-gold mb-1">{item.value}</div>
              <div className="font-semibold text-maroon mb-1">{item.title}</div>
              {item.description && (
                <div className="text-xs text-muted-foreground mt-2">{item.description}</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default Infographic;
