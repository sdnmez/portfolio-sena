# 3D assets

Place exported Blender models here as `.glb` / `.gltf` files when the first studies are ready in 2027.

The current lab is procedural, so this folder is intentionally empty. To use a model, add a `modelUrl` field to `data/models.ts` and load it with `useGLTF` in `components/three/LabViewer.tsx`.

Recommended pipeline:

```bash
npx @gltf-transform/cli optimize input.glb public/models/study-01.glb --compress draco
```

Keep each model under ~2 MB and test it with the reduced-motion fallback in place.
