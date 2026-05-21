import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { getSession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { format, subDays } from 'date-fns'

export async function POST(request: NextRequest) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { memberIds, mealType, date, budgetPerMeal, notes } = await request.json()

  // Fetch context
  const [members, preferences, recentMeals] = await Promise.all([
    prisma.familyMember.findMany({
      where: { userId: session.id, id: { in: memberIds } },
    }),
    prisma.foodPreference.findMany({ where: { userId: session.id } }),
    prisma.mealLog.findMany({
      where: { userId: session.id, date: { gte: subDays(new Date(), 14) } },
      orderBy: { date: 'desc' },
      take: 20,
      select: { mealName: true, rating: true, mealType: true },
    }),
  ])

  const memberDesc = members.map(m => `${m.name} (${m.age}, ${m.relationship})`).join(', ')
  const likes = preferences.filter(p => p.preference === 'like').map(p => p.foodName).join(', ') || 'none specified'
  const dislikes = preferences.filter(p => p.preference === 'dislike').map(p => p.foodName).join(', ') || 'none'
  const allergies = preferences.filter(p => p.preference === 'allergy').map(p => p.foodName).join(', ') || 'none'
  const recentNames = [...new Set(recentMeals.map(m => m.mealName))].slice(0, 10).join(', ') || 'none'
  const highRated = recentMeals.filter(m => (m.rating ?? 0) >= 4).map(m => m.mealName).join(', ') || 'none'

  const prompt = `You are a helpful family meal planner. Suggest 3 meal options for the following situation.

**Who is eating:** ${memberDesc}
**Meal:** ${mealType} on ${format(new Date(date), 'd MMMM yyyy')}
**Budget:** ${budgetPerMeal ? `around £${budgetPerMeal} per meal` : 'budget-conscious, keep it affordable'}
**Food they love:** ${likes}
**Dislikes:** ${dislikes}
**Allergies/intolerances:** ${allergies}
**Recently eaten (avoid repeating):** ${recentNames}
**Previously highly rated meals:** ${highRated}
${notes ? `**Additional notes:** ${notes}` : ''}

Suggest 3 diverse, healthy, delicious ${mealType} options that suit everyone eating. For each suggestion provide:
1. Meal name
2. Brief description (1-2 sentences, mention why it suits this group)
3. Key ingredients (10 max)
4. Rough estimated cost (£)
5. Prep time
6. A brief recipe or cooking method (3-5 steps)

Be practical and realistic. Prioritise nutritionally balanced meals appropriate for a 53-year-old man and teenage boys. Budget-friendly ideas are preferred.

Format your response as JSON with this structure:
{
  "suggestions": [
    {
      "name": "Meal Name",
      "description": "Why it suits...",
      "ingredients": ["ingredient 1", "ingredient 2"],
      "estimatedCost": "£8-10",
      "prepTime": "20 minutes",
      "recipe": ["Step 1...", "Step 2...", "Step 3..."]
    }
  ]
}`

  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

  const message = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 2000,
    messages: [{ role: 'user', content: prompt }],
  })

  const text = message.content[0].type === 'text' ? message.content[0].text : ''

  // Extract JSON from response
  const jsonMatch = text.match(/\{[\s\S]*\}/)
  if (!jsonMatch) {
    return NextResponse.json({ error: 'Failed to parse suggestions' }, { status: 500 })
  }

  const data = JSON.parse(jsonMatch[0])
  return NextResponse.json(data)
}
