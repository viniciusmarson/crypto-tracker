import { test } from '@playwright/test'

test('Register user', async ({ page }) => {
  await page.goto('/register')

  // Perform login
  await page.fill('#email', 'vinicius.marson+1@icloud.com')
  await page.fill('#password', 'test')
  await page.fill('#confirmPassword', 'test')
  await page.click('#register-button')

  // Wait until user is registered
  await page.waitForSelector('#sign-in-button')
})
