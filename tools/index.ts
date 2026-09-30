import type { ComponentType } from "react";
import Hamster from "./hamster";

/**
 * slug → tool UI. Each entry is a tiny client wrapper that lazy-loads the real tool
 * (see tools/hamster/index.tsx), so tools never bloat each other's bundles.
 *
 * To add a tool: create tools/<slug>/index.tsx + tools/<slug>/<Name>Tool.tsx, then add it here.
 */
export const toolComponents: Record<string, ComponentType> = {
  hamster: Hamster,
};
