<script lang="ts">
    import type { SafeIssue } from "$lib/server/safe";
    import { sinceShort } from "$lib/date";

    export let id: number;
    export let name: string;
    
    export let issues: SafeIssue[];

    export let dragLast: number;
    export let dragFirst: number;
    export let dragIssue: number;
    export let onDragEnd: () => void;
</script>

<h3>{name}</h3>
<ul on:dragover={() => dragLast = id} on:dragend={() => dragLast != id && onDragEnd()}>
    {#each issues as issue, i}
        {#if i !== 0}
            <li class="spacer"/>
        {/if}
        <li on:dragstart={() => (dragIssue = i, dragFirst = id)} draggable={true}>
            {#if issue.closedAt}
                <span class="close">-</span>
            {:else}
                <span class="open">+</span>
            {/if}
            <div>
                <h4>
                    {issue.title}
                </h4>
                <span>
                    <a href="/issues/{issue.id}" class="issue">
                        #{issue.id}
                    </a>
                    opened {sinceShort(issue.createdAt)} by
                    <a href="/users/{issue.author.id}">
                        {issue.author.name}
                    </a>
                </span>
            </div>
        </li>
    {/each}
</ul>

<style>
    h3 {
        margin-bottom: 20px;
    }

    ul {
        display: flex;
        flex-direction: column;
        row-gap: 13px;
        height: 100%;
        overflow-y: scroll;
    }

    li {
        display: flex;
        column-gap: 20px;
        cursor: pointer;
        user-select: none;
    }

    li > div > span {
        font-size: 14px;
    }

    h4 {
        margin-bottom: 5px;
    }
</style>
