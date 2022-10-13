import React from "react";
import Header from "src/components/layout/Header/Header";
import ProtectedRoute from "src/wrappers/ProtectedRoute";

const ProfilePage = () => {
  return (
    <>
      <ProtectedRoute>
        <div>ProfilePage</div>
      </ProtectedRoute>
    </>
  );
};

export default ProfilePage;
