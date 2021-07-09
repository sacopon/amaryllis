import { Container, Graphics, Sprite, Texture } from "pixi.js";
import { BackgroundData } from "presentation/views/bg/background_data";
import { ChipSet } from "domain/model/fieldmap/chip_set";

interface Size {
  xCount: number;
  yCount: number;
}

/**
 * BG面を構成するセル
 */
class Cell extends Sprite {
  private readonly _chipSet: ChipSet;

  // TODO: チップセットではなく、BG面に紐づくタイル定義を別途作成する
  // チップセットからそのタイル定義を作成して、このBG面(やセル)に設定をする
  public constructor(chipSet: ChipSet) {
    super();
    this._chipSet = chipSet;
  }

  public setTileIndex(index: number) {
    this.texture = Texture.from(this._chipSet.getResourceName(index));
  }
}

/**
 * 縦横に(仮想的に)並べたセルの集合
 *
 * @param width 横のセル数
 * @param height 縦のセル数
 */
class Cells {
  private readonly _cells: Cell[] = [];
  private readonly _size: Size;

  constructor(chipSet: ChipSet, width: number, height: number) {
    this._cells = Array<Cell[] | null>(width * height)
      .fill(null)
      .map(() => new Cell(chipSet));

    this._size = { xCount: width, yCount: height };
  }

  /** 横のセル数 */
  public get width() {
    return this._size.xCount;
  }

  /** 縦のセル数 */
  public get height() {
    return this._size.yCount;
  }

  /**
   * 指定位置のセルを取得
   *
   * @param x 横位置
   * @param y 縦位置
   * @returns セルへの参照
   */
  public getCell(x: number, y: number) {
    return this._cells[y * this.width + x];
  }
}

/**
 * BG面のビュー
 * @param data BG面のデータ
 * @param rows タイルを並べる個数(行)
 * @param cols タイルを並べる個数(列)
 */
export class BackgroundView extends Container {
  private readonly _data: BackgroundData;
  private readonly _bgWidth: number;
  private readonly _bgHeight: number;

  private readonly _cells: Cells;
  private readonly _cellLayer: Container;
  private readonly _chipSet: ChipSet;

  public constructor(data: BackgroundData, chipSet: ChipSet, width: number, height: number) {
    super();

    this._data = data;
    this._bgWidth = width;
    this._bgHeight = height;
    this._chipSet = chipSet;

    // BG面の大きさでマスクをかけるため、セルの乗るレイヤーは別に用意する
    // (セルのレイヤーとマスクレイヤーが兄弟となる)
    this._cellLayer = new Container();
    this.addChild(this._cellLayer);

    // スクロールの分として1セル多く作成する
    this._cells = new Cells(
      this._chipSet,
      Math.floor((width + this._data.cellWidth) / this._data.cellWidth),
      Math.floor((height + this._data.cellHeight) / this._data.cellHeight)
    );

    const offset = {
      x: -Math.floor(width / 2),
      y: -Math.floor(height / 2),
    };

    this.setupCells(offset.x, offset.y);
    this.setupMask(offset.x, offset.y);
    this.setScrollPosition(0, 0);
  }

  /**
   * スクロール位置を設定する
   *
   * @param x マップデータ内の左上開始点(ピクセル単位)
   * @param y マップデータ内の左上開始点(ピクセル単位)
   */
  public setScrollPosition(x: number, y: number) {
    this.setOrigin(Math.floor(x / this._data.cellWidth), Math.floor(y / this._data.cellHeight));
    this._cellLayer.position.set(-this._data.normalizeCellWidth(x), -this._data.normalizeCellHeight(y));
  }

  /**
   * セルを配置する
   * @param offsetX 原点中央として並べるためのオフセット
   * @param offsetY 原点中央として並べるためのオフセット
   */
  private setupCells(offsetX: number, offsetY: number) {
    for (let y = 0; y < this._cells.height; ++y) {
      for (let x = 0; x < this._cells.width; ++x) {
        const tile = this._cells.getCell(x, y);
        tile.position.set(x * this._data.cellWidth + offsetX, y * this._data.cellHeight + offsetY);
        this._cellLayer.addChild(tile);
      }
    }
  }

  /**
   * BGデータ内のどの位置から表示を開始するか
   *
   * @param originX 開始点(左上)の横方向の位置(セル単位)
   * @param originY 開始点(左上)の縦方向の位置(セル単位)
   */
  private setOrigin(originX: number, originY: number) {
    for (let y = 0; y < this._cells.height; ++y) {
      for (let x = 0; x < this._cells.width; ++x) {
        const tile = this._cells.getCell(x, y);

        tile.setTileIndex(this._data.getIndex(originX + x, originY + y));
      }
    }
  }

  /**
   * スクロール用のマスクを作成/設定する
   * @param offsetX 原点中央としてマスクするためのオフセット
   * @param offsetY 原点中央としてマスクするためのオフセット
   */
  private setupMask(offsetX: number, offsetY: number) {
    const g = new Graphics().beginFill(0).drawRect(offsetX, offsetY, this._bgWidth, this._bgHeight).endFill();
    this.addChild(g);
    this.mask = g;
  }
}
