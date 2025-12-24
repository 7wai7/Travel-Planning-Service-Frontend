import { Navigate, Outlet } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";
import useUserStore from "../stores/UserStore";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export function ProtectedRoute() {
  const { user, setUser, me } = useUserStore();

  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["current-user"],
    queryFn: me,
    retry: false,
  });

  useEffect(() => {
    if (isSuccess && data) setUser(data);
  }, [data, isSuccess, setUser]);

  if (isLoading) return <LoadingSpinner />;
  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return <Outlet />;
}
