import { astraKnowledge, astraFallback } from '../data/astra'

// normaliza texto: minúsculas, sem acento, sem pontuação
const normalize = (s) =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s]/g, ' ')
    .trim()

// Responde a uma pergunta casando palavras-chave da base de conhecimento.
// Pontua cada entrada pelo nº de keywords encontradas; devolve a melhor.
//
// NOTA: quando houver Anthropic API, basta trocar esta função por uma
// chamada assíncrona ao endpoint — a interface do chat não muda.
export function askAstra(question) {
  const q = normalize(question)
  if (!q) return astraFallback

  let best = null
  let bestScore = 0

  for (const entry of astraKnowledge) {
    let score = 0
    for (const kw of entry.keywords) {
      if (q.includes(normalize(kw))) score += 1
    }
    if (score > bestScore) {
      bestScore = score
      best = entry
    }
  }

  return best ? best.answer : astraFallback
}
