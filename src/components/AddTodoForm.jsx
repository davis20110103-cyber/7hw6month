import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createTodo, TODOS_QUERY_KEY } from '../api/todos.js'

function AddTodoForm() {
  const queryClient = useQueryClient()
  const [title, setTitle] = useState('')
  const addTodo = useMutation({
    mutationFn: createTodo,
    onSuccess: (newTodo) => {
      queryClient.setQueryData(TODOS_QUERY_KEY, (todos = []) => [
        ...todos,
        newTodo,
      ])
      setTitle('')
    },
  })

  function handleSubmit(event) {
    event.preventDefault()
    const trimmedTitle = title.trim()

    if (trimmedTitle) {
      addTodo.mutate(trimmedTitle)
    }
  }

  return (
    <>
      <form className="todo-form" onSubmit={handleSubmit}>
        <label className="visually-hidden" htmlFor="todo-title">
          Название задачи
        </label>
        <input
          id="todo-title"
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Например, прочитать главу"
          disabled={addTodo.isPending}
        />
        <button type="submit" disabled={!title.trim() || addTodo.isPending}>
          {addTodo.isPending ? 'Добавление...' : 'Добавить'}
        </button>
      </form>

      {addTodo.isError && (
        <p className="error-message" role="alert">
          Не удалось добавить задачу: {addTodo.error.message}
        </p>
      )}
    </>
  )
}

export default AddTodoForm
