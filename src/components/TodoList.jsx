import {
  useMutation,
  useMutationState,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import { fetchTodos, TODOS_QUERY_KEY, updateTodo } from '../api/todos.js'

function TodoList() {
  const queryClient = useQueryClient()
  const {
    data: todos = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: TODOS_QUERY_KEY,
    queryFn: fetchTodos,
  })
  const updateTodoMutation = useMutation({
    mutationKey: ['todos', 'update'],
    mutationFn: updateTodo,
    onSuccess: (updatedTodo, variables) => {
      queryClient.setQueryData(TODOS_QUERY_KEY, (currentTodos = []) =>
        currentTodos.map((todo) =>
          todo.id === variables.id
            ? { ...todo, ...updatedTodo, ...variables }
            : todo,
        ),
      )
    },
  })
  const pendingTodoIds = useMutationState({
    filters: { mutationKey: ['todos', 'update'], status: 'pending' },
    select: (mutation) => mutation.state.variables.id,
  })

  return (
    <>
      <div className="list-heading">
        <h2>Список задач</h2>
        {!isLoading && !isError && (
          <span className="task-count">{todos.length}</span>
        )}
      </div>

      {isLoading && <p className="status-message">Загрузка...</p>}
      {isError && (
        <p className="error-message" role="alert">
          Не удалось загрузить задачи: {error.message}
        </p>
      )}

      {!isLoading && !isError && (
        <ul className="todo-list">
          {todos.map((todo) => {
            const isPending = pendingTodoIds.includes(todo.id)

            return (
              <li
                className={`todo-item${todo.completed ? ' is-completed' : ''}`}
                key={todo.id}
              >
                <label className="todo-label">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    disabled={isPending}
                    onChange={(event) =>
                      updateTodoMutation.mutate({
                        id: todo.id,
                        completed: event.target.checked,
                      })
                    }
                  />
                  <span>{todo.title}</span>
                </label>
                {isPending && (
                  <span className="saving-indicator">Сохранение...</span>
                )}
              </li>
            )
          })}
        </ul>
      )}

      {updateTodoMutation.isError && (
        <p className="error-message" role="alert">
          Не удалось обновить задачу: {updateTodoMutation.error.message}
        </p>
      )}
    </>
  )
}

export default TodoList
