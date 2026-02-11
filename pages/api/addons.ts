import type { NextApiRequest, NextApiResponse } from 'next'
import { getAvailableAddons, getAddonIcon } from '@/lib/addons-loader'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const addons = getAvailableAddons();
  
  const addonsWithIcons = addons.map(addon => ({
    ...addon,
    icon: getAddonIcon(addon.name)
  }));

  res.status(200).json(addonsWithIcons)
}
