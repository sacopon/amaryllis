function disableTouchEvent(dom: HTMLElement) {
  const disableEventFunc = (e?: Event) => {
    if (!e) {
      return false;
    }

    if (e.preventDefault) {
      e.preventDefault();
    }

    if (e.stopPropagation) {
      e.stopPropagation();
    }

    return false;
  };

  dom.addEventListener("touchstart", disableEventFunc);
  dom.addEventListener("touchmove", disableEventFunc);
  dom.addEventListener("touchend", disableEventFunc);
  dom.addEventListener("pointerdown", disableEventFunc);
  dom.addEventListener("pointerup", disableEventFunc);
  dom.addEventListener("wheel", disableEventFunc);
}

function disableOuterCanvasTouchEvent() {
  const div = window.document.createElement("div");
  div.id = "disable-outer-canvas-touch-event";
  div.style.left = "0px";
  div.style.top = "0px";
  div.style.width = "100%";
  div.style.height = "100%";
  div.style.position = "fixed";
  div.style.zIndex = "-1000";
  disableTouchEvent(div);
  window.document.body.appendChild(div);
}

export { disableTouchEvent, disableOuterCanvasTouchEvent };
