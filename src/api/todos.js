export const TODOS_QUERY_KEY = ['todos']
const API_URL = 'https://jsonplaceholder.typicode.com/todos'

async function request(url, options) {
  const response = await fetch(url, options)

  if (!response.ok) {
    throw new Error(`Ошибка запроса: ${response.status}`)
  }

  return response.json()
}

export function fetchTodos() {
  return request(`${API_URL}?_limit=10`)
}

export function createTodo(title) {
  return request(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, completed: false, userId: 1 }),
  })
}

export function updateTodo({ id, completed }) {
  return request(`${API_URL}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ completed }),
  })
}
