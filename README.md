# react query

## server

+ express
+ mongoose

## client

+ react
+ react-query
+ antd

### what I've learned

**👉 React-query dectects user's interactions to hint react-query when things should be update (window refocus event -when user refocus the browser so data is going to be updated on the background)**

**👉 useQuery for reading data**

**👉 useMutation for creating, changing, or  deleting data**

`App.js`

```jsx
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()

function App() {
    return <QueryClientProvider client={queryClient}>...</QueryClientProvider>
}
```

### Query

`useTodos.js`

```js
import React from 'react';
import axios from 'axios';
import { useQuery, queryCache } from 'react-query';

export default function useTodos() {
  return useQuery(
    'todos',
    () => axios.get('http://localhost:4000/todos').then((res) => JSON.parse(res.data)),
  )
}
```

`TodoList.jsx`

```jsx
const todoQuery = useTodos();

<Table
    style={{ width: '100%' }}
    bordered={true}
    loading={todoQuery.isLoading}
    hasData={todoQuery.data && todoQuery.data.length}
    dataSource={todoQuery.data}
    pagination={false}
    size="small"
>
```

### Post

`useCreateTodo.js`

```js
export default function useCreateTodo() {
  const queryClient = useQueryClient();

  return useMutation(
    createTodo,
    {
      onMutate: async (newTodo) => {
        // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
        await queryClient.cancelQueries("todos");
        // Snapshot the previous value
        const previousValue = queryClient.getQueryData("todos");
        // Optimistically update to the new value
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
```

### server

**PUT should send the entire object, for instance**

```js
/users/1
PUT {id: 1, username: 'skwee357', email: 'newemail@domain.com'}
```

**PUT may not be too effective is that your only really modifying one field and including the username is kind of useless**

**When you use a PATCH, you only update the field you specify and leave the rest alone**
