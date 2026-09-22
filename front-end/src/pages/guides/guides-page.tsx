import { ErrorState } from "@/components/feedback/error-state"
import { LoadingState } from "@/components/feedback/loading-state"
import { PageHeader } from "@/components/layout/page-header"
import { GuideCard } from "./components/guide-card"
import { useGuides } from "./hooks/use-guides"

export function GuidesPage() {
  const { guides, isLoading, isError, refetch, onOpen } = useGuides()

  return (
    <div>
      <PageHeader
        title="Guias"
        description="Conteudos curtos sobre curriculo, entrevista e competencias comportamentais."
      />

      {isLoading && <LoadingState />}
      {isError && <ErrorState message="Nao foi possivel carregar os guias." onRetry={refetch} />}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {guides.map((guide) => (
          <GuideCard key={guide.slug} guide={guide} onOpen={onOpen} />
        ))}
      </div>
    </div>
  )
}
