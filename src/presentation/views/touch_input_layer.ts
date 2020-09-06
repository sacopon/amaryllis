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
  private isPress = false;
  private pressBeginningPoint = { x: 0, y: 0 };
  private direction = TouchInputLayer.Direction.NEUTRAL;

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
    return this.direction;
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
    this.isPress = true;

    this.pressBeginningPoint.x = e.data.global.x - this.position.x;
    this.pressBeginningPoint.y = e.data.global.y - this.position.y;
  }

  private handleUp() {
    this.isPress = false;
    this.pressBeginningPoint = { x: 0, y: 0 };
    this.direction = TouchInputLayer.Direction.NEUTRAL;
  }

  private handleMove(e: InteractionEvent) {
    if (!this.isPress) {
      return;
    }

    const distanceX = e.data.global.x - this.position.x - this.pressBeginningPoint.x;
    const distanceY = e.data.global.y - this.position.y - this.pressBeginningPoint.y;

    if (Math.abs(distanceX) < Math.abs(distanceY)) {
      this.direction = distanceY < 0 ? TouchInputLayer.Direction.UP : TouchInputLayer.Direction.DOWN;
    } else {
      this.direction = distanceX < 0 ? TouchInputLayer.Direction.LEFT : TouchInputLayer.Direction.RIGHT;
    }
  }

  private handleUpOutSide() {
    this.isPress = false;
    this.pressBeginningPoint.x = this.pressBeginningPoint.y = 0;
    this.direction = TouchInputLayer.Direction.NEUTRAL;
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
