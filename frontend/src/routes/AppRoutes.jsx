import ForgotPassword from "../pages/ForgotPassword"
import { Routes, Route } from "react-router-dom"
import Home from "../pages/Home"
import Login from "../pages/Login"
import Register from "../pages/Register"
import Dashboard from "../pages/Dashboard"
import ProtectedRoute from "./ProtectedRoute"
export default function AppRoutes() {

    return (
        <Routes>

            {/* PUBLIC ROUTES */}

            <Route
                path="/"
                element={<Home />}
            />

            <Route
                path="/login"
                element={<Login />}
            />

            <Route
                path="/register"
                element={<Register />}
            />
            {/* ADMIN ONLY */}

            <Route
                path="/admin"
                element={
                    <ProtectedRoute
                        allowedRoles={["ADMIN"]}
                    >
                        <Dashboard />
                    </ProtectedRoute>
                }
            />
            {/* PATIENT ONLY */}

            <Route
                path="/patient"
                element={
                    <ProtectedRoute
                        allowedRoles={["PATIENT"]}
                    >
                        <Dashboard />
                    </ProtectedRoute>
                }
            />
            {/* CAREGIVER ONLY */}

            <Route
                path="/caregiver"
                element={
                    <ProtectedRoute
                        allowedRoles={["CAREGIVER"]}
                    >
                        <Dashboard />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/forgot-password"
                element={<ForgotPassword />}
            />

            {/* ALL LOGGED IN USERS */}

            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute
                        allowedRoles={[
                            "ADMIN",
                            "PATIENT",
                            "CAREGIVER"
                        ]}
                    >
                        <Dashboard />
                    </ProtectedRoute>
                }
            />

        </Routes>
    )
}