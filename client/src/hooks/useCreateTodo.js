import axios from 'axios'
import { useMutation, useQueryClient } from 'react-query';

const createTodo = async ({ title, id }) => {
  const response = await axios({
    method: 'POST',
    url: 'http://localhost:4000/todos',
    data: {title, id}
  })
  return response;
}

export default function useCreateTodo() {
  const queryClient = useQueryClient();

  return useMutation(
    createTodo,
    {
      onMutate: async (newTodo) => {
        await queryClient.cancelQueries("todos");
        const previousValue = queryClient.getQueryData("todos");

        queryClient.setQueryData("todos", (old) => [...old, newTodo]);

        return previousValue;
      },
      onError: (error, _newTodo, rollback) => {
        console.error(error);
        if (rollback) rollback()
      },
      onSettled: () => {
        queryClient.invalidateQueries('todos');
      }
    }
  )
}