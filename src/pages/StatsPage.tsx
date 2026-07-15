// ============================================================
// StatsPage — Statistics dashboard with charts
// ============================================================

import React, { useMemo } from 'react';
import {
  BarChart, Bar, PieChart, Pie, Cell as RechartsCell,
  ResponsiveContainer, XAxis, YAxis, Tooltip, Legend,
} from 'recharts';
import { useHistoryStore } from '../stores/historyStore';
import { Card } from '../components/ui/Card';
import {
  BarChart3, Trophy, Handshake,
  Percent, Flame, Gamepad2,
} from 'lucide-react';

const CHART_COLORS = ['#6C63FF', '#FF6584', '#00D9FF', '#00E676', '#FFD600'];

export const StatsPage: React.FC = () => {
  const matches = useHistoryStore((s) => s.matches);

  // Compute statistics
  const stats = useMemo(() => {
    const totalGames = matches.length;

    // Count wins per player name
    const winsByPlayer: Record<string, number> = {};
    let draws = 0;

    for (const match of matches) {
      if (match.winner) {
        winsByPlayer[match.winner] = (winsByPlayer[match.winner] || 0) + 1;
      } else {
        draws++;
      }
    }

    // Calculate wins of the most frequent player (player 1 in most cases)
    const playerNames = new Set(matches.flatMap((m) => m.players));
    const playerStats = Array.from(playerNames).map((name) => {
      const gamesPlayed = matches.filter((m) => m.players.includes(name)).length;
      const wins = winsByPlayer[name] || 0;
      const losses = gamesPlayed - wins - matches.filter(
        (m) => m.players.includes(name) && !m.winner
      ).length;
      return { name, wins, losses, gamesPlayed };
    });

    // Longest winning streak (for first player)
    let longestStreak = 0;
    let currentStreak = 0;
    const firstPlayerName = matches.length > 0 ? matches[matches.length - 1].players[0] : '';
    for (let i = matches.length - 1; i >= 0; i--) {
      if (matches[i].winner === firstPlayerName) {
        currentStreak++;
        longestStreak = Math.max(longestStreak, currentStreak);
      } else {
        currentStreak = 0;
      }
    }

    // Pie chart data
    const totalWins = Object.values(winsByPlayer).reduce((a, b) => a + b, 0);
    const pieData = [
      { name: 'Wins', value: totalWins, color: CHART_COLORS[0] },
      { name: 'Draws', value: draws, color: CHART_COLORS[3] },
    ];

    // Bar chart data (wins by player)
    const barData = playerStats
      .sort((a, b) => b.wins - a.wins)
      .slice(0, 5)
      .map((p) => ({ name: p.name, wins: p.wins, losses: p.losses }));

    const winPercentage = totalGames > 0 ? Math.round((totalWins / totalGames) * 100) : 0;

    return { totalGames, totalWins, draws, longestStreak, winPercentage, pieData, barData, playerStats };
  }, [matches]);

  // Summary cards data
  const summaryCards = [
    { label: 'Total Games', value: stats.totalGames, icon: <Gamepad2 size={20} />, color: 'text-primary' },
    { label: 'Total Wins', value: stats.totalWins, icon: <Trophy size={20} />, color: 'text-secondary' },
    { label: 'Draws', value: stats.draws, icon: <Handshake size={20} />, color: 'text-warning' },
    { label: 'Win Rate', value: `${stats.winPercentage}%`, icon: <Percent size={20} />, color: 'text-success' },
    { label: 'Win Streak', value: stats.longestStreak, icon: <Flame size={20} />, color: 'text-error' },
  ];

  return (
    <div className="mx-auto max-w-[1200px] w-full px-6 pt-32 pb-20 z-10 relative animate-slide-up">
      {/* ─── Header ─── */}
      <div className="flex flex-col items-center text-center gap-5 mb-12 w-full">
        <div className="w-16 h-16 rounded-[20px] bg-gradient-to-br from-[#6366F1]/20 to-[#8B5CF6]/20 border border-[#6366F1]/30 flex items-center justify-center mb-4 shadow-[0_0_24px_rgba(99,102,241,0.2)]">
          <BarChart3 size={32} className="text-[#A78BFA]" />
        </div>
        <h1 className="text-4xl sm:text-[48px] font-black font-[family-name:var(--font-heading)] tracking-tight leading-[1.1] text-white">
          Game <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#22D3EE] to-[#8B5CF6]">Statistics</span>
        </h1>
        <p className="text-[16px] text-[#7a85a3] leading-relaxed mt-4 max-w-2xl mx-auto">
          Your performance at a glance. Analyze your win rate, longest streaks, and match distributions.
        </p>
      </div>

      {matches.length === 0 ? (
        <Card variant="glass" className="text-center py-12">
          <BarChart3 size={48} className="mx-auto text-secondary mb-4 opacity-50" />
          <h3 className="text-lg font-semibold mb-2">No Data Yet</h3>
          <p className="text-secondary text-sm">Play some games to see your stats!</p>
        </Card>
      ) : (
        <div className="flex flex-col gap-12 w-full">
          {/* Summary Cards */}
          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {summaryCards.map((card, index) => (
              <div
                key={card.label}
                className="bg-[#141828]/75 backdrop-blur-xl border border-white/[0.08] rounded-[20px] shadow-[0_8px_32px_rgba(0,0,0,0.15)] hover:shadow-[0_8px_40px_rgba(99,102,241,0.2)] hover:-translate-y-1 transition-all duration-300 p-6 flex flex-col items-center justify-center h-[150px] min-h-[140px]"
              >
                <div
                  className="animate-slide-up flex flex-col items-center justify-center w-full h-full"
                  style={{ animationDelay: `${index * 80}ms`, animationFillMode: 'both' }}
                >
                  <div className={`mb-3 ${card.color}`}>{card.icon}</div>
                  <div className="text-3xl font-black font-[family-name:var(--font-heading)] text-white mb-1">
                    {card.value}
                  </div>
                  <div className="text-[13px] font-semibold text-[#7a85a3] uppercase tracking-wider">
                    {card.label}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
            {/* Win Distribution Pie Chart */}
            <div className="bg-[#0b1022]/80 backdrop-blur-xl border border-white/[0.08] rounded-[20px] shadow-[0_8px_32px_rgba(0,0,0,0.2)] p-6 flex flex-col h-[380px]">
              <h3 className="text-[14px] font-bold text-white uppercase tracking-wider mb-6 px-2">
                Result Distribution
              </h3>
              <div className="flex-1 w-full relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={stats.pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={70}
                      outerRadius={105}
                      paddingAngle={6}
                      dataKey="value"
                      stroke="none"
                    >
                      {stats.pieData.map((entry, index) => (
                        <RechartsCell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        background: 'rgba(15, 20, 45, 0.95)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        borderRadius: '16px',
                        color: '#fff',
                        boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                        padding: '12px 16px',
                      }}
                      itemStyle={{ color: '#fff', fontSize: '14px', fontWeight: 500 }}
                    />
                    <Legend 
                      verticalAlign="bottom" 
                      height={36} 
                      iconType="circle"
                      wrapperStyle={{ paddingTop: '20px', fontSize: '14px' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Wins by Player Bar Chart */}
            <div className="bg-[#0b1022]/80 backdrop-blur-xl border border-white/[0.08] rounded-[20px] shadow-[0_8px_32px_rgba(0,0,0,0.2)] p-6 flex flex-col h-[380px]">
              <h3 className="text-[14px] font-bold text-white uppercase tracking-wider mb-6 px-2">
                Wins by Player
              </h3>
              <div className="flex-1 w-full relative">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={stats.barData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <XAxis
                      dataKey="name"
                      tick={{ fill: '#7a85a3', fontSize: 13, fontWeight: 500 }}
                      axisLine={false}
                      tickLine={false}
                      dy={10}
                    />
                    <YAxis
                      tick={{ fill: '#7a85a3', fontSize: 13, fontWeight: 500 }}
                      axisLine={false}
                      tickLine={false}
                      tickCount={5}
                      allowDecimals={false}
                    />
                    <Tooltip
                      cursor={{ fill: 'rgba(255,255,255,0.04)' }}
                      contentStyle={{
                        background: 'rgba(15, 20, 45, 0.95)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        borderRadius: '16px',
                        color: '#fff',
                        boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                        padding: '12px 16px',
                      }}
                      itemStyle={{ color: '#fff', fontSize: '14px', fontWeight: 500 }}
                    />
                    <Bar dataKey="wins" fill="#8B5CF6" radius={[6, 6, 0, 0]} maxBarSize={60} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
