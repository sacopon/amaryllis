import { Graphics } from "pixi.js";
import { BaseScene } from "presentation/scenes/base_scene";
import { screen } from "presentation/application/config/configuration";
import { TouchInputLayer } from "presentation/views/touch_input_layer";
import { CharacterView } from "presentation/views/character/character_view";
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

    const fieldMapView = new FieldMapView();
    this.addChild(fieldMapView);

    const character = new CharacterView(0);
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

    return this.fetchResources(urls);
  }
}
