

import { useState, useEffect } from "react"
import Header from "./components/Header"
import ToDoList from "./components/ToDoList"
import { v4 as uuidv4 } from "uuid"

function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setshowFinished] = useState(true)

  useEffect(() => {
    const todoString = localStorage.getItem("todos")
    if (todoString) {
      const todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])

  const saveToLS = (updatedTodos) => {
    localStorage.setItem("todos", JSON.stringify(updatedTodos))
  }

  const toggleFinished = (e) => {
    setshowFinished(!showFinished)
  }

  const handleEdit = (id) => {
    const t = todos.find((i) => i.id === id)
    setTodo(t.todo)
    const newTodos = todos.filter((item) => item.id !== id)
    setTodos(newTodos)
    saveToLS(newTodos)
  }

  const handleDelete = (id) => {
    const newTodos = todos.filter((item) => item.id !== id)
    setTodos(newTodos)
    saveToLS(newTodos)
  }

  const handleAdd = () => {
    const newTodos = [...todos, { id: uuidv4(), todo, isCompleted: false }]
    setTodos(newTodos)
    saveToLS(newTodos)
    setTodo("")
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleCheckbox = (id) => {
    const index = todos.findIndex((item) => item.id === id)
    const newTodos = [...todos]
    newTodos[index].isCompleted = !newTodos[index].isCompleted
    setTodos(newTodos)
    saveToLS(newTodos)
  }

  return (
    <>
      <Header />
      <div className="mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh] md:w-[35%]">
        <h1 className="font-bold text-center text-3xl">iTask - Manage your todos at one place</h1>
        <div className="addTodo my-5 flex flex-col gap-4">
          <h2 className="text-2xl font-bold">Add a Todo</h2>
          <div className="flex">
            <input
              onChange={handleChange}
              value={todo}
              type="text"
              className="w-full rounded-full px-5 py-1 border-2 border-violet-300"
              onKeyDown={(e) => {
                if (e.key === "Enter" && todo.trim() !== "") {
                  handleAdd()
                }
              }}
            />
            <button
              onClick={handleAdd}
              disabled={todo.length <= 3}
              className="bg-violet-800 mx-2 rounded-full hover:bg-violet-950 disabled:bg-violet-500 p-4 py-2 text-sm font-bold text-white"
            >
              Save
            </button>
          </div>
        </div>
        <input className="my-4" id="show" onChange={toggleFinished} type="checkbox" checked={showFinished} />
        <label className="mx-2" htmlFor="show">
          Show Finished
        </label>
        <div className="h-[1px] bg-black opacity-15 w-[90%] mx-auto my-2"></div>
        <h2 className="text-2xl font-bold">Your Todos</h2>

        <ToDoList
          todos={todos}
          showFinished={showFinished}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          handleCheckbox={handleCheckbox}
        />
      </div>
    </>
  )
}

export default App
