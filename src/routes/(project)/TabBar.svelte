<script lang="ts">
    import { page } from "$app/stores";

    type Path = {
        pathname?: string;
        url?: string;
        name: string;
        exact?: boolean;
    };

    function active(path: Path, url: URL) {
        if(!path.pathname) {
            return false;
        }

        return path.exact ? url.pathname == path.pathname : url.pathname.startsWith(path.pathname);
    }

    const paths: Path[] = [
        {
            pathname: "/",
            exact: true,
            name: "Overview",
        },
        {
            pathname: "/scrum",
            name: "Scrum",
        },  
        {
            pathname: "/issues",
            name: "Issues",
        },
        {
            pathname: "/users",
            name: "Users",
        },
    ];
</script>

<nav>
    <ul>
    {#each paths as path}
        <li class:active={active(path, $page.url)}>
            <a href={path.pathname || path.url}>{path.name}</a>
        </li>
    {/each}
    </ul>
</nav>

<style>
    nav {
        position: sticky;
        z-index: 100;
        top: 0;
        
        overflow-y: scroll;
        scrollbar-width: none;
        border-bottom: 1px solid rgba(255, 255, 255, 0.3);
        background-color: black;
        height: 42px;
    }

    ul {
        display: flex;
        column-gap: 10px;
    }

    a {
        text-decoration: none;
        padding: 5px 10px;
        border-radius: 5px;
        position: relative;
    }

    a:hover {
        background: #222;
    }

    li {
        padding: 10px 10px;
    }

    li.active {
        font-weight: bold;
        border-bottom: 3px solid lightgreen;
    }
</style>
