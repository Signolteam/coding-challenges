import "./App.css";
import { TablePage } from "./pages/TablePage";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
function App() {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <header className="App-header">
          <p></p>
        </header>
        <main>
          <TablePage />
        </main>
      </QueryClientProvider>
    </div>
  );
}

export default App;
