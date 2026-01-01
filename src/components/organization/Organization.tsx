import { fetchOrganization, OrganizationItem } from '@/lib/strapi-lib/api/organization';
import React from 'react'
import CustomCarouselOrg from '../carousel/CustomCarouselOrg';

const Organization = async () => {
    const res = await fetchOrganization();
    console.log(res.data)
    const organizationList: OrganizationItem[] = res.data?.ogranizations || [];
    return (
        <section className='mx-auto max-w-[1289] w-full bg-white rounded-lg pt-6 pb-8 px-12'>
            <CustomCarouselOrg listOrg={organizationList} />
        </section>
    )
}

export default Organization