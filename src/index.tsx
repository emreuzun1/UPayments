import { createRoot, Root } from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

const container: HTMLElement = document.getElementById("root")!;
const root: Root = createRoot(container);

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
