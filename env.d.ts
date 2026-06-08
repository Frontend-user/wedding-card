/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Например `entry.1234567890` — поле «ФИО» в Google Forms (см. предзаполненную ссылку). */
  readonly VITE_GOOGLE_FORM_ENTRY_GUEST_NAMES?: string
}
