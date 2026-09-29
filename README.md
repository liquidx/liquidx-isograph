# Isograph

A small SvelteKit + Three.js app for drawing 3D block diagrams on an orthographic grid.

- **Blocks**: square footprint, grid-snapped position/size/height, four shapes (box, cylinder, sphere, pyramid), four shading styles (flat, shaded, dither, hatch) with six hatch patterns at three densities, pastel/grey palette, floor-aligned labels on any edge.
- **Planes**: coloured rugs at z=0 for grouping blocks, with an optional label along any edge.
- **Links**: lines between blocks, anchored at a block's centre, an edge or a corner. Elbow (grid-routed), straight or curved; solid, dashed or dotted; optional label, one-way or two-way arrowheads, and an animated flow of dots along the line.
- **Camera**: orthographic, rotates in 15° steps, zoom and pan over an endless grid.
- **Sharing**: the whole document is encoded in the URL hash, so a link is a save file.

## Controls

| Action           | Input                                                                 |
| ---------------- | --------------------------------------------------------------------- |
| Tools            | `V` select · `P` plane · `L` link · `Esc` back to select              |
| Shapes           | `B` box · `C` cylinder · `S` sphere · `Y` pyramid                     |
| Adding           | dropping a shape or plane returns to select; hold `Shift` to add more |
| Copy / paste     | `Cmd`/`Ctrl` + `C` / `V` duplicates the selected block or plane       |
| Pan              | drag empty floor, middle-drag, or space+drag                          |
| Zoom             | wheel, `+` / `-`                                                      |
| Rotate           | right-drag, alt-drag, `Q` / `E`                                       |
| Nudge selection  | arrow keys                                                            |
| Delete selection | `Delete` / `Backspace`                                                |

## Developing

```sh
pnpm install
pnpm dev
```
