"use client";

import React from "react";
import { Carousel } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import Image from "next/image";
import { OrganizationItem } from "@/lib/strapi-lib/api/organization";
import { strapiMediaUrl } from "@/lib/strapi-lib/strapi";

interface CustomCarouselOrgProps {
    listOrg: OrganizationItem[];
}

type ArrowProps = {
    className?: string;
    style?: React.CSSProperties; // style injected từ slick
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    dir: "prev" | "next";
};

const ArrowButton: React.FC<ArrowProps> = ({ className, style, onClick, dir }) => {
    const baseStyle: React.CSSProperties = {
        width: 24,
        height: 24,
        borderRadius: 4,
        background: "#ddd",
        border: "none",
        display: "grid",
        placeItems: "center",
        opacity: 0.75,
        zIndex: 20,
    };
    // QUAN TRỌNG: giữ style injected (left/top/transform/display) + override màu của bạn
    const mergedStyle: React.CSSProperties = { ...(style ?? {}), ...baseStyle };

    return (
        <button
            type="button"
            aria-label={dir}
            className={className}
            style={mergedStyle}
            onClick={onClick}
        >
            {dir === "prev" ? (
                <LeftOutlined style={{ color: "#fff", fontSize: 13 }} />
            ) : (
                <RightOutlined style={{ color: "#fff", fontSize: 13 }} />
            )}
        </button>
    );
};

const CustomCarouselOrg: React.FC<CustomCarouselOrgProps> = ({ listOrg }) => (
    <Carousel
        autoplay
        autoplaySpeed={5000}
        speed={2000}
        infinite
        arrows
        dots={false}
        slidesToShow={8}
        slidesToScroll={1}
        draggable
        responsive={[{ breakpoint: 640, settings: { slidesToShow: 4, slidesToScroll: 1 } }]}
        className="myCarouselOrg"
        prevArrow={<ArrowButton dir="prev" />}
        nextArrow={<ArrowButton dir="next" />}
    >
        {listOrg.map((item) => (
            <div key={item.id} className="w-full flex flex-col justify-center items-center gap-2">
                <div className="w-full flex justify-center mb-3">
                    <div className="w-[3.75rem] aspect-[1/1] relative rounded-lg overflow-hidden">
                        <Image
                            alt="carousel"
                            src={strapiMediaUrl(item.icon?.url) || "/test.png"}
                            fill
                            style={{ objectFit: "cover", borderRadius: 8 }}
                        />
                    </div>
                </div>
                <div className="text-center text-sm">{item.title}</div>
            </div>
        ))}
    </Carousel>
);

export default CustomCarouselOrg;
