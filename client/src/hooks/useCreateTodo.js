import axios from 'axios'
import { useMutation, queryCache } from 'react-query';

const createTodo = async ({ title, id }) => {
  const response = await axios({
    method: 'POST',
    url: 'http://localhost:4000/todos',
    data: {title, id}
  })
  console.log('response: ', response);
  return response;
}

export default function useCreateTodo() {
  return useMutation(
    createTodo,
    {
      onMutate: (newTodo) => {
        // const previousTodos = queryCache.getQueryData('todos')

        // if (queryCache.getQueryData('todos')) {
        //   queryCache.setQueryData('todos', old => [...old, newTodo])
        // }

        // return () => queryCache.setQueryData('todos', previousTodos)
      },
      onError: (error, _newTodo, rollback) => {
        console.error(error);
        if (rollback) rollback()
      },
      onSettled: () => {
        // queryCache.invalidateQueries('todos');
      }
    }
  )
}