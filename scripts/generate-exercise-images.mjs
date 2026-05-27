/**
 * Generates all 12 exercise demonstration images using DALL-E 3.
 * Usage: node scripts/generate-exercise-images.mjs YOUR_OPENAI_API_KEY
 *
 * Images are saved directly to public/images/exercises/ as WebP files.
 * Run from the project root.
 */

import OpenAI from 'openai'
import https from 'https'
import fs from 'fs'
import path from 'path'
import { execSync } from 'child_process'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'images', 'exercises')

const apiKey = process.argv[2]
if (!apiKey) {
  console.error('Usage: node scripts/generate-exercise-images.mjs YOUR_OPENAI_API_KEY')
  process.exit(1)
}

const client = new OpenAI({ apiKey })

// Character description kept consistent across all prompts
const CHARACTER = `a fit athletic woman in her early 30s with shoulder-length light brown hair, wearing a navy blue fitted crop top and navy blue biker shorts`

const SETTING = `sunny British back garden with green lawn, wooden fence panels, and clear blue sky. Bright natural daylight.`

const exercises = [
  {
    filename: 'bodyweight-squat',
    prompt: `Full body shot, entire figure visible from head to toe. ${CHARACTER} performing a bodyweight squat. She is mid-squat with thighs parallel to the ground, feet shoulder-width apart, arms extended forward for balance, knees tracking over toes. ${SETTING} Photorealistic, 4K quality.`,
  },
  {
    filename: 'press-up',
    prompt: `Full body shot, entire figure visible from head to toe. ${CHARACTER} performing a press-up on the grass. She is in the lowered position close to the ground, body in a perfectly straight line, hands shoulder-width apart. ${SETTING} Photorealistic, 4K quality.`,
  },
  {
    filename: 'plank-hold',
    prompt: `Full body shot, entire figure visible from head to toe. ${CHARACTER} holding a forearm plank on the grass. Body is completely straight from head to heels, forearms flat on the ground, core engaged. ${SETTING} Photorealistic, 4K quality.`,
  },
  {
    filename: 'reverse-lunge',
    prompt: `Full body shot, entire figure visible from head to toe. ${CHARACTER} performing a reverse lunge. One leg stepped back with the back knee just above the ground, front thigh parallel to the floor, hands on hips, torso upright. ${SETTING} Photorealistic, 4K quality.`,
  },
  {
    filename: 'burpee',
    prompt: `Full body shot, entire figure visible from head to toe. ${CHARACTER} at the peak of a burpee jump — both feet off the ground, arms raised fully overhead, face showing energy and effort. ${SETTING} Photorealistic, 4K quality.`,
  },
  {
    filename: 'mountain-climbers',
    prompt: `Full body shot, entire figure visible from head to toe. ${CHARACTER} performing mountain climbers on the grass. She is in a high plank position with one knee driven in towards her chest, other leg extended, body in a straight line. ${SETTING} Photorealistic, 4K quality.`,
  },
  {
    filename: 'glute-bridge',
    prompt: `Full body shot, entire figure visible from head to toe. ${CHARACTER} performing a glute bridge lying on the grass. Knees bent, feet flat on the ground, hips raised high forming a straight line from shoulders to knees, squeezing glutes at the top. ${SETTING} Photorealistic, 4K quality.`,
  },
  {
    filename: 'jumping-jacks',
    prompt: `Full body shot, entire figure visible from head to toe. ${CHARACTER} performing jumping jacks. She is mid-jump with arms raised wide overhead, legs spread apart, smiling and full of energy. ${SETTING} Photorealistic, 4K quality.`,
  },
  {
    filename: 'chair-tricep-dip',
    prompt: `Full body shot, entire figure visible from head to toe. ${CHARACTER} performing tricep dips using a sturdy wooden garden chair. Hands gripping the seat edge behind her, legs extended, body lowered with elbows at 90 degrees. ${SETTING} Photorealistic, 4K quality.`,
  },
  {
    filename: 'high-knees',
    prompt: `Full body shot, entire figure visible from head to toe. ${CHARACTER} performing high knees running on the spot. One knee raised high to hip height, arms pumping, landing on the balls of her feet, full of energy. ${SETTING} Photorealistic, 4K quality.`,
  },
  {
    filename: 'superman-hold',
    prompt: `Full body shot, entire figure visible from head to toe. ${CHARACTER} performing a superman hold lying face-down on the grass. Both arms extended in front, both legs raised, chest lifted off the ground simultaneously, squeezing her back muscles. ${SETTING} Photorealistic, 4K quality.`,
  },
  {
    filename: 'wall-sit',
    prompt: `Full body shot, entire figure visible from head to toe. ${CHARACTER} performing a wall sit against a wooden garden fence. Thighs parallel to the ground, knees at 90 degrees, back flat against the fence, arms resting on knees, determined expression. ${SETTING} Photorealistic, 4K quality.`,
  },
]

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest)
    https.get(url, (res) => {
      res.pipe(file)
      file.on('finish', () => { file.close(); resolve() })
    }).on('error', reject)
  })
}

async function main() {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true })

  console.log(`\n🎨 Generating ${exercises.length} exercise images with DALL-E 3...\n`)

  for (let i = 0; i < exercises.length; i++) {
    const ex = exercises[i]
    console.log(`[${i + 1}/${exercises.length}] Generating: ${ex.filename}...`)

    try {
      const response = await client.images.generate({
        model: 'gpt-image-1',
        prompt: ex.prompt,
        size: '1024x1536',  // Portrait — captures full body
        quality: 'high',
        n: 1,
      })

      const pngPath = path.join(OUTPUT_DIR, `${ex.filename}.png`)
      const webpPath = path.join(OUTPUT_DIR, `${ex.filename}.webp`)

      // Save from base64
      const b64 = response.data[0].b64_json
      fs.writeFileSync(pngPath, Buffer.from(b64, 'base64'))

      // Convert to WebP using ImageMagick
      execSync(`magick "${pngPath}" -quality 85 "${webpPath}"`)
      fs.unlinkSync(pngPath)

      const sizeKB = Math.round(fs.statSync(webpPath).size / 1024)
      console.log(`   ✅ Saved: ${ex.filename}.webp (${sizeKB}KB)`)

    } catch (err) {
      console.error(`   ❌ Failed: ${ex.filename} — ${err.message}`)
    }

    // Brief pause between requests to avoid rate limiting
    if (i < exercises.length - 1) {
      await new Promise(r => setTimeout(r, 1000))
    }
  }

  console.log('\n✅ All done! Images saved to public/images/exercises/')
  console.log('Run: git add -A && git commit -m "feat: regenerate exercise images full body" && git push origin master')
}

main()
