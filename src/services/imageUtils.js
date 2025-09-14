// src/utils/imageUtils.js

/**
 * Compresses a base64 image to the specified dimensions and quality.
 * @param {string} base64Image - The base64 image string.
 * @param {number} maxWidth - The maximum width of the output image.
 * @param {number} maxHeight - The maximum height of the output image.
 * @param {number} quality - The quality of the output image (0 to 1).
 * @returns {Promise<string>} - A promise that resolves to the compressed base64 image string.
 */
export async function compressImage(base64Image, maxWidth, maxHeight, quality = 0.8) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
            let { width, height } = img;

            // Calculate new dimensions while maintaining aspect ratio
            if (width > height) {
                if (width > maxWidth) {
                    height *= maxWidth / width;
                    width = maxWidth;
                }
            } else {
                if (height > maxHeight) {
                    width *= maxHeight / height;
                    height = maxHeight;
                }
            }

            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, width, height);
            const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
            resolve(compressedDataUrl);
        };
        img.onerror = (err) => reject(err);
        img.src = base64Image;
    });
}

/**
 * Converts a data URL to a Blob object.
 * @param {string} dataurl - The data URL to convert.
 * @returns {Blob} - The resulting Blob object.
 */
export function dataURLtoBlob(dataurl) {
    const arr = dataurl.split(',');
    const mimeMatch = arr[0].match(/:(.*?);/);
    if (!mimeMatch) {
        throw new Error('Invalid data URL');
    }
    const mime = mimeMatch[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
}

/**
 * Converts a Blob object to a base64 data URL.
 * @param {Blob} blob - The Blob object to convert.
 * @returns {Promise<string>} - A promise that resolves to the base64 data URL.
 */
export function convertBlobToBase64(blob) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
}
