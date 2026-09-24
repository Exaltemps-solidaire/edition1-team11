import type { JalonParcours, Persona, PersonaId } from "./types";

export function isPersonaId(value: string | undefined): value is PersonaId {
  return value === "theo" || value === "julien" || value === "sophie";
}

/**
 * Date de référence pour la démo mockée (correspond au prototype :
 * l'étape J+10 de Théo, prévue le 24 janvier, est en retard "aujourd'hui").
 */
export const MOCK_TODAY = new Date("2025-01-27");

export const PERSONAS: Record<PersonaId, Persona> = {
  theo: {
    id: "theo",
    nom: "Théo Martin",
    fonction: "Travailleur social",
    zone: "SAVS Lille",
    contrat: "CDI",
    dateArrivee: "14 janvier 2025",
  },
  julien: {
    id: "julien",
    nom: "Julien Martin",
    fonction: "Animateur socio-culturel",
    zone: "Métropole lilloise (Lille, Roubaix, Tourcoing, Villeneuve-d'Ascq)",
    rattachementHierarchique: "Maria Read, chef de service éducatif",
  },
  sophie: {
    id: "sophie",
    nom: "Sophie Dubois",
    fonction: "Psychologue clinicienne",
    zone: "Valenciennes et Valenciennois",
    rattachementHierarchique: "Jonathan Cohen, directeur d'établissement",
  },
};

export const PARCOURS: Record<PersonaId, JalonParcours[]> = {
  theo: [
    {
      id: "jour-1",
      libelle: "Jour 1",
      dateLabel: "14 janvier 2025",
      dateEcheance: "2025-01-14",
      modules: [
        {
          id: "rh-admin",
          titre: "RH · Administratif reçu",
          detail: "Contrat, mutuelle, badges",
          complete: true,
        },
        {
          id: "buddy",
          titre: "Rencontre buddy",
          detail: "Sophie Leroy · Éducatrice spécialisée",
          complete: true,
        },
      ],
    },
    {
      id: "j10",
      libelle: "J+10",
      dateLabel: "Prévu le 24 janvier",
      dateEcheance: "2025-01-24",
      modules: [
        {
          id: "presentation",
          titre: "Présentation générale",
          detail: "L'association, ses missions, son projet associatif",
          complete: false,
        },
        {
          id: "formation-outils",
          titre: "Formation outils salariés",
          detail: "Intranet, messagerie, annuaire",
          complete: true,
        },
        {
          id: "premiers-retours",
          titre: "Premiers retours et questions",
          detail: "Rendez-vous avec le référent",
          complete: false,
        },
      ],
    },
    {
      id: "semaines-2-4",
      libelle: "En continu",
      dateLabel: "Semaines 2 à 4",
      modules: [],
    },
    {
      id: "six-mois",
      libelle: "+6 mois",
      dateLabel: "Juillet 2025",
      modules: [],
    },
  ],
  julien: [
    {
      id: "jour-1",
      libelle: "Jour 1",
      dateLabel: "Prise de poste",
      modules: [
        {
          id: "rh-admin",
          titre: "RH · Administratif reçu",
          detail: "Contrat, mutuelle, badges",
          complete: false,
        },
      ],
    },
    {
      id: "j10",
      libelle: "J+10",
      dateLabel: "À planifier",
      modules: [
        {
          id: "formation-outils",
          titre: "Formation outils salariés",
          detail: "Intranet, messagerie, annuaire",
          complete: false,
        },
        {
          id: "dispositifs-territoire",
          titre: "Découvrir les dispositifs du territoire",
          detail:
            "Métropole lilloise (Lille, Roubaix, Tourcoing, Villeneuve-d'Ascq)",
          complete: false,
        },
      ],
    },
  ],
  sophie: [
    {
      id: "jour-1",
      libelle: "Jour 1",
      dateLabel: "Prise de poste",
      modules: [
        {
          id: "rh-admin",
          titre: "RH · Administratif reçu",
          detail: "Contrat, mutuelle, badges",
          complete: false,
        },
      ],
    },
    {
      id: "j10",
      libelle: "J+10",
      dateLabel: "À planifier",
      modules: [
        {
          id: "formation-outils",
          titre: "Formation outils salariés",
          detail: "Intranet, messagerie, annuaire",
          complete: false,
        },
        {
          id: "confidentialite",
          titre: "Procédures de confidentialité",
          detail: "Prendre connaissance des procédures de confidentialité",
          complete: false,
        },
        {
          id: "dossier-patient",
          titre: "Outils numériques et dossier patient",
          detail: "Découvrir les outils numériques et le dossier patient",
          complete: false,
        },
      ],
    },
  ],
};
