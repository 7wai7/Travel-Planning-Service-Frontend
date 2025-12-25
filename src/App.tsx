import { Route, Routes } from "react-router-dom";
import "./styles/App.css";
import Layout from "./pages/Layout";
import AuthPage from "./pages/AuthPage";
import MyTripsPage from "./pages/MyTripsPage";
import { ProtectedRoute } from "./components/ProtectedRoute";
import NotFoundPage from "./pages/NotFoundPage";
import MainPage from "./pages/MainPage";
import TripPage from "./pages/TripPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/auth" element={<AuthPage />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Layout />}>
            <Route index element={<MainPage />} />
            <Route path="/trips" element={<MyTripsPage />} />
            <Route path="/trips/:id" element={<TripPage />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
