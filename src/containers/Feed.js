import React from 'react'
import styled from 'styled-components'
import Card from '../components/Card/Card'
import useDataFetching from '../useDataFetching'
import { Link } from 'react-router-dom'
// import queryString from 'query-string'

const FeedWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  margin: 5%;
`

const Alert = styled.div`
  text-align: center;
`

const CardLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`

const PaginationBar = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`

const PaginationLink = styled(Link)`
  padding: 1%;
  background: lightBlue;
  color: white;
  text-decoration: none;
  border-radius: 5px;
`

const DisableLink = styled(PaginationLink)`
  background: lightgray;
  pointer-events: none;
`

const Feed = ({ location, match }) => {
  // const ROOT_API = 'https://api.stackexchange.com/2.2/'
  // const [page] = useQueryPage(location)
  const [data, loading, error, page] = useDataFetching(location)

  if (loading || error) {
    return <Alert>{loading ? 'Loading...' : error}</Alert>
  }

  return (
    <FeedWrapper>
      {data.items.map(item => (
        <CardLink key={item.question_id} to={`/questions/${item.question_id}`}>
          <Card data={item} />
        </CardLink>
      ))}
      <PaginationBar>
        {page === 1 ? <DisableLink to=''>Previous</DisableLink> : <PaginationLink to={`${match.url}?page=${page - 1}`}>Previous</PaginationLink>}
        {data.has_more && <PaginationLink to={`${match.url}?page=${page + 1}`}>Next</PaginationLink>}
      </PaginationBar>
    </FeedWrapper>
  )
}

export default Feed
