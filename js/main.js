function init() {
  const toggles = document.querySelectorAll(".toggle");

  function handleToggle(toggle) {
    const target_id = toggle.dataset.target;

    const target = document.getElementById(target_id);
    const click_to_close = document.querySelector(
      `[data-toggle="${target_id}"]`
    );

    function updateState() {
      toggle.classList.toggle("open");
      target.classList.toggle("open");
      click_to_close.classList.toggle("open");
    }

    toggle.addEventListener("click", updateState);
    click_to_close.addEventListener("click", updateState);
  }

  toggles.forEach((toggle) => handleToggle(toggle));

  const to_top = document.querySelector(".to-top");

  function handleToTop() {
    if (window.scrollY > 50) {
      to_top.classList.add("visible");
    } else {
      to_top.classList.remove("visible");
    }
  }

  to_top && handleToTop();

  to_top && window.addEventListener("scroll", handleToTop);

  /*
   *   This code is adapted from the Accordion Pattern found here:
   *   https://www.w3.org/WAI/ARIA/apg/patterns/accordion/
   *
   *   This content is licensed according to the W3C Software License at
   *   https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
   *
   *   Simple accordion pattern example
   */

  ("use strict");

  class Accordion {
    constructor(domNode) {
      this.rootEl = domNode;
      this.buttonEl = this.rootEl.querySelector("button[aria-expanded]");

      const controlsId = this.buttonEl.getAttribute("aria-controls");
      this.contentEl = document.getElementById(controlsId);

      this.open = this.buttonEl.getAttribute("aria-expanded") === "true";

      // add event listeners
      this.buttonEl.addEventListener("click", this.onButtonClick.bind(this));
    }

    onButtonClick() {
      this.toggle(!this.open);
    }

    toggle(open) {
      // don't do anything if the open state doesn't change
      if (open === this.open) {
        return;
      }

      // update the internal state
      this.open = open;

      // handle DOM updates
      this.buttonEl.setAttribute("aria-expanded", `${open}`);
      if (open) {
        this.contentEl.removeAttribute("hidden");
      } else {
        this.contentEl.setAttribute("hidden", "true");
      }
    }

    // Add public open and close methods for convenience
    open() {
      this.toggle(true);
    }

    close() {
      this.toggle(false);
    }
  }

  // init accordions
  const accordions = document.querySelectorAll(".accordion h3");
  accordions.forEach((accordionEl) => {
    new Accordion(accordionEl);
  });
}

document.addEventListener("DOMContentLoaded", init);
