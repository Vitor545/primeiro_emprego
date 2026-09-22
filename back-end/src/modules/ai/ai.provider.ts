import OpenAI from "openai"

import { env } from "../../config/env.js"
import { HttpError } from "../../shared/errors/http-error.js"

let client: OpenAI | null = null

const getClient = () => {
  if (!env.ai.enabled) {
    throw new HttpError(503, "Recurso de IA indisponivel: configure OPENAI_API_KEY")
  }

  client ??= new OpenAI({ apiKey: env.ai.apiKey })
  return client
}

const runCompletion = async (body: OpenAI.Chat.ChatCompletionCreateParamsNonStreaming) => {
  try {
    return await getClient().chat.completions.create(body)
  } catch (error) {
    if (error instanceof OpenAI.APIError) {
      const message =
        error.status === 401
          ? "Chave da OpenAI rejeitada pelo provedor. Verifique OPENAI_API_KEY"
          : error.status === 429
            ? "Limite de uso da IA atingido. Tente novamente em instantes"
            : `Falha na chamada a IA: ${error.message}`

      throw new HttpError(error.status === 429 ? 429 : 502, message)
    }

    throw error
  }
}

interface CompletionInput {
  instructions: string
  input: string
  maxTokens?: number
}

export const aiProvider = {
  isEnabled: () => env.ai.enabled,

  model: () => env.ai.model,

  async completeAsJson<TResult>({ instructions, input, maxTokens = 900 }: CompletionInput) {
    const response = await runCompletion({
      model: env.ai.model,
      temperature: 0.4,
      max_tokens: maxTokens,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: instructions },
        { role: "user", content: input },
      ],
    })

    const content = response.choices[0]?.message?.content
    if (!content) throw new HttpError(502, "A IA nao retornou conteudo")

    try {
      return JSON.parse(content) as TResult
    } catch {
      throw new HttpError(502, "A IA retornou um formato inesperado")
    }
  },
}
