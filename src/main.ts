import { Application, Ticker } from "pixi.js";
import { screen } from "presentation/application/config/configuration";
import { disableTouchEvent, disableOuterCanvasTouchEvent } from "presentation/helper/disable_touch_event";
import { resizeCanvasAsync } from "presentation/helper/resize_canvas_async";

import { TestScene } from "presentation/scenes/test_scene";
import { ServiceLocator, ServiceLocatorImpl } from "presentation/application/service_locator";
import { CharacterAnimationCounter } from "presentation/application/character_animation_counter";

async function mainProgram() {
  const app = new Application({
    width: screen.resolution.width,
    height: screen.resolution.height,
    transparent: false,
  });

  window.addEventListener("resize", () => {
    resizeCanvasAsync(app.view, screen.resolution.width, screen.resolution.height);
  });

  await resizeCanvasAsync(app.view, screen.resolution.width, screen.resolution.height);
  disableOuterCanvasTouchEvent();
  disableTouchEvent(app.view);
  document.body.appendChild(app.view);

  ServiceLocatorImpl.setApplication(app);
  ServiceLocatorImpl.setAnimationCounter(new CharacterAnimationCounter(Ticker.shared.deltaMS));

  const scene = new TestScene();
  scene.fetchStaticResourcesAsync().then(() => {
    scene.initialize();
    app.stage.addChild(scene);
    app.ticker.add(() => {
      ServiceLocator.getAnimationCounterTicker().tick(Ticker.shared.deltaMS);
      scene.update();
    });
  });
}

window.addEventListener("DOMContentLoaded", mainProgram);
