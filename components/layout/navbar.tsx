'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Clubs', href: '/clubs' },
  { label: 'Leagues', href: '/leagues' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const isDashboard = pathname?.startsWith('/dashboard');
  const isAuth = pathname?.startsWith('/auth');
  if (isDashboard || isAuth) return null;

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled ? 'glass border-b border-white/5' : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center shadow-lg group-hover:shadow-red-600/30 transition-shadow">
              <Trophy className="h-4 w-4 text-white" />
            </div>
            <span className="font-bold text-lg text-white tracking-tight">
              Rugby<span className="text-red-500">OS</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = link.href === '/' ? pathname === '/' : link.href.startsWith('/') && pathname?.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'px-3 py-1.5 text-sm font-medium transition-colors rounded-md',
                    isActive
                      ? 'text-white bg-white/8'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  )}
                >
                  {link.label}
                  {isActive && (
                    <span className="block h-0.5 mt-0.5 rounded-full bg-red-500" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-2">
            <Link href="/auth/login">
              <Button variant="ghost" size="sm">Log in</Button>
            </Link>
            <Link href="/auth/signup">
              <Button variant="primary" size="sm">Start Free Trial</Button>
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t border-white/5"
          >
            <div className="px-4 py-3 space-y-1">
              {navLinks.map((link) => {
                const isActive = link.href === '/' ? pathname === '/' : link.href.startsWith('/') && pathname?.startsWith(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      'flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition-colors',
                      isActive
                        ? 'text-white bg-white/8 font-medium'
                        : 'text-slate-300 hover:text-white hover:bg-white/5'
                    )}
                  >
                    {isActive && <span className="w-1 h-1 rounded-full bg-red-500 shrink-0" />}
                    {link.label}
                  </Link>
                );
              })}
              <div className="pt-2 flex flex-col gap-2">
                <Link href="/auth/login" onClick={() => setIsOpen(false)}>
                  <Button variant="secondary" size="md" className="w-full">Log in</Button>
                </Link>
                <Link href="/auth/signup" onClick={() => setIsOpen(false)}>
                  <Button variant="primary" size="md" className="w-full">Start Free Trial</Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
