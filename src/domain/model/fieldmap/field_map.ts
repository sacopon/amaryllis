import { ChipSet } from "./chip_set";
import { FieldMapCell } from "./field_map_cell";

interface MapSize {
  width: number;
  height: number;
}

class FieldMapData {
  private readonly size: MapSize;
  private readonly data: FieldMapCell[];

  public constructor(data: number[], width: number, height: number) {
    if (data.length !== width * height) {
      throw new Error("data.length must be equal width * height.");
    }

    this.size = { width, height };
    this.data = [];

    data.forEach((cell) => {
      this.data.push(new FieldMapCell(cell));
    });
  }

  public get width() {
    return this.size.width;
  }

  public get height() {
    return this.size.height;
  }

  public getMapChipIndex(x: number, y: number) {
    return this.data[y * this.size.width + x].index;
  }
}

/**
 * フィールドマップを表すモデル
 */
export class FieldMap {
  /** マップデータ */
  private readonly mapData: FieldMapData;
  /** 使用チップセット */
  private readonly chipSet: ChipSet;

  public constructor(chipSet: ChipSet, data: number[], width: number, height: number) {
    this.chipSet = chipSet;
    this.mapData = new FieldMapData(data, width, height);
  }

  public get mapWidth() {
    return this.mapData.width;
  }

  public get mapHeight() {
    return this.mapData.height;
  }

  public getChipResource(x: number, y: number) {
    return this.chipSet.getResourceName(this.mapData.getMapChipIndex(x, y));
  }

  public getHitAttribute(x: number, y: number) {
    return this.chipSet.getHitAttribute(this.mapData.getMapChipIndex(x, y));
  }
}
