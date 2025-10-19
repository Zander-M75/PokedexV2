import { ReactNode } from 'react';

interface GameBoyFrameProps {
  children: ReactNode;
}

export default function GameBoyFrame({ children }: GameBoyFrameProps) {
  return (
    <div className="relative max-w-4xl w-full mx-auto">
      {/* Main Game Boy Shell */}
      <div className="bg-gb-shell rounded-3xl shadow-2xl p-6 sm:p-8 border-4 border-gb-shellDark">
        {/* Top section with logo */}
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative w-3 h-3">
              <div className="absolute inset-0 rounded-full bg-red-700 shadow-lg"></div>
              <div className="absolute top-0.5 left-0.5 w-1 h-1 rounded-full bg-red-400/60"></div>
            </div>
            <span className="text-gb-accent text-[8px] sm:text-xs font-bold tracking-wider">
              GAME BOY
            </span>
          </div>
          <div className="flex gap-0.5 items-end">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="w-0.5 bg-gb-accent/30 rounded-full shadow-inner"
                style={{ height: `${16 + (i % 3) * 4}px` }}
              ></div>
            ))}
          </div>
        </div>

        {/* Screen */}
        <div className="bg-gray-900 p-3 sm:p-4 rounded-lg shadow-inner mb-6">
          <div className="bg-gb-screenDark p-1 rounded">
            {children}
          </div>
        </div>

        {/* Controls section */}
        <div className="grid grid-cols-2 gap-8 px-4">
          {/* D-Pad */}
          <div className="flex items-center justify-center">
            <svg width="80" height="80" viewBox="0 0 80 80" className="drop-shadow-lg">
              {/* D-Pad cross shape */}
              <g>
                {/* Vertical bar */}
                <rect x="27" y="0" width="26" height="80" fill="#2d3748" rx="2"/>
                {/* Horizontal bar */}
                <rect x="0" y="27" width="80" height="26" fill="#2d3748" rx="2"/>
                
                {/* Center depression */}
                <circle cx="40" cy="40" r="10" fill="#1a202c" opacity="0.5"/>
                
                {/* Directional marks */}
                {/* Up arrow */}
                <path d="M 40 8 L 35 18 L 45 18 Z" fill="#4a5568" opacity="0.6"/>
                {/* Down arrow */}
                <path d="M 40 72 L 35 62 L 45 62 Z" fill="#4a5568" opacity="0.6"/>
                {/* Left arrow */}
                <path d="M 8 40 L 18 35 L 18 45 Z" fill="#4a5568" opacity="0.6"/>
                {/* Right arrow */}
                <path d="M 72 40 L 62 35 L 62 45 Z" fill="#4a5568" opacity="0.6"/>
                
                {/* Subtle highlights for 3D effect */}
                <rect x="27" y="0" width="26" height="2" fill="#4a5568" rx="1"/>
                <rect x="0" y="27" width="2" height="26" fill="#4a5568" rx="1"/>
              </g>
            </svg>
          </div>

          {/* A/B Buttons */}
          <div className="flex items-center justify-center gap-6">
            <div className="text-center -mt-4">
              <div className="relative">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-red-600 to-red-800 shadow-xl flex items-center justify-center border-2 border-red-900">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center shadow-inner">
                    <span className="text-white text-sm font-bold drop-shadow">B</span>
                  </div>
                </div>
                {/* Highlight for 3D effect */}
                <div className="absolute top-1 left-1 w-6 h-6 rounded-full bg-red-400/30 pointer-events-none"></div>
              </div>
              <span className="text-[7px] text-gb-accent/70 mt-1.5 block font-bold tracking-wide">CLOSE</span>
            </div>
            <div className="text-center">
              <div className="relative">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-red-600 to-red-800 shadow-xl flex items-center justify-center border-2 border-red-900">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center shadow-inner">
                    <span className="text-white text-sm font-bold drop-shadow">A</span>
                  </div>
                </div>
                {/* Highlight for 3D effect */}
                <div className="absolute top-1 left-1 w-6 h-6 rounded-full bg-red-400/30 pointer-events-none"></div>
              </div>
              <span className="text-[7px] text-gb-accent/70 mt-1.5 block font-bold tracking-wide">OPEN</span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-6 flex items-center justify-center gap-8">
          <div className="flex flex-col items-center gap-1">
            <div className="w-12 h-2 bg-gradient-to-b from-gray-700 to-gray-900 rounded-md shadow-inner border border-gray-800"></div>
            <span className="text-[7px] text-gb-accent font-bold tracking-widest">SELECT</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="w-12 h-2 bg-gradient-to-b from-gray-700 to-gray-900 rounded-md shadow-inner border border-gray-800"></div>
            <span className="text-[7px] text-gb-accent font-bold tracking-widest">START</span>
          </div>
        </div>

        {/* Nintendo text */}
        <div className="mt-4 text-center">
          <span className="text-gb-accent/50 text-[10px] italic tracking-widest">
            Pokédex Edition
          </span>
        </div>
      </div>
    </div>
  );
}

