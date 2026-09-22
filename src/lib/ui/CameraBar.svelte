<script lang="ts">
	import { doc, rotateBy, elevateBy, zoomBy, resetCamera } from '$lib/state.svelte';
	import { MAX_EL, MIN_EL } from '$lib/model';
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="panel camera" onmousedown={(e) => e.preventDefault()}>
	<button class="btn icon" title="Rotate left (Q)" onclick={() => rotateBy(1)}>⟲</button>
	<span class="readout">{doc.camera.az}°</span>
	<button class="btn icon" title="Rotate right (E)" onclick={() => rotateBy(-1)}>⟳</button>
	<span class="divider"></span>
	<button
		class="btn icon"
		title="Lower view"
		disabled={doc.camera.el <= MIN_EL}
		onclick={() => elevateBy(-1)}>▽</button
	>
	<span class="readout">{doc.camera.el}°</span>
	<button
		class="btn icon"
		title="Raise view"
		disabled={doc.camera.el >= MAX_EL}
		onclick={() => elevateBy(1)}>△</button
	>
	<span class="divider"></span>
	<button class="btn icon" title="Zoom out (-)" onclick={() => zoomBy(0.8)}>−</button>
	<span class="readout">{Math.round(doc.camera.zoom * 100)}%</span>
	<button class="btn icon" title="Zoom in (+)" onclick={() => zoomBy(1.25)}>+</button>
	<span class="divider"></span>
	<button class="btn" title="Reset view" onclick={resetCamera}>Reset</button>
</div>

<style>
	.camera {
		right: 12px;
		bottom: 12px;
		display: flex;
		align-items: center;
		gap: 2px;
		padding: 4px;
	}
	.readout {
		min-width: 40px;
		text-align: center;
		font-variant-numeric: tabular-nums;
		color: var(--muted);
	}
</style>
