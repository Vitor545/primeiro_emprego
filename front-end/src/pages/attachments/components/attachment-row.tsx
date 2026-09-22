import { Download, FileText, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { formatDateTime } from "@/lib/format-date"
import { formatFileSize } from "@/lib/format-file-size"
import type { Attachment } from "@/types/attachment"

interface AttachmentRowProps {
  attachment: Attachment
  isRemoving: boolean
  onRemove: (id: string) => void
}

export function AttachmentRow({ attachment, isRemoving, onRemove }: AttachmentRowProps) {
  return (
    <div className="flex items-center gap-3 rounded-lg border p-3">
      <FileText className="size-4 shrink-0 text-muted-foreground" />

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium">{attachment.fileName}</p>
        <p className="text-xs text-muted-foreground">
          {formatFileSize(attachment.sizeBytes)} - enviado em {formatDateTime(attachment.createdAt)}
        </p>
      </div>

      <Button
        size="sm"
        variant="outline"
        render={<a href={attachment.downloadUrl} target="_blank" rel="noreferrer" />}
      >
        <Download className="size-4" />
        Baixar
      </Button>

      <Button
        size="sm"
        variant="ghost"
        disabled={isRemoving}
        onClick={() => onRemove(attachment.id)}
      >
        <Trash2 className="size-4" />
      </Button>
    </div>
  )
}
