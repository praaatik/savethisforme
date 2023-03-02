To check if the output from the query is having an error or having the data

```ts
useEffect(() => {
  if (collectionsData && Array.isArray(collectionsData)) {
    console.log("collectionName" in collectionsData[0]);
    console.log(collectionsData);
  } else {
    console.log("error!");
    console.log(collectionsData);
    console.log(error);
  }
}, [collectionsData, error]);
```
