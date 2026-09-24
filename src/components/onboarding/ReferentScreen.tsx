import Link from "next/link";
import { PERSONAS } from "@/lib/onboarding/personas";
import { REFERENTS } from "@/lib/onboarding/referents";
import type { PersonaId } from "@/lib/onboarding/types";
import buttonStyles from "./Buttons.module.css";
import screenStyles from "./OnboardingScreen.module.css";
import styles from "./ReferentScreen.module.css";

export function ReferentScreen({ personaId }: { personaId: PersonaId }) {
  const persona = PERSONAS[personaId];
  const referent = REFERENTS[personaId];
  const prenomReferent = referent?.contact.nom.split(" ")[0];

  return (
    <>
      <nav
        className={screenStyles.personaSwitcher}
        aria-label="Choisir un profil"
      >
        {Object.values(PERSONAS).map((p) => (
          <Link
            key={p.id}
            href={`/referent?persona=${p.id}`}
            aria-current={p.id === personaId ? "page" : undefined}
            className={
              p.id === personaId
                ? `${screenStyles.personaTab} ${screenStyles.personaTabActive}`
                : screenStyles.personaTab
            }
          >
            {p.nom}
          </Link>
        ))}
      </nav>

      <section className={screenStyles.screen}>
        <div className={screenStyles.screenMeta}>
          <span className={screenStyles.tag}>P1-2</span>
          Ma personne référente
        </div>

        <h1>Ta personne référente</h1>
        <p>
          C&apos;est elle qui suit tes premiers pas. Tu peux lui écrire ou
          l&apos;appeler dès que tu bloques, sans attendre.
        </p>

        {referent ? (
          <>
            <div className={styles.referentCard}>
              <div className={styles.referentHeader}>
                <div className={styles.avatar} aria-hidden="true">
                  {referent.contact.nom.charAt(0)}
                </div>
                <div>
                  <div
                    className={styles.referentName}
                    data-testid="referent-name"
                  >
                    {referent.contact.nom}
                  </div>
                  <div className={styles.referentRole}>
                    {referent.contact.role} · {referent.contact.service}
                    <br />
                    {referent.contact.anciennete}
                  </div>
                </div>
              </div>

              <hr className={screenStyles.divider} />

              <div className={screenStyles.sectionLabel}>
                Comment la joindre
              </div>
              <div className={styles.contactList}>
                <div className={styles.referentContact}>
                  📞 {referent.contact.telephone}
                </div>
                <div className={styles.referentContact}>
                  ✉ {referent.contact.email}
                </div>
                <div className={styles.disponibilite}>
                  {referent.contact.disponibilite}
                </div>
              </div>
            </div>

            <hr className={screenStyles.divider} />

            <div className={screenStyles.sectionLabel}>
              Ce que {prenomReferent} suit pour toi
            </div>

            <ul className={styles.modulesList}>
              {referent.suivi.map((item) => (
                <li key={item.id} className={styles.moduleItem}>
                  <span
                    className={
                      item.complete
                        ? styles.moduleCheckDone
                        : styles.moduleCheckTodo
                    }
                    aria-hidden="true"
                  >
                    {item.complete ? "✓" : "–"}
                  </span>
                  <div>
                    <div className={styles.moduleTitre}>{item.titre}</div>
                    <div className={styles.moduleDetail}>{item.detail}</div>
                  </div>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <div className={styles.emptyState} data-testid="referent-empty-state">
            Aucune personne référente n&apos;est encore désignée pour{" "}
            {persona.nom}. Cette information doit être confirmée par
            l&apos;association avant de pouvoir s&apos;afficher ici — le
            rattachement hiérarchique du profil n&apos;est pas une personne
            référente.
          </div>
        )}

        <hr className={screenStyles.divider} />

        <Link
          href={`/kit?persona=${personaId}`}
          className={buttonStyles.btnPrimary}
        >
          Accéder à mon kit de documents
        </Link>
        <Link
          href={`/?persona=${personaId}`}
          className={buttonStyles.btnSecondary}
        >
          ← Retour au parcours
        </Link>
      </section>
    </>
  );
}
