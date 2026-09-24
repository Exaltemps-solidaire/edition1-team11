import { ReferentScreen } from "@/components/onboarding/ReferentScreen";
import { isPersonaId } from "@/lib/onboarding/personas";

export default async function ReferentPage({
  searchParams,
}: {
  searchParams: Promise<{ persona?: string }>;
}) {
  const { persona } = await searchParams;
  const personaId = isPersonaId(persona) ? persona : "theo";

  return <ReferentScreen personaId={personaId} />;
}
