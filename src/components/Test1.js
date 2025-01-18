import { useQuery } from '@tanstack/react-query'
import React from 'react'

const Test1 = () => {
  

  // Using object syntax with queryKey and queryFn
  const { isLoading, data, error } = useQuery({
    queryKey: ['data1'],  // queryKey should be an array
    queryFn: apicall      // queryFn is the function to fetch data
  });

   async function apicall() {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts');
    const data = await res.json();
    return data;
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error</p>;
  }

  return (
    <div>
      <p>Data Loaded</p>
      {/* Render your data here */}
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default Test1;
