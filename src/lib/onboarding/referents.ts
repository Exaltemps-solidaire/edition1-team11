import type { PersonaId, Referent } from "./types";

/**
 * Le rattachement hiérarchique (Maria Read pour Julien, Jonathan Cohen pour
 * Sophie Dubois) n'est pas une personne référente au sens P1-2 : aucune
 * personne référente n'a été communiquée pour ces deux profils, donc
 * l'écran doit afficher un état vide explicite plutôt qu'une donnée
 * inventée. Voir docs/backlog.md, section P1-2.
 */
export const REFERENTS: Record<PersonaId, Referent | null> = {
  theo: {
    contact: {
      nom: "Sophie Leroy",
      role: "Éducatrice spécialisée",
      service: "SAVS Lille",
      anciennete: "Référente d'intégration depuis 3 ans",
      telephone: "06 12 34 56 78",
      email: "s.leroy@sauvegarde-nord.fr",
      disponibilite: "Bureau B204 · Disponible lun–ven, 9h–17h",
    },
    suivi: [
      {
        id: "premier-contact",
        titre: "Premier contact établi",
        detail: "Rencontre buddy · 14 janvier",
        complete: true,
      },
      {
        id: "premiers-retours",
        titre: "Premiers retours et questions",
        detail: "Rendez-vous prévu · à planifier",
        complete: false,
      },
      {
        id: "bilan-six-mois",
        titre: "Bilan à 6 mois",
        detail: "Welcome Team · juillet 2025",
        complete: false,
      },
    ],
  },
  julien: null,
  sophie: null,
};
