import React, { useEffect, useState } from "react";
import "../componentsCss/TodoApp.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiOutlinePlus } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { MdKeyboardArrowLeft } from "react-icons/md";
const TodoApp = () => {
  const [editTodoId, setEditTodoId] = useState(-1);
  const [todoList, setTodoList] = useState([]);
  const [input, setInput] = useState("");
  const date = () => {
    return Date().slice(0, 15);
  };
  useEffect(() => {
    const renderTodoArr = JSON.parse(localStorage.getItem("id"));
    if (renderTodoArr === null) {
      setTodoList([]);
    } else {
      console.log();
      setTodoList(renderTodoArr);
    }
  }, []);

  const onClickAddTodo = (e) => {
    if (e.key === "Enter") {
      if (input.length !== 0) {
        if (editTodoId !== -1) {
          setTodoList(
            todoList.map((todo, key) => (editTodoId === key ? input : todo))
          );
          localStorage.setItem(
            "id",
            JSON.stringify(
              todoList.map((todo, key) => (editTodoId === key ? input : todo))
            )
          );
          setInput("");
          setEditTodoId(-1);
        } else {
          todoList.push(input);
          localStorage.setItem("id", JSON.stringify(todoList));
          setInput("");
        }
      } else {
        toast.error("Please enter your new todo");
      }
    }
  };
  const handlerRemoveTodo = (id) => {
    setTodoList(todoList.filter((todo, key) => key !== id));
    localStorage.setItem(
      "id",
      JSON.stringify(todoList.filter((todo, key) => key !== id))
    );
  };
  const handlerEditTodo = (todo, id) => {
    setEditTodoId(id);
    setInput(todo);
  };
  return (
    <div>
      <div className="todoListContainer">
        <div className="mainContainer">
          <div className="header">
            <div>
              <MdKeyboardArrowLeft className="leftArrow" />
            </div>
            <div className="date">
              <h1>{date()}</h1>
            </div>
            <div>
              <AiOutlinePlus className="addBtn" />
            </div>
          </div>
          <div className="inputSection">
            <div className="addTaskList">
              <AiOutlinePlus className="addTask" />
            </div>
            <input
              type="text"
              className="inputTask"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onClickAddTodo}
            />
          </div>
          <hr />
          <div className="taskList">
            {todoList &&
              todoList.map((todo, key) => {
                return (
                  <div>
                    <div className="todoRenderContainer">
                      <li>{todo}</li>
                      <div className="MenuContainer">
                        <FaEdit
                          className="editTodo"
                          onClick={() => handlerEditTodo(todo, key)}
                        />
                        <RxCross2
                          className="removeTodo"
                          onClick={() => handlerRemoveTodo(key)}
                        />
                      </div>
                    </div>
                    <hr />
                  </div>
                );
              })}
          </div>
          <div className="endContainer">
            <span
              onClick={() => {
                setTodoList([]);
                localStorage.clear();
              }}
            >
              Clear all todo's
            </span>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default TodoApp;
