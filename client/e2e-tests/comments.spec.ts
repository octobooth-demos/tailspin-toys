import { test, expect } from '@playwright/test';
import { randomUUID } from 'node:crypto';

test.describe('Game comments', () => {
  test('should display the empty state when a game has no comments', async ({ page }) => {
    await page.route('**/api/games/1/comments', async (route) => {
      if (route.request().method() === 'GET') {
        await route.fulfill({ json: { comments: [] } });
      } else {
        await route.continue();
      }
    });

    await page.goto('/game/1');

    await expect(page.getByTestId('comments-empty')).toContainText(
      'No comments yet. Be the first to share your thoughts.'
    );
    await expect(page.getByLabel('Add a comment')).toBeEnabled();

    await page.getByLabel('Add a comment').fill('   ');
    await page.getByRole('button', { name: 'Post comment' }).click();
    await expect(page.getByTestId('comment-validation-error')).toHaveText(
      'Enter a comment before submitting.'
    );
  });

  test('should submit and retain a comment after reloading the game', async ({ page }) => {
    const commentText = `E2E comment ${randomUUID()}`;

    await page.goto('/game/1');
    const commentInput = page.getByLabel('Add a comment');
    await commentInput.fill(commentText);
    await page.getByRole('button', { name: 'Post comment' }).click();

    const postedComment = page.getByTestId('game-comment').filter({ hasText: commentText });
    await expect(postedComment).toContainText(commentText);
    await expect(postedComment).toContainText('Anonymous');
    await expect(page.getByTestId('comment-input')).toBeEmpty();

    await page.reload();
    const reloadedComment = page.getByTestId('game-comment').filter({ hasText: commentText });
    await expect(reloadedComment).toContainText(commentText);
    await expect(reloadedComment).toContainText('Anonymous');
  });

  test('should preserve the draft and show an error after a failed submission', async ({ page }) => {
    await page.route('**/api/games/1/comments', async (route) => {
      if (route.request().method() === 'POST') {
        await route.fulfill({
          status: 503,
          contentType: 'application/json',
          body: JSON.stringify({ error: 'Comments are temporarily unavailable.' }),
        });
      } else {
        await route.continue();
      }
    });

    await page.goto('/game/1');
    const draft = 'Please keep this comment for retrying';
    await page.getByLabel('Add a comment').fill(draft);
    await page.getByRole('button', { name: 'Post comment' }).click();

    await expect(page.getByTestId('comment-submit-error')).toHaveText(
      'Comments are temporarily unavailable.'
    );
    await expect(page.getByTestId('comment-input')).toHaveValue(draft);
  });
});
