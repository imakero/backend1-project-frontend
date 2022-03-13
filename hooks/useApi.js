import { useCallback, useEffect, useState } from "react"

const useApi = (endpoint, options, ignore) => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState(undefined)
  const [error, setError] = useState(null)

  const refresh = useCallback(async () => {
    setLoading(true)
    setError(false)

    try {
      const url = `/api${endpoint}`
      const res = await fetch(url, options)
      setData(await res.json())
    } catch (error) {
      console.error(error)
      setError(error)
    } finally {
      setLoading(false)
    }
  }, [endpoint, options])

  useEffect(() => {
    if (!ignore) {
      refresh()
    }
  }, [refresh, ignore])

  return { loading, error, data, refresh }
}

export default useApi
