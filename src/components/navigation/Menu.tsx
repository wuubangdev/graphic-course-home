import React from 'react'
import Dropdown, { DropdownProps } from '../util/Dropdown';

const Menu = () => {

    const menuItems: DropdownProps[] = [
        { label: 'Home', value: '/' },
        {
            label: 'Courses',
            // value: '/courses',
            items: [
                { label: 'Design', value: '/courses/design' },
                { label: 'Development', value: '/courses/development' },
                { label: 'Marketing', value: '/courses/marketing' },
            ]
        },
        {
            label: 'Pages',
            value: '/pages'
        },
        {
            label: 'Shop',
            // value: '/shop',
            items: [
                { label: 'All Products', value: '/shop/products' },
                { label: 'Cart', value: '/shop/cart' },
                { label: 'Checkout', value: '/shop/checkout' },
            ]
        },
        {
            label: 'Blog',
            // value: '/shop',
            items: [
                { label: 'Latest Posts', value: '/blog/latest' },
                { label: 'Categories', value: '/blog/categories' },
                { label: 'Tags', value: '/blog/tags' },
            ]
        },
    ];

    return (
        <ul className='flex'>
            {menuItems.map((item, index) => (
                <Dropdown
                    key={index}
                    label={item.label}
                    value={item.value}
                    items={item.items}
                />
            ))}
        </ul>
    )
}

export default Menu