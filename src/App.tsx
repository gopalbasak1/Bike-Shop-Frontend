import Dashboard from "./components/layout/Dashboard/Dashboard";
import ProtectedRoute from "./components/layout/ProtectedRoute";

const App = () => {
  return (
    <>
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    </>
  );
};

export default App;
