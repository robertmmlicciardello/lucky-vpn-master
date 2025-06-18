
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Translation resources
const resources = {
  en: {
    translation: {
      // Navigation
      "nav.dashboard": "Dashboard",
      "nav.servers": "Servers",
      "nav.users": "Users",
      "nav.ads": "Ads",
      "nav.plans": "Plans",
      "nav.rewards": "Rewards",
      "nav.notifications": "Notifications",
      "nav.support": "Support",
      "nav.blog": "Blog",
      "nav.leaderboard": "Leaderboard",
      "nav.payments": "Payments",
      "nav.settings": "Settings",
      
      // Common
      "common.login": "Login",
      "common.logout": "Logout",
      "common.save": "Save",
      "common.cancel": "Cancel",
      "common.delete": "Delete",
      "common.edit": "Edit",
      "common.add": "Add",
      "common.search": "Search",
      "common.loading": "Loading...",
      "common.error": "Error",
      "common.success": "Success",
      
      // Admin Panel
      "admin.title": "Admin Panel",
      "admin.welcome": "Welcome to Lucky VPN Master Admin Panel",
      "admin.username": "Username",
      "admin.password": "Password",
      "admin.loginButton": "Login",
      "admin.loginSuccess": "Login Successful",
      "admin.loginFailed": "Login Failed",
      "admin.invalidCredentials": "Invalid username or password",
      
      // VPN
      "vpn.connected": "CONNECTED",
      "vpn.disconnected": "DISCONNECTED",
      "vpn.connecting": "CONNECTING",
      "vpn.connect": "CONNECT",
      "vpn.disconnect": "DISCONNECT",
      "vpn.freeServers": "Free Servers",
      "vpn.premiumServers": "Premium Servers",
      
      // User Management
      "users.title": "User Management",
      "users.totalUsers": "Total Users",
      "users.activeUsers": "Active Users",
      "users.premiumUsers": "Premium Users",
      
      // Servers
      "servers.title": "Server Management",
      "servers.totalServers": "Total Servers",
      "servers.onlineServers": "Online Servers",
      "servers.serverLoad": "Load: {{load}}%",
      "servers.serverPing": "Ping: {{ping}}",
      
      // Rewards
      "rewards.title": "Rewards System",
      "rewards.dailyCheckin": "Daily Check-in",
      "rewards.watchAd": "Watch Video",
      "rewards.luckyWheel": "Lucky Wheel",
      "rewards.points": "{{points}} Points"
    }
  },
  my: {
    translation: {
      // Navigation
      "nav.dashboard": "ခြုံငုံကြည့်",
      "nav.servers": "ဆာဗာများ",
      "nav.users": "အသုံးပြုသူများ",
      "nav.ads": "ကြော်ငြာများ",
      "nav.plans": "အစီအစဉ်များ",
      "nav.rewards": "ဆုများ",
      "nav.notifications": "အကြောင်းကြားချက်များ",
      "nav.support": "အကူအညီ",
      "nav.blog": "ဘလော့",
      "nav.leaderboard": "ထိပ်တန်းစာရင်း",
      "nav.payments": "ငွေပေးချေမှုများ",
      "nav.settings": "ဆက်တင်များ",
      
      // Common
      "common.login": "လော့ဂ်အင်",
      "common.logout": "ထွက်ရန်",
      "common.save": "သိမ်းရန်",
      "common.cancel": "ပယ်ဖျက်ရန်",
      "common.delete": "ဖျက်ရန်",
      "common.edit": "တည်းဖြတ်ရန်",
      "common.add": "ထည့်ရန်",
      "common.search": "ရှာရန်",
      "common.loading": "စောင့်ပါ...",
      "common.error": "အမှား",
      "common.success": "အောင်မြင်",
      
      // Admin Panel
      "admin.title": "စီမံခန့်ခွဲမှုစနစ်",
      "admin.welcome": "Lucky VPN Master စီမံခန့်ခွဲမှုစနစ်သို့ ကြိုဆိုပါသည်",
      "admin.username": "အသုံးပြုသူအမည်",
      "admin.password": "လျှို့ဝှက်စကားဝှက်",
      "admin.loginButton": "ဝင်ရောက်ရန်",
      "admin.loginSuccess": "အောင်မြင်စွာ ဝင်ရောက်ပြီး",
      "admin.loginFailed": "ဝင်ရောက်မှု မအောင်မြင်ပါ",
      "admin.invalidCredentials": "အမည် သို့မဟုတ် စကားဝှက် မမှန်ကန်ပါ",
      
      // VPN
      "vpn.connected": "ချိတ်ဆက်ပြီး",
      "vpn.disconnected": "ချိတ်ဆက်မှုပြတ်",
      "vpn.connecting": "ချိတ်ဆက်နေ",
      "vpn.connect": "ချိတ်ဆက်ရန်",
      "vpn.disconnect": "ချိတ်ဆက်မှုဖြုတ်ရန်",
      "vpn.freeServers": "အခမဲ့ဆာဗာများ",
      "vpn.premiumServers": "ပရီမီယံဆာဗာများ",
      
      // User Management
      "users.title": "အသုံးပြုသူ စီမံခန့်ခွဲမှု",
      "users.totalUsers": "စုစုပေါင်း အသုံးပြုသူများ",
      "users.activeUsers": "လှုပ်ရှားနေသော အသုံးပြုသူများ",
      "users.premiumUsers": "ပရီမီယံ အသုံးပြုသူများ",
      
      // Servers
      "servers.title": "ဆာဗာ စီမံခန့်ခွဲမှု",
      "servers.totalServers": "စုစုပေါင်း ဆာဗာများ",
      "servers.onlineServers": "အွန်လိုင်း ဆာဗာများ",
      "servers.serverLoad": "ဝန်: {{load}}%",
      "servers.serverPing": "ပင်: {{ping}}",
      
      // Rewards
      "rewards.title": "ဆုလပ်စနစ်",
      "rewards.dailyCheckin": "နေ့စဉ် စစ်ဆေးခြင်း",
      "rewards.watchAd": "ဗီဒီယို ကြည့်ရန်",
      "rewards.luckyWheel": "ကံကောင်း ဘီး",
      "rewards.points": "{{points}} မှတ်"
    }
  },
  zh: {
    translation: {
      // Navigation
      "nav.dashboard": "仪表板",
      "nav.servers": "服务器",
      "nav.users": "用户",
      "nav.ads": "广告",
      "nav.plans": "计划",
      "nav.rewards": "奖励",
      "nav.notifications": "通知",
      "nav.support": "支持",
      "nav.blog": "博客",
      "nav.leaderboard": "排行榜",
      "nav.payments": "付款",
      "nav.settings": "设置",
      
      // Common
      "common.login": "登录",
      "common.logout": "登出",
      "common.save": "保存",
      "common.cancel": "取消",
      "common.delete": "删除",
      "common.edit": "编辑",
      "common.add": "添加",
      "common.search": "搜索",
      "common.loading": "加载中...",
      "common.error": "错误",
      "common.success": "成功",
      
      // Admin Panel
      "admin.title": "管理面板",
      "admin.welcome": "欢迎使用 Lucky VPN Master 管理面板",
      "admin.username": "用户名",
      "admin.password": "密码",
      "admin.loginButton": "登录",
      "admin.loginSuccess": "登录成功",
      "admin.loginFailed": "登录失败",
      "admin.invalidCredentials": "用户名或密码无效"
    }
  },
  es: {
    translation: {
      // Navigation
      "nav.dashboard": "Panel de Control",
      "nav.servers": "Servidores",
      "nav.users": "Usuarios",
      "nav.ads": "Anuncios",
      "nav.plans": "Planes",
      "nav.rewards": "Recompensas",
      "nav.notifications": "Notificaciones",
      "nav.support": "Soporte",
      "nav.blog": "Blog",
      "nav.leaderboard": "Clasificación",
      "nav.payments": "Pagos",
      "nav.settings": "Configuración",
      
      // Common
      "common.login": "Iniciar Sesión",
      "common.logout": "Cerrar Sesión",
      "common.save": "Guardar",
      "common.cancel": "Cancelar",
      "common.delete": "Eliminar",
      "common.edit": "Editar",
      "common.add": "Agregar",
      "common.search": "Buscar",
      "common.loading": "Cargando...",
      "common.error": "Error",
      "common.success": "Éxito"
    }
  },
  fr: {
    translation: {
      // Navigation
      "nav.dashboard": "Tableau de Bord",
      "nav.servers": "Serveurs",
      "nav.users": "Utilisateurs",
      "nav.ads": "Publicités",
      "nav.plans": "Plans",
      "nav.rewards": "Récompenses",
      "nav.notifications": "Notifications",
      "nav.support": "Support",
      "nav.blog": "Blog",
      "nav.leaderboard": "Classement",
      "nav.payments": "Paiements",
      "nav.settings": "Paramètres",
      
      // Common
      "common.login": "Connexion",
      "common.logout": "Déconnexion",
      "common.save": "Enregistrer",
      "common.cancel": "Annuler",
      "common.delete": "Supprimer",
      "common.edit": "Modifier",
      "common.add": "Ajouter",
      "common.search": "Rechercher",
      "common.loading": "Chargement...",
      "common.error": "Erreur",
      "common.success": "Succès"
    }
  },
  ar: {
    translation: {
      // Navigation
      "nav.dashboard": "لوحة التحكم",
      "nav.servers": "الخوادم",
      "nav.users": "المستخدمون",
      "nav.ads": "الإعلانات",
      "nav.plans": "الخطط",
      "nav.rewards": "المكافآت",
      "nav.notifications": "الإشعارات",
      "nav.support": "الدعم",
      "nav.blog": "المدونة",
      "nav.leaderboard": "لوحة المتصدرين",
      "nav.payments": "المدفوعات",
      "nav.settings": "الإعدادات",
      
      // Common
      "common.login": "تسجيل الدخول",
      "common.logout": "تسجيل الخروج",
      "common.save": "حفظ",
      "common.cancel": "إلغاء",
      "common.delete": "حذف",
      "common.edit": "تعديل",
      "common.add": "إضافة",
      "common.search": "بحث",
      "common.loading": "جاري التحميل...",
      "common.error": "خطأ",
      "common.success": "نجح"
    }
  },
  hi: {
    translation: {
      // Navigation
      "nav.dashboard": "डैशबोर्ड",
      "nav.servers": "सर्वर",
      "nav.users": "उपयोगकर्ता",
      "nav.ads": "विज्ञापन",
      "nav.plans": "योजनाएं",
      "nav.rewards": "पुरस्कार",
      "nav.notifications": "सूचनाएं",
      "nav.support": "समर्थन",
      "nav.blog": "ब्लॉग",
      "nav.leaderboard": "लीडरबोर्ड",
      "nav.payments": "भुगतान",
      "nav.settings": "सेटिंग्स",
      
      // Common
      "common.login": "लॉगिन",
      "common.logout": "लॉगआउट",
      "common.save": "सेव",
      "common.cancel": "रद्द करें",
      "common.delete": "हटाएं",
      "common.edit": "संपादित करें",
      "common.add": "जोड़ें",
      "common.search": "खोजें",
      "common.loading": "लोड हो रहा है...",
      "common.error": "त्रुटि",
      "common.success": "सफलता"
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: false,
    
    interpolation: {
      escapeValue: false
    },
    
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage']
    }
  });

export default i18n;
