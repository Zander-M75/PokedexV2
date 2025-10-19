import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useStore } from '../store';
import { fetchPokemonDetail } from '../api';
import { PokemonDetail } from '../types';

export default function PokemonModal() {
  const { selectedId, setSelectedId, cache, cachePokemon } = useStore();
  const [pokemon, setPokemon] = useState<PokemonDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [selectedSprite, setSelectedSprite] = useState<'front_default' | 'front_shiny' | 'back_default' | 'back_shiny'>('front_default');

  useEffect(() => {
    const loadPokemon = async () => {
      if (!selectedId) return;

      // Check cache first
      if (cache[selectedId]) {
        setPokemon(cache[selectedId]);
        return;
      }

      // Fetch from API
      setLoading(true);
      setError(false);
      try {
        const detail = await fetchPokemonDetail(selectedId);
        setPokemon(detail);
        cachePokemon(selectedId, detail);
      } catch (err) {
        console.error('Failed to load pokemon details:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    loadPokemon();
  }, [selectedId, cache, cachePokemon]);

  const handleClose = () => {
    setSelectedId(null);
    setPokemon(null);
    setSelectedSprite('front_default');
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  if (!selectedId) return null;

  const getStatName = (name: string) => {
    const statMap: Record<string, string> = {
      'hp': 'HP',
      'attack': 'ATK',
      'defense': 'DEF',
      'special-attack': 'SpA',
      'special-defense': 'SpD',
      'speed': 'SPD',
    };
    return statMap[name] || name;
  };

  const modal = (
    <div
      className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="bg-gb-screenDark border-4 border-gb-screenLight rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto scrollbar-gb">
        {loading && (
          <div className="p-8 text-center">
            <div className="text-gb-screenLight text-sm mb-4">LOADING DATA...</div>
            <div className="w-32 h-2 bg-gb-screenDark border border-gb-screenLight/30 rounded overflow-hidden mx-auto">
              <div className="h-full bg-gb-screenLight animate-pulse"></div>
            </div>
          </div>
        )}

        {error && (
          <div className="p-8 text-center">
            <div className="text-gb-screenLight text-sm mb-2">CONNECTION ERROR</div>
            <p className="text-gb-screenMid text-xs mb-4">Link cable disconnected</p>
            <button
              onClick={handleClose}
              className="bg-gb-screenMid hover:bg-gb-screenLight hover:text-gb-screenDark border border-gb-screenLight px-4 py-2 rounded text-xs transition-colors"
            >
              CLOSE
            </button>
          </div>
        )}

        {pokemon && !loading && !error && (
          <div className="p-4 sm:p-6">
            {/* Header */}
            <div className="flex items-start justify-between mb-4 pb-3 border-b-2 border-gb-screenLight/20">
              <div>
                <h2 id="modal-title" className="text-gb-screenLightest text-lg sm:text-xl font-bold uppercase">
                  {pokemon.name}
                </h2>
                <div className="text-gb-screenMid text-xs">
                  #{pokemon.id.toString().padStart(3, '0')}
                </div>
              </div>
              <button
                onClick={handleClose}
                className="text-gb-screenLight hover:text-gb-screenLightest text-xl leading-none transition-colors"
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            {/* Sprites */}
            <div className="mb-4">
              <div className="bg-gb-screenMid/30 rounded p-4 flex items-center justify-center mb-2">
                <img
                  src={pokemon.sprites[selectedSprite] || pokemon.sprites.front_default}
                  alt={`${pokemon.name} ${selectedSprite}`}
                  className="w-32 h-32 pixelated"
                  style={{ imageRendering: 'pixelated' }}
                />
              </div>
              <div className="flex gap-2 justify-center">
                {(['front_default', 'front_shiny', 'back_default', 'back_shiny'] as const).map((sprite) => (
                  pokemon.sprites[sprite] && (
                    <button
                      key={sprite}
                      onClick={() => setSelectedSprite(sprite)}
                      className={`px-2 py-1 rounded text-[8px] transition-colors ${
                        selectedSprite === sprite
                          ? 'bg-gb-screenLight text-gb-screenDark'
                          : 'bg-gb-screenMid/40 text-gb-screenLight hover:bg-gb-screenMid/70'
                      }`}
                    >
                      {sprite.replace('_', ' ').toUpperCase()}
                    </button>
                  )
                ))}
              </div>
            </div>

            {/* Types */}
            <div className="mb-4">
              <h3 className="text-gb-screenLight text-xs mb-2 uppercase">Type</h3>
              <div className="flex gap-2">
                {pokemon.types.map((type) => (
                  <span
                    key={type.slot}
                    className="bg-gb-screenMid/60 border border-gb-screenLight/30 px-3 py-1 rounded text-gb-screenLightest text-xs uppercase"
                  >
                    {type.type.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="mb-4">
              <h3 className="text-gb-screenLight text-xs mb-2 uppercase">Stats</h3>
              <div className="space-y-1">
                {pokemon.stats.map((stat) => (
                  <div key={stat.stat.name} className="flex items-center gap-2">
                    <div className="w-12 text-gb-screenMid text-[10px] uppercase">
                      {getStatName(stat.stat.name)}
                    </div>
                    <div className="flex-1 bg-gb-screenDark/60 rounded-full h-4 border border-gb-screenLight/20 overflow-hidden">
                      <div
                        className="bg-gb-screenLight h-full transition-all"
                        style={{ width: `${Math.min((stat.base_stat / 255) * 100, 100)}%` }}
                      ></div>
                    </div>
                    <div className="w-8 text-gb-screenLightest text-xs text-right">
                      {stat.base_stat}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Size */}
            <div className="mb-4">
              <h3 className="text-gb-screenLight text-xs mb-2 uppercase">Size</h3>
              <div className="flex gap-4 text-xs">
                <div>
                  <span className="text-gb-screenMid">Height:</span>{' '}
                  <span className="text-gb-screenLightest">{(pokemon.height / 10).toFixed(1)}m</span>
                </div>
                <div>
                  <span className="text-gb-screenMid">Weight:</span>{' '}
                  <span className="text-gb-screenLightest">{(pokemon.weight / 10).toFixed(1)}kg</span>
                </div>
              </div>
            </div>

            {/* Abilities */}
            <div className="mb-4">
              <h3 className="text-gb-screenLight text-xs mb-2 uppercase">Abilities</h3>
              <div className="flex flex-wrap gap-2">
                {pokemon.abilities.map((ability, idx) => (
                  <span
                    key={idx}
                    className={`px-2 py-1 rounded text-[10px] ${
                      ability.is_hidden
                        ? 'bg-gb-screenLight/20 text-gb-screenLightest border border-gb-screenLight/40'
                        : 'bg-gb-screenMid/40 text-gb-screenLight border border-gb-screenLight/20'
                    }`}
                  >
                    {ability.ability.name.replace('-', ' ').toUpperCase()}
                    {ability.is_hidden && ' (H)'}
                  </span>
                ))}
              </div>
            </div>

            {/* Moves (collapsed by default) */}
            <div>
              <h3 className="text-gb-screenLight text-xs mb-2 uppercase">Sample Moves</h3>
              <div className="flex flex-wrap gap-1">
                {pokemon.moves.slice(0, 8).map((move, idx) => (
                  <span
                    key={idx}
                    className="bg-gb-screenDark/60 border border-gb-screenLight/20 px-2 py-0.5 rounded text-[8px] text-gb-screenMid"
                  >
                    {move.move.name.replace('-', ' ')}
                  </span>
                ))}
              </div>
            </div>

            {/* Close button */}
            <div className="mt-6 pt-4 border-t-2 border-gb-screenLight/20 flex justify-center">
              <button
                onClick={handleClose}
                className="bg-gb-screenMid hover:bg-gb-screenLight hover:text-gb-screenDark border border-gb-screenLight px-6 py-2 rounded text-xs transition-colors font-bold"
              >
                CLOSE [ESC / B]
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return createPortal(modal, document.body);
}

