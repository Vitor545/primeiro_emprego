import { ArrowLeft, Download, Save } from "lucide-react"

import { ErrorState } from "@/components/feedback/error-state"
import { LoadingState } from "@/components/feedback/loading-state"
import { PageHeader } from "@/components/layout/page-header"
import { Button } from "@/components/ui/button"
import { AiAssistant } from "./components/ai-assistant"
import { AtsChecklist } from "./components/ats-checklist"
import { ResumeForm } from "./components/resume-form"
import { ResumePreview } from "./components/resume-preview"
import { useResumeEditor } from "./hooks/use-resume-editor"

export function ResumeEditorPage() {
  const {
    form,
    ai,
    education,
    experiences,
    isNew,
    isLoading,
    isError,
    isSaving,
    ats,
    preview,
    onSubmit,
    onPrint,
    onBack,
  } = useResumeEditor()

  if (isLoading) return <LoadingState />
  if (isError) return <ErrorState message="Nao foi possivel carregar este curriculo." />

  return (
    <div>
      <PageHeader
        title={isNew ? "Novo curriculo" : "Editar curriculo"}
        description="Preencha os campos a esquerda e acompanhe o resultado a direita."
        action={
          <div className="flex gap-2">
            <Button variant="ghost" onClick={onBack}>
              <ArrowLeft className="size-4" />
              Voltar
            </Button>
            <Button variant="outline" onClick={onPrint} disabled={isNew}>
              <Download className="size-4" />
              Exportar PDF
            </Button>
            <Button type="submit" form="resume-form" disabled={isSaving}>
              <Save className="size-4" />
              {isSaving ? "Salvando..." : "Salvar"}
            </Button>
          </div>
        }
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="print:hidden">
          <ResumeForm
            form={form}
            education={education}
            experiences={experiences}
            onSubmit={onSubmit}
          />
        </div>

        <div className="space-y-6">
          {ats && <AtsChecklist analysis={ats} />}
          <AiAssistant {...ai} />
          <ResumePreview content={preview} />
        </div>
      </div>
    </div>
  )
}
