import { KitScreen } from "@/components/onboarding/KitScreen";
import { isPersonaId } from "@/lib/onboarding/personas";

export default async function KitPage({
  searchParams,
}: {
  searchParams: Promise<{ persona?: string }>;
}) {
  const { persona } = await searchParams;
  const personaId = isPersonaId(persona) ? persona : "theo";

  return <KitScreen personaId={personaId} />;
}
