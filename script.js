/* =========================================================
   AIKENSWRLD — FINAL WEBSITE JAVASCRIPT
========================================================= */


/* =========================================================
   ELEMENTS
========================================================= */

const header = document.getElementById("siteHeader");
const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");

const year = document.getElementById("year");
const pageProgress = document.getElementById("pageProgress");

const projectForm = document.getElementById("projectForm");
const formNote = document.getElementById("formNote");


/* =========================================================
   FOOTER YEAR
========================================================= */

if (year) {
    year.textContent = new Date().getFullYear();
}


/* =========================================================
   MOBILE MENU
========================================================= */

function setMobileMenu(open) {

    if (!mobileMenu || !menuToggle) {
        return;
    }

    mobileMenu.classList.toggle("open", open);

    menuToggle.setAttribute(
        "aria-expanded",
        String(open)
    );

    menuToggle.setAttribute(
        "aria-label",
        open ? "Close navigation" : "Open navigation"
    );

    document.body.classList.toggle(
        "menu-open",
        open
    );
}


if (menuToggle) {

    menuToggle.addEventListener("click", function () {

        const isOpen =
            mobileMenu &&
            mobileMenu.classList.contains("open");

        setMobileMenu(!isOpen);

    });

}


/* Close navigation after clicking a link */

document.querySelectorAll(
    ".mobile-menu a, .desktop-nav a"
).forEach(function (link) {

    link.addEventListener("click", function () {
        setMobileMenu(false);
    });

});


/* Escape closes mobile navigation */

document.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Escape") {
            setMobileMenu(false);
        }

    }
);


/* =========================================================
   HEADER SCROLL
========================================================= */

function updateHeader() {

    if (!header) {
        return;
    }

    header.classList.toggle(
        "scrolled",
        window.scrollY > 30
    );

}

updateHeader();

window.addEventListener(
    "scroll",
    updateHeader,
    {
        passive: true
    }
);


/* =========================================================
   PAGE PROGRESS
========================================================= */

function updatePageProgress() {

    if (!pageProgress) {
        return;
    }

    const scrollTop =
        window.scrollY;

    const documentHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;

    if (documentHeight <= 0) {
        pageProgress.style.width = "0%";
        return;
    }

    const percentage =
        (scrollTop / documentHeight) * 100;

    pageProgress.style.width =
        Math.min(100, Math.max(0, percentage)) + "%";
}

updatePageProgress();

window.addEventListener(
    "scroll",
    updatePageProgress,
    {
        passive: true
    }
);


/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

const navLinks =
    document.querySelectorAll(
        '.desktop-nav a[href^="#"]'
    );

const sections = [];

navLinks.forEach(function (link) {

    const targetId =
        link.getAttribute("href");

    if (!targetId || targetId === "#") {
        return;
    }

    const section =
        document.querySelector(targetId);

    if (section) {
        sections.push({
            section: section,
            link: link
        });
    }

});


function setActiveNav(activeLink) {

    navLinks.forEach(function (link) {

        link.classList.remove("active");

    });

    if (activeLink) {
        activeLink.classList.add("active");
    }

}


if ("IntersectionObserver" in window) {

    const navObserver =
        new IntersectionObserver(
            function (entries) {

                const visibleSections =
                    entries
                        .filter(function (entry) {
                            return entry.isIntersecting;
                        })
                        .sort(function (a, b) {
                            return (
                                b.intersectionRatio -
                                a.intersectionRatio
                            );
                        });

                if (visibleSections.length === 0) {
                    return;
                }

                const currentSection =
                    visibleSections[0].target;

                const match =
                    sections.find(function (item) {
                        return (
                            item.section ===
                            currentSection
                        );
                    });

                if (match) {
                    setActiveNav(match.link);
                }

            },
            {
                rootMargin:
                    "-30% 0px -55% 0px",
                threshold: [
                    0,
                    0.1,
                    0.25,
                    0.5,
                    0.75
                ]
            }
        );


    sections.forEach(function (item) {

        navObserver.observe(
            item.section
        );

    });

}


/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealElements =
    document.querySelectorAll(".reveal");

const reducedMotion =
    window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;


if (
    reducedMotion ||
    !("IntersectionObserver" in window)
) {

    revealElements.forEach(function (element) {

        element.classList.add("show");

    });

} else {

    const revealObserver =
        new IntersectionObserver(
            function (entries, observer) {

                entries.forEach(function (entry) {

                    if (!entry.isIntersecting) {
                        return;
                    }

                    entry.target.classList.add("show");

                    observer.unobserve(
                        entry.target
                    );

                });

            },
            {
                threshold: 0.12
            }
        );


    revealElements.forEach(function (element) {

        revealObserver.observe(element);

    });

}


/* =========================================================
   FAQ ACCORDION
========================================================= */

const faqItems =
    document.querySelectorAll(
        ".faq-item"
    );


faqItems.forEach(function (item) {

    const question =
        item.querySelector(
            ".faq-question"
        );

    const answer =
        item.querySelector(
            ".faq-answer"
        );

    if (!question || !answer) {
        return;
    }


    answer.style.maxHeight = "0px";
    answer.style.overflow = "hidden";

    question.setAttribute(
        "aria-expanded",
        "false"
    );


    question.addEventListener(
        "click",
        function () {

            const currentlyOpen =
                item.classList.contains(
                    "active"
                );


            faqItems.forEach(
                function (otherItem) {

                    if (otherItem === item) {
                        return;
                    }

                    const otherAnswer =
                        otherItem.querySelector(
                            ".faq-answer"
                        );

                    const otherQuestion =
                        otherItem.querySelector(
                            ".faq-question"
                        );

                    otherItem.classList.remove(
                        "active"
                    );

                    if (otherAnswer) {
                        otherAnswer.style.maxHeight =
                            "0px";
                    }

                    if (otherQuestion) {
                        otherQuestion.setAttribute(
                            "aria-expanded",
                            "false"
                        );
                    }

                }
            );


            if (currentlyOpen) {

                item.classList.remove(
                    "active"
                );

                answer.style.maxHeight =
                    "0px";

                question.setAttribute(
                    "aria-expanded",
                    "false"
                );

            } else {

                item.classList.add(
                    "active"
                );

                answer.style.maxHeight =
                    answer.scrollHeight + "px";

                question.setAttribute(
                    "aria-expanded",
                    "true"
                );

            }

        }
    );

});


/* =========================================================
   CONTACT FORM
========================================================= */

if (projectForm) {

    projectForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const name =
                document.getElementById("name")
                    ?.value
                    .trim() || "";

            const company =
                document.getElementById("company")
                    ?.value
                    .trim() || "";

            const email =
                document.getElementById("email")
                    ?.value
                    .trim() || "";

            const projectType =
                document.getElementById("projectType")
                    ?.value ||
                "Other";

            const message =
                document.getElementById("message")
                    ?.value
                    .trim() || "";


            const subject =
                encodeURIComponent(
                    "Aikenswrld Project Enquiry — " +
                    projectType
                );


            const body =
                encodeURIComponent(
                    "Name: " +
                    name +
                    "\n" +

                    "Company / Brand: " +
                    (company || "Not provided") +
                    "\n" +

                    "Email: " +
                    email +
                    "\n" +

                    "Project Type: " +
                    projectType +
                    "\n\n" +

                    "Project Brief:\n" +
                    message
                );


            if (formNote) {

                formNote.textContent =
                    "Opening your email app…";

            }


            window.location.href =
                "mailto:thecreativeaiken@gmail.com" +
                "?subject=" +
                subject +
                "&body=" +
                body;

        }
    );

}


/* =========================================================
   PORTFOLIO LINKS
========================================================= */

document.querySelectorAll(
    ".project-image"
).forEach(function (imageLink) {

    imageLink.addEventListener(
        "click",
        function (event) {

            event.stopPropagation();

        }
    );

});


/* =========================================================
   BUTTON FEEDBACK
========================================================= */

document.querySelectorAll(
    ".button-primary, " +
    ".button-secondary, " +
    ".button-dark, " +
    ".button-light, " +
    ".nav-button, " +
    ".mobile-menu-cta, " +
    ".contact-link, " +
    ".underlined-link"
).forEach(function (element) {

    element.addEventListener(
        "click",
        function () {

            element.classList.add(
                "clicked"
            );

            window.setTimeout(
                function () {

                    element.classList.remove(
                        "clicked"
                    );

                },
                120
            );

        }
    );

});


/* =========================================================
   FAQ RESIZE SUPPORT
========================================================= */

window.addEventListener(
    "resize",
    function () {

        faqItems.forEach(
            function (item) {

                if (
                    !item.classList.contains(
                        "active"
                    )
                ) {
                    return;
                }

                const answer =
                    item.querySelector(
                        ".faq-answer"
                    );

                if (answer) {

                    answer.style.maxHeight =
                        answer.scrollHeight + "px";

                }

            }
        );

    }
);


/* =========================================================
   READY
========================================================= */

document.documentElement.classList.add(
    "js-ready"
);