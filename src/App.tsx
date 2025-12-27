import { Route, Routes } from "react-router-dom";
import Layout from "./pages/Layout";
import AuthPage from "./pages/AuthPage";
import MyTripsPage from "./pages/MyTripsPage";
import { ProtectedRoute } from "./components/ProtectedRoute";
import NotFoundPage from "./pages/NotFoundPage";
import MainPage from "./pages/MainPage";
import TripPage from "./pages/TripPage";
import TripAccessPage from "./pages/TripAccessPage";
import { TripProvider } from "./components/TripProvider";

function App() {
  return (
    <>
      <Routes>
        <Route path="/auth" element={<AuthPage />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Layout />}>
            <Route index element={<MainPage />} />
            <Route path="/trips" element={<MyTripsPage />} />
            <Route
              path="/trips/:id"
              element={
                <TripProvider>
                  <TripPage />
                </TripProvider>
              }
            />
            <Route
              path="/trips/:id/access"
              element={
                <TripProvider>
                  <TripAccessPage />
                </TripProvider>
              }
            />
          </Route>
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
