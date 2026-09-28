import {
	ANGLE_STEP,
	DEFAULT_LABEL_SIZE,
	MAX_EL,
	MAX_ZOOM,
	MIN_EL,
	MIN_ZOOM,
	clamp,
	defaultCamera,
	normAngle,
	type Block,
	type Doc,
	type Link,
	type Plane,
	type SelectionRef,
	type Shape,
	type Tool
} from './model';

export const doc: Doc = $state({ blocks: [], planes: [], links: [], camera: defaultCamera() });

export const ui = $state({
	tool: 'select' as Tool,
	selection: null as SelectionRef | null,
	linkFrom: null as number | null,
	/** Shape the block tool drops next. */
	shape: 'box' as Shape,
	help: false
});

export function setShape(shape: Shape) {
	ui.shape = shape;
}

export function toggleHelp(open?: boolean) {
	ui.help = open ?? !ui.help;
}

/** Block ids that should play the drop-in animation when they first appear. Intentionally non-reactive. */
// eslint-disable-next-line svelte/prefer-svelte-reactivity
export const dropQueue = new Set<number>();

function nextId(): number {
	let m = 0;
	for (const b of doc.blocks) m = Math.max(m, b.id);
	for (const p of doc.planes) m = Math.max(m, p.id);
	for (const l of doc.links) m = Math.max(m, l.id);
	return m + 1;
}

export function loadDoc(d: Doc) {
	doc.blocks = d.blocks;
	doc.planes = d.planes;
	doc.links = d.links;
	doc.camera = d.camera;
	ui.selection = null;
	ui.linkFrom = null;
}

export function clearDoc() {
	doc.blocks = [];
	doc.planes = [];
	doc.links = [];
	ui.selection = null;
	ui.linkFrom = null;
}

export function setTool(tool: Tool) {
	ui.tool = tool;
	ui.linkFrom = null;
}

export function select(ref: SelectionRef | null) {
	ui.selection = ref;
}

/** The block the block tool would drop at a cell, without adding it. */
export function nextBlock(x: number, y: number): Block {
	const last = doc.blocks[doc.blocks.length - 1];
	return {
		id: nextId(),
		x,
		y,
		size: last?.size ?? 2,
		height: last?.height ?? 1,
		color: last?.color ?? 1,
		shade: last?.shade ?? 'shaded',
		shape: ui.shape,
		hatch: last?.hatch ?? 'diagonal',
		density: last?.density ?? 'medium',
		label: '',
		edge: last?.edge ?? 'S',
		labelSize: last?.labelSize ?? DEFAULT_LABEL_SIZE
	};
}

export function addBlock(x: number, y: number): Block {
	const b = nextBlock(x, y);
	doc.blocks.push(b);
	dropQueue.add(b.id);
	ui.selection = { kind: 'block', id: b.id };
	return b;
}

export function addPlane(x: number, y: number, w: number, h: number): Plane {
	const last = doc.planes[doc.planes.length - 1];
	const p: Plane = {
		id: nextId(),
		x,
		y,
		w,
		h,
		color: last?.color ?? 2,
		label: '',
		edge: last?.edge ?? 'S',
		labelSize: last?.labelSize ?? DEFAULT_LABEL_SIZE
	};
	doc.planes.push(p);
	ui.selection = { kind: 'plane', id: p.id };
	return p;
}

export function addLink(a: number, b: number): Link | null {
	if (a === b) return null;
	if (doc.links.some((l) => (l.a === a && l.b === b) || (l.a === b && l.b === a))) return null;
	const last = doc.links[doc.links.length - 1];
	const l: Link = {
		id: nextId(),
		a,
		b,
		style: last?.style ?? 'elbow',
		bend: last?.bend ?? 'x',
		dash: last?.dash ?? 'solid',
		from: 'C',
		to: 'C',
		label: '',
		labelSize: last?.labelSize ?? DEFAULT_LABEL_SIZE,
		direction: last?.direction ?? 'none',
		animated: last?.animated ?? false
	};
	doc.links.push(l);
	ui.selection = { kind: 'link', id: l.id };
	return l;
}

/** Reverse a link so it runs from its second block to its first. */
export function swapLink(l: Link) {
	[l.a, l.b] = [l.b, l.a];
	[l.from, l.to] = [l.to, l.from];
}

export function deleteSelection() {
	const s = ui.selection;
	if (!s) return;
	if (s.kind === 'block') {
		doc.blocks = doc.blocks.filter((b) => b.id !== s.id);
		doc.links = doc.links.filter((l) => l.a !== s.id && l.b !== s.id);
	} else if (s.kind === 'plane') {
		doc.planes = doc.planes.filter((p) => p.id !== s.id);
	} else {
		doc.links = doc.links.filter((l) => l.id !== s.id);
	}
	ui.selection = null;
}

export function selectedBlock(): Block | undefined {
	const s = ui.selection;
	return s?.kind === 'block' ? doc.blocks.find((b) => b.id === s.id) : undefined;
}

export function selectedPlane(): Plane | undefined {
	const s = ui.selection;
	return s?.kind === 'plane' ? doc.planes.find((p) => p.id === s.id) : undefined;
}

export function selectedLink(): Link | undefined {
	const s = ui.selection;
	return s?.kind === 'link' ? doc.links.find((l) => l.id === s.id) : undefined;
}

export function blockById(id: number): Block | undefined {
	return doc.blocks.find((b) => b.id === id);
}

export function rotateBy(steps: number) {
	doc.camera.az = normAngle(doc.camera.az + steps * ANGLE_STEP);
}

export function elevateBy(steps: number) {
	doc.camera.el = clamp(doc.camera.el + steps * ANGLE_STEP, MIN_EL, MAX_EL);
}

export function zoomBy(factor: number) {
	doc.camera.zoom = clamp(doc.camera.zoom * factor, MIN_ZOOM, MAX_ZOOM);
}

export function resetCamera() {
	doc.camera = defaultCamera();
}
