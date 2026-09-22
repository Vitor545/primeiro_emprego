import { ArrowLeft, Check } from "lucide-react"

import { ErrorState } from "@/components/feedback/error-state"
import { LoadingState } from "@/components/feedback/loading-state"
import { PageHeader } from "@/components/layout/page-header"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useGuideDetail } from "./hooks/use-guide-detail"

export function GuideDetailPage() {
  const { guide, isLoading, isError, isMarking, onMarkAsRead, onBack } = useGuideDetail()

  if (isLoading) return <LoadingState />
  if (isError || !guide) return <ErrorState message="Guia nao encontrado." />

  return (
    <article className="mx-auto max-w-3xl">
      <PageHeader
        title={guide.title}
        description={`${guide.category} - ${guide.readingMinutes} min de leitura`}
        action={
          <div className="flex gap-2">
            <Button variant="ghost" onClick={onBack}>
              <ArrowLeft className="size-4" />
              Voltar
            </Button>
            <Button onClick={onMarkAsRead} disabled={isMarking}>
              <Check className="size-4" />
              Marcar como lido
            </Button>
          </div>
        }
      />

      <p className="text-muted-foreground">{guide.summary}</p>
      <Separator className="my-6" />

      <div className="space-y-6">
        {guide.sections.map((section) => (
          <section key={section.title} className="space-y-2">
            <h2 className="text-lg font-medium">{section.title}</h2>
            <p className="leading-relaxed text-muted-foreground">{section.content}</p>
          </section>
        ))}
      </div>
    </article>
  )
}
