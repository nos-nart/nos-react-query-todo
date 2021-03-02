const BASE_URL = `http://localhost:4000`;

export const getTodos = async () => {
  const response = await fetch(`${BASE_URL}/todos`);
  if (!response.ok) throw new Error('Fetch got error!');
  const todos = await response.json();
  return JSON.parse(todos);
}

export const addTodo = async (newTodo) => {
  const response = await fetch(`${BASE_URL}/todos/new`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newTodo)
  });
  if (!response.ok) throw new Error('Add went wrong');
  return true;
}
