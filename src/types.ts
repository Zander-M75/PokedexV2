export interface PokemonSummary {
  id: number;
  name: string;
  sprite: string;
  types: string[];
}

export interface PokemonDetail {
  id: number;
  name: string;
  sprites: {
    front_default: string;
    front_shiny: string;
    back_default: string | null;
    back_shiny: string | null;
  };
  types: Array<{
    slot: number;
    type: {
      name: string;
    };
  }>;
  stats: Array<{
    base_stat: number;
    stat: {
      name: string;
    };
  }>;
  height: number;
  weight: number;
  abilities: Array<{
    ability: {
      name: string;
    };
    is_hidden: boolean;
  }>;
  moves: Array<{
    move: {
      name: string;
    };
  }>;
}

export interface AppState {
  query: string;
  selectedTypes: string[];
  generation: string | null;
  pokemonList: PokemonSummary[];
  nextUrl: string | null;
  loading: boolean;
  cache: Record<number, PokemonDetail>;
  selectedId: number | null;
  setQuery: (query: string) => void;
  toggleType: (type: string) => void;
  setGeneration: (gen: string | null) => void;
  setSelectedId: (id: number | null) => void;
  addPokemon: (pokemon: PokemonSummary[]) => void;
  setNextUrl: (url: string | null) => void;
  setLoading: (loading: boolean) => void;
  cachePokemon: (id: number, detail: PokemonDetail) => void;
  clearFilters: () => void;
  reset: () => void;
}

export interface TypeInfo {
  name: string;
  url: string;
}

