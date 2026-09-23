type UnauthorizedHandler = () => void

let handler: UnauthorizedHandler | null = null

export const setUnauthorizedHandler = (fn: UnauthorizedHandler | null) => {
  handler = fn
}

export const notifyUnauthorized = () => handler?.()
