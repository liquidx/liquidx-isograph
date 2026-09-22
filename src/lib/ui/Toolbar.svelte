<script lang="ts">
	import { ui, setTool, clearDoc, doc } from '$lib/state.svelte';
	import type { Tool } from '$lib/model';

	const tools: { id: Tool; label: string; key: string }[] = [
		{ id: 'select', label: 'Select', key: 'V' },
		{ id: 'block', label: 'Block', key: 'B' },
		{ id: 'plane', label: 'Plane', key: 'P' },
		{ id: 'link', label: 'Link', key: 'L' }
	];

	let copied = $state(false);
	let confirmClear = $state(false);
	const isEmpty = $derived(!doc.blocks.length && !doc.planes.length);

	async function share() {
		try {
			await navigator.clipboard.writeText(location.href);
			copied = true;
			setTimeout(() => (copied = false), 1500);
		} catch {
			prompt('Copy this link', location.href);
		}
	}

	function clear() {
		if (!confirmClear) {
			confirmClear = true;
			setTimeout(() => (confirmClear = false), 2500);
			return;
		}
		clearDoc();
		confirmClear = false;
	}
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="panel toolbar" onmousedown={(e) => e.preventDefault()}>
	<span class="brand">ISOGRAPH</span>
	<span class="divider"></span>
	{#each tools as t (t.id)}
		<button class="btn" class:active={ui.tool === t.id} onclick={() => setTool(t.id)}>
			{t.label}<span class="key">{t.key}</span>
		</button>
	{/each}
	<span class="divider"></span>
	<button class="btn" onclick={share}>{copied ? 'Copied' : 'Share'}</button>
	<button class="btn" class:danger={confirmClear} disabled={isEmpty} onclick={clear}>
		{confirmClear ? 'Sure?' : 'Clear'}
	</button>
</div>

<style>
	.toolbar {
		top: 12px;
		left: 12px;
		display: flex;
		align-items: center;
		gap: 2px;
		padding: 4px;
	}
	.brand {
		padding: 0 8px 0 6px;
		font-weight: 600;
		letter-spacing: 0.12em;
		font-size: 11px;
	}
	.danger {
		background: var(--ink);
		color: var(--bg);
	}
</style>
