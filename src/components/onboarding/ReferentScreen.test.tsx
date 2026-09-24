import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ReferentScreen } from "./ReferentScreen";

describe("ReferentScreen", () => {
  it("affiche la carte de la personne référente de Théo", () => {
    render(<ReferentScreen personaId="theo" />);

    expect(screen.getByTestId("referent-name")).toHaveTextContent(
      "Sophie Leroy",
    );
    expect(
      screen.getByText(/Éducatrice spécialisée · SAVS Lille/),
    ).toBeInTheDocument();
  });

  it("formate les moyens de contact de la personne référente", () => {
    render(<ReferentScreen personaId="theo" />);

    expect(screen.getByText(/06 12 34 56 78/)).toBeInTheDocument();
    expect(screen.getByText(/s\.leroy@sauvegarde-nord\.fr/)).toBeInTheDocument();
  });

  it("affiche la checklist de suivi de la référente", () => {
    render(<ReferentScreen personaId="theo" />);

    expect(screen.getByText("Premier contact établi")).toBeInTheDocument();
    expect(
      screen.getByText("Premiers retours et questions"),
    ).toBeInTheDocument();
    expect(screen.getByText("Bilan à 6 mois")).toBeInTheDocument();
  });

  it("affiche un état vide explicite pour Julien, sans personne référente mockée", () => {
    render(<ReferentScreen personaId="julien" />);

    expect(screen.getByTestId("referent-empty-state")).toBeInTheDocument();
    expect(screen.queryByTestId("referent-name")).not.toBeInTheDocument();
  });

  it("affiche un état vide explicite pour Sophie Dubois, sans personne référente mockée", () => {
    render(<ReferentScreen personaId="sophie" />);

    expect(screen.getByTestId("referent-empty-state")).toBeInTheDocument();
    expect(screen.queryByTestId("referent-name")).not.toBeInTheDocument();
  });
});
