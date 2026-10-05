/** Normalize user-entered directory text without changing legal internal spaces. */
export function normalizeDirectoryInput(input: string): string {
  if (typeof input !== 'string') throw new TypeError('目录路径必须是文本。')
  if (hasControlCharacter(input)) throw new Error('目录路径不能包含换行或控制字符。')
  let value = input.trim()
  if (!value) return ''

  const first = value[0]
  const last = value[value.length - 1]
  const startsQuoted = first === '"'
  const endsQuoted = last === '"'
  if (startsQuoted || endsQuoted) {
    if (!startsQuoted || first !== last) throw new Error('目录路径的首尾引号不匹配。')
    value = value.slice(1, -1).trim()
  }
  if (hasControlCharacter(value)) throw new Error('目录路径不能包含换行或控制字符。')
  if (value.includes('"')) throw new Error('目录路径包含未配对的引号。')
  return value
}

function hasControlCharacter(value: string): boolean {
  return /[\u0000-\u001f\u007f-\u009f]/u.test(value)
}
