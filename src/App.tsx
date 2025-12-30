import { Outlet, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import Layout from "./pages/Layout";
import AuthPage from "./pages/AuthPage";
import { ProtectedRoute } from "./components/ProtectedRoute";
import NotFoundPage from "./pages/NotFoundPage";
import MainPage from "./pages/MainPage";
import { TripProvider } from "./components/TripProvider";
import LoadingSpinner from "./components/ui/LoadingSpinner";

const MyTripsPage = lazy(() => import("./pages/MyTripsPage"));
const TripPage = lazy(() => import("./pages/TripPage"));
const TripAccessPage = lazy(() => import("./pages/TripAccessPage"));

const loadingPageSpinner = (
  <LoadingSpinner
    description="Loading page..."
    size={6}
    className="mx-auto mt-[10%]"
  />
);

function App() {
  return (
    <>
      <Routes>
        <Route path="/auth" element={<AuthPage />} />

        <Route element={<ProtectedRoute />}>
          <Route
            path="/"
            element={
              <Suspense fallback={loadingPageSpinner}>
                <Layout />
              </Suspense>
            }
          >
            <Route index element={<MainPage />} />
            <Route path="/trips" element={<MyTripsPage />} />
            <Route
              path="trips/:id"
              element={
                <TripProvider>
                  <Outlet />
                </TripProvider>
              }
            >
              <Route index element={<TripPage />} />
              <Route path="access" element={<TripAccessPage />} />
            </Route>
          </Route>
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
