import { Application, Graphics, Sprite } from "pixi.js";
import { screen } from "presentation/application/config/configuration";
import { disableTouchEvent, disableOuterCanvasTouchEvent } from "presentation/helper/disable_touch_event";
import { resizeCanvasAsync } from "presentation/helper/resize_canvas_async";

async function mainProgram() {
  const app = new Application({
    width: screen.resolution.width,
    height: screen.resolution.height,
    transparent: false,
  });

  window.addEventListener("resize", () => {
    resizeCanvasAsync(app.view);
  });

  await resizeCanvasAsync(app.view);
  disableOuterCanvasTouchEvent();
  disableTouchEvent(app.view);
  document.body.appendChild(app.view);

  // NOTE: use sprite sample.
  const url = `${window.location.origin}/assets/images/images.json`;
  app.loader.add(url);
  app.loader.load(() => {
    const sprite = Sprite.from("yusha4_down_0.png");
    sprite.x = screen.resolution.width - sprite.width;
    app.stage.addChild(sprite);
  });

  const g = new Graphics();
  g.beginFill(0xff00ff);
  g.drawRect(0, 0, screen.resolution.width, screen.resolution.height);
  g.endFill();
  app.stage.addChild(g);
}

window.addEventListener("DOMContentLoaded", mainProgram);
