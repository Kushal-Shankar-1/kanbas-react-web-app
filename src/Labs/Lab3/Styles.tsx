export default function Styles() {
    const colorBlack = { color: "black" };
    const padding10px = { padding: "10px" };
  
    const bgBlue = {
      backgroundColor: "lightblue",
      color: "black",
      ...padding10px,
    };
  
    const bgRed = {
      backgroundColor: "lightcoral",
      ...colorBlack,
      ...padding10px,
    };
  
    return (
      <div id="wd-styles">
        <h2>Styles</h2>
  
        {/* Inline JSON Literal Styles */}
        <div
          style={{
            backgroundColor: "lightyellow",
            color: "black",
            padding: "10px",
          }}
        >
          Yellow background
        </div>
  
        {/* Using Predefined Style Objects */}
        <div style={bgRed}>Red background</div>
        <div style={bgBlue}>Blue background</div>
  
        <hr />
      </div>
    );
  }  