import useCurrentUser from '@/hooks/useCurrentUser'
import useLoginModal from '@/hooks/useLoginModal'
import { useRouter } from 'next/router'
import { FC, useCallback } from 'react'
import { IconType } from 'react-icons/lib'
import { BsDot } from 'react-icons/bs'

interface SidebarItemProps {
  label: string
  href?: string
  icon: IconType
  onClick?: () => void
  auth?: boolean
  alert?: boolean
}

const SidebarItem: FC<SidebarItemProps> = ({
  label,
  href,
  icon: Icon,
  onClick,
  auth,
  alert,
}) => {
  const loginModal = useLoginModal()

  const { data: currentUser } = useCurrentUser()

  const router = useRouter()

  const handleClick = useCallback(() => {
    if (onClick) {
      return onClick()
    }

    if (auth && !currentUser) {
      loginModal.onOpen()
    } else if (href) {
      router.push(href)
    }
  }, [onClick, router, href, auth, currentUser, loginModal])

  return (
    <div onClick={handleClick} className="flex flex-row items-center">
      <div className="relative h-14 w-14 cursor-pointer items-center justify-center rounded-full p-4 hover:bg-slate-300/10 lg:hidden">
        <Icon size={28} color="white" />
        {alert ? (
          <BsDot className="absolute -top-4 left-0 text-sky-500" size={70} />
        ) : null}
      </div>
      <div className="relative hidden cursor-pointer items-center gap-4 rounded-full p-4 hover:bg-slate-300/10 lg:flex ">
        <Icon size={24} color="white" />
        <p className="hidden text-xl text-white lg:block">{label}</p>
        {alert ? (
          <BsDot className="absolute -top-4 left-0 text-sky-500" size={70} />
        ) : null}
      </div>
    </div>
  )
}

export default SidebarItem
