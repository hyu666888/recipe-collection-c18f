import type { Recipe } from '../types'

interface Props {
  recipes: Recipe[]
  onOpen: (recipe: Recipe) => void
  onToggleFavorite: (id: string) => void
}

export function FavoritesShelf({ recipes, onOpen, onToggleFavorite }: Props) {
  if (recipes.length === 0) return null

  return (
    <section className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <svg className="w-5 h-5 text-terracotta-500 fill-current" viewBox="0 0 24 24">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
        <h2 className="font-serif text-xl text-terracotta-800">Your Favorites</h2>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
        {recipes.map(recipe => (
          <button
            key={recipe.id}
            onClick={() => onOpen(recipe)}
            className="shrink-0 relative w-32 h-36 rounded-xl overflow-hidden group"
          >
            <img
              src={recipe.photo}
              alt={recipe.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-terracotta-900/70 via-transparent to-transparent" />
            <div className="absolute bottom-2 left-2 right-2">
              <p className="font-serif text-xs text-cream-50 leading-tight line-clamp-2 text-left">{recipe.title}</p>
            </div>
            {/* Unstar button */}
            <button
              onClick={e => { e.stopPropagation(); onToggleFavorite(recipe.id) }}
              className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center rounded-full bg-cream-50/70 backdrop-blur-sm"
              aria-label="Remove from favorites"
            >
              <svg className="w-3.5 h-3.5 text-terracotta-500 fill-current" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </button>
          </button>
        ))}
      </div>
    </section>
  )
}
