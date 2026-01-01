import Image from 'next/image'
import Link from 'next/link'
import AuthHeaderButton from './AuthHeaderButton'
import TopUtilityBar from './TopUtilityBar'
import Cart from './Cart'
import Search from './Search'
import BottomNavigationBar from './BottomNavigationBar'

const Navigation = () => {
    return (
        <section
            className='w-full bg-blue-500 z-50'
            style={{
                boxShadow: "rgba(0, 0, 0, 0.08) 0px 4px 12px",
                background:
                    "linear-gradient(180deg, rgba(26,94,255,1) 0%, rgba(20, 53, 162, 1) 65%, rgba(8, 40, 127, 1) 100%)",
            }}
        >
            <TopUtilityBar />
            <div
                className='mx-auto max-w-[1280px] px-4 md:px-0'
            >
                <div className='grid grid-cols-4 px-4 pt-4 pb-6 gap-4'>
                    <div className='flex'>
                        {/* Logo */}
                        <Link href={"/"} className='aspect-video w-3/5 relative cursor-pointer'>
                            <Image
                                alt='logo'
                                src={'/footer/169Log.png'}
                                fill={true}
                                style={{ objectFit: 'contain' }}
                                className='w-full h-full hover:scale-105 duration-300'
                            />
                        </Link>
                    </div>
                    <Search />
                    <div className='flex items-center gap-3 2xl:gap-4 justify-end'>
                        <AuthHeaderButton />
                        {/* Right bar */}
                        <Cart />
                    </div>
                </div>
            </div>
            <BottomNavigationBar />
        </section>
    )
}

export default Navigation