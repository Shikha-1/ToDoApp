import React from "react";

function NoPage({ message }) {
  return <h2 className="error">{message || "Page Not Found"}</h2>;
}

export default NoPage;
