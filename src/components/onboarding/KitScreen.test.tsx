import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { KitScreen } from "./KitScreen";

describe("KitScreen", () => {
  it("affiche les documents du socle commun pour n'importe quel persona", () => {
    render(<KitScreen personaId="julien" />);

    expect(
      screen.getByText("Livret d'accueil de l'association"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Démarches administratives à compléter"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Plan des sites et contacts clés"),
    ).toBeInTheDocument();
  });

  it("filtre les documents d'expertise selon le métier de Théo", () => {
    render(<KitScreen personaId="theo" />);

    expect(
      screen.getByText("Fiches métier · Travailleur social"),
    ).toBeInTheDocument();
    expect(screen.getByText("Accès et outils numériques")).toBeInTheDocument();
    expect(
      screen.queryByText("Découvrir les dispositifs du territoire"),
    ).not.toBeInTheDocument();
  });

  it("filtre les documents d'expertise selon le métier de Julien", () => {
    render(<KitScreen personaId="julien" />);

    expect(
      screen.getByText("Découvrir les dispositifs du territoire"),
    ).toBeInTheDocument();
    expect(
      screen.queryByText("Fiches métier · Travailleur social"),
    ).not.toBeInTheDocument();
  });

  it("filtre les documents d'expertise selon le métier de Sophie Dubois", () => {
    render(<KitScreen personaId="sophie" />);

    expect(
      screen.getByText("Procédures de confidentialité"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Outils numériques et dossier patient"),
    ).toBeInTheDocument();
  });

  it("rend les deux sections socle commun et expertise", () => {
    render(<KitScreen personaId="sophie" />);

    expect(
      screen.getByText("Socle commun · tous les collaborateurs"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Expertise · Psychologue clinicienne"),
    ).toBeInTheDocument();
  });
});
