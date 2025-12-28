// import { strapiFetch } from '@/lib/strapi-lib/strapi';
// import { StrapiV5Collection } from '@/lib/strapi-lib/strapi-types';
// import React from 'react'
// import FeatureGrid from './FeatureGrid';


// type LabelItem = {
//     id: number;
//     label: string;
// };

// const Feature = async () => {

//     const res = await strapiFetch<StrapiV5Collection<LabelItem>>("/api/keys", {
//         query: {
//             fields: ["label"],
//             sort: ["id:asc"],
//             pagination: { page: 1, pageSize: 50 },
//         },
//         cache: "no-store",
//     });

//     const items = res.data.map(item => item.label);

//     return (
//         <section className='pt-8'>
//             <div className='w-[80%] px-4 mx-auto'>
//                 <h1 className='text-3xl text-center font-semibold pb-6 bt-3'>Các từ khoá phổ biến</h1>
//                 <FeatureGrid items={items} />
//             </div>
//         </section>
//     )
// }

// export default Feature;