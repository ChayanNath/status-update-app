import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import StatusUpdatePage from "./pages/StatusUpdatePage";
import Navbar from "./components/Common/Navbar";
import PrivateRoute from "./components/Common/PrivateRoute";
import PublicRoute from "./components/Common/PublicRoute";
import store from "./redux/store";
import { Provider } from "react-redux";
import { useAuth } from "./hooks/useAuth";
import TeamDetailsPage from "./pages/TeamDetailsPage";
import { injectStore } from "./api/api";
injectStore(store);

function AuthProvider({ children }) {
  useAuth();
  return children;
}

function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <Router>
          <Navbar />
          <div className="container mx-auto">
            <Routes>
              <Route
                path="/login"
                element={
                  <PublicRoute>
                    <LoginPage />
                  </PublicRoute>
                }
              />
              <Route
                path="/register"
                element={
                  <PublicRoute>
                    <RegisterPage />
                  </PublicRoute>
                }
              />
              <Route
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <DashboardPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/team/:id"
                element={
                  <PrivateRoute>
                    <TeamDetailsPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/status-update"
                element={
                  <PrivateRoute>
                    <StatusUpdatePage />
                  </PrivateRoute>
                }
              />
              <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </Provider>
  );
}

export default App;
