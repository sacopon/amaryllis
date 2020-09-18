import { Application } from "pixi.js";
import {
  CharacterAnimationCounter,
  CharacterAnimationCounterCount,
  CharacterAnimationCounterTicker,
} from "presentation/application/character_animation_counter";

export class ServiceLocator {
  public static getApplication() {
    return ServiceLocatorImpl.getApplication();
  }

  public static getAnimationCounterTicker() {
    return ServiceLocatorImpl.getAnimationCounterTicker();
  }

  public static getAnimationCounterCount() {
    return ServiceLocatorImpl.getAnimationCounterCount();
  }
}

export class ServiceLocatorImpl {
  private static application: Application | null = null;
  private static animationCounter: CharacterAnimationCounter | null = null;

  public static setApplication(app: Application) {
    this.application = app;
  }

  public static getApplication() {
    return this.application!;
  }

  public static setAnimationCounter(counter: CharacterAnimationCounter) {
    this.animationCounter = counter;
  }

  public static getAnimationCounterTicker(): CharacterAnimationCounterTicker {
    return this.animationCounter!;
  }

  public static getAnimationCounterCount(): CharacterAnimationCounterCount {
    return this.animationCounter!;
  }
}
