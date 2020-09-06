import { Application } from "pixi.js";

export class ServiceLocator {
  private static application: Application | null = null;

  public static setApplication(app: Application) {
    this.application = app;
  }

  public static getApplication() {
    return this.application!;
  }
}
