# Backlog — Onboarding du nouveau professionnel

Source de vérité pour la définition des US : `passation/cadrage/3-backlog.md`
(cadrage produit en séance). Ce document reprend ces US et les découpe en
tâches techniques implémentables une par une, dans l'ordre de priorité.

Référence UI : `passation/prototype/index.html` (3 écrans : parcours,
référent, kit de documents).

## EPIC-1 — Parcours d'onboarding personnalisé du nouveau professionnel

- **Acteur** : le nouveau professionnel de la Sauvegarde du Nord (salarié
  CDI, CDD, alternant, contrat d'insertion)
- **Épisode** : les premières semaines dans l'association, avant que les
  informations clés aient été trouvées seules ou transmises par un collègue

Idées explicitement écartées par le vote de la squad (ne pas implémenter
sans nouvelle validation) : chat de questions en direct, fiches
utilisateurs pilotant l'intranet, relances automatiques de complétion,
équipe support dédiée au contenu intranet, présentation de l'intranet
avant la réunion mi-année.

---

## Personas mockées (données partagées par P1-1 et P1-3)

Trois personas servent de jeu de données pour les fixtures. La
rattachement hiérarchique est une donnée de profil affichée à titre
d'information — ce n'est **pas** la personne référente de P1-2 (les deux
rôles ne sont pas liés).

| | Théo Martin | Julien Martin | Sophie Dubois |
|---|---|---|---|
| Fonction | Travailleur social | Animateur socio-culturel | Psychologue clinicienne |
| Zone / service | SAVS Lille | Métropole lilloise (Lille, Roubaix, Tourcoing, Villeneuve-d'Ascq) | Valenciennes et Valenciennois |
| Rattachement hiérarchique | *(non fourni)* | Maria Read, chef de service éducatif | Jonathan Cohen, directeur d'établissement |
| Contrat / arrivée | CDI · 14 janvier 2025 | *(non fourni)* | *(non fourni)* |
| Documents spécifiques (au-delà du socle commun) | Fiches métier travailleur social, accès et outils numériques | Découvrir les dispositifs du territoire métropole lilloise | Prendre connaissance des procédures de confidentialité ; découvrir les outils numériques et le dossier patient |

❗️Champs manquants à combler avant l'implémentation (placeholders à
défaut de réponse) : contrat/date d'arrivée pour Julien et Sophie
Dubois.

---

## P1-1 · Mon parcours d'onboarding (rang 1)

- **Moment** : dès la prise de poste
- **Capacité** : suivre un parcours d'onboarding personnalisé selon son
  métier et ses accès
- **Gain** : savoir quoi apprendre et dans quel ordre, sans dépendre du
  hasard des collègues disponibles
- **Critère d'acceptation** : à la fin de sa première semaine, il peut
  nommer les trois ressources clés de son poste sans avoir eu à appeler
  le siège

### Découpage technique

1. Fixture mockée : les 3 personas ci-dessus (nom, métier, zone/service,
   rattachement hiérarchique, contrat, date d'arrivée) + étapes du
   parcours par persona (libellé, jalon J1 / J+10 / semaine 1, statut
   fait / en retard / à venir). Seul le parcours de Théo est détaillé
   dans le prototype ; celui de Julien et Sophie Dubois est à
   construire sur le même schéma.
2. Écran d'accueil du parcours : carte profil + bannière d'alerte si une
   étape est en retard + timeline des étapes groupée par jalon.
3. Navigation partagée minimale entre les futurs écrans (P1-2, P1-3),
   livrée avec cette US puisque c'est le premier écran.
4. Tests unitaires du calcul de statut d'une étape (fait / en retard / à
   venir) et test de rendu de la timeline.

---

## P1-2 · Ma personne référente (rang 2)

- **Moment** : le jour de son arrivée dans son service
- **Capacité** : identifier une personne référente qui suit ses premiers
  pas
- **Gain** : savoir à qui s'adresser quand il bloque, sans chercher seul
- **Critère d'acceptation** : le jour J, il connaît le nom et le rôle de
  sa personne référente, et sait comment la joindre

### Découpage technique

1. Fixture mockée référent (nom, rôle, service, ancienneté, téléphone,
   email, disponibilités), liée au profil de P1-1. ❗️Donnée disponible
   uniquement pour Théo (Sophie Leroy, éducatrice spécialisée,
   référente d'intégration depuis 3 ans) — le rattachement hiérarchique
   de Julien (Maria Read) et Sophie Dubois (Jonathan Cohen) n'est pas
   une personne référente et ne doit pas être réutilisé comme tel ; à
   confirmer avec l'association qui suit leurs premiers pas.
2. Écran référent : carte contact + liste "ce que la référente suit pour
   moi" avec statut (fait / à venir). Pour Julien et Sophie Dubois, tant
   que la donnée référent manque, l'écran affiche un état vide explicite
   plutôt qu'une donnée inventée.
3. Tests : rendu de la carte contact, formatage des moyens de contact,
   affichage de la checklist de suivi, et affichage de l'état vide
   quand aucun référent n'est mocké pour le persona.

---

## P1-3 · Mon kit de documents (rang 3)

- **Moment** : dès son arrivée
- **Capacité** : recevoir un kit de documents ciblés sur son profil
- **Gain** : accéder immédiatement aux informations qui le concernent
  sans avoir à fouiller l'intranet
- **Critère d'acceptation** : le jour J, il a reçu son kit et peut citer
  au moins une information qu'il n'aurait pas trouvée seul dans la
  semaine

### Découpage technique

1. Fixture mockée : documents "socle commun" (tous profils, ex. livret
   d'accueil, démarches administratives, plan des sites) + documents
   "expertise" filtrés par persona/métier — fiches métier travailleur
   social pour Théo, dispositifs du territoire métropole lilloise pour
   Julien, procédures de confidentialité + outils numériques et dossier
   patient pour Sophie Dubois — chacun avec libellé / sous-titre /
   icône / action.
2. Écran kit : deux sections (socle commun, expertise du métier), liste
   de documents. Action "Ouvrir" en placeholder — pas de vrai stockage
   de fichiers à ce stade, hors scope de cette itération.
3. Tests : filtrage des documents par profil/métier, rendu des deux
   sections.

---

## Notes transverses

- **Données mockées d'abord** : les 3 US s'appuient sur des fixtures
  TypeScript en dur, le temps qu'une vraie source de données/API soit
  décidée. Ce choix est structurant et doit être noté dans `adr.md` au
  moment de l'implémenter.
- **Un US = un commit/PR distinct**, implémenté dans l'ordre du rang
  (P1-1 → P1-2 → P1-3), avec tests avant d'être considéré terminé
  (voir `CLAUDE.md` sections 3 et 7, `docs/testing-guidelines.md`).
