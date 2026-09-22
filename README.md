# Isograph

A small SvelteKit + Three.js app for drawing 3D block diagrams on an orthographic grid.

- **Blocks**: square footprint, grid-snapped position/size/height, four shading styles (flat, shaded, dither, hatch), pastel/grey palette, floor-aligned labels on any edge.
- **Planes**: coloured rugs at z=0 for grouping blocks.
- **Links**: thin black lines between block centres, routed along grid lines.
- **Camera**: orthographic, rotates in 15° steps, zoom and pan.
- **Sharing**: the whole document is encoded in the URL hash, so a link is a save file.

## Controls

| Action           | Input                                                                |
| ---------------- | -------------------------------------------------------------------- |
| Tools            | `V` select · `B` block · `P` plane · `L` link · `Esc` back to select |
| Pan              | drag empty floor, middle-drag, or space+drag                         |
| Zoom             | wheel, `+` / `-`                                                     |
| Rotate           | right-drag, alt-drag, `Q` / `E`                                      |
| Nudge selection  | arrow keys                                                           |
| Delete selection | `Delete` / `Backspace`                                               |

## Developing

```sh
pnpm install
pnpm dev
```
