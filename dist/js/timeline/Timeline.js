class Timeline {
  constructor() {
    this.timelineData = timelineData;
    this.currentCategory = "education";
    this.currentFirstItem = 0;
    this._renderFirstTime();
  }

  _getCurrentFirstItem = () => this.currentFirstItem;

  _setCurrentFirstItem = (number) => {
    this.currentFirstItem = number;
  };

  _generateTimelineItems = () => {
    const items = [];
    this.timelineData[this.currentCategory].forEach((item, index) => {
      items.push(
        this._createTimelineItem(index, item.date, item.title, item.no)
      );
    });
    document.querySelector(".timeline").innerHTML += items.join("");
  };

  _createTimelineItem = (itemIndex, date, title, itemNo) => {
    return `
    <li class="${this._setTimelineItemStyle(
      itemIndex
    )}" style="left: ${this._setTimelineAlign(itemIndex)}vw;">
    <span class="timeline-date">${date}</span
    ><span class="timeline-title"
      >${title}</span
    ><button class="timeline-more" data-index="${itemNo}">More...</button>
  </li>`;
  };

  _resetTimelineStyles = () => {
    const items = Array.from(document.querySelector(".timeline").children);
    items.forEach((item) => (item.className = ""));
  };

  _setTimelineAlign = (itemIndex) => {
    return 2 + 24 * itemIndex;
  };

  _setTimelineItemStyle = (itemIndex) => {
    const itemPosition = itemIndex % 2 === 0 ? "item-top" : "item-bottom";
    return itemPosition;
  };

  _setAgainTimelineStyles = () => {
    const items = Array.from(document.querySelector(".timeline").children);
    items.forEach((item, index) => {
      item.style.cssText += `transform:translateX(${
        24 * -this.currentFirstItem
      }vw); transition-duration: .3s;`;
    });
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

  _removeItems() {
    document.querySelector(".timeline").innerHTML = "";
  }

  _renderFirstTime = () => {
    if (this._removeItems()) _removeItems();
    this._generateTimelineItems();
    this._setButtonBlocked();
    this._setButtonActive();
    this._startEventListener();
  };

  _render = () => {
    this._setAgainTimelineStyles();
    this._setButtonBlocked();
    this._setButtonActive();
  };
}
const t = new Timeline();
