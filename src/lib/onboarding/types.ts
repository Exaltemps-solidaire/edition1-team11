export type PersonaId = "theo" | "julien" | "sophie";

export interface Persona {
  id: PersonaId;
  nom: string;
  fonction: string;
  zone: string;
  rattachementHierarchique?: string;
  contrat?: string;
  dateArrivee?: string;
}

export interface ModuleEtape {
  id: string;
  titre: string;
  detail: string;
  complete: boolean;
}

export interface JalonParcours {
  id: string;
  libelle: string;
  dateLabel: string;
  /** ISO date (yyyy-mm-dd). Absent = le jalon n'a pas d'échéance connue. */
  dateEcheance?: string;
  modules: ModuleEtape[];
}

export type JalonStatut = "complete" | "en_retard" | "a_venir";

export interface ContactReferent {
  nom: string;
  role: string;
  service: string;
  anciennete: string;
  telephone: string;
  email: string;
  disponibilite: string;
}

export interface SuiviItem {
  id: string;
  titre: string;
  detail: string;
  complete: boolean;
}

export interface Referent {
  contact: ContactReferent;
  suivi: SuiviItem[];
}

export interface DocumentKit {
  id: string;
  icone: string;
  label: string;
  sousTitre: string;
  action: string;
}
