import type { Cuisine } from '../types'

type Filter = Cuisine | 'All'

const FILTERS: Filter[] = ['All', 'Italian', 'Asian', 'Mexican', 'American']

interface Props {
  active: Filter
  onChange: (f: Filter) => void
}

export function FilterBar({ active, onChange }: Props) {
  return (
    <div className="flex gap-2 flex-wrap">
      {FILTERS.map(f => (
        <button
          key={f}
          onClick={() => onChange(f)}
          className={`px-4 py-1.5 rounded-full text-sm font-medium font-sans transition-colors ${
            active === f
              ? 'bg-terracotta-500 text-cream-50'
              : 'bg-cream-200 text-terracotta-700 hover:bg-cream-300'
          }`}
        >
          {f}
        </button>
      ))}
    </div>
  )
}
