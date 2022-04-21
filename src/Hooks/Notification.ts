import { notification } from "antd"

type Options = {
  title: string
  description: string
  type?: "info" | "success" | "error" | "warning"
  duration?: number
  placement?: "topLeft" | "topRight" | "bottomLeft" | "bottomRight"
}

export function useNotification({
  title,
  description,
  type = "info",
  duration = 3,
  placement = "bottomLeft",
}: Options) {
  const key = `open${Date.now()}`
  notification[type]({
    key,
    onClick: () => {
      notification.close(key)
    },
    message: title,
    description,
    duration,
    placement,
  })
}
