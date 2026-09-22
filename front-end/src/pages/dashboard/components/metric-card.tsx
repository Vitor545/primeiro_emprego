import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface MetricCardProps {
  label: string
  value: string
  description: string
}

export function MetricCard({ label, value, description }: MetricCardProps) {
  return (
    <Card>
      <CardHeader className="gap-1">
        <CardDescription>{label}</CardDescription>
        <CardTitle className="text-3xl tabular-nums">{value}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}
