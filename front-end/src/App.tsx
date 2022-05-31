import { useRoutes } from "react-router-dom"
import routes from "./router"
import { AuthProvider } from 'src/hooks/useAuth';

function App() {

  const content = useRoutes(routes);

  return (
    <AuthProvider>
      { content }
    </AuthProvider>
  )
}

export default App