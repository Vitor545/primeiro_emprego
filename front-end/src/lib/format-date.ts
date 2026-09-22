const dateTimeFormatter = new Intl.DateTimeFormat("pt-BR", {
  dateStyle: "short",
  timeStyle: "short",
})

const dateFormatter = new Intl.DateTimeFormat("pt-BR", { dateStyle: "short" })

export const formatDateTime = (isoDate: string) => dateTimeFormatter.format(new Date(isoDate))

export const formatDate = (isoDate: string) => dateFormatter.format(new Date(isoDate))
