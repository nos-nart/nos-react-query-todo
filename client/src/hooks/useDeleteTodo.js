import axios from 'axios'
import { useMutation, useQueryClient } from 'react-query';

const deleteTodo = async ({id}) => {
  const response = await axios({
    method: 'DELETE',
    url: 'http://localhost:4000/todos',
    data: {id}
  })
  return response;
}

export default function useDeleteTodo() {
  const queryClient = useQueryClient();

  return useMutation(
    deleteTodo,
    {
      onMutate: async () => {
      },
      onError: (error, _newTodo, rollback) => {
        //   If there is an errror, then we will reset the tasks to previous tasks
        console.error(error);
        if (rollback) rollback()
      },
      onSettled: () => {
        queryClient.invalidateQueries('todos');
      }
    }
  )
}
