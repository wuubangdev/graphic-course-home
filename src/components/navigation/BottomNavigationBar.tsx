import React from 'react'
import MenuItem from './MenuItem'
import { fetchNavigationBottom } from '@/lib/strapi-lib/api/navigationBotton';
import { strapiMediaUrl } from '@/lib/strapi-lib/strapi';

const BottomNavigationBar = async () => {
    const res = await fetchNavigationBottom();
    const items = res.data.items;
    return (
        <div className='bg-white'>
            <div className='mx-auto w-full max-w-[1280px] flex justify-between px-4'>
                <div className={`w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4`}>
                    {items.map((item, i) =>
                        <MenuItem
                            key={`bottom-nav-item-${i}`}
                            icon={strapiMediaUrl(item.icon?.url) || '/test.png'}
                            title={item.title}
                            href={`/${item.link}`}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}

export default BottomNavigationBar