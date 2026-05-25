import { BookOpen, Pill, Scale, Droplets, Moon, Brain, AlertTriangle, CheckCircle, ExternalLink } from 'lucide-react'

const supplements = [
  {
    name: 'Protein (Whey or Plant)',
    evidence: 'Strong',
    benefit: 'Preserves muscle while losing fat, keeps you full longer',
    dose: '20-30g post-workout or as a meal supplement',
    notes: 'Most important supplement for men losing weight. A high-protein diet (1.6-2.2g per kg bodyweight) consistently outperforms low-protein for fat loss while maintaining muscle.',
    emoji: '💪',
    safe: true,
  },
  {
    name: 'Vitamin D3',
    evidence: 'Strong',
    benefit: 'Most UK men are deficient — low levels linked to increased body fat and low testosterone',
    dose: '1,000-4,000 IU daily, ideally with K2',
    notes: 'The NHS recommends all UK adults supplement in autumn and winter. Deficiency is extremely common in the UK and is associated with fatigue, low mood, and difficulty losing weight.',
    emoji: '☀️',
    safe: true,
  },
  {
    name: 'Omega-3 Fish Oil',
    evidence: 'Strong',
    benefit: 'Reduces inflammation, supports heart health, mild fat loss benefit',
    dose: '2-3g combined EPA+DHA daily (not just total fish oil)',
    notes: 'Strong evidence for cardiovascular health and reducing inflammation caused by excess body fat. Look for high-quality fish oil — check the EPA+DHA content, not just total oil.',
    emoji: '🐟',
    safe: true,
  },
  {
    name: 'Creatine',
    evidence: 'Strong',
    benefit: 'Improves exercise performance, preserves muscle during fat loss',
    dose: '3-5g daily — no loading phase needed',
    notes: 'One of the most studied and safe supplements in existence. Won\'t make you bulky — it helps you work harder during exercise, burn more calories, and keep muscle while losing fat. Also has emerging evidence for cognitive function.',
    emoji: '⚡',
    safe: true,
  },
  {
    name: 'Magnesium',
    evidence: 'Moderate',
    benefit: 'Supports sleep quality, muscle function, and blood sugar regulation',
    dose: '200-400mg magnesium glycinate or citrate at night',
    notes: 'Up to 70% of UK adults are deficient. Poor sleep directly sabotages weight loss by increasing hunger hormones. Magnesium glycinate is the best tolerated form.',
    emoji: '🌙',
    safe: true,
  },
  {
    name: 'Caffeine',
    evidence: 'Strong',
    benefit: 'Increases metabolic rate by 3-11%, improves workout performance',
    dose: 'Up to 400mg/day (roughly 4 coffees) — avoid after 2pm',
    notes: 'Coffee and tea are perfectly good sources. Pre-workout supplements often contain high doses — check labels. Tolerance builds quickly, so cycling intake helps maintain effect.',
    emoji: '☕',
    safe: true,
  },
  {
    name: 'Fibre (Psyllium Husk)',
    evidence: 'Moderate',
    benefit: 'Increases satiety, slows digestion, feeds good gut bacteria',
    dose: '5-10g with water before meals',
    notes: 'Most UK men eat far less than the 30g daily fibre recommendation. Psyllium husk is cheap and very effective for hunger control. Always take with plenty of water.',
    emoji: '🌾',
    safe: true,
  },
]

const avoidList = [
  { name: 'Fat burners / thermogenics', reason: 'Most have weak evidence, some contain unlisted stimulants. The ones that work (caffeine, green tea) you can get from food and drink.' },
  { name: 'Raspberry ketones', reason: 'No meaningful human evidence. Popular in marketing, useless in reality.' },
  { name: 'Garcinia cambogia', reason: 'Multiple meta-analyses show negligible effect in humans. Often overhyped.' },
  { name: 'Detox teas / cleanses', reason: 'Your liver and kidneys detox your body. These are expensive laxatives.' },
  { name: 'HCG drops', reason: 'Banned in the UK for weight loss. Ineffective and potentially dangerous.' },
]

const weightLossTips = [
  {
    icon: Scale,
    title: 'The only thing that matters for fat loss',
    colour: 'emerald',
    content: 'A calorie deficit — consuming fewer calories than you burn. Everything else (low carb, keto, intermittent fasting) works because it helps you eat fewer calories. Find the approach you can stick to, not the "optimal" one.',
    stat: '500 kcal deficit per day = ~0.5kg loss per week',
  },
  {
    icon: Brain,
    title: 'Protein is your best friend',
    colour: 'blue',
    content: 'Eat 1.6–2.2g of protein per kg of bodyweight daily. Protein keeps you fuller for longer, has the highest thermic effect (your body burns 20-30% of protein calories just digesting it), and preserves the muscle you want to keep.',
    stat: '80kg man → aim for 130-175g protein daily',
  },
  {
    icon: Droplets,
    title: 'Drink water before meals',
    colour: 'cyan',
    content: 'Drinking 500ml of water 30 minutes before a meal reduces calorie intake by roughly 13% in studies. Your brain often confuses thirst for hunger. Aim for 2-3 litres of total fluid daily.',
    stat: '500ml pre-meal = ~13% fewer calories eaten',
  },
  {
    icon: Moon,
    title: 'Sleep is non-negotiable',
    colour: 'violet',
    content: 'Less than 7 hours sleep increases hunger hormones (ghrelin) by 24% and decreases the fullness hormone (leptin) by 18%. Poor sleep directly causes you to eat more and store more fat. Prioritise 7-9 hours.',
    stat: 'Under 7hrs sleep → 24% more hunger hormone',
  },
  {
    icon: BookOpen,
    title: 'Track everything for 2 weeks',
    colour: 'amber',
    content: 'Most people underestimate their calorie intake by 30-50%. Use this app to log every meal honestly for two weeks. You don\'t need to track forever — just long enough to understand your habits and portion sizes.',
    stat: 'Most people underestimate intake by 30-50%',
  },
  {
    icon: CheckCircle,
    title: 'Lose weight slowly — 0.5-1kg per week',
    colour: 'rose',
    content: 'Faster loss usually means losing muscle alongside fat. Slow, sustainable loss preserves muscle, is easier to maintain, and is healthier long-term. Crash diets work short-term and fail long-term — 95% of the time.',
    stat: '0.5-1kg/week is the gold standard for fat loss',
  },
]

const colourMap: Record<string, { bg: string; icon: string; stat: string }> = {
  emerald: { bg: 'bg-emerald-50', icon: 'text-emerald-600', stat: 'bg-emerald-100 text-emerald-800' },
  blue: { bg: 'bg-blue-50', icon: 'text-blue-600', stat: 'bg-blue-100 text-blue-800' },
  cyan: { bg: 'bg-cyan-50', icon: 'text-cyan-600', stat: 'bg-cyan-100 text-cyan-800' },
  violet: { bg: 'bg-violet-50', icon: 'text-violet-600', stat: 'bg-violet-100 text-violet-800' },
  amber: { bg: 'bg-amber-50', icon: 'text-amber-600', stat: 'bg-amber-100 text-amber-800' },
  rose: { bg: 'bg-rose-50', icon: 'text-rose-600', stat: 'bg-rose-100 text-rose-800' },
}

const evidenceBadge = (level: string) =>
  level === 'Strong'
    ? 'bg-emerald-50 text-emerald-700 border-emerald-100'
    : 'bg-amber-50 text-amber-700 border-amber-100'

export default function AdvicePage() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-2xl font-bold">Weight Loss Guide</h1>
        <p className="text-gray-500 text-sm mt-1">Evidence-based advice — no gimmicks, no fads</p>
      </div>

      {/* Core principles */}
      <section className="space-y-4">
        <h2 className="font-semibold text-gray-800 text-lg">The essentials</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {weightLossTips.map(({ icon: Icon, title, colour, content, stat }) => {
            const c = colourMap[colour]
            return (
              <div key={title} className="bg-white rounded-2xl border border-gray-100 p-5 space-y-3">
                <div className={`w-10 h-10 rounded-xl ${c.bg} flex items-center justify-center`}>
                  <Icon className={`h-5 w-5 ${c.icon}`} />
                </div>
                <h3 className="font-semibold text-gray-900">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{content}</p>
                <div className={`rounded-lg ${c.stat} px-3 py-2 text-xs font-medium`}>
                  📊 {stat}
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Supplements */}
      <section className="space-y-4">
        <div>
          <h2 className="font-semibold text-gray-800 text-lg flex items-center gap-2">
            <Pill className="h-5 w-5 text-gray-400" />
            Supplements that actually work
          </h2>
          <p className="text-sm text-gray-500 mt-1">Only evidence-backed options — nothing hyped, nothing dangerous</p>
        </div>

        <div className="space-y-3">
          {supplements.map(supp => (
            <details key={supp.name} className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:border-gray-200 transition-all">
              <summary className="flex items-center gap-4 p-5 cursor-pointer list-none">
                <span className="text-2xl shrink-0">{supp.emoji}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-semibold text-gray-900">{supp.name}</h3>
                    <span className={`text-xs font-medium rounded-full border px-2.5 py-0.5 ${evidenceBadge(supp.evidence)}`}>
                      {supp.evidence} evidence
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-0.5 truncate">{supp.benefit}</p>
                </div>
                <span className="text-xs text-gray-400 group-open:hidden shrink-0">Details ▾</span>
                <span className="text-xs text-gray-400 hidden group-open:block shrink-0">Close ▴</span>
              </summary>
              <div className="px-5 pb-5 border-t border-gray-50 pt-4 space-y-3">
                <div className="flex items-start gap-2">
                  <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide w-16 shrink-0 mt-0.5">Dose</span>
                  <span className="text-sm text-gray-700 font-medium">{supp.dose}</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide w-16 shrink-0 mt-0.5">Why</span>
                  <span className="text-sm text-gray-600 leading-relaxed">{supp.notes}</span>
                </div>
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* Avoid */}
      <section className="space-y-4">
        <h2 className="font-semibold text-gray-800 text-lg flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-red-400" />
          Save your money — these don&apos;t work
        </h2>
        <div className="bg-red-50 rounded-2xl border border-red-100 divide-y divide-red-100">
          {avoidList.map(item => (
            <div key={item.name} className="flex items-start gap-3 px-5 py-4">
              <span className="text-red-400 mt-0.5 shrink-0">✗</span>
              <div>
                <p className="font-medium text-red-800 text-sm">{item.name}</p>
                <p className="text-red-600 text-xs mt-0.5">{item.reason}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Disclaimer */}
      <div className="bg-gray-50 rounded-2xl border border-gray-100 p-5 flex gap-3">
        <AlertTriangle className="h-4 w-4 text-gray-400 shrink-0 mt-0.5" />
        <p className="text-xs text-gray-400 leading-relaxed">
          This guidance is for general information only. Always consult your GP before starting any supplement regime, particularly if you take medication or have any health conditions. The NHS website is your best first port of call for personalised medical advice.
        </p>
      </div>
    </div>
  )
}
