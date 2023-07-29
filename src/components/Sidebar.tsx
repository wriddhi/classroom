import React, { useState, useRef, useEffect } from 'react'
import { RiArrowDropDownLine } from 'react-icons/ri'
import { menu } from './Menu'
import type { MenuType, MenuItemType } from './Menu'
import { Role } from '@/types'

const MenuItem = ({ view, item, activeSibling, open, setOpen, setView }: { view: string, item: MenuItemType, activeSibling?: boolean, open: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>>, setView: React.Dispatch<React.SetStateAction<string>> }) => {

  useEffect(() => {
    if (item.children && !open) {
      setExpand(false)
    }
  }, [open])

  const [expand, setExpand] = useState(false)
  const active = item.title === view || item.children?.some((child) => child.title === view)

  return (
    <li onClick={() => {
      if (item.children) {
        setExpand(!expand)
      } else {
        setView(item.title)
        setOpen(false)
      }
    }} className={`mr-2 flex flex-col justify-between cursor-pointer ${(active && !activeSibling) ? "bg-white text-black" : `${(activeSibling && !active) ? "bg-white text-black hover:bg-black/10" : "text-btn hover:text-white hover:bg-white/20"} `} rounded-md ${expand && "pb-4"} whitespace-nowrap`}>
      <span className={`flex items-center ${open ? "justify-start text-md" : "justify-center text-xl"}  font-medium p-2 ${view === item.title && activeSibling && "bg-black text-white rounded-r-md"}`}>
        <abbr title={item.title}>
          {item.icon}
        </abbr>
        <span className={`ml-2 ${open ? "scale-100" : "hidden"} duration-300`}>{item.title}</span>
        {item.children && <RiArrowDropDownLine className={`ml-auto scale-150 duration-300 -rotate-90 ${!open && "hidden"} ${open && expand && "rotate-0"}`} />}
      </span>
      {expand && item.children && (
        <ul className={`flex flex-col justify-between border-l-2 ${active ? "border-black" : "border-white"} w-11/12 ml-auto`}>
          {item.children.map((child, index) => (
            <MenuItem activeSibling={active} view={view} setView={setView} item={child} open={open} setOpen={setOpen} key={index} />
          ))}
        </ul>
      )}
    </li>
  )
}



const Sidebar = ({ type, view, setView }: { type: Role, view: string, setView: React.Dispatch<React.SetStateAction<string>> }) => {

  const [open, setOpen] = useState<boolean>(false)
  const hamButtonRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (hamButtonRef.current) {
      hamButtonRef.current.checked = open
    }
  }, [open])

  return (
    <aside className={`bg-text ${open ? "fixed md:relative w-full md:w-80" : "w-16"} z-10 transition-all h-screen flex flex-col justify-start items-center scrollbar-thin scrollbar-thumb-black scrollbar-track-slate-900`}>
      <label className={`btn btn-circle swap swap-rotate m-4 ${open && "ml-auto"}`}>
        <input ref={hamButtonRef} onClick={() => { setOpen(!open) }} type="checkbox" />
        <svg className="swap-off fill-current" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512"><path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" /></svg>
        <svg className="swap-on fill-current" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512"><polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" /></svg>
      </label>
      <nav className={`${open ? "w-5/6" : "w-fit"} flex flex-col justify-between mx-auto mb-auto`}>
        <h2 className={`${!open && "hidden"} text-btn w-full border-b-2 border-slate-500 mb-10`}>MENU</h2>
        <ul className='flex flex-col justify-between gap-2'>
          {menu[type].map((item, index) => (
            <MenuItem view={view} setView={setView} key={index} item={item} open={open} setOpen={setOpen} />
          ))}
        </ul>
      </nav>
    </aside>
  )
}

export default Sidebar