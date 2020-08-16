import { useState, useEffect, useRef } from 'react'
import queryString from 'query-string'

function useDataFetching (location) {
  const query = queryString.parse(location.search)
  const [data, setData] = useState({ items: [] })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [page, setPage] = useState((query.page) ? parseInt(query.page) : 1)

  const ref = useRef()
  useEffect(() => {
    ref.current = location.search
  })
  const prevPage = ref.current

  useEffect(() => {
    if (parseInt(query.page) >= 1 && prevPage !== location.search) {
      setPage(parseInt(query.page))
    }
  })

  const ROOT_API = 'https://api.stackexchange.com/2.2/'
  const url = `${ROOT_API}questions?order=desc&sort=activity&tagged=reactjs&site=stackoverflow${(page) ? `&page=${page}` : ''}`
  useEffect(() => {
    const fetchJSON = async () => {
      await fetch(url)
        .then(response => response.json())
        .then(data => {
          if (data) {
            setData(data)
            setLoading(false)
          }
        })
        .catch(err => {
          setError(err.message)
          setLoading(false)
        })
    }
    fetchJSON()
    // if (data.items) {
    //   console.log(data.items)
    //   setLoading(false)
    // }
  }, [url])

  return [data, loading, error, page]
}

export default useDataFetching
