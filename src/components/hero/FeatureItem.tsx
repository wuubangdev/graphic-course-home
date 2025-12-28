'use client'

import { useScrollToSelector } from '@/hooks/useScrollToSelector';
import { Feature } from '@/lib/strapi-lib/api/feature';
import { strapiMediaUrl } from '@/lib/strapi-lib/strapi';
import Image from 'next/image';
import React from 'react';

interface FeatureItemProps {
    feature: Feature;
    offset?: number; // nếu có header fixed
}

const FeatureItem: React.FC<FeatureItemProps> = ({ feature, offset = 0 }) => {
    const scrollTo = useScrollToSelector({ offset });

    return (
        <button
            type="button"
            onClick={() => scrollTo(feature.selector)}
            className="w-full flex flex-col items-center text-center p-3 cursor-pointer group"
        >
            {/* Icon area: cố định chiều cao để không nhảy */}
            <span className="h-16 w-16 flex items-center justify-center">
                <Image
                    alt={feature.title}
                    src={strapiMediaUrl(feature.icon?.url) || '/icon-placeholder.png'}
                    width={64}
                    height={64}
                    className="group-hover:scale-105 duration-300"
                />
            </span>

            {/* Title area: cố định chiều cao + clamp 2 dòng */}
            <span className="mt-3 h-12 flex items-center justify-center">
                <span className="font-semibold leading-tight line-clamp-2">
                    {feature.title}
                </span>
            </span>
        </button>
    );
};

export default FeatureItem;
