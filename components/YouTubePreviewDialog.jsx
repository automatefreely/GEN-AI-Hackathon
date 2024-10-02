import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Play } from 'lucide-react';
import { motion } from 'framer-motion'; // Import framer motion

const videoData = [
  {
    id: '1',
    title: 'Amazing Nature Scenes',
    thumbnail: 'https://www.shutterstock.com/shutterstock/photos/318513668/display_1500/stock-photo-photos-sexy-girls-on-the-background-of-the-urban-landscape-318513668.jpg',
    link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  },
  {
    id: '2',
    title: 'Funny Cat Compilation',
    thumbnail: 'https://www.shutterstock.com/shutterstock/photos/318513668/display_1500/stock-photo-photos-sexy-girls-on-the-background-of-the-urban-landscape-318513668.jpg',
    link: 'https://www.youtube.com/watch?v=hY7m5jjJ9mM',
  },
  {
    id: '3',
    title: 'Delicious Cooking Tutorial',
    thumbnail: 'https://www.shutterstock.com/shutterstock/photos/318513668/display_1500/stock-photo-photos-sexy-girls-on-the-background-of-the-urban-landscape-318513668.jpg',
    link: 'https://www.youtube.com/watch?v=VZHtVP1p-H8',
  },
];

const placeholders = [
  {
    id: 'placeholder1',
    title: 'Coming Soon',
    thumbnail: '/api/placeholder/320/180',
    link: '#',
  },
  {
    id: 'placeholder2',
    title: 'Coming Soon',
    thumbnail: '/api/placeholder/320/180',
    link: '#',
  },
];

const VideoPreview = ({ title, thumbnail, link }) => (
  <motion.div
    className="w-120 h-86 flex flex-col"
    whileHover={{ scale: 1.05 }} // Add animation on hover
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
    <Card className="w-94 h-70 flex flex-col">
      <CardHeader className="flex-shrink-0">
        <CardTitle className="text-lg line-clamp-2">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow flex items-center justify-center p-2">
        <img src={thumbnail} alt={title} className="w-full h-auto max-h-44 object-cover rounded-md" />
      </CardContent>
      <CardFooter className="flex-shrink-0 justify-center">
        <Button onClick={() => window.open(link, '_blank')}>
          <Play className="mr-2 h-4 w-4" /> Start
        </Button>
      </CardFooter>
    </Card>
  </motion.div>
);

const YouTubePreviewDialog = () => {
  const [open, setOpen] = useState(false);

  // Ensure there are always at least 3 cards displayed
  const videoList = [...videoData, ...placeholders].slice(0, 3);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Show YouTube Previews</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[900px]">
        <DialogHeader>
          <DialogTitle>YouTube Video Previews</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 justify-items-center">
          {videoList.map((video) => (
            <VideoPreview key={video.id} {...video} />
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default YouTubePreviewDialog;
