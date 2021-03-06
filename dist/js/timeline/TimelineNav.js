class TimelineNav {
  constructor() {
    this.currentCategory = "education";
    this.currentFirstItem = 0;
  }

  getCurrentCategory = () => this.currentCategory;

  setCurrentCategory = (category) => {
    this.currentCategory = category;
  };

  getCurrentFirstItem = () => this.currentFirstItem;

  setCurrentFirstItem = (number) => {
    this.currentFirstItem = number;
  };

  _setButtonActive = () => {
    this._removeButtonClass("btn-white-active");
    const button = Array.from(document.querySelectorAll(".btn-white")).find(
      (item) => {
        return item.innerText === this.currentCategory.toUpperCase();
      }
    );
    if (button) button.classList.add("btn-white-active");
  };

  _setButtonBlocked = () => {
    this._removeButtonClass("btn-white-blocked");
    this._setArrowLeftButtonBlocked();
    this._setArrowRightButtonBlocked();
  };

  _setArrowLeftButtonBlocked = () => {
    document.querySelector(".fa-arrow-left").closest("button").className +=
      this.currentFirstItem === 0 ? " btn-white-blocked" : "";
  };

  _setArrowRightButtonBlocked = () => {
    document.querySelector(".fa-arrow-right").closest("button").className +=
      this.currentFirstItem + 4 ===
      this.timelineData[this.currentCategory].length
        ? " btn-white-blocked"
        : "";
  };

  _removeButtonClass = (buttonClass) => {
    if (document.querySelector("." + buttonClass)) {
      document.querySelectorAll("." + buttonClass).forEach((className) => {
        className.classList.remove(buttonClass);
      });
    }
  };

  _nextItem = () => {
    const button = document.querySelector(".fa-arrow-right").parentElement;
    if (!button.classList.contains("btn-white-blocked")) {
      const newFirstItem = this._getCurrentFirstItem() + 1;
      this._setCurrentFirstItem(newFirstItem);
      this._render();
    }
  };

  _prevItem = () => {
    const button = document.querySelector(".fa-arrow-left").parentElement;
    if (!button.classList.contains("btn-white-blocked")) {
      const newFirstItem = this._getCurrentFirstItem() - 1;
      this._setCurrentFirstItem(newFirstItem);
      this._render();
    }
  };

  _setCategory = (e) => {
    this.currentCategory = e.target.innerText
      ? e.target.innerText.toLowerCase()
      : e.target.parentElement.innerText.toLowerCase();
    this._setCurrentFirstItem(0);
    this._renderFirstTime();
  };

  _startEventListenerForCategory = () => {
    const buttons = document.querySelectorAll(".category-button");
    buttons.forEach((button) =>
      button.addEventListener("click", this._setCategory)
    );
  };

  _startEventListener = () => {
    const buttonRight = document.querySelector(".fa-arrow-right").parentElement;
    buttonRight.addEventListener("click", this._nextItem);
    const buttonLeft = document.querySelector(".fa-arrow-left").parentElement;
    buttonLeft.addEventListener("click", this._prevItem);
    this._startEventListenerForCategory();
  };
}
