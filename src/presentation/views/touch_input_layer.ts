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
  private is_press = false;
  private begin_press_point = { x: 0, y: 0 };
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

    g.beginFill(0x00ff00, 0.01); // alpha === 0 だとイベントが来ないので 0.01
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
    this.is_press = true;

    this.begin_press_point.x = e.data.global.x - this.position.x;
    this.begin_press_point.y = e.data.global.y - this.position.y;
  }

  private handleUp() {
    this.is_press = false;
    this.begin_press_point = { x: 0, y: 0 };
    this.direction = TouchInputLayer.Direction.NEUTRAL;
  }

  private handleMove(e: InteractionEvent) {
    if (!this.is_press) {
      return;
    }

    const x_distance = e.data.global.x - this.position.x - this.begin_press_point.x;
    const y_distance = e.data.global.y - this.position.y - this.begin_press_point.y;

    if (Math.abs(x_distance) < Math.abs(y_distance)) {
      this.direction = y_distance < 0 ? TouchInputLayer.Direction.UP : TouchInputLayer.Direction.DOWN;
    } else {
      this.direction = x_distance < 0 ? TouchInputLayer.Direction.LEFT : TouchInputLayer.Direction.RIGHT;
    }
  }

  private handleUpOutSide() {
    this.is_press = false;
    this.begin_press_point.x = this.begin_press_point.y = 0;
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
