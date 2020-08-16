import React from 'react'
import styled from 'styled-components'
import useDataFetching from '../useDataFetching'
import Card from '../components/Card/Card'

const QuestionWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  margin: 5%;
`

const Alert = styled.div`
  text-align: center;
`

function Question ({ match }) {
  const ROOT_API = 'https://api.stackexchange.com/2.2/'
  const [data, loading, error] = useDataFetching(`${ROOT_API}questions/${match.params.id}?site=stackoverflow`)

  console.log(error)
  if (loading || error) {
    return <Alert>{loading ? 'Loading...' : error}</Alert>
  }

  return (
    <QuestionWrapper>
      <Card key={data.items[0].question_id} data={data.items[0]} />
    </QuestionWrapper>
  )
}

export default Question
