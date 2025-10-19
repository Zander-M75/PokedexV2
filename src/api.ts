import { PokemonDetail, PokemonSummary } from './types';

const API_BASE = 'https://pokeapi.co/api/v2';

interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<{
    name: string;
    url: string;
  }>;
}

export const fetchPokemonList = async (url: string): Promise<{
  pokemon: PokemonSummary[];
  nextUrl: string | null;
}> => {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Failed to fetch pokemon list');
  
  const data: PokemonListResponse = await response.json();
  
  // Fetch basic info for each pokemon in parallel
  const pokemonPromises = data.results.map(async (item) => {
    const id = parseInt(item.url.split('/').filter(Boolean).pop() || '0');
    
    // Fetch the pokemon data to get sprite and types
    const pokemonResponse = await fetch(item.url);
    const pokemonData = await pokemonResponse.json();
    
    return {
      id,
      name: item.name,
      sprite: pokemonData.sprites.front_default || '',
      types: pokemonData.types.map((t: any) => t.type.name),
    };
  });
  
  const pokemon = await Promise.all(pokemonPromises);
  
  // Adjust the next URL to use a reasonable batch size (50) for subsequent loads
  let adjustedNextUrl = data.next;
  if (adjustedNextUrl) {
    adjustedNextUrl = adjustedNextUrl.replace(/limit=\d+/, 'limit=50');
  }
  
  return {
    pokemon,
    nextUrl: adjustedNextUrl,
  };
};

export const fetchPokemonDetail = async (id: number): Promise<PokemonDetail> => {
  const response = await fetch(`${API_BASE}/pokemon/${id}`);
  if (!response.ok) throw new Error(`Failed to fetch pokemon ${id}`);
  
  const data = await response.json();
  
  return {
    id: data.id,
    name: data.name,
    sprites: {
      front_default: data.sprites.front_default,
      front_shiny: data.sprites.front_shiny,
      back_default: data.sprites.back_default,
      back_shiny: data.sprites.back_shiny,
    },
    types: data.types,
    stats: data.stats,
    height: data.height,
    weight: data.weight,
    abilities: data.abilities,
    moves: data.moves.slice(0, 10), // Limit to first 10 moves
  };
};

export const fetchTypes = async (): Promise<string[]> => {
  const response = await fetch(`${API_BASE}/type`);
  if (!response.ok) throw new Error('Failed to fetch types');
  
  const data = await response.json();
  return data.results
    .map((t: any) => t.name)
    .filter((name: string) => !['unknown', 'shadow'].includes(name));
};

export const fetchPokemonByType = async (type: string): Promise<number[]> => {
  const response = await fetch(`${API_BASE}/type/${type}`);
  if (!response.ok) throw new Error(`Failed to fetch type ${type}`);
  
  const data = await response.json();
  return data.pokemon.map((p: any) => {
    const id = parseInt(p.pokemon.url.split('/').filter(Boolean).pop() || '0');
    return id;
  });
};

