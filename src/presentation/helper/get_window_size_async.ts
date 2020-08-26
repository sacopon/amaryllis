export async function getWindowSizeAsync(): Promise<{
  width: number;
  height: number;
}> {
  return new Promise((resolve) => {
    const timer_id = window.setInterval(() => {
      if (!!window.innerWidth && !!window.innerHeight) {
        window.clearInterval(timer_id);

        resolve({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }
    }, 100);
  });
}
