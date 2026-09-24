import type { JalonParcours, JalonStatut, ModuleEtape } from "./types";

export function computeJalonStatut(
  jalon: JalonParcours,
  today: Date,
): JalonStatut {
  const hasModules = jalon.modules.length > 0;
  const toutesModulesCompletes =
    hasModules && jalon.modules.every((module) => module.complete);

  if (toutesModulesCompletes) {
    return "complete";
  }

  if (hasModules && jalon.dateEcheance && today > new Date(jalon.dateEcheance)) {
    return "en_retard";
  }

  return "a_venir";
}

export interface ModuleEnRetard {
  jalon: JalonParcours;
  module: ModuleEtape;
}

export function findModuleEnRetard(
  jalons: JalonParcours[],
  today: Date,
): ModuleEnRetard | null {
  for (const jalon of jalons) {
    if (computeJalonStatut(jalon, today) !== "en_retard") {
      continue;
    }
    const moduleEnRetard = jalon.modules.find((m) => !m.complete);
    if (moduleEnRetard) {
      return { jalon, module: moduleEnRetard };
    }
  }
  return null;
}
