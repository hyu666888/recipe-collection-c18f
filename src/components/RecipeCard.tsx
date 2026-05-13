import type { Recipe } from '../types'

const CUISINE_COLORS: Record<string, string> = {
  Italian: 'bg-terracotta-100 text-terracotta-700',
  Asian:   'bg-sage-100 text-sage-700',
  Mexican: 'bg-amber-100 text-amber-700',
  American:'bg-cream-300 text-terracotta-800',
}

interface Props {
  recipe: Recipe
  isFavorite: boolean
  onToggleFavorite: (id: string) => void
  onClick: () => void
}

export function RecipeCard({ recipe, isFavorite, onToggleFavorite, onClick }: Props) {
  return (
    <article
      onClick={onClick}
      className="group relative bg-cream-50 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
    >
      <div className="relative h-44 overflow-hidden">
        <img
          src={recipe.photo}
          alt={recipe.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <button
          onClick={e => { e.stopPropagation(); onToggleFavorite(recipe.id) }}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-cream-50/80 backdrop-blur-sm transition-colors hover:bg-cream-50"
        >
          {isFavorite ? (
            <svg className="w-5 h-5 text-terracotta-500 fill-current" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          ) : (
            <svg className="w-5 h-5 text-terracotta-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          )}
        </button>
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-1">
          <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium font-sans ${CUISINE_COLORS[recipe.cuisine] ?? 'bg-cream-200 text-terracotta-700'}`}>
            {recipe.cuisine}
          </span>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-sage-100 text-sage-700 text-xs font-sans">
            <svg className="w-3 h-3" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9 6a1 1 0 000 2h2a1 1 0 100-2H9zM7 9a1 1 0 011-1h4a1 1 0 010 2H8a1 1 0 01-1-1zm-1 4a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1z" />
              <path fillRule="evenodd" d="M3 4a2 2 0 012-2h10a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V4zm2-1a1 1 0 00-1 1v12a1 1 0 001 1h10a1 1 0 001-1V4a1 1 0 00-1-1H5z" clipRule="evenodd" />
            </svg>
            {recipe.ingredients.length} ingredients
          </span>
        </div>
        <h3 className="font-serif text-lg text-terracotta-800 leading-tight mt-2">{recipe.title}</h3>
        <p className="text-sm text-sage-700 mt-1 font-sans">
          Prep {recipe.prepTime} · Cook {recipe.cookTime}
        </p>
      </div>
    </article>
  )
}
