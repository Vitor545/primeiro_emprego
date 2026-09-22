import type { ComponentProps } from "react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface TextFieldProps extends ComponentProps<typeof Input> {
  label: string
  error?: string
}

export function TextField({ label, error, id, ...props }: TextFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} {...props} />
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  )
}
