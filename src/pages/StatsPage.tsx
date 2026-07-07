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
    <div className="py-8 px-4 max-w-4xl mx-auto w-full animate-slide-up z-10 relative">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-heading)] gradient-text mb-2">
          Statistics
        </h1>
        <p className="text-secondary text-sm">Your performance at a glance</p>
      </div>

      {matches.length === 0 ? (
        <Card variant="glass" className="text-center py-12">
          <BarChart3 size={48} className="mx-auto text-secondary mb-4 opacity-50" />
          <h3 className="text-lg font-semibold mb-2">No Data Yet</h3>
          <p className="text-secondary text-sm">Play some games to see your stats!</p>
        </Card>
      ) : (
        <div className="space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {summaryCards.map((card, index) => (
              <Card
                key={card.label}
                variant="glass"
                className="text-center !p-4"
              >
                <div
                  className="animate-slide-up"
                  style={{ animationDelay: `${index * 80}ms`, animationFillMode: 'both' }}
                >
                  <div className={`mx-auto mb-2 ${card.color}`}>{card.icon}</div>
                  <div className="text-2xl font-bold font-[family-name:var(--font-heading)]">
                    {card.value}
                  </div>
                  <div className="text-xs text-secondary mt-0.5">{card.label}</div>
                </div>
              </Card>
            ))}
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Win Distribution Pie Chart */}
            <Card variant="glass">
              <h3 className="text-sm font-semibold text-secondary uppercase tracking-wider mb-4">
                Result Distribution
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={stats.pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {stats.pieData.map((entry, index) => (
                        <RechartsCell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        background: 'rgba(26, 26, 62, 0.95)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '12px',
                        color: '#fff',
                      }}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </Card>

            {/* Wins by Player Bar Chart */}
            <Card variant="glass">
              <h3 className="text-sm font-semibold text-secondary uppercase tracking-wider mb-4">
                Wins by Player
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={stats.barData}>
                    <XAxis
                      dataKey="name"
                      tick={{ fill: '#A0A0CC', fontSize: 12 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      tick={{ fill: '#A0A0CC', fontSize: 12 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip
                      contentStyle={{
                        background: 'rgba(26, 26, 62, 0.95)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '12px',
                        color: '#fff',
                      }}
                    />
                    <Bar dataKey="wins" fill="#6C63FF" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};
