/**
 * Отправка ответов в Google Forms без iframe (свой визуал на сайте).
 *
 * Форма: https://docs.google.com/forms/d/e/1FAIpQLSfZTLprZB0J-NekUTWJ4mEBGj8wQAOzWGdfj5TuIhPTWmoBaw/viewform
 */
export const GOOGLE_FORM_ID = '1FAIpQLSfZTLprZB0J-NekUTWJ4mEBGj8wQAOzWGdfj5TuIhPTWmoBaw'

export const GOOGLE_FORM_ACTION = `https://docs.google.com/forms/d/e/${GOOGLE_FORM_ID}/formResponse`

/** Вопрос «kto» (один из списка) — из предзаполненной ссылки. */
export const GOOGLE_FORM_ENTRY_MAIN = 'entry.1948700978'

/**
 * Вопрос «Фамилия и имя» — из предзаполненной ссылки.
 * Переопределение: VITE_GOOGLE_FORM_ENTRY_GUEST_NAMES в .env.local
 */
export const GOOGLE_FORM_ENTRY_GUEST_NAMES: string =
  (typeof import.meta.env.VITE_GOOGLE_FORM_ENTRY_GUEST_NAMES === 'string' &&
    import.meta.env.VITE_GOOGLE_FORM_ENTRY_GUEST_NAMES.trim()) ||
  'entry.739248126'

export function buildGoogleFormBody(attendance: string, guestNames: string): URLSearchParams {
  const params = new URLSearchParams()
  const names = guestNames.trim()

  params.append(GOOGLE_FORM_ENTRY_MAIN, attendance)
  params.append(GOOGLE_FORM_ENTRY_GUEST_NAMES, names)
  params.append('submit', 'Submit')
  return params
}
