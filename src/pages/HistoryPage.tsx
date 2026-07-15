// ============================================================
// HistoryPage — Match history display
// ============================================================

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useHistoryStore } from '../stores/historyStore';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import {
  History, Download, Trash2, Trophy,
  Handshake, Clock, Hash, Calendar,
  ChevronDown, Play, Grid3X3, Settings2, Gamepad2,
} from 'lucide-react';
import { formatDate } from '../utils/gameLogic';
import type { MatchRecord } from '../types';

export const HistoryPage: React.FC = () => {
  const navigate = useNavigate();
  const { matches, clearHistory, exportHistory } = useHistoryStore();
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="mx-auto max-w-[1100px] w-full px-6 pt-[100px] pb-[80px] z-10 relative animate-slide-up flex flex-col">
      
      {/* ─── Header ─── */}
      <div className="flex flex-col items-center text-center gap-3 mb-8 w-full">
        <div className="flex flex-col items-center justify-center">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#6366F1]/20 to-[#8B5CF6]/20 border border-[#6366F1]/30 flex items-center justify-center mb-3 shadow-[0_0_16px_rgba(99,102,241,0.15)]">
            <History size={20} className="text-[#A78BFA]" />
          </div>
          <h1 className="text-2xl sm:text-[28px] font-bold font-[family-name:var(--font-heading)] tracking-tight leading-[1.2] text-white">
            Match <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#22D3EE] to-[#8B5CF6]">History</span>
          </h1>
          <p className="text-[13px] text-[#7a85a3] leading-relaxed mt-2 max-w-lg mx-auto">
            Review your previous matches, winners, moves, duration, and export your match history.
          </p>
        </div>

        {/* Actions */}
        {matches.length > 0 && (
          <div className="flex items-center justify-center gap-3 mt-1">
            <Button
              variant="ghost"
              icon={<Download size={14} />}
              onClick={exportHistory}
              className="bg-[#0b1022] border border-white/[0.08] hover:bg-white/[0.06] text-[12px] h-8 px-3"
            >
              Export Data
            </Button>
            <Button
              variant="danger"
              icon={<Trash2 size={14} />}
              onClick={() => setShowClearConfirm(true)}
              className="text-[12px] h-8 px-3"
            >
              Clear All
            </Button>
          </div>
        )}
      </div>

      {/* ─── Match List ─── */}
      <div className="w-full mx-auto flex-1">
        {matches.length === 0 ? (
          <div className="w-full rounded-[20px] bg-[#0b1022] border border-white/[0.06] backdrop-blur-xl p-10 md:p-16 flex flex-col items-center justify-center text-center shadow-[0_8px_40px_rgba(0,0,0,0.3)]">
            <div className="w-16 h-16 rounded-full bg-[#111832] border border-white/[0.04] flex items-center justify-center mb-6 shadow-inner">
              <History size={28} className="text-[#556080]" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white mb-3">No matches played yet</h3>
            <p className="text-[#7a85a3] text-[13px] max-w-[300px] mb-8 leading-relaxed">
              Start your first game to build your history and track your statistics.
            </p>
            <Button
              variant="primary"
              size="md"
              icon={<Play size={16} fill="white" />}
              onClick={() => navigate('/settings')}
              className="bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] shadow-[0_0_20px_rgba(99,102,241,0.3)] px-8 h-10 text-[13px]"
            >
              Play Now
            </Button>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
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
      </div>

      {/* ─── Clear Confirmation Modal ─── */}
      <Modal
        isOpen={showClearConfirm}
        onClose={() => setShowClearConfirm(false)}
        title="Clear History"
        size="sm"
      >
        <div className="space-y-6">
          <p className="text-[#7a85a3] text-[15px] leading-relaxed">
            Are you sure you want to delete all match history? This action cannot be undone and will permanently remove all your game records.
          </p>
          <div className="flex gap-4">
            <Button
              variant="ghost"
              size="md"
              fullWidth
              onClick={() => setShowClearConfirm(false)}
              className="bg-[#111832] border border-white/[0.08]"
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

// ─── Premium Match Card Sub-component ──────────────────────────────

const MatchCard: React.FC<{
  match: MatchRecord;
  isExpanded: boolean;
  onToggle: () => void;
}> = ({ match, isExpanded, onToggle }) => {
  return (
    <div className={`
      w-full rounded-2xl transition-all duration-300 overflow-hidden
      ${isExpanded 
        ? 'bg-[#0f1429] border border-[#6366F1]/40 shadow-[0_8px_32px_rgba(99,102,241,0.2)]' 
        : 'bg-[#0b1022]/80 backdrop-blur-md border border-white/[0.06] hover:border-white/[0.15] hover:bg-[#0e142a] shadow-[0_4px_24px_rgba(0,0,0,0.3)] hover:-translate-y-0.5'
      }
    `}>
      <button
        onClick={onToggle}
        className="w-full px-5 py-3.5 flex items-center justify-between text-left cursor-pointer focus:outline-none"
        aria-expanded={isExpanded}
      >
        <div className="flex items-center gap-3.5 w-full">
          {/* Icon */}
          <div className={`
            w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0
            ${match.winner ? 'bg-gradient-to-br from-[#6366F1]/20 to-[#8B5CF6]/20 border border-[#6366F1]/30' : 'bg-gradient-to-br from-[#F59E0B]/20 to-[#D97706]/20 border border-[#F59E0B]/30'}
          `}>
            {match.winner ? (
              <Trophy size={18} className="text-[#A78BFA]" />
            ) : (
              <Handshake size={18} className="text-[#FBBF24]" />
            )}
          </div>

          {/* Details */}
          <div className="flex flex-col gap-1 flex-1 min-w-0">
            <h3 className="font-semibold text-[14px] sm:text-[15px] text-white truncate leading-none">
              {match.players[0]} <span className="text-[#556080] font-normal mx-0.5 text-[13px]">vs</span> {match.players[1]}
            </h3>
            
            <div className="flex flex-wrap items-center gap-2 text-[11px] text-[#7a85a3] font-medium">
              <span className="flex items-center gap-1">
                <Calendar size={11} className="text-[#A78BFA]" /> {formatDate(match.date)}
              </span>
              <span className="text-[#556080]">•</span>
              <span className="flex items-center gap-1">
                <Clock size={11} className="text-[#A78BFA]" /> {match.duration}s
              </span>
              <span className="text-[#556080]">•</span>
              <span className="flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-white/[0.04] border border-white/[0.04]">
                <Gamepad2 size={11} className={match.mode === 'pvc' ? 'text-[#A78BFA]' : 'text-[#22D3EE]'} /> 
                {match.mode === 'pvc' ? 'PvE' : 'PvP'}
              </span>
            </div>
          </div>
        </div>

        {/* Badge & Arrow */}
        <div className="flex items-center gap-3 pl-3 flex-shrink-0">
          <div className="hidden sm:flex items-center gap-1.5">
            <span className="text-[10px] font-semibold text-[#556080] uppercase tracking-wider">Winner:</span>
            <div className={`
              px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wide border flex items-center gap-1.5
              ${match.winner 
                ? 'bg-[#6366F1]/15 text-[#A78BFA] border-[#6366F1]/30' 
                : 'bg-[#F59E0B]/15 text-[#FBBF24] border-[#F59E0B]/30'
              }
            `}>
              {match.winner ? (
                <>
                  <div className="w-1.5 h-1.5 rounded-full bg-[#A78BFA] shadow-[0_0_6px_#A78BFA]" />
                  {match.winner} Won
                </>
              ) : (
                <>
                  <div className="w-1.5 h-1.5 rounded-full bg-[#FBBF24] shadow-[0_0_6px_#FBBF24]" />
                  Draw
                </>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-1 text-[#556080] hover:text-white transition-colors ml-1">
            <span className="text-[10px] font-semibold uppercase tracking-wider hidden sm:block">Expand</span>
            <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-all bg-white/[0.03] ${isExpanded ? 'bg-white/10 text-white rotate-180' : ''}`}>
              <ChevronDown size={14} />
            </div>
          </div>
        </div>
      </button>

      {/* Expanded Details */}
      <div className={`
        grid transition-all duration-300 ease-in-out
        ${isExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}
      `}>
        <div className="overflow-hidden">
          <div className="px-5 pb-5 pt-1">
            <div className="w-full h-px bg-gradient-to-r from-transparent via-white/[0.1] to-transparent mb-4" />
            
            {/* Mobile Winner Badge (shown only on small screens when expanded) */}
            <div className="sm:hidden flex items-center gap-1.5 mb-4 justify-center">
              <span className="text-[10px] font-semibold text-[#556080] uppercase tracking-wider">Winner:</span>
              <div className={`
                px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wide border flex items-center gap-1.5
                ${match.winner 
                  ? 'bg-[#6366F1]/15 text-[#A78BFA] border-[#6366F1]/30' 
                  : 'bg-[#F59E0B]/15 text-[#FBBF24] border-[#F59E0B]/30'
                }
              `}>
                {match.winner ? (
                  <>
                    <div className="w-1.5 h-1.5 rounded-full bg-[#A78BFA] shadow-[0_0_6px_#A78BFA]" />
                    {match.winner} Won
                  </>
                ) : (
                  <>
                    <div className="w-1.5 h-1.5 rounded-full bg-[#FBBF24] shadow-[0_0_6px_#FBBF24]" />
                    Draw
                  </>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-[#0b1022] rounded-xl p-3 border border-white/[0.04]">
                <div className="text-[10px] font-bold text-[#556080] uppercase tracking-wider mb-1.5 flex items-center gap-1">
                  <Hash size={11} className="text-[#A78BFA]" /> Moves
                </div>
                <div className="font-semibold text-base text-white">{match.numberOfMoves}</div>
              </div>

              <div className="bg-[#0b1022] rounded-xl p-3 border border-white/[0.04]">
                <div className="text-[10px] font-bold text-[#556080] uppercase tracking-wider mb-1.5 flex items-center gap-1">
                  <Clock size={11} className="text-[#A78BFA]" /> Duration
                </div>
                <div className="font-semibold text-base text-white">{match.duration}s</div>
              </div>

              <div className="bg-[#0b1022] rounded-xl p-3 border border-white/[0.04]">
                <div className="text-[10px] font-bold text-[#556080] uppercase tracking-wider mb-1.5 flex items-center gap-1">
                  <Grid3X3 size={11} className="text-[#A78BFA]" /> Board Size
                </div>
                <div className="font-semibold text-base text-white">{match.boardSize}×{match.boardSize}</div>
              </div>

              <div className="bg-[#0b1022] rounded-xl p-3 border border-white/[0.04]">
                <div className="text-[10px] font-bold text-[#556080] uppercase tracking-wider mb-1.5 flex items-center gap-1">
                  <Settings2 size={11} className="text-[#A78BFA]" /> Difficulty
                </div>
                <div className="font-semibold text-base text-white capitalize">{match.difficulty ?? 'N/A'}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
