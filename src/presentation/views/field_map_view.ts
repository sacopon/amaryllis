import { Container } from "pixi.js";
import { BackgroundView } from "./bg/background_view";
import { BackgroundData } from "./bg/background_data";
import { FieldMap } from "domain/model/fieldmap/field_map";
import { screen } from "presentation/application/config/configuration";
import { ChipSet, HitAttributeType } from "domain/model/fieldmap/chip_set";

export class FieldMapView extends Container {
  private _fieldMap: FieldMap;
  private _backgroundView: BackgroundView;

  constructor() {
    super();

    // TODO: 定義データを JSON からロードする機構
    const chipWidth = 80;
    const chipHeight = 80;
    const mapData = [
      2, 2, 2, 2, 2, 2, 2,
      2, 1, 1, 1, 1, 1, 2,
      2, 1, 0, 0, 0, 1, 2,
      2, 1, 0, 3, 0, 1, 2,
      2, 1, 0, 0, 0, 1, 2,
      2, 1, 1, 1, 1, 1, 2,
      2, 2, 2, 2, 2, 2, 2,
    ];
    const width = 7;
    const height = 7;
    const chipSet = new ChipSet([
      { resource: "grass.png", hitAttribute: HitAttributeType.WALK },
      { resource: "bush.png", hitAttribute: HitAttributeType.WALK },
      { resource: "sandhill.png", hitAttribute: HitAttributeType.WALK },
      { resource: "mountain.png", hitAttribute: HitAttributeType.AIR_SHIP },
    ]);
    //////////////////////////////////////////////////////////

    this._fieldMap = new FieldMap(chipSet, mapData, width, height);
    this._backgroundView = new BackgroundView(
      new BackgroundData(mapData, chipWidth, chipHeight, this._fieldMap.mapWidth, this._fieldMap.mapHeight),
      chipSet,
      screen.resolution.width,
      screen.resolution.height
    );

    this.addChild(this._backgroundView);
  }

  // TODO: BG面の名前ではなく、フィールドマップのビュー専用の名前に変更
  public setScrollPosition(x: number, y: number) {
    this._backgroundView.setScrollPosition(x, y);
  }
}
