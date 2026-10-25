

const form = document.getElementById("knowledgeForm");
const search = document.getElementById("search");
const knowledgeList = document.getElementById("knowledgeList");
const languageSelect = document.getElementById("languageSelect");
const addSection = document.getElementById("addSection");
const librarySection = document.getElementById("librarySection");
const toast = document.getElementById("toast");

let knowledge = [];

try {
  const saved = JSON.parse(
    localStorage.getItem("skillbridgeKnowledge") || "[]"
  );
  knowledge = Array.isArray(saved) ? saved : [];
} catch (error) {
  knowledge = [];
}

let language = localStorage.getItem("skillbridgeLanguage") || "en";

const translations = {
  en: {
    workspace: "WORKSPACE",
    dashboard: "Dashboard",
    library: "Knowledge Library",
    addArticle: "Add Article",
    sidebarNote: "Knowledge shared is knowledge preserved.",
    eyebrow: "EMPLOYEE KNOWLEDGE PLATFORM",
    welcomeKicker: "BETTER TOGETHER",
    welcomeTitle: "Knowledge makes every team stronger.",
    welcomeText: "Keep valuable experience accessible. Help your team find answers, share solutions, and learn from one another.",
    shareKnowledge: "Share knowledge",
    knowledgeMatters: "Knowledge matters",
    totalArticles: "Total articles",
    articlesStored: "Knowledge entries saved",
    equipmentCovered: "Equipment covered",
    uniqueEquipment: "Unique equipment names",
    contributors: "Contributors",
    knowledgeSharers: "People sharing knowledge",
    knowledgeBase: "KNOWLEDGE BASE",
    libraryTitle: "Knowledge library",
    viewAll: "View all",
    searchPlaceholder: "Search titles, equipment, or error codes...",
    clearSearch: "Clear search",
    quickActions: "QUICK ACTIONS",
    quickTitle: "Make knowledge useful.",
    quickText: "Document a useful solution so the next person can find it.",
    newArticle: "New article",
    newArticleText: "Document a solution",
    findAnswer: "Find an answer",
    findAnswerText: "Search saved knowledge",
    dailyThought: "A THOUGHT TO KEEP",
    tipTitle: "Small lessons. Lasting impact.",
    tipText: "A clear explanation today can save someone hours tomorrow.",
    contribute: "CONTRIBUTE",
    formTitle: "Add knowledge article",
    formIntro: "Capture a practical solution your team can reuse.",
    cancel: "Cancel",
    fieldTitle: "Problem title *",
    titlePlaceholder: "e.g. Machine overheating",
    fieldEquipment: "Equipment name",
    equipmentPlaceholder: "e.g. Machine A",
    fieldError: "Error code",
    fieldSolution: "Solution / procedure *",
    solutionPlaceholder: "Describe the verified steps to resolve the issue...",
    fieldAuthor: "Employee name *",
    authorPlaceholder: "Enter contributor name",
    localNotice: "Saved in this browser only. Not shared with other employees.",
    saveArticle: "Save article",
    footerText: "Preserving knowledge for a better tomorrow.",
    noArticles: "No knowledge articles yet",
    noArticlesText: "Add your first article to start building the knowledge library.",
    noResults: "No matching articles",
    noResultsText: "Try another title, equipment name, or error code.",
    articleCount: "articles",
    articleSingular: "article",
    equipmentLabel: "Equipment",
    errorLabel: "Error code",
    solutionLabel: "Solution",
    authorLabel: "Added by",
    untitled: "Untitled article",
    saved: "Knowledge article saved successfully.",
    saveError: "Could not save your article. Check browser storage settings.",
    languageChanged: "Language changed.",
    searchCleared: "Search cleared.",
    localStorageFull: "Browser storage is full. Your latest article was not saved.",
    invalidData: "Please fill in all required fields.",
    delete: "Delete",
    deleteConfirm: "Delete this knowledge article?",
    deleted: "Article deleted.",
    deleteError: "Could not delete the article.",
    edit: "Edit",
    updateArticle: "Update article",
    updated: "Article updated successfully.",
    duplicate: "An article with this title already exists. Save it anyway?"
  },
  ja: {
    workspace: "ワークスペース",
    dashboard: "ダッシュボード",
    library: "ナレッジライブラリ",
    addArticle: "記事を追加",
    sidebarNote: "知識を共有し、未来へつなぐ。",
    eyebrow: "社員向けナレッジプラットフォーム",
    welcomeKicker: "一緒に成長しよう",
    welcomeTitle: "知識がチームを強くする。",
    welcomeText: "貴重な経験を共有し、解決策を見つけ、互いに学び合いましょう。",
    shareKnowledge: "知識を共有",
    knowledgeMatters: "知識を大切に",
    totalArticles: "記事の合計",
    articlesStored: "保存されたナレッジ",
    equipmentCovered: "設備の種類",
    uniqueEquipment: "登録された設備名",
    contributors: "投稿者",
    knowledgeSharers: "知識を共有する人",
    knowledgeBase: "ナレッジベース",
    libraryTitle: "ナレッジライブラリ",
    viewAll: "すべて表示",
    searchPlaceholder: "タイトル、設備名、エラーコードで検索...",
    clearSearch: "検索をクリア",
    quickActions: "クイックアクション",
    quickTitle: "知識を役立てよう。",
    quickText: "解決策を記録して、チームで共有しましょう。",
    newArticle: "新しい記事",
    newArticleText: "解決策を記録",
    findAnswer: "解決策を探す",
    findAnswerText: "保存された知識を検索",
    dailyThought: "今日のひとこと",
    tipTitle: "小さな学びが大きな成果に。",
    tipText: "今日の分かりやすい説明が、明日の時間を節約します。",
    contribute: "ナレッジを共有",
    formTitle: "ナレッジ記事を追加",
    formIntro: "チームで再利用できる解決策を記録しましょう。",
    cancel: "キャンセル",
    fieldTitle: "問題のタイトル *",
    titlePlaceholder: "例：機械の過熱",
    fieldEquipment: "設備名",
    equipmentPlaceholder: "例：機械A",
    fieldError: "エラーコード",
    fieldSolution: "解決策・手順 *",
    solutionPlaceholder: "確認済みの解決手順を入力してください...",
    fieldAuthor: "社員名 *",
    authorPlaceholder: "投稿者名を入力",
    localNotice: "このブラウザーにのみ保存され、他の社員とは共有されません。",
    saveArticle: "記事を保存",
    footerText: "知識を未来へつなぐ。",
    noArticles: "ナレッジ記事はまだありません",
    noArticlesText: "最初の記事を追加して、ライブラリを作りましょう。",
    noResults: "一致する記事がありません",
    noResultsText: "別のタイトル、設備名、エラーコードで検索してください。",
    articleCount: "件",
    articleSingular: "件",
    equipmentLabel: "設備",
    errorLabel: "エラーコード",
    solutionLabel: "解決策",
    authorLabel: "投稿者",
    untitled: "無題の記事",
    saved: "ナレッジ記事を保存しました。",
    saveError: "保存できませんでした。ブラウザーの保存設定を確認してください。",
    languageChanged: "言語を変更しました。",
    searchCleared: "検索をクリアしました。",
    localStorageFull: "ブラウザーの保存容量が不足しています。記事は保存されませんでした。",
    invalidData: "必須項目を入力してください。",
    delete: "削除",
    deleteConfirm: "この記事を削除しますか？",
    deleted: "記事を削除しました。",
    deleteError: "記事を削除できませんでした。",
    edit: "編集",
    updateArticle: "記事を更新",
    updated: "記事を更新しました。",
    duplicate: "同じタイトルの記事があります。それでも保存しますか？"
  }
};

function t(key) {
  return translations[language][key] || translations.en[key] || key;
}

function saveData() {
  try {
    localStorage.setItem(
      "skillbridgeKnowledge",
      JSON.stringify(knowledge)
    );
    return true;
  } catch (error) {
    return false;
  }
}

function showToast(message) {
  toast.textContent = message;
  toast.hidden = false;

  // Clear automatically when the next interaction occurs
  // or when another message is displayed.
}

function setLanguage(nextLanguage, showMessage = true) {
  language = nextLanguage === "ja" ? "ja" : "en";

  try {
    localStorage.setItem("skillbridgeLanguage", language);
  } catch (error) {
    // The interface still works if preference saving is unavailable.
  }

  document.documentElement.lang = language;
  languageSelect.value = language;

  document.querySelectorAll("[data-i18n]").forEach(element => {
    const key = element.dataset.i18n;
    if (translations[language][key]) {
      element.textContent = translations[language][key];
    }
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach(element => {
    const key = element.dataset.i18nPlaceholder;
    if (translations[language][key]) {
      element.placeholder = translations[language][key];
    }
  });

  renderKnowledge();
  updateStats();

  if (showMessage) {
    showToast(t("languageChanged"));
  }
}

function updateStats() {
  document.getElementById("totalArticles").textContent =
    knowledge.length;

  const equipmentNames = new Set(
    knowledge
      .map(item => String(item.equipment || "").trim().toLowerCase())
      .filter(Boolean)
  );

  const contributors = new Set(
    knowledge
      .map(item => String(item.author || "").trim().toLowerCase())
      .filter(Boolean)
  );

  document.getElementById("equipmentCount").textContent =
    equipmentNames.size;

  document.getElementById("contributorCount").textContent =
    contributors.size;
}

function makeElement(tag, className, text) {
  const element = document.createElement(tag);

  if (className) {
    element.className = className;
  }

  if (text !== undefined) {
    element.textContent = text;
  }

  return element;
}

function renderKnowledge() {
  const query = search.value.trim().toLowerCase();

  const filtered = knowledge.filter(item => {
    const values = [
      item.title,
      item.equipment,
      item.errorCode,
      item.solution,
      item.author
    ];

    return values.some(value =>
      String(value || "").toLowerCase().includes(query)
    );
  });

  knowledgeList.replaceChildren();

  const countText = language === "ja"
    ? `${filtered.length}${t("articleCount")}`
    : `${filtered.length} ${filtered.length === 1
        ? t("articleSingular")
        : t("articleCount")}`;

  document.getElementById("resultCount").textContent = countText;

  if (filtered.length === 0) {
    const empty = makeElement("div", "empty-state");
    const heading = makeElement(
      "strong",
      "",
      query ? t("noResults") : t("noArticles")
    );
    const description = makeElement(
      "p",
      "",
      query ? t("noResultsText") : t("noArticlesText")
    );

    empty.append(heading, description);
    knowledgeList.appendChild(empty);
    return;
  }

  filtered.forEach(item => {
    const card = makeElement("article", "knowledge-card");
    const top = makeElement("div", "article-top");
    const title = makeElement(
      "h3",
      "",
      item.title || t("untitled")
    );
    const tag = makeElement(
      "span",
      "article-tag",
      item.errorCode || t("library")
    );

    top.append(title, tag);

    const meta = makeElement("div", "article-meta");
    meta.append(
      makeElement("span", "", `${t("equipmentLabel")}: ${item.equipment || "—"}`),
      makeElement("span", "", `${t("errorLabel")}: ${item.errorCode || "—"}`)
    );

    const solution = makeElement(
      "p",
      "article-solution",
      `${t("solutionLabel")}: ${item.solution || "—"}`
    );

    const author = makeElement(
      "p",
      "article-author",
      `${t("authorLabel")}: ${item.author || "—"}`
    );

    card.append(top, meta, solution, author);
    knowledgeList.appendChild(card);
  });
}

function showAddForm() {
  addSection.hidden = false;
  addSection.scrollIntoView({ behavior: "smooth", block: "start" });
  document.getElementById("title").focus();
}

function showDashboard() {
  addSection.hidden = true;
  librarySection.scrollIntoView({ behavior: "smooth", block: "start" });
}

function showLibrary() {
  addSection.hidden = true;
  librarySection.scrollIntoView({ behavior: "smooth", block: "start" });
  search.focus({ preventScroll: true });
}

function setActiveNav(activeId) {
  ["dashboardNav", "libraryNav", "addNav"].forEach(id => {
    document.getElementById(id).classList.toggle(
      "active",
      id === activeId
    );
  });
}

document.getElementById("dashboardNav").addEventListener("click", () => {
  setActiveNav("dashboardNav");
  showDashboard();
});

document.getElementById("libraryNav").addEventListener("click", () => {
  setActiveNav("libraryNav");
  showLibrary();
});

document.getElementById("addNav").addEventListener("click", () => {
  setActiveNav("addNav");
  showAddForm();
});

document.getElementById("welcomeAddBtn").addEventListener("click", () => {
  setActiveNav("addNav");
  showAddForm();
});

document.getElementById("quickAddBtn").addEventListener("click", () => {
  setActiveNav("addNav");
  showAddForm();
});

document.getElementById("quickLibraryBtn").addEventListener("click", () => {
  setActiveNav("libraryNav");
  showLibrary();
});

document.getElementById("viewAllBtn").addEventListener("click", () => {
  setActiveNav("libraryNav");
  showLibrary();
});

document.getElementById("cancelAddBtn").addEventListener("click", () => {
  form.reset();
  addSection.hidden = true;
  setActiveNav("dashboardNav");
});

document.getElementById("clearSearchBtn").addEventListener("click", () => {
  search.value = "";
  renderKnowledge();
  showToast(t("searchCleared"));
});

search.addEventListener("input", renderKnowledge);

languageSelect.addEventListener("change", () => {
  setLanguage(languageSelect.value);
});

form.addEventListener("submit", event => {
  event.preventDefault();

  const item = {
    title: document.getElementById("title").value.trim(),
    equipment: document.getElementById("equipment").value.trim(),
    errorCode: document.getElementById("errorCode").value.trim(),
    solution: document.getElementById("solution").value.trim(),
    author: document.getElementById("author").value.trim()
  };

  if (!item.title || !item.solution || !item.author) {
    showToast(t("invalidData"));
    return;
  }

  const duplicate = knowledge.some(existing =>
    String(existing.title || "").trim().toLowerCase() ===
    item.title.toLowerCase()
  );

  if (duplicate && !window.confirm(t("duplicate"))) {
    return;
  }

  knowledge.unshift(item);

  if (!saveData()) {
    knowledge.shift();
    showToast(t("saveError"));
    return;
  }

  form.reset();
  addSection.hidden = true;
  search.value = "";

  renderKnowledge();
  updateStats();
  setActiveNav("dashboardNav");
  showToast(t("saved"));

  librarySection.scrollIntoView({ behavior: "smooth", block: "start" });
});

setLanguage(language, false);
updateStats();
renderKnowledge();
