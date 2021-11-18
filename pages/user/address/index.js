import React from "react";
import AccountLayout from "../../../component/account/AccountLayout";
import UserAddress from "../../../component/account/UserAddress";

export default function address() {
  return (
    <div>
      <AccountLayout>
        <UserAddress />
      </AccountLayout>
    </div>
  );
}
