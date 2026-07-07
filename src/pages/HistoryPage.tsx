// ============================================================
// HistoryPage — Match history display
// ============================================================

import React, { useState } from 'react';
import { useHistoryStore } from '../stores/historyStore';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import {
  History, Download, Trash2, Trophy,
  Handshake, Clock, Hash, Calendar,
  ChevronDown, ChevronUp, Bot, Users,
} from 'lucide-react';
import { formatDate } from '../utils/gameLogic';
import type { MatchRecord } from '../types';

export const HistoryPage: React.FC = () => {
  const { matches, clearHistory, exportHistory } = useHistoryStore();
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="py-8 px-4 max-w-3xl mx-auto w-full animate-slide-up z-10 relative">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-heading)] gradient-text mb-2">
          Match History
        </h1>
        <p className="text-secondary text-sm">{matches.length} games recorded</p>
      </div>

      {/* Actions */}
      {matches.length > 0 && (
        <div className="flex justify-end gap-3 mb-6">
          <Button
            variant="ghost"
            size="sm"
            icon={<Download size={16} />}
            onClick={exportHistory}
          >
            Export JSON
          </Button>
          <Button
            variant="danger"
            size="sm"
            icon={<Trash2 size={16} />}
            onClick={() => setShowClearConfirm(true)}
          >
            Clear All
          </Button>
        </div>
      )}

      {/* Match List */}
      {matches.length === 0 ? (
        <Card variant="glass" className="text-center py-12">
          <History size={48} className="mx-auto text-secondary mb-4 opacity-50" />
          <h3 className="text-lg font-semibold mb-2">No Matches Yet</h3>
          <p className="text-secondary text-sm">Play some games and they'll appear here!</p>
        </Card>
      ) : (
        <div className="space-y-3">
          {matches.map((match) => (
            <MatchCard
              key={match.id}
              match={match}
              isExpanded={expandedId === match.id}
              onToggle={() => toggleExpand(match.id)}
            />
          ))}
        </div>
      )}

      {/* Clear Confirmation Modal */}
      <Modal
        isOpen={showClearConfirm}
        onClose={() => setShowClearConfirm(false)}
        title="Clear History"
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-secondary text-sm">
            Are you sure you want to delete all match history? This action cannot be undone.
          </p>
          <div className="flex gap-3">
            <Button
              variant="ghost"
              size="md"
              fullWidth
              onClick={() => setShowClearConfirm(false)}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              size="md"
              fullWidth
              onClick={() => {
                clearHistory();
                setShowClearConfirm(false);
              }}
            >
              Delete All
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

// ─── Match Card Sub-component ──────────────────────────────

const MatchCard: React.FC<{
  match: MatchRecord;
  isExpanded: boolean;
  onToggle: () => void;
}> = ({ match, isExpanded, onToggle }) => {
  return (
    <Card variant="glass" className="!p-0 overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full p-4 flex items-center justify-between text-left cursor-pointer hover:bg-white/5 transition-colors"
        aria-expanded={isExpanded}
      >
        <div className="flex items-center gap-4 min-w-0">
          {/* Result icon */}
          <div className={`
            w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0
            ${match.winner ? 'bg-primary/20' : 'bg-warning/20'}
          `}>
            {match.winner ? (
              <Trophy size={20} className="text-primary" />
            ) : (
              <Handshake size={20} className="text-warning" />
            )}
          </div>

          {/* Match info */}
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              <span className="font-semibold text-sm truncate">
                {match.players[0]} vs {match.players[1]}
              </span>
              {match.mode === 'pvc' && <Bot size={14} className="text-primary flex-shrink-0" />}
              {match.mode === 'pvp' && <Users size={14} className="text-secondary flex-shrink-0" />}
            </div>
            <div className="flex items-center gap-3 text-xs text-secondary">
              <span className="flex items-center gap-1">
                <Calendar size={12} />
                {formatDate(match.date)}
              </span>
            </div>
          </div>
        </div>

        {/* Result badge & expand */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <span className={`
            text-xs font-semibold px-2.5 py-1 rounded-full
            ${match.winner ? 'bg-primary/20 text-primary' : 'bg-warning/20 text-warning'}
          `}>
            {match.winner ? `${match.winner} Won` : 'Draw'}
          </span>
          {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>
      </button>

      {/* Expanded details */}
      {isExpanded && (
        <div className="px-4 pb-4 border-t border-white/5 pt-3 animate-slide-down">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="text-center">
              <div className="text-xs text-secondary mb-0.5 flex items-center justify-center gap-1">
                <Hash size={12} /> Moves
              </div>
              <div className="font-semibold">{match.numberOfMoves}</div>
            </div>
            <div className="text-center">
              <div className="text-xs text-secondary mb-0.5 flex items-center justify-center gap-1">
                <Clock size={12} /> Duration
              </div>
              <div className="font-semibold">{match.duration}s</div>
            </div>
            <div className="text-center">
              <div className="text-xs text-secondary mb-0.5">Board</div>
              <div className="font-semibold">{match.boardSize}×{match.boardSize}</div>
            </div>
            <div className="text-center">
              <div className="text-xs text-secondary mb-0.5">Difficulty</div>
              <div className="font-semibold capitalize">{match.difficulty ?? 'N/A'}</div>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};
