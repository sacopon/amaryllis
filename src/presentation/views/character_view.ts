import { Sprite, Texture } from "pixi.js";
import { CharacterAnimationCounterCount } from "presentation/application/character_animation_counter";
import { Direction } from "presentation/application/common/constants";
import { ServiceLocator } from "presentation/application/service_locator";

export class CharacterView extends Sprite {
  private animationCounter: CharacterAnimationCounterCount;
  private allTextures: Texture[][] = [];
  private direction: Direction = Direction.NEUTRAL;
  private isDirty: boolean = false;

  private currentAnimationCount: number = 0;
  private prevAnimationCount: number = 0;

  constructor(params: { up: Texture[]; down: Texture[]; left: Texture[]; right: Texture[] }) {
    super();

    this.animationCounter = ServiceLocator.getAnimationCounterCount();
    this.allTextures[Direction.NEUTRAL] = params.down;
    this.allTextures[Direction.UP] = params.up;
    this.allTextures[Direction.DOWN] = params.down;
    this.allTextures[Direction.LEFT] = params.left;
    this.allTextures[Direction.RIGHT] = params.right;
  }

  update() {
    this.prevAnimationCount = this.currentAnimationCount;
    this.currentAnimationCount = this.animationCounter.getCount();

    if (this.isDirty || this.prevAnimationCount !== this.currentAnimationCount) {
      this.isDirty = false;
      const textures = this.allTextures[this.direction];

      this.texture = textures[this.currentAnimationCount % textures.length];
    }
  }

  setDirection(direction: Direction) {
    this.direction = direction;
    this.isDirty = true;
  }
}
