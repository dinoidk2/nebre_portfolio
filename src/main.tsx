
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './styles/portal.css'

// Enable proper integration with Lovable
// Add the root element to the document if it doesn't exist
if (!document.getElementById("root")) {
  const rootDiv = document.createElement("div");
  rootDiv.id = "root";
  document.body.appendChild(rootDiv);
}

// Create the React root and render the app
createRoot(document.getElementById("root")!).render(<App />);
