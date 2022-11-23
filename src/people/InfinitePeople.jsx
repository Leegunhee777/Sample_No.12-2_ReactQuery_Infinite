import InfiniteScroll from "react-infinite-scroller";
import { useInfiniteQuery } from 'react-query';

import { Person } from "./Person";

const initialUrl = "https://swapi.dev/api/people/";

const fetchUrl = async (url) => {
  const response = await fetch(url);
  return response.json();
};

export function InfinitePeople() {



  const { data, fetchNextPage, hasNextPage, isLoading, isFetching, isError, error } = 
  useInfiniteQuery(
    'sw-people', 
    ({ pageParam = initialUrl }) => fetchUrl(pageParam), 
    {
      //초기 ({ pageParam = initialUrl }) => fetchUrl(pageParam)를 통해 데이터가 받아지면, 그다음 pageParam 셋팅은 getNextPageParam의 return을 통해 셋팅된다.
      getNextPageParam: (lastPage) => lastPage.next || undefined,
    }
  );


  if( isLoading ) return <div className="loading"> Loading...</div>
  
  if( isError ) return <div> Error! {error.toString()}</div>
  
  // TODO: get data for InfiniteScroll via React Query
  return (
    <>
      {isFetching &&  <div className="loading"> Loading...</div>}
      <InfiniteScroll
        //({ pageParam = initialUrl }) => fetchUrl(pageParam) fetch함수를 실행시켜주는 trigger 함수이다.
        loadMore={fetchNextPage}
        //getNextPageParam에서 return 되는 결과가 boolean으로 들어가게된다.
        hasMore={hasNextPage}
      >
        {data?.pages.map((pageData)=>{
          return pageData.results.map((person)=>{
            return <Person 
              key={person.name}
              name={person.name}
              hairColor={person.hair_color}
              eyeColor={person.eye_color}
              />
          })
        })}
      </InfiniteScroll>
    </>

  ) 
}
