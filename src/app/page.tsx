'use client'

import { useEffect, useState } from 'react'
import ProductPortal from '@/components/ProductPortal'
import type { Language } from '@/lib/i18n'

const languageKey = 'ever-new-language'

export default function PortalPage() {
  const [lang, setLang] = useState<Language>('zh')

  useEffect(() => {
    const saved = window.localStorage.getItem(languageKey)
    if (saved === 'zh' || saved === 'en') setLang(saved)
  }, [])

  const changeLanguage = (nextLanguage: Language) => {
    setLang(nextLanguage)
    window.localStorage.setItem(languageKey, nextLanguage)
  }

  const openReader = () => {
    window.location.assign('https://reader.deline.top/')
  }

  return <ProductPortal lang={lang} onEnterReader={openReader} onLanguageChange={changeLanguage} />
}
