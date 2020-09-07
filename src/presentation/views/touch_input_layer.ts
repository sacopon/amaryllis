import { Container, Graphics, InteractionEvent } from "pixi.js";
import { screen } from "presentation/application/config/configuration";

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
  private isPressing = false;
  private isNeutral = true;
  private pressBeginningPoint = { x: 0, y: 0 };
  private radian = 0.0;

  constructor() {
    super();

    const g = this.createScreenCoverGraphics();
    g.interactive = true;
    g.on("pointerdown", this.handleDown, this);
    g.on("pointerup", this.handleUp, this);
    g.on("pointermove", this.handleMove, this);
    g.on("pointerupoutside", this.handleUpOutSide, this);

    this.addChild(g);
  }

  /**
   * 入力されている方向を取得する
   *
   * @returns 入力されている方向
   */
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

  private handleDown(e: InteractionEvent) {
    this.isPressing = true;
    this.pressBeginningPoint = e.data.getLocalPosition(this);
  }

  private handleUp() {
    this.isPressing = false;
    this.pressBeginningPoint = { x: 0, y: 0 };
    this.isNeutral = true;
  }

  private handleMove(e: InteractionEvent) {
    if (!this.isPressing) {
      return;
    }

    const pos = e.data.getLocalPosition(this);
    this.radian = Math.atan2(pos.y - this.pressBeginningPoint.y, pos.x - this.pressBeginningPoint.x);
    this.isNeutral = false;
  }

  private handleUpOutSide() {
    this.isPressing = false;
    this.pressBeginningPoint.x = this.pressBeginningPoint.y = 0;
    this.isNeutral = true;
    this.radian = 0;
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
