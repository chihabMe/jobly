import React from "react";
import Header from "src/components/layout/Header/Header";
import Profile from "src/pages/Profile/Profile";
import ProtectedRoute from "src/wrappers/ProtectedRoute";

const ProfilePage = () => {
    return (
        <>
            <ProtectedRoute>
                <Profile/>
            </ProtectedRoute>
        </>
    );
};

export default ProfilePage;
