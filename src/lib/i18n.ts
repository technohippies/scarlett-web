export interface Translations {
  // Header
  decks: string;
  add: string;
  connect: string;
  disconnect: string;
  loading: string;
  privacyPolicy: string;

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

  // Privacy Policy
  privacyPolicyTitle: string;
  lastUpdated: string;
  introduction: string;
  introductionText: string;
  informationWeCollect: string;
  analyticsData: string;
  analyticsDataDesc: string;
  featureUsageMetrics: string;
  performanceData: string;
  milestoneEvents: string;
  technicalInformation: string;
  whatWeDoNotCollect: string;
  personalConversations: string;
  personalInformation: string;
  browsingHistory: string;
  fileContents: string;
  voiceData: string;
  howWeUseInformation: string;
  howWeUseInformationDesc: string;
  improveFeatures: string;
  identifyBugs: string;
  understandValuableFeatures: string;
  informDevelopmentDecisions: string;
  dataStorageAndSecurity: string;
  localData: string;
  localDataDesc1: string;
  localDataDesc2: string;
  localDataDesc3: string;
  analyticsDataSection: string;
  analyticsDataDesc1: string;
  analyticsDataDesc2: string;
  analyticsDataDesc3: string;
  thirdPartyServices: string;
  umamiAnalytics: string;
  umamiAnalyticsDesc: string;
  umamiFeature1: string;
  umamiFeature2: string;
  umamiFeature3: string;
  moreInfoUmami: string;
  localAiModels: string;
  localAiModelsDesc: string;
  localAiFeature1: string;
  localAiFeature2: string;
  localAiFeature3: string;
  yourRightsAndChoices: string;
  dataControl: string;
  disableAnalytics: string;
  clearLocalData: string;
  featureControl: string;
  accessAndDeletion: string;
  accessAndDeletionDesc1: string;
  accessAndDeletionDesc2: string;
  accessAndDeletionDesc3: string;
  contactInformation: string;
  contactInformationDesc: string;
  githubIssues: string;
  openSourceTransparency: string;
  openSourceTransparencyDesc: string;
  githubRepository: string;
  updatesToPolicy: string;
  updatesPolicyDesc: string;
  extensionUpdateNotifications: string;
  websitePosting: string;
  githubRepositoryUpdates: string;
  finalNote: string;
}

export const translations: Record<string, Translations> = {
  en: {
    // Header
    decks: "Decks",
    add: "Add",
    connect: "Connect",
    disconnect: "Disconnect",
    loading: "Loading...",
    privacyPolicy: "Privacy Policy",

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

    // Privacy Policy
    privacyPolicyTitle: "Privacy Policy for Scarlett Browser Extension",
    lastUpdated: "Last Updated:",
    introduction: "Introduction",
    introductionText: "Scarlett ('we,' 'our,' or 'us') is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard information when you use our browser extension.",
    informationWeCollect: "Information We Collect",
    analyticsData: "Analytics Data",
    analyticsDataDesc: "We use Umami Analytics (a privacy-focused analytics service) to collect anonymous usage statistics to help us improve the extension. This includes:",
    featureUsageMetrics: "Feature Usage Metrics: Which features you use (chat, study sessions, focus mode, bookmarks, etc.)",
    performanceData: "Performance Data: How often features are accessed and basic usage patterns",
    milestoneEvents: "Milestone Events: Anonymous tracking of study streaks and learning progress",
    technicalInformation: "Technical Information: Browser type, extension version, and basic system information",
    whatWeDoNotCollect: "What We DO NOT Collect",
    personalConversations: "Personal Conversations: Your AI chat conversations remain completely local on your device",
    personalInformation: "Personal Information: We do not collect names, email addresses, or other personally identifiable information",
    browsingHistory: "Browsing History: We do not track or store your browsing activity outside the extension",
    fileContents: "File Contents: Any documents or content you process remain on your device",
    voiceData: "Voice Data: Speech-to-text processing happens locally on your device",
    howWeUseInformation: "How We Use Information",
    howWeUseInformationDesc: "We use the collected analytics data to:",
    improveFeatures: "Improve extension features and user experience",
    identifyBugs: "Identify and fix bugs or performance issues",
    understandValuableFeatures: "Understand which features are most valuable to users",
    informDevelopmentDecisions: "Make informed decisions about future development",
    dataStorageAndSecurity: "Data Storage and Security",
    localData: "Local Data",
    localDataDesc1: "All your personal data (conversations, bookmarks, study progress) is stored locally in your browser",
    localDataDesc2: "AI conversations with local models (Jan.ai, Ollama, LM Studio) never leave your device",
    localDataDesc3: "Your study materials and progress are synced only within your browser's local storage",
    analyticsDataSection: "Analytics Data",
    analyticsDataDesc1: "Anonymous usage analytics are processed by Umami Analytics",
    analyticsDataDesc2: "Data is stored on secure servers and automatically anonymized",
    analyticsDataDesc3: "No personal identifiers are transmitted or stored",
    thirdPartyServices: "Third-Party Services",
    umamiAnalytics: "Umami Analytics",
    umamiAnalyticsDesc: "We use Umami Analytics (cloud.umami.is) for privacy-focused website analytics. Umami:",
    umamiFeature1: "Does not use cookies or track personal information",
    umamiFeature2: "Complies with GDPR and other privacy regulations",
    umamiFeature3: "Provides only aggregated, anonymous data",
    moreInfoUmami: "More information",
    localAiModels: "Local AI Models",
    localAiModelsDesc: "The extension supports integration with local AI services (Jan.ai, Ollama, LM Studio):",
    localAiFeature1: "All AI conversations happen locally on your device",
    localAiFeature2: "No conversation data is transmitted to external servers",
    localAiFeature3: "You maintain complete control over your AI interactions",
    yourRightsAndChoices: "Your Rights and Choices",
    dataControl: "Data Control",
    disableAnalytics: "Disable Analytics: You can disable analytics collection in the extension settings",
    clearLocalData: "Local Data: You can clear all local extension data through your browser settings",
    featureControl: "Feature Control: You can enable/disable specific features as needed",
    accessAndDeletion: "Access and Deletion",
    accessAndDeletionDesc1: "Analytics data is anonymous and cannot be traced back to individual users",
    accessAndDeletionDesc2: "You can request information about our data practices by contacting us",
    accessAndDeletionDesc3: "Local data can be deleted by uninstalling the extension or clearing browser data",
    contactInformation: "Contact Information",
    contactInformationDesc: "If you have questions about this Privacy Policy or our data practices, please contact us:",
    githubIssues: "GitHub Issues",
    openSourceTransparency: "Open Source Transparency",
    openSourceTransparencyDesc: "Scarlett is open source software. You can review our code and data practices at:",
    githubRepository: "GitHub Repository",
    updatesToPolicy: "Updates to This Policy",
    updatesPolicyDesc: "We may update this Privacy Policy periodically. We will notify users of any material changes through:",
    extensionUpdateNotifications: "Extension update notifications",
    websitePosting: "Posting the updated policy on our website",
    githubRepositoryUpdates: "GitHub repository updates",
    finalNote: "This privacy policy is effective as of the date listed above and governs our collection and use of information from that date forward.",
  },

  vi: {
    // Header
    decks: "Bộ Thẻ",
    add: "Thêm",
    connect: "Kết Nối",
    disconnect: "Ngắt Kết Nối",
    loading: "Đang Tải...",
    privacyPolicy: "Chính Sách Bảo Mật",

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

    // Privacy Policy
    privacyPolicyTitle: "Chính Sách Bảo Mật cho Tiện Ích Trình Duyệt Scarlett",
    lastUpdated: "Cập nhật lần cuối:",
    introduction: "Giới thiệu",
    introductionText: "Scarlett ('chúng tôi,' 'của chúng tôi,' hoặc 'chúng tôi') cam kết bảo vệ quyền riêng tư của bạn. Chính sách Bảo mật này giải thích cách chúng tôi thu thập, sử dụng và bảo vệ thông tin khi bạn sử dụng tiện ích trình duyệt của chúng tôi.",
    informationWeCollect: "Thông Tin Chúng Tôi Thu Thập",
    analyticsData: "Dữ Liệu Phân Tích",
    analyticsDataDesc: "Chúng tôi sử dụng Umami Analytics (dịch vụ phân tích tập trung vào quyền riêng tư) để thu thập thống kê sử dụng ẩn danh nhằm giúp chúng tôi cải thiện tiện ích. Điều này bao gồm:",
    featureUsageMetrics: "Số Liệu Sử Dụng Tính Năng: Những tính năng bạn sử dụng (trò chuyện, phiên học tập, chế độ tập trung, dấu trang, v.v.)",
    performanceData: "Dữ Liệu Hiệu Suất: Tần suất truy cập tính năng và các mẫu sử dụng cơ bản",
    milestoneEvents: "Sự Kiện Mốc: Theo dõi ẩn danh các chuỗi học tập và tiến trình học tập",
    technicalInformation: "Thông Tin Kỹ Thuật: Loại trình duyệt, phiên bản tiện ích và thông tin hệ thống cơ bản",
    whatWeDoNotCollect: "Những Gì Chúng Tôi KHÔNG Thu Thập",
    personalConversations: "Cuộc Trò Chuyện Cá Nhân: Các cuộc trò chuyện AI của bạn vẫn hoàn toàn cục bộ trên thiết bị của bạn",
    personalInformation: "Thông Tin Cá Nhân: Chúng tôi không thu thập tên, địa chỉ email hoặc các thông tin nhận dạng cá nhân khác",
    browsingHistory: "Lịch Sử Duyệt Web: Chúng tôi không theo dõi hoặc lưu trữ hoạt động duyệt web của bạn bên ngoài tiện ích",
    fileContents: "Nội Dung Tệp: Bất kỳ tài liệu hoặc nội dung nào bạn xử lý đều vẫn trên thiết bị của bạn",
    voiceData: "Dữ Liệu Giọng Nói: Xử lý chuyển giọng nói thành văn bản diễn ra cục bộ trên thiết bị của bạn",
    howWeUseInformation: "Cách Chúng Tôi Sử Dụng Thông Tin",
    howWeUseInformationDesc: "Chúng tôi sử dụng dữ liệu phân tích đã thu thập để:",
    improveFeatures: "Cải thiện các tính năng tiện ích và trải nghiệm người dùng",
    identifyBugs: "Xác định và khắc phục lỗi hoặc vấn đề hiệu suất",
    understandValuableFeatures: "Hiểu những tính năng nào có giá trị nhất đối với người dùng",
    informDevelopmentDecisions: "Đưa ra quyết định sáng suốt về phát triển tương lai",
    dataStorageAndSecurity: "Lưu Trữ và Bảo Mật Dữ Liệu",
    localData: "Dữ Liệu Cục Bộ",
    localDataDesc1: "Tất cả dữ liệu cá nhân của bạn (cuộc trò chuyện, dấu trang, tiến trình học tập) được lưu trữ cục bộ trong trình duyệt của bạn",
    localDataDesc2: "Các cuộc trò chuyện AI với các mô hình cục bộ (Jan.ai, Ollama, LM Studio) không bao giờ rời khỏi thiết bị của bạn",
    localDataDesc3: "Tài liệu học tập và tiến trình của bạn chỉ được đồng bộ trong bộ nhớ cục bộ của trình duyệt",
    analyticsDataSection: "Dữ Liệu Phân Tích",
    analyticsDataDesc1: "Phân tích sử dụng ẩn danh được xử lý bởi Umami Analytics",
    analyticsDataDesc2: "Dữ liệu được lưu trữ trên máy chủ an toàn và tự động ẩn danh hóa",
    analyticsDataDesc3: "Không có định danh cá nhân nào được truyền hoặc lưu trữ",
    thirdPartyServices: "Dịch Vụ Bên Thứ Ba",
    umamiAnalytics: "Umami Analytics",
    umamiAnalyticsDesc: "Chúng tôi sử dụng Umami Analytics (cloud.umami.is) cho phân tích trang web tập trung vào quyền riêng tư. Umami:",
    umamiFeature1: "Không sử dụng cookie hoặc theo dõi thông tin cá nhân",
    umamiFeature2: "Tuân thủ GDPR và các quy định bảo mật khác",
    umamiFeature3: "Chỉ cung cấp dữ liệu tổng hợp, ẩn danh",
    moreInfoUmami: "Thông tin thêm",
    localAiModels: "Mô Hình AI Cục Bộ",
    localAiModelsDesc: "Tiện ích hỗ trợ tích hợp với các dịch vụ AI cục bộ (Jan.ai, Ollama, LM Studio):",
    localAiFeature1: "Tất cả cuộc trò chuyện AI diễn ra cục bộ trên thiết bị của bạn",
    localAiFeature2: "Không có dữ liệu cuộc trò chuyện nào được truyền đến máy chủ bên ngoài",
    localAiFeature3: "Bạn duy trì quyền kiểm soát hoàn toàn các tương tác AI của mình",
    yourRightsAndChoices: "Quyền và Lựa Chọn của Bạn",
    dataControl: "Kiểm Soát Dữ Liệu",
    disableAnalytics: "Tắt Phân Tích: Bạn có thể tắt thu thập phân tích trong cài đặt tiện ích",
    clearLocalData: "Dữ Liệu Cục Bộ: Bạn có thể xóa tất cả dữ liệu tiện ích cục bộ thông qua cài đặt trình duyệt",
    featureControl: "Kiểm Soát Tính Năng: Bạn có thể bật/tắt các tính năng cụ thể theo nhu cầu",
    accessAndDeletion: "Truy Cập và Xóa",
    accessAndDeletionDesc1: "Dữ liệu phân tích là ẩn danh và không thể truy vết ngược lại người dùng cá nhân",
    accessAndDeletionDesc2: "Bạn có thể yêu cầu thông tin về các thực hành dữ liệu của chúng tôi bằng cách liên hệ với chúng tôi",
    accessAndDeletionDesc3: "Dữ liệu cục bộ có thể được xóa bằng cách gỡ cài đặt tiện ích hoặc xóa dữ liệu trình duyệt",
    contactInformation: "Thông Tin Liên Hệ",
    contactInformationDesc: "Nếu bạn có thắc mắc về Chính sách Bảo mật này hoặc các thực hành dữ liệu của chúng tôi, vui lòng liên hệ với chúng tôi:",
    githubIssues: "GitHub Issues",
    openSourceTransparency: "Minh Bạch Mã Nguồn Mở",
    openSourceTransparencyDesc: "Scarlett là phần mềm mã nguồn mở. Bạn có thể xem xét mã và các thực hành dữ liệu của chúng tôi tại:",
    githubRepository: "Kho GitHub",
    updatesToPolicy: "Cập Nhật Chính Sách Này",
    updatesPolicyDesc: "Chúng tôi có thể cập nhật Chính sách Bảo mật này định kỳ. Chúng tôi sẽ thông báo cho người dùng về bất kỳ thay đổi quan trọng nào thông qua:",
    extensionUpdateNotifications: "Thông báo cập nhật tiện ích",
    websitePosting: "Đăng chính sách cập nhật trên trang web của chúng tôi",
    githubRepositoryUpdates: "Cập nhật kho GitHub",
    finalNote: "Chính sách bảo mật này có hiệu lực từ ngày được liệt kê ở trên và điều chỉnh việc thu thập và sử dụng thông tin của chúng tôi từ ngày đó trở đi.",
  },

  zh: {
    // Header
    decks: "卡组",
    add: "添加",
    connect: "连接",
    disconnect: "断开连接",
    loading: "加载中...",
    privacyPolicy: "隐私政策",

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

    // Privacy Policy
    privacyPolicyTitle: "Scarlett 浏览器扩展隐私政策",
    lastUpdated: "最后更新：",
    introduction: "介绍",
    introductionText: "Scarlett（'我们'、'我们的'或'我们'）致力于保护您的隐私。本隐私政策解释了当您使用我们的浏览器扩展时，我们如何收集、使用和保护信息。",
    informationWeCollect: "我们收集的信息",
    analyticsData: "分析数据",
    analyticsDataDesc: "我们使用 Umami Analytics（专注于隐私的分析服务）收集匿名使用统计信息，以帮助我们改进扩展。这包括：",
    featureUsageMetrics: "功能使用指标：您使用的功能（聊天、学习会话、专注模式、书签等）",
    performanceData: "性能数据：功能访问频率和基本使用模式",
    milestoneEvents: "里程碑事件：学习连续性和学习进度的匿名跟踪",
    technicalInformation: "技术信息：浏览器类型、扩展版本和基本系统信息",
    whatWeDoNotCollect: "我们不收集的内容",
    personalConversations: "个人对话：您的 AI 聊天对话完全保留在您的设备本地",
    personalInformation: "个人信息：我们不收集姓名、电子邮件地址或其他个人身份信息",
    browsingHistory: "浏览历史：我们不跟踪或存储您在扩展外的浏览活动",
    fileContents: "文件内容：您处理的任何文档或内容都保留在您的设备上",
    voiceData: "语音数据：语音转文本处理在您的设备本地进行",
    howWeUseInformation: "我们如何使用信息",
    howWeUseInformationDesc: "我们使用收集的分析数据来：",
    improveFeatures: "改进扩展功能和用户体验",
    identifyBugs: "识别和修复错误或性能问题",
    understandValuableFeatures: "了解哪些功能对用户最有价值",
    informDevelopmentDecisions: "为未来开发做出明智决策",
    dataStorageAndSecurity: "数据存储和安全",
    localData: "本地数据",
    localDataDesc1: "您的所有个人数据（对话、书签、学习进度）都存储在您浏览器的本地",
    localDataDesc2: "与本地模型（Jan.ai、Ollama、LM Studio）的 AI 对话从不离开您的设备",
    localDataDesc3: "您的学习材料和进度仅在浏览器的本地存储中同步",
    analyticsDataSection: "分析数据",
    analyticsDataDesc1: "匿名使用分析由 Umami Analytics 处理",
    analyticsDataDesc2: "数据存储在安全服务器上并自动匿名化",
    analyticsDataDesc3: "不传输或存储个人标识符",
    thirdPartyServices: "第三方服务",
    umamiAnalytics: "Umami Analytics",
    umamiAnalyticsDesc: "我们使用 Umami Analytics (cloud.umami.is) 进行专注于隐私的网站分析。Umami：",
    umamiFeature1: "不使用 cookie 或跟踪个人信息",
    umamiFeature2: "遵守 GDPR 和其他隐私法规",
    umamiFeature3: "仅提供聚合的匿名数据",
    moreInfoUmami: "更多信息",
    localAiModels: "本地 AI 模型",
    localAiModelsDesc: "扩展支持与本地 AI 服务（Jan.ai、Ollama、LM Studio）集成：",
    localAiFeature1: "所有 AI 对话都在您的设备本地进行",
    localAiFeature2: "不会将对话数据传输到外部服务器",
    localAiFeature3: "您完全控制您的 AI 交互",
    yourRightsAndChoices: "您的权利和选择",
    dataControl: "数据控制",
    disableAnalytics: "禁用分析：您可以在扩展设置中禁用分析收集",
    clearLocalData: "本地数据：您可以通过浏览器设置清除所有本地扩展数据",
    featureControl: "功能控制：您可以根据需要启用/禁用特定功能",
    accessAndDeletion: "访问和删除",
    accessAndDeletionDesc1: "分析数据是匿名的，无法追溯到个人用户",
    accessAndDeletionDesc2: "您可以通过联系我们请求有关我们数据实践的信息",
    accessAndDeletionDesc3: "可以通过卸载扩展或清除浏览器数据来删除本地数据",
    contactInformation: "联系信息",
    contactInformationDesc: "如果您对本隐私政策或我们的数据实践有疑问，请联系我们：",
    githubIssues: "GitHub Issues",
    openSourceTransparency: "开源透明度",
    openSourceTransparencyDesc: "Scarlett 是开源软件。您可以在以下位置查看我们的代码和数据实践：",
    githubRepository: "GitHub 仓库",
    updatesToPolicy: "政策更新",
    updatesPolicyDesc: "我们可能会定期更新本隐私政策。我们将通过以下方式通知用户任何重要更改：",
    extensionUpdateNotifications: "扩展更新通知",
    websitePosting: "在我们的网站上发布更新政策",
    githubRepositoryUpdates: "GitHub 仓库更新",
    finalNote: "本隐私政策自上述日期起生效，并管理我们从该日期起的信息收集和使用。",
  },
};

export function useTranslation(locale: string = 'en'): Translations {
  return translations[locale] || translations.en;
} 