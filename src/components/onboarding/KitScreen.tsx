import Link from "next/link";
import { EXPERTISE, SOCLE_COMMUN } from "@/lib/onboarding/documents";
import { PERSONAS } from "@/lib/onboarding/personas";
import type { DocumentKit, PersonaId } from "@/lib/onboarding/types";
import buttonStyles from "./Buttons.module.css";
import styles from "./KitScreen.module.css";
import screenStyles from "./OnboardingScreen.module.css";

function DocumentList({ documents }: { documents: DocumentKit[] }) {
  return (
    <ul className={styles.kitList}>
      {documents.map((document) => (
        <li key={document.id} className={styles.kitItem}>
          <span className={styles.kitIcon} aria-hidden="true">
            {document.icone}
          </span>
          <div className={styles.kitBody}>
            <div className={styles.kitLabel}>{document.label}</div>
            <div className={styles.kitSub}>{document.sousTitre}</div>
          </div>
          <span className={styles.kitAction}>{document.action}</span>
        </li>
      ))}
    </ul>
  );
}

export function KitScreen({ personaId }: { personaId: PersonaId }) {
  const persona = PERSONAS[personaId];
  const expertise = EXPERTISE[personaId];

  return (
    <>
      <nav
        className={screenStyles.personaSwitcher}
        aria-label="Choisir un profil"
      >
        {Object.values(PERSONAS).map((p) => (
          <Link
            key={p.id}
            href={`/kit?persona=${p.id}`}
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
          <span className={screenStyles.tag}>P1-3</span>
          Mon kit de documents
        </div>

        <h1>Mon kit de documents</h1>
        <p>
          Ces ressources ont été sélectionnées pour ton profil :{" "}
          {persona.fonction.toLowerCase()}, {persona.zone}. Elles
          t&apos;appartiennent dès aujourd&apos;hui.
        </p>

        <div className={screenStyles.sectionLabel}>
          Socle commun · tous les collaborateurs
        </div>
        <DocumentList documents={SOCLE_COMMUN} />

        <hr className={screenStyles.divider} />

        <div className={screenStyles.sectionLabel}>
          Expertise · {persona.fonction}
        </div>
        <DocumentList documents={expertise} />

        <hr className={screenStyles.divider} />

        <Link
          href={`/?persona=${personaId}`}
          className={buttonStyles.btnPrimary}
        >
          ← Retour à mon parcours
        </Link>
        <Link
          href={`/referent?persona=${personaId}`}
          className={buttonStyles.btnSecondary}
        >
          Voir ma personne référente →
        </Link>
      </section>
    </>
  );
}
