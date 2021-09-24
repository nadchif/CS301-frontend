import React from "react";

export default function MajorPageTemplate({ children }) {
  return (
    <>
      <div
        className=" bg-dark row"
        style={{
          minHeight: "90vh",
          backgroundImage:
            "url(https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg?cs=srgb&dl=pexels-rajesh-tp-1624487.jpg&fm=jpg)",
          backgroundSize: "cover",
        }}
      >
        <div className="col-12">
          <div className="row">
            <div className="  my-5 col-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3   p-4  bg-light">
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
