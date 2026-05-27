import { BookOpen, Pill, Scale, Droplets, Moon, Brain, AlertTriangle, CheckCircle, ExternalLink, Activity, Bike, Tv, Monitor } from 'lucide-react'

const supplements = [
  {
    name: 'Protein (Whey or Plant)',
    evidence: 'Strong',
    benefit: 'Preserves muscle while losing fat, keeps you full longer',
    dose: '20–30g post-workout or as a meal supplement',
    notes: 'Most important supplement for men losing weight. A high-protein diet (1.6–2.2g per kg bodyweight) consistently outperforms low-protein for fat loss while maintaining muscle.',
    emoji: '💪',
    safe: true,
  },
  {
    name: 'Vitamin D3',
    evidence: 'Strong',
    benefit: 'Most UK men are deficient; low levels are linked to increased body fat and low testosterone',
    dose: '1,000–4,000 IU daily, ideally with K2',
    notes: 'The NHS recommends all UK adults supplement in autumn and winter. Deficiency is extremely common in the UK and is associated with fatigue, low mood, and difficulty losing weight.',
    emoji: '☀️',
    safe: true,
  },
  {
    name: 'Omega-3 Fish Oil',
    evidence: 'Strong',
    benefit: 'Reduces inflammation, supports heart health, mild fat loss benefit',
    dose: '2–3g combined EPA+DHA daily (not just total fish oil)',
    notes: 'Strong evidence for cardiovascular health and reducing inflammation caused by excess body fat. Look for high-quality fish oil and check the EPA+DHA content, not just total oil.',
    emoji: '🐟',
    safe: true,
  },
  {
    name: 'Creatine',
    evidence: 'Strong',
    benefit: 'Improves exercise performance, preserves muscle during fat loss',
    dose: '3–5g daily, no loading phase needed',
    notes: 'One of the most studied and safe supplements in existence. Won\'t make you bulky. It helps you work harder during exercise, burn more calories and keep muscle while losing fat. It also has emerging evidence for cognitive function.',
    emoji: '⚡',
    safe: true,
  },
  {
    name: 'Magnesium',
    evidence: 'Moderate',
    benefit: 'Supports sleep quality, muscle function, and blood sugar regulation',
    dose: '200–400mg magnesium glycinate or citrate at night',
    notes: 'Up to 70% of UK adults are deficient. Poor sleep directly sabotages weight loss by increasing hunger hormones. Magnesium glycinate is the best tolerated form.',
    emoji: '🌙',
    safe: true,
  },
  {
    name: 'Caffeine',
    evidence: 'Strong',
    benefit: 'Increases metabolic rate by 3–11%, improves workout performance',
    dose: 'Up to 400mg/day (roughly four coffees). Avoid after 2pm.',
    notes: 'Coffee and tea are perfectly good sources. Pre-workout supplements often contain high doses, so check labels. Tolerance builds quickly, so cycling intake helps maintain effect.',
    emoji: '☕',
    safe: true,
  },
  {
    name: 'Fibre (Psyllium Husk)',
    evidence: 'Moderate',
    benefit: 'Increases satiety, slows digestion, feeds good gut bacteria',
    dose: '5–10g with water before meals',
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
    content: 'A calorie deficit: consuming fewer calories than you burn. Everything else (low carb, keto, intermittent fasting) works because it helps you eat fewer calories. Find the approach you can stick to, not the "optimal" one.',
    stat: '500 kcal deficit per day = ~0.5kg loss per week',
  },
  {
    icon: Brain,
    title: 'Protein is your best friend',
    colour: 'blue',
    content: 'Eat 1.6–2.2g of protein per kg of bodyweight daily. Protein keeps you fuller for longer, has the highest thermic effect (your body burns 20–30% of protein calories just digesting it), and preserves the muscle you want to keep.',
    stat: '80kg man → aim for 130–175g protein daily',
  },
  {
    icon: Droplets,
    title: 'Drink water before meals',
    colour: 'cyan',
    content: 'Drinking 500ml of water 30 minutes before a meal reduces calorie intake by roughly 13% in studies. Your brain often confuses thirst for hunger. Aim for 2–3 litres of total fluid daily.',
    stat: '500ml pre-meal = ~13% fewer calories eaten',
  },
  {
    icon: Moon,
    title: 'Sleep is non-negotiable',
    colour: 'violet',
    content: 'Fewer than seven hours\' sleep increases hunger hormones (ghrelin) by 24% and decreases the fullness hormone (leptin) by 18%. Poor sleep directly causes you to eat more and store more fat. Prioritise 7–9 hours.',
    stat: 'Under 7 hrs sleep → 24% more hunger hormone',
  },
  {
    icon: BookOpen,
    title: 'Track everything for 2 weeks',
    colour: 'amber',
    content: 'Most people underestimate their calorie intake by 30–50%. Use this app to log every meal honestly for two weeks. You don\'t need to track forever. Just long enough to understand your habits and portion sizes.',
    stat: 'Most people underestimate intake by 30–50%',
  },
  {
    icon: CheckCircle,
    title: 'Lose weight slowly: 0.5–1kg per week',
    colour: 'rose',
    content: 'Faster loss usually means losing muscle alongside fat. Slow, sustainable loss preserves muscle, is easier to maintain and is healthier long term. Crash diets work short term and fail long term, 95% of the time.',
    stat: '0.5–1kg/week is the gold standard for fat loss',
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
        <p className="text-gray-500 text-sm mt-1">Evidence-based advice. No gimmicks, no fads.</p>
      </div>

      {/* Section nav */}
      <nav className="sticky top-0 z-10 -mx-1 bg-white/90 backdrop-blur-sm border-b border-gray-100/80 py-2.5 px-1">
        <div className="flex gap-1.5 overflow-x-auto scrollbar-none pb-0.5">
          {[
            { href: '#essentials', label: '📋 Essentials' },
            { href: '#neat', label: '🏃 Off the ball' },
            { href: '#hydration', label: '💧 Hydration' },
            { href: '#supplements', label: '💊 Supplements' },
            { href: '#match-day', label: '⚽ Match day' },
            { href: '#weigh-in', label: '⚖️ Weigh-in' },
            { href: '#takeaways', label: '🥡 Takeaways' },
            { href: '#weekend', label: '🍺 Weekend' },
          ].map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="shrink-0 rounded-xl px-3 py-1.5 text-xs font-semibold text-gray-500 hover:bg-emerald-50 hover:text-emerald-700 transition-colors whitespace-nowrap"
            >
              {label}
            </a>
          ))}
        </div>
      </nav>

      {/* Core principles */}
      <section id="essentials" className="space-y-4">
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

      {/* Off-the-Ball Work — NEAT */}
      <section id="neat" className="space-y-4">
        <div>
          <h2 className="font-semibold text-gray-800 text-lg flex items-center gap-2">
            <Activity className="h-5 w-5 text-orange-400" />
            Off-the-Ball Work
          </h2>
          <p className="text-sm text-gray-500 mt-1">The calories you burn without noticing add up to more than you think.</p>
        </div>

        {/* NEAT explainer */}
        <div className="bg-orange-50 border border-orange-100 rounded-2xl p-5 space-y-2">
          <p className="font-semibold text-orange-800 text-sm">What is NEAT?</p>
          <p className="text-sm text-orange-700 leading-relaxed">
            NEAT stands for Non-Exercise Activity Thermogenesis: every calorie you burn that isn&apos;t formal exercise or sport.
            Walking to the shops, standing up at your desk, pacing while on the phone. It might not sound like much,
            but an active person can burn 500–1,000 kcal more per day than a sedentary one at the same body weight.
            That&apos;s the equivalent of a second gym session, without any gym kit required.
          </p>
          <div className="rounded-lg bg-orange-100 text-orange-800 px-3 py-2 text-xs font-medium">
            📊 NEAT accounts for up to 30% of total daily energy expenditure
          </div>
        </div>

        {/* NEAT action cards */}
        <div className="grid sm:grid-cols-2 gap-3">

          {/* 10,000 steps */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-xl">
              🚶
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 text-sm">Walk 10,000 steps a day</h3>
              <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                At 80–90kg, 10,000 steps burns roughly 350–400 kcal. That&apos;s almost a meal&apos;s worth of calories without changing
                what you eat. Park at the far end of the car park. Take the stairs. Walk to the corner shop instead of driving.
                The steps add up faster than you think.
              </p>
            </div>
            <div className="rounded-lg bg-emerald-50 text-emerald-800 px-3 py-2 text-xs font-medium">
              🎯 Today&apos;s challenge: walk to somewhere you&apos;d usually drive
            </div>
          </div>

          {/* Active travel */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
              <Bike className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 text-sm">Walk or cycle for short trips</h3>
              <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                Any journey under two miles is a genuine option on foot. Under five miles is doable on a bike.
                Swap one car trip a day for walking or cycling and you&apos;ll add 200–400 kcal of burn before you&apos;ve even
                thought about exercise. It also clears your head before work better than a commute does.
              </p>
            </div>
            <div className="rounded-lg bg-blue-50 text-blue-800 px-3 py-2 text-xs font-medium">
              🎯 Today&apos;s challenge: walk one journey you&apos;d normally drive
            </div>
          </div>

          {/* TV time moves */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-violet-50 flex items-center justify-center">
              <Tv className="h-5 w-5 text-violet-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 text-sm">Move during TV time</h3>
              <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                Nobody&apos;s asking you to give up the sofa. But during ad breaks or between episodes, try:
                calf raises standing up, chair squats, press-ups against the coffee table, or just walking
                to the kitchen and back. Ten minutes of movement across a two-hour watch can add 80–120 kcal burned.
              </p>
            </div>
            <div className="rounded-lg bg-violet-50 text-violet-800 px-3 py-2 text-xs font-medium">
              🎯 Tonight: stand up every time there&apos;s an ad break
            </div>
          </div>

          {/* Desk moves */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
              <Monitor className="h-5 w-5 text-amber-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 text-sm">Desk and office moves</h3>
              <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                Set a phone alarm for every hour. When it goes off: stand up, do ten squats, ten desk push-ups
                or just walk to a colleague&apos;s desk instead of messaging them. Standing burns roughly 50 kcal more
                per hour than sitting. Over an eight-hour day, that&apos;s 400 extra calories with zero sweat.
              </p>
            </div>
            <div className="rounded-lg bg-amber-50 text-amber-800 px-3 py-2 text-xs font-medium">
              🎯 Set an hourly alarm and stand up when it fires
            </div>
          </div>

        </div>
      </section>

      {/* Hydration */}
      <section id="hydration" className="space-y-4">
        <div>
          <h2 className="font-semibold text-gray-800 text-lg flex items-center gap-2">
            <Droplets className="h-5 w-5 text-cyan-500" />
            Hydration
          </h2>
          <p className="text-sm text-gray-500 mt-1">Most men are mildly dehydrated most of the time and have no idea.</p>
        </div>

        <div className="bg-cyan-50 border border-cyan-100 rounded-2xl p-5 space-y-2">
          <p className="font-semibold text-cyan-800 text-sm">Why it matters more than you think</p>
          <p className="text-sm text-cyan-700 leading-relaxed">
            A 1–2% drop in hydration reduces physical performance by around 10% and cognitive performance
            by a similar amount. At 90 kg, that&apos;s just 900 ml of fluid — less than two pints. By the time
            you feel thirsty, you&apos;re already there. Mild dehydration also causes fatigue, headaches and,
            critically for weight loss, your brain often misreads thirst as hunger.
          </p>
          <div className="rounded-lg bg-cyan-100 text-cyan-800 px-3 py-2 text-xs font-medium">
            📊 2% dehydration ≈ 10% drop in physical and mental performance
          </div>
        </div>

        {/* Daily targets */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5 space-y-3">
          <h3 className="font-semibold text-gray-900 text-sm">Daily targets</h3>
          <div className="grid sm:grid-cols-3 gap-3">
            {[
              { label: 'Sedentary day', target: '2–2.5 litres', note: 'Office, sitting around, not much movement' },
              { label: 'Active day', target: '3–3.5 litres', note: 'Walking, manual work, hot weather' },
              { label: 'Match day', target: '3.5–4+ litres', note: 'Include extra before, during and after football' },
            ].map(({ label, target, note }) => (
              <div key={label} className="rounded-xl bg-cyan-50 border border-cyan-100 p-4 text-center space-y-1">
                <p className="text-lg font-bold text-cyan-700">{target}</p>
                <p className="text-xs font-semibold text-cyan-800">{label}</p>
                <p className="text-[10px] text-cyan-600">{note}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-400">
            Tea, coffee and milk all count towards your daily fluid intake. The diuretic effect of caffeine
            is mild and well below the fluid it brings in. Alcohol does not count — it is net dehydrating.
          </p>
        </div>

        {/* How to actually hit the target */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5 space-y-3">
          <h3 className="font-semibold text-gray-900 text-sm">How to actually hit the target every day</h3>
          <div className="space-y-2">
            {[
              { tip: 'Start the morning with 500 ml', detail: 'You wake up dehydrated after 7–8 hours without fluids. A pint of water before your coffee is the single easiest habit to build.' },
              { tip: 'Keep a litre bottle on your desk', detail: 'Visual reminder + easy to track. Finish one before lunch, one before leaving work. You\'re most of the way there.' },
              { tip: 'Check your urine colour', detail: 'Pale straw yellow = well hydrated. Dark yellow = drink more. Clear = overdoing it slightly, which is fine. This is the most honest daily check available.' },
              { tip: '500 ml before each main meal', detail: 'Fills the stomach, reduces appetite, helps digestion. 30 minutes before is ideal but even immediately before makes a difference.' },
              { tip: 'Don\'t wait for thirst', detail: 'Thirst is a late signal. By the time your mouth is dry, you\'ve already had a performance drop. Drink on a schedule, not on demand.' },
            ].map(({ tip, detail }) => (
              <div key={tip} className="flex items-start gap-3 py-2.5 border-b border-gray-50 last:border-0">
                <span className="text-cyan-500 shrink-0 mt-0.5 font-bold text-sm">💧</span>
                <div>
                  <p className="text-sm font-semibold text-gray-800">{tip}</p>
                  <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Football hydration */}
        <div className="bg-white rounded-2xl border border-blue-100 p-5 space-y-4">
          <h3 className="font-semibold text-gray-900 text-sm flex items-center gap-2">
            ⚽ Hydration around football
          </h3>
          <p className="text-sm text-gray-500 leading-relaxed">
            Most ManvFat players eat light all day before weigh-in but still drink water through the day — which
            is exactly right. Water doesn&apos;t linger on the scales the way food does, and going into the match
            dehydrated is a guaranteed way to cramp up, fade badly in the second half and feel rough afterwards.
          </p>

          <div className="space-y-3">
            {/* Before */}
            <div className="rounded-xl bg-gray-50 border border-gray-100 p-4 space-y-1.5">
              <p className="text-xs font-bold text-gray-700 uppercase tracking-wide">During the day (before weigh-in)</p>
              <p className="text-sm text-gray-600 leading-relaxed">
                Drink normally throughout the day — two to three litres as usual. Water doesn&apos;t add the
                same scale weight as food. Being well hydrated going into weigh-in is far better than
                being dehydrated and then struggling through a match.
              </p>
              <p className="text-xs text-gray-400">Avoid fizzy drinks before the match — bloating is real and uncomfortable when you start running.</p>
            </div>

            {/* After weigh-in */}
            <div className="rounded-xl bg-blue-50 border border-blue-100 p-4 space-y-1.5">
              <p className="text-xs font-bold text-blue-700 uppercase tracking-wide">After weigh-in — right before kick-off</p>
              <p className="text-sm text-blue-700 leading-relaxed">
                The weigh-in is done. Drink 400–600 ml of water now. If you have a sports drink (Lucozade Sport,
                High5, Torq etc.), this is the moment to use it — the electrolytes and fast carbs together
                are ideal pre-match. If not, water and your banana or jelly babies does the same job.
              </p>
            </div>

            {/* Half-time */}
            <div className="rounded-xl bg-gray-50 border border-gray-100 p-4 space-y-1.5">
              <p className="text-xs font-bold text-gray-700 uppercase tracking-wide">Half-time</p>
              <p className="text-sm text-gray-600 leading-relaxed">
                200–400 ml of water or a sports drink. Don&apos;t wait until you feel thirsty — you won&apos;t
                absorb it quickly enough to help before the second half starts. Drink as soon as the
                whistle goes. If the match is more than 60 minutes, this matters more.
              </p>
              <p className="text-xs text-gray-400">
                Cramp is usually caused by a combination of fatigue, heat and electrolyte imbalance — not
                just dehydration alone. But staying hydrated significantly reduces the risk.
              </p>
            </div>

            {/* Post-match */}
            <div className="rounded-xl bg-emerald-50 border border-emerald-100 p-4 space-y-1.5">
              <p className="text-xs font-bold text-emerald-700 uppercase tracking-wide">Post-match recovery</p>
              <p className="text-sm text-emerald-700 leading-relaxed">
                You&apos;ll lose around 0.5–1.5 litres of fluid during a match depending on intensity and temperature.
                Replace it with 1.5× what you lost — so roughly 750 ml to 2 litres after the match, spread over
                the next couple of hours. A recovery meal with plenty of fluid handles most of this naturally.
              </p>
              <p className="text-xs text-emerald-600 font-medium mt-1">
                If you&apos;re going to the pub after the match: have a pint of water before your first beer. You&apos;ll drink less, feel better in the morning and the deficit you earned on the pitch won&apos;t get undone.
              </p>
            </div>
          </div>

          <div className="rounded-lg bg-amber-50 border border-amber-100 px-4 py-3 text-xs text-amber-700">
            <strong>Signs you went into the match dehydrated:</strong> early cramping, headache by second half,
            unusual fatigue in the final 20 minutes, feeling groggy for an hour afterwards. These are fixable
            with better daily hydration before the next match day.
          </div>
        </div>
      </section>

      {/* Supplements */}
      <section id="supplements" className="space-y-4">
        <div>
          <h2 className="font-semibold text-gray-800 text-lg flex items-center gap-2">
            <Pill className="h-5 w-5 text-gray-400" />
            Supplements that actually work
          </h2>
          <p className="text-sm text-gray-500 mt-1">Only evidence-backed options. Nothing hyped, nothing dangerous.</p>
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
          Don&apos;t waste your money on these
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

      {/* Match day eating */}
      <section id="match-day" className="space-y-4">
        <div>
          <h2 className="font-semibold text-gray-800 text-lg flex items-center gap-2">
            ⚽ Match day eating
          </h2>
          <p className="text-sm text-gray-500 mt-1">How to weigh in well, fuel the match and recover properly.</p>
        </div>

        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5 space-y-2">
          <p className="font-semibold text-blue-800 text-sm">How ManvFat match day actually works</p>
          <p className="text-sm text-blue-700 leading-relaxed">
            The official weigh-in happens at the ground, immediately before the match. That means most
            players eat light during the day to keep the scales down, then have roughly 30 minutes
            between weigh-in and kick-off to fuel up. That window is critical. Get this right and you&apos;ll
            play better and recover faster.
          </p>
        </div>

        {/* Phase 1 */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5 space-y-3">
          <div className="flex items-center gap-3">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-violet-100 text-sm font-bold text-violet-700">1</span>
            <h3 className="font-semibold text-gray-900">During the day: eat light and low-sodium</h3>
          </div>
          <p className="text-sm text-gray-500 leading-relaxed">
            Until after the weigh-in, keep portions modest and sodium low. Salt causes your body to retain
            water — crisps, takeaways, processed food and ready meals are the main culprits. The night before
            matters too.
          </p>
          <ul className="text-sm text-gray-500 space-y-1.5">
            <li className="flex items-start gap-2"><span className="text-red-400 shrink-0 mt-0.5">✗</span> Heavy meals — food and drink literally weigh something on the scales</li>
            <li className="flex items-start gap-2"><span className="text-red-400 shrink-0 mt-0.5">✗</span> Salty food — causes 0.5–1 kg of water retention that has nothing to do with fat</li>
            <li className="flex items-start gap-2"><span className="text-red-400 shrink-0 mt-0.5">✗</span> Alcohol the night before — inflammation, water retention, poor sleep</li>
          </ul>
          <p className="text-sm text-gray-500 leading-relaxed">
            Good daytime choices: Greek yoghurt and fruit, a light chicken wrap or salad, plenty of water,
            tea and coffee. Enough to function, nothing that piles on temporary scale weight.
          </p>
        </div>

        {/* Phase 2 — most important */}
        <div className="bg-white rounded-2xl border border-blue-100 p-5 space-y-3">
          <div className="flex items-center gap-3">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-700">2</span>
            <h3 className="font-semibold text-gray-900">Immediately after weigh-in: rapid energy snacks</h3>
          </div>
          <div className="rounded-lg bg-blue-50 border border-blue-100 px-4 py-3 text-sm text-blue-800 font-medium">
            ⏱ You have about 30 minutes before kick-off. These need to be portable and eaten at the ground.
          </div>
          <p className="text-sm text-gray-500 leading-relaxed">
            Your goal is fast-releasing carbohydrates that hit the bloodstream quickly. You want your blood
            sugar up for the first whistle, not still waiting in your stomach. Keep it small — you don&apos;t
            want anything sitting heavily when you start running.
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { food: 'Banana', why: 'The best single option. Fast carbs, potassium to help prevent cramp, easy to eat anywhere. Bring one in your kit bag.' },
              { food: 'Jelly babies or wine gums', why: 'Pure fast sugar — hits the blood in minutes. Three to four sweets is enough, not the whole bag.' },
              { food: 'Small carton of orange juice', why: 'Fast glucose and vitamin C. Easy to bring, done in 30 seconds.' },
              { food: 'Rice cakes', why: 'Light, portable, fast carbs with minimal stomach bulk. Two or three is plenty.' },
              { food: 'Energy gel', why: 'Designed for exactly this — 30 minutes before exercise. One gel, chase with water.' },
              { food: 'Handful of dates', why: 'Very high natural sugar content, portable, and no wrapper to deal with.' },
            ].map(({ food, why }) => (
              <div key={food} className="rounded-xl bg-blue-50 border border-blue-100 p-3">
                <p className="text-sm font-semibold text-blue-900">{food}</p>
                <p className="text-xs text-blue-700 mt-0.5 leading-relaxed">{why}</p>
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-500 leading-relaxed">
            Keep one or two of these in your kit bag every week. Going into a match with low blood sugar
            after eating light all day will hurt your performance in the first 20 minutes.
          </p>
        </div>

        {/* Phase 3 */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5 space-y-3">
          <div className="flex items-center gap-3">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-700">3</span>
            <h3 className="font-semibold text-gray-900">After the match: recover and refuel</h3>
          </div>
          <p className="text-sm text-gray-500 leading-relaxed">
            An hour of five-a-side burns 600–900 kcal. The weigh-in is done, you&apos;ve earned it. Get protein
            and carbohydrates in within 45 minutes of the final whistle to aid recovery and stop the
            post-match hunger from turning into a binge.
          </p>
          <div className="rounded-lg bg-emerald-50 border border-emerald-100 px-4 py-3 text-sm text-emerald-700 font-medium">
            📊 60–90 mins of football at 85–95 kg ≈ 600–900 kcal burned
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { food: 'Chicken and rice', why: 'The classic recovery meal — 40–50g protein, fast carbs to refill glycogen.' },
              { food: 'Pasta with lean beef mince', why: 'Turkey Bolognese from the recipe library is ideal here. High carb, high protein.' },
              { food: 'Big chicken wrap with salad', why: 'Quick to make on the way home. Portable if eating at the ground.' },
              { food: 'Protein shake and banana', why: 'If you\'re not ready for a full meal yet — gets protein and fast carbs in quickly.' },
              { food: 'Beans on toast with cheese', why: 'Cheap, fast, around 30g protein. Better recovery meal than most people think.' },
              { food: 'Jacket potato with tuna and cheese', why: 'High satiety, excellent protein and carb balance. Good for a hungrier evening.' },
            ].map(({ food, why }) => (
              <div key={food} className="rounded-xl bg-emerald-50 border border-emerald-100 p-3">
                <p className="text-sm font-semibold text-emerald-900">{food}</p>
                <p className="text-xs text-emerald-700 mt-0.5 leading-relaxed">{why}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-50 rounded-2xl border border-gray-100 p-4">
          <p className="text-xs text-gray-500 leading-relaxed">
            <strong className="text-gray-700">The one thing to take away:</strong> pack a banana in your kit bag every match day.
            Eating light all day is fine — but going into the first whistle with low blood sugar is not. Thirty seconds
            of prep before you leave the house makes a real difference to how you play.
          </p>
        </div>
      </section>

      {/* Weigh-in prep */}
      <section id="weigh-in" className="space-y-4">
        <div>
          <h2 className="font-semibold text-gray-800 text-lg flex items-center gap-2">
            ⚖️ ManvFat weigh-in strategy
          </h2>
          <p className="text-sm text-gray-500 mt-1">The 24 hours before weigh-in matter more than most men realise.</p>
        </div>

        <div className="bg-violet-50 border border-violet-100 rounded-2xl p-5 space-y-2">
          <p className="font-semibold text-violet-800 text-sm">Why bother with prep?</p>
          <p className="text-sm text-violet-700 leading-relaxed">
            Your body weight fluctuates by 1–3 kg day to day depending on what you ate, how much water you drank
            and how well you slept. None of that is fat. Getting your prep right means the scales reflect
            genuine progress rather than last night&apos;s curry.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-3">
          <div className="bg-white rounded-2xl border border-gray-100 p-5 space-y-2">
            <p className="text-xl">🧂</p>
            <h3 className="font-semibold text-gray-900 text-sm">Keep sodium low the night before</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Salt causes your body to retain water. Takeaways, crisps, processed meats and ready meals are
              all high in sodium. A lighter, home-cooked dinner the night before weigh-in can make a
              meaningful difference on the scales.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-5 space-y-2">
            <p className="text-xl">💧</p>
            <h3 className="font-semibold text-gray-900 text-sm">Drink plenty of water</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              This sounds counterintuitive but staying well hydrated actually reduces water retention.
              When you&apos;re dehydrated, your body holds on to fluid. Aim for two to three litres during the
              day and avoid going to bed thirsty.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-5 space-y-2">
            <p className="text-xl">🍺</p>
            <h3 className="font-semibold text-gray-900 text-sm">Skip the alcohol</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Alcohol is high in calories and causes significant water retention and inflammation.
              Even two or three pints the night before weigh-in can add 0.5–1 kg on the scales purely
              from fluid retention. Save the celebratory drink for after the weigh-in.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-5 space-y-2">
            <p className="text-xl">🌙</p>
            <h3 className="font-semibold text-gray-900 text-sm">Get a decent night&apos;s sleep</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Poor sleep increases cortisol, which promotes water retention and fat storage around
              the belly. Even one bad night can add 0.3–0.5 kg of temporary weight. A good sleep
              costs nothing and pays out on the scales.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-5 space-y-2">
            <p className="text-xl">⏰</p>
            <h3 className="font-semibold text-gray-900 text-sm">Weigh in first thing</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Weigh yourself first thing in the morning, after using the toilet and before eating or
              drinking anything. This is your lowest and most consistent daily weight. Do it at the
              same time every week in the same clothes — consistency is what makes the trend meaningful.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-5 space-y-2">
            <p className="text-xl">👕</p>
            <h3 className="font-semibold text-gray-900 text-sm">Wear the same kit every week</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Clothing can add 0.2–0.8 kg depending on what you wear. Jeans vs. shorts is a measurable
              difference. Keep the same trainers, same shorts, same kit each week so the number you&apos;re
              comparing is as consistent as possible.
            </p>
          </div>
        </div>

        <div className="bg-emerald-50 rounded-2xl border border-emerald-100 p-5">
          <p className="font-semibold text-emerald-800 text-sm mb-2">The big picture</p>
          <p className="text-sm text-emerald-700 leading-relaxed">
            Week-to-week fluctuations are normal and often frustrating. What matters is the trend over four to
            six weeks. One bad weigh-in doesn&apos;t mean you&apos;re failing. Look at the direction of travel, not
            the individual data points. The app&apos;s Progress page shows you the trend line.
          </p>
        </div>
      </section>

      {/* Takeaway survival guide */}
      <section id="takeaways" className="space-y-4">
        <div>
          <h2 className="font-semibold text-gray-800 text-lg flex items-center gap-2">
            🥡 Takeaway survival guide
          </h2>
          <p className="text-sm text-gray-500 mt-1">Real life has takeaways. Here is how to order without undoing the week.</p>
        </div>

        <div className="bg-amber-50 border border-amber-100 rounded-2xl p-5 space-y-2">
          <p className="font-semibold text-amber-800 text-sm">The golden rules — apply to every takeaway</p>
          <ul className="text-sm text-amber-700 space-y-1.5 mt-2">
            {[
              'Protein first — always identify the highest-protein option and build the meal around it.',
              'Skip liquid calories entirely. A large Coke is 200 kcal and zero protein. Water or diet drinks every time.',
              'One starch, not two. Pick rice or chips or bread — not all three.',
              'Sauces on the side where possible. Mayo, garlic sauce and korma sauce are where the damage happens.',
              'Eat slowly. It takes 20 minutes for your stomach to signal fullness. The faster you eat, the more you will consume.',
            ].map((rule) => (
              <li key={rule} className="flex items-start gap-2">
                <span className="text-amber-500 shrink-0 mt-0.5">✓</span>
                <span>{rule}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Individual takeaway cards */}
        <div className="space-y-3">

          {/* McDonald's */}
          <details className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:border-gray-200 transition-all">
            <summary className="flex items-center gap-4 p-5 cursor-pointer list-none">
              <span className="text-2xl shrink-0">🍔</span>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900">McDonald&apos;s</h3>
                <p className="text-sm text-gray-500 mt-0.5">Easier than you think if you ignore the meal deal</p>
              </div>
              <span className="text-xs text-gray-400 group-open:hidden shrink-0">Details ▾</span>
              <span className="text-xs text-gray-400 hidden group-open:block shrink-0">Close ▴</span>
            </summary>
            <div className="px-5 pb-5 border-t border-gray-50 pt-4 space-y-4">
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="rounded-xl bg-emerald-50 border border-emerald-100 p-4 space-y-2">
                  <p className="text-xs font-bold text-emerald-700 uppercase tracking-wide">✓ Smart choices</p>
                  <ul className="text-sm text-emerald-700 space-y-1">
                    <li>Grilled Chicken Burger — ~390 kcal, 28 g protein</li>
                    <li>McChicken Sandwich — ~390 kcal, 19 g protein</li>
                    <li>Hamburger — ~250 kcal if you just want something small</li>
                    <li>Side salad instead of fries</li>
                    <li>Diet Coke or water — saves 200 kcal over regular</li>
                  </ul>
                </div>
                <div className="rounded-xl bg-red-50 border border-red-100 p-4 space-y-2">
                  <p className="text-xs font-bold text-red-700 uppercase tracking-wide">✗ The damage</p>
                  <ul className="text-sm text-red-700 space-y-1">
                    <li>Big Mac + large fries + regular Coke ≈ 1,200 kcal</li>
                    <li>Large fries alone — 444 kcal</li>
                    <li>Milkshake — 400–600 kcal</li>
                    <li>McFlurry — 330–420 kcal</li>
                  </ul>
                </div>
              </div>
              <div className="rounded-lg bg-amber-50 border border-amber-100 px-4 py-3 text-xs text-amber-700">
                <strong>The one switch:</strong> ditch the large fries and regular Coke from a meal deal and you save roughly 650 kcal without giving up the burger.
              </div>
            </div>
          </details>

          {/* KFC */}
          <details className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:border-gray-200 transition-all">
            <summary className="flex items-center gap-4 p-5 cursor-pointer list-none">
              <span className="text-2xl shrink-0">🍗</span>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900">KFC</h3>
                <p className="text-sm text-gray-500 mt-0.5">High protein potential — easy to wreck with sides and dips</p>
              </div>
              <span className="text-xs text-gray-400 group-open:hidden shrink-0">Details ▾</span>
              <span className="text-xs text-gray-400 hidden group-open:block shrink-0">Close ▴</span>
            </summary>
            <div className="px-5 pb-5 border-t border-gray-50 pt-4 space-y-4">
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="rounded-xl bg-emerald-50 border border-emerald-100 p-4 space-y-2">
                  <p className="text-xs font-bold text-emerald-700 uppercase tracking-wide">✓ Smart choices</p>
                  <ul className="text-sm text-emerald-700 space-y-1">
                    <li>Original Recipe breast piece — ~265 kcal, 29 g protein</li>
                    <li>Two-piece Original meal with corn on the cob</li>
                    <li>Zinger Salad Box — keeps calories low, reasonable protein</li>
                    <li>Rice box meals — controlled portion, higher protein ratio</li>
                    <li>No gravy, ketchup only</li>
                  </ul>
                </div>
                <div className="rounded-xl bg-red-50 border border-red-100 p-4 space-y-2">
                  <p className="text-xs font-bold text-red-700 uppercase tracking-wide">✗ The damage</p>
                  <ul className="text-sm text-red-700 space-y-1">
                    <li>Zinger Tower Burger — 620 kcal before sides</li>
                    <li>Bargain Bucket for one — easily 1,400+ kcal</li>
                    <li>Large fries + gravy — adds 600 kcal to any meal</li>
                    <li>Popcorn Chicken sharing box — 700+ kcal</li>
                  </ul>
                </div>
              </div>
              <div className="rounded-lg bg-amber-50 border border-amber-100 px-4 py-3 text-xs text-amber-700">
                <strong>The one switch:</strong> swap large fries and gravy for corn on the cob. Saves around 450 kcal and actually adds fibre.
              </div>
            </div>
          </details>

          {/* Pizza */}
          <details className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:border-gray-200 transition-all">
            <summary className="flex items-center gap-4 p-5 cursor-pointer list-none">
              <span className="text-2xl shrink-0">🍕</span>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900">Pizza (Domino&apos;s, Papa John&apos;s, local)</h3>
                <p className="text-sm text-gray-500 mt-0.5">Portion size is everything — the base and sauce vary wildly</p>
              </div>
              <span className="text-xs text-gray-400 group-open:hidden shrink-0">Details ▾</span>
              <span className="text-xs text-gray-400 hidden group-open:block shrink-0">Close ▴</span>
            </summary>
            <div className="px-5 pb-5 border-t border-gray-50 pt-4 space-y-4">
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="rounded-xl bg-emerald-50 border border-emerald-100 p-4 space-y-2">
                  <p className="text-xs font-bold text-emerald-700 uppercase tracking-wide">✓ Smart choices</p>
                  <ul className="text-sm text-emerald-700 space-y-1">
                    <li>Thin crust over deep pan — roughly half the dough calories</li>
                    <li>Chicken or veg toppings over processed meat</li>
                    <li>Tomato base over BBQ (lower sugar)</li>
                    <li>Two to three slices, eaten on a plate — not from the box</li>
                    <li>Side salad rather than garlic bread</li>
                  </ul>
                </div>
                <div className="rounded-xl bg-red-50 border border-red-100 p-4 space-y-2">
                  <p className="text-xs font-bold text-red-700 uppercase tracking-wide">✗ The damage</p>
                  <ul className="text-sm text-red-700 space-y-1">
                    <li>Stuffed crust deep pan — adds ~100 kcal per slice vs. thin crust</li>
                    <li>Sharing box + garlic bread + dips ≈ 1,800+ kcal easily</li>
                    <li>Garlic mayo or BBQ dip — 150–200 kcal each</li>
                    <li>Eating direct from the box — you lose track fast</li>
                  </ul>
                </div>
              </div>
              <div className="rounded-lg bg-amber-50 border border-amber-100 px-4 py-3 text-xs text-amber-700">
                <strong>Rough guide:</strong> a medium thin-crust slice is around 200–230 kcal. A medium deep-pan slice is 290–340 kcal. Two slices versus six is the real decision.
              </div>
            </div>
          </details>

          {/* Indian */}
          <details className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:border-gray-200 transition-all">
            <summary className="flex items-center gap-4 p-5 cursor-pointer list-none">
              <span className="text-2xl shrink-0">🍛</span>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900">Indian takeaway</h3>
                <p className="text-sm text-gray-500 mt-0.5">Cream and butter are where the calories hide — not the spice</p>
              </div>
              <span className="text-xs text-gray-400 group-open:hidden shrink-0">Details ▾</span>
              <span className="text-xs text-gray-400 hidden group-open:block shrink-0">Close ▴</span>
            </summary>
            <div className="px-5 pb-5 border-t border-gray-50 pt-4 space-y-4">
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="rounded-xl bg-emerald-50 border border-emerald-100 p-4 space-y-2">
                  <p className="text-xs font-bold text-emerald-700 uppercase tracking-wide">✓ Smart choices</p>
                  <ul className="text-sm text-emerald-700 space-y-1">
                    <li>Tandoori or tikka (dry) — 250–350 kcal, high protein</li>
                    <li>Shish kebab starter — lean grilled meat, good protein</li>
                    <li>Chicken jalfrezi or madras — tomato-based, lower in fat</li>
                    <li>Chicken or prawn biryani — rice-based, reasonably balanced</li>
                    <li>Dal — high fibre, plant protein, low calorie</li>
                    <li>Plain naan (~340 kcal) rather than keema or peshwari</li>
                    <li>Raita on the side — cools the heat, low calorie</li>
                  </ul>
                </div>
                <div className="rounded-xl bg-red-50 border border-red-100 p-4 space-y-2">
                  <p className="text-xs font-bold text-red-700 uppercase tracking-wide">✗ The damage</p>
                  <ul className="text-sm text-red-700 space-y-1">
                    <li>Korma — the cream and coconut make it 600–800 kcal per portion</li>
                    <li>Peshwari naan — 500+ kcal</li>
                    <li>Onion bhajis — around 200 kcal each, easy to have four</li>
                    <li>Keema naan — high fat and calories</li>
                    <li>Mango chutney (fine) + raita + extra naan — adds up invisibly</li>
                  </ul>
                </div>
              </div>
              <div className="rounded-lg bg-amber-50 border border-amber-100 px-4 py-3 text-xs text-amber-700">
                <strong>The rule of thumb:</strong> if the sauce is pale (korma, passanda, butter chicken) it is cream-heavy. If it is red or orange (jalfrezi, madras, vindaloo) it is tomato-based and significantly lower in calories.
              </div>
            </div>
          </details>

          {/* Chinese */}
          <details className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:border-gray-200 transition-all">
            <summary className="flex items-center gap-4 p-5 cursor-pointer list-none">
              <span className="text-2xl shrink-0">🥢</span>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900">Chinese takeaway</h3>
                <p className="text-sm text-gray-500 mt-0.5">Batter, deep frying and egg fried rice are the main culprits</p>
              </div>
              <span className="text-xs text-gray-400 group-open:hidden shrink-0">Details ▾</span>
              <span className="text-xs text-gray-400 hidden group-open:block shrink-0">Close ▴</span>
            </summary>
            <div className="px-5 pb-5 border-t border-gray-50 pt-4 space-y-4">
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="rounded-xl bg-emerald-50 border border-emerald-100 p-4 space-y-2">
                  <p className="text-xs font-bold text-emerald-700 uppercase tracking-wide">✓ Smart choices</p>
                  <ul className="text-sm text-emerald-700 space-y-1">
                    <li>Steamed dim sum over deep-fried</li>
                    <li>Chicken and broccoli — high protein, light sauce</li>
                    <li>Beef with oyster sauce — lean protein, moderate calories</li>
                    <li>Boiled/steamed rice — saves ~200 kcal over egg fried rice</li>
                    <li>Clear broth soups — very low calorie, surprisingly filling</li>
                    <li>King prawn dishes — high protein, low fat when not battered</li>
                  </ul>
                </div>
                <div className="rounded-xl bg-red-50 border border-red-100 p-4 space-y-2">
                  <p className="text-xs font-bold text-red-700 uppercase tracking-wide">✗ The damage</p>
                  <ul className="text-sm text-red-700 space-y-1">
                    <li>Sweet and sour chicken (battered) — 700–900 kcal</li>
                    <li>Prawn crackers — 500+ kcal for a standard bag</li>
                    <li>Egg fried rice — 400–500 kcal vs. 350 for boiled rice</li>
                    <li>Spring rolls (deep-fried) — 200–250 kcal each</li>
                    <li>Crispy duck pancakes — high fat, easy to overeat</li>
                  </ul>
                </div>
              </div>
              <div className="rounded-lg bg-amber-50 border border-amber-100 px-4 py-3 text-xs text-amber-700">
                <strong>The one switch:</strong> boiled rice over egg fried rice saves around 150–200 kcal and you genuinely cannot taste the difference when there is a sauce on it.
              </div>
            </div>
          </details>

          {/* Kebab shop */}
          <details className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:border-gray-200 transition-all">
            <summary className="flex items-center gap-4 p-5 cursor-pointer list-none">
              <span className="text-2xl shrink-0">🥙</span>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900">Kebab shop</h3>
                <p className="text-sm text-gray-500 mt-0.5">Actually has good protein options — if you choose well</p>
              </div>
              <span className="text-xs text-gray-400 group-open:hidden shrink-0">Details ▾</span>
              <span className="text-xs text-gray-400 hidden group-open:block shrink-0">Close ▴</span>
            </summary>
            <div className="px-5 pb-5 border-t border-gray-50 pt-4 space-y-4">
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="rounded-xl bg-emerald-50 border border-emerald-100 p-4 space-y-2">
                  <p className="text-xs font-bold text-emerald-700 uppercase tracking-wide">✓ Smart choices</p>
                  <ul className="text-sm text-emerald-700 space-y-1">
                    <li>Shish kebab — chargrilled chunks of meat, 25–35 g protein, lower fat than doner</li>
                    <li>Chicken shish over lamb — leaner protein</li>
                    <li>Wrap with extra salad, light on the sauce</li>
                    <li>Pitta over naan — roughly 100 kcal less</li>
                    <li>Chilli sauce rather than garlic mayo</li>
                  </ul>
                </div>
                <div className="rounded-xl bg-red-50 border border-red-100 p-4 space-y-2">
                  <p className="text-xs font-bold text-red-700 uppercase tracking-wide">✗ The damage</p>
                  <ul className="text-sm text-red-700 space-y-1">
                    <li>Large doner in naan with chips — easily 1,400 kcal</li>
                    <li>Garlic mayo sauce — 150–200 kcal per ladle</li>
                    <li>Large chips — 500–600 kcal</li>
                    <li>Mixed doner and chips combo — can hit 1,800 kcal</li>
                  </ul>
                </div>
              </div>
              <div className="rounded-lg bg-amber-50 border border-amber-100 px-4 py-3 text-xs text-amber-700">
                <strong>Shish beats doner</strong> every time. Doner meat is compressed, fatty offcuts. Shish is actual chunks of marinated meat. The calorie difference can be 300–500 kcal for the same portion size.
              </div>
            </div>
          </details>

        </div>

        {/* Summary table */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5 space-y-3">
          <h3 className="font-semibold text-gray-900 text-sm">Quick reference — best and worst at a glance</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="pb-2 font-semibold text-gray-500 w-1/4">Takeaway</th>
                  <th className="pb-2 font-semibold text-emerald-600">Best order</th>
                  <th className="pb-2 font-semibold text-red-500 pl-3">Worst trap</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {[
                  { place: 'McDonald\'s', best: 'Grilled chicken burger + water', worst: 'Large meal deal' },
                  { place: 'KFC', best: '2-piece Original + corn on the cob', worst: 'Bargain Bucket + gravy' },
                  { place: 'Pizza', best: 'Thin crust, 2–3 slices, chicken', worst: 'Stuffed crust deep pan + garlic bread' },
                  { place: 'Indian', best: 'Tikka or jalfrezi + plain naan', worst: 'Korma + peshwari naan + bhajis' },
                  { place: 'Chinese', best: 'Chicken and broccoli + boiled rice', worst: 'Sweet and sour (battered) + egg fried rice' },
                  { place: 'Kebab', best: 'Chicken shish in pitta + salad', worst: 'Large doner in naan + chips + garlic mayo' },
                ].map(({ place, best, worst }) => (
                  <tr key={place}>
                    <td className="py-2.5 font-medium text-gray-700">{place}</td>
                    <td className="py-2.5 text-emerald-700">{best}</td>
                    <td className="py-2.5 text-red-600 pl-3">{worst}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-gray-50 rounded-2xl border border-gray-100 p-4">
          <p className="text-xs text-gray-500 leading-relaxed">
            <strong className="text-gray-700">The bigger picture:</strong> one takeaway a week will not derail your progress. What matters is the other 20-odd meals. A 700 kcal takeaway in a week with a 500 kcal daily deficit still leaves you in net negative territory. The goal is not to never have a takeaway — it is to make one or two sensible choices per order so the damage is manageable.
          </p>
        </div>
      </section>

      {/* Pub & weekend survival guide */}
      <section id="weekend" className="space-y-4">
        <div>
          <h2 className="font-semibold text-gray-800 text-lg flex items-center gap-2">
            🍺 Pub &amp; weekend survival guide
          </h2>
          <p className="text-sm text-gray-500 mt-1">Most diets die on Saturday. Here is how to enjoy yourself without losing the week.</p>
        </div>

        {/* Why weekends are the main problem */}
        <div className="bg-amber-50 border border-amber-100 rounded-2xl p-5 space-y-2">
          <p className="font-semibold text-amber-800 text-sm">Why weekends undo the week</p>
          <p className="text-sm text-amber-700 leading-relaxed">
            Research consistently shows that men eat well Monday to Friday and then overshoot by 1,500–2,500 kcal
            across Saturday and Sunday. That is enough to wipe out a full week of deficit. It is not willpower —
            it is structure. Weekdays have routines; weekends do not. The solution is not to restrict weekends
            further, it is to add a few light guardrails so the damage stays manageable.
          </p>
          <div className="rounded-lg bg-amber-100 text-amber-800 px-3 py-2 text-xs font-medium">
            📊 A typical &quot;treat weekend&quot; adds 2,000+ kcal surplus across two days — enough to cancel Mon–Fri
          </div>
        </div>

        {/* Alcohol and fat loss */}
        <details className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:border-gray-200 transition-all" open>
          <summary className="flex items-center gap-4 p-5 cursor-pointer list-none">
            <span className="text-2xl shrink-0">🍻</span>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900">Alcohol and fat loss — the honest version</h3>
              <p className="text-sm text-gray-500 mt-0.5">Why it hits harder than the calorie count suggests</p>
            </div>
            <span className="text-xs text-gray-400 group-open:hidden shrink-0">Details ▾</span>
            <span className="text-xs text-gray-400 hidden group-open:block shrink-0">Close ▴</span>
          </summary>
          <div className="px-5 pb-5 border-t border-gray-50 pt-4 space-y-4">
            <div className="space-y-3">
              {[
                {
                  icon: '⚡',
                  title: 'Alcohol has 7 kcal per gram — almost as much as fat',
                  detail: 'Fat has 9 kcal/g, protein and carbs have 4 kcal/g. Alcohol sits at 7 kcal/g with zero nutritional value. Six pints of lager adds roughly 1,100 kcal before you order a single chip.',
                },
                {
                  icon: '🛑',
                  title: 'Fat burning stops completely while alcohol is in your system',
                  detail: 'Your liver treats alcohol as a toxin and prioritises clearing it above everything else. Fat oxidation halts for the entire time your body is processing the alcohol — which can be 12–16 hours after a big night.',
                },
                {
                  icon: '🧠',
                  title: 'It lowers your food inhibitions',
                  detail: 'Alcohol reduces the activity of the prefrontal cortex — the part of your brain that makes sensible food decisions. The kebab on the way home and the full fry-up in the morning are not accidents; they are a direct pharmacological effect.',
                },
                {
                  icon: '😴',
                  title: 'It wrecks sleep quality even when you sleep long',
                  detail: 'Alcohol sedates you but suppresses REM and deep sleep. Poor sleep increases ghrelin (the hunger hormone) by 24% the next day. You will wake up hungrier than usual and have less willpower to resist it.',
                },
              ].map(({ icon, title, detail }) => (
                <div key={title} className="flex items-start gap-3 py-2.5 border-b border-gray-50 last:border-0">
                  <span className="text-lg shrink-0">{icon}</span>
                  <div>
                    <p className="text-sm font-semibold text-gray-800">{title}</p>
                    <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{detail}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="rounded-lg bg-gray-50 border border-gray-100 px-4 py-3 text-xs text-gray-600">
              <strong>The key insight:</strong> it is rarely the alcohol calories alone that cause the damage. It is the alcohol calories + the late-night food + the hangover eating the next day. One decent night out can easily be 3,000–4,000 kcal total when you add it all up.
            </div>
          </div>
        </details>

        {/* Drink choices */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5 space-y-4">
          <h3 className="font-semibold text-gray-900 text-sm">Drink smarter — the calorie reality</h3>
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="rounded-xl bg-emerald-50 border border-emerald-100 p-4 space-y-2">
              <p className="text-xs font-bold text-emerald-700 uppercase tracking-wide">✓ Lower damage</p>
              <ul className="text-sm text-emerald-700 space-y-1.5">
                <li className="flex justify-between"><span>Spirits + diet mixer</span><span className="font-semibold">~65 kcal</span></li>
                <li className="flex justify-between"><span>Prosecco / champagne (125 ml)</span><span className="font-semibold">~90 kcal</span></li>
                <li className="flex justify-between"><span>Dry white wine (175 ml)</span><span className="font-semibold">~120 kcal</span></li>
                <li className="flex justify-between"><span>Light beer / lager (330 ml)</span><span className="font-semibold">~90 kcal</span></li>
                <li className="flex justify-between"><span>Half pint of regular lager</span><span className="font-semibold">~110 kcal</span></li>
              </ul>
            </div>
            <div className="rounded-xl bg-red-50 border border-red-100 p-4 space-y-2">
              <p className="text-xs font-bold text-red-700 uppercase tracking-wide">✗ Higher damage</p>
              <ul className="text-sm text-red-700 space-y-1.5">
                <li className="flex justify-between"><span>Pint of premium lager (Peroni etc.)</span><span className="font-semibold">~250 kcal</span></li>
                <li className="flex justify-between"><span>Pint of Guinness</span><span className="font-semibold">~210 kcal</span></li>
                <li className="flex justify-between"><span>Spirits + full-fat mixer</span><span className="font-semibold">~200 kcal</span></li>
                <li className="flex justify-between"><span>Piña colada / Long Island</span><span className="font-semibold">350–500 kcal</span></li>
                <li className="flex justify-between"><span>Baileys / cream liqueur (50 ml)</span><span className="font-semibold">~130 kcal</span></li>
              </ul>
            </div>
          </div>
          <div className="rounded-lg bg-amber-50 border border-amber-100 px-4 py-3 text-xs text-amber-700">
            <strong>The mixer swap:</strong> switching from full-fat Coke/lemonade to diet saves around 150 kcal per drink. On a six-drink night, that is 900 kcal — almost a full meal — for no perceptible taste difference.
          </div>
        </div>

        {/* Pub food */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5 space-y-4">
          <h3 className="font-semibold text-gray-900 text-sm">Pub food — the hidden calorie traps</h3>
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="rounded-xl bg-emerald-50 border border-emerald-100 p-4 space-y-2">
              <p className="text-xs font-bold text-emerald-700 uppercase tracking-wide">✓ Reasonable choices</p>
              <ul className="text-sm text-emerald-700 space-y-1">
                <li>Steak (no sauce, swap chips for salad)</li>
                <li>Grilled chicken — ~400–500 kcal with salad</li>
                <li>Fish — grilled, not battered</li>
                <li>Burger without the bun if it comes with fries</li>
                <li>Scampi with side salad over chips</li>
              </ul>
            </div>
            <div className="rounded-xl bg-red-50 border border-red-100 p-4 space-y-2">
              <p className="text-xs font-bold text-red-700 uppercase tracking-wide">✗ The traps</p>
              <ul className="text-sm text-red-700 space-y-1">
                <li>Beer-battered fish and chips — 1,000–1,200 kcal</li>
                <li>Pie and mash — 900–1,100 kcal</li>
                <li>Shared nachos starter — 600–900 kcal between two</li>
                <li>Bread basket before the meal — 200–300 kcal</li>
                <li>Onion rings as a side — 400–500 kcal</li>
              </ul>
            </div>
          </div>
          <p className="text-xs text-gray-500 leading-relaxed">
            The starter is often where the most avoidable damage happens. Ordering a starter when you are hungry from an afternoon of drinking adds 400–600 kcal before the main arrives. If you are going to a pub dinner, eat something small beforehand — it reduces the starter urge entirely.
          </p>
        </div>

        {/* Practical strategies */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5 space-y-3">
          <h3 className="font-semibold text-gray-900 text-sm">Practical strategies that actually work</h3>
          <div className="space-y-2">
            {[
              {
                tip: 'Eat a proper meal before going out',
                detail: 'A chicken and rice meal an hour before going to the pub slows alcohol absorption, reduces early hunger, and removes the impulse to order starters. This one habit alone can save 500–800 kcal on a night out.',
              },
              {
                tip: 'Alternate every drink with a water',
                detail: 'You will drink roughly half the alcohol, stay more hydrated, get less drunk (which reduces impulsive food decisions), and feel dramatically better in the morning. Most people cannot tell the difference in a pub environment.',
              },
              {
                tip: 'Set your drink limit before you go out, not once you are there',
                detail: 'Decide on three or four drinks before you leave the house. Once you are two drinks in with your mates suggesting another round, willpower alone will not save you. The decision needs to be made in advance.',
              },
              {
                tip: 'Avoid getting into a round',
                detail: 'Rounds force you to match other people\'s pace. Ordering for yourself means you drink at your own speed. If you are in a group, order a soft drink occasionally — most people do not notice, and nobody actually cares.',
              },
              {
                tip: 'Plan your post-pub food in advance',
                detail: 'Put something in the fridge before you go out — Greek yoghurt, a protein bar, some leftover chicken. If there is something decent waiting at home, the kebab shop is less tempting. The decision is made while sober.',
              },
              {
                tip: 'Do not skip breakfast the morning after',
                detail: 'Skipping breakfast to "compensate" backfires. You will be ravenous by midday, your blood sugar will be all over the place, and you will overeat at lunch. A normal high-protein breakfast is the fastest way back on track.',
              },
            ].map(({ tip, detail }) => (
              <div key={tip} className="flex items-start gap-3 py-2.5 border-b border-gray-50 last:border-0">
                <span className="text-emerald-500 shrink-0 mt-0.5 font-bold text-sm">✓</span>
                <div>
                  <p className="text-sm font-semibold text-gray-800">{tip}</p>
                  <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* The morning after */}
        <div className="bg-white rounded-2xl border border-blue-100 p-5 space-y-3">
          <h3 className="font-semibold text-gray-900 text-sm flex items-center gap-2">
            🌅 The morning after — what the scales are telling you
          </h3>
          <p className="text-sm text-gray-500 leading-relaxed">
            You step on the scales and you are 1.5 kg heavier than yesterday. Before you spiral — this is not fat.
            To gain 1 kg of actual body fat, you need to eat 7,700 kcal above your maintenance. That does not happen
            in one night. What you are seeing is:
          </p>
          <ul className="space-y-1.5 text-sm text-gray-500">
            <li className="flex items-start gap-2"><span className="text-blue-400 shrink-0">→</span> Water retention from alcohol and salty food</li>
            <li className="flex items-start gap-2"><span className="text-blue-400 shrink-0">→</span> Food still sitting in your digestive system</li>
            <li className="flex items-start gap-2"><span className="text-blue-400 shrink-0">→</span> Glycogen refill from carbohydrates eaten</li>
            <li className="flex items-start gap-2"><span className="text-blue-400 shrink-0">→</span> Inflammation and increased blood flow from the alcohol</li>
          </ul>
          <p className="text-sm text-gray-500 leading-relaxed">
            It will be gone within 48–72 hours of eating and drinking normally. The worst thing to do is panic, skip
            meals, or start punishing yourself. Get back to your normal routine immediately — that is genuinely all it takes.
          </p>
          <div className="rounded-lg bg-blue-50 border border-blue-100 px-4 py-3 text-xs text-blue-700 font-medium">
            ✓ One night out does not destroy a week of progress. Two nights out back-to-back every weekend for a month does.
          </div>
        </div>

        {/* Weekend structure */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5 space-y-3">
          <h3 className="font-semibold text-gray-900 text-sm">A looser weekend structure that still works</h3>
          <p className="text-sm text-gray-500 leading-relaxed">
            You do not need to track macros on a Saturday. But having a loose framework stops the
            weekend from becoming completely unstructured:
          </p>
          <div className="space-y-3">
            {[
              { phase: 'Saturday morning', colour: 'bg-emerald-50 border-emerald-100 text-emerald-800', text: 'Normal high-protein breakfast — eggs, Greek yoghurt, protein shake. Do not skip it to "save" calories. Starting full means better decisions all day.' },
              { phase: 'Saturday lunch', colour: 'bg-emerald-50 border-emerald-100 text-emerald-800', text: 'Light and protein-heavy — sandwich, salad, soup. This is the easiest meal to get right and it sets you up well for the evening.' },
              { phase: 'Saturday evening (pub/out)', colour: 'bg-amber-50 border-amber-100 text-amber-800', text: 'Enjoy yourself with a few sensible switches — diet mixers, lighter drinks, skip the starter, eat before you go out. Aim to stay within 600–800 kcal over your target rather than 2,000.' },
              { phase: 'Sunday morning', colour: 'bg-blue-50 border-blue-100 text-blue-800', text: 'Normal breakfast even if you feel rough. Hydrate well. Do not skip meals as punishment — it will make Sunday afternoon much harder to control.' },
              { phase: 'Sunday overall', colour: 'bg-violet-50 border-violet-100 text-violet-800', text: 'Sunday is the recovery day, not a second big evening. Get back to normal eating, walk if you can stomach it, and prepare for Monday properly. The week starts Sunday evening, not Monday morning.' },
            ].map(({ phase, colour, text }) => (
              <div key={phase} className={`rounded-xl border ${colour} p-4`}>
                <p className="text-xs font-bold uppercase tracking-wide mb-1.5">{phase}</p>
                <p className="text-sm leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-50 rounded-2xl border border-gray-100 p-4">
          <p className="text-xs text-gray-500 leading-relaxed">
            <strong className="text-gray-700">The ManvFat perspective:</strong> the weigh-in is the moment of accountability. If you go out Saturday and the match is Tuesday, you have two full days to get back on track — water, normal eating, a walk. The scales will come back down. If the match is on a Wednesday and you go out Saturday night, you have even more runway. Use it sensibly, not as an excuse to write the whole week off.
          </p>
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
