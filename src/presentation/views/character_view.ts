import { Sprite, Texture } from "pixi.js";
import { Direction } from "presentation/application/common/constants";

export class CharacterView extends Sprite {
  private allTextures: Texture[] = [];

  constructor(params: { up: Texture; down: Texture; left: Texture; right: Texture }) {
    super();

    this.allTextures[Direction.NEUTRAL] = params.down;
    this.allTextures[Direction.UP] = params.up;
    this.allTextures[Direction.DOWN] = params.down;
    this.allTextures[Direction.LEFT] = params.left;
    this.allTextures[Direction.RIGHT] = params.right;
  }

  setDirection(direction: Direction) {
    this.texture = this.allTextures[direction];
  }
}
