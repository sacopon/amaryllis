import { Texture } from "pixi.js";
import { Direction } from "presentation/application/common/constants";

const allResources: [{ up: string[]; down: string[]; left: string[]; right: string[] }] = [
  // 0: 勇者
  {
    up: ["yusha4_up_0.png", "yusha4_up_1.png"],
    down: ["yusha4_down_0.png", "yusha4_down_1.png"],
    left: ["yusha4_left_0.png", "yusha4_left_1.png"],
    right: ["yusha4_right_0.png", "yusha4_right_1.png"],
  },
];

/**
 * 全フィールドキャラクターの画像リソースを管理するクラス
 */
export class CharacterResourceManager {
  private static toKeyString(direction: Direction) {
    if (direction === Direction.UP) {
      return "up";
    }

    // 入力なしは下向きとする
    if (direction === Direction.DOWN || direction === Direction.NEUTRAL) {
      return "down";
    }

    if (direction === Direction.LEFT) {
      return "left";
    }

    if (direction === Direction.RIGHT) {
      return "right";
    }

    throw new Error("no key string");
  }

  public static getTexture(characterId: number, direction: Direction) {
    return allResources[characterId][this.toKeyString(direction)].map((name) => Texture.from(name));
  }
}
