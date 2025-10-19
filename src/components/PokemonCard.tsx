import { useState } from 'react';
import { PokemonSummary } from '../types';

interface PokemonCardProps {
  pokemon: PokemonSummary;
  onClick: () => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
}

export default function PokemonCard({ pokemon, onClick, onKeyDown }: PokemonCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={onKeyDown}
      className="bg-gb-screenMid/40 hover:bg-gb-screenMid/70 border border-gb-screenLight/30 rounded p-2 cursor-pointer transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gb-screenLight"
      aria-label={`View details for ${pokemon.name}`}
    >
      <div className="aspect-square bg-gb-screenDark/40 rounded flex items-center justify-center mb-1 relative overflow-hidden">
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-4 h-4 border-2 border-gb-screenLight/30 border-t-gb-screenLight rounded-full animate-spin"></div>
          </div>
        )}
        {imageError ? (
          <div className="text-gb-screenMid text-[10px]">?</div>
        ) : (
          <img
            src={pokemon.sprite}
            alt={pokemon.name}
            className={`w-full h-full object-contain pixelated ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            } transition-opacity`}
            style={{ imageRendering: 'pixelated' }}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            loading="lazy"
          />
        )}
      </div>
      <div className="text-center">
        <div className="text-gb-screenLightest text-[8px] sm:text-[10px] font-bold uppercase truncate">
          {pokemon.name}
        </div>
        <div className="text-gb-screenMid text-[6px] sm:text-[8px]">
          #{pokemon.id.toString().padStart(3, '0')}
        </div>
      </div>
    </div>
  );
}

