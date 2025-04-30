import ToDoItem from "./ToDoItem"

const ToDoList = ({ todos, showFinished, handleEdit, handleDelete, handleCheckbox }) => {
  return (
    <div className="todos">
      {todos.length === 0 && <div className="m-5">No Todos to display</div>}
      {todos.map((item) => {
        return (
          (showFinished || !item.isCompleted) && (
            <ToDoItem
              key={item.id}
              item={item}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
              handleCheckbox={handleCheckbox}
            />
          )
        )
      })}
    </div>
  )
}

export default ToDoList
