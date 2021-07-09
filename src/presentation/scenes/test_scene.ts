import { Graphics, Texture } from "pixi.js";
import { BackgroundData } from "presentation/views/bg/background_data";
import { BaseScene } from "presentation/scenes/base_scene";
import { screen } from "presentation/application/config/configuration";
import { TouchInputLayer } from "presentation/views/touch_input_layer";
import { CharacterView } from "presentation/views/character_view";
import { BackgroundView } from "presentation/views/bg/background_view";
import { Direction } from "presentation/application/common/constants";
import { FieldMapView } from "presentation/views/field_map_view";

export class TestScene extends BaseScene {
  private character: CharacterView | null = null;
  private background: FieldMapView | null = null;
  private touchLayer: TouchInputLayer | null = null;

  private backgroundScrollX = 0;
  private backgroundScrollY = 0;

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

    // const mapData = [
    //   2, 2, 2, 2, 2, 2, 2,
    //   2, 1, 1, 1, 1, 1, 2,
    //   2, 1, 0, 0, 0, 1, 2,
    //   2, 1, 0, 3, 0, 1, 2,
    //   2, 1, 0, 0, 0, 1, 2,
    //   2, 1, 1, 1, 1, 1, 2,
    //   2, 2, 2, 2, 2, 2, 2,
    // ];

    // const background = new BackgroundView(
    //   new BackgroundData(mapData, 80, 80, 7, 7),
    //   screen.resolution.width,
    //   screen.resolution.height
    // );
    const fieldMapView = new FieldMapView();
    this.addChild(fieldMapView);

    const character = new CharacterView({
      up: [Texture.from("yusha4_up_0.png"), Texture.from("yusha4_up_1.png")],
      down: [Texture.from("yusha4_down_0.png"), Texture.from("yusha4_down_1.png")],
      left: [Texture.from("yusha4_left_0.png"), Texture.from("yusha4_left_1.png")],
      right: [Texture.from("yusha4_right_0.png"), Texture.from("yusha4_right_1.png")],
    });
    character.setDirection(Direction.NEUTRAL);
    this.addChild(character);

    const touchLayer = new TouchInputLayer();
    touchLayer.on("tap", () => console.log("tap"));
    this.addChild(touchLayer);

    this.character = character;
    this.background = fieldMapView;
    this.touchLayer = touchLayer;
  }

  public update() {
    this.character?.update();

    if (!this.touchLayer) {
      return;
    }

    if (this.touchLayer.getDirection() === Direction.NEUTRAL) {
      return;
    }

    // 位置
    const rad = this.touchLayer.getRadian();
    this.backgroundScrollX += Math.cos(rad) * 4;
    this.backgroundScrollY += Math.sin(rad) * 4;
    this.background!.setScrollPosition(this.backgroundScrollX, this.backgroundScrollY);

    // 姿勢(アニメーション)
    this.character!.setDirection(this.touchLayer.getDirection());
  }

  public fetchStaticResourcesAsync() {
    const urls = [
      `${window.location.origin}/assets/images/images.json`,
      `${window.location.origin}/assets/images/tileset.json`,
    ];
    this._app.loader.add(urls);

    return new Promise<void>((resolve) => {
      this._app.loader.load(() => resolve());
    });
  }
}
