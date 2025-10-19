import { useEffect, useRef, useMemo } from 'react';
import { useStore } from '../store';
import PokemonCard from './PokemonCard';

interface PokedexGridProps {
  onLoadMore: () => void;
}

export default function PokedexGrid({ onLoadMore }: PokedexGridProps) {
  const { pokemonList, query, selectedTypes, loading, nextUrl, setSelectedId } = useStore();
  const sentinelRef = useRef<HTMLDivElement>(null);

  // Filter pokemon client-side
  const filteredPokemon = useMemo(() => {
    return pokemonList.filter((pokemon) => {
      // Filter by search query
      if (query && !pokemon.name.toLowerCase().includes(query.toLowerCase())) {
        return false;
      }

      // Filter by selected types (OR logic - has ANY of the selected types)
      if (selectedTypes.length > 0) {
        const hasAnyType = selectedTypes.some((type) =>
          pokemon.types.includes(type)
        );
        if (!hasAnyType) return false;
      }

      return true;
    });
  }, [pokemonList, query, selectedTypes]);

  // Infinite scroll observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && nextUrl) {
          onLoadMore();
        }
      },
      { threshold: 0.1 }
    );

    if (sentinelRef.current) {
      observer.observe(sentinelRef.current);
    }

    return () => observer.disconnect();
  }, [loading, nextUrl, onLoadMore]);

  const handleCardClick = (id: number) => {
    setSelectedId(id);
  };

  const handleKeyDown = (e: React.KeyboardEvent, id: number) => {
    if (e.key === 'Enter' || e.key === ' ' || e.key === 'a' || e.key === 'A') {
      e.preventDefault();
      setSelectedId(id);
    }
  };

  if (pokemonList.length === 0 && loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <div className="text-gb-screenLight text-sm mb-2">LOADING...</div>
          <div className="w-32 h-2 bg-gb-screenDark border border-gb-screenLight/30 rounded overflow-hidden">
            <div className="h-full bg-gb-screenLight animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  if (filteredPokemon.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center px-4">
          <div className="text-gb-screenLight text-sm mb-2">NO POKEMON FOUND</div>
          <p className="text-gb-screenMid text-[10px]">
            Try adjusting your search or filters
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto scrollbar-gb px-3 py-3">
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
        {filteredPokemon.map((pokemon) => (
          <PokemonCard
            key={pokemon.id}
            pokemon={pokemon}
            onClick={() => handleCardClick(pokemon.id)}
            onKeyDown={(e) => handleKeyDown(e, pokemon.id)}
          />
        ))}
      </div>

      {/* Sentinel for infinite scroll */}
      {nextUrl && (
        <div ref={sentinelRef} className="py-4 text-center">
          {loading && (
            <div className="text-gb-screenMid text-[10px]">LOADING MORE...</div>
          )}
        </div>
      )}

      {!nextUrl && !loading && (
        <div className="py-4 text-center">
          <div className="text-gb-screenMid text-[10px]">END OF POKEDEX</div>
        </div>
      )}
    </div>
  );
}

