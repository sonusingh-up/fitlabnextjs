'use client';
import { useState } from 'react';

export interface FilterOption {
  label: string;
  value: string;
  count?: number;
}

export interface FilterGroup {
  title: string;
  key: string;
  options: FilterOption[];
}

interface Props {
  groups: FilterGroup[];
  activeFilters: Record<string, Set<string>>;
  onFilterChange: (key: string, value: string) => void;
  onSearch: (q: string) => void;
  searchQuery: string;
  resultCount: number;
}

export default function FilterSidebar({ groups, activeFilters, onFilterChange, onSearch, searchQuery, resultCount }: Props) {
  const [railOpen, setRailOpen] = useState(false);

  const activeCount = Object.values(activeFilters).reduce((sum, s) => sum + s.size, 0);

  return (
    <>
      <button className={`rail-toggle${railOpen ? ' open' : ''}`} onClick={() => setRailOpen(!railOpen)}>
        <span className="rt-left">
          <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
            <line x1="1" y1="3" x2="13" y2="3"/><line x1="3" y1="7" x2="11" y2="7"/>
            <line x1="5" y1="11" x2="9" y2="11"/>
          </svg>
          Filters
          {activeCount > 0 && <span className="rt-count">{activeCount}</span>}
        </span>
        <span className="rt-arr">▾</span>
      </button>

      <aside className={`rail${railOpen ? ' open' : ''}`}>
        <div className="rail-block">
          <div className="search-box">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="6" cy="6" r="4"/><path d="M10 10l3 3" strokeLinecap="round"/>
            </svg>
            <input
              type="text"
              placeholder="Search…"
              value={searchQuery}
              onChange={e => onSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="rail-block">
          <h4>Results <span className="count">{resultCount}</span></h4>
        </div>

        {groups.map(group => (
          <div key={group.key} className="rail-block">
            <h4>{group.title}</h4>
            <div className="chips">
              {group.options.map(opt => {
                const active = activeFilters[group.key]?.has(opt.value);
                return (
                  <button
                    key={opt.value}
                    className={`chip-filter${active ? ' on' : ''}`}
                    onClick={() => onFilterChange(group.key, opt.value)}
                  >
                    {opt.label}
                    {opt.count !== undefined && <span className="n">{opt.count}</span>}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </aside>
    </>
  );
}
