import { Application } from "pixi.js";
import { screen } from "presentation/application/config/configuration";
import { disableTouchEvent, disableOuterCanvasTouchEvent } from "presentation/helper/disable_touch_event";
import { resizeCanvasAsync } from "presentation/helper/resize_canvas_async";

import { TestScene } from "presentation/scenes/test_scene";
import { ServiceLocator } from "presentation/application/service_locator";

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

  ServiceLocator.setApplication(app);
  const scene = new TestScene();
  scene.fetchStaticResourcesAsync().then(() => {
    scene.initialize();
    app.stage.addChild(scene);
    app.ticker.add(() => scene.update());
  });
}

window.addEventListener("DOMContentLoaded", mainProgram);
