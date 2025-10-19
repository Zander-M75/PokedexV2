# 🎮 Pokédex GB

A nostalgic Game Boy-style Pokédex built with React, Vite, TypeScript, and Tailwind CSS. Features a retro monochrome green aesthetic inspired by the original Game Boy handheld.

## ✨ Features

- **🎨 Authentic Game Boy Design**: Complete with shell, D-pad, A/B buttons, and monochrome green screen
- **🔍 Smart Search**: Debounced search with real-time filtering
- **🏷️ Type Filtering**: Multi-select type filters to narrow down Pokémon
- **📜 Infinite Scroll**: Smooth loading of Pokémon with intersection observer
- **⚡ Performance**: Client-side caching, lazy image loading, and optimized rendering
- **♿ Accessible**: Keyboard navigation (Enter/Esc, A/B keys), ARIA labels, focus management
- **📱 Responsive**: Mobile-first design that works from 360px to desktop
- **🎯 Modern Stack**: React 18, TypeScript, Zustand state management, Tailwind CSS

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The app will be available at `http://localhost:5173`

## 🎮 Controls

### Keyboard

- **Arrow Keys / Tab**: Navigate between Pokémon cards
- **Enter / A**: Open selected Pokémon details
- **Escape / B**: Close modal
- **Type in search**: Filter by name

### Mouse/Touch

- **Click card**: View Pokémon details
- **Click filters**: Toggle type filters
- **Scroll**: Infinite scroll loads more Pokémon

## 🏗️ Project Structure

```
src/
├── components/
│   ├── GameBoyFrame.tsx    # Decorative Game Boy shell
│   ├── Screen.tsx           # Green monochrome screen wrapper
│   ├── Header.tsx           # App header with title
│   ├── Toolbar.tsx          # Search and filter controls
│   ├── PokedexGrid.tsx      # Pokémon grid with infinite scroll
│   ├── PokemonCard.tsx      # Individual Pokémon card
│   └── PokemonModal.tsx     # Detail modal with stats
├── api.ts                   # PokéAPI integration
├── store.ts                 # Zustand state management
├── types.ts                 # TypeScript interfaces
├── App.tsx                  # Main app component
├── main.tsx                 # Entry point
└── index.css                # Global styles & utilities
```

## 🎨 Design System

### Color Palette

- **Screen Dark**: `#0f380f` - Darkest green for backgrounds
- **Screen Mid**: `#306230` - Mid-tone green for UI elements
- **Screen Light**: `#8bac0f` - Bright green for text/borders
- **Shell**: `#e8e8d0` - Off-white for Game Boy body

### Typography

- **Font**: Press Start 2P (Google Fonts) - Authentic pixel font
- **Sizes**: Responsive from 8px (mobile) to 16px (desktop)

## 🔌 API

This app uses the free [PokéAPI](https://pokeapi.co/) for all Pokémon data:

- List endpoint: `/pokemon?limit=24&offset=X`
- Detail endpoint: `/pokemon/{id}`
- Types endpoint: `/type`

Data is cached in-memory to minimize API calls and improve performance.

## 🎯 Acceptance Criteria

- ✅ Grid renders first 24 Pokémon within 1s
- ✅ Search filters with <250ms debounce
- ✅ Type filters update grid instantly
- ✅ Modal opens within 300ms (cached)
- ✅ Esc/B closes modal with focus return
- ✅ Mobile layout works at 360px width
- ✅ Keyboard accessible throughout
- ✅ Lazy loading images on scroll

## 🚀 Performance Optimizations

1. **Lazy Loading**: Images load only when in viewport
2. **Debounced Search**: 250ms delay prevents excessive filtering
3. **Client Cache**: Pokémon details cached after first fetch
4. **Memoization**: Filtered lists computed only when dependencies change
5. **Intersection Observer**: Efficient infinite scroll detection
6. **Virtual Scrolling Ready**: Grid structure supports future virtualization

## 🧩 Future Enhancements

- [ ] Favorites system with localStorage
- [ ] Compare two Pokémon side-by-side
- [ ] Type effectiveness chart
- [ ] Sound effects toggle (authentic Game Boy blips)
- [ ] Generation filter
- [ ] Shiny variant toggle
- [ ] Evolution chain display
- [ ] Ability/move details on hover

## 📄 License

MIT License - feel free to use this project however you'd like!

## 🙏 Credits

- Pokémon data from [PokéAPI](https://pokeapi.co/)
- Press Start 2P font from Google Fonts
- Inspired by the Nintendo Game Boy (1989)

---

Built with ❤️ and nostalgia

