import React from 'react'
import Link from 'next/link'
import { twMerge } from 'tailwind-merge'
import { RxCaretDown, RxCaretUp } from 'react-icons/rx'

const ListItem = ({ id, label, link, activeMenu, Icon, closeMobileDrawer }: { id: number, label: string, link: string, activeMenu: any, Icon: any, closeMobileDrawer?: () => void }) => {
    return (
        <span className="flex py-3 px-3 items-center w-full h-full">
            <div className="w-10">
                <Icon
                    size={20}
                    className={twMerge(
                        activeMenu?.id === id
                            ? "text-primary"
                            : "text-black"
                    )}
                />
            </div>
            <Link href={link} prefetch={false} onClick={() => closeMobileDrawer && closeMobileDrawer()}>
                <span
                    className={twMerge(
                        "text-md font-medium text-gray-600",
                        activeMenu?.id === id ? "text-primary" : "text-black"
                    )}
                >
                    {label}
                </span>
            </Link>
        </span>
    )
}
const HeaderSection = ({ id, label, link, activeMenu, Icon, toggleCollapseHandle, isCollapse, isSubMenu, toggleCollapseSubsHandle }: { id: number, label: string, link: string, activeMenu: any, Icon: any, toggleCollapseHandle: () => void, isCollapse: boolean, isSubMenu: boolean, toggleCollapseSubsHandle: (e: boolean) => void }) => {
    return (
        <div className='flex flex-row gap-3 items-center'>
            <div onClick={toggleCollapseHandle}>
                <ListItem id={id} label={label} link={link} activeMenu={activeMenu} Icon={Icon} />
            </div>
            {isSubMenu && <div className='cursor-pointer' onClick={() => toggleCollapseSubsHandle(!isCollapse)}>
                {isCollapse ? <RxCaretUp size={20} /> : <RxCaretDown size={20} />}
            </div>}
        </div>

    )
}
interface SubRouteNavigationProps {
    activeMenu: any
    menu: any
    isMobileDrawerOpen: boolean
    setIsMobileDrawerOpen: (e: boolean) => void
    closeMobileDrawer?: () => void
}

export default function SubRouteNavigation({ activeMenu, menu, closeMobileDrawer }: SubRouteNavigationProps) {
    const [toggleCollapse, setToggleCollapse] = React.useState(false)
    return (
        <div>
            <HeaderSection
                isCollapse={toggleCollapse}
                toggleCollapseSubsHandle={setToggleCollapse}
                toggleCollapseHandle={() => { setToggleCollapse(!toggleCollapse), closeMobileDrawer && closeMobileDrawer() }}
                Icon={menu?.icon}
                activeMenu={activeMenu}
                id={menu?.id}
                label={menu.label}
                link={menu.link}
                isSubMenu={!!menu?.Children}
            />
            {!!menu?.Children && toggleCollapse ? <ul className='flex flex-col gap-3 ml-4'>
                {menu.Children.length && menu.Children.map((subMenu: any) => {
                    return <ListItem
                        closeMobileDrawer={closeMobileDrawer}
                        key={subMenu?.id + subMenu?.label}
                        id={subMenu?.id}
                        label={subMenu?.label}
                        link={subMenu?.link}
                        activeMenu={activeMenu}
                        Icon={subMenu?.icon}
                    />
                })}
            </ul> : null}

        </div>
    )
}
