(function () {
  const nativeModelContext = document.modelContext || navigator.modelContext || null;
  const registeredTools = new Map();

  async function registerTool(tool) {
    registeredTools.set(tool.name, tool);

    if (!nativeModelContext || typeof nativeModelContext.registerTool !== "function") {
      return;
    }

    try {
      await nativeModelContext.registerTool(tool);
    } catch (error) {
      console.warn(`Could not register ${tool.name} with native WebMCP:`, error);
    }
  }

  function textResult(text, isError = false) {
    return {
      content: [{ type: "text", text }],
      ...(isError ? { isError: true } : {})
    };
  }

  const todoTools = [
    {
      name: "add_todo",
      description: "Add a new item to the user's todo list.",
      inputSchema: {
        type: "object",
        properties: {
          text: { type: "string", description: "The todo text" }
        },
        required: ["text"]
      },
      async execute({ text }) {
        const todo = window.webMcpTodoApp.addTodo(text);
        return textResult(`Added todo #${todo.id}: ${todo.text}`);
      }
    },
    {
      name: "list_todos",
      description: "Return all todos with their ids and done status.",
      inputSchema: { type: "object", properties: {} },
      async execute() {
        return textResult(JSON.stringify(window.webMcpTodoApp.getTodos()));
      }
    },
    {
      name: "complete_todo",
      description: "Mark a todo as done by id.",
      inputSchema: {
        type: "object",
        properties: { id: { type: "number", description: "The todo id" } },
        required: ["id"]
      },
      async execute({ id }) {
        const todo = window.webMcpTodoApp.completeTodo(id);
        if (!todo) return textResult(`No todo with id ${id}`, true);
        return textResult(`Completed #${id}`);
      }
    }
  ];

  todoTools.forEach(registerTool);

  window.webMcpToolRegistry = {
    nativeAvailable: Boolean(nativeModelContext),
    tools: registeredTools
  };
})();