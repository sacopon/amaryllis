import { Graphics, Texture } from "pixi.js";
import { BaseScene } from "presentation/scenes/base_scene";
import { screen } from "presentation/application/config/configuration";
import { TouchInputLayer } from "presentation/views/touch_input_layer";
import { CharacterView } from "presentation/views/character_view";
import { Direction } from "presentation/application/common/constants";

export class TestScene extends BaseScene {
  private character: CharacterView | null = null;
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

    const character = new CharacterView({
      up: Texture.from("yusha4_up_0.png"),
      down: Texture.from("yusha4_down_0.png"),
      left: Texture.from("yusha4_left_0.png"),
      right: Texture.from("yusha4_right_0.png"),
    });
    character.setDirection(Direction.NEUTRAL);
    this.addChild(character);

    const touchLayer = new TouchInputLayer();
    touchLayer.on("tap", () => console.log("tap"));
    this.addChild(touchLayer);

    this.character = character;
    this.touchLayer = touchLayer;
  }

  public update() {
    if (!this.touchLayer) {
      return;
    }

    if (this.touchLayer.getDirection() === Direction.NEUTRAL) {
      return;
    }

    // 位置
    const rad = this.touchLayer.getRadian();
    this.character!.x += Math.cos(rad) * 8;
    this.character!.y += Math.sin(rad) * 8;

    // 姿勢(アニメーション)
    this.character!.setDirection(this.touchLayer.getDirection());
  }

  public fetchStaticResourcesAsync() {
    const url = `${window.location.origin}/assets/images/images.json`;
    this._app.loader.add(url);

    return new Promise<void>((resolve) => {
      this._app.loader.load(() => resolve());
    });
  }
}
