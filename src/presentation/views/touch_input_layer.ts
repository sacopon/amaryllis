import { Container, Graphics, InteractionEvent, utils } from "pixi.js";
import { screen } from "presentation/application/config/configuration";

class DirectionInputTranslator {
  private isPressing = false;
  private pressBeginningPoint = { x: 0, y: 0 };
  private isNeutral = true;
  private radian = 0.0;

  public getDirection() {
    if (this.isNeutral) {
      return TouchInputLayer.Direction.NEUTRAL;
    }

    if (-Math.PI / 4 <= this.radian && this.radian < Math.PI / 4) {
      return TouchInputLayer.Direction.RIGHT;
    } else if (Math.PI / 4 <= this.radian && this.radian < (Math.PI * 3) / 4) {
      return TouchInputLayer.Direction.DOWN;
    } else if ((Math.PI * 3) / 4 <= this.radian || this.radian < (-Math.PI * 3) / 4) {
      return TouchInputLayer.Direction.LEFT;
    } else {
      return TouchInputLayer.Direction.UP;
    }
  }

  public getRadian() {
    return this.radian;
  }

  public handleDown(point: { x: number; y: number }) {
    this.isPressing = true;
    this.pressBeginningPoint.x = point.x;
    this.pressBeginningPoint.y = point.y;
  }

  public handleUp() {
    this.clear();
  }

  public handleMove(point: { x: number; y: number }) {
    if (!this.isPressing) {
      return;
    }

    const pos = point;
    this.radian = Math.atan2(pos.y - this.pressBeginningPoint.y, pos.x - this.pressBeginningPoint.x);
    this.isNeutral = false;
  }

  public handleUpOutSide() {
    this.clear();
  }

  private clear() {
    this.isPressing = false;
    this.pressBeginningPoint.x = this.pressBeginningPoint.y = 0;
    this.isNeutral = true;
    this.radian = 0;
  }
}

class TapInputTranslator extends utils.EventEmitter {
  private pressBeginningPoint = { x: 0, y: 0 };
  private pressBeginningTime = 0;

  private readonly TAP_CONDITION_TIME = 1000;
  private readonly TAP_CONDITION_DISTANCE = 100; // タップを許容する移動距離(の2乗)

  public handleDown(point: { x: number; y: number }) {
    this.pressBeginningPoint.x = point.x;
    this.pressBeginningPoint.y = point.y;
    this.pressBeginningTime = Date.now();
  }

  public handleUp(releasedPoint: { x: number; y: number }) {
    const isTap = this.isClearTapCondition(Date.now(), releasedPoint);
    this.clear();

    if (isTap) {
      this.emit("tap");
    }
  }

  public handleUpOutSide() {
    this.clear();
  }

  private clear() {
    this.pressBeginningPoint.x = this.pressBeginningPoint.y = 0;
    this.pressBeginningTime = 0;
  }

  private isClearTapCondition(releasedTime: number, releasedPoint: { x: number; y: number }) {
    return this.isClearTapConditionTime(releasedTime) && this.isClearTapConditionDistance(releasedPoint);
  }

  private isClearTapConditionTime(now: number) {
    return now - this.pressBeginningTime < this.TAP_CONDITION_TIME;
  }

  private isClearTapConditionDistance(point: { x: number; y: number }) {
    const distance = point.x - this.pressBeginningPoint.x + point.y - this.pressBeginningPoint.y;
    return Math.abs(distance) < this.TAP_CONDITION_DISTANCE;
  }
}

/**
 * タッチ入力を受け付けるレイヤ
 *
 * @example
 *  const layer = new TouchInputLayer();
 *  scene.addChild(layer);
 *
 *  const inputtedDirection: TouchInputLayer.Direction = layer.getDirection();
 */

export class TouchInputLayer extends Container {
  private directionInputTranslator = new DirectionInputTranslator();
  private tapInputTranslator = new TapInputTranslator();

  constructor() {
    super();

    const g = this.createScreenCoverGraphics();
    g.interactive = true;
    g.on("pointerdown", this.handleDown, this);
    g.on("pointerup", this.handleUp, this);
    g.on("pointermove", this.handleMove, this);
    g.on("pointerupoutside", this.handleUpOutSide, this);
    this.addChild(g);

    this.tapInputTranslator.on("tap", () => this.emit("tap"));
  }

  private createScreenCoverGraphics() {
    const g = new Graphics();

    g.beginFill(0x00ff00, 0.01); // alpha === 0 だとイベントが来ないので 0.01 を指定
    g.drawRect(
      ~~(-screen.resolution.width / 2),
      ~~(-screen.resolution.height / 2),
      screen.resolution.width,
      screen.resolution.height
    );
    g.endFill();

    return g;
  }

  /**
   * 入力されている方向を取得する
   *
   * @returns 入力されている方向
   */
  public getDirection() {
    return this.directionInputTranslator.getDirection();
  }

  public getRadian() {
    return this.directionInputTranslator.getRadian();
  }

  private handleDown(e: InteractionEvent) {
    const pos = e.data.getLocalPosition(this);
    this.directionInputTranslator.handleDown(pos);
    this.tapInputTranslator.handleDown(pos);
  }

  private handleUp(e: InteractionEvent) {
    this.directionInputTranslator.handleUp();
    this.tapInputTranslator.handleUp(e.data.getLocalPosition(this));
  }

  private handleMove(e: InteractionEvent) {
    this.directionInputTranslator.handleMove(e.data.getLocalPosition(this));
  }

  private handleUpOutSide() {
    this.directionInputTranslator.handleUpOutSide();
    this.tapInputTranslator.handleUpOutSide();
  }
}

export namespace TouchInputLayer {
  export const enum Direction {
    NEUTRAL,
    UP,
    DOWN,
    LEFT,
    RIGHT,
  }
}
