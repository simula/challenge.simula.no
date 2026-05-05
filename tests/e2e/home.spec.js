import { test, expect } from '@playwright/test'

test.describe('home page', () => {
    test('renders header, footer, and at least one challenge card', async ({
        page
    }) => {
        await page.goto('/')

        await expect(
            page.getByRole('link', { name: 'Simula Challenges home' })
        ).toBeVisible()
        await expect(
            page.getByRole('heading', { name: 'Simula Challenges', level: 1 })
        ).toBeVisible()
        await expect(
            page.getByRole('link', { name: 'Contribute a challenge' })
        ).toBeVisible()

        const cards = page.getByRole('link').filter({ hasText: /\d{4}/ })
        expect(await cards.count()).toBeGreaterThan(0)
    })

    test('search input filters cards by title', async ({ page }) => {
        await page.goto('/')

        const beforeCount = await page
            .locator('main a[target="_blank"]')
            .count()
        expect(beforeCount).toBeGreaterThan(1)

        await page.getByRole('searchbox', { name: 'Search challenges' }).fill('medico')

        await expect
            .poll(() => page.locator('main a[target="_blank"]').count())
            .toBeLessThan(beforeCount)
        await expect(page.locator('main a[target="_blank"]').first()).toContainText(
            /Medico/i
        )
    })

    test('shows empty state when no results match', async ({ page }) => {
        await page.goto('/')
        await page
            .getByRole('searchbox', { name: 'Search challenges' })
            .fill('zzznomatch')
        await expect(
            page.getByText('No challenges match your search.')
        ).toBeVisible()
    })

    test('challenge cards open external links in a new tab', async ({
        page
    }) => {
        await page.goto('/')
        const firstCard = page.locator('main a[target="_blank"]').first()
        const href = await firstCard.getAttribute('href')
        expect(href).toMatch(/^https?:\/\//)
    })
})
