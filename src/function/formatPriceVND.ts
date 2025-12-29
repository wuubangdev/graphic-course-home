// src/utils/formatPriceVND.ts
export function formatPriceVND(input: string | number | null | undefined): string {
    if (input === null || input === undefined) return "Miễn phí";

    const raw =
        typeof input === "string"
            ? Number(input.replace(/[^\d.-]/g, ""))
            : input;

    if (!Number.isFinite(raw) || raw <= 0) return "Miễn phí";

    // VND: dùng dấu chấm phân tách nghìn
    const formatted = new Intl.NumberFormat("vi-VN", {
        maximumFractionDigits: 0,
    }).format(Math.round(raw));

    return `${formatted}đ`;
}
