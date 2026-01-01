export async function captureVideoThumb(url: string, atSeconds = 1): Promise<string | null> {
    return new Promise((resolve) => {
        const v = document.createElement("video");
        v.crossOrigin = "anonymous"; // cần server CORS OK
        v.src = url;
        v.muted = true;
        v.playsInline = true;
        v.preload = "metadata";

        const cleanup = () => {
            try {
                v.pause();
                v.removeAttribute("src");
                v.load();
            } catch { }
        };

        v.onloadedmetadata = () => {
            const dur = Number.isFinite(v.duration) ? v.duration : 0;
            const t = dur > 0 ? Math.min(Math.max(atSeconds, 0), Math.max(0, dur - 0.1)) : 0;
            v.currentTime = t;
        };

        v.onseeked = () => {
            try {
                const w = v.videoWidth || 640;
                const h = v.videoHeight || 360;

                const canvas = document.createElement("canvas");
                canvas.width = w;
                canvas.height = h;

                const ctx = canvas.getContext("2d");
                if (!ctx) {
                    cleanup();
                    return resolve(null);
                }

                ctx.drawImage(v, 0, 0, w, h);
                const dataUrl = canvas.toDataURL("image/jpeg", 0.82);
                cleanup();
                resolve(dataUrl);
            } catch {
                cleanup();
                resolve(null);
            }
        };

        v.onerror = () => {
            cleanup();
            resolve(null);
        };
    });
}
