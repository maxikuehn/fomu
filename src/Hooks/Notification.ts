import { message } from "antd"

type Options = {
  content: string
  type?: "info" | "success" | "error" | "warning" | "loading"
  duration?: number
}

export function useNotification({
  content,
  type = "success",
  duration = 2,
}: Options) {
  const key = `open${Date.now()}`
  message.open({
    key,
    type,
    content,
    duration,
    onClick: () => {
      message.destroy(key)
    },
    className: "cursor-pointer mt-[env(safe-area-inset-top)]",
  })
}
