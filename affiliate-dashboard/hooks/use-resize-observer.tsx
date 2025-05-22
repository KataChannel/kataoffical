"use client"

import { useCallback, useEffect, useRef, useState } from "react"

interface Size {
  width: number | undefined
  height: number | undefined
}

export function useResizeObserver<T extends HTMLElement = HTMLDivElement>(): [
  (node: T | null) => void,
  Size,
  T | null,
] {
  const [size, setSize] = useState<Size>({
    width: undefined,
    height: undefined,
  })

  const [node, setNode] = useState<T | null>(null)
  const observer = useRef<ResizeObserver | null>(null)

  const ref = useCallback((node: T | null) => {
    setNode(node)
  }, [])

  useEffect(() => {
    if (observer.current) {
      observer.current.disconnect()
    }

    observer.current = new ResizeObserver(([entry]) => {
      const { contentRect } = entry
      setSize({
        width: contentRect.width,
        height: contentRect.height,
      })
    })

    if (node) {
      observer.current.observe(node)
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect()
      }
    }
  }, [node])

  return [ref, size, node]
}
