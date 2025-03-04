import { expect, test } from '@playwright/test'

test.use({ storageState: 'e2e/users.json' })

test('Login and save session', async ({ page }) => {
  await page.goto('/login')

  // Perform login
  await page.fill('#email', 'vinicius.marson@icloud.com')
  await page.fill('#password', 'test')

  await page.click('#sign-in-button')

  expect(page.url()).toBe('http://localhost:5173/')
})
