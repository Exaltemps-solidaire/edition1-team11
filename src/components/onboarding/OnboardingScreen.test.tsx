import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { OnboardingScreen } from "./OnboardingScreen";

describe("OnboardingScreen", () => {
  it("affiche l'alerte de retard pour Théo, dont le module J+10 est en retard", () => {
    render(<OnboardingScreen personaId="theo" />);

    expect(screen.getByRole("alert")).toHaveTextContent(
      "Présentation générale",
    );
  });

  it("n'affiche pas d'alerte de retard pour Julien, sans échéance connue", () => {
    render(<OnboardingScreen personaId="julien" />);

    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  it("affiche le profil du persona sélectionné", () => {
    render(<OnboardingScreen personaId="sophie" />);

    expect(screen.getByTestId("profile-name")).toHaveTextContent(
      "Sophie Dubois",
    );
    expect(screen.getByText(/Psychologue clinicienne/)).toBeInTheDocument();
    expect(
      screen.getByText(/Jonathan Cohen, directeur d'établissement/),
    ).toBeInTheDocument();
  });

  it("propose un lien vers chacun des 3 personas, avec le persona courant marqué actif", () => {
    render(<OnboardingScreen personaId="julien" />);

    const theoLink = screen.getByRole("link", { name: "Théo Martin" });
    const julienLink = screen.getByRole("link", { name: "Julien Martin" });

    expect(theoLink).toHaveAttribute("href", "/?persona=theo");
    expect(julienLink).toHaveAttribute("aria-current", "page");
  });

  it("liste au moins 3 étapes/modules nommables pour Julien", () => {
    render(<OnboardingScreen personaId="julien" />);

    expect(
      screen.getByText("RH · Administratif reçu"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Formation outils salariés"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Découvrir les dispositifs du territoire"),
    ).toBeInTheDocument();
  });
});
