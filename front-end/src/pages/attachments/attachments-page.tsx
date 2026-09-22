import { useRef } from "react"
import { Upload } from "lucide-react"

import { EmptyState } from "@/components/feedback/empty-state"
import { ErrorState } from "@/components/feedback/error-state"
import { LoadingState } from "@/components/feedback/loading-state"
import { PageHeader } from "@/components/layout/page-header"
import { Button } from "@/components/ui/button"
import { AttachmentRow } from "./components/attachment-row"
import { useAttachments } from "./hooks/use-attachments"

export function AttachmentsPage() {
  const inputRef = useRef<HTMLInputElement>(null)
  const {
    isStorageEnabled,
    attachments,
    isLoading,
    isError,
    refetch,
    isUploading,
    isRemoving,
    onUpload,
    onRemove,
  } = useAttachments()

  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader
        title="Documentos"
        description="Guarde certificados, declaracoes e versoes do curriculo para ter em maos no processo seletivo."
        action={
          isStorageEnabled && (
            <Button onClick={() => inputRef.current?.click()} disabled={isUploading}>
              <Upload className="size-4" />
              {isUploading ? "Enviando..." : "Enviar documento"}
            </Button>
          )
        }
      />

      <input
        ref={inputRef}
        type="file"
        className="hidden"
        accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
        onChange={(event) => {
          const file = event.target.files?.[0]
          if (file) onUpload(file)
          event.target.value = ""
        }}
      />

      {!isStorageEnabled && (
        <EmptyState
          title="Armazenamento indisponivel"
          description="O envio de documentos depende do servico de armazenamento de arquivos, que nao esta configurado neste ambiente."
        />
      )}

      {isStorageEnabled && isLoading && <LoadingState />}

      {isStorageEnabled && isError && (
        <ErrorState message="Nao foi possivel carregar seus documentos." onRetry={refetch} />
      )}

      {isStorageEnabled && !isLoading && !isError && attachments.length === 0 && (
        <EmptyState
          title="Nenhum documento enviado"
          description="Aceita PDF, DOC, DOCX, PNG e JPG com ate 5 MB por arquivo."
          action={<Button onClick={() => inputRef.current?.click()}>Enviar documento</Button>}
        />
      )}

      <div className="space-y-2">
        {attachments.map((attachment) => (
          <AttachmentRow
            key={attachment.id}
            attachment={attachment}
            isRemoving={isRemoving}
            onRemove={onRemove}
          />
        ))}
      </div>
    </div>
  )
}
