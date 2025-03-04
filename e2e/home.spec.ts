import { test, expect } from '@playwright/test'

test.use({ storageState: 'e2e/auth.json' })

test('visits the app root url', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('#bitcoin')).toHaveText('Bitcoin (BTC)')
})
