export interface CharacterAnimationCounterTicker {
  tick(delta: number): void;
}

export interface CharacterAnimationCounterCount {
  getCount(): number;
}

export class CharacterAnimationCounter implements CharacterAnimationCounterTicker, CharacterAnimationCounterCount {
  private timeElapsedSinceBoot = 0;
  private currentFrameCount = 0;

  constructor(initialElapsed = Date.now()) {
    this.timeElapsedSinceBoot = initialElapsed;
  }

  tick(delta: number) {
    this.timeElapsedSinceBoot += delta;
    this.currentFrameCount = Math.floor(this.timeElapsedSinceBoot / 500);
  }

  getCount() {
    return this.currentFrameCount;
  }
}
