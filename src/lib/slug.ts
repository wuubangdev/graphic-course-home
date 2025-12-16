import slugify from "slugify";

export function toSlug(title: string): string {
  return slugify(title, {
    lower: true,      // chuyển hết sang chữ thường
    strict: true,     // bỏ hết ký tự lạ, chỉ giữ [a-z0-9-]
    locale: "vi",     // hỗ trợ tiếng Việt tốt hơn
    trim: true,       // bỏ dấu - thừa ở đầu/cuối
  });
}

export function extractIdFromSlug(slug: string): number | null {
  // Bỏ phần .html nếu có
  const clean = slug.replace(/\.html$/i, "");

  // Lấy số ở cuối, sau dấu gạch ngang cuối cùng
  const match = clean.match(/-(\d+)$/);
  if (!match) return null;

  return Number(match[1]);
}
