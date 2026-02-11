import { StudioSpace } from '../types';

export const FEATURED_STUDIOS: StudioSpace[] = [
  {
    id: '1',
    title: 'Podcast Studio A',
    price: 'From $120/hr',
    location: 'Main Booth',
    capacity: 4,
    baths: 0,
    sqft: 320,
    imageUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=2070&auto=format&fit=crop',
    description: '',
    features: ['Sound-treated', 'Pro mics', 'Multi-track']
  },
  {
    id: '2',
    title: 'Photo Studio',
    price: 'From $150/hr',
    location: 'Cyclo & Sets',
    capacity: 6,
    sqft: 800,
    imageUrl: 'https://images.unsplash.com/photo-1545235617-7a424c1a60cc?q=80&w=2071&auto=format&fit=crop',
    description: '',
    features: ['Cyclorama', 'Natural light', 'Backdrops']
  },
  {
    id: '3',
    title: 'Video Suite',
    price: 'From $200/hr',
    location: 'Full Production',
    capacity: 8,
    sqft: 1200,
    imageUrl: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=2053&auto=format&fit=crop',
    description: '',
    features: ['Green screen', 'Lighting grid', 'Edit bay']
  },
  {
    id: '4',
    title: 'Event & Workshop Space',
    price: 'From $250/hr',
    location: 'Flex Space',
    capacity: 20,
    sqft: 2000,
    imageUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=2070&auto=format&fit=crop',
    description: '',
    features: ['AV setup', 'Seating', 'Catering ready']
  },
];
