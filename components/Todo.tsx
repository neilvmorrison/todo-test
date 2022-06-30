import { forwardRef } from "react";
import Image from "next/image";
import Datepicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "../styles/Todo.module.css";
import { Todo } from "../types/Todo";
import icon from "../public/delete-icon.png";

type TodoTileProps = {
  todo: Todo;
  updateTodo: (id: string, payload: Partial<Todo>) => Promise<void>;
  deleteTodo: (id: string) => Promise<void>;
};

export default function TodoTile({
  todo,
  updateTodo,
  deleteTodo,
}: TodoTileProps) {
  const CustomInput = forwardRef(({ onClick }, ref) => (
    <button className={styles.date} ref={ref} onClick={onClick}>
      {todo.due_date
        ? new Date(todo.due_date).toDateString()
        : "Add a due date"}
    </button>
  ));
  CustomInput.displayName = "CustomInput";

  async function toggleDone(): Promise<void> {
    await updateTodo(todo.id, { is_complete: !todo.is_complete });
  }

  async function addDueDate(date: Date): Promise<void> {
    await updateTodo(todo.id, { due_date: date });
  }

  return (
    <li className={styles.container}>
      <input
        type="checkbox"
        className={styles.checkbox}
        checked={todo?.is_complete}
        onChange={toggleDone}
      />
      <span className={styles.checkboxSpan} aria-hidden></span>
      <div style={{ width: "100%" }}>
        <div className={styles.contentContainer}>
          <h2 className={styles.todoTitle}>{todo?.title}</h2>
          <Image
            src={icon}
            alt="delete todo item"
            height={24}
            width={24}
            style={{ opacity: 0.5, cursor: "pointer" }}
            onClick={() => deleteTodo(todo.id)}
          />
        </div>
        <Datepicker
          onChange={(date: Date) => addDueDate(date)}
          customInput={<CustomInput />}
        />
      </div>
    </li>
  );
}
