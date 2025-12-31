import { fetchNavigationTop } from "@/lib/strapi-lib/api/navigationTop";
import { strapiMediaUrl } from "@/lib/strapi-lib/strapi";
import Image from "next/image";
import Link from "next/link";

function isExternal(url?: string) {
    return !!url && /^https?:\/\//i.test(url);
}

export default async function TopUtilityBar() {
    const res = await fetchNavigationTop();
    const { main, customerIncentives, contactInfo } = res.data;

    const itemsRight = [
        {
            title: customerIncentives?.title,
            link: customerIncentives?.link,
            icon: strapiMediaUrl(customerIncentives?.icon?.url) || "/test.png",
        },
        {
            title: contactInfo?.title,
            link: contactInfo?.link,
            icon: strapiMediaUrl(contactInfo?.icon?.url) || "/test.png",
        },
    ].filter((x) => x.title && x.link);

    const mainIcon = strapiMediaUrl(main?.icon?.url) || "/test.png";

    return (
        <div className="w-full bg-black/10 text-white">
            <div className="mx-auto flex max-w-[1280px] items-center justify-between px-2 py-3">
                {/* Left */}
                <Link
                    href={main?.link || "#"}
                    target={isExternal(main?.link) ? "_blank" : undefined}
                    rel={isExternal(main?.link) ? "noopener noreferrer" : undefined}
                    className="flex items-center gap-2 text-sm font-medium opacity-70 hover:opacity-100 duration-300"
                >
                    <span className="relative h-[1.1rem] w-[1.1rem] shrink-0">
                        <Image
                            alt={main?.title || "icon"}
                            src={mainIcon}
                            fill
                            sizes="20px"
                            className="object-contain"
                        />
                    </span>
                    <span className="line-clamp-1">{main?.title}</span>
                </Link>

                {/* Right */}
                <div className="flex items-center gap-4">
                    {itemsRight.map((it) => (
                        <Link
                            key={it.title}
                            href={it.link!}
                            target={isExternal(it.link) ? "_blank" : undefined}
                            rel={isExternal(it.link) ? "noopener noreferrer" : undefined}
                            className="flex items-center gap-2 text-sm opacity-70 hover:opacity-100 duration-300"
                        >
                            <span className="relative h-[1.1rem] w-[1.1rem] shrink-0">
                                <Image
                                    alt={it.title!}
                                    src={it.icon}
                                    fill
                                    sizes="20px"
                                    className="object-contain"
                                />
                            </span>
                            <span className="line-clamp-1">{it.title}</span>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
