import React, { createContext, useState, useContext, useEffect, ReactNode } from "react";

// Define languages and their codes
export type LanguageCode = "en" | "es" | "fr" | "de" | "zh" | "ja" | "ko" | "ru";

export interface Language {
  code: LanguageCode;
  name: string;
}

// Available languages
export const LANGUAGES: Language[] = [
  { code: "en", name: "English" },
  { code: "es", name: "Spanish" },
  { code: "fr", name: "French" },
  { code: "de", name: "German" },
  { code: "zh", name: "Chinese" },
  { code: "ja", name: "Japanese" },
  { code: "ko", name: "Korean" },
  { code: "ru", name: "Russian" },
];

// Define translations interface
export interface Translations {
  [key: string]: string;
}

// Context interface
interface LanguageContextType {
  currentLanguage: Language;
  setLanguage: (code: LanguageCode) => void;
  t: (key: string) => string;
  isRtl: boolean;
}

// Create context
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Sample translations - in a real app, these would be loaded from JSON files or an API
const translations: Record<LanguageCode, Translations> = {
  en: {
    "nav.features": "Features",
    "nav.pricing": "Pricing",
    "nav.about": "About",
    "nav.contact": "Contact",
    "nav.login": "Login",
    "nav.signup": "Sign Up",
    "hero.title": "Maximize Profits with",
    "hero.subtitle": "Cross-Exchange Arbitrage",
    "hero.tagline": "Automated · Secure · Real-Time",
    "hero.description": "Discover untapped profit opportunities between crypto exchanges with our advanced arbitrage platform. Our intelligent algorithms analyze price discrepancies across 30+ exchanges in real-time, executing trades automatically to capture gains others miss.",
    "hero.cta": "Start Automated Arbitrage Trading",
    "hero.scroll": "Scroll to explore",
    "metrics.exchanges": "Exchanges",
    "metrics.execution": "Execution Time",
    "metrics.monitoring": "Monitoring",
    "about.title": "About CryptoArb",
    "about.subtitle": "We're revolutionizing cryptocurrency arbitrage with advanced technology and a dedication to trader success.",
    "about.mission.title": "Our Mission",
    "about.mission.text": "We built CryptoArb to democratize cryptocurrency arbitrage trading, making sophisticated strategies accessible to traders of all experience levels. Our platform eliminates technical barriers and provides the tools needed to capitalize on market inefficiencies across exchanges.",
    "about.approach.title": "Our Approach",
    "about.approach.text": "Using advanced algorithms and real-time data analysis, we identify profitable arbitrage opportunities faster than traditional methods. Our automated execution system ensures you never miss out on potential gains, even in rapidly changing market conditions.",
    "about.stats.users": "Active Users",
    "about.stats.volume": "Volume/Month",
    "about.stats.experience": "Years Experience",
    "about.stats.exchanges": "Exchanges",
    "about.image.alt": "Cryptocurrency trading dashboard",
    "about.image.title": "Built by traders, for traders",
    "about.image.text": "Our team combines decades of experience in cryptocurrency markets, trading algorithms, and financial technology.",
    "testimonials.title": "What Our Users Say",
    "testimonials.quotes.1": "CryptoArb has transformed our trading strategy. The automated systems have consistently identified opportunities we would have missed, resulting in a significant increase in our portfolio's performance.",
    "testimonials.names.1": "Alex Chen",
    "testimonials.titles.1": "Professional Crypto Trader",
    "testimonials.quotes.2": "The ability to simultaneously monitor price differentials across 30+ exchanges has been game-changing for my arbitrage strategy. I've seen a 12% increase in monthly returns since using this platform.",
    "testimonials.names.2": "Sarah Johnson",
    "testimonials.titles.2": "Portfolio Manager",
    "testimonials.quotes.3": "As someone who trades across multiple time zones, the automated execution feature has been invaluable. I can set my parameters and let the system work while I'm asleep, knowing it will capitalize on opportunities 24/7.",
    "testimonials.names.3": "Michael Torres",
    "testimonials.titles.3": "Cryptocurrency Analyst",
    "testimonials.quotes.4": "The risk management tools are what set CryptoArb apart. I can define strict parameters to protect my capital while still capturing profitable trades. That peace of mind is worth every penny.",
    "testimonials.names.4": "Emma Zhang",
    "testimonials.titles.4": "Institutional Trader",
    "footer.about": "Advanced cryptocurrency arbitrage platform for traders seeking to maximize their profits through automated strategies and real-time market analysis.",
    "footer.product": "Product",
    "footer.resources": "Resources",
    "footer.company": "Company",
    "footer.subscribe": "Stay Updated",
    "footer.subscribe.desc": "Subscribe to our newsletter for the latest updates and arbitrage insights.",
    "footer.copyright": "All rights reserved.",
    "footer.privacy": "Privacy Policy",
    "footer.terms": "Terms of Service",
    "footer.contact": "Contact"
  },
  es: {
    "nav.features": "Características",
    "nav.pricing": "Precios",
    "nav.about": "Nosotros",
    "nav.contact": "Contacto",
    "nav.login": "Iniciar Sesión",
    "nav.signup": "Registrarse",
    "hero.title": "Maximiza Ganancias con",
    "hero.subtitle": "Arbitraje Entre Exchanges",
    "hero.tagline": "Automatizado · Seguro · Tiempo Real",
    "hero.description": "Descubre oportunidades de ganancia inexploradas entre exchanges de criptomonedas con nuestra plataforma avanzada de arbitraje. Nuestros algoritmos inteligentes analizan diferencias de precios en más de 30 exchanges en tiempo real, ejecutando operaciones automáticamente para capturar ganancias que otros pierden.",
    "hero.cta": "Comenzar Trading de Arbitraje Automatizado",
    "hero.scroll": "Desplázate para explorar",
    "metrics.exchanges": "Exchanges",
    "metrics.execution": "Tiempo de Ejecución",
    "metrics.monitoring": "Monitoreo",
    "about.title": "Sobre CryptoArb",
    "about.subtitle": "Estamos revolucionando el arbitraje de criptomonedas con tecnología avanzada y dedicación al éxito de los traders.",
    "about.mission.title": "Nuestra Misión",
    "about.mission.text": "Construimos CryptoArb para democratizar el trading de arbitraje de criptomonedas, haciendo estrategias sofisticadas accesibles a traders de todos los niveles de experiencia. Nuestra plataforma elimina barreras técnicas y proporciona las herramientas necesarias para capitalizar ineficiencias del mercado entre exchanges.",
    "about.approach.title": "Nuestro Enfoque",
    "about.approach.text": "Utilizando algoritmos avanzados y análisis de datos en tiempo real, identificamos oportunidades de arbitraje rentables más rápido que los métodos tradicionales. Nuestro sistema de ejecución automatizada asegura que nunca pierdas potenciales ganancias, incluso en condiciones de mercado rápidamente cambiantes.",
    "about.stats.users": "Usuarios Activos",
    "about.stats.volume": "Volumen/Mes",
    "about.stats.experience": "Años de Experiencia",
    "about.stats.exchanges": "Exchanges",
    "about.image.alt": "Panel de trading de criptomonedas",
    "about.image.title": "Construido por traders, para traders",
    "about.image.text": "Nuestro equipo combina décadas de experiencia en mercados de criptomonedas, algoritmos de trading y tecnología financiera.",
    "testimonials.title": "Lo Que Dicen Nuestros Usuarios",
    "testimonials.quotes.1": "CryptoArb ha transformado nuestra estrategia de trading. Los sistemas automatizados han identificado consistentemente oportunidades que habríamos perdido, resultando en un aumento significativo en el rendimiento de nuestra cartera.",
    "testimonials.names.1": "Alex Chen",
    "testimonials.titles.1": "Trader Profesional de Criptomonedas",
    "testimonials.quotes.2": "La capacidad de monitorear simultáneamente diferenciales de precios en más de 30 exchanges ha sido revolucionaria para mi estrategia de arbitraje. He visto un aumento del 12% en los rendimientos mensuales desde que uso esta plataforma.",
    "testimonials.names.2": "Sarah Johnson",
    "testimonials.titles.2": "Gestora de Cartera",
    "testimonials.quotes.3": "Como alguien que opera en múltiples zonas horarias, la función de ejecución automatizada ha sido invaluable. Puedo establecer mis parámetros y dejar que el sistema trabaje mientras duermo, sabiendo que capitalizará oportunidades 24/7.",
    "testimonials.names.3": "Michael Torres",
    "testimonials.titles.3": "Analista de Criptomonedas",
    "testimonials.quotes.4": "Las herramientas de gestión de riesgos son lo que distingue a CryptoArb. Puedo definir parámetros estrictos para proteger mi capital mientras capturo operaciones rentables. Esa tranquilidad vale cada centavo.",
    "testimonials.names.4": "Emma Zhang",
    "testimonials.titles.4": "Trader Institucional",
    "footer.about": "Plataforma avanzada de arbitraje de criptomonedas para operadores que buscan maximizar sus beneficios mediante estrategias automatizadas y análisis de mercado en tiempo real.",
    "footer.product": "Producto",
    "footer.resources": "Recursos",
    "footer.company": "Empresa",
    "footer.subscribe": "Mantente Actualizado",
    "footer.subscribe.desc": "Suscríbete a nuestro boletín para recibir las últimas actualizaciones y conocimientos sobre arbitraje.",
    "footer.copyright": "Todos los derechos reservados.",
    "footer.privacy": "Política de Privacidad",
    "footer.terms": "Términos de Servicio",
    "footer.contact": "Contacto"
  },
  fr: {
    "nav.features": "Fonctionnalités",
    "nav.pricing": "Tarifs",
    "nav.about": "À Propos",
    "nav.contact": "Contact",
    "nav.login": "Se Connecter",
    "nav.signup": "S'inscrire",
    "hero.title": "Maximisez vos profits avec",
    "hero.subtitle": "L'Arbitrage Inter-Exchanges",
    "hero.tagline": "Automatisé · Sécurisé · Temps Réel",
    "hero.cta": "Commencer l'Arbitrage Automatisé",
    "hero.scroll": "Défiler pour explorer",
    "about.title": "À Propos de CryptoArb",
    "testimonials.title": "Ce Que Disent Nos Utilisateurs",
    "footer.copyright": "Tous droits réservés.",
    "footer.privacy": "Politique de Confidentialité",
    "footer.terms": "Conditions d'Utilisation",
    "footer.contact": "Contact"
  },
  de: {
    "nav.features": "Funktionen",
    "nav.pricing": "Preise",
    "nav.about": "Über Uns",
    "nav.contact": "Kontakt",
    "nav.login": "Anmelden",
    "nav.signup": "Registrieren",
    "hero.title": "Maximieren Sie Gewinne mit",
    "hero.subtitle": "Cross-Exchange-Arbitrage",
    "hero.cta": "Starten Sie automatisierten Arbitragehandel",
    "footer.copyright": "Alle Rechte vorbehalten.",
    "footer.privacy": "Datenschutzrichtlinie",
    "footer.terms": "Nutzungsbedingungen",
    "footer.contact": "Kontakt"
  },
  zh: {
    "nav.features": "功能",
    "nav.pricing": "价格",
    "nav.about": "关于我们",
    "nav.contact": "联系我们",
    "nav.login": "登录",
    "nav.signup": "注册",
    "hero.title": "通过跨交易所套利",
    "hero.subtitle": "最大化利润",
    "hero.cta": "开始自动套利交易",
    "footer.copyright": "版权所有",
    "footer.privacy": "隐私政策",
    "footer.terms": "服务条款",
    "footer.contact": "联系我们"
  },
  ja: {
    "nav.features": "機能",
    "nav.pricing": "価格",
    "nav.about": "会社概要",
    "nav.contact": "お問い合わせ",
    "nav.login": "ログイン",
    "nav.signup": "登録",
    "hero.title": "クロス取引所アービトラージで",
    "hero.subtitle": "利益を最大化",
    "hero.cta": "自動アービトラージ取引を開始",
    "footer.copyright": "全著作権所有",
    "footer.privacy": "プライバシーポリシー",
    "footer.terms": "利用規約",
    "footer.contact": "お問い合わせ"
  },
  ko: {
    "nav.features": "기능",
    "nav.pricing": "가격",
    "nav.about": "회사 소개",
    "nav.contact": "문의하기",
    "nav.login": "로그인",
    "nav.signup": "가입하기",
    "hero.title": "크로스 거래소 차익거래로",
    "hero.subtitle": "수익 극대화",
    "hero.cta": "자동 차익거래 시작하기",
    "footer.copyright": "모든 권리 보유",
    "footer.privacy": "개인정보 보호정책",
    "footer.terms": "서비스 약관",
    "footer.contact": "문의하기"
  },
  ru: {
    "nav.features": "Функции",
    "nav.pricing": "Цены",
    "nav.about": "О Нас",
    "nav.contact": "Контакты",
    "nav.login": "Вход",
    "nav.signup": "Регистрация",
    "hero.title": "Максимизируйте прибыль с",
    "hero.subtitle": "Кросс-биржевым арбитражем",
    "hero.cta": "Начать автоматизированную арбитражную торговлю",
    "footer.copyright": "Все права защищены",
    "footer.privacy": "Политика конфиденциальности",
    "footer.terms": "Условия использования",
    "footer.contact": "Контакты"
  }
};

// RTL Languages
const rtlLanguages: LanguageCode[] = [];

// Provider component
interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  // Try to get saved language from local storage or default to browser language
  const getSavedLanguage = (): LanguageCode => {
    if (typeof window !== "undefined") {
      const savedLang = localStorage.getItem("language") as LanguageCode;
      if (savedLang && LANGUAGES.some(lang => lang.code === savedLang)) {
        return savedLang;
      }
      
      // Try to match browser language
      const browserLang = navigator.language.split("-")[0] as LanguageCode;
      if (LANGUAGES.some(lang => lang.code === browserLang)) {
        return browserLang;
      }
    }
    return "en"; // Default to English
  };

  const [currentLang, setCurrentLang] = useState<LanguageCode>(getSavedLanguage());
  
  // Get current language object
  const currentLanguage = LANGUAGES.find(lang => lang.code === currentLang) || LANGUAGES[0];
  
  // Check if language is RTL
  const isRtl = rtlLanguages.includes(currentLang);
  
  // Set language handler
  const setLanguage = (code: LanguageCode) => {
    setCurrentLang(code);
    if (typeof window !== "undefined") {
      localStorage.setItem("language", code);
    }
  };
  
  // Translation function
  const t = (key: string): string => {
    return translations[currentLang]?.[key] || translations.en[key] || key;
  };
  
  // Set document direction based on language
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.dir = isRtl ? "rtl" : "ltr";
      document.documentElement.lang = currentLang;
    }
  }, [currentLang, isRtl]);
  
  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage, t, isRtl }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use the language context
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}; 