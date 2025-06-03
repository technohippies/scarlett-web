export interface Translations {
  // Header
  decks: string;
  add: string;
  connect: string;
  disconnect: string;
  loading: string;

  // Submit Deck Page
  submitDeck: string;
  createFlashcardDeck: string;
  needBaseSepolia: string;
  networkFaucets: string;
  deckName: string;
  briefDescription: string;
  frontLanguage: string;
  backLanguage: string;
  inputMethod: string;
  manualEntry: string;
  csvUpload: string;
  dropCsvOrClick: string;
  csvFormat: string;
  flashcards: string;
  addCard: string;
  card: string;
  remove: string;
  frontText: string;
  backText: string;
  phoneticGuide: string;
  phoneticGuideOptional: string;
  notesOptional: string;
  submitting: string;
  required: string;
  minimumCardsRequired: string;
  csvFileRequired: string;

  // Homepage
  cobrowseWithScarlett: string;
  languageTutorDescription: string;
  chromeBrowser: string;
  firefoxBrowser: string;
  scarlettSupercoach: string;
  spacedRepetitionDescription: string;
  addFlashcardsToStudy: string;
  addFlashcardsDescription: string;
  viewDecks: string;
  learnPassivelyAcrossWeb: string;
  learnPassivelyDescription: string;
  translateFasterLocally: string;
  translateFasterDescription: string;
  quizYourselfDaily: string;
  quizYourselfDescription: string;
  embedEveryWebpage: string;
  embedEveryWebpageDescription: string;
  blockSitesInFocusMode: string;
  blockSitesDescription: string;
  getVoiceAudioWithTimestamps: string;
  getVoiceAudioDescription: string;
  getVoiceAudioSupport: string;
  evadeCensorship: string;
  evadeCensorshipDescription: string;
  downloadForFree: string;
  installScarlettExtension: string;

  // Languages
  english: string;
  vietnamese: string;
  mandarin: string;
  german: string;
  italian: string;
  portuguese: string;
  russian: string;
  japanese: string;
  korean: string;
}

export const translations: Record<string, Translations> = {
  en: {
    // Header
    decks: "Decks",
    add: "Add",
    connect: "Connect",
    disconnect: "Disconnect",
    loading: "Loading...",

    // Submit Deck Page
    submitDeck: "Submit Deck",
    createFlashcardDeck: "Create flashcard deck for testnet review. You'll need Base Sepolia ETH, which can be acquired freely from",
    needBaseSepolia: "network faucets",
    networkFaucets: "network faucets",
    deckName: "Deck name",
    briefDescription: "Brief description",
    frontLanguage: "Front Language",
    backLanguage: "Back Language",
    inputMethod: "Input Method",
    manualEntry: "✍️ Manual Entry",
    csvUpload: "📄 CSV Upload",
    dropCsvOrClick: "📄 Drop CSV or click to upload",
    csvFormat: "Format: front_text,back_text,front_phonetic_guide,back_phonetic_guide,notes",
    flashcards: "Flashcards",
    addCard: "+ Add Card",
    card: "Card",
    remove: "Remove",
    frontText: "Front text",
    backText: "Back text",
    phoneticGuide: "Phonetic guide",
    phoneticGuideOptional: "Phonetic guide (optional)",
    notesOptional: "Notes (optional)",
    submitting: "Submitting...",
    required: "Required",
    minimumCardsRequired: "Minimum 5 complete cards required",
    csvFileRequired: "CSV file required",

    // Homepage
    cobrowseWithScarlett: "Cobrowse with Scarlett AI extension",
    languageTutorDescription: "Language tutor, lifecoach, friend. Free and open source.",
    chromeBrowser: "Chrome",
    firefoxBrowser: "Firefox",
    scarlettSupercoach: "Scarlett is your supercoach",
    spacedRepetitionDescription: "Spaced repetition, roleplaying, productivity, and more.",
    addFlashcardsToStudy: "Add flashcards to study",
    addFlashcardsDescription: "Add decks of flashcards from other users, or make your own.",
    viewDecks: "View Decks",
    learnPassivelyAcrossWeb: "Learn passively across the web",
    learnPassivelyDescription: "Scarlett replaces the words you're learning on the webpages you visit.",
    translateFasterLocally: "Translate faster, locally",
    translateFasterDescription: "Right click to translate any text, which then adds it to your flashcard deck automatically.",
    quizYourselfDaily: "Quiz yourself daily",
    quizYourselfDescription: "Scarlett generates quiz questions like multiple choice to test your knowledge.",
    embedEveryWebpage: "Embed every webpage you visit",
    embedEveryWebpageDescription: "Scarlett queues, summarizes, and embeds every page you visit. She knows you better than you know yourself.",
    blockSitesInFocusMode: "Block sites during \"Focus Mode\"",
    blockSitesDescription: "Find yourself visiting porn sites or social media habitually? Enable focus mode to redirect to your flashcards instead.",
    getVoiceAudioWithTimestamps: "Get voice audio with timestamps",
    getVoiceAudioDescription: "Setup text-to-speech with ElevenLabs to generate realistic TTS with word-level timestamps, which are ideal for learning.",
    getVoiceAudioSupport: "Support for Orpheus, Dia, and Kokoro soon.",
    evadeCensorship: "Evade censorship",
    evadeCensorshipDescription: "Can't access YouTube, Reddit, or Twitch? Scarlett automatically redirects you to privacy preserving frontends that you can access even without a VPN.",
    downloadForFree: "Download for Free",
    installScarlettExtension: "Install the Scarlett browser extension",

    // Languages
    english: "English",
    vietnamese: "Vietnamese", 
    mandarin: "Mandarin",
    german: "German",
    italian: "Italian",
    portuguese: "Portuguese",
    russian: "Russian",
    japanese: "Japanese",
    korean: "Korean",
  },

  vi: {
    // Header
    decks: "Bộ Thẻ",
    add: "Thêm",
    connect: "Kết Nối",
    disconnect: "Ngắt Kết Nối",
    loading: "Đang Tải...",

    // Submit Deck Page
    submitDeck: "Gửi Bộ Thẻ",
    createFlashcardDeck: "Tạo bộ thẻ flashcard để đánh giá testnet. Bạn sẽ cần Base Sepolia ETH, có thể lấy miễn phí từ",
    needBaseSepolia: "vòi mạng",
    networkFaucets: "vòi mạng",
    deckName: "Tên bộ thẻ",
    briefDescription: "Mô tả ngắn gọn",
    frontLanguage: "Ngôn Ngữ Mặt Trước",
    backLanguage: "Ngôn Ngữ Mặt Sau",
    inputMethod: "Phương Thức Nhập",
    manualEntry: "✍️ Nhập Thủ Công",
    csvUpload: "📄 Tải Lên CSV",
    dropCsvOrClick: "📄 Thả CSV hoặc nhấp để tải lên",
    csvFormat: "Định dạng: front_text,back_text,front_phonetic_guide,back_phonetic_guide,notes",
    flashcards: "Thẻ Flashcard",
    addCard: "+ Thêm Thẻ",
    card: "Thẻ",
    remove: "Xóa",
    frontText: "Văn bản mặt trước",
    backText: "Văn bản mặt sau",
    phoneticGuide: "Hướng dẫn phiên âm",
    phoneticGuideOptional: "Hướng dẫn phiên âm (tùy chọn)",
    notesOptional: "Ghi chú (tùy chọn)",
    submitting: "Đang Gửi...",
    required: "Bắt buộc",
    minimumCardsRequired: "Tối thiểu 5 thẻ hoàn chỉnh",
    csvFileRequired: "Cần tệp CSV",

    // Homepage
    cobrowseWithScarlett: "Duyệt web cùng tiện ích AI Scarlett",
    languageTutorDescription: "Gia sư ngôn ngữ, huấn luyện viên cuộc sống, người bạn. Miễn phí và mã nguồn mở.",
    chromeBrowser: "Chrome",
    firefoxBrowser: "Firefox",
    scarlettSupercoach: "Scarlett là siêu huấn luyện viên của bạn",
    spacedRepetitionDescription: "Lặp lại có khoảng cách, nhập vai, năng suất và nhiều hơn nữa.",
    addFlashcardsToStudy: "Thêm thẻ flashcard để học",
    addFlashcardsDescription: "Thêm bộ thẻ flashcard từ người dùng khác hoặc tự tạo.",
    viewDecks: "Xem Bộ Thẻ",
    learnPassivelyAcrossWeb: "Học thụ động trên web",
    learnPassivelyDescription: "Scarlett thay thế các từ bạn đang học trên các trang web bạn truy cập.",
    translateFasterLocally: "Dịch nhanh hơn, cục bộ",
    translateFasterDescription: "Nhấp chuột phải để dịch bất kỳ văn bản nào, sau đó tự động thêm vào bộ thẻ flashcard của bạn.",
    quizYourselfDaily: "Tự kiểm tra hàng ngày",
    quizYourselfDescription: "Scarlett tạo ra các câu hỏi kiểm tra như trắc nghiệm để kiểm tra kiến thức của bạn.",
    embedEveryWebpage: "Nhúng mọi trang web bạn truy cập",
    embedEveryWebpageDescription: "Scarlett xếp hàng, tóm tắt và nhúng mọi trang bạn truy cập. Cô ấy hiểu bạn hơn cả chính bạn.",
    blockSitesInFocusMode: "Chặn trang web trong \"Chế độ Tập trung\"",
    blockSitesDescription: "Bạn có thường xuyên truy cập các trang web khiêu dâm hoặc mạng xã hội một cách thói quen? Bật chế độ tập trung để chuyển hướng đến thẻ flashcard thay thế.",
    getVoiceAudioWithTimestamps: "Nhận âm thanh giọng nói với dấu thời gian",
    getVoiceAudioDescription: "Thiết lập chuyển văn bản thành giọng nói với ElevenLabs để tạo TTS thực tế với dấu thời gian từng từ, lý tưởng cho việc học.",
    getVoiceAudioSupport: "Hỗ trợ Orpheus, Dia và Kokoro sớm.",
    evadeCensorship: "Tránh kiểm duyệt",
    evadeCensorshipDescription: "Không thể truy cập YouTube, Reddit hoặc Twitch? Scarlett tự động chuyển hướng bạn đến các giao diện bảo vệ quyền riêng tư mà bạn có thể truy cập ngay cả không có VPN.",
    downloadForFree: "Tải xuống Miễn phí",
    installScarlettExtension: "Cài đặt tiện ích trình duyệt Scarlett",

    // Languages
    english: "Tiếng Anh",
    vietnamese: "Tiếng Việt",
    mandarin: "Tiếng Trung",
    german: "Tiếng Đức",
    italian: "Tiếng Ý",
    portuguese: "Tiếng Bồ Đào Nha",
    russian: "Tiếng Nga",
    japanese: "Tiếng Nhật",
    korean: "Tiếng Hàn",
  },

  zh: {
    // Header
    decks: "卡组",
    add: "添加",
    connect: "连接",
    disconnect: "断开连接",
    loading: "加载中...",

    // Submit Deck Page
    submitDeck: "提交卡组",
    createFlashcardDeck: "创建闪卡卡组进行测试网审查。您需要 Base Sepolia ETH，可以从以下免费获取",
    needBaseSepolia: "网络水龙头",
    networkFaucets: "网络水龙头",
    deckName: "卡组名称",
    briefDescription: "简要描述",
    frontLanguage: "正面语言",
    backLanguage: "背面语言",
    inputMethod: "输入方式",
    manualEntry: "✍️ 手动输入",
    csvUpload: "📄 CSV 上传",
    dropCsvOrClick: "📄 拖放 CSV 或点击上传",
    csvFormat: "格式：front_text,back_text,front_phonetic_guide,back_phonetic_guide,notes",
    flashcards: "闪卡",
    addCard: "+ 添加卡片",
    card: "卡片",
    remove: "移除",
    frontText: "正面文本",
    backText: "背面文本",
    phoneticGuide: "拼音指南",
    phoneticGuideOptional: "拼音指南（可选）",
    notesOptional: "备注（可选）",
    submitting: "提交中...",
    required: "必填",
    minimumCardsRequired: "至少需要 5 张完整卡片",
    csvFileRequired: "需要 CSV 文件",

    // Homepage
    cobrowseWithScarlett: "使用 Scarlett AI 扩展协同浏览",
    languageTutorDescription: "语言导师、生活教练、朋友。免费且开源。",
    chromeBrowser: "Chrome",
    firefoxBrowser: "Firefox",
    scarlettSupercoach: "Scarlett 是您的超级教练",
    spacedRepetitionDescription: "间隔重复、角色扮演、生产力等等。",
    addFlashcardsToStudy: "添加闪卡学习",
    addFlashcardsDescription: "添加其他用户的闪卡卡组，或创建自己的。",
    viewDecks: "查看卡组",
    learnPassivelyAcrossWeb: "在网络上被动学习",
    learnPassivelyDescription: "Scarlett 在您访问的网页上替换您正在学习的单词。",
    translateFasterLocally: "更快地本地翻译",
    translateFasterDescription: "右键单击翻译任何文本，然后自动将其添加到您的闪卡卡组中。",
    quizYourselfDaily: "每日自测",
    quizYourselfDescription: "Scarlett 生成多选等测验问题来测试您的知识。",
    embedEveryWebpage: "嵌入您访问的每个网页",
    embedEveryWebpageDescription: "Scarlett 对您访问的每个页面进行排队、总结和嵌入。她比您更了解您自己。",
    blockSitesInFocusMode: "在\"专注模式\"期间阻止网站",
    blockSitesDescription: "发现自己习惯性地访问色情网站或社交媒体？启用专注模式将重定向到您的闪卡。",
    getVoiceAudioWithTimestamps: "获取带时间戳的语音音频",
    getVoiceAudioDescription: "设置 ElevenLabs 的文本转语音，生成具有单词级时间戳的逼真 TTS，非常适合学习。",
    getVoiceAudioSupport: "即将支持 Orpheus、Dia 和 Kokoro。",
    evadeCensorship: "规避审查",
    evadeCensorshipDescription: "无法访问 YouTube、Reddit 或 Twitch？Scarlett 自动将您重定向到保护隐私的前端，即使没有 VPN 也可以访问。",
    downloadForFree: "免费下载",
    installScarlettExtension: "安装 Scarlett 浏览器扩展",

    // Languages
    english: "英语",
    vietnamese: "越南语",
    mandarin: "中文",
    german: "德语",
    italian: "意大利语",
    portuguese: "葡萄牙语",
    russian: "俄语",
    japanese: "日语",
    korean: "韩语",
  },
};

export function useTranslation(locale: string = 'en'): Translations {
  return translations[locale] || translations.en;
} 