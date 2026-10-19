(function () {
  const toolRegistry = window.webMcpToolRegistry;
  const apiStatus = document.getElementById("apiStatus");
  const toolList = document.getElementById("toolList");
  const toolSelect = document.getElementById("toolSelect");
  const toolArguments = document.getElementById("toolArguments");
  const toolCallForm = document.getElementById("toolCallForm");
  const callLog = document.getElementById("callLog");

  function renderToolCards() {
    toolRegistry.tools.forEach((tool) => {
      const card = document.createElement("article");
      const name = document.createElement("h3");
      const description = document.createElement("p");
      const schema = document.createElement("pre");
      const option = document.createElement("option");

      card.className = "tool-card";
      name.textContent = tool.name;
      description.textContent = tool.description;
      schema.textContent = JSON.stringify(tool.inputSchema, null, 2);
      option.value = tool.name;
      option.textContent = tool.name;

      card.append(name, description, schema);
      toolList.appendChild(card);
      toolSelect.appendChild(option);
    });
  }

  function setExampleArguments() {
    const examples = {
      add_todo: { text: "Buy milk" },
      list_todos: {},
      complete_todo: { id: 1 }
    };

    toolArguments.value = JSON.stringify(examples[toolSelect.value] || {}, null, 2);
  }

  apiStatus.textContent = toolRegistry.nativeAvailable
    ? "Native WebMCP API detected. Registered tools are also available to the browser."
    : "Native WebMCP is unavailable here. Use this inspector to call the locally registered tools; enable chrome://flags/#enable-webmcp-testing in a supported Chrome build to try browser registration.";

  toolSelect.addEventListener("change", setExampleArguments);
  toolCallForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const toolName = toolSelect.value;
    let argumentsObject;

    try {
      argumentsObject = JSON.parse(toolArguments.value || "{}");
    } catch {
      callLog.textContent = "Invalid JSON arguments.";
      return;
    }

    const tool = toolRegistry.tools.get(toolName);
    if (!tool) {
      callLog.textContent = `Unknown tool: ${toolName}`;
      return;
    }

    try {
      const result = await tool.execute(argumentsObject);
      callLog.textContent = `> ${toolName}(${JSON.stringify(argumentsObject)})\n${JSON.stringify(result, null, 2)}`;
    } catch (error) {
      callLog.textContent = `Tool call failed: ${error.message}`;
    }
  });

  renderToolCards();
  setExampleArguments();
})();