import React from "react";

export default function Signup() {
  return (
    <div>
      <form>
        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="inputName">Name</label>
            <input type="text" class="form-control" id="inputName" />
          </div>
          <div class="form-group col-md-6">
            <label for="inputEmail">Email</label>
            <input type="email" class="form-control" id="inputEmail" />
          </div>
          <div class="form-group col-md-6">
            <label for="inputPassword">Password</label>
            <input type="password" class="form-control" id="inputPassword" />
          </div>
        </div>
        <div class="form-group">
          <label for="inputPhone">Phone No.</label>
          <input
            type="text"
            class="form-control"
            id="inputPhone"
            placeholder="+91 9876543210"
          />
        </div>
        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="inputCity">City</label>
            <input type="text" class="form-control" id="inputCity" />
          </div>
          <div class="form-group col-md-4">
            <label for="inputState">Role</label>
            <select id="inputState" class="form-control">
              <option selected>Buyer</option>
              <option>Seller</option>
            </select>
          </div>
          <div class="form-group col-md-2">
            <label for="inputZip">Zip</label>
            <input type="text" class="form-control" id="inputZip" />
          </div>
        </div>
        <div class="form-group">
          <div class="form-check">
            <input class="form-check-input" type="checkbox" id="gridCheck" />
            <label class="form-check-label" for="gridCheck">
              Check me out
            </label>
          </div>
        </div>
        <button type="submit" class="btn btn-primary">
          Sign in
        </button>
      </form>
    </div>
  );
}
