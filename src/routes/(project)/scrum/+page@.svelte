<script lang="ts">
    import Header from "../Header.svelte";
    import Category from "./Category.svelte";
    import type { PageData } from "./$types";
    import { actionsToObject } from "$lib/actions";

    export let data: PageData;

    const todo = data.issues.filter(i => !i.assignee && !i.closedAt);
    const doing = data.issues.filter(i => i.assignee && !i.closedAt);
    const done = data.issues.filter(i => i.closedAt);

    // TODO: make customizable
    let categories = [
        { name: "TODO", issues: todo, },
        { name: "Doing", issues: doing, },
        { name: "Done", issues: done, },
    ];

    export let dragIssue: number = -1;
    export let dragFirst: number = -1;
    export let dragLast: number = -1;

    async function onDragEnd() {
        const firstIssues = categories[dragFirst].issues;
        const lastIssues = categories[dragLast].issues;

        const issue = firstIssues[dragIssue];

        const result = await fetch("", {
            method: "POST",
            body: new URLSearchParams({ id: issue.id, to: dragLast }),
        });

        const changes = actionsToObject(await result.json());
        const newIssue = { ...issue, ...changes };        

        firstIssues.splice(dragIssue, 1);
        lastIssues.push(newIssue);

        // Trigger rerender
        categories = categories;
    }
</script>

<div>
    <Header member={data.member}/>
    
    <ul>
        {#each categories as category, i}
            <li>
                <Category id={i} name={category.name} issues={category.issues} {onDragEnd} bind:dragIssue bind:dragLast bind:dragFirst />
            </li>
        {/each}
    </ul>
</div>

<style>
    ul {
        display: flex;
        overflow-x: scroll;
        overflow-y: hidden;
        min-height: unset;
        column-gap: 10px;
        padding: 20px;
        flex: 1;
    }

    li {
        min-width: 400px;
        border: 1px solid rgba(255, 255, 255, 0.3);
        border-radius: 10px;
        padding: 20px;
        display: flex;
        flex-direction: column;
    }

    div {
        display: flex;
        flex-direction: column;
        height: 100vh;
        overflow: hidden;
    }
</style>
