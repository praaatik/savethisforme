import { useEffect } from 'react'
import './App.css'
import { useGetCollectionByIdQuery, useGetCollectionsQuery } from './store'

function App() {
  const { data: collectionsData, isLoading, error, isError } = useGetCollectionsQuery()

  useEffect(() => {
    console.log(collectionsData)
  }, [collectionsData])

  return (
    <div>
      <h1>Hello</h1>
    </div>
  )
}

export default App
