import { Typography } from "@mui/material";
import "./App.css";
import { TablePage } from "./pages/TablePage";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
function App() {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <header className="App-header">
          <Typography fontWeight={700}>Company Logo</Typography>
          <Typography>Hi, Geronimo!</Typography>
        </header>
        <main>
          <TablePage />
        </main>
      </QueryClientProvider>
    </div>
  );
}

export default App;
