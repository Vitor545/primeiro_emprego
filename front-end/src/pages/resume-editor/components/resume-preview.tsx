import type { ResumeContent } from "@/types/resume"

interface ResumePreviewProps {
  content: ResumeContent
}

const contactLine = (content: ResumeContent) =>
  [content.email, content.phone, content.city, content.linkedin].filter(Boolean).join(" | ")

export function ResumePreview({ content }: ResumePreviewProps) {
  return (
    <article
      id="resume-preview"
      className="space-y-5 rounded-lg border bg-white p-8 text-sm text-neutral-900 print:border-0 print:p-0"
    >
      <header className="space-y-1 border-b border-neutral-300 pb-3">
        <h2 className="text-xl font-semibold">{content.fullName || "Seu nome"}</h2>
        <p className="text-neutral-700">{content.role || "Cargo desejado"}</p>
        <p className="text-xs text-neutral-600">{contactLine(content)}</p>
      </header>

      {content.summary && (
        <section className="space-y-1">
          <h3 className="text-xs font-semibold tracking-widest uppercase">Resumo</h3>
          <p className="leading-relaxed text-neutral-800">{content.summary}</p>
        </section>
      )}

      {content.education.length > 0 && (
        <section className="space-y-2">
          <h3 className="text-xs font-semibold tracking-widest uppercase">Formacao</h3>
          {content.education.map((item, index) => (
            <div key={`${item.institution}-${index}`}>
              <p className="font-medium">{item.course}</p>
              <p className="text-neutral-700">
                {item.institution} | {item.startDate}
                {item.endDate ? ` - ${item.endDate}` : ""}
              </p>
            </div>
          ))}
        </section>
      )}

      {content.experiences.length > 0 && (
        <section className="space-y-2">
          <h3 className="text-xs font-semibold tracking-widest uppercase">Experiencia</h3>
          {content.experiences.map((item, index) => (
            <div key={`${item.company}-${index}`} className="space-y-0.5">
              <p className="font-medium">
                {item.role} - {item.company}
              </p>
              <p className="text-xs text-neutral-600">
                {item.startDate}
                {item.endDate ? ` - ${item.endDate}` : ""}
              </p>
              {item.description && <p className="text-neutral-800">{item.description}</p>}
            </div>
          ))}
        </section>
      )}

      {content.skills.length > 0 && (
        <section className="space-y-1">
          <h3 className="text-xs font-semibold tracking-widest uppercase">Competencias</h3>
          <p className="text-neutral-800">{content.skills.join(", ")}</p>
        </section>
      )}

      {content.languages.length > 0 && (
        <section className="space-y-1">
          <h3 className="text-xs font-semibold tracking-widest uppercase">Idiomas</h3>
          <p className="text-neutral-800">{content.languages.join(", ")}</p>
        </section>
      )}
    </article>
  )
}
