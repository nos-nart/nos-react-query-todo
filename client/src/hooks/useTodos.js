import React from 'react';
import axios from 'axios';
import { useQuery, queryCache } from 'react-query';

export default function useTodos() {
  return useQuery(
    'todos',
    () => axios.get('http://localhost:4000/todos').then((res) => JSON.parse(res.data)),
    {
      onSuccess: data => {
        console.log('data: ', data);
        queryCache.setQueryData('todos', data);
      }
    }
  )
}
