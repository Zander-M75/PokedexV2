import { useEffect } from 'react';
import GameBoyFrame from './components/GameBoyFrame';
import Screen from './components/Screen';
import Header from './components/Header';
import Toolbar from './components/Toolbar';
import PokedexGrid from './components/PokedexGrid';
import PokemonModal from './components/PokemonModal';
import { useStore } from './store';
import { fetchPokemonList } from './api';

function App() {
  const { 
    nextUrl, 
    setLoading, 
    addPokemon, 
    setNextUrl,
    selectedId,
    setSelectedId,
    pokemonList,
  } = useStore();

  // Load initial pokemon
  useEffect(() => {
    const loadInitial = async () => {
      // Only load if we don't have any pokemon yet
      if (nextUrl && pokemonList.length === 0) {
        setLoading(true);
        try {
          const { pokemon, nextUrl: next } = await fetchPokemonList(nextUrl);
          addPokemon(pokemon);
          setNextUrl(next);
        } catch (error) {
          console.error('Failed to load pokemon:', error);
        } finally {
          setLoading(false);
        }
      }
    };
    loadInitial();
  }, []); // Only run once on mount

  const handleLoadMore = async () => {
    if (nextUrl) {
      setLoading(true);
      try {
        const { pokemon, nextUrl: next } = await fetchPokemonList(nextUrl);
        addPokemon(pokemon);
        setNextUrl(next);
      } catch (error) {
        console.error('Failed to load more pokemon:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'b' || e.key === 'B') {
        if (selectedId !== null) {
          setSelectedId(null);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedId, setSelectedId]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-8">
      <GameBoyFrame>
        <Screen>
          <Header />
          <Toolbar />
          <PokedexGrid onLoadMore={handleLoadMore} />
        </Screen>
      </GameBoyFrame>
      
      {/* Footer */}
      <footer className="mt-8 text-center text-gb-screenLight/70 text-xs">
        <p>
          Made by <span className="text-gb-screenLightest font-semibold">Zander Marenberg</span> for fun
        </p>
        <p className="mt-1 text-[10px] text-gb-screenLight/80">
          Built with React · Tailwind CSS · PokéAPI
        </p>
      </footer>
      
      {selectedId && <PokemonModal />}
    </div>
  );
}

export default App;

