import { Route, Routes } from "react-router-dom";
import LibrarianDashboard from "./components/librarian/LibrarianDashboard";
import LibrarianPanel from "./pages/LibrarianPanel";

function App() {
  return (
    <Routes>
      <Route index element={<LibrarianPanel />} />
    </Routes>
  );
}

export default App;
