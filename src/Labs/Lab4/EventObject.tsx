import React, { useState } from "react";

export default function EventObject() {
  const [eventData, setEventData] = useState<any>(null);

  const handleClick = (e: any) => {
    // Extract specific properties we want to display
    const { type, timeStamp, target } = e;

    // Create a simplified event object for display
    const simplifiedEvent = {
      type,
      timeStamp,
      target: target.outerHTML, // Only use outerHTML for target
    };

    // Set the simplified event data
    setEventData(simplifiedEvent);
  };

  return (
    <div>
      <h2>Event Object</h2>
      <button
        onClick={(e) => handleClick(e)}
        className="btn btn-primary"
        id="wd-display-event-obj-click"
      >
        Display Event Object
      </button>
      <pre>{eventData ? JSON.stringify(eventData, null, 2) : "Click the button to display event data"}</pre>
      <hr />
    </div>
  );
}
