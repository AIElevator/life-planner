export type LibraryMeal = {
  id: string
  name: string
  emoji: string
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack'
  calories: number
  proteinG: number
  prepMinutes: number
  costGBP: number
  tags: string[]
  description: string
  ingredients: string[]
  steps: string[]
  imageUrl: string
}

// ─── BREAKFAST (6) ────────────────────────────────────────────────────────────

const overnightOats: LibraryMeal = {
  id: 'overnight-oats',
  name: 'Overnight Oats with Berries',
  emoji: '🫙',
  mealType: 'breakfast',
  calories: 350,
  proteinG: 14,
  prepMinutes: 5,
  costGBP: 0.90,
  tags: ['high-fibre', 'batch-cook', 'under-500-kcal', 'ManvFat-friendly'],
  description: 'Creamy oats soaked overnight with mixed berries and a hit of protein. Grab and go.',
  ingredients: [
    '80g rolled oats',
    '200ml semi-skimmed milk',
    '100g Greek yoghurt',
    '1 tbsp chia seeds',
    '100g mixed berries',
    '1 tsp honey',
  ],
  steps: [
    'Add oats, milk, yoghurt, and chia seeds to a jar or container. Stir well.',
    'Cover and refrigerate overnight (or at least 4 hours).',
    'In the morning, top with berries and drizzle with honey.',
    'Add a splash more milk if you prefer a looser consistency.',
  ],
  imageUrl: '/images/recipes/overnight-oats.webp',
}

const scrambledEggsToast: LibraryMeal = {
  id: 'scrambled-eggs-toast',
  name: 'Scrambled Eggs & Wholemeal Toast',
  emoji: '🍳',
  mealType: 'breakfast',
  calories: 400,
  proteinG: 28,
  prepMinutes: 10,
  costGBP: 1.20,
  tags: ['high-protein', 'quick', 'ManvFat-friendly'],
  description: 'Fluffy scrambled eggs on seeded wholemeal toast — simple, filling, and packed with protein.',
  ingredients: [
    '3 eggs',
    '2 slices wholemeal bread',
    '1 tbsp butter',
    '30ml semi-skimmed milk',
    'Salt and black pepper',
    'Handful of spinach (optional)',
  ],
  steps: [
    'Crack eggs into a bowl, add milk, season with salt and pepper, and whisk.',
    'Melt butter in a non-stick pan over low heat.',
    "Pour in eggs. Stir slowly and continuously with a spatula until just set — don't overcook.",
    'Toast the bread. Wilt spinach in the pan for 30 seconds if using.',
    'Serve eggs immediately on toast.',
  ],
  imageUrl: '/images/recipes/scrambled-eggs.webp',
}

const greekYoghurtParfait: LibraryMeal = {
  id: 'greek-yoghurt-parfait',
  name: 'Greek Yoghurt Parfait',
  emoji: '🍓',
  mealType: 'breakfast',
  calories: 310,
  proteinG: 20,
  prepMinutes: 5,
  costGBP: 1.60,
  tags: ['high-protein', 'quick', 'under-500-kcal', 'ManvFat-friendly'],
  description: 'Layers of thick Greek yoghurt, granola, and fresh fruit. Ready in 5 minutes.',
  ingredients: [
    '200g full-fat Greek yoghurt',
    '30g low-sugar granola',
    '1 banana, sliced',
    '80g strawberries',
    '1 tsp honey',
  ],
  steps: [
    'Spoon half the yoghurt into a glass or bowl.',
    'Add half the granola and banana.',
    'Layer the remaining yoghurt on top.',
    'Top with strawberries, remaining granola, and a drizzle of honey.',
  ],
  imageUrl: '/images/recipes/greek-yoghurt-parfait.webp',
}

const proteinSmoothie: LibraryMeal = {
  id: 'banana-protein-smoothie',
  name: 'Banana Protein Smoothie',
  emoji: '🥤',
  mealType: 'breakfast',
  calories: 370,
  proteinG: 30,
  prepMinutes: 5,
  costGBP: 1.30,
  tags: ['high-protein', 'quick', 'under-500-kcal'],
  description: 'A thick, creamy smoothie that keeps you full until lunch. Great post-workout too.',
  ingredients: [
    '1 banana (frozen is best)',
    '1 scoop vanilla protein powder',
    '200ml semi-skimmed milk',
    '1 tbsp peanut butter',
    '1 tsp honey',
    '3–4 ice cubes',
  ],
  steps: [
    'Add all ingredients to a blender.',
    'Blend on high for 30–60 seconds until smooth.',
    'Taste and add more honey if needed.',
    'Drink immediately.',
  ],
  imageUrl: '/images/recipes/banana-protein-smoothie.webp',
}

const avocadoEggsToast: LibraryMeal = {
  id: 'avocado-eggs-toast',
  name: 'Avocado & Poached Egg Toast',
  emoji: '🥑',
  mealType: 'breakfast',
  calories: 460,
  proteinG: 22,
  prepMinutes: 12,
  costGBP: 2.10,
  tags: ['healthy-fats', 'high-protein', 'under-500-kcal'],
  description: 'Smashed avocado on sourdough topped with a perfectly poached egg. Weekend treat vibes on a weekday.',
  ingredients: [
    '2 slices sourdough bread',
    '1 ripe avocado',
    '2 eggs',
    '1 tsp lemon juice',
    'Chilli flakes',
    'Salt and black pepper',
  ],
  steps: [
    'Toast the sourdough until golden.',
    'Halve the avocado, remove the stone, and scoop into a bowl. Add lemon juice, salt, and pepper. Mash roughly.',
    'Bring a pan of water to a gentle simmer. Add a splash of vinegar.',
    'Crack each egg into a small cup. Swirl the water and slide eggs in. Cook for 3 minutes for a runny yolk.',
    'Spread avocado on toast, top with eggs, and scatter chilli flakes.',
  ],
  imageUrl: '/images/recipes/avocado-poached-egg.webp',
}

const bananaPorridge: LibraryMeal = {
  id: 'banana-porridge',
  name: 'Banana & Honey Porridge',
  emoji: '🍌',
  mealType: 'breakfast',
  calories: 340,
  proteinG: 10,
  prepMinutes: 8,
  costGBP: 0.70,
  tags: ['high-fibre', 'quick', 'budget-friendly', 'under-500-kcal', 'ManvFat-friendly'],
  description: 'Classic warming porridge with sliced banana and a drizzle of honey. Cheap, filling, and comforting.',
  ingredients: [
    '80g rolled oats',
    '300ml semi-skimmed milk',
    '1 banana',
    '1 tsp honey',
    'Pinch of cinnamon',
    'Pinch of salt',
  ],
  steps: [
    'Add oats, milk, and a pinch of salt to a small pan.',
    'Cook over medium heat, stirring regularly, for 5–6 minutes until thick and creamy.',
    'Pour into a bowl. Top with sliced banana, a drizzle of honey, and a pinch of cinnamon.',
  ],
  imageUrl: '/images/recipes/banana-porridge.webp',
}

// ─── LUNCH (5) ────────────────────────────────────────────────────────────────

const chickenCaesarWrap: LibraryMeal = {
  id: 'chicken-caesar-wrap',
  name: 'Chicken Caesar Wrap',
  emoji: '🌯',
  mealType: 'lunch',
  calories: 430,
  proteinG: 40,
  prepMinutes: 8,
  costGBP: 2.80,
  tags: ['high-protein', 'quick', 'ManvFat-friendly'],
  description: 'Grilled chicken, crisp romaine, and Caesar dressing wrapped in a wholemeal tortilla. Proper lunch.',
  ingredients: [
    '1 large wholemeal tortilla wrap',
    '150g cooked chicken breast, sliced',
    '2 large handfuls romaine lettuce',
    '2 tbsp light Caesar dressing',
    '15g parmesan shavings',
    'Black pepper',
  ],
  steps: [
    'Lay the wrap flat on a board.',
    'Layer romaine lettuce down the centre.',
    'Add chicken and parmesan. Drizzle with Caesar dressing.',
    'Season with black pepper.',
    'Fold in the sides and roll up firmly. Slice in half to serve.',
  ],
  imageUrl: '/images/recipes/chicken-caesar-wrap.webp',
}

const tunaJacketPotato: LibraryMeal = {
  id: 'tuna-sweetcorn-jacket',
  name: 'Tuna & Sweetcorn Jacket Potato',
  emoji: '🥔',
  mealType: 'lunch',
  calories: 460,
  proteinG: 36,
  prepMinutes: 60,
  costGBP: 1.80,
  tags: ['high-protein', 'budget-friendly', 'ManvFat-friendly'],
  description: 'The ultimate comforting lunch. Fluffy baked potato loaded with tuna and sweetcorn.',
  ingredients: [
    '1 large baking potato',
    '1 tin tuna in water (drained)',
    '50g sweetcorn (tinned or frozen)',
    '2 tbsp light mayonnaise',
    '½ lemon',
    'Salt and black pepper',
  ],
  steps: [
    'Preheat oven to 200°C. Pierce potato all over with a fork.',
    'Bake for 50–60 minutes until the skin is crispy and the inside is soft. (Microwave for 8 minutes to speed things up, then crisp in the oven for 15 minutes.)',
    'Mix drained tuna with sweetcorn, mayo, and a squeeze of lemon. Season well.',
    'Split the potato open, fluff the insides, and load with the tuna mix.',
  ],
  imageUrl: '/images/recipes/tuna-jacket-potato.webp',
}

const prawnStirFryNoodles: LibraryMeal = {
  id: 'prawn-stir-fry-noodles',
  name: 'Prawn Stir-fry Noodles',
  emoji: '🍜',
  mealType: 'lunch',
  calories: 420,
  proteinG: 34,
  prepMinutes: 15,
  costGBP: 3.50,
  tags: ['high-protein', 'quick', 'low-fat'],
  description: 'King prawns and veg in a soy and ginger sauce tossed through egg noodles. Ready in 15 minutes.',
  ingredients: [
    '200g raw king prawns',
    '150g straight-to-wok egg noodles',
    '1 red pepper, sliced',
    '100g sugar snap peas',
    '3 tbsp soy sauce',
    '1 tsp sesame oil',
    '1 garlic clove, minced',
    '1 tsp fresh ginger, grated',
  ],
  steps: [
    'Heat oil in a wok over high heat. Stir-fry garlic and ginger for 30 seconds.',
    'Add pepper and sugar snap peas. Stir-fry for 2 minutes.',
    'Add prawns and cook for 2–3 minutes until pink.',
    'Add noodles and soy sauce. Toss everything together for 2 minutes.',
    'Drizzle with sesame oil and serve immediately.',
  ],
  imageUrl: '/images/recipes/prawn-noodles.webp',
}

const lentilSoup: LibraryMeal = {
  id: 'lentil-vegetable-soup',
  name: 'Red Lentil & Vegetable Soup',
  emoji: '🍲',
  mealType: 'lunch',
  calories: 290,
  proteinG: 18,
  prepMinutes: 25,
  costGBP: 1.20,
  tags: ['high-fibre', 'budget-friendly', 'batch-cook', 'vegetarian', 'under-500-kcal', 'ManvFat-friendly'],
  description: 'Hearty, filling, and dirt cheap. Make a big batch on Sunday and eat it all week.',
  ingredients: [
    '150g red lentils',
    '1 onion, diced',
    '2 carrots, diced',
    '2 garlic cloves',
    '400ml vegetable stock',
    '1 tsp cumin',
    '1 tsp turmeric',
    '1 tbsp olive oil',
  ],
  steps: [
    'Heat oil in a large pan. Fry onion and carrots for 5 minutes until softened.',
    'Add garlic, cumin, and turmeric. Cook for 1 minute.',
    'Add lentils and stock. Bring to a boil, then simmer for 15 minutes until lentils are soft.',
    'Blend half the soup for a thicker consistency, or leave chunky.',
    'Season and serve with crusty bread.',
  ],
  imageUrl: '/images/recipes/lentil-soup.webp',
}

const greekSaladChicken: LibraryMeal = {
  id: 'greek-salad-chicken',
  name: 'Greek Salad with Feta & Chicken',
  emoji: '🥗',
  mealType: 'lunch',
  calories: 390,
  proteinG: 40,
  prepMinutes: 10,
  costGBP: 3.20,
  tags: ['high-protein', 'low-carb', 'quick', 'under-500-kcal', 'ManvFat-friendly'],
  description: 'Crisp salad with juicy chicken, creamy feta, olives, and a lemon dressing. Light but satisfying.',
  ingredients: [
    '150g cooked chicken breast, sliced',
    '½ cucumber, chopped',
    '150g cherry tomatoes, halved',
    '60g feta cheese, crumbled',
    '30g pitted kalamata olives',
    '2 tbsp olive oil',
    '1 tbsp lemon juice',
    '½ tsp dried oregano',
  ],
  steps: [
    'Combine cucumber, tomatoes, and olives in a bowl.',
    'Whisk olive oil, lemon juice, and oregano to make the dressing.',
    'Top the salad with sliced chicken and crumbled feta.',
    'Drizzle dressing over and toss gently.',
  ],
  imageUrl: '/images/recipes/greek-salad-chicken.webp',
}

// ─── DINNER (9) ───────────────────────────────────────────────────────────────

const turkeyBolognese: LibraryMeal = {
  id: 'turkey-bolognese',
  name: 'Turkey Mince Bolognese',
  emoji: '🍝',
  mealType: 'dinner',
  calories: 520,
  proteinG: 48,
  prepMinutes: 30,
  costGBP: 4.20,
  tags: ['high-protein', 'batch-cook', 'ManvFat-friendly'],
  description: 'All the comfort of a classic spag bol with turkey mince instead — leaner and just as tasty.',
  ingredients: [
    '400g turkey mince',
    '1 onion, diced',
    '2 garlic cloves, minced',
    '400g tin chopped tomatoes',
    '2 tbsp tomato purée',
    '1 tsp dried oregano',
    '300g wholewheat spaghetti',
    '1 tbsp olive oil',
  ],
  steps: [
    'Cook spaghetti according to packet instructions.',
    'Heat oil in a pan. Fry onion and garlic until softened, about 5 minutes.',
    'Add turkey mince. Brown well, breaking up lumps.',
    'Stir in tomatoes, tomato purée, and oregano. Simmer for 15 minutes.',
    'Season generously and serve over spaghetti.',
  ],
  imageUrl: '/images/recipes/turkey-bolognaise.webp',
}

const bakedSalmonRoastedVeg: LibraryMeal = {
  id: 'baked-salmon-roasted-veg',
  name: 'Baked Salmon with Roasted Veg',
  emoji: '🍠',
  mealType: 'dinner',
  calories: 530,
  proteinG: 44,
  prepMinutes: 35,
  costGBP: 5.50,
  tags: ['high-protein', 'healthy-fats', 'ManvFat-friendly'],
  description: 'Classic healthy dinner — baked salmon with a tray of roasted Mediterranean vegetables.',
  ingredients: [
    '200g salmon fillet',
    '1 courgette, chopped',
    '1 red pepper, sliced',
    '200g cherry tomatoes',
    '1 tbsp olive oil',
    '½ lemon',
    '1 tsp mixed herbs',
    'Salt and pepper',
  ],
  steps: [
    'Preheat oven to 200°C. Toss courgette, pepper, and tomatoes with olive oil, herbs, salt, and pepper on a large baking tray. Roast for 15 minutes.',
    'Season salmon with lemon juice, salt, and pepper.',
    'Push veg to the sides and place salmon on the tray. Bake for a further 12–15 minutes.',
    'Serve salmon on the veg with a wedge of lemon.',
  ],
  imageUrl: '/images/recipes/salmon-roasted-veg.webp',
}

const chickenTikkaMasala: LibraryMeal = {
  id: 'chicken-tikka-masala',
  name: 'Lighter Chicken Tikka Masala',
  emoji: '🍛',
  mealType: 'dinner',
  calories: 490,
  proteinG: 46,
  prepMinutes: 30,
  costGBP: 4.00,
  tags: ['high-protein', 'batch-cook', 'ManvFat-friendly'],
  description: "A lighter version of the nation's favourite — big flavour, less cream. Serve with basmati rice.",
  ingredients: [
    '400g chicken breast, diced',
    '1 onion, diced',
    '2 garlic cloves, minced',
    '1 tin light coconut milk',
    '2 tbsp tikka masala paste',
    '400g tin chopped tomatoes',
    '1 tbsp Greek yoghurt',
    'Fresh coriander to serve',
  ],
  steps: [
    'Fry onion and garlic in oil for 5 minutes. Add tikka paste and cook for 2 minutes.',
    'Add chicken and brown on all sides.',
    'Pour in tomatoes and coconut milk. Simmer for 20 minutes until chicken is cooked through.',
    'Stir in yoghurt off the heat.',
    'Scatter coriander and serve with basmati rice.',
  ],
  imageUrl: '/images/recipes/chicken-tikka-masala.webp',
}

const beefChilli: LibraryMeal = {
  id: 'beef-chilli',
  name: 'Lean Beef Chilli',
  emoji: '🫘',
  mealType: 'dinner',
  calories: 500,
  proteinG: 44,
  prepMinutes: 40,
  costGBP: 4.50,
  tags: ['high-protein', 'batch-cook', 'ManvFat-friendly'],
  description: 'Rich, warming chilli made with lean beef mince and kidney beans. Great for batch cooking.',
  ingredients: [
    '400g lean beef mince (5% fat)',
    '400g tin kidney beans, drained',
    '400g tin chopped tomatoes',
    '1 onion, diced',
    '2 garlic cloves',
    '2 tsp chilli powder',
    '1 tsp cumin',
    '1 tsp smoked paprika',
  ],
  steps: [
    'Brown the mince in a pan over high heat. Drain off any excess fat.',
    'Add onion and garlic. Cook for 5 minutes.',
    'Add chilli powder, cumin, and paprika. Stir for 1 minute.',
    'Pour in tomatoes and kidney beans. Simmer for 25 minutes.',
    'Season well. Serve with rice, a baked potato, or flatbread.',
  ],
  imageUrl: '/images/recipes/beef-chilli.webp',
}

const prawnVegStirFry: LibraryMeal = {
  id: 'prawn-veg-stir-fry',
  name: 'Prawn & Vegetable Stir-fry',
  emoji: '🦐',
  mealType: 'dinner',
  calories: 380,
  proteinG: 36,
  prepMinutes: 20,
  costGBP: 4.80,
  tags: ['high-protein', 'quick', 'low-fat', 'under-500-kcal', 'ManvFat-friendly'],
  description: 'Fragrant king prawns with colourful veg in a soy and ginger sauce. Serve with jasmine rice.',
  ingredients: [
    '300g raw king prawns',
    '1 red pepper, sliced',
    '200g broccoli florets',
    '1 carrot, julienned',
    '3 tbsp soy sauce',
    '1 tbsp oyster sauce',
    '1 tsp sesame oil',
    '2 garlic cloves',
  ],
  steps: [
    'Heat oil in a wok over high heat. Fry garlic for 30 seconds.',
    'Add pepper, broccoli, and carrot. Stir-fry for 3 minutes.',
    'Add prawns and cook for 2–3 minutes until pink.',
    'Pour in soy sauce and oyster sauce. Toss to coat.',
    'Drizzle with sesame oil and serve over jasmine rice.',
  ],
  imageUrl: '/images/recipes/prawn-veg-stir-fry.webp',
}

const cottagePieSweetPotato: LibraryMeal = {
  id: 'cottage-pie-sweet-potato',
  name: 'Cottage Pie with Sweet Potato Mash',
  emoji: '🥧',
  mealType: 'dinner',
  calories: 560,
  proteinG: 42,
  prepMinutes: 50,
  costGBP: 5.00,
  tags: ['high-protein', 'batch-cook', 'ManvFat-friendly'],
  description: 'A healthier take on the classic — lean beef mince topped with sweet potato mash. Pure comfort food.',
  ingredients: [
    '400g lean beef mince',
    '2 large sweet potatoes',
    '1 onion, diced',
    '2 carrots, diced',
    '200ml beef stock',
    '1 tbsp Worcestershire sauce',
    '2 tbsp tomato purée',
    '1 tbsp butter',
  ],
  steps: [
    'Brown mince in a pan. Add onion and carrots and cook for 5 minutes.',
    'Stir in tomato purée, Worcestershire sauce, and stock. Simmer for 20 minutes.',
    'Meanwhile, peel and cube sweet potatoes. Boil for 15 minutes, drain, and mash with butter.',
    'Pour mince into a baking dish. Top with sweet potato mash and rough up with a fork.',
    'Bake at 200°C for 20 minutes until golden on top.',
  ],
  imageUrl: '/images/recipes/cottage-pie-sweet-potato.webp',
}

const chickenChorizo: LibraryMeal = {
  id: 'chicken-chorizo-pasta',
  name: 'Chicken & Chorizo Pasta',
  emoji: '🍝',
  mealType: 'dinner',
  calories: 580,
  proteinG: 48,
  prepMinutes: 25,
  costGBP: 4.80,
  tags: ['high-protein', 'quick', 'ManvFat-friendly'],
  description: 'Smoky chorizo with tender chicken and pasta in a rich tomato sauce. Everyone loves this one.',
  ingredients: [
    '300g chicken breast, diced',
    '80g chorizo, sliced',
    '300g penne pasta',
    '400g tin chopped tomatoes',
    '1 onion, diced',
    '2 garlic cloves',
    '1 tsp smoked paprika',
    'Fresh parsley to serve',
  ],
  steps: [
    'Cook pasta according to packet instructions.',
    'Fry chorizo in a dry pan for 2 minutes until oils release. Add onion and garlic.',
    'Add chicken and brown on all sides. Stir in paprika.',
    'Pour in tomatoes. Simmer for 15 minutes.',
    'Toss with drained pasta and scatter parsley.',
  ],
  imageUrl: '/images/recipes/chicken-chorizo-pasta.webp',
}

const lemonHerbChicken: LibraryMeal = {
  id: 'lemon-herb-chicken-new-potatoes',
  name: 'Lemon Herb Chicken with New Potatoes',
  emoji: '🍗',
  mealType: 'dinner',
  calories: 490,
  proteinG: 46,
  prepMinutes: 40,
  costGBP: 4.20,
  tags: ['high-protein', 'ManvFat-friendly'],
  description: 'Marinated chicken breasts roasted with new potatoes, garlic, and fresh herbs. Dead simple.',
  ingredients: [
    '2 chicken breasts',
    '400g new potatoes, halved',
    '2 tbsp olive oil',
    '2 garlic cloves, minced',
    '1 lemon',
    '1 tsp dried rosemary',
    '1 tsp dried thyme',
    'Salt and pepper',
  ],
  steps: [
    'Preheat oven to 200°C.',
    'Mix olive oil, garlic, lemon juice and zest, rosemary, thyme, salt, and pepper.',
    'Toss potatoes in half the mixture and place on a roasting tray. Roast for 15 minutes.',
    'Coat chicken in remaining mixture. Add to the tray and roast for a further 22–25 minutes.',
    'Rest the chicken for 5 minutes before serving.',
  ],
  imageUrl: '/images/recipes/lemon-herb-chicken.webp',
}

const vegChickpeaCurry: LibraryMeal = {
  id: 'veg-chickpea-curry',
  name: 'Vegetable & Chickpea Curry',
  emoji: '🍲',
  mealType: 'dinner',
  calories: 420,
  proteinG: 18,
  prepMinutes: 30,
  costGBP: 2.80,
  tags: ['vegetarian', 'high-fibre', 'batch-cook', 'budget-friendly', 'under-500-kcal', 'ManvFat-friendly'],
  description: 'A satisfying meat-free curry that is cheap, healthy, and freezes brilliantly.',
  ingredients: [
    '400g tin chickpeas, drained',
    '400g tin chopped tomatoes',
    '1 tin light coconut milk',
    '1 onion, diced',
    '1 sweet potato, cubed',
    '2 tbsp medium curry powder',
    '2 garlic cloves',
    '1 tbsp fresh ginger, grated',
  ],
  steps: [
    'Fry onion, garlic, and ginger in oil for 5 minutes.',
    'Add curry powder and cook for 1 minute.',
    'Add sweet potato, chickpeas, tomatoes, and coconut milk.',
    'Simmer for 20–25 minutes until sweet potato is tender.',
    'Season well and serve with basmati rice or naan.',
  ],
  imageUrl: '/images/recipes/chickpea-curry.webp',
}

// ─── SNACKS (5) ───────────────────────────────────────────────────────────────

const appleWithPeanutButter: LibraryMeal = {
  id: 'apple-peanut-butter',
  name: 'Apple with Peanut Butter',
  emoji: '🍎',
  mealType: 'snack',
  calories: 210,
  proteinG: 5,
  prepMinutes: 2,
  costGBP: 0.70,
  tags: ['healthy-fats', 'quick', 'under-500-kcal', 'ManvFat-friendly'],
  description: 'The classic snack combo. Sweet apple with creamy peanut butter keeps hunger at bay.',
  ingredients: [
    '1 large apple',
    '2 tbsp natural peanut butter (no added sugar)',
  ],
  steps: [
    'Core and slice the apple into wedges.',
    'Serve with peanut butter on the side for dipping.',
  ],
  imageUrl: 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=600&q=80',
}

const cottageCheeseCucumber: LibraryMeal = {
  id: 'cottage-cheese-cucumber',
  name: 'Cottage Cheese with Cucumber',
  emoji: '🧀',
  mealType: 'snack',
  calories: 130,
  proteinG: 16,
  prepMinutes: 3,
  costGBP: 0.80,
  tags: ['high-protein', 'low-carb', 'quick', 'under-500-kcal', 'ManvFat-friendly'],
  description: 'High protein, low calorie, and surprisingly filling. Perfect mid-afternoon snack.',
  ingredients: [
    '150g cottage cheese',
    '½ cucumber, sliced',
    'Black pepper',
    'Pinch of chilli flakes (optional)',
  ],
  steps: [
    'Slice the cucumber.',
    'Spoon cottage cheese into a bowl.',
    'Season with black pepper and optional chilli flakes.',
    'Serve cucumber on the side for dipping.',
  ],
  imageUrl: '/images/recipes/cottage-cheese-cucumber.webp',
}

const mixedNutsBanana: LibraryMeal = {
  id: 'mixed-nuts-banana',
  name: 'Mixed Nuts & a Banana',
  emoji: '🥜',
  mealType: 'snack',
  calories: 260,
  proteinG: 7,
  prepMinutes: 1,
  costGBP: 0.90,
  tags: ['healthy-fats', 'quick', 'under-500-kcal', 'ManvFat-friendly'],
  description: 'A nutrient-dense combination of natural sugars and healthy fats. Great before or after a workout.',
  ingredients: [
    '30g mixed nuts (almonds, cashews, walnuts)',
    '1 banana',
  ],
  steps: [
    'Measure nuts into a small bag or bowl.',
    'Eat alongside the banana.',
  ],
  imageUrl: 'https://images.unsplash.com/photo-1596591606975-97ee5cef3a1e?w=600&q=80',
}

const riceCakesHummus: LibraryMeal = {
  id: 'rice-cakes-hummus',
  name: 'Rice Cakes with Hummus',
  emoji: '🫓',
  mealType: 'snack',
  calories: 160,
  proteinG: 6,
  prepMinutes: 2,
  costGBP: 0.75,
  tags: ['vegetarian', 'quick', 'low-calorie', 'under-500-kcal'],
  description: 'Light and crunchy rice cakes with creamy hummus. One of the best low-calorie fillers.',
  ingredients: [
    '3 plain rice cakes',
    '60g hummus',
    'Sliced cucumber or red pepper (optional)',
  ],
  steps: [
    'Spread hummus generously on each rice cake.',
    'Top with sliced cucumber or red pepper if using.',
    'Eat immediately.',
  ],
  imageUrl: 'https://images.unsplash.com/photo-1604909052743-94e838986d24?w=600&q=80',
}

const boiledEggs: LibraryMeal = {
  id: 'boiled-eggs',
  name: 'Boiled Eggs',
  emoji: '🥚',
  mealType: 'snack',
  calories: 155,
  proteinG: 13,
  prepMinutes: 10,
  costGBP: 0.60,
  tags: ['high-protein', 'batch-cook', 'budget-friendly', 'under-500-kcal', 'ManvFat-friendly'],
  description: 'The most portable high-protein snack there is. Batch cook six at the start of the week.',
  ingredients: [
    '2 eggs',
    'Pinch of sea salt',
  ],
  steps: [
    'Bring a small pan of water to the boil.',
    'Lower eggs in gently on a spoon.',
    'Boil for 7 minutes for a set yolk, or 6 minutes for slightly jammy.',
    'Cool in cold water for 2 minutes before peeling.',
  ],
  imageUrl: 'https://images.unsplash.com/photo-1506084868230-bb9d95c24759?w=600&q=80',
}

// ─── EXPORTS ──────────────────────────────────────────────────────────────────

export const mealLibrary: LibraryMeal[] = [
  // Breakfast
  overnightOats,
  scrambledEggsToast,
  greekYoghurtParfait,
  proteinSmoothie,
  avocadoEggsToast,
  bananaPorridge,
  // Lunch
  chickenCaesarWrap,
  tunaJacketPotato,
  prawnStirFryNoodles,
  lentilSoup,
  greekSaladChicken,
  // Dinner
  turkeyBolognese,
  bakedSalmonRoastedVeg,
  chickenTikkaMasala,
  beefChilli,
  prawnVegStirFry,
  cottagePieSweetPotato,
  chickenChorizo,
  lemonHerbChicken,
  vegChickpeaCurry,
  // Snack
  appleWithPeanutButter,
  cottageCheeseCucumber,
  mixedNutsBanana,
  riceCakesHummus,
  boiledEggs,
]

export const getMealsByType = (type: LibraryMeal['mealType']) =>
  mealLibrary.filter((m) => m.mealType === type)

export const mealTypeLabel: Record<LibraryMeal['mealType'], string> = {
  breakfast: 'Breakfast',
  lunch: 'Lunch',
  dinner: 'Dinner',
  snack: 'Snack',
}
