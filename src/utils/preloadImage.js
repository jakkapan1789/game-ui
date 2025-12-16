export function preloadImage(imageUrls) {
  return Promise.all(
    imageUrls.map((src) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onload = () => resolve(src);
        img.onerror = reject;
      });
    })
  );
}
