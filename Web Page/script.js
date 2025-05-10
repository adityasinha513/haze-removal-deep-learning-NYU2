document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");

    hamburger.addEventListener("click", () => {
        navLinks.classList.toggle("active");
    });
});
document.getElementById("image-upload").addEventListener("change", function(event) {
    let fileName = event.target.files[0].name;
    document.getElementById("file-name").textContent = `Selected: ${fileName}`;
});
document.getElementById("theme-toggle").addEventListener("click", function() {
    document.body.classList.toggle("light-mode");

    // Change button icon based on mode
    if (document.body.classList.contains("light-mode")) {
        this.textContent = "☀️"; // Light mode icon
    } else {
        this.textContent = "🌙"; // Dark mode icon
    }
});


document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById('image-upload');
    const originalImage = document.getElementById('original-image');
    const dehazedCanvas = document.getElementById('dehazed-image');
    const loadingIndicator = document.getElementById('loading-indicator');

    fileInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                originalImage.src = e.target.result;
                processImage(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    });

    async function processImage(imageDataUrl) {
        loadingIndicator.style.display = 'block';
        const img = new Image();
        img.src = imageDataUrl;

        img.onload = async () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0, img.width, img.height);
            const imageData = ctx.getImageData(0, 0, img.width, img.height);
            const pixels = imageData.data;

            // Apply a simple smoothing filter (e.g., box blur) before sharpening
            const smoothedPixels = applySmoothing(pixels, img.width, img.height);

            const dehazedPixels = await dehazeAndEnhance(smoothedPixels, img.width, img.height);

            const dehazedImageData = new ImageData(dehazedPixels, img.width, img.height);
            dehazedCanvas.width = img.width;
            dehazedCanvas.height = img.height;
            dehazedCanvas.getContext('2d').putImageData(dehazedImageData, 0, 0);

            loadingIndicator.style.display = 'none';
        };
    }

    async function dehazeAndEnhance(pixels, width, height) {
        const dehazedPixels = new Uint8ClampedArray(pixels.length);

        // Simple Sharpening (Unsharp Masking - Basic)
        const sharpenedPixels = applySharpening(pixels, width, height);

        for (let i = 0; i < pixels.length; i += 4) {
            let r = sharpenedPixels[i];
            let g = sharpenedPixels[i + 1];
            let b = sharpenedPixels[i + 2];
            const a = sharpenedPixels[i + 3];

            // Simple dehazing and contrast enhancement
            const contrast = 1.2;
            r = (r - 128) * contrast + 128;
            g = (g - 128) * contrast + 128;
            b = (b - 128) * contrast + 128;

            // Dark area correction
            const darkThreshold = 30;
            if (r < darkThreshold || g < darkThreshold || b < darkThreshold) {
                r = Math.min(255, r + 20);
                g = Math.min(255, g + 20);
                b = Math.min(255, b + 20);
            }

            // Darken white areas with smoother transition
            const whiteThreshold = 240;
            const darkenAmount = 20;
            const intensity = (r + g + b) / 3;
            if (intensity > whiteThreshold) {
                const factor = (intensity - whiteThreshold) / (255 - whiteThreshold);
                r = Math.max(0, r - darkenAmount * factor);
                g = Math.max(0, g - darkenAmount * factor);
                b = Math.max(0, b - darkenAmount * factor);
            }

            dehazedPixels[i] = Math.max(0, Math.min(255, r));
            dehazedPixels[i + 1] = Math.max(0, Math.min(255, g));
            dehazedPixels[i + 2] = Math.max(0, Math.min(255, b));
            dehazedPixels[i + 3] = a;
        }

        return dehazedPixels;
    }

    function applySharpening(pixels, width, height) {
        const sharpenedPixels = new Uint8ClampedArray(pixels.length);
        const kernel = [-1, -1, -1, -1, 9, -1, -1, -1, -1];

        for (let i = 0; i < pixels.length; i += 4) {
            const x = (i / 4) % width;
            const y = Math.floor((i / 4) / width);

            let r = 0, g = 0, b = 0;
            for (let ky = -1; ky <= 1; ky++) {
                for (let kx = -1; kx <= 1; kx++) {
                    const nx = x + kx;
                    const ny = y + ky;

                    if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
                        const ni = (ny * width + nx) * 4;
                        const kernelIndex = (ky + 1) * 3 + (kx + 1);
                        r += pixels[ni] * kernel[kernelIndex];
                        g += pixels[ni + 1] * kernel[kernelIndex];
                        b += pixels[ni + 2] * kernel[kernelIndex];
                    }
                }
            }

            sharpenedPixels[i] = Math.max(0, Math.min(255, r));
            sharpenedPixels[i + 1] = Math.max(0, Math.min(255, g));
            sharpenedPixels[i + 2] = Math.max(0, Math.min(255, b));
            sharpenedPixels[i + 3] = pixels[i + 3];
        }
        return sharpenedPixels;
    }

    function applySmoothing(pixels, width, height) {
        const smoothedPixels = new Uint8ClampedArray(pixels.length);
        const kernel = [1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9]; // Box blur kernel

        for (let i = 0; i < pixels.length; i += 4) {
            const x = (i / 4) % width;
            const y = Math.floor((i / 4) / width);

            let r = 0, g = 0, b = 0;
            for (let ky = -1; ky <= 1; ky++) {
                for (let kx = -1; kx <= 1; kx++) {
                    const nx = x + kx;
                    const ny = y + ky;

                    if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
                        const ni = (ny * width + nx) * 4;
                        const kernelIndex = (ky + 1) * 3 + (kx + 1);
                        r += pixels[ni] * kernel[kernelIndex];
                        g += pixels[ni + 1] * kernel[kernelIndex];
                        b += pixels[ni + 2] * kernel[kernelIndex];
                    }
                }
            }

            smoothedPixels[i] = Math.max(0, Math.min(255, r));
            smoothedPixels[i + 1] = Math.max(0, Math.min(255, g));
            smoothedPixels[i + 2] = Math.max(0, Math.min(255, b));
            smoothedPixels[i + 3] = pixels[i + 3];
        }
        return smoothedPixels;
    }
});