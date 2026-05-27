'use client'

import { useState } from 'react'
import { Clock, PoundSterling, Flame, ChefHat, Dumbbell, X } from 'lucide-react'
import { mealLibrary, mealTypeLabel, type LibraryMeal } from '@/lib/meal-library'

const tabs: LibraryMeal['mealType'][] = ['breakfast', 'lunch', 'dinner', 'snack']

const tabEmoji: Record<LibraryMeal['mealType'], string> = {
  breakfast: '🌅',
  lunch: '☀️',
  dinner: '🌙',
  snack: '🍎',
}

export function RecipeLibrary() {
  const [activeTab, setActiveTab] = useState<LibraryMeal['mealType']>('dinner')
  const [selected, setSelected] = useState<LibraryMeal | null>(null)

  const meals = mealLibrary.filter((m) => m.mealType === activeTab)

  return (
    <div className="space-y-4">
      {/* Tabs */}
      <div className="flex gap-2 flex-wrap">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-semibold transition-all ${
              activeTab === tab
                ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-200'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {tabEmoji[tab]} {mealTypeLabel[tab]}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid sm:grid-cols-2 gap-3">
        {meals.map((meal) => (
          <button
            key={meal.id}
            onClick={() => setSelected(meal)}
            className="text-left rounded-2xl border border-gray-100 bg-white overflow-hidden hover:border-emerald-200 hover:shadow-md transition-all group"
          >
            {/* Recipe photo */}
            <div className="relative h-36 bg-gray-100 overflow-hidden">
              {meal.imageUrl ? (
                <img
                  src={meal.imageUrl}
                  alt={meal.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                  onError={(e) => {
                    const target = e.currentTarget
                    target.style.display = 'none'
                    const parent = target.parentElement
                    if (parent) {
                      parent.innerHTML = `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:2.5rem;background:#f3f4f6">${meal.emoji}</div>`
                    }
                  }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-5xl bg-gray-50">{meal.emoji}</div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              <div className="absolute top-2 right-2 flex flex-wrap gap-1">
                {meal.tags.slice(0, 1).map((tag) => (
                  <span key={tag} className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-600/90 text-white backdrop-blur-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-3">
              <p className="font-semibold text-gray-900 text-sm leading-tight">{meal.name}</p>
              <p className="text-xs text-gray-500 mt-0.5 line-clamp-1 leading-relaxed">{meal.description}</p>
              <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
                <span className="flex items-center gap-1">
                  <Flame className="h-3 w-3 text-orange-400" />
                  {meal.calories} kcal
                </span>
                <span className="flex items-center gap-1">
                  <Dumbbell className="h-3 w-3 text-blue-400" />
                  {meal.proteinG}g protein
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3 text-gray-400" />
                  {meal.prepMinutes}m
                </span>
                <span className="flex items-center gap-1">
                  <PoundSterling className="h-3 w-3 text-emerald-500" />
                  {meal.costGBP.toFixed(2)}
                </span>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Recipe modal */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={() => setSelected(null)}
        >
          <div
            className="w-full max-w-lg bg-white rounded-3xl shadow-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Hero image */}
            <div className="relative h-48 rounded-t-3xl overflow-hidden bg-gray-100">
              {selected.imageUrl ? (
                <img
                  src={selected.imageUrl}
                  alt={selected.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.currentTarget
                    target.style.display = 'none'
                    const parent = target.parentElement
                    if (parent) {
                      parent.innerHTML = `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:4rem;background:#f3f4f6">${selected.emoji}</div>`
                    }
                  }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-7xl bg-gray-50">{selected.emoji}</div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <button
                onClick={() => setSelected(null)}
                className="absolute top-3 right-3 p-2 rounded-xl bg-black/30 backdrop-blur-sm hover:bg-black/50 transition-colors"
              >
                <X className="h-4 w-4 text-white" />
              </button>
              <div className="absolute bottom-4 left-5">
                <h3 className="font-bold text-white text-lg leading-tight">{selected.name}</h3>
                <p className="text-white/70 text-xs capitalize mt-0.5">{selected.mealType}</p>
              </div>
            </div>

            <div className="p-6 space-y-5">
              {/* Stats */}
              <div className="grid grid-cols-4 gap-3">
                {[
                  { label: 'Calories', value: `${selected.calories}`, unit: 'kcal', colour: 'bg-orange-50 text-orange-600' },
                  { label: 'Protein', value: `${selected.proteinG}g`, unit: '', colour: 'bg-blue-50 text-blue-600' },
                  { label: 'Prep', value: `${selected.prepMinutes}`, unit: 'min', colour: 'bg-gray-50 text-gray-600' },
                  { label: 'Cost', value: `£${selected.costGBP.toFixed(2)}`, unit: '', colour: 'bg-emerald-50 text-emerald-600' },
                ].map(({ label, value, unit, colour }) => (
                  <div key={label} className={`rounded-xl ${colour} p-3 text-center`}>
                    <p className="text-base font-bold">{value}<span className="text-xs font-normal ml-0.5">{unit}</span></p>
                    <p className="text-[10px] font-medium mt-0.5 opacity-70">{label}</p>
                  </div>
                ))}
              </div>

              {/* Description */}
              <p className="text-sm text-gray-600 leading-relaxed">{selected.description}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5">
                {selected.tags.map((tag) => (
                  <span key={tag} className="text-xs font-medium px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Ingredients */}
              <div>
                <h4 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                  🛒 Ingredients
                </h4>
                <ul className="space-y-1.5">
                  {selected.ingredients.map((ing, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                      {ing}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Steps */}
              <div>
                <h4 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <ChefHat className="h-4 w-4 text-amber-500" /> How to make it
                </h4>
                <ol className="space-y-3">
                  {selected.steps.map((step, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-700">
                        {i + 1}
                      </span>
                      <p className="text-sm text-gray-600 leading-relaxed">{step}</p>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Log CTA */}
              <a
                href={`/meals?log=1&meal=${encodeURIComponent(selected.name)}&calories=${selected.calories}&type=${selected.mealType}`}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 py-3.5 text-sm font-bold text-white shadow-md shadow-emerald-200 hover:bg-emerald-700 transition-colors"
              >
                Log this meal →
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
