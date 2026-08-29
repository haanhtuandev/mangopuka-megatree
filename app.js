(function () {
    "use strict";

    var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    var STRINGS = {
        skipLink: { en: "Skip to content", vi: "Bỏ qua nội dung" },
        navAbout: { en: "About", vi: "Giới thiệu" },
        navReviews: { en: "Reviews", vi: "Đánh giá" },
        navShop: { en: "Shop", vi: "Mua sắm" },
        navVideos: { en: "Videos", vi: "Video" },
        navLive: { en: "Live", vi: "Trực tiếp" },
        liveTitle: { en: "Watch us break Pokemon packs live!", vi: "Xem chúng tôi bóc hộp Pokemon trực tiếp!" },
        liveText: {
            en: "Tune into our Facebook livestreams where we break Pokemon packs in real time — catch rare pulls as they happen.",
            vi: "Theo dõi các buổi livestream trên Facebook của chúng tôi, nơi chúng tôi bóc hộp Pokemon trực tiếp — đón xem những lá bài hiếm xuất hiện ngay trước mắt bạn."
        },
        liveCtaWatch: { en: "Watch the livestream", vi: "Xem livestream" },
        liveCtaFollow: { en: "Follow our page", vi: "Theo dõi trang của chúng tôi" },
        heroScroll: { en: "Scroll down to discover!", vi: "Cuộn xuống để khám phá!" },
        about: {
            en: "Here at MangoPuka Megatree, we aim to offer our customers a variety of the latest Trading Card Games and Collectables.",
            vi: "MangoPuka Megatree cam kết mang đến cho khách hàng đa dạng các loại Trading Card Game và đồ sưu tầm mới nhất."
        },
        ratingText: { en: "We are highly rated by our buyers", vi: "Chúng tôi được khách hàng đánh giá rất cao" },
        offerTitle: { en: "What we offer", vi: "Chúng tôi cung cấp" },
        serviceAuction: { en: "Auctions", vi: "Đấu giá" },
        ctaShop: { en: "Shop now!", vi: "Mua ngay!" },
        ctaBid: { en: "Bid now!", vi: "Đấu giá ngay!" },
        videoTitle: {
            en: "Explore our YouTube channel, where we unpack extremely rare cards!",
            vi: "Khám phá kênh YouTube của chúng tôi, nơi chúng tôi mở hộp những lá bài cực hiếm!"
        },
        visitChannel: { en: "Visit our channel", vi: "Ghé thăm kênh của chúng tôi" },
        rights: { en: "All rights reserved.", vi: "Bảo lưu mọi quyền." },
        metaDescription: {
            en: "MangoPuka Megatree offers a variety of the latest Trading Card Games and Collectables — Pokemon TCG, One Piece TCG, and live auctions. Highly rated by our buyers.",
            vi: "MangoPuka Megatree cung cấp đa dạng các loại Trading Card Game và đồ sưu tầm mới nhất — Pokemon TCG, One Piece TCG và đấu giá. Được khách hàng đánh giá rất cao."
        },
        ariaNav: { en: "Primary navigation", vi: "Điều hướng chính" },
        ariaScrollHint: { en: "Scroll to the About section", vi: "Cuộn xuống phần Giới thiệu" },
        ariaLangToggle: { en: "Switch language to Vietnamese", vi: "Chuyển ngôn ngữ sang Tiếng Anh" },
        ariaBackToTop: { en: "Back to top", vi: "Lên đầu trang" }
    };

    var SUPPORTED = ["en", "vi"];
    var currentLang = getLang();

    function getLang() {
        var stored = null;
        try {
            stored = localStorage.getItem("lang");
        } catch (e) {}
        if (stored && SUPPORTED.indexOf(stored) !== -1) return stored;
        var nav = (navigator.language || "en").toLowerCase();
        return nav.indexOf("vi") === 0 ? "vi" : "en";
    }

    function applyLang(lang) {
        document.documentElement.lang = lang;

        document.querySelectorAll("[data-i18n]").forEach(function (el) {
            var key = el.getAttribute("data-i18n");
            if (STRINGS[key] && STRINGS[key][lang]) el.textContent = STRINGS[key][lang];
        });

        document.querySelectorAll("[data-i18n-aria]").forEach(function (el) {
            var key = el.getAttribute("data-i18n-aria");
            if (STRINGS[key] && STRINGS[key][lang]) el.setAttribute("aria-label", STRINGS[key][lang]);
        });

        var toggle = document.querySelector(".lang-toggle");
        if (toggle) {
            toggle.textContent = lang === "en" ? "VI" : "EN";
        }

        document.title = lang === "vi"
            ? "MangoPuka Megatree | Cửa hàng TCG & Đồ sưu tầm"
            : "MangoPuka Megatree | TCG & Collectables Shop";

        var desc = document.querySelector('meta[name="description"]');
        var ogTitle = document.querySelector('meta[property="og:title"]');
        var ogDesc = document.querySelector('meta[property="og:description"]');
        if (desc) desc.setAttribute("content", STRINGS.metaDescription[lang]);
        if (ogTitle) ogTitle.setAttribute("content", document.title);
        if (ogDesc) ogDesc.setAttribute("content", STRINGS.metaDescription[lang]);

        try {
            localStorage.setItem("lang", lang);
        } catch (e) {}
    }

    applyLang(currentLang);

    var langToggle = document.querySelector(".lang-toggle");
    if (langToggle) {
        langToggle.addEventListener("click", function () {
            currentLang = currentLang === "en" ? "vi" : "en";
            applyLang(currentLang);
        });
    }

    var yearEl = document.getElementById("year");
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    var sections = document.querySelectorAll(".content");
    if (!reduced && "IntersectionObserver" in window) {
        sections.forEach(function (section) {
            section.classList.add("reveal");
        });
        var observer = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("revealed");
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.15 }
        );
        sections.forEach(function (section) {
            observer.observe(section);
        });
    }

    var nav = document.querySelector(".site-nav");
    var backToTop = document.querySelector(".back-to-top");

    function onScroll() {
        var past = window.scrollY > window.innerHeight * 0.6;
        if (nav) nav.classList.toggle("visible", past);
        if (backToTop) backToTop.classList.toggle("visible", past);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    if (backToTop) {
        backToTop.addEventListener("click", function () {
            window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
        });
    }
})();
