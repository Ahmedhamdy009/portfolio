window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  if (loader) {
    // Hide immediately when the page has fully loaded
    loader.classList.add("hidden");
  }
});

const scrollTopButton = document.getElementById("scrollTop");
const themeToggleButton = document.getElementById("themeToggle");
const langToggleButton = document.getElementById("langToggle");
const langToggleText = document.getElementById("langToggleText");
const projectList = document.getElementById("projectList");
const projectFilters = document.getElementById("projectFilters");
const skillsList = document.getElementById("skillsList");
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");
const sendButton = document.getElementById("sendBtn");

const savedTheme = localStorage.getItem("theme");
const savedLanguage = localStorage.getItem("language") || "ar";

const emailConfig = {
  publicKey: "jiVrDlVoYwJiDhK8m",
  serviceId: "service_mzdjc3r",
  templateId: "template_5yquzfu"
};

const texts = {
  navAbout: { ar: "نبذة", en: "About" },
  navProjects: { ar: "المشاريع", en: "Projects" },
  navSkills: { ar: "المهارات", en: "Skills" },
  navContact: { ar: "التواصل", en: "Contact" },
  heroEyebrow: { ar: "موقع شخصي", en: "Personal Website" },
  heroLead: {
    ar: "مطور واجهات أمامية أصمم تجارب رقمية سريعة ونظيفة وعصرية.",
    en: "Frontend developer building fast, clean, and modern digital experiences."
  },
  heroPrimaryCta: { ar: "شاهد أعمالي", en: "View My Work" },
  heroSecondaryCta: { ar: "تواصل معي", en: "Contact Me" },
  heroDownloadCv: { ar: "تحميل السيرة الذاتية", en: "Download CV" },
  statExperience: { ar: "سنوات خبرة", en: "Years Experience" },
  statProjects: { ar: "مشروعًا مكتملًا", en: "Completed Projects" },
  statPassion: { ar: "شغف بالتطوير", en: "Passion for Building" },
  heroCardRole: { ar: "مطور واجهات أمامية وتجربة مستخدم", en: "Frontend & UI Developer" },
  heroCardCopy: {
    ar: "أبني مواقع أعمال حديثة وصفحات شخصية تعمل بشكل ممتاز على جميع الأجهزة.",
    en: "I build modern business websites and portfolio pages that look great on all devices."
  },
  aboutLabel: { ar: "نبذة مختصرة", en: "Quick Intro" },
  aboutTitle: { ar: "من أنا؟", en: "Who Am I?" },
  aboutTextOne: {
    ar: "أركز على بناء مواقع شخصية وصفحات هبوط بتصميم واضح وتفاصيل احترافية.",
    en: "I focus on building portfolio websites and landing pages with clear structure and clean visual details."
  },
  aboutTextTwo: {
    ar: "أستمتع بتحويل الأفكار إلى واجهات عملية وسريعة الاستجابة وسهلة الاستخدام للزوار.",
    en: "I enjoy turning ideas into practical interfaces that are responsive, fast, and easy for visitors to use."
  },
  projectsLabel: { ar: "أبرز الأعمال", en: "Featured Work" },
  projectsTitle: { ar: "مشاريع مختارة", en: "Selected Projects" },
  filterAll: { ar: "الكل", en: "All" },
  filterWeb: { ar: "ويب", en: "Web" },
  filterWordpress: { ar: "ووردبريس", en: "WordPress" },
  projectButton: { ar: "عرض المشروع", en: "View Project" },
  skillsLabel: { ar: "المهارات", en: "Skills" },
  skillsTitle: { ar: "الأدوات التي أستخدمها", en: "Tools I Use" },
  contactLabel: { ar: "تواصل", en: "Contact" },
  contactTitle: { ar: "جاهز نبدأ مشروعك القادم؟", en: "Ready To Start Your Next Project?" },
  contactText: { ar: "يمكنك التواصل معي عبر هذه المنصات.", en: "You can find me on these social platforms." },
  formNameLabel: { ar: "الاسم", en: "Name" },
  formEmailLabel: { ar: "البريد الإلكتروني", en: "Email" },
  formPhoneLabel: { ar: "رقم الهاتف", en: "Phone Number" },
  formMessageLabel: { ar: "الرسالة", en: "Message" },
  formNamePlaceholder: { ar: "اسمك", en: "Your name" },
  formEmailPlaceholder: { ar: "example@mail.com", en: "you@example.com" },
  formPhonePlaceholder: { ar: "رقم تليفونك", en: "Your phone number" },
  formMessagePlaceholder: { ar: "اكتب رسالتك هنا", en: "Write your message" },
  formSendButton: { ar: "إرسال الرسالة", en: "Send Message" },
  formSending: { ar: "جاري الإرسال...", en: "Sending..." },
  formSuccess: { ar: "تم إرسال رسالتك بنجاح. سيتم الرد عليك في أقرب وقت.", en: "Your message was sent successfully. We will reply to you as soon as possible." },
  formError: { ar: "حدث خطأ أثناء الإرسال. حاول مرة أخرى.", en: "Something went wrong. Please try again." },
  formConfigError: { ar: "يرجى إضافة مفاتيح EmailJS في script.js أولاً.", en: "Please add your EmailJS keys in script.js first." },
  formNetworkError: { ar: "تعذر تحميل الخدمة. يرجى إيقاف مانع الإعلانات.", en: "Service blocked. Please disable your adblocker." },
  formEmptyError: { ar: "يرجى تعبئة جميع الحقول بشكل صحيح.", en: "Please fill out all fields correctly." },
  scrollTopLabel: { ar: "العودة للأعلى", en: "Back To Top" },
  loadMore: { ar: "عرض المزيد", en: "Load More" }
};

const typewriterRoles = {
  ar: ["مطور واجهات أمامية", "مصمم تجربة مستخدم", "شغوف بكتابة كود نظيف"],
  en: ["Frontend Developer", "UI/UX Designer", "Clean Code Enthusiast"]
};

// ----- رابط لوحة التحكم (Google Sheets) -----
// ضع الرابط الذي ستنسخه من جوجل هنا بين علامتي التنصيص
const GOOGLE_SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTCCENw2I6_p0obpF5ezqqoAZLXbSDr4PsROKpNBTsnqmxZyHo7l-xJgSahE1AnmGk7zoCJ87DhBEnk/pub?output=csv";

let projectsData = [];

async function loadDynamicProjects() {
  if (!GOOGLE_SHEET_CSV_URL) return; // استخدم المشاريع الافتراضية إذا كان الرابط فارغاً
  try {
    const res = await fetch(GOOGLE_SHEET_CSV_URL);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const textData = await res.text();
    const lines = textData.split('\n');

    const newProjects = [];
    // نتخطى السطر الأول لأن به عناوين الأعمدة
    for (let i = 1; i < lines.length; i++) {
      if (!lines[i].trim()) continue;
      
      const parseCSVLine = (text) => {
        const ret = [];
        let p = '', inQuotes = false;
        for (let j = 0; j < text.length; j++) {
          const c = text[j];
          if (c === '"') {
            if (j + 1 < text.length && text[j + 1] === '"') { p += '"'; j++; }
            else { inQuotes = !inQuotes; }
          } else if (c === ',' && !inQuotes) {
            ret.push(p); p = '';
          } else { p += c; }
        }
        ret.push(p);
        return ret.map(col => col.trim());
      };

      const cols = parseCSVLine(lines[i]);
      
      // التأكد من ملء الحقول الأساسية
      if (cols.length >= 6) {
        newProjects.push({
          title: { ar: cols[0], en: cols[1] },
          description: { ar: cols[2], en: cols[3] },
          image: cols[4],
          category: cols[5].toLowerCase(),
          link: cols[6] || "#"
        });
      }
    }

    if (newProjects.length > 0) {
      projectsData = newProjects; // استبدال البيانات القديمة بالجديدة
    }
  } catch (error) {
    console.error("Error loading projects from Google Sheets: ", error);
  }
}

const skillsData = [
  { icon: "fa-brands fa-html5", name: { ar: "HTML5", en: "HTML5" } },
  { icon: "fa-brands fa-css3-alt", name: { ar: "CSS3", en: "CSS3" } },
  { icon: "fa-brands fa-js", name: { ar: "JavaScript", en: "JavaScript" } },
  { icon: "fa-solid fa-pen-ruler", name: { ar: "تصميم UI", en: "UI Design" } },
  { icon: "fa-solid fa-gauge-high", name: { ar: "تحسين الأداء", en: "Performance" } },
  { icon: "fa-brands fa-wordpress", name: { ar: "WordPress", en: "WordPress" } }
];

let currentLanguage = savedLanguage;
let currentFilter = "all";
let revealObserver = null;

const translate = (key) => texts[key]?.[currentLanguage] || "";

const typewriterText = document.getElementById("typewriterText");
let typeIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeTimeout;

const playTypewriter = () => {
  if (!typewriterText) return;
  const roles = typewriterRoles[currentLanguage];
  const currentRole = roles[typeIndex % roles.length];

  if (isDeleting) {
    typewriterText.textContent = currentRole.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typewriterText.textContent = currentRole.substring(0, charIndex + 1);
    charIndex++;
  }

  let typeSpeed = isDeleting ? 40 : 100;

  if (!isDeleting && charIndex === currentRole.length) {
    typeSpeed = 2000;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    typeIndex++;
    typeSpeed = 400;
  }

  clearTimeout(typeTimeout);
  typeTimeout = setTimeout(playTypewriter, typeSpeed);
};

const setThemeButtonState = (isDark) => {
  if (!themeToggleButton) return;
  const themeToggleText = document.getElementById("themeToggleText");
  const themeIcon = themeToggleButton.querySelector("i");

  if (themeToggleText) themeToggleText.textContent = isDark ? "Light" : "Dark";
  if (themeIcon) themeIcon.className = isDark ? "fa-solid fa-sun" : "fa-solid fa-moon";

  themeToggleButton.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
  themeToggleButton.setAttribute("title", isDark ? "Switch to light mode" : "Switch to dark mode");
};

const setLanguageButtonState = () => {
  if (!langToggleButton || !langToggleText) return;
  langToggleText.textContent = currentLanguage === "ar" ? "EN" : "AR";
  const label = currentLanguage === "ar" ? "Switch to English" : "التبديل إلى العربية";
  langToggleButton.setAttribute("aria-label", label);
  langToggleButton.setAttribute("title", label);
};

const setupRevealAnimation = () => {
  if (revealObserver) revealObserver.disconnect();

  revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.14,
      rootMargin: "0px 0px -20px 0px"
    }
  );

  document.querySelectorAll(".reveal").forEach((element) => {
    if (!element.classList.contains("visible")) revealObserver.observe(element);
  });
};

const renderSkills = () => {
  if (!skillsList) return;

  skillsList.innerHTML = skillsData
    .map(
      (skill) => `
        <span class="skill-item reveal">
          <i class="${skill.icon}" aria-hidden="true"></i>
          <span>${skill.name[currentLanguage]}</span>
        </span>
      `
    )
    .join("");
};

let projectsLimit = 3;

const renderProjects = () => {
  if (!projectList) return;

  const visibleProjects =
    currentFilter === "all"
      ? projectsData
      : projectsData.filter((project) => project.category === currentFilter);

  const projectsToShow = visibleProjects.slice(0, projectsLimit);

  projectList.innerHTML = projectsToShow
    .map(
      (project) => `
        <article class="project-card reveal" data-category="${project.category}">
          <div class="project-image-wrap">
            <img class="project-image" src="${project.image}" alt="${project.title[currentLanguage]}" loading="lazy" decoding="async" />
            <div class="project-image-overlay">
              <a class="btn btn-primary project-overlay-link" href="${project.link}" target="_blank" rel="noopener noreferrer">${translate("projectButton")}</a>
            </div>
          </div>
          <span class="project-type">${project.category.toUpperCase()}</span>
          <h3>${project.title[currentLanguage]}</h3>
          <p>${project.description[currentLanguage]}</p>
          <a class="btn btn-secondary project-link" href="${project.link}" target="_blank" rel="noopener noreferrer">${translate("projectButton")}</a>
        </article>
      `
    )
    .join("");

  // Handle broken images by hiding them or setting a gray background
  projectList.querySelectorAll(".project-image").forEach(img => {
    img.addEventListener("error", function() {
      this.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 800 400'%3E%3Crect width='800' height='400' fill='%23e0e0e0'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='24px' fill='%23888'%3EImage Not Found%3C/text%3E%3C/svg%3E";
      this.alt = "Image not found";
    });
  });

  const loadMoreWrap = document.getElementById("loadMoreWrap");
  if (loadMoreWrap) {
    if (visibleProjects.length > projectsLimit) {
      loadMoreWrap.style.display = "block";
    } else {
      loadMoreWrap.style.display = "none";
    }
  }
};

const toastContainer = document.getElementById("toastContainer");

const showToast = (type, message) => {
  if (!toastContainer) return;
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  const icon = type === 'success' ? 'fa-circle-check' : 'fa-circle-exclamation';
  toast.innerHTML = `<i class="fa-solid ${icon}"></i> <span>${message}</span>`;
  toastContainer.appendChild(toast);

  setTimeout(() => toast.classList.add("show"), 10);
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 400);
  }, 4000);
};

const setFormStatus = (type, message) => {
  if (!formStatus) return;
  if (!type && !message) {
    formStatus.style.display = "none";
    formStatus.textContent = "";
    return;
  }
  showToast(type, message);
};



const validateEmailConfig = () =>
  emailConfig.publicKey !== "YOUR_PUBLIC_KEY" &&
  emailConfig.serviceId !== "YOUR_SERVICE_ID" &&
  emailConfig.templateId !== "YOUR_TEMPLATE_ID";

const handleContactSubmit = async (event) => {
  event.preventDefault();
  if (!contactForm || !sendButton) return;

  if (!window.emailjs) {
    console.warn("EmailJS blocked by browser or adblocker.");
    setFormStatus("error", translate("formNetworkError"));
    return;
  }

  if (!validateEmailConfig()) {
    console.warn("EmailJS keys missing.");
    setFormStatus("error", translate("formConfigError"));
    return;
  }

  const nameVal = document.getElementById('name').value.trim();
  const emailVal = document.getElementById('email').value.trim();
  const phoneVal = document.getElementById('phone') ? document.getElementById('phone').value.trim() : "";
  const msgVal = document.getElementById('message').value.trim();

  if (!nameVal || !emailVal || !msgVal) {
    setFormStatus("error", translate("formEmptyError"));
    return;
  }

  sendButton.disabled = true;
  sendButton.textContent = translate("formSending");
  setFormStatus("", "");

  try {
    const params = {
      name: nameVal,
      from_name: nameVal,
      email: emailVal,
      reply_to: emailVal,
      phone: phoneVal,
      message: msgVal
    };

    const response = await window.emailjs.send(
      emailConfig.serviceId,
      emailConfig.templateId,
      params
    );

    console.log("EmailJS SUCCESS!", response.status, response.text);
    contactForm.reset();
    setFormStatus("success", translate("formSuccess"));
  } catch (error) {
    console.log("EmailJS FAILED...", error);
    const errorDetail = error?.text || error?.message || "Verify your EmailJS keys in script.js";
    setFormStatus("error", translate("formError") + " (" + errorDetail + ")");
  } finally {
    sendButton.disabled = false;
    sendButton.textContent = translate("formSendButton");
  }
};

const handleFilterChange = (filter) => {
  currentFilter = filter;
  projectsLimit = 3;

  if (projectFilters) {
    projectFilters.querySelectorAll(".filter-btn").forEach((button) => {
      button.classList.toggle("active", button.dataset.filter === filter);
    });
  }

  renderProjects();
  setupRevealAnimation();
};

const applyTranslations = () => {
  document.documentElement.lang = currentLanguage;
  document.documentElement.dir = currentLanguage === "ar" ? "rtl" : "ltr";

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;
    element.textContent = translate(key);
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    const key = element.dataset.i18nPlaceholder;
    element.setAttribute("placeholder", translate(key));
  });

  if (scrollTopButton) {
    scrollTopButton.setAttribute("aria-label", translate("scrollTopLabel"));
    scrollTopButton.setAttribute("title", translate("scrollTopLabel"));
  }

  setLanguageButtonState();
  renderSkills();
  handleFilterChange(currentFilter);

  if (sendButton && !sendButton.disabled) {
    sendButton.textContent = translate("formSendButton");
  }

  clearTimeout(typeTimeout);
  charIndex = 0;
  isDeleting = false;
  if (typewriterText) typewriterText.textContent = "";
  playTypewriter();
};

if (window.emailjs && validateEmailConfig()) {
  window.emailjs.init({ publicKey: emailConfig.publicKey });
}

const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
const shouldUseDarkTheme = savedTheme ? savedTheme === "dark" : prefersDarkScheme;
document.body.classList.toggle("dark", shouldUseDarkTheme);
setThemeButtonState(shouldUseDarkTheme);

if (themeToggleButton) {
  themeToggleButton.addEventListener("click", () => {
    const isDark = document.body.classList.toggle("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
    setThemeButtonState(isDark);
  });
}

if (langToggleButton) {
  langToggleButton.addEventListener("click", () => {
    currentLanguage = currentLanguage === "ar" ? "en" : "ar";
    localStorage.setItem("language", currentLanguage);
    applyTranslations();
  });
}

if (projectFilters) {
  projectFilters.addEventListener("click", (event) => {
    const target = event.target.closest(".filter-btn");
    if (!target) return;
    handleFilterChange(target.dataset.filter);
  });
}

if (contactForm) {
  contactForm.addEventListener("submit", handleContactSubmit);
}

if (scrollTopButton) {
  let ticking = false;

  const updateScrollTopVisibility = () => {
    scrollTopButton.classList.toggle("show", window.scrollY > 280);
    ticking = false;
  };

  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollTopVisibility);
        ticking = true;
      }
    },
    { passive: true }
  );

  scrollTopButton.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}


const heroCard = document.querySelector(".hero-card");
if (heroCard && window.matchMedia("(pointer: fine)").matches) {
  let isTicking = false;

  heroCard.addEventListener("mousemove", (e) => {
    if (!isTicking) {
      window.requestAnimationFrame(() => {
        const rect = heroCard.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const tiltX = ((y - centerY) / centerY) * -12;
        const tiltY = ((x - centerX) / centerX) * 12;

        heroCard.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.05, 1.05, 1.05)`;
        isTicking = false;
      });
      isTicking = true;
    }
  });

  heroCard.addEventListener("mouseleave", () => {
    heroCard.style.transform = `perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)`;
  });
}



const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const navLinksContainer = document.getElementById("navLinks");

if (mobileMenuBtn && navLinksContainer) {
  mobileMenuBtn.addEventListener("click", () => {
    mobileMenuBtn.classList.toggle("open");
    navLinksContainer.classList.toggle("active");
  });

  navLinksContainer.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      mobileMenuBtn.classList.remove("open");
      navLinksContainer.classList.remove("active");
    });
  });
}

const loadMoreBtn = document.getElementById("loadMoreBtn");
if (loadMoreBtn) {
  loadMoreBtn.addEventListener("click", () => {
    projectsLimit += 3;
    renderProjects();
    setupRevealAnimation();
  });
}

// تهيئة الموقع وجلب المشاريع من إكسيل جوجل ثم العرض
(async function initApp() {
  await loadDynamicProjects();
  applyTranslations();
})();
