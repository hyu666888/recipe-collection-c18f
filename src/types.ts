export type Cuisine = 'Italian' | 'Asian' | 'Mexican' | 'American'

export interface Ingredient {
  amount: string
  item: string
}

export interface Recipe {
  id: string
  title: string
  cuisine: Cuisine
  photo: string
  cookTime: string
  prepTime: string
  servings: number
  description: string
  ingredients: Ingredient[]
  steps: string[]
}
