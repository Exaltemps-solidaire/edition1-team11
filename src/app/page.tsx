import { OnboardingScreen } from "@/components/onboarding/OnboardingScreen";
import { isPersonaId } from "@/lib/onboarding/personas";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ persona?: string }>;
}) {
  const { persona } = await searchParams;
  const personaId = isPersonaId(persona) ? persona : "theo";

  return <OnboardingScreen personaId={personaId} />;
}
