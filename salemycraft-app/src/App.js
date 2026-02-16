import Body from "./components/Body";
import { AuthProvider } from "./utils/AuthContext";
function App() {
  return (
    <AuthProvider>
      <Body />
    </AuthProvider>
  );
}

export default App;
