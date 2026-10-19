(function () {
  const todos = [
    { id: 1, text: "Read the WebMCP explainer", done: false }
  ];
  let nextTodoId = 2;

  const todoList = document.getElementById("todoList");
  const todoForm = document.getElementById("todoForm");
  const todoInput = document.getElementById("todoInput");

  function renderTodos() {
    todoList.replaceChildren();

    todos.forEach((todo) => {
      const listItem = document.createElement("li");
      listItem.textContent = `#${todo.id} ${todo.text}`;
      listItem.classList.toggle("is-complete", todo.done);
      todoList.appendChild(listItem);
    });
  }

  function addTodo(text) {
    const todo = { id: nextTodoId++, text, done: false };
    todos.push(todo);
    renderTodos();
    return todo;
  }

  todoForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const text = todoInput.value.trim();

    if (!text) return;

    addTodo(text);
    todoForm.reset();
    todoInput.focus();
  });

  renderTodos();

  window.webMcpTodoApp = {
    addTodo,
    getTodos: () => todos,
    completeTodo(id) {
      const todo = todos.find((item) => item.id === id);
      if (!todo) return null;

      todo.done = true;
      renderTodos();
      return todo;
    }
  };
})();