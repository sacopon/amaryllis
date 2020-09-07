import { Sprite, Graphics } from "pixi.js";
import { BaseScene } from "presentation/scenes/base_scene";
import { screen } from "presentation/application/config/configuration";
import { TouchInputLayer } from "presentation/views/touch_input_layer";

export class TestScene extends BaseScene {
  private state = 0;
  private sprite: Sprite | null = null;
  private touchLayer: TouchInputLayer | null = null;

  public constructor() {
    super();
  }

  public initialize() {
    const g = new Graphics();
    g.beginFill(0xff00ff);
    g.drawRect(
      Math.floor(-screen.resolution.width / 2),
      Math.floor(-screen.resolution.height / 2),
      screen.resolution.width,
      screen.resolution.height
    );
    g.endFill();
    this.addChild(g);

    const sprite = Sprite.from("yusha4_down_0.png");
    this.addChild(sprite);

    const touchLayer = new TouchInputLayer();
    this.addChild(touchLayer);

    this.sprite = sprite;
    this.touchLayer = touchLayer;
  }

  public update() {
    if (!this.touchLayer) {
      return;
    }

    if (this.touchLayer.getDirection() === TouchInputLayer.Direction.NEUTRAL) {
      return;
    }

    const rad = this.touchLayer.getRadian();
    this.sprite!.x += Math.cos(rad) * 8;
    this.sprite!.y += Math.sin(rad) * 8;
  }

  public fetchStaticResourcesAsync() {
    const url = `${window.location.origin}/assets/images/images.json`;
    this._app.loader.add(url);

    return new Promise<void>((resolve) => {
      this._app.loader.load(() => resolve());
    });
  }
}
