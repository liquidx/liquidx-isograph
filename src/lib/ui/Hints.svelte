<script lang="ts">
	import { ui } from '$lib/state.svelte';

	const hint = $derived(
		ui.tool === 'block'
			? 'Click the floor to drop a block · Esc to finish'
			: ui.tool === 'plane'
				? 'Drag on the floor to draw a plane · Esc to finish'
				: ui.tool === 'link'
					? ui.linkFrom == null
						? 'Click the first block'
						: 'Click the second block'
					: 'Drag to pan · Wheel to zoom · Right-drag or Q/E to rotate · Arrows nudge'
	);
</script>

<div class="hints">{hint}</div>

<style>
	.hints {
		position: absolute;
		left: 12px;
		bottom: 12px;
		color: var(--muted);
		font-size: 11px;
		pointer-events: none;
	}
</style>
