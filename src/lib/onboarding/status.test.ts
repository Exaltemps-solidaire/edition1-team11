import { describe, expect, it } from "vitest";
import { computeJalonStatut, findModuleEnRetard } from "./status";
import type { JalonParcours } from "./types";

const jalon = (overrides: Partial<JalonParcours>): JalonParcours => ({
  id: "test",
  libelle: "Test",
  dateLabel: "Test",
  modules: [],
  ...overrides,
});

describe("computeJalonStatut", () => {
  it("retourne 'complete' quand tous les modules sont complétés, même en retard", () => {
    const j = jalon({
      dateEcheance: "2025-01-01",
      modules: [{ id: "a", titre: "A", detail: "", complete: true }],
    });

    expect(computeJalonStatut(j, new Date("2025-02-01"))).toBe("complete");
  });

  it("retourne 'en_retard' quand l'échéance est dépassée et un module reste à faire", () => {
    const j = jalon({
      dateEcheance: "2025-01-24",
      modules: [{ id: "a", titre: "A", detail: "", complete: false }],
    });

    expect(computeJalonStatut(j, new Date("2025-01-27"))).toBe("en_retard");
  });

  it("retourne 'a_venir' quand l'échéance n'est pas encore passée", () => {
    const j = jalon({
      dateEcheance: "2025-01-24",
      modules: [{ id: "a", titre: "A", detail: "", complete: false }],
    });

    expect(computeJalonStatut(j, new Date("2025-01-20"))).toBe("a_venir");
  });

  it("retourne 'a_venir' pour un jalon sans échéance connue, même longtemps après", () => {
    const j = jalon({
      modules: [{ id: "a", titre: "A", detail: "", complete: false }],
    });

    expect(computeJalonStatut(j, new Date("2030-01-01"))).toBe("a_venir");
  });

  it("retourne 'a_venir' pour un jalon purement informatif, sans module", () => {
    const j = jalon({ dateEcheance: "2025-01-01" });

    expect(computeJalonStatut(j, new Date("2025-06-01"))).toBe("a_venir");
  });
});

describe("findModuleEnRetard", () => {
  it("retourne le premier module non complété d'un jalon en retard", () => {
    const jalons: JalonParcours[] = [
      jalon({
        id: "j1",
        dateEcheance: "2025-01-01",
        modules: [{ id: "a", titre: "A", detail: "", complete: true }],
      }),
      jalon({
        id: "j2",
        dateEcheance: "2025-01-24",
        modules: [
          { id: "b", titre: "B en retard", detail: "", complete: false },
          { id: "c", titre: "C fait", detail: "", complete: true },
        ],
      }),
    ];

    const result = findModuleEnRetard(jalons, new Date("2025-01-27"));

    expect(result?.jalon.id).toBe("j2");
    expect(result?.module.titre).toBe("B en retard");
  });

  it("retourne null quand aucun jalon n'est en retard", () => {
    const jalons: JalonParcours[] = [
      jalon({
        dateEcheance: "2025-01-24",
        modules: [{ id: "a", titre: "A", detail: "", complete: false }],
      }),
    ];

    expect(findModuleEnRetard(jalons, new Date("2025-01-20"))).toBeNull();
  });
});
