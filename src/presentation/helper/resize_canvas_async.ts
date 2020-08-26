import { screen } from "presentation/application/config/configuration";
import { getWindowSizeAsync } from "presentation/helper/get_window_size_async";

export async function resizeCanvasAsync(canvas: HTMLCanvasElement) {
  const clientSize = await getWindowSizeAsync();
  const widthRatio = clientSize.width / screen.resolution.width;
  const heightRatio = clientSize.height / screen.resolution.height;
  let canvasWidth = 0;
  let canvasHeight = 0;

  const ratio = Math.min(widthRatio, heightRatio);
  canvasWidth = Math.floor(screen.resolution.width * ratio);
  canvasHeight = Math.floor(screen.resolution.height * ratio);

  canvas.style.width = `${canvasWidth}px`;
  canvas.style.height = `${canvasHeight}px`;
  canvas.style.position = "abosolute";
  canvas.style.left = canvas.style.top = canvas.style.right = canvas.style.bottom = "0px";
  canvas.style.margin = "auto";
  canvas.style.position = "absolute";
}
