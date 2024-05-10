import imagesLoaded from "https://esm.sh/imagesloaded";

console.clear();

// Utilities
const wrap = (n, max) => (n + max) % max;
const lerp = (a, b, t) => a + (b - a) * t;
const vec2 = (x = 0, y = 0) => ({ x, y });

// RAF (RequestAnimationFrame) class
class Raf {
    constructor() {
        this.callbacks = [];
        this.rafId = 0;
        this.raf = this.raf.bind(this);
        this.start();
    }

    start() {
        this.raf();
    }

    stop() {
        cancelAnimationFrame(this.rafId);
    }

    raf() {
        this.callbacks.forEach(({ callback, id }) => callback({ id }));
        this.rafId = requestAnimationFrame(this.raf);
    }

    add(callback, id) {
        this.callbacks.push({ callback, id: id || this.genId() });
    }

    remove(id) {
        this.callbacks = this.callbacks.filter((callback) => callback.id !== id);
    }

    genId() {
        if (!this.count) this.count = 0;
        return (this.count++).toString();
    }
}

const raf = new Raf();

function tilt(node, options) {
    let { trigger, target } = resolveOptions(node, options);

    let lerpAmount = 0.06;

    const rotDeg = { current: vec2(), target: vec2() };
    const bgPos = { current: vec2(), target: vec2() };

    const update = (newOptions) => {
        destroy();
        ({ trigger, target } = resolveOptions(node, newOptions));
        init();
    };

    let rafId;

    function ticker({ id }) {
        rafId = id;

        rotDeg.current = lerpVectors(rotDeg.current, rotDeg.target, lerpAmount);
        bgPos.current = lerpVectors(bgPos.current, bgPos.target, lerpAmount);

        target.forEach((el) => {
            el.style.setProperty("--rotX", rotDeg.current.y.toFixed(2) + "deg");
            el.style.setProperty("--rotY", rotDeg.current.x.toFixed(2) + "deg");

            el.style.setProperty("--bgPosX", bgPos.current.x.toFixed(2) + "%");
            el.style.setProperty("--bgPosY", bgPos.current.y.toFixed(2) + "%");
        });
    }

    const onMouseMove = ({ offsetX, offsetY }) => {
        lerpAmount = 0.1;

        target.forEach((el) => {
            const ox = (offsetX - el.clientWidth * 0.5) / (Math.PI * 3);
            const oy = -(offsetY - el.clientHeight * 0.5) / (Math.PI * 4);

            rotDeg.target = vec2(ox, oy);
            bgPos.target = vec2(-ox * 0.3, oy * 0.3);
        });
    };

    const onMouseLeave = () => {
        lerpAmount = 0.06;

        rotDeg.target = vec2();
        bgPos.target = vec2();
    };

    const addListeners = () => {
        trigger.addEventListener("mousemove", onMouseMove);
        trigger.addEventListener("mouseleave", onMouseLeave);
    };

    const removeListeners = () => {
        trigger.removeEventListener("mousemove", onMouseMove);
        trigger.removeEventListener("mouseleave", onMouseLeave);
    };

    const init = () => {
        addListeners();
        raf.add(ticker);
    };

    const destroy = () => {
        removeListeners();
        raf.remove(rafId);
    };

    init();

    return { destroy, update };
}

function resolveOptions(node, options) {
    return {
        trigger: options?.trigger ?? node,
        target: options?.target
            ? Array.isArray(options.target)
                ? options.target
                : [options.target]
            : [node]
    };
}

function lerpVectors(a, b, t) {
    return vec2(
        lerp(a.x, b.x, t),
        lerp(a.y, b.y, t)
    );
}

function hideLoader() {
    const loader = document.querySelector(".loader");
    loader.style.opacity = 0;
    loader.style.pointerEvents = "none";
}

function initSlider() {
    const slides = [...document.querySelectorAll(".slide")];
    const slidesInfo = [...document.querySelectorAll(".slide-info")];
    const buttons = {
        prev: document.querySelector(".slider--btn__prev"),
        next: document.querySelector(".slider--btn__next")
    };

    slides.forEach((slide, i) => {
        const slideInner = slide.querySelector(".slide__inner");
        const slideInfoInner = slidesInfo[i].querySelector(".slide-info__inner");

        tilt(slide, { target: [slideInner, slideInfoInner] });
    });

    buttons.prev.addEventListener("click", changeSlide(-1));
    buttons.next.addEventListener("click", changeSlide(1));
}

function changeSlide(direction) {
    return () => {
        const current = document.querySelector(".slide[data-current]");
        const previous = document.querySelector(".slide[data-previous]");
        const next = document.querySelector(".slide[data-next]");

        [current, previous, next].forEach((el) => el.removeAttribute("data-current data-previous data-next"));

        let temp;
        if (direction === 1) {
            temp = current;
            current = next;
            next = previous;
            previous = temp;
        } else if (direction === -1) {
            temp = current;
            current = previous;
            previous = next;
            next = temp;
        }

        current.style.zIndex = "20";
        previous.style.zIndex = "10";
        next.style.zIndex = "30";

        [current, previous, next].forEach((el) => el.setAttribute("data-current", ""));
        previous.setAttribute("data-previous", "");
        next.setAttribute("data-next", "");
    };
}

function setupLoader() {
    const loaderText = document.querySelector(".loader__text");

    const images = [...document.querySelectorAll("img")];
    const totalImages = images.length;
    let loadedImages = 0;

    const updateLoader = () => {
        loadedImages++;
        const progressPercent = Math.round((loadedImages / totalImages) * 100);
        loaderText.textContent = `${progressPercent}%`;

        if (loadedImages === totalImages) {
            hideLoader();
            initSlider();
        }
    };

    images.forEach((image) => {
        if (image.complete) {
            updateLoader();
        } else {
            image.addEventListener("load", updateLoader);
            image.addEventListener("error", updateLoader);
        }
    });
}

// Start
setupLoader();
