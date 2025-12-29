import { fetchFeatures } from '@/lib/strapi-lib/api/feature';
import type { Feature } from '@/lib/strapi-lib/api/feature';
import React from 'react'
import FeatureItem from './FeatureItem';

const Feature = async () => {
    const res = await fetchFeatures();
    const features: Feature[] = res.data;
    return (
        <div className='flex justify-center gap-6 flex-wrap'>
            {features.map((feature) => <FeatureItem key={feature.id} feature={feature} />)}
        </div>
    )
}

export default Feature