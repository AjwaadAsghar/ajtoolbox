import * as THREE from "three";

/** Procedural geometries: no model files to download. */

const bevel = { bevelEnabled: true, bevelThickness: 0.06, bevelSize: 0.05, bevelSegments: 4, curveSegments: 24 };

export function gearGeometry(teeth = 10, outer = 1, inner = 0.8, hole = 0.32, depth = 0.32) {
  const shape = new THREE.Shape();
  const step = (Math.PI * 2) / teeth;
  for (let i = 0; i < teeth; i++) {
    const a = i * step;
    const pts: [number, number][] = [
      [inner, a],
      [outer, a + step * 0.15],
      [outer, a + step * 0.45],
      [inner, a + step * 0.6],
    ];
    pts.forEach(([r, ang], j) => {
      const x = Math.cos(ang) * r;
      const y = Math.sin(ang) * r;
      if (i === 0 && j === 0) shape.moveTo(x, y);
      else shape.lineTo(x, y);
    });
    // Arc along the root circle to the next tooth
    shape.absarc(0, 0, inner, a + step * 0.6, a + step, false);
  }
  const holePath = new THREE.Path();
  holePath.absarc(0, 0, hole, 0, Math.PI * 2, true);
  shape.holes.push(holePath);

  const geo = new THREE.ExtrudeGeometry(shape, { ...bevel, depth, curveSegments: 12 });
  geo.center();
  return geo;
}

export function nutGeometry(radius = 0.6, hole = 0.28, depth = 0.34) {
  const shape = new THREE.Shape();
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * Math.PI * 2 + Math.PI / 6;
    const x = Math.cos(a) * radius;
    const y = Math.sin(a) * radius;
    if (i === 0) shape.moveTo(x, y);
    else shape.lineTo(x, y);
  }
  shape.closePath();
  const holePath = new THREE.Path();
  holePath.absarc(0, 0, hole, 0, Math.PI * 2, true);
  shape.holes.push(holePath);
  const geo = new THREE.ExtrudeGeometry(shape, { ...bevel, depth });
  geo.center();
  return geo;
}

/** A classic mouse-pointer arrow, the "web" in web tools. */
export function cursorGeometry(scale = 1, depth = 0.26) {
  const s = scale;
  const shape = new THREE.Shape();
  shape.moveTo(0, 0);
  shape.lineTo(0, -1.5 * s);
  shape.lineTo(0.36 * s, -1.14 * s);
  shape.lineTo(0.62 * s, -1.72 * s);
  shape.lineTo(0.9 * s, -1.6 * s);
  shape.lineTo(0.64 * s, -1.02 * s);
  shape.lineTo(1.12 * s, -1.02 * s);
  shape.closePath();
  const geo = new THREE.ExtrudeGeometry(shape, { ...bevel, bevelSize: 0.04, depth });
  geo.center();
  return geo;
}

/** Open-end wrench head: a torus arc. The handle is a capsule added in the scene. */
export function wrenchHeadGeometry() {
  const geo = new THREE.TorusGeometry(0.34, 0.15, 20, 48, Math.PI * 1.45);
  // Rotate so the jaw opening points along +X
  geo.rotateZ(Math.PI * 0.275);
  return geo;
}
