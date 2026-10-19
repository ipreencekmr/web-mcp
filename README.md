# WebMCP Todo Demo

A small, dependency-free todo app that demonstrates exposing app actions as WebMCP tools. It includes a built-in inspector for viewing registered tools and calling them with JSON arguments.

<img width="524" height="749" alt="Screenshot 2026-10-19 at 11 12 29 AM" src="https://github.com/user-attachments/assets/755c5926-2dd3-43ea-8f56-a85505b40ad5" />

<img width="749" height="96" alt="Screenshot 2026-10-19 at 11 18 48 AM" src="https://github.com/user-attachments/assets/70f0fc89-d8b2-4fca-87d8-9b419589365f" />

<img width="1510" height="744" alt="Screenshot 2026-10-19 at 11 20 35 AM" src="https://github.com/user-attachments/assets/0b91b175-562d-4131-a778-104779b2716c" />


## Run locally

Serve the project directory over HTTP (rather than opening the HTML file directly):

```sh
python3 -m http.server 8000
```

Then open <http://localhost:8000/webmcp.html> in your browser.

## WebMCP support

The app always registers its tools locally so they can be called from the inspector. When the browser exposes `document.modelContext` or `navigator.modelContext`, the app also attempts to register the tools with the native WebMCP API.

For a supported Chrome build, enable `chrome://flags/#enable-webmcp-testing` to try browser registration. Without native WebMCP support, the todo app and local tool inspector still work.

## Available tools

| Tool | Arguments | Action |
| --- | --- | --- |
| `add_todo` | `{"text":"Buy milk"}` | Add a todo |
| `list_todos` | `{}` | Return all todos and their completion status |
| `complete_todo` | `{"id":1}` | Mark the todo with that ID as done |

Select a tool in the inspector, edit its JSON arguments if needed, and choose **Call tool**. Results and errors appear below the form.

## Project files

- `webmcp.html` — demo page and script entry point
- `webmcp-demo.css` — responsive page styling
- `scripts/todo-app.js` — todo state and UI
- `scripts/webmcp-tools.js` — tool definitions and native WebMCP registration
- `scripts/tool-inspector.js` — local tool inspector
