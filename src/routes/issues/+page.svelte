<script lang="ts">
    import IssueCard from "$lib/IssueCard.svelte";

    import type { PageData } from "./$types";

    export let data: PageData;
</script>

<main>
    <a href="/issues/new">
        <button>New</button>
    </a>

    <ul>
        <tr>
        </tr>
        {#each data.issues as issue, i}
            {#if i != 0}
                <li class="spacer"/>
            {/if}
            <li>
                <a href="/issues/{issue.id}" class="issue">
                    {#if issue.closedAt}
                        <span class="close">-</span>
                    {:else}
                        <span class="open">+</span>
                    {/if}
                    <div>
                        <h2>{issue.title}</h2>
                        <span>#{issue.id} opened on {issue.createdAt.toLocaleDateString("en-US")} by {issue.author.name}</span>
                    </div>
                </a>
            </li>
        {/each}
    </ul>
</main>

<style>
    main {
        padding: 5px;
    }

    button {
        border-color: lightgreen;
    }

    button:hover {
        background-color: lightgreen;
    }

    ul {
        display: flex;
        flex-direction: column;
        row-gap: 20px;
    }

    ul .spacer {
        width: 100%;
        height: 1px;
        background: rgba(255, 255, 255, 0.1);
        content: "";
    }

    li a {
        display: flex;
        text-decoration: none;
        color: unset;

    }

    span.open {
        border: 2px solid lightgreen;
        color: lightgreen;
    }

    span.close {
        border: 2px solid magenta;
        color: magenta;
    }

    span.open, span.close {
        width: 28px;
        height: 28px;
        font-size: 24px;
        border-radius: 90px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0 20px;
    }
</style>
