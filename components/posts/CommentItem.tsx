import { formatDistanceToNowStrict } from 'date-fns'
import { useRouter } from 'next/router'
import { FC, useCallback, useMemo } from 'react'
import Avatar from '../Avatar'

interface CommentItemProps {
  data: Record<string, any>
}

const CommentItem: FC<CommentItemProps> = ({ data }) => {
  const router = useRouter()

  const goToUser = useCallback(
    (event: any) => {
      event.stopPropagation()

      router.push(`/users/${data.user.id}`)
    },
    [router, data.user.id]
  )

  const createdAt = useMemo(() => {
    if (!data?.createdAt) {
      return null
    }
    return formatDistanceToNowStrict(new Date(data.createdAt))
  }, [data?.createdAt])

  return (
    <div className="cursor-pointer border-b-[1px] border-neutral-800 p-5 transition hover:bg-neutral-900">
      <div className="flex flex-row items-start gap-3">
        <Avatar userId={data.user.id} />
        <div>
          <div className="flex flex-row items-center gap-2">
            <p
              onClick={goToUser}
              className="cursor-pointer font-semibold text-white hover:underline"
            >
              {data.user.name}
            </p>
            <span className="hidden cursor-pointer text-neutral-500 hover:underline md:block">
              @{data.user.username}
            </span>
            <span className="text-sm text-neutral-500">{createdAt}</span>
          </div>
          <div className="mt-1 text-white">{data.body}</div>
        </div>
      </div>
    </div>
  )
}

export default CommentItem
