import Link from "next/link";
import { MOCK_TODAY, PARCOURS, PERSONAS } from "@/lib/onboarding/personas";
import { computeJalonStatut, findModuleEnRetard } from "@/lib/onboarding/status";
import type { PersonaId } from "@/lib/onboarding/types";
import buttonStyles from "./Buttons.module.css";
import styles from "./OnboardingScreen.module.css";

const STATUT_LABEL = {
  complete: "Complété",
  en_retard: "En retard",
  a_venir: "À venir",
} as const;

const STATUT_DOT_SYMBOL = {
  complete: "✓",
  en_retard: "!",
  a_venir: "·",
} as const;

export function OnboardingScreen({ personaId }: { personaId: PersonaId }) {
  const persona = PERSONAS[personaId];
  const jalons = PARCOURS[personaId];
  const moduleEnRetard = findModuleEnRetard(jalons, MOCK_TODAY);

  return (
    <>
      <nav className={styles.personaSwitcher} aria-label="Choisir un profil">
        {Object.values(PERSONAS).map((p) => (
          <Link
            key={p.id}
            href={`/?persona=${p.id}`}
            aria-current={p.id === personaId ? "page" : undefined}
            className={
              p.id === personaId
                ? `${styles.personaTab} ${styles.personaTabActive}`
                : styles.personaTab
            }
          >
            {p.nom}
          </Link>
        ))}
      </nav>

      <section className={styles.screen}>
        <div className={styles.screenMeta}>
          <span className={styles.tag}>P1-1</span>
          Mon parcours · Semaine 1
        </div>

        {moduleEnRetard && (
          <div className={styles.alertBanner} role="alert">
            <span aria-hidden="true">⚠</span>
            Un module est en retard · Pense à compléter «{" "}
            {moduleEnRetard.module.titre} »
          </div>
        )}

        <h1>Mon parcours d&apos;onboarding</h1>
        <p>
          Voici les étapes prévues pour tes premières semaines à La
          Sauvegarde du Nord, dans l&apos;ordre où tu vas les vivre.
        </p>

        <div className={styles.profileCard}>
          <div className={styles.avatar} aria-hidden="true">
            {persona.nom.charAt(0)}
          </div>
          <div>
            <div className={styles.profileName} data-testid="profile-name">
              {persona.nom}
            </div>
            <div className={styles.profileRole}>
              {[
                persona.fonction,
                persona.zone,
                persona.contrat,
                persona.dateArrivee && `Arrivée ${persona.dateArrivee}`,
                persona.rattachementHierarchique,
              ]
                .filter(Boolean)
                .join(" · ")}
            </div>
          </div>
        </div>

        <hr className={styles.divider} />

        <div className={styles.sectionLabel}>Déroulé du parcours</div>

        <ol className={styles.timeline}>
          {jalons.map((jalon) => {
            const statut = computeJalonStatut(jalon, MOCK_TODAY);
            return (
              <li key={jalon.id} className={styles.timelineItem}>
                <div
                  className={`${styles.timelineDot} ${styles[`dot-${statut}`]}`}
                  aria-hidden="true"
                >
                  {STATUT_DOT_SYMBOL[statut]}
                </div>
                <div className={styles.timelineContent}>
                  <div className={styles.timelineLabel}>
                    {jalon.libelle}
                    <span
                      className={`${styles.badge} ${styles[`badge-${statut}`]}`}
                    >
                      {STATUT_LABEL[statut]}
                    </span>
                  </div>
                  <div className={styles.timelineDate}>{jalon.dateLabel}</div>
                  {jalon.modules.length > 0 && (
                    <ul className={styles.modulesList}>
                      {jalon.modules.map((module) => (
                        <li key={module.id} className={styles.moduleItem}>
                          <span
                            className={
                              module.complete
                                ? styles.moduleCheckDone
                                : styles.moduleCheckTodo
                            }
                            aria-hidden="true"
                          >
                            {module.complete ? "✓" : "–"}
                          </span>
                          <div>
                            <div className={styles.moduleTitre}>
                              {module.titre}
                            </div>
                            <div className={styles.moduleDetail}>
                              {module.detail}
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </li>
            );
          })}
        </ol>

        <hr className={styles.divider} />

        <Link
          href={`/referent?persona=${personaId}`}
          className={buttonStyles.btnPrimary}
        >
          Voir ma personne référente
        </Link>
        <Link
          href={`/kit?persona=${personaId}`}
          className={buttonStyles.btnSecondary}
        >
          Accéder à mon kit de documents →
        </Link>
      </section>
    </>
  );
}
