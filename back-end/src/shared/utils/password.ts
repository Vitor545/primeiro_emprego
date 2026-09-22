import { randomBytes, scrypt, timingSafeEqual } from "node:crypto"
import { promisify } from "node:util"

const scryptAsync = promisify(scrypt)
const KEY_LENGTH = 64

export const hashPassword = async (password: string) => {
  const salt = randomBytes(16).toString("hex")
  const derived = (await scryptAsync(password, salt, KEY_LENGTH)) as Buffer
  return `${salt}:${derived.toString("hex")}`
}

export const verifyPassword = async (password: string, storedHash: string) => {
  const [salt, hash] = storedHash.split(":")
  if (!salt || !hash) return false

  const derived = (await scryptAsync(password, salt, KEY_LENGTH)) as Buffer
  const expected = Buffer.from(hash, "hex")

  return expected.length === derived.length && timingSafeEqual(expected, derived)
}
