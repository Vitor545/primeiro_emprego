import { Plus } from "lucide-react"

import { EmptyState } from "@/components/feedback/empty-state"
import { ErrorState } from "@/components/feedback/error-state"
import { LoadingState } from "@/components/feedback/loading-state"
import { PageHeader } from "@/components/layout/page-header"
import { Button } from "@/components/ui/button"
import { ResumeCard } from "./components/resume-card"
import { useResumes } from "./hooks/use-resumes"

export function ResumesPage() {
  const { resumes, isLoading, isError, refetch, isRemoving, onCreate, onEdit, onRemove } =
    useResumes()

  return (
    <div>
      <PageHeader
        title="Curriculos"
        description="Monte, ajuste e exporte suas versoes de curriculo."
        action={
          <Button onClick={onCreate}>
            <Plus className="size-4" />
            Novo curriculo
          </Button>
        }
      />

      {isLoading && <LoadingState />}

      {isError && <ErrorState message="Nao foi possivel carregar os curriculos." onRetry={refetch} />}

      {!isLoading && !isError && resumes.length === 0 && (
        <EmptyState
          title="Nenhum curriculo criado"
          description="Comece pelo formulario guiado e receba a analise de compatibilidade com os sistemas de triagem."
          action={<Button onClick={onCreate}>Criar primeiro curriculo</Button>}
        />
      )}

      <div className="grid gap-4 md:grid-cols-2">
        {resumes.map((resume) => (
          <ResumeCard
            key={resume.id}
            resume={resume}
            isRemoving={isRemoving}
            onEdit={onEdit}
            onRemove={onRemove}
          />
        ))}
      </div>
    </div>
  )
}
