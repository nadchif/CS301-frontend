import axios from "axios";
import { ENV_CONSTANTS } from "env";
import md5 from "md5";
import React, { useContext, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { LocalSwal } from "shared/LocalSwal";
import AuthContext from "../context/auth-context";
import Resizer from "react-image-file-resizer";

export default function ProfilePage() {
  const authContext = useContext(AuthContext);
  const [isWorking, setIsWorking] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [userForm, setUserForm] = useState({
    fullname: "",
    email: "",
    contactNumber: "",
    currentPassword: "",
    password: "",
    confirmPassword: "",
    avatarUrl: null,
  });

  const fileChangedHandler = (event) => {
    var fileInput = false;
    if (event.target.files[0]) {
      fileInput = true;
    }
    if (fileInput) {
      try {
        Resizer.imageFileResizer(
          event.target.files[0],
          128,
          128,
          "JPEG",
          80,
          0,
          (uri) => {
            console.log(uri);
            setUserForm({
              ...userForm,
              avatarUrl: uri,
            });
          },
          "base64",
          128,
          128
        );
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    setIsWorking(true);
    const url = `${ENV_CONSTANTS.apiUrl}/user/profile`;

    const fetchOrders = async () => {
      try {
        const result = await axios.get(url, {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${authContext.userData.access_token}`,
          },
        });
        const profile = result.data.data;
        setProfileData(profile);
        setUserForm({
          fullname: profile.fullname,
          email: profile.email,
          contactNumber: profile.contact_number,
          currentPassword: "",
          password: "",
          confirmPassword: "",
          avatarUrl: profile.avatar_url,
        });
      } catch (e) {
        console.error("api error", e.response);
        if (e.response && e.response.data && e.response.data.error) {
          LocalSwal.fire("Uh Oh", e.response.data.error, "error");
        } else {
          LocalSwal.fire(
            "Uh Oh",
            "An error occured. Please try again later",
            "error"
          );
        }
      }
      setIsWorking(false);
    };
    if (authContext.authenticated) {
      fetchOrders();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    setIsWorking(true);
    if (userForm.password !== userForm.confirmPassword) {
      LocalSwal.fire(
        "Uh Oh",
        "Password and password confirmation must match",
        "warning"
      );

      setIsWorking(false);
      return;
    }
    const url = `${ENV_CONSTANTS.apiUrl}/user`;
    try {
      await axios.patch(
        url,
        {
          fullname: userForm.fullname,
          email: userForm.email,
          contact_number: userForm.contactNumber,
          password: userForm.password,
          old_password: userForm.currentPassword,
          avatar_url: userForm.avatarUrl,
        },
        {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${authContext.userData.access_token}`,
          },
        }
      );

      LocalSwal.fire({
        // title: "Success",
        text: `Profile updated`,
        icon: "success",
        toast: true,
        timer: 1500,
        position: "top-end",
      });
    } catch (e) {
      if (e.response.data.error) {
        LocalSwal.fire("Uh Oh", e.response.data.error, "error");
      } else {
        LocalSwal.fire(
          "Uh Oh",
          "An error occured. Please try again later",
          "error"
        );
      }
      console.error("s", e.response);
    }

    setIsWorking(false);
  };

  const handleInputChange = (e) => {
    setUserForm({
      ...userForm,
      [e.target.name]: e.target.value,
    });
  };

  return authContext.authenticated ? (
    profileData ? (
      <div style={{ minHeight: "80vh" }} className=" py-4">
        <div className="row ">
          <div className="offset-md-1 col-md-2 ">
            <h3>My Profile</h3>
            <img
              src={`${
                userForm.avatarUrl
                  ? userForm.avatarUrl
                  : "https://www.gravatar.com/avatar/" +
                    md5(profileData.email.toLowerCase())
              }`}
              alt={profileData.fullname}
              className="img-fluid rounded-full "
              style={{ width: "100%", height: "12rem", objectFit: "cover" }}
            />
            <label
              htmlFor="fileInput"
              className="btn btn-dark btn-block rounded-0 my-3"
            >
              Change...
            </label>

            <input
              type="file"
              id="fileInput"
              onChange={fileChangedHandler}
              style={{ visibility: "hidden" }}
            />
          </div>
          <div className="col-md-6">
            <form onSubmit={handleSubmitForm}>
              <h4 className="mb-3 border-bottom border-light pb-1">
                Update Details
              </h4>
              <div className="form-group w-100">
                <label htmlFor="fullname">Fullname: </label>
                <input
                  type="text"
                  name="fullname"
                  required
                  onChange={handleInputChange}
                  value={userForm.fullname}
                  className="form-control mb-2 rounded-0"
                />
              </div>
              <div className="form-group w-100">
                <label htmlFor="email">Email: </label>
                <input
                  type="email"
                  name="email"
                  onChange={handleInputChange}
                  value={userForm.email}
                  readOnly
                  required
                  className="form-control mb-2 rounded-0"
                />
              </div>
              <div className="form-group w-100">
                <label htmlFor="contact">Contact Number: </label>
                <input
                  type="tel"
                  name="contactNumber"
                  onChange={handleInputChange}
                  value={userForm.contactNumber}
                  required
                  className="form-control mb-2 rounded-0"
                />
              </div>
              <h4 className="mt-5 mb-3 border-bottom border-light pb-1">
                Change Password
              </h4>
              <div className="form-group w-100">
                <label htmlFor="currentPassword">Current Password: </label>
                <input
                  type="currentPassword"
                  name="currentPassword"
                  onChange={handleInputChange}
                  value={userForm.currentPassword}
                  className="form-control mb-2 rounded-0"
                />
              </div>
              <div className="form-group w-100">
                <label htmlFor="password">Password: </label>
                <input
                  type="password"
                  name="password"
                  onChange={handleInputChange}
                  value={userForm.password}
                  className="form-control mb-2 rounded-0"
                />
              </div>

              <div className="form-group w-100">
                <label htmlFor="confirmPassword">Confirm Password: </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={userForm.confirmPassword}
                  className="form-control mb-2 rounded-0"
                />
              </div>

              <button
                type="submit"
                className="my-5 btn btn-block btn-success rounded-0"
                disabled={isWorking}
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
      </div>
    ) : (
      <div>Loading...</div>
    )
  ) : (
    <Redirect to="/login" />
  );
}
