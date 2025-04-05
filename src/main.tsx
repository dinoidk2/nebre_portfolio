
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Enable proper integration with Lovable
// Add the root element to the document if it doesn't exist
if (!document.getElementById("root")) {
  const rootDiv = document.createElement("div");
  rootDiv.id = "root";
  document.body.appendChild(rootDiv);
}

createRoot(document.getElementById("root")!).render(<App />);
