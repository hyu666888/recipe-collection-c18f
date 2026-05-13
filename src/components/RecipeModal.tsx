import { useEffect } from 'react'
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
  onClose: () => void
}

export function RecipeModal({ recipe, isFavorite, onToggleFavorite, onClose }: Props) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-label={recipe.title}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-terracotta-900/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Sheet */}
      <div className="relative w-full sm:max-w-lg bg-cream-50 rounded-t-3xl sm:rounded-2xl overflow-hidden max-h-[92dvh] sm:max-h-[88vh] flex flex-col">
        {/* Hero image */}
        <div className="relative h-52 shrink-0 overflow-hidden">
          <img
            src={recipe.photo}
            alt={recipe.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-terracotta-900/60 via-transparent to-transparent" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 left-4 w-9 h-9 rounded-full bg-cream-50/80 backdrop-blur-sm flex items-center justify-center"
            aria-label="Close"
          >
            <svg className="w-5 h-5 text-terracotta-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Fav button */}
          <button
            onClick={() => onToggleFavorite(recipe.id)}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-cream-50/80 backdrop-blur-sm flex items-center justify-center"
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
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

          {/* Title overlay */}
          <div className="absolute bottom-4 left-4 right-4">
            <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium font-sans mb-1 ${CUISINE_COLORS[recipe.cuisine] ?? 'bg-cream-200 text-terracotta-700'}`}>
              {recipe.cuisine}
            </span>
            <h2 className="font-serif text-2xl text-cream-50 leading-tight">{recipe.title}</h2>
          </div>
        </div>

        {/* Scrollable content */}
        <div className="overflow-y-auto flex-1 px-5 py-5 space-y-6">
          {/* Meta row */}
          <div className="flex gap-4 text-sm font-sans text-sage-700">
            <div className="flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <span>Prep {recipe.prepTime}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z" />
              </svg>
              <span>Cook {recipe.cookTime}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0" />
              </svg>
              <span>Serves {recipe.servings}</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-sage-800 font-sans text-sm leading-relaxed italic">{recipe.description}</p>

          {/* Ingredients */}
          <section>
            <h3 className="font-serif text-xl text-terracotta-700 mb-3">Ingredients</h3>
            <ul className="space-y-2">
              {recipe.ingredients.map((ing, i) => (
                <li key={i} className="flex gap-3 text-sm font-sans">
                  <span className="w-24 shrink-0 text-terracotta-500 font-medium">{ing.amount}</span>
                  <span className="text-sage-900">{ing.item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Steps */}
          <section className="pb-4">
            <h3 className="font-serif text-xl text-terracotta-700 mb-3">Instructions</h3>
            <ol className="space-y-4">
              {recipe.steps.map((step, i) => (
                <li key={i} className="flex gap-3 text-sm font-sans">
                  <span className="w-6 h-6 shrink-0 flex items-center justify-center rounded-full bg-terracotta-500 text-cream-50 text-xs font-medium mt-0.5">
                    {i + 1}
                  </span>
                  <p className="text-sage-900 leading-relaxed">{step}</p>
                </li>
              ))}
            </ol>
          </section>
        </div>
      </div>
    </div>
  )
}
