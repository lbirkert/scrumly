<script lang="ts">
	import * as prism from 'prismjs';
	import 'prismjs/components/prism-json';
	import 'prismjs/components/prism-bash';
	import 'prismjs/components/prism-css';
	import 'prismjs/components/prism-csv';
	import 'prismjs/components/prism-git';
	import 'prismjs/components/prism-javascript';
	import 'prismjs/components/prism-jsx';
	import 'prismjs/components/prism-tsx';
	import 'prismjs/components/prism-markdown';
	import 'prismjs/components/prism-powershell';
	import 'prismjs/components/prism-scss';
	import 'prismjs/components/prism-c';
	import 'prismjs/components/prism-cpp';
	import 'prismjs/components/prism-python';

	import 'prism-themes/themes/prism-gruvbox-dark.css';

	export let lang: string;
	export let text: string;

	let formatted: string;

	const alias: Record<string, string> = {
		'c++': 'cpp',
		js: 'jsx',
		ts: 'tsx',
		sh: 'bash',
		md: 'markdown',
		py: 'python'
	};

	$: {
		const _lang = alias[lang] || lang;
		if (prism.languages && prism.languages[_lang]) {
			formatted = (prism.highlight(text, prism.languages[_lang], _lang) as string)
				.split('\n')
				.map((l, i) => `<span class="line">${i}</span>${l}`)
				.join('\n');
		}
	}
</script>

<pre><code
		>{#if formatted}{@html formatted}{:else}{text}{/if}</code
	></pre>

<style>
	pre {
		padding: 10px 10px;
		background-color: #111;
		border-radius: 5px;
		border: 1px solid rgba(255, 255, 255, 0.3);
		overflow-x: scroll;
		scrollbar-width: thin;
	}

	code :global(span.line) {
		display: inline-block;
		margin-right: 15px;
		color: #555;
	}
</style>
