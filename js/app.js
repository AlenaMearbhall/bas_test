(() => {
    "use strict";
    const modules_flsModules = {};
    function isWebp() {
        function testWebP(callback) {
            let webP = new Image;
            webP.onload = webP.onerror = function() {
                callback(webP.height == 2);
            };
            webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
        }
        testWebP((function(support) {
            let className = support === true ? "webp" : "no-webp";
            document.documentElement.classList.add(className);
        }));
    }
    class Parallax {
        constructor(elements) {
            if (elements.length) this.elements = Array.from(elements).map((el => new Parallax.Each(el, this.options)));
        }
        destroyEvents() {
            this.elements.forEach((el => {
                el.destroyEvents();
            }));
        }
        setEvents() {
            this.elements.forEach((el => {
                el.setEvents();
            }));
        }
    }
    Parallax.Each = class {
        constructor(parent) {
            this.parent = parent;
            this.elements = this.parent.querySelectorAll("[data-prlx]");
            this.animation = this.animationFrame.bind(this);
            this.offset = 0;
            this.value = 0;
            this.smooth = parent.dataset.prlxSmooth ? Number(parent.dataset.prlxSmooth) : 15;
            this.setEvents();
        }
        setEvents() {
            this.animationID = window.requestAnimationFrame(this.animation);
        }
        destroyEvents() {
            window.cancelAnimationFrame(this.animationID);
        }
        animationFrame() {
            const topToWindow = this.parent.getBoundingClientRect().top;
            const heightParent = this.parent.offsetHeight;
            const heightWindow = window.innerHeight;
            const positionParent = {
                top: topToWindow - heightWindow,
                bottom: topToWindow + heightParent
            };
            const centerPoint = this.parent.dataset.prlxCenter ? this.parent.dataset.prlxCenter : "center";
            if (positionParent.top < 30 && positionParent.bottom > -30) switch (centerPoint) {
              case "top":
                this.offset = -1 * topToWindow;
                break;

              case "center":
                this.offset = heightWindow / 2 - (topToWindow + heightParent / 2);
                break;

              case "bottom":
                this.offset = heightWindow - (topToWindow + heightParent);
                break;
            }
            this.value += (this.offset - this.value) / this.smooth;
            this.animationID = window.requestAnimationFrame(this.animation);
            this.elements.forEach((el => {
                const parameters = {
                    axis: el.dataset.axis ? el.dataset.axis : "v",
                    direction: el.dataset.direction ? el.dataset.direction + "1" : "-1",
                    coefficient: el.dataset.coefficient ? Number(el.dataset.coefficient) : 5,
                    additionalProperties: el.dataset.properties ? el.dataset.properties : ""
                };
                this.parameters(el, parameters);
            }));
        }
        parameters(el, parameters) {
            if (parameters.axis == "v") el.style.transform = `translate3D(0, ${(parameters.direction * (this.value / parameters.coefficient)).toFixed(2)}px,0) ${parameters.additionalProperties}`; else if (parameters.axis == "h") el.style.transform = `translate3D(${(parameters.direction * (this.value / parameters.coefficient)).toFixed(2)}px,0,0) ${parameters.additionalProperties}`;
        }
    };
    if (document.querySelectorAll("[data-prlx-parent]")) modules_flsModules.parallax = new Parallax(document.querySelectorAll("[data-prlx-parent]"));
    let addWindowScrollEvent = false;
    setTimeout((() => {
        if (addWindowScrollEvent) {
            let windowScroll = new Event("windowScroll");
            window.addEventListener("scroll", (function(e) {
                document.dispatchEvent(windowScroll);
            }));
        }
    }), 0);
    document.addEventListener("DOMContentLoaded", (() => {
        (new WOW).init();
        const swiperSmall = new Swiper(".single-offer__slider-small", {
            slidesPerView: 4,
            spaceBetween: 34,
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev"
            },
            breakpoints: {
                320: {
                    slidesPerView: 2
                },
                480: {
                    slidesPerView: 3
                },
                640: {
                    slidesPerView: 3
                },
                1076: {
                    slidesPerView: 4
                }
            }
        });
        new Swiper(".single-offer__slider-big", {
            slidesPerView: 1,
            spaceBetween: 10,
            thumbs: {
                swiper: swiperSmall
            }
        });
        function burgerClick() {
            const burger = document.querySelector(".header__burger");
            const menu = document.querySelector(".header__nav");
            const body = document.body;
            const header = document.querySelector(".header");
            const menuMobile = document.createElement("div");
            menuMobile.classList.add("menu-mobile");
            if (burger) {
                burger.addEventListener("click", (() => {
                    burger.classList.toggle("_active");
                    body.classList.toggle("_active");
                    menuMobile.classList.toggle("_active");
                    header.classList.toggle("_active");
                }));
                if (document.documentElement.clientWidth <= 768) {
                    burger.insertAdjacentElement("afterend", menuMobile);
                    menuMobile.insertAdjacentElement("beforeend", menu);
                }
            }
        }
        burgerClick();
        function footerItemAppend() {
            const lastMobile = document.querySelector("._lastMobile");
            const copyright = document.querySelector(".footer__copy");
            const nav = document.querySelector(".footer__nav");
            if (nav) {
                const navItem = document.createElement("div");
                navItem.classList.add("footer__nav-item", "footer__nav-item-mobile");
                const navItemUl = document.createElement("ul");
                navItemUl.classList.add("molibe-ul");
                navItem.append(navItemUl);
                if (document.documentElement.clientWidth <= 768) {
                    nav.append(navItem);
                    navItemUl.append(lastMobile);
                    navItem.append(copyright);
                }
            }
        }
        footerItemAppend();
        function appendItems() {
            const cultureTitels = document.querySelectorAll(".culture-description__info h2");
            const cultureImages = document.querySelectorAll(".culture-description__image img");
            if (cultureTitels.length > 0) cultureTitels.forEach(((cultureTitel, i) => {
                if (document.documentElement.clientWidth <= 992) cultureTitel.insertAdjacentElement("afterend", cultureImages[i]);
            }));
        }
        appendItems();
        function faqItemsClick() {
            const faqItems = document.querySelectorAll(".leading-faq__item");
            if (faqItems.length > 0) faqItems.forEach((faqItem => {
                const faqItemBody = faqItem.querySelector(".leading-faq__body");
                let bodyHeight = faqItemBody.clientHeight;
                faqItemBody.style.height = "0px";
                faqItem.addEventListener("click", (() => {
                    faqItem.classList.toggle("_active");
                    if (faqItem.classList.contains("_active")) faqItemBody.style.height = `${bodyHeight}px`; else faqItemBody.style.height = "0px";
                }));
            }));
        }
        faqItemsClick();
        function tabSolutionHide(tabs, contents) {
            tabs.forEach((tab => {
                tab.classList.remove("_active");
            }));
            contents.forEach((content => {
                content.classList.remove("_active");
            }));
        }
        function tabSolutionClick() {
            const tabs = document.querySelectorAll(".single-content__tab");
            const contents = document.querySelectorAll(".single-content__content");
            if (tabs.length > 0) {
                tabs[0].classList.add("_active");
                contents[0].classList.add("_active");
                tabs.forEach(((tab, i) => {
                    tab.addEventListener("click", (() => {
                        tabSolutionHide(tabs, contents);
                        tab.classList.add("_active");
                        if (contents[i]) contents[i].classList.add("_active");
                    }));
                }));
            }
        }
        tabSolutionClick();
        function singlePageFormSelectBodyItems(selectItemBody, selectItemsHeaderTitle, selectItems) {
            const selectItemsBodyItems = selectItemBody.querySelectorAll(".single-offer__form-item");
            const selectItemsBodyItemsSpan = selectItemBody.querySelectorAll(".single-offer__form-item span");
            const selectItemsInput = selectItems.querySelector(".single-offer__form-select input");
            selectItemsBodyItems.forEach(((selectItemsBodyItem, i) => {
                selectItemsBodyItem.addEventListener("click", (() => {
                    selectItemsHeaderTitle.textContent = selectItemsBodyItem.textContent;
                    selectItemsBodyItem.parentElement.classList.remove("_active");
                    selectItemsInput.value = selectItemsBodyItem.textContent.trim();
                    if (selectItemsBodyItemsSpan[i]) {
                        let cloneSelectItemsBodyItemsSpan = selectItemsBodyItemsSpan[i].cloneNode();
                        selectItemsHeaderTitle.append(cloneSelectItemsBodyItemsSpan);
                    }
                }));
            }));
            selectItemsHeaderTitle.textContent = selectItemsBodyItems[0].textContent;
            selectItemsInput.value = selectItemsBodyItems[0].textContent.trim();
            if (selectItemsBodyItemsSpan[0]) {
                let cloneSelectItemsBodyItemsSpan = selectItemsBodyItemsSpan[0].cloneNode();
                selectItemsHeaderTitle.append(cloneSelectItemsBodyItemsSpan);
            }
        }
        function singlePageFormSelect() {
            const selectItems = document.querySelectorAll(".single-offer__form-select");
            const selectItemsHeader = document.querySelectorAll(".single-offer__form-select-header");
            const selectItemsBody = document.querySelectorAll(".single-offer__form-body");
            if (selectItemsHeader.length > 0) selectItemsHeader.forEach(((selectItemHeader, i) => {
                const selectItemsHeaderTitle = selectItemHeader.querySelector(".single-offer__form-title");
                singlePageFormSelectBodyItems(selectItemsBody[i], selectItemsHeaderTitle, selectItems[i]);
                selectItemHeader.addEventListener("click", (() => {
                    selectItemsBody[i].classList.toggle("_active");
                }));
            }));
        }
        singlePageFormSelect();
        function headerLinkClick() {
            const headerLinks = document.querySelectorAll("._header-items");
            const links = document.querySelectorAll(".header__nav-link-arrow");
            const linkParent = document.querySelector(".header__nav-link-parent");
            const fixed = document.querySelector(".header__fixed");
            const fixedClose = document.querySelector(".header__fixed-close");
            const body = document.body;
            if (headerLinks.length > 0) {
                if (linkParent) if (document.documentElement.clientWidth >= 768) {
                    if (linkParent.classList.contains("header__nav-link-arrow")) linkParent.classList.remove("header__nav-link-arrow");
                    linkParent.addEventListener("click", (e => {
                        e.preventDefault();
                        linkParent.nextElementSibling.classList.add("_active");
                        fixed.classList.add("_active");
                        body.classList.add("_active");
                    }));
                    fixedClose.addEventListener("click", (e => {
                        linkParent.nextElementSibling.classList.remove("_active");
                        fixed.classList.remove("_active");
                        body.classList.remove("_active");
                    }));
                }
                links.forEach((link => {
                    link.addEventListener("click", (e => {
                        e.preventDefault();
                        link.nextElementSibling.classList.toggle("_active");
                        link.classList.toggle("_active");
                    }));
                }));
            }
        }
        headerLinkClick();
        function messageFormData() {
            const message = {
                loading: "loading ....",
                succes: "Thanks! Your application has been sent",
                failure: "Something went wrong... Try again later"
            };
            return message;
        }
        function sendMail(selectorForm, selectorWrapper) {
            const form = document.querySelector(selectorForm);
            const wrapper = document.querySelector(selectorWrapper);
            if (form) {
                console.log(form);
                form.addEventListener("submit", formSend);
                async function formSend(e) {
                    e.preventDefault();
                    let status = document.createElement("div");
                    status.classList.add("_status");
                    wrapper.appendChild(status);
                    let formData = new FormData(form);
                    let response = await fetch("sendmail.php", {
                        method: "POST",
                        body: formData
                    });
                    if (response.ok) {
                        await response.json();
                        status.textContent = messageFormData().succes;
                        status.style.color = "green";
                        form.reset();
                    } else {
                        status.textContent = messageFormData().failure;
                        status.style.color = "red";
                    }
                }
            }
        }
        sendMail(".single-offer__forms form", ".single-offer__forms");
        sendMail(".contacts-form__wrapper form", ".contacts-form__wrapper");
        window.onloadTurnstileCallback = function() {
            turnstile.render("#example-container", {
                sitekey: "0x4AAAAAAAD4HWy6LqQGBFbF",
                callback: function(token) {
                    console.log(`Challenge Success ${token}`);
                }
            });
        };
    }));
    window["FLS"] = true;
    isWebp();
})();