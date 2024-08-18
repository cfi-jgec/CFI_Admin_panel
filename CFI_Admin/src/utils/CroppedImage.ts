
export const getCroppedImg = (
    imageSrc: string, pixelCrop: { x: number; y: number; width: number; height: number }
): Promise<string> => {
    const image = new Image();
    image.src = imageSrc;

    return new Promise((resolve, reject) => {
        image.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            if (!ctx) {
                reject(new Error('Canvas context is not available'));
                return;
            }

            canvas.width = pixelCrop.width;
            canvas.height = pixelCrop.height;

            ctx.drawImage(
                image,
                pixelCrop.x,
                pixelCrop.y,
                pixelCrop.width,
                pixelCrop.height,
                0,
                0,
                pixelCrop.width,
                pixelCrop.height
            );

            canvas.toBlob((blob) => {
                canvas.toBlob((blob) => {
                    if (!blob) {
                        reject(new Error('Canvas is empty'));
                        return;
                    }
                    const fileUrl = window.URL.createObjectURL(blob);
                    resolve(fileUrl);
                }, 'image/jpeg');
            });
            image.onerror = () => {
                reject(new Error('Image load error'));
            };
        }
    })
}

