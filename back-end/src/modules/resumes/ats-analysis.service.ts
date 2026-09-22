import type { AtsAnalysis, AtsCheck, ResumeContent } from "./resumes.types.js"

const MIN_SUMMARY_WORDS = 25
const MIN_SKILLS = 5

const countWords = (text: string) => text.trim().split(/\s+/).filter(Boolean).length

const rules: Array<{ id: string; label: string; hint: string; passed: (c: ResumeContent) => boolean }> = [
  {
    id: "contact",
    label: "Dados de contato completos",
    hint: "Preencha e-mail, telefone e cidade para que o recrutador consiga te localizar.",
    passed: (content) => Boolean(content.email && content.phone && content.city),
  },
  {
    id: "role",
    label: "Cargo desejado declarado",
    hint: "O ATS compara o titulo do curriculo com o titulo da vaga.",
    passed: (content) => content.role.trim().length > 0,
  },
  {
    id: "summary",
    label: "Resumo profissional objetivo",
    hint: `Escreva ao menos ${MIN_SUMMARY_WORDS} palavras descrevendo objetivo e area de interesse.`,
    passed: (content) => countWords(content.summary) >= MIN_SUMMARY_WORDS,
  },
  {
    id: "education",
    label: "Formacao academica informada",
    hint: "Inclua ao menos uma formacao com instituicao, curso e periodo.",
    passed: (content) => content.education.length > 0,
  },
  {
    id: "skills",
    label: "Palavras-chave tecnicas",
    hint: `Liste ao menos ${MIN_SKILLS} competencias usando os termos que aparecem na vaga.`,
    passed: (content) => content.skills.length >= MIN_SKILLS,
  },
  {
    id: "languages",
    label: "Idiomas informados",
    hint: "Informe o nivel de cada idioma, mesmo que seja basico.",
    passed: (content) => content.languages.length > 0,
  },
  {
    id: "linkedin",
    label: "Perfil profissional online",
    hint: "Adicione o LinkedIn ou portfolio para complementar a triagem.",
    passed: (content) => content.linkedin.trim().length > 0,
  },
]

export const atsAnalysisService = {
  analyze(content: ResumeContent): AtsAnalysis {
    const checks: AtsCheck[] = rules.map(({ id, label, hint, passed }) => ({
      id,
      label,
      hint,
      passed: passed(content),
    }))

    const approved = checks.filter((check) => check.passed).length

    return {
      score: Math.round((approved / checks.length) * 100),
      checks,
    }
  },
}
