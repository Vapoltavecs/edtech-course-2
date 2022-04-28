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
  const closeModalHandler = () => {
    animateChangeModal(modal, "reverse").addEventListener("finish", () => {
      modalWrapper.classList.remove("active");
    });
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
      closeModalHandler();
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
  changeRateBtn.addEventListener("click", openChangeModal);
  ratesBlock.addEventListener("click", changeCourse);
  const openModalHandler = () => {
    modalWrapper.classList.add("active");
    animateChangeModal(modal);
  };

  openModal1.addEventListener("click", openModalHandler);
  openModal2.addEventListener("click", openModalHandler);
});
