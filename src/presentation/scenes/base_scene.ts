import { Container, Application } from "pixi.js";
import { screen } from "presentation/application/config/configuration";
import { ServiceLocator } from "presentation/application/service_locator";

export interface Scene {
  initialize(): void;
  update(): void;
  fetchStaticResourcesAsync(): Promise<void | Error>;
}

export class BaseScene extends Container implements Scene {
  private application: Application;

  public constructor() {
    super();

    this.application = ServiceLocator.getApplication();
    this.position.set(Math.floor(screen.resolution.width / 2), Math.floor(screen.resolution.height / 2));
  }

  public initialize() {}

  public update() {}

  public fetchStaticResourcesAsync() {
    return Promise.resolve();
  }

  protected fetchResources(urls: string[]) {
    this._app.loader.add(urls);

    return new Promise<void>((resolve) => {
      this._app.loader.load(() => resolve());
    });
  }

  /**
   * @protected
   */
  public get _app() {
    return this.application;
  }
}
