import Link from 'next/link';
import { Trophy, Globe, MessageSquare, Share2, PlayCircle } from 'lucide-react';

const footerLinks = {
  Platform: [
    { label: 'Club Management', href: '/clubs' },
    { label: 'Team Management', href: '/dashboard/teams' },
    { label: 'Player Profiles', href: '/dashboard/players' },
    { label: 'Fixtures & Results', href: '/dashboard/fixtures' },
    { label: 'League Standings', href: '/leagues' },
  ],
  Company: [
    { label: 'About RugbyOS', href: '#' },
    { label: 'Careers', href: '#' },
    { label: 'Partners', href: '#' },
    { label: 'Contact', href: '#' },
  ],
  Support: [
    { label: 'Documentation', href: '#' },
    { label: 'Help Centre', href: '#' },
    { label: 'API Reference', href: '#' },
    { label: 'Status', href: '#' },
  ],
};

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="h-9 w-9 rounded-xl bg-linear-to-br from-red-600 to-red-700 flex items-center justify-center shadow-lg">
                <Trophy className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-lg text-foreground tracking-tight">
                Rugby<span className="text-red-500">OS</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground mb-5 leading-relaxed max-w-xs">
              The all-in-one operating system for modern rugby clubs across Canada and beyond.
            </p>
            <div className="flex items-center gap-3">
              {[Globe, MessageSquare, Share2, PlayCircle].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="h-8 w-8 rounded-lg bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-red-500/50 transition-all"
                >
                  <Icon className="h-3.5 w-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">
                {section}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground/60">
            © 2026 RugbyOS Inc. All rights reserved. Built for Canadian rugby clubs.
          </p>
          <div className="flex items-center gap-4">
            <Link href="#" className="text-xs text-muted-foreground/60 hover:text-muted-foreground transition-colors">Privacy</Link>
            <Link href="#" className="text-xs text-muted-foreground/60 hover:text-muted-foreground transition-colors">Terms</Link>
            <Link href="#" className="text-xs text-muted-foreground/60 hover:text-muted-foreground transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
