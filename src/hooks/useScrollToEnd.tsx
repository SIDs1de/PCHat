import { useEffect, useRef, useState } from 'react'

export default function useScrollToEnd(messages) {
  const [messagesLoaded, setMessagesLoaded] = useState(false)
  const scrollableRef = useRef(null)

  const scrollToEnd = el => {
    if (el) {
      el.scrollTop = el.scrollHeight
    }
  }

  useEffect(() => {
    if (messagesLoaded) {
      const el = scrollableRef.current
      scrollToEnd(el)
    }
  }, [messagesLoaded])

  useEffect(() => {
    if (messages.length) {
      setMessagesLoaded(true)

      const el = scrollableRef.current
      const scrollTop = el.scrollTop
      const scrollHeight = el.scrollHeight
      const offsetHeight = el.offsetHeight

      if (scrollHeight - (scrollTop + offsetHeight) <= 50) {
        scrollToEnd(el)
      }
    }
  }, [messages])

  return { scrollableRef }
}
