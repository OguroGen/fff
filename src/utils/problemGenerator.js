/** 表示用: 3桁以上に千区切りコンマ */
export function formatNumber(n) {
  const num = Number(n)
  if (!Number.isFinite(num)) return String(n)
  return num.toLocaleString('en-US')
}

const CIRCLED = ['①', '②', '③', '④', '⑤']

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

/** n桁乱数。1桁は 2〜9（1 を出さない） */
export function randomNDigit(n) {
  const digits = Math.max(1, Number(n) || 1)
  if (digits === 1) return randomInt(2, 9)
  const min = 10 ** (digits - 1)
  const max = 10 ** digits - 1
  return randomInt(min, max)
}

function circled(index) {
  return CIRCLED[index] || String(index + 1)
}

function generateMultiply(digitsA, digitsB, index) {
  const a = randomNDigit(digitsA)
  const b = randomNDigit(digitsB)
  const answer = a * b
  return {
    type: 'multiply',
    index,
    label: circled(index),
    a,
    b,
    answer,
    questionText: `${circled(index)} ${formatNumber(a)} × ${formatNumber(b)} ＝`,
    answerText: `${circled(index)} ${formatNumber(a)} × ${formatNumber(b)} ＝ ${formatNumber(answer)}`
  }
}

function generateDivide(divisorDigits, quotientDigits, index) {
  const divisor = randomNDigit(divisorDigits)
  const quotient = randomNDigit(quotientDigits)
  const dividend = divisor * quotient
  return {
    type: 'divide',
    index,
    label: circled(index),
    dividend,
    divisor,
    quotient,
    answer: quotient,
    questionText: `${circled(index)} ${formatNumber(dividend)} ÷ ${formatNumber(divisor)} ＝`,
    answerText: `${circled(index)} ${formatNumber(dividend)} ÷ ${formatNumber(divisor)} ＝ ${formatNumber(quotient)}`
  }
}

function generateAbacus(digits, terms, mode, index) {
  const termCount = Math.max(2, Number(terms) || 2)
  const digitCount = Math.max(1, Number(digits) || 1)
  const addOnly = mode === 'add'

  for (let attempt = 0; attempt < 80; attempt++) {
    const list = []
    let running = randomNDigit(digitCount)
    list.push({ value: running, sign: 1 })
    let hasSub = false

    for (let i = 1; i < termCount; i++) {
      if (addOnly) {
        const v = randomNDigit(digitCount)
        running += v
        list.push({ value: v, sign: 1 })
        continue
      }

      const preferSub = Math.random() < 0.45
      if (preferSub) {
        const lo = digitCount === 1 ? 2 : 10 ** (digitCount - 1)
        const hi = Math.min(running, 10 ** digitCount - 1)
        if (hi >= lo) {
          const v = randomInt(lo, hi)
          running -= v
          list.push({ value: v, sign: -1 })
          hasSub = true
          continue
        }
      }

      const v = randomNDigit(digitCount)
      running += v
      list.push({ value: v, sign: 1 })
    }

    if (!addOnly && !hasSub && running > 0) {
      continue
    }

    return {
      type: 'abacus',
      index,
      label: circled(index),
      terms: list,
      answer: running,
      questionText: '',
      answerText: formatNumber(running)
    }
  }

  const fallback = []
  let running = randomNDigit(digitCount)
  fallback.push({ value: running, sign: 1 })
  for (let i = 1; i < termCount; i++) {
    const v = randomNDigit(digitCount)
    running += v
    fallback.push({ value: v, sign: 1 })
  }
  return {
    type: 'abacus',
    index,
    label: circled(index),
    terms: fallback,
    answer: running,
    questionText: '',
    answerText: formatNumber(running)
  }
}

export function generateProblems(settings) {
  const count = Math.min(5, Math.max(1, Number(settings.problemCount) || 1))
  const problems = []
  for (let i = 0; i < count; i++) {
    if (settings.problemType === 'divide') {
      problems.push(
        generateDivide(settings.divDivisorDigits, settings.divQuotientDigits, i)
      )
    } else if (settings.problemType === 'abacus') {
      problems.push(
        generateAbacus(settings.abacusDigits, settings.abacusTerms, settings.abacusMode, i)
      )
    } else {
      problems.push(generateMultiply(settings.mulDigitsA, settings.mulDigitsB, i))
    }
  }
  return problems
}
