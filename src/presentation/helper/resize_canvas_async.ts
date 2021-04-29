import { getWindowSizeAsync } from "presentation/helper/get_window_size_async";

export async function resizeCanvasAsync(canvas: HTMLCanvasElement, requestWidth: number, requestHeight: number) {
  const clientSize = await getWindowSizeAsync();
  const widthRatio = clientSize.width / requestWidth;
  const heightRatio = clientSize.height / requestHeight;
  let canvasWidth = 0;
  let canvasHeight = 0;

  const ratio = Math.min(widthRatio, heightRatio);
  canvasWidth = Math.floor(requestWidth * ratio);
  canvasHeight = Math.floor(requestHeight * ratio);

  canvas.style.width = `${canvasWidth}px`;
  canvas.style.height = `${canvasHeight}px`;
  canvas.style.position = "abosolute";
  canvas.style.left = canvas.style.top = canvas.style.right = canvas.style.bottom = "0px";
  canvas.style.margin = "auto";
  canvas.style.position = "absolute";
}
