import React from "react";
import AccountLayout from "../../component/account/AccountLayout";
import UserOrderDetails from "../../component/account/UserOrderDetails";

export default function orderdetails() {
  return (
    <div>
      <AccountLayout>
        <UserOrderDetails />
      </AccountLayout>
    </div>
  );
}
