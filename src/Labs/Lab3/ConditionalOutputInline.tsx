import React from "react";

export default function ConditionalOutputInline() {
  const loggedIn = false;

  return (
    <div id="wd-conditional-output-inline">
      {loggedIn && <h2>Welcome Inline</h2>}
      {!loggedIn && <h2>Please login Inline</h2>}
    </div>
  );
}