<script lang="ts">
    import { sinceShort } from "$lib/date";

    export let date: Date;
</script>

<span title={date.toLocaleString()}>{sinceShort(date)}</span>


