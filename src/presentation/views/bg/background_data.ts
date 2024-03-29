/**
 * BG面のデータを表すクラス
 *
 * @param data マップデータ配列
 * @param cellCountWidth マップデータの横方向の長さ(セル単位)
 * @param cellCountHeight マップデータの縦方向の長さ(セル単位)
 */
export class BackgroundData {
  private readonly _data: number[] = [];

  public constructor(data: number[], public readonly cellCountWidth: number, public readonly cellCountHeight: number) {
    this._data = data;
  }

  /**
   * データの範囲に正規化する
   *
   * @param x X(セル単位)
   * @return 正規化されたX座標
   */
  public normalizeX(x: number) {
    return ((x % this.cellCountWidth) + this.cellCountWidth) % this.cellCountWidth;
  }

  /**
   * データの範囲に正規化する
   *
   * @param y Y(セル単位)
   * @return 正規化されたY座標
   */
  public normalizeY(y: number) {
    return ((y % this.cellCountHeight) + this.cellCountHeight) % this.cellCountHeight;
  }

  /**
   * 指定位置のインデックスデータを取得する
   *
   * @param x X位置
   * @param y Y位置
   * @returns インデックスデータ
   */
  public getIndex(x: number, y: number) {
    return this._data[this.normalizeY(y) * this.cellCountWidth + this.normalizeX(x)];
  }
}
