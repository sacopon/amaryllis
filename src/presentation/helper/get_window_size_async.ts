export async function getWindowSizeAsync(): Promise<{
  width: number;
  height: number;
}> {
  return new Promise((resolve) => {
    const timerId = window.setInterval(() => {
      if (!!window.innerWidth && !!window.innerHeight) {
        window.clearInterval(timerId);

        resolve({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }
    }, 100);
  });
}
