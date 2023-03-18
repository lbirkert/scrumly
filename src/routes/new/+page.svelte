<script lang="ts">
    import type { ActionData } from "./$types";

    import { browser } from "$app/environment";
    import { goto } from "$app/navigation";
    import { enhance } from "$app/forms";

    export let form: ActionData;

    if(browser) {
        window.onbeforeunload = (e) => {
            e.preventDefault();
            e.returnValue = "";
        }
    }

    function onSubmit() {
        window.onbeforeunload = null;
        goto("/");
    }
</script>

<main class="dialog">
{#if form?.login}
    <form on:submit|preventDefault={onSubmit}>
        <h1>Memorize your password</h1>
        <p>{form.login}</p>
        <input type="password" disabled value={form.login}/>
        <button>Continue</button>
    </form>
{:else}
    <form method="POST" use:enhance>
        <h1>Create a project</h1>
        <label>
            Registration token
            <input type="password" name="token" />
        </label>
        {#if form?.error}
            <span class="error">{form.error}</span>
        {/if}
        <button>Submit</button>
    </form>
{/if}
</main>
