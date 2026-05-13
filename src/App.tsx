import { useState } from 'react'
import { recipes } from './data/recipes'
import { useFavorites } from './hooks/useFavorites'
import { RecipeCard } from './components/RecipeCard'
import { RecipeModal } from './components/RecipeModal'
import { FilterBar } from './components/FilterBar'
import { FavoritesShelf } from './components/FavoritesShelf'
import type { Recipe, Cuisine } from './types'

type Filter = Cuisine | 'All'

export default function App() {
  const { favorites, toggle } = useFavorites()
  const [activeFilter, setActiveFilter] = useState<Filter>('All')
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null)
  const [query, setQuery] = useState('')

  const filteredRecipes = recipes.filter(r => {
    const matchesCuisine = activeFilter === 'All' || r.cuisine === activeFilter
    const matchesQuery = r.title.toLowerCase().includes(query.toLowerCase())
    return matchesCuisine && matchesQuery
  })

  const favoriteRecipes = recipes.filter(r => favorites.has(r.id))

  return (
    <div className="min-h-dvh bg-cream-100">
      {/* Header */}
      <header className="bg-terracotta-500 px-4 pt-10 pb-6">
        <p className="font-sans text-terracotta-200 text-sm tracking-widest uppercase mb-1">Your kitchen</p>
        <h1 className="font-serif text-3xl text-cream-50 italic">Recipe Collection</h1>
      </header>

      <main className="px-4 py-6 max-w-2xl mx-auto">
        {/* Favorites shelf */}
        <FavoritesShelf
          recipes={favoriteRecipes}
          onOpen={setSelectedRecipe}
          onToggleFavorite={toggle}
        />

        {/* Filter + recipe grid */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-serif text-xl text-terracotta-800">All Recipes</h2>
            <span className="font-sans text-sm text-sage-600">{filteredRecipes.length} recipes</span>
          </div>

          {/* Sticky search + filter */}
          <div className="sticky top-0 z-10 bg-cream-100 pt-1 pb-3 -mx-4 px-4">
            <div className="relative mb-3">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-sage-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
              </svg>
              <input
                type="search"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search recipes…"
                className="w-full pl-9 pr-9 py-2.5 rounded-xl bg-cream-50 border border-cream-300 font-sans text-sm text-terracotta-900 placeholder-sage-400 focus:outline-none focus:border-terracotta-400 focus:ring-1 focus:ring-terracotta-300"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-sage-400 hover:text-sage-600"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
            <FilterBar active={activeFilter} onChange={setActiveFilter} />
          </div>

          {filteredRecipes.length > 0 ? (
            <div className="grid grid-cols-2 gap-4">
              {filteredRecipes.map(recipe => (
                <RecipeCard
                  key={recipe.id}
                  recipe={recipe}
                  isFavorite={favorites.has(recipe.id)}
                  onToggleFavorite={toggle}
                  onClick={() => setSelectedRecipe(recipe)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="font-serif text-2xl text-sage-400 italic">No recipes found</p>
              <p className="font-sans text-sm text-sage-500 mt-2">
                {query ? `Nothing matches "${query}"` : 'Try a different cuisine filter'}
              </p>
            </div>
          )}
        </section>
      </main>

      {/* Modal */}
      {selectedRecipe && (
        <RecipeModal
          recipe={selectedRecipe}
          isFavorite={favorites.has(selectedRecipe.id)}
          onToggleFavorite={toggle}
          onClose={() => setSelectedRecipe(null)}
        />
      )}
    </div>
  )
}
