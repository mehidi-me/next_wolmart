import React from "react";
import AccountLayout from "../../component/account/AccountLayout";
import UserDashboard from "../../component/account/UserDashboard";

export default function dashboard() {
  return (
    <div>
      <AccountLayout>
        <UserDashboard />
      </AccountLayout>
    </div>
  );
}
