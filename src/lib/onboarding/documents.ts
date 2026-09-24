import type { DocumentKit, PersonaId } from "./types";

/**
 * Socle commun : identique pour tous les profils, indépendant du métier.
 */
export const SOCLE_COMMUN: DocumentKit[] = [
  {
    id: "livret-accueil",
    icone: "📄",
    label: "Livret d'accueil de l'association",
    sousTitre: "Projet associatif, valeurs, organisation générale",
    action: "Ouvrir",
  },
  {
    id: "demarches-administratives",
    icone: "📋",
    label: "Démarches administratives à compléter",
    sousTitre: "Mutuelle, vestiaire, badge, accès informatiques",
    action: "Ouvrir",
  },
  {
    id: "plan-sites",
    icone: "🗺",
    label: "Plan des sites et contacts clés",
    sousTitre: "Sites de l'association et numéros utiles",
    action: "Ouvrir",
  },
];

/**
 * Expertise métier : filtrée par persona, d'après les documents spécifiques
 * listés pour chaque profil dans docs/backlog.md.
 */
export const EXPERTISE: Record<PersonaId, DocumentKit[]> = {
  theo: [
    {
      id: "fiches-metier-travailleur-social",
      icone: "📘",
      label: "Fiches métier · Travailleur social",
      sousTitre: "Missions, protocoles, partenaires du secteur",
      action: "Ouvrir",
    },
    {
      id: "acces-outils-numeriques",
      icone: "🔑",
      label: "Accès et outils numériques",
      sousTitre: "Logiciel de suivi, messagerie, intranet",
      action: "Ouvrir",
    },
  ],
  julien: [
    {
      id: "dispositifs-territoire",
      icone: "🌍",
      label: "Découvrir les dispositifs du territoire",
      sousTitre: "Métropole lilloise (Lille, Roubaix, Tourcoing, Villeneuve-d'Ascq)",
      action: "Ouvrir",
    },
  ],
  sophie: [
    {
      id: "procedures-confidentialite",
      icone: "🔒",
      label: "Procédures de confidentialité",
      sousTitre: "Prendre connaissance des procédures de confidentialité",
      action: "Ouvrir",
    },
    {
      id: "outils-dossier-patient",
      icone: "🖥",
      label: "Outils numériques et dossier patient",
      sousTitre: "Découvrir les outils numériques et le dossier patient",
      action: "Ouvrir",
    },
  ],
};
