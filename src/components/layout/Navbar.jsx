import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Flame, 
  Package, 
  Bookmark, 
  Phone, 
  ShoppingBag, 
  Home, 
  Menu
} from 'lucide-react';

const NAV_ITEMS = [
  { label: 'Inicio', path: '/', icon: Home },
  { label: 'Tienda', path: '/productos', icon: ShoppingBag },
  { label: 'Videos', path: '/videos', badge: 'NUEVO' },
  { label: 'Kits', path: '/productos?type=kits', icon: Package },
  { label: 'Contacto', path: '/sobre-nosotros', icon: Phone },
];

export default function Navbar() {
  return null;
}

