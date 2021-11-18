import React from "react";

export default function UserAccount() {
  return (
    <div id="account-details">
      <div className="icon-box icon-box-side icon-box-light">
        <span className="icon-box-icon icon-account mr-2">
          <i className="w-icon-user" />
        </span>
        <div className="icon-box-content">
          <h4 className="icon-box-title mb-0 ls-normal">Account Details</h4>
        </div>
      </div>
      <form className="form account-details-form" action="#" method="post">
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="firstname">First name *</label>
              <input
                type="text"
                id="firstname"
                name="firstname"
                placeholder="John"
                className="form-control form-control-md"
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="lastname">Last name *</label>
              <input
                type="text"
                id="lastname"
                name="lastname"
                placeholder="Doe"
                className="form-control form-control-md"
              />
            </div>
          </div>
        </div>
        <div className="form-group mb-3">
          <label htmlFor="display-name">Display name *</label>
          <input
            type="text"
            id="display-name"
            name="display_name"
            placeholder="John Doe"
            className="form-control form-control-md mb-0"
          />
          <p>
            This will be how your name will be displayed in the account section
            and in reviews
          </p>
        </div>
        <div className="form-group mb-6">
          <label htmlFor="email_1">Email address *</label>
          <input
            type="email"
            id="email_1"
            name="email_1"
            className="form-control form-control-md"
          />
        </div>
        <h4 className="title title-password ls-25 font-weight-bold">
          Password change
        </h4>
        <div className="form-group">
          <label className="text-dark" htmlFor="cur-password">
            Current Password leave blank to leave unchanged
          </label>
          <input
            type="password"
            className="form-control form-control-md"
            id="cur-password"
            name="cur_password"
          />
        </div>
        <div className="form-group">
          <label className="text-dark" htmlFor="new-password">
            New Password leave blank to leave unchanged
          </label>
          <input
            type="password"
            className="form-control form-control-md"
            id="new-password"
            name="new_password"
          />
        </div>
        <div className="form-group mb-10">
          <label className="text-dark" htmlFor="conf-password">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control form-control-md"
            id="conf-password"
            name="conf_password"
          />
        </div>
        <button type="submit" className="btn btn-dark btn-rounded btn-sm mb-4">
          Save Changes
        </button>
      </form>
    </div>
  );
}
