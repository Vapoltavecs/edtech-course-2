const anchors = document.querySelectorAll('a[href*="#"]');
const modalWrapper = document.querySelector(".course__modal");
const modal = modalWrapper.querySelector("form");
const openModal1 = document.querySelector(".sale__card-btn");
const openModal2 = document.querySelector(".sale__card-btn-2");

const scrollToAnchor = (e) => {
  e.preventDefault();
  const { target } = e;
  const id = target.href.substring(target.href.indexOf("#") + 1);
  const elementToScroll = document.getElementById(id);
  window.scrollTo({
    top: elementToScroll.getBoundingClientRect().top + document.body.scrollTop,
    behavior: "smooth",
  });
};

anchors.forEach((el) => el.addEventListener("click", scrollToAnchor));

const swiperJurisprudence = new Swiper(".jurisprudence-slider .swiper", {
  loop: false,
  loopFillGroupWithBlank: true,
  mousewheel: false,

  breakpoints: {
    0: {
      slidesPerView: 1.1,
      spaceBetween: 10,
    },
    500: {
      slidesPerView: 1.7,
      spaceBetween: 20,
    },
    850: {
      slidesPerView: 3,
      spaceBetween: 45,
    },
    1025: {
      slidesPerView: 4,
      spaceBetween: 45,
    },
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

const swiperTwo = new Swiper(".swiperTwo", {
  slidesPerView: 1.25,
  centeredSlides: true,
  spaceBetween: -100,
  loop: true,
  pagination: {
    el: ".swiper-paginationTwo",
    type: "bullets",
    clickable: true,
  },
  breakpoints: {
    700: {
      slidesPerView: 3,
      spaceBetween: -260,
      watchOverflow: true,
      centeredSlides: true,
      loop: true,

      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    },
    1024: {
      slidesPerView: 3,
      loop: false,
      centeredSlides: false,
      spaceBetween: 50,
    },
  },
});

const accord = document.querySelector(".accordion-container");

if (accord) {
  new Accordion(".accordion-container", {
    elementClass: "accord-block",
    triggerClass: "btn-accord",
    panelClass: "accord-bott",
    activeClass: "active-accord",
  });
}

let rates = {
  professional: {
    name: "«Профессионал»",
    duration: 265,
    paymentDuration: 12,
    modules: 10,
    lessons: 26,
    advantagers: [
      "Практические занятия",
      "Участие в профессиональном сообществе обучающихся",
      "Поддержка персонального куратора",
      "Еженедельные созвоны с преподавателем",
      "Проверка домашних заданий",
      "Итоговая аттестация",
      "Удостоверение о повышении квалификации",
      "Доступ к материалам курса навсегда",
    ],
    price: 79000,
  },
  test: {
    name: "«1»",
    duration: 350,
    paymentDuration: 12,
    modules: 10,
    lessons: 26,
    advantagers: [
      "Доступ к видео без удостоверения о повышении квалификации",
      "Видео по 10 модулям курса",
      "Презентации к темам",
      "Поддержка группового куратора",
      "Доступ к материалам курса на 3 года",
    ],
    price: 10900,
  },
  my: {
    name: "«Я сам»",
    duration: 650,
    paymentDuration: 12,
    modules: 10,
    lessons: 26,
    advantagers: [
      "Чат сокурсников",
      "Поддержка группового куратора",
      "Итоговая аттестация",
      "Удостоверение о повышении квалификации",
      "Доступ к материалам курса на 3 года",
    ],
    price: 42900,
  },
};
let currentCourse = "test";

window.addEventListener("DOMContentLoaded", () => {
  const ratesBlock = document.querySelector(".course-change-modal");
  const title = document.querySelector(".course__subtitle-content");
  const name = document.querySelector(".sale__card-title");
  const price = document.querySelector(".course__price-subtitle");
  const priceToMonth = document.querySelector(".course__price-title");
  const duration = document.querySelector(".course__opportunities-text");
  const advantagers = document.querySelector(".advantagers__list");
  const changeRateBtn = document.querySelector(".course__subtitle-icon");
  Object.keys(rates).forEach(
    (el) =>
      (ratesBlock.innerHTML += `<li class="course-modal-item" data-course-name="${el}">Тариф ${rates[el].name}</li>`)
  );
  const convertDate = (hours) => {
    const minuts = hours * 60;
    const days = Math.round(hours / 24);
    const weeks = Math.round(days / 7);
    const months = Math.round(weeks / 4);
    console.log(months);
    return { minuts, days, weeks, months };
  };

  const declinationWeeks = (weeks) => {
    const n = Math.abs(weeks) % 100;
    const n1 = n % 10;
    if (n > 10 && n < 20) {
      return "недели";
    }
    if (n1 > 1 && n1 < 5) {
      return "недель";
    }
    if (n1 == 1) {
      return "неделя";
    }
    return "недели";
  };

  const renderRate = (rate) => {
    title.innerText = "Тариф " + rate.name;
    name.innerText = "Оплатить " + "Тариф " + rate.name;
    price.innerText = rate.price;
    priceToMonth.innerText = Math.round(rate.price / rate.paymentDuration);
    const { weeks } = convertDate(rate.duration);
    duration.innerText = weeks + " " + declinationWeeks(weeks);
    advantagers.innerHTML += `<li><span class="dot"></span>${rate.modules} модулей</li>`;
    advantagers.innerHTML += `<li><span class="dot"></span>${rate.lessons} уроков</li>`;
    rate.advantagers.forEach(
      (el) =>
        (advantagers.innerHTML += `<li><span class="dot"></span>${el}</li>`)
    );
  };
  const resetCourse = () => {
    title.innerText = "";
    name.innerText = "";
    price.innerText = "";
    priceToMonth.innerText = "";
    duration.innerText = "";
    advantagers.innerHTML = "";
  };
  resetCourse();
  renderRate(rates[currentCourse]);

  const animateChangeModal = (element, direction) => {
    return element.animate(
      [
        {
          transform: "translateY(50%) ",
          opacity: 0,
        },
        {
          transform: "translateY(0%)",
          opacity: 1,
        },
      ],
      {
        duration: 200,
        direction,
        fill: "forwards",
      }
    );
  };

  let isOpen = false;

  const openChangeModal = () => {
    if (!isOpen) {
      isOpen = true;
      changeRateBtn.classList.add("active");
      ratesBlock.classList.add("active");
      animateChangeModal(ratesBlock);
    }
  };
  const closeModal = () => {
    if (isOpen) {
      isOpen = false;
      changeRateBtn.classList.remove("active");
      animateChangeModal(ratesBlock, "reverse").addEventListener(
        "finish",
        () => {
          ratesBlock.classList.remove("active");
        }
      );
    }
  };
  const closeModalHandler = (e) => {
    const path = e.path || (e.composedPath && e.composedPath());
    const { target } = e;

    if (
      !target.classList.contains("sale__card-btn") &&
      !target.classList.contains("sale__card-btn-2") &&
      !path.some((el) => el.classList && el.classList.contains("form"))
    ) {
      animateChangeModal(modal, "reverse").addEventListener("finish", () => {
        modalWrapper.classList.remove("active");
      });
    }
  };
  const closeModalListener = (e) => {
    const { target } = e;
    const path = e.path || (e.composedPath && e.composedPath());
    if (
      !target.classList.contains("course-change-modal") &&
      !path
        .filter((el) => el.classList)
        .some((el) => el.classList.contains("course__subtitle-icon")) &&
      !target.classList.contains("sale__card-btn") &&
      !target.classList.contains("sale__card-btn-2")
    ) {
      closeModal();
    }
  };

  const changeCourse = (e) => {
    if (e.target.classList.contains("course-modal-item")) {
      const course = e.target.getAttribute("data-course-name");
      if (course) {
        resetCourse();
        renderRate(rates[course]);
        closeModal();
      }
    }
  };

  window.addEventListener("click", closeModalListener);
  window.addEventListener("click", closeModalHandler);
  changeRateBtn.addEventListener("click", openChangeModal);
  ratesBlock.addEventListener("click", changeCourse);
  const openModalHandler = () => {
    modalWrapper.classList.add("active");
    animateChangeModal(modal);
  };

  openModal1.addEventListener("click", openModalHandler);
  openModal2.addEventListener("click", openModalHandler);
});

const burger = document.querySelector(".burger");
const menu = document.querySelector(".header__menu-mobile");
const infoBtns = document.querySelectorAll(".team__info");

document.addEventListener("DOMContentLoaded", () => {
  const animate = (target, direction, duration = 300) =>
    target.animate(
      [
        { transfrom: "translateX(-50%) translateY(100%)", opacity: 0 },
        { transfrom: "translateX(-50%) translateY(0%)", opacity: 1 },
      ],
      { duration, direction, fill: "forwards" }
    );

  burger.addEventListener("click", () => {
    menu.classList.toggle("active");
    burger.classList.toggle("active");
  });
  const scrollToAnchor = (e) => {
    const { target } = e;
    const { href } = target;
    if (href) {
      const isAnchor = href.indexOf("#");
      if (isAnchor !== -1) {
        console.log(href);
        e.preventDefault();
        const id = href.substring(isAnchor + 1);
        const elem = document.getElementById(id);
        window.scrollTo({
          behavior: "smooth",
          top: elem.getBoundingClientRect().top + 300 + document.body.scrollTop,
        });
      }
    }
  };
  window.addEventListener("click", scrollToAnchor);
});

class Slider {
  constructor(params, selector) {
    this.keyframes = params.effects;
    this.slider = document.querySelector(selector);
    this.slides = this.slider.querySelectorAll(".team__slide");

    this.prevEl = document.querySelectorAll(".team__prev");

    this.nextEl = document.querySelectorAll(".team__next");
    this._currentSlide = 0;
  }

  next() {
    const prevSlide = this.slides[this._currentSlide];
    if (this._currentSlide >= this.slides.length - 1) this._currentSlide = -1;
    this._currentSlide++;
    const currentSlide = this.slides[this._currentSlide];

    currentSlide.classList.add("active");
    this.toggleAnim(currentSlide, prevSlide).addEventListener("finish", () =>
      prevSlide.classList.remove("active")
    );
  }
  prev() {
    const prevSlide = this.slides[this._currentSlide];
    if (this._currentSlide <= 0) this._currentSlide = this.slides.length;
    this._currentSlide--;
    const currentSlide = this.slides[this._currentSlide];

    currentSlide.classList.add("active");
    this.togglePrevAnim(prevSlide, currentSlide).addEventListener(
      "finish",
      () => prevSlide.classList.remove("active")
    );
  }
  toggleAnim(show, hide, direction) {
    const showKeyframes = [{ left: "100%" }, { left: "0%" }];
    const hideKeyframes = matchMedia("(max-width: 650px)").matches
      ? [{ left: "0%" }, { left: "-100%" }]
      : [{ left: "0%" }, { left: "10%", offset: 0.1 }, { left: "-100%" }];
    const options = {
      duration: 500,
      direction,
      fill: "forwards",
    };
    show.animate(this.keyframes || showKeyframes, {
      ...options,
    });
    return hide.animate(hideKeyframes, { ...options });
  }
  togglePrevAnim(show, hide, direction) {
    const showKeyframes = matchMedia("(max-width: 650px)").matches
      ? [{ left: "0%" }, { left: "100%" }]
      : [{ left: "0%" }, { left: "-10%", offset: 0.1 }, { left: "100%" }];
    const hideKeyframes = [{ left: "-100%" }, { left: "0%" }];
    const options = {
      duration: 500,
      direction,
      fill: "forwards",
    };
    show.animate(this.keyframes || showKeyframes, {
      ...options,
    });
    return hide.animate(hideKeyframes, { ...options });
  }
  init() {
    this.slides[0].classList.add("active");

    this.nextEl?.forEach((el) =>
      el.addEventListener("click", this.next.bind(this))
    );
    this.prevEl?.forEach((el) =>
      el.addEventListener("click", this.prev.bind(this))
    );
  }
}

const slider = new Slider({}, ".team__slider");
slider.init();

infoBtns.forEach((el) => {
  const modal = el.querySelector(".team__modal");
  const closeInfoModalBtn = el.querySelector(".cross");

  el.addEventListener("click", (e) => {
    if (
      !e.target.classList.contains("cross") &&
      !e.target.classList.contains("team__modal")
    ) {
      modal.classList.toggle("active");
      modal.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: 300,
        fill: "forwards",
      });
    }
  });
  closeInfoModalBtn.addEventListener("click", (e) => {
    console.log(e);
    modal.classList.remove("active");
  });
});
