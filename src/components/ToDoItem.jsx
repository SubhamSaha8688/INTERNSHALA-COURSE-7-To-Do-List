
import { FaEdit } from "react-icons/fa"
import { AiFillDelete } from "react-icons/ai"

const ToDoItem = ({ item, handleEdit, handleDelete, handleCheckbox }) => {
  return (
    <div key={item.id} className={"todo flex my-3 justify-between"}>
      <div className="flex gap-5">
        <input
          name={item.id}
          onChange={() => handleCheckbox(item.id)}
          type="checkbox"
          checked={item.isCompleted}
          id={`task-${item.id}`}
        />
        <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
      </div>
      <div className="buttons flex h-full">
        <button
          onClick={() => handleEdit(item.id)}
          className="bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1"
        >
          <FaEdit />
        </button>
        <button
          onClick={() => handleDelete(item.id)}
          className="bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1"
        >
          <AiFillDelete />
        </button>
      </div>
    </div>
  )
}

export default ToDoItem
