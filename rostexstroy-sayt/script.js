/* ROSTEXSTROY — sayt skripti v2 (kutubxonasiz) */
(function () {
  "use strict";

  // Sozlamalar: haqiqiy saytda shu yerni o'zgartirish kifoya
  const CONFIG = {
    phone: "+998907183290",
    telegramUser: "", // masalan "rostexstroy" — bo'sh bo'lsa so'rov faqat toast ko'rsatadi
  };

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const motionOK = window.matchMedia("(prefers-reduced-motion: no-preference)").matches;

  /* ---- Header + progress ---- */
  const header = $("#header");
  const progress = $("#progress");
  const onScroll = () => {
    const y = window.scrollY;
    header.classList.toggle("scrolled", y > 40);
    const max = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---- Mobil menyu ---- */
  const burger = $("#burger");
  const menu = $("#mobileMenu");
  const closeMenu = () => {
    burger.classList.remove("open");
    menu.classList.remove("open");
    document.body.style.overflow = "";
  };
  burger.addEventListener("click", () => {
    const open = !menu.classList.contains("open");
    burger.classList.toggle("open", open);
    menu.classList.toggle("open", open);
    document.body.style.overflow = open ? "hidden" : "";
  });
  $$("a", menu).forEach((a) => a.addEventListener("click", closeMenu));

  /* ---- Scroll reveal ---- */
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.04, rootMargin: "0px 0px -6% 0px" }
  );
  $$(".reveal, .reveal-stagger").forEach((el) => io.observe(el));

  /* ---- Raqamlar sanagichi ---- */
  const fmt = (n) => n.toLocaleString("ru-RU").replace(/,/g, " ");
  const runCounter = (el) => {
    const target = +el.dataset.count;
    const dur = 1700;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = fmt(Math.round(target * eased));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  setTimeout(() => $$("[data-count]").forEach(runCounter), 700);

  /* ---- Mahsulot filtri ---- */
  const filters = $$("#filters .filter");
  const products = $$("#productGrid .product");
  filters.forEach((btn) => {
    btn.addEventListener("click", () => {
      filters.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const f = btn.dataset.filter;
      let i = 0;
      products.forEach((p) => {
        const show = f === "all" || p.dataset.cat === f;
        p.classList.toggle("hide", !show);
        if (show) {
          p.style.opacity = "0";
          p.style.transform = "translateY(16px)";
          const delay = 40 + i++ * 50;
          setTimeout(() => {
            p.style.transition = "opacity .5s, transform .6s cubic-bezier(.22,1,.36,1)";
            p.style.opacity = "";
            p.style.transform = "";
            setTimeout(() => (p.style.transition = ""), 650);
          }, delay);
        }
      });
    });
  });

  /* ---- 3D tilt (faqat sichqoncha) ---- */
  if (fine && motionOK) {
    $$(".tilt").forEach((card) => {
      let raf = null;
      card.addEventListener("mousemove", (e) => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => {
          card.style.transform = `translateY(-8px) rotateX(${(-y * 7).toFixed(2)}deg) rotateY(${(x * 9).toFixed(2)}deg)`;
        });
      });
      card.addEventListener("mouseleave", () => {
        cancelAnimationFrame(raf);
        card.style.transition = "transform .7s cubic-bezier(.22,1,.36,1)";
        card.style.transform = "";
        setTimeout(() => (card.style.transition = ""), 700);
      });
    });
  }

  /* ---- Custom kursor ---- */
  const cur = $("#cursor");
  const ring = $("#cursorRing");
  if (fine && cur && ring) {
    let mx = -100, my = -100, rx = -100, ry = -100;
    window.addEventListener("mousemove", (e) => {
      mx = e.clientX; my = e.clientY;
      cur.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
    }, { passive: true });
    const loop = () => {
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      requestAnimationFrame(loop);
    };
    loop();
    const hoverables = "a, button, .product, .g-item, .feature, .filter";
    document.addEventListener("mouseover", (e) => {
      ring.classList.toggle("hover", !!e.target.closest(hoverables));
    });
    document.addEventListener("mouseleave", () => { cur.style.opacity = "0"; ring.style.opacity = "0"; });
    document.addEventListener("mouseenter", () => { cur.style.opacity = ""; ring.style.opacity = ""; });
  }

  /* ---- FAQ akkordeon ---- */
  $$("#faq .faq-item").forEach((item) => {
    const q = $(".faq-q", item);
    const a = $(".faq-a", item);
    q.addEventListener("click", () => {
      const open = item.classList.contains("open");
      $$("#faq .faq-item.open").forEach((o) => {
        o.classList.remove("open");
        $(".faq-a", o).style.maxHeight = null;
      });
      if (!open) {
        item.classList.add("open");
        a.style.maxHeight = a.scrollHeight + "px";
      }
    });
  });

  /* ---- Toast ---- */
  const toast = $("#toast");
  let toastT;
  const showToast = (msg) => {
    toast.textContent = msg;
    toast.classList.add("show");
    clearTimeout(toastT);
    toastT = setTimeout(() => toast.classList.remove("show"), 3800);
  };

  /* ---- Forma ---- */
  const form = $("#orderForm");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = form.name.value.trim();
    const phone = form.phone.value.trim();
    if (!name || phone.replace(/\D/g, "").length < 9) {
      showToast(I18N.t("toast.err"));
      (name ? form.phone : form.name).focus();
      return;
    }
    const text = I18N.t("tg.msg", { name, phone, type: form.type.value, qty: form.qty.value || "-", msg: form.msg.value || "-" });

    if (CONFIG.telegramUser) {
      window.open(
        `https://t.me/${CONFIG.telegramUser}?text=${encodeURIComponent(text)}`,
        "_blank",
        "noopener"
      );
    }
    showToast(I18N.t("toast.ok", { name }));
    form.reset();
  });

  /* ---- Telefon maskasi ---- */
  const phoneInput = $("#phone");
  phoneInput.addEventListener("focus", () => {
    if (!phoneInput.value) phoneInput.value = "+998 ";
  });
  phoneInput.addEventListener("input", () => {
    let d = phoneInput.value.replace(/\D/g, "");
    if (d.startsWith("998")) d = d.slice(3);
    d = d.slice(0, 9);
    let out = "+998";
    if (d.length > 0) out += " " + d.slice(0, 2);
    if (d.length > 2) out += " " + d.slice(2, 5);
    if (d.length > 5) out += " " + d.slice(5, 7);
    if (d.length > 7) out += " " + d.slice(7, 9);
    phoneInput.value = out + (d.length === 0 ? " " : "");
  });

  /* ---- Hero fallback: animatsiya ishlamasa ham kontent ko'rinsin ---- */
  setTimeout(() => document.body.classList.add("loaded"), 2600);

  /* ---- Yil ---- */
  $("#year").textContent = new Date().getFullYear();

  /* ---- Hero parallaks ---- */
  const heroImg = $(".hero-media img");
  if (heroImg && motionOK) {
    heroImg.addEventListener("animationend", () => {
      heroImg.style.animation = "none";
      window.addEventListener(
        "scroll",
        () => {
          const y = window.scrollY;
          if (y < window.innerHeight) heroImg.style.transform = `translateY(${y * 0.18}px) scale(1.02)`;
        },
        { passive: true }
      );
    });
  }
})();
