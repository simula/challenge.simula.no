import { test, expect } from '@playwright/test'

const cardLocator = page => page.locator('main a[target="_blank"]')

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

        expect(await cardLocator(page).count()).toBeGreaterThan(0)
    })

    test('challenge cards open external links in a new tab', async ({
        page
    }) => {
        await page.goto('/')
        const firstCard = cardLocator(page).first()
        const href = await firstCard.getAttribute('href')
        expect(href).toMatch(/^https?:\/\//)
    })

    test('search input filters cards by title', async ({ page }) => {
        await page.goto('/')

        const beforeCount = await cardLocator(page).count()
        expect(beforeCount).toBeGreaterThan(1)

        await page.getByLabel('Search challenges').fill('medico')

        await expect
            .poll(() => cardLocator(page).count())
            .toBeLessThan(beforeCount)
        await expect(cardLocator(page).first()).toContainText(/Medico/i)
    })

    test('shows empty state when no results match', async ({ page }) => {
        await page.goto('/')
        await page.getByLabel('Search challenges').fill('zzznomatch')
        await expect(
            page.getByRole('heading', { name: 'No challenges found' })
        ).toBeVisible()
    })

    test('selecting a Series facet filters cards and updates the URL', async ({
        page
    }) => {
        await page.goto('/')

        await page.getByRole('button', { name: /^Series/ }).click()
        await page.getByRole('option', { name: 'Medico' }).click()

        await expect.poll(() => cardLocator(page).count()).toBeGreaterThan(0)
        const cards = cardLocator(page)
        const count = await cards.count()
        for (let i = 0; i < count; i++) {
            await expect(cards.nth(i)).toContainText(/Medico/i)
        }
        await expect(page).toHaveURL(/series=medico/)
    })

    test('deep-linking via URL applies filters on first paint', async ({
        page
    }) => {
        await page.goto('/?series=biomedia')

        const cards = cardLocator(page)
        const count = await cards.count()
        expect(count).toBeGreaterThan(0)
        for (let i = 0; i < count; i++) {
            await expect(cards.nth(i)).toContainText(/BioMedia/i)
        }
    })

    test('"/" keyboard shortcut focuses the search input', async ({ page }) => {
        await page.goto('/')
        await page.locator('body').click()
        await page.keyboard.press('/')
        await expect(page.getByLabel('Search challenges')).toBeFocused()
    })

    test('clicking a tag pill on a card adds the facet to the URL', async ({
        page
    }) => {
        await page.goto('/')
        // The first 'Medico' button in the document is a card pill (the
        // Series dropdown's Medico option is not rendered until opened).
        await page
            .getByRole('button', { name: 'Medico', exact: true })
            .first()
            .click()
        await expect(page).toHaveURL(/series=medico/)
    })

    test('changing the sort updates card order', async ({ page }) => {
        await page.goto('/')
        await page.getByLabel('Sort').selectOption('az')
        const titles = await cardLocator(page).allInnerTexts()
        const firstTitle = titles[0].split('\n')[0]
        // First A–Z entry should start with B (BioMedia) given the catalog.
        expect(firstTitle.charAt(0).toUpperCase()).toBe('B')
    })
})
