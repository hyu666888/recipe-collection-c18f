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

  const filteredRecipes = activeFilter === 'All'
    ? recipes
    : recipes.filter(r => r.cuisine === activeFilter)

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

          <div className="mb-5">
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
              <p className="font-serif text-2xl text-sage-400 italic">No recipes here yet</p>
              <p className="font-sans text-sm text-sage-500 mt-2">Try a different cuisine filter</p>
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
