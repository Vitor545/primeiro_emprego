import { closeDatabase } from "./connection.js"
import { applyMigrations } from "./migrations.js"
import { resumesRepository } from "../modules/resumes/resumes.repository.js"
import { usersRepository } from "../modules/users/users.repository.js"
import { createId } from "../shared/utils/id.js"
import { hashPassword } from "../shared/utils/password.js"

const DEMO_EMAIL = "demo@primeiroemprego.dev"

const seed = async () => {
  await applyMigrations()

  if (await usersRepository.findByEmail(DEMO_EMAIL)) {
    console.log("Seed ja aplicado.")
    return
  }

  const now = new Date().toISOString()
  const user = await usersRepository.create({
    id: createId(),
    name: "Candidato Demo",
    email: DEMO_EMAIL,
    passwordHash: await hashPassword("demo1234"),
    createdAt: now,
  })

  await resumesRepository.create({
    id: createId(),
    userId: user.id,
    title: "Curriculo para estagio em TI",
    content: {
      fullName: "Candidato Demo",
      role: "Estagiario de Desenvolvimento",
      email: DEMO_EMAIL,
      phone: "(31) 99999-0000",
      city: "Belo Horizonte, MG",
      linkedin: "linkedin.com/in/candidato-demo",
      summary:
        "Estudante de Ciencia da Computacao em busca da primeira oportunidade na area de desenvolvimento de software.",
      education: [
        {
          institution: "Universidade Exemplo",
          course: "Ciencia da Computacao",
          startDate: "2024",
          endDate: "2027",
        },
      ],
      experiences: [],
      skills: ["HTML", "CSS", "JavaScript", "Git"],
      languages: ["Portugues nativo", "Ingles intermediario"],
    },
    createdAt: now,
    updatedAt: now,
  })

  console.log(`Seed aplicado. Login: ${DEMO_EMAIL} / demo1234`)
}

seed()
  .catch((error) => {
    console.error("Falha ao aplicar o seed:", error)
    process.exitCode = 1
  })
  .finally(closeDatabase)
