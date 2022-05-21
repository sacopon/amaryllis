import { Sprite } from "pixi.js";
import { CharacterAnimationCounterCount } from "presentation/application/character_animation_counter";
import { Direction } from "presentation/application/common/constants";
import { ServiceLocator } from "presentation/application/service_locator";
import { CharacterResourceManager } from "./character_resource_manager";

export class CharacterView extends Sprite {
  private animationCounter: CharacterAnimationCounterCount;
  private direction: Direction = Direction.NEUTRAL;
  private isDirty: boolean = false;
  private readonly characterId: number;

  private currentAnimationCount: number = 0;
  private prevAnimationCount: number = 0;

  constructor(characterId: number) {
    super();

    this.characterId = characterId;
    this.anchor.set(0.5);
    this.animationCounter = ServiceLocator.getAnimationCounterCount();
  }

  update() {
    this.prevAnimationCount = this.currentAnimationCount;
    this.currentAnimationCount = this.animationCounter.getCount();

    if (this.isDirty || this.prevAnimationCount !== this.currentAnimationCount) {
      this.isDirty = false;
      const textures = CharacterResourceManager.getTexture(this.characterId, this.direction);

      this.texture = textures[this.currentAnimationCount % textures.length];
    }
  }

  setDirection(direction: Direction) {
    this.direction = direction;
    this.isDirty = true;
  }
}
