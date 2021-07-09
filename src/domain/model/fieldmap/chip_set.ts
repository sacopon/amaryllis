/**
 * 当たり判定属性の定義
 */
export const enum HitAttributeType {
  /** 歩行時に乗れる */
  WALK = 0,
  /** 船/空飛ぶ乗り物なら乗れる */
  SHIP = 1,
  /** 空飛ぶ乗り物なら乗れる */
  AIR_SHIP = 2,
  /** 進入不可 */
  NONE = 3,
}

/**
 * マップチップ
 */
export interface MapChip {
  /** リソース名 */
  resource: string;
  /** 当たり判定の属性 */
  hitAttribute: HitAttributeType;
}

/**
 * 複数のマップチップから成るチップセット
 */
export class ChipSet {
  /** チップセット内のマップチップ番号 */
  private readonly mapChips: MapChip[] = [];

  public constructor(chips: MapChip[]) {
    chips.forEach((c) => {
      this.mapChips.push(Object.assign({}, c));
    });
  }

  public getResourceName(index: number) {
    return this.mapChips[index].resource;
  }

  public getHitAttribute(index: number) {
    return this.mapChips[index].hitAttribute;
  }
}
