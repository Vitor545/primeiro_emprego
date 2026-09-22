import { httpClient } from "./api/http-client"
import type { Attachment, StorageStatus } from "@/types/attachment"

export const attachmentsService = {
  status: () => httpClient<StorageStatus>("/attachments/status"),

  list: () => httpClient<Attachment[]>("/attachments"),

  upload: (file: File) => {
    const formData = new FormData()
    formData.append("file", file)

    return httpClient<Attachment>("/attachments", { method: "POST", body: formData })
  },

  remove: (id: string) => httpClient<void>(`/attachments/${id}`, { method: "DELETE" }),
}
