import React, { useState, useEffect } from 'react';

/** 
 * Decorative Animated Tic-Tac-Toe Board Component 
 * Simulates a quick game playing out in a loop.
 */
export const AnimatedBoardPreview: React.FC = () => {
  const [board, setBoard] = useState<(string | null)[]>(Array(9).fill(null));
  const [winLine, setWinLine] = useState<number[] | null>(null);

  useEffect(() => {
    let cancelled = false;

    const playSequence = async () => {
      // The sequence of moves to demonstrate a win
      const moves = [
        { index: 4, symbol: 'X' }, // Center
        { index: 0, symbol: 'O' }, // Top Left
        { index: 2, symbol: 'X' }, // Top Right
        { index: 6, symbol: 'O' }, // Bottom Left
        { index: 8, symbol: 'X' }, // Bottom Right
        { index: 3, symbol: 'O' }, // Middle Left
        { index: 5, symbol: 'X' }, // Middle Right
      ];

      // Reset
      setBoard(Array(9).fill(null));
      setWinLine(null);
      await new Promise((r) => setTimeout(r, 800));
      if (cancelled) return;

      for (let i = 0; i < moves.length; i++) {
        setBoard((prev) => {
          const newBoard = [...prev];
          newBoard[moves[i].index] = moves[i].symbol;
          return newBoard;
        });
        await new Promise((r) => setTimeout(r, 600));
        if (cancelled) return;
      }

      // Show win line on center cell
      setWinLine([4]);
      await new Promise((r) => setTimeout(r, 2000));
      if (cancelled) return;

      // Loop
      playSequence();
    };

    playSequence();
    return () => { cancelled = true; };
  }, []);

  return (
    <div className="relative w-full aspect-square mx-auto max-w-[380px]">
      {/* Glow behind the board */}
      <div className="absolute inset-0 bg-[#4F46E5]/20 blur-[80px] rounded-full animate-pulse-glow" />

      {/* Background Particles (using absolute divs) */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-0 w-1 h-1 bg-cyan-400 rounded-full blur-[1px] animate-pulse" />
        <div className="absolute bottom-1/4 right-0 w-1.5 h-1.5 bg-purple-400 rounded-full blur-[1px] animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 -left-4 w-1 h-1 bg-blue-400 rounded-full blur-[0.5px]" />
        <div className="absolute bottom-1/3 -right-6 w-1 h-1 bg-cyan-300 rounded-full blur-[1px] animate-pulse" style={{ animationDelay: '0.5s' }} />
      </div>

      {/* The Board */}
      <div className="relative z-10 w-full h-full rounded-3xl p-4 md:p-6 shadow-[0_0_40px_rgba(79,70,229,0.3),inset_0_0_20px_rgba(79,70,229,0.2)] border border-[#4F46E5]/50 grid grid-cols-3 gap-2 bg-[#0c1226]/80 backdrop-blur-xl">
        {board.map((cell, index) => {
          const isWinningCell = winLine?.includes(index);
          return (
            <div
              key={index}
              className={`
                rounded-xl flex items-center justify-center text-5xl md:text-6xl font-bold transition-all duration-300
                bg-transparent border border-[#4F46E5]/20
                ${cell ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}
                ${isWinningCell ? 'bg-[#4F46E5]/10 shadow-[inset_0_0_15px_rgba(79,70,229,0.3)]' : ''}
              `}
            >
              {cell === 'X' && (
                <span className={`text-[#A78BFA] animate-bounce-in drop-shadow-[0_0_15px_rgba(167,139,250,0.8)]`}>
                  X
                </span>
              )}
              {cell === 'O' && (
                <span className={`text-[#22D3EE] animate-bounce-in drop-shadow-[0_0_15px_rgba(34,211,238,0.8)]`}>
                  O
                </span>
              )}
            </div>
          );
        })}
        {/* Winning Line Overlay */}
        {winLine && (
          <div className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center animate-fade-in">
            <div className="w-[110%] h-1.5 bg-[#A78BFA] shadow-[0_0_20px_rgba(167,139,250,1),0_0_40px_rgba(167,139,250,0.6)] transform rotate-45 flex items-center justify-center relative rounded-full">
              <div className="absolute w-2.5 h-2.5 bg-white rounded-full left-[15%] shadow-[0_0_10px_white]"></div>
              <div className="absolute w-2.5 h-2.5 bg-white rounded-full right-[15%] shadow-[0_0_10px_white]"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

