<script lang="ts">
    import { enhance } from "$app/forms";

    import type { ActionData } from "./$types";
    import { goto } from "$app/navigation";

    export let form: ActionData;

    $: if(form?.issue) goto("/issues");
</script>

<main>
    <form method="POST" use:enhance>
        <h1>Create Issue</h1>
        <label>
            Title
            <input type="text" name="title"/>
        </label>
        <button>Create</button>
    </form>
</main>

<style>
    main {
        padding: 5px;
    }

    textarea {
        resize: vertical;
    }
</style>
