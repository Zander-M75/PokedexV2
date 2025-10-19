import { useState, useEffect } from 'react';
import { useStore } from '../store';
import { fetchTypes } from '../api';

export default function Toolbar() {
  const { query, setQuery, selectedTypes, toggleType, clearFilters } = useStore();
  const [types, setTypes] = useState<string[]>([]);
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);
  const [localQuery, setLocalQuery] = useState(query);

  useEffect(() => {
    const loadTypes = async () => {
      try {
        const typeList = await fetchTypes();
        setTypes(typeList);
      } catch (error) {
        console.error('Failed to load types:', error);
      }
    };
    loadTypes();
  }, []);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setQuery(localQuery);
    }, 250);

    return () => clearTimeout(timer);
  }, [localQuery, setQuery]);

  const hasFilters = query || selectedTypes.length > 0;

  return (
    <div className="bg-gb-screenMid/30 border-b-2 border-gb-screenLight/20 px-3 py-2 space-y-2">
      {/* Search bar */}
      <div className="flex items-center gap-2">
        <div className="flex-1 flex items-center bg-gb-screenDark/60 border border-gb-screenLight/30 rounded px-2 py-1">
          <span className="text-gb-screenLight mr-1">🔍</span>
          <input
            type="text"
            value={localQuery}
            onChange={(e) => setLocalQuery(e.target.value)}
            placeholder="SEARCH..."
            className="flex-1 bg-transparent text-gb-screenLightest placeholder-gb-screenMid outline-none text-[10px] sm:text-xs"
            aria-label="Search Pokemon"
          />
        </div>

        {/* Type filter dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowTypeDropdown(!showTypeDropdown)}
            className="bg-gb-screenMid/60 hover:bg-gb-screenMid border border-gb-screenLight/30 px-2 py-1 rounded text-[10px] sm:text-xs text-gb-screenLightest transition-colors"
            aria-label="Filter by type"
          >
            TYPE {selectedTypes.length > 0 && `(${selectedTypes.length})`} ▼
          </button>

          {showTypeDropdown && (
            <div className="absolute top-full right-0 mt-1 bg-gb-screenDark border-2 border-gb-screenLight/50 rounded shadow-lg z-20 max-h-48 overflow-y-auto scrollbar-gb w-48">
              <div className="p-2 grid grid-cols-2 gap-1">
                {types.map((type) => (
                  <button
                    key={type}
                    onClick={() => toggleType(type)}
                    className={`px-2 py-1 rounded text-[8px] sm:text-[10px] transition-colors ${
                      selectedTypes.includes(type)
                        ? 'bg-gb-screenLight text-gb-screenDark font-bold'
                        : 'bg-gb-screenMid/40 text-gb-screenLight hover:bg-gb-screenMid/70'
                    }`}
                  >
                    {type.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Clear filters */}
        {hasFilters && (
          <button
            onClick={clearFilters}
            className="bg-gb-screenMid/60 hover:bg-gb-screenMid border border-gb-screenLight/30 px-2 py-1 rounded text-[10px] sm:text-xs text-gb-screenLightest transition-colors"
            aria-label="Clear filters"
          >
            CLEAR
          </button>
        )}
      </div>

      {/* Selected type chips */}
      {selectedTypes.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {selectedTypes.map((type) => (
            <span
              key={type}
              className="bg-gb-screenLight/20 border border-gb-screenLight/40 px-2 py-0.5 rounded text-[8px] text-gb-screenLightest flex items-center gap-1"
            >
              {type}
              <button
                onClick={() => toggleType(type)}
                className="hover:text-red-400"
                aria-label={`Remove ${type} filter`}
              >
                ✕
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

