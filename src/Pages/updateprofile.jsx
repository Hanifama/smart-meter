import React from "react";
import FormEditProfile from "../components/Fragments/FormEditProfile";
import AuthLayouts from "../components/Layouts/AuthLayouts";

function UpdateProfile() {
  return (
    <AuthLayouts
            title="Update Profile"
            desc="Masukan Detail Profile Baru Untuk Mengubah"
            type="updateProfile"
        >
            <FormEditProfile />
        </AuthLayouts>
  );
}

export default UpdateProfile;
