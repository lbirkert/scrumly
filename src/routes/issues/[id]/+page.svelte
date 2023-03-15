<script lang="ts">
    import type { PageData } from "./$types";
    import { sinceShort } from "$lib/date";

    import { enhance } from "$app/forms";

    import Comment from "$lib/Comment.svelte";
    import Markdown from "$lib/Markdown.svelte";

    export let data: PageData;
</script>

<main>
    <header>
        <h1>
            {#if data.issue.closedAt}
                <span class="close">-</span>
            {:else}
                <span class="open">+</span>
            {/if}
            {data.issue.title}
        </h1>
        <span>
            #{data.issue.id} opened {sinceShort(data.issue.createdAt)} by 
            <a href="/users/{data.issue.author.id}">
                {data.issue.author.name}
            </a>
        </span>
    </header>
    
    <div class="spacer"/>

    {#if data.issue.comments.length !== 0}
        <ul>
            {#each data.issue.comments as comment}
                <Comment bind:comment member={data.member} edit={data.edit === comment.id.toString()} />
            {/each}
        </ul>

        <div class="spacer"/>
    {/if}

    <form method="POST" action="?/comment" use:enhance>
        <!-- TODO: write/preview -->
        <textarea name="content" required />

        <div>
            {#if data.issue.author.id === data.member.id}
                <form method="POST" action="?/toggle" use:enhance>
                {#if data.issue.closedAt}
                    <button style="--color: white">Reopen Issue</button>
                {:else}
                    <button style="--color: magenta">Close Issue</button>
                {/if}
                </form>
            {/if}
            <button style="--color: lightgreen">Comment</button>
        </div>
    </form>
</main>

<style>
    main {
        padding: 20px;
    }

    main > header {
        margin-bottom: 30px;
    }

    main > header > h1 {
        display: flex;
        align-items: center;
        column-gap: 20px;
        margin-bottom: 5px;
    }

    main > header > span {
        display: inline-block;
        margin-bottom: 20px;
    }

    main > form {
        margin-top: 40px;
    }

    main > form > div {
        display: flex;
        column-gap: 10px;
    }

    main > ul {
        list-style: none;
        display: flex;
        flex-direction: column;
        row-gap: 40px;
        position: relative;
        margin: 40px 0;
    }
</style>
