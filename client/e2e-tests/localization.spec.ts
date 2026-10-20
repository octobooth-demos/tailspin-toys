import { test, expect } from '@playwright/test';

test.describe('Language selection', () => {
  test('defaults to English when no supported language is saved', async ({ page }) => {
    await page.goto('/');
    await page.context().addCookies([
      { name: 'site-language', value: 'de', url: page.url() },
    ]);
    await page.reload();

    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await expect(page.getByRole('heading', { name: 'Welcome to Tailspin Toys' })).toBeVisible();
    await expect(page.getByLabel('Language')).toHaveValue('en');
  });

  test('persists French across navigation and reloads', async ({ page }) => {
    await page.goto('/');
    const navigation = page.waitForEvent('framenavigated');
    await page.getByLabel('Language').selectOption('fr');
    await navigation;

    await expect(page.locator('html')).toHaveAttribute('lang', 'fr');
    await expect(page.getByRole('heading', { name: 'Bienvenue chez Tailspin Toys' })).toBeVisible();
    await page.goto('/about');

    await expect(page.locator('html')).toHaveAttribute('lang', 'fr');
    await expect(page.getByTestId('about-heading')).toHaveText('À propos de Tailspin Toys');
    await expect(page.getByTestId('about-section').locator('p').first()).toContainText(
      'plateforme de financement participatif'
    );
    await page.reload();
    await expect(page.getByLabel('Langue')).toHaveValue('fr');
  });

  test('translates a game without changing its current route or proper names', async ({ page }) => {
    await page.goto('/');
    const firstGameCard = page.getByTestId('game-card').first();
    const gameId = await firstGameCard.getAttribute('data-game-id');
    const gameTitle = await firstGameCard.getAttribute('data-game-title');
    await firstGameCard.click();
    await expect(page).toHaveURL(`/game/${gameId}`);

    const navigation = page.waitForEvent('framenavigated');
    await page.getByLabel('Language').selectOption('es');
    await navigation;

    await expect(page).toHaveURL(`/game/${gameId}`);
    await expect(page.locator('html')).toHaveAttribute('lang', 'es');
    await expect(page.getByTestId('game-details-title')).toHaveText(gameTitle ?? '');
    await expect(page.getByTestId('game-details-category')).toHaveText(
      /^(Estrategia|Rompecabezas|Simulación|Aventura|Acción)$/
    );
    await expect(page.getByTestId('game-details-description')).toContainText(
      '¡Apoya este juego en nuestra plataforma de financiación colectiva!'
    );
    await expect(page.getByRole('heading', { name: 'Acerca de este juego' })).toBeVisible();

    await page.goto('/about');
    await expect(page.getByTestId('about-heading')).toHaveText('Acerca de Tailspin Toys');
    await expect(page.getByTestId('about-section').locator('p').first()).toContainText(
      'plataforma de financiación colectiva'
    );
  });

  test('preserves the current listing page when switching languages', async ({ page }) => {
    await page.goto('/');
    await page.getByTestId('pagination-next').click();
    await expect(page).toHaveURL('/?page=2');
    await expect(page.getByTestId('pagination-info')).toContainText('Page 2');

    const navigation = page.waitForEvent('framenavigated');
    await page.getByLabel('Language').selectOption('fr');
    await navigation;

    await expect(page).toHaveURL('/?page=2');
    await expect(page.locator('html')).toHaveAttribute('lang', 'fr');
    await expect(page.getByTestId('pagination-info')).toContainText('Page 2 sur');
  });

  test('shows comment validation messages in the selected language', async ({ page }) => {
    await page.goto('/game/1');
    const navigation = page.waitForEvent('framenavigated');
    await page.getByLabel('Language').selectOption('fr');
    await navigation;

    await page.getByRole('button', { name: 'Publier le commentaire' }).click();
    await expect(page.getByTestId('comment-validation-error')).toHaveText(
      'Saisissez un commentaire avant de l’envoyer.'
    );

    await page.getByTestId('comment-input').fill('a'.repeat(1001));
    await page.getByRole('button', { name: 'Publier le commentaire' }).click();
    await expect(page.getByTestId('comment-validation-error')).toHaveText(
      'Les commentaires ne peuvent pas dépasser 1000 caractères.'
    );
  });

  test('falls back to the supplied English game text when a translation is unavailable', async ({ page }) => {
    await page.route('**/api/games?*', async (route) => {
      await route.fulfill({
        json: {
          games: [{
            id: 999,
            title: 'Untranslated Test Game',
            description: 'An original game description.',
            publisher: { id: 1, name: 'Test Publisher' },
            category: { id: 1, name: 'Untranslated Category' },
            starRating: null,
          }],
          pagination: { page: 1, pageSize: 9, total: 1, totalPages: 1 },
        },
      });
    });

    await page.goto('/');
    await page.context().addCookies([
      { name: 'site-language', value: 'fr', url: page.url() },
    ]);
    await page.reload();

    await expect(page.locator('html')).toHaveAttribute('lang', 'fr');
    await expect(page.getByTestId('game-title')).toHaveText('Untranslated Test Game');
    await expect(page.getByTestId('game-description')).toHaveText('An original game description.');
    await expect(page.getByTestId('game-category')).toHaveText('Untranslated Category');
  });
});
