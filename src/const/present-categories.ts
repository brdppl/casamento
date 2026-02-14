import { IPresentCategory } from '@/models/present.model';
import { Armchair, Bath, Home, Plane, UtensilsCrossed } from 'lucide-react';

export const presentCategories = [
  {
    id: 1,
    icon: Home,
    title: 'Casa & Decoração',
    items: [],
  },
  {
    id: 2,
    icon: UtensilsCrossed,
    title: 'Cozinha',
    items: [],
  },
  {
    id: 3,
    icon: Armchair,
    title: 'Sala de Estar',
    items: [],
  },
  {
    id: 4,
    icon: Bath,
    title: 'Banho & Bem-estar',
    items: [],
  },
  {
    id: 5,
    icon: Plane,
    title: 'Lua de Mel',
    items: [],
  },
] as IPresentCategory[];
