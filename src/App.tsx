import { useEffect } from 'react'
import './App.css'
import { useGetCollectionByIdQuery, useGetCollectionsQuery } from './store'

function App() {
  const { data: collectionsData, isLoading, error } = useGetCollectionsQuery()
  const { data: collectionData } = useGetCollectionByIdQuery(61)

  useEffect(() => {
    console.log(collectionsData)
  }, [collectionsData])

  useEffect(() => {
    console.log(collectionData)
  }, [collectionData])

  return (
    <div>
      <h1>Hello</h1>
    </div>
  )
}

export default App
