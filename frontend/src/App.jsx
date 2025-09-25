import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Landing } from "./components/Landing";
import { ShoppingList } from "./components/ShoppingList";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/shoppinglist" element={<ShoppingList />} />
      </Routes>
    </Router>
  );
}

export default App;
