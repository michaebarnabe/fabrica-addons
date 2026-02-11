import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import path from 'path'
import { getAddonIcon } from '@/lib/addons-loader'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const addonsDir = path.join(process.cwd(), 'public', 'addons')
  const addons: any[] = []

  try {
    const entries = fs.readdirSync(addonsDir, { withFileTypes: true })
    for (const entry of entries) {
      if (!entry.isDirectory()) continue
      const folder = entry.name

      const manifestPath = path.join(addonsDir, folder, 'manifest.json')
      const packagePath = path.join(addonsDir, folder, 'package.json')

      let manifest: any = null
      if (fs.existsSync(manifestPath)) {
        try { manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8')) } catch (e) { /* ignore parse errors */ }
      } else if (fs.existsSync(packagePath)) {
        try { const pkg = JSON.parse(fs.readFileSync(packagePath, 'utf8')); manifest = { name: pkg.name, description: pkg.description, is_premium: pkg.is_premium } } catch (e) { }
      }

      if (!manifest) manifest = { name: folder, description: '', is_premium: '0' }

      const name = manifest.name || folder
      const slug = manifest.slug || folder
      const description = manifest.description || ''
      const is_premium = manifest.is_premium || '0'

      addons.push({ name, slug, description, is_premium, path: `/addons/${folder}`, folder })
    }
  } catch (err) {
    console.error('Erro ao listar addons:', err)
  }

  const addonsWithIcons = addons.map(addon => ({ ...addon, icon: getAddonIcon(addon.name) }))
  res.status(200).json(addonsWithIcons)
}
