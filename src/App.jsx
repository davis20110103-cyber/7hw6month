import AddTodoForm from './components/AddTodoForm.jsx'
import TodoList from './components/TodoList.jsx'


function App() {
  return (
    <main className="app">
      <section className="todo-card" aria-labelledby="page-title">
        <p className="eyebrow">Планируйте свой день</p>
        <h1 id="page-title">Мои задачи</h1>
        <p className="intro">Добавляйте дела и отмечайте выполненные.</p>
        <AddTodoForm />
        <TodoList />
        <p className="api-note">
          Данные предоставлены JSONPlaceholder и не сохраняются после перезагрузки.
        </p>
      </section>
    </main>
  )
}

export default App
