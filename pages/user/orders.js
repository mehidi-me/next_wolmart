import React from "react";
import AccountLayout from "../../component/account/AccountLayout";
import UserOrders from "../../component/account/UserOrders";

export default function orders() {
  return (
    <div>
      <AccountLayout>
        <UserOrders />
      </AccountLayout>
    </div>
  );
}
