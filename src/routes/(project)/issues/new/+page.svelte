<script lang="ts">
    import { enhance } from "$app/forms";
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
