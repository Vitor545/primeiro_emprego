import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

import { QUERY_KEYS } from "@/constants/query-keys"
import { getApiErrorMessage } from "@/lib/get-api-error-message"
import { attachmentsService } from "@/services/attachments.service"

export const useAttachments = () => {
  const queryClient = useQueryClient()

  const { data: status } = useQuery({
    queryKey: QUERY_KEYS.storageStatus,
    queryFn: attachmentsService.status,
    staleTime: Infinity,
  })

  const isStorageEnabled = status?.enabled ?? false

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: QUERY_KEYS.attachments,
    queryFn: attachmentsService.list,
    enabled: isStorageEnabled,
  })

  const invalidate = () => queryClient.invalidateQueries({ queryKey: QUERY_KEYS.attachments })

  const uploadMutation = useMutation({
    mutationFn: attachmentsService.upload,
    onSuccess: () => {
      toast.success("Documento enviado")
      invalidate()
    },
    onError: (error) => toast.error(getApiErrorMessage(error)),
  })

  const removeMutation = useMutation({
    mutationFn: attachmentsService.remove,
    onSuccess: () => {
      toast.success("Documento removido")
      invalidate()
    },
    onError: (error) => toast.error(getApiErrorMessage(error)),
  })

  return {
    isStorageEnabled,
    attachments: data ?? [],
    isLoading: isStorageEnabled && isLoading,
    isError,
    refetch,
    isUploading: uploadMutation.isPending,
    isRemoving: removeMutation.isPending,
    onUpload: (file: File) => uploadMutation.mutate(file),
    onRemove: (id: string) => removeMutation.mutate(id),
  }
}
