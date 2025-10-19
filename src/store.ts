import { create } from 'zustand';
import { AppState } from './types';

export const useStore = create<AppState>((set) => ({
  query: '',
  selectedTypes: [],
  generation: null,
  pokemonList: [],
  nextUrl: 'https://pokeapi.co/api/v2/pokemon?limit=150&offset=0',
  loading: false,
  cache: {},
  selectedId: null,

  setQuery: (query) => set({ query }),
  
  toggleType: (type) =>
    set((state) => ({
      selectedTypes: state.selectedTypes.includes(type)
        ? state.selectedTypes.filter((t) => t !== type)
        : [...state.selectedTypes, type],
    })),
  
  setGeneration: (generation) => set({ generation }),
  
  setSelectedId: (selectedId) => set({ selectedId }),
  
  addPokemon: (pokemon) =>
    set((state) => {
      // Create a map of existing pokemon by ID to avoid duplicates
      const existingIds = new Set(state.pokemonList.map(p => p.id));
      const newPokemon = pokemon.filter(p => !existingIds.has(p.id));
      
      return {
        pokemonList: [...state.pokemonList, ...newPokemon],
      };
    }),
  
  setNextUrl: (nextUrl) => set({ nextUrl }),
  
  setLoading: (loading) => set({ loading }),
  
  cachePokemon: (id, detail) =>
    set((state) => ({
      cache: { ...state.cache, [id]: detail },
    })),
  
  clearFilters: () =>
    set({
      query: '',
      selectedTypes: [],
      generation: null,
    }),
  
  reset: () =>
    set({
      query: '',
      selectedTypes: [],
      generation: null,
      pokemonList: [],
      nextUrl: 'https://pokeapi.co/api/v2/pokemon?limit=150&offset=0',
      loading: false,
      selectedId: null,
    }),
}));

