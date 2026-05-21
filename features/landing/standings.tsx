'use client';

import { motion } from 'framer-motion';
import { ArrowRight, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

type FormResult = 'W' | 'L' | 'D';

interface StandingRow {
  position: number;
  team: string;
  played: number;
  won: number;
  points: number;
  form: FormResult[];
  isUserTeam?: boolean;
}

const standings: StandingRow[] = [
  {
    position: 1,
    team: 'Toronto Arrows RFC',
    played: 14,
    won: 11,
    points: 54,
    form: ['W', 'W', 'D', 'W', 'W'],
    isUserTeam: true,
  },
  {
    position: 2,
    team: 'Ottawa Wolves RFC',
    played: 14,
    won: 10,
    points: 46,
    form: ['L', 'W', 'W', 'W', 'W'],
  },
  {
    position: 3,
    team: 'Kingston RFC',
    played: 14,
    won: 9,
    points: 43,
    form: ['W', 'L', 'W', 'D', 'W'],
  },
  {
    position: 4,
    team: 'Barrie RFC',
    played: 14,
    won: 8,
    points: 40,
    form: ['D', 'W', 'W', 'L', 'W'],
  },
  {
    position: 5,
    team: 'Hamilton RFC',
    played: 14,
    won: 7,
    points: 35,
    form: ['L', 'W', 'L', 'W', 'D'],
  },
];

const positionBadgeStyle: Record<number, string> = {
  1: 'bg-amber-500/20 text-amber-400 border border-amber-500/30',
  2: 'bg-slate-400/20 text-slate-300 border border-slate-400/30',
  3: 'bg-orange-700/20 text-orange-400 border border-orange-700/30',
};

const formDotStyle: Record<FormResult, string> = {
  W: 'bg-green-500',
  L: 'bg-red-500',
  D: 'bg-yellow-500',
};

const formLabel: Record<FormResult, string> = {
  W: 'Win',
  L: 'Loss',
  D: 'Draw',
};

function PositionBadge({ position }: { position: number }) {
  const style = positionBadgeStyle[position];
  if (style) {
    return (
      <span className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold ${style}`}>
        {position}
      </span>
    );
  }
  return (
    <span className="inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-semibold text-slate-500 bg-[#0A0C12] border border-[#1E2A3A]">
      {position}
    </span>
  );
}

function FormDots({ form }: { form: FormResult[] }) {
  return (
    <div className="flex items-center gap-1.5">
      {form.map((result, i) => (
        <span
          key={i}
          title={formLabel[result]}
          className={`w-2 h-2 rounded-full ${formDotStyle[result]}`}
        />
      ))}
    </div>
  );
}

function StandingRowItem({ row, delay }: { row: StandingRow; delay: number }) {
  return (
    <motion.tr
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
      className={`
        group relative border-b last:border-b-0 transition-colors duration-200
        ${row.isUserTeam
          ? 'border-red-900/30 bg-red-600/5 hover:bg-red-600/10'
          : 'border-[#1E2A3A] hover:bg-white/[0.02]'
        }
      `}
    >
      {/* Left accent border for user's team */}
      {row.isUserTeam && (
        <td className="p-0 w-0">
          <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-red-600 rounded-r-full" />
        </td>
      )}

      <td className="py-3.5 pl-5 pr-3">
        <PositionBadge position={row.position} />
      </td>

      <td className="py-3.5 px-3">
        <div className="flex items-center gap-2.5">
          <span className={`font-semibold text-sm ${row.isUserTeam ? 'text-white' : 'text-slate-200'}`}>
            {row.team}
          </span>
          {row.isUserTeam && (
            <Badge variant="red" size="sm">Your Club</Badge>
          )}
        </div>
      </td>

      <td className="py-3.5 px-3 text-center text-slate-400 text-sm tabular-nums">
        {row.played}
      </td>

      <td className="py-3.5 px-3 text-center text-slate-400 text-sm tabular-nums">
        {row.won}
      </td>

      <td className="py-3.5 px-3 text-center">
        <span className={`font-bold text-sm tabular-nums ${row.isUserTeam ? 'text-amber-400' : 'text-white'}`}>
          {row.points}
        </span>
      </td>

      <td className="py-3.5 pl-3 pr-5">
        <FormDots form={row.form} />
      </td>
    </motion.tr>
  );
}

export function LandingStandings() {
  return (
    <section className="py-20 px-4 bg-[#0A0C12]">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <Badge variant="gold" dot size="sm" className="mb-4">League Standings</Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Live League Standings
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Track your club&apos;s league position in real time. Form guides, points tables, and head-to-head records at a glance.
          </p>
        </motion.div>

        {/* Table card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-[#161B27] border border-[#1E2A3A] rounded-xl overflow-hidden"
        >
          {/* Table header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-[#1E2A3A]">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-amber-500" />
              <span className="text-white font-semibold text-sm">Ontario Rugby Union — Premier Division</span>
            </div>
            <Badge variant="green" dot size="sm">Updated Live</Badge>
          </div>

          {/* Responsive wrapper */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[520px]">
              <thead>
                <tr className="border-b border-[#1E2A3A]">
                  <th className="py-3 pl-5 pr-3 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-500 w-12">#</th>
                  <th className="py-3 px-3 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-500">Club</th>
                  <th className="py-3 px-3 text-center text-[11px] font-semibold uppercase tracking-wider text-slate-500 w-14">P</th>
                  <th className="py-3 px-3 text-center text-[11px] font-semibold uppercase tracking-wider text-slate-500 w-14">W</th>
                  <th className="py-3 px-3 text-center text-[11px] font-semibold uppercase tracking-wider text-slate-500 w-16">Pts</th>
                  <th className="py-3 pl-3 pr-5 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-500 w-32">Form</th>
                </tr>
              </thead>
              <tbody>
                {standings.map((row, i) => (
                  <StandingRowItem key={row.position} row={row} delay={0.1 + i * 0.07} />
                ))}
              </tbody>
            </table>
          </div>

          {/* Form legend */}
          <div className="px-5 py-3 border-t border-[#1E2A3A] flex items-center gap-4 flex-wrap">
            <span className="text-slate-600 text-xs font-medium">Form guide:</span>
            {(['W', 'L', 'D'] as FormResult[]).map((r) => (
              <div key={r} className="flex items-center gap-1.5">
                <span className={`w-2 h-2 rounded-full ${formDotStyle[r]}`} />
                <span className="text-slate-500 text-xs">{formLabel[r]}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* See full standings link */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="text-center mt-8"
        >
          <Link href="/standings">
            <Button variant="ghost" size="lg" className="group text-slate-300 hover:text-white">
              See Full Standings
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
