export const APP_ROUTES = {
  home: "/",
  signIn: "/entrar",
  signUp: "/cadastro",
  dashboard: "/painel",
  resumes: "/curriculos",
  resumeEditor: (id: string) => `/curriculos/${id}`,
  assessments: "/testes",
  assessment: (slug: string) => `/testes/${slug}`,
  guides: "/guias",
  guide: (slug: string) => `/guias/${slug}`,
} as const

export const RESUME_EDITOR_ROUTE = "/curriculos/:id"
export const ASSESSMENT_ROUTE = "/testes/:slug"
export const GUIDE_ROUTE = "/guias/:slug"
export const NEW_RESUME_ID = "novo"
