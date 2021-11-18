import React from "react";
import AccountLayout from "../../component/account/AccountLayout";
import UserAccount from "../../component/account/UserAccount";

export default function account() {
  return (
    <div>
      <AccountLayout>
        <UserAccount />
      </AccountLayout>
    </div>
  );
}
