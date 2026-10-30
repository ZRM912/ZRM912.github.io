/* =========================================================
   Personal site — interactions
   ========================================================= */
(() => {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------------- header state ---------------- */
  const header = document.getElementById("siteHeader");
  const progress = document.getElementById("scrollProgress");

  const onScroll = () => {
    header.classList.toggle("scrolled", window.scrollY > 10);
    if (progress) {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
      progress.style.transform = `scaleX(${ratio})`;
    }
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });

  /* ---------------- mobile nav ---------------- */
  const nav = document.getElementById("nav");
  const navToggle = document.getElementById("navToggle");

  const closeNav = () => {
    nav.classList.remove("open");
    navToggle.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "打开菜单");
  };

  navToggle.addEventListener("click", () => {
    const open = !nav.classList.contains("open");
    nav.classList.toggle("open", open);
    navToggle.classList.toggle("open", open);
    navToggle.setAttribute("aria-expanded", String(open));
    navToggle.setAttribute("aria-label", open ? "关闭菜单" : "打开菜单");
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeNav);
  });

  document.addEventListener("click", (event) => {
    if (!nav.contains(event.target) && !navToggle.contains(event.target)) {
      closeNav();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeNav();
  });

  /* ---------------- scroll spy ---------------- */
  const navLinks = Array.from(document.querySelectorAll('.nav a[href^="#"]'));
  const sections = Array.from(document.querySelectorAll("section[id]"));

  if ("IntersectionObserver" in window && sections.length) {
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const id = `#${entry.target.id}`;
          navLinks.forEach((link) => {
            link.classList.toggle("active", link.getAttribute("href") === id);
          });
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((section) => spy.observe(section));
  }

  /* ---------------- reveal on scroll ---------------- */
  const revealEls = document.querySelectorAll(".reveal");

  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach((el) => el.classList.add("in-view"));
  } else {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );
    revealEls.forEach((el) => revealObserver.observe(el));
  }

  /* ---------------- typing effect ---------------- */
  const typingEl = document.getElementById("typing");
  const roles = ["在读学生", "编程学习者", "数据分析初学者"];

  if (typingEl) {
    if (reduceMotion) {
      typingEl.textContent = roles[0];
    } else {
      let roleIndex = 0;
      let charIndex = 0;
      let deleting = false;

      const tick = () => {
        const role = roles[roleIndex];

        if (!deleting) {
          charIndex += 1;
          typingEl.textContent = role.slice(0, charIndex);

          if (charIndex === role.length) {
            deleting = true;
            setTimeout(tick, 1700);
            return;
          }
          setTimeout(tick, 110);
        } else {
          charIndex -= 1;
          typingEl.textContent = role.slice(0, charIndex);

          if (charIndex === 0) {
            deleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            setTimeout(tick, 350);
            return;
          }
          setTimeout(tick, 55);
        }
      };

      setTimeout(tick, 600);
    }
  }

  /* ---------------- cursor glow ---------------- */
  const glow = document.getElementById("cursorGlow");
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  if (glow && finePointer && !reduceMotion) {
    let currentX = window.innerWidth / 2;
    let currentY = window.innerHeight / 2;
    let targetX = currentX;
    let targetY = currentY;

    window.addEventListener(
      "pointermove",
      (event) => {
        targetX = event.clientX;
        targetY = event.clientY;
        glow.classList.add("on");
      },
      { passive: true }
    );

    document.addEventListener("pointerleave", () => glow.classList.remove("on"));

    const loop = () => {
      currentX += (targetX - currentX) * 0.12;
      currentY += (targetY - currentY) * 0.12;
      glow.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  }

  /* ---------------- copy email ---------------- */
  const copyBtn = document.getElementById("copyEmail");
  const copyStatus = document.getElementById("copyStatus");

  if (copyBtn && copyStatus) {
    copyBtn.addEventListener("click", async () => {
      const value = copyBtn.dataset.copy || "";
      let ok = false;

      try {
        await navigator.clipboard.writeText(value);
        ok = true;
      } catch (error) {
        const helper = document.createElement("textarea");
        helper.value = value;
        helper.setAttribute("readonly", "");
        helper.style.position = "fixed";
        helper.style.opacity = "0";
        document.body.appendChild(helper);
        helper.select();
        try {
          ok = document.execCommand("copy");
        } catch (fallbackError) {
          ok = false;
        }
        document.body.removeChild(helper);
      }

      copyStatus.textContent = ok ? "✓ 邮箱已复制到剪贴板" : "复制失败，请手动选择邮箱地址";
      copyBtn.textContent = ok ? "已复制" : "复制";

      window.clearTimeout(copyBtn._timer);
      copyBtn._timer = window.setTimeout(() => {
        copyStatus.textContent = "";
        copyBtn.textContent = "复制";
      }, 2200);
    });
  }

  /* ---------------- footer year ---------------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();
