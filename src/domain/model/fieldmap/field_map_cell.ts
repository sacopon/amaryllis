/**
 * フィールドマップの1セル分のデータを表すモデル
 */
export class FieldMapCell {
  public readonly index: number;

  public constructor(index: number) {
    this.index = index;
  }

  public clone() {
    return new FieldMapCell(this.index);
  }
}
