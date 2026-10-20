<script lang="ts">
    import { onMount } from "svelte";
    import { API_ENDPOINTS } from "../config/api";
    import type { GameComment } from "../types/game";
    import { messages, type Locale } from '../i18n';

    const MAX_COMMENT_LENGTH = 1000;

    let { gameId, locale = 'en' }: { gameId: number; locale?: Locale } = $props();

    let comments = $state<GameComment[]>([]);
    let loading = $state(true);
    let submitting = $state(false);
    let draft = $state("");
    let loadError = $state<string | null>(null);
    let submitError = $state<string | null>(null);
    let validationError = $state<string | null>(null);

    onMount(() => {
        void loadComments();
    });

    async function loadComments(): Promise<void> {
        try {
            const response = await fetch(API_ENDPOINTS.commentsByGame(gameId));
            if (!response.ok) {
                throw new Error(`${response.status} ${response.statusText}`);
            }

            const body: { comments: GameComment[] } = await response.json();
            comments = body.comments;
        } catch (err) {
            const details = err instanceof Error ? err.message : String(err);
            loadError = locale === 'en' ? `Unable to load comments: ${details}` : messages[locale].commentsLoadFailed(details);
        } finally {
            loading = false;
        }
    }

    async function submitComment(event: SubmitEvent): Promise<void> {
        event.preventDefault();
        const text = draft.trim();
        validationError = null;
        submitError = null;

        if (!text) {
            validationError = messages[locale].enterComment;
            return;
        }
        if (Array.from(text).length > MAX_COMMENT_LENGTH) {
            validationError = messages[locale].commentTooLong(MAX_COMMENT_LENGTH);
            return;
        }

        submitting = true;
        try {
            const response = await fetch(API_ENDPOINTS.commentsByGame(gameId), {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ text }),
            });

            if (!response.ok) {
                let message = `${response.status} ${response.statusText}`;
                if (locale === 'en' && response.headers.get("content-type")?.includes("application/json")) {
                    const body: { error?: string } = await response.json();
                    message = body.error ?? message;
                }
                throw new Error(message);
            }

            const body: { comment: GameComment } = await response.json();
            comments = [...comments, body.comment];
            draft = "";
        } catch (err) {
            const details = err instanceof Error ? err.message : String(err);
            submitError = locale === 'en' ? details : messages[locale].commentSubmitFailed(details);
        } finally {
            submitting = false;
        }
    }
</script>

<section
    class="mt-8 rounded-xl border border-slate-700 bg-slate-800/70 p-6"
    aria-labelledby="comments-heading"
    data-testid="comments-section"
>
    <h2 id="comments-heading" class="text-2xl font-semibold text-slate-100">{messages[locale].communityComments}</h2>

    {#if loading}
        <p class="mt-4 text-slate-300" role="status" aria-live="polite" data-testid="comments-loading">
            {messages[locale].loadingComments}
        </p>
    {:else if loadError}
        <p class="mt-4 text-red-400" role="alert" data-testid="comments-load-error">{loadError}</p>
    {:else if comments.length === 0}
        <p class="mt-4 text-slate-400" data-testid="comments-empty">
            {messages[locale].emptyComments}
        </p>
    {:else}
        <ol class="mt-4 space-y-4" aria-label={messages[locale].gameComments} data-testid="comments-list">
            {#each comments as comment (comment.id)}
                <li class="rounded-lg border border-slate-700 bg-slate-900/60 p-4" data-testid="game-comment">
                    <div class="flex flex-wrap items-baseline justify-between gap-2">
                        <p class="font-medium text-slate-200">{comment.author}</p>
                        <time class="text-sm text-slate-400" datetime={comment.createdAt}>
                            {new Date(comment.createdAt).toLocaleString(locale)}
                        </time>
                    </div>
                    <p class="mt-2 whitespace-pre-wrap break-words text-slate-300">{comment.text}</p>
                </li>
            {/each}
        </ol>
    {/if}

    {#if submitError}
        <p class="mt-4 text-red-400" role="alert" data-testid="comment-submit-error">{submitError}</p>
    {/if}

    <form class="mt-6 space-y-3" onsubmit={submitComment} data-testid="comment-form">
        <label for="comment-text" class="block font-medium text-slate-200">{messages[locale].addComment}</label>
        <textarea
            id="comment-text"
            name="comment"
            bind:value={draft}
            maxlength={MAX_COMMENT_LENGTH * 2}
            aria-required="true"
            rows="4"
            aria-describedby={validationError ? "comment-guidance comment-validation-error" : "comment-guidance"}
            aria-invalid={validationError ? "true" : undefined}
            class="w-full rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={messages[locale].commentPlaceholder}
            data-testid="comment-input"
        ></textarea>
        <p id="comment-guidance" class="text-sm text-slate-400">
            {messages[locale].commentGuidance(MAX_COMMENT_LENGTH)}
        </p>
        {#if validationError}
            <p id="comment-validation-error" class="text-sm text-red-400" role="alert" data-testid="comment-validation-error">
                {validationError}
            </p>
        {/if}
        <div class="flex flex-wrap items-center gap-3">
            <button
                type="submit"
                disabled={submitting}
                class="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:cursor-not-allowed disabled:opacity-60"
                data-testid="comment-submit-button"
            >
                {submitting ? messages[locale].posting : messages[locale].postComment}
            </button>
            {#if submitting}
                <p class="text-sm text-slate-300" role="status" aria-live="polite" data-testid="comment-submitting">
                    {messages[locale].postingComment}
                </p>
            {/if}
        </div>
    </form>
</section>
