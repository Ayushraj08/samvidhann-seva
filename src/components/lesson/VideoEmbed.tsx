import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Play } from 'lucide-react';

interface VideoEmbedProps {
  title: string;
  videoId: string;
  description?: string;
}

const VideoEmbed = ({ title, videoId, description }: VideoEmbedProps) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <Card className="my-6 overflow-hidden border-gold/20">
      <div className="bg-gradient-to-r from-maroon/10 to-gold/10 p-4">
        <h4 className="font-bold text-maroon mb-2">📹 {title}</h4>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      <div className="relative aspect-video bg-black">
        {!isPlaying ? (
          <div 
            className="absolute inset-0 flex items-center justify-center cursor-pointer bg-gradient-to-br from-maroon/80 to-maroon/60 hover:from-maroon/70 hover:to-maroon/50 transition-all"
            onClick={() => setIsPlaying(true)}
          >
            <div className="text-center">
              <Play className="w-20 h-20 text-white mx-auto mb-4" fill="white" />
              <p className="text-white font-medium">Click to Play Video</p>
            </div>
          </div>
        ) : (
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )}
      </div>
    </Card>
  );
};

export default VideoEmbed;
