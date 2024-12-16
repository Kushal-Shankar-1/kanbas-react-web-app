import React from "react";
import "./index.css"; 
import ForegroundColors from "./ForegroundColors";
import BackgroundColors from "./BackgroundColors";
import Borders from "./Borders"; 
import Padding from "./Padding";
import Margins from "./Margins";
import Corners from "./Corners";
import Dimensions from "./Dimensions"; 
import Positions from "./Positions";
import Zindex from "./Zindex";
import Float from "./Float";
import GridLayout from "./GridLayout";
import Flex from "./Flex";
import ReactIconsSampler from "./ReactIcons"; 
import BootstrapGrids from "./BootstrapGrids";
import BootstrapLists from "./BootstrapLists";
import BootstrapTables from "./BootstrapTables";
import ScreenSizeLabel from "./ScreenSizeLabel";
import BootstrapForms from "./BootstrapForms";
import BootstrapNavigation from "./BootstrapNavigation";

export default function Lab2() {
  return (
    <div id="wd-lab2" className="container mt-4">
      <h2>Lab 2 - Cascading Style Sheets</h2>
      <h3>Styling with the STYLE attribute</h3>
      <p>
        Style attribute allows configuring look and feel
        right on the element. Although it's very convenient,
        it is considered bad practice and you should avoid
        using the style attribute
      </p>

      {/* ID selectors section */}
      <div id="wd-css-id-selectors" className="mb-4">
        <h3>ID selectors</h3>
        <p id="wd-id-selector-1" className="bg-danger text-white p-2">
          Instead of changing the look and feel of all the
          elements of the same name, e.g., P, we can refer to a specific element by its ID
        </p>
        <p id="wd-id-selector-2" className="bg-warning text-dark p-2">
          Here's another paragraph using a different ID and a different look and
          feel
        </p>
      </div>

      {/* Class selectors section */}
      <div id="wd-css-class-selectors" className="mb-4">
        <h3>Class selectors</h3>
        <p className="wd-class-selector">
          Instead of using IDs to refer to elements, you can use an element's CLASS attribute
        </p>
        <h4 className="wd-class-selector">
          This heading has the same style as the paragraph above
        </h4>
      </div>

      {/* Document structure selectors section */}
      <div id="wd-css-document-structure" className="mb-4">
        <div className="wd-selector-1">
          <h3>Document structure selectors</h3>
          <div className="wd-selector-2">
            Selectors can be combined to refer to elements in particular
            places in the document
            <p className="wd-selector-3">
              This paragraph's red background is referenced as
              <br />
              .selector-2 .selector3<br />
              meaning the descendant of some ancestor.<br />
              <span className="wd-selector-4">
                Whereas this span is a direct child of its parent
              </span><br />
              You can combine these relationships to create specific 
              styles depending on the document structure
            </p>
          </div>
        </div>
      </div>

      {/* Foreground Colors Section */}
      <ForegroundColors />

      {/* Background Colors Section */}
      <BackgroundColors />

      {/* Borders Section */}
      <Borders />

      {/* Padding Section */}
      <Padding />

      {/* Margins Section */}
      <Margins />

      {/* Corners Section */}
      <Corners />

      {/* Dimensions Section */}
      <Dimensions />

      {/* Relative Position Section */}
      <Positions />

      {/* Z-index Section */}
      <Zindex />

      {/* Float Section */}
      <Float />

      {/* Grid Layout Section */}
      <GridLayout />

      {/* Flex Section */}
      <Flex />

      {/* React Icons Sampler Section */}
      <ReactIconsSampler />

      {/* Bootstrap Grid System Section */}
      <BootstrapGrids />

      {/* Bootstrap Tables Section */}
      <BootstrapTables />

      {/* Bootstrap Lists Section */}
      <BootstrapLists />

      {/* Screen Size Label Section */}
      <ScreenSizeLabel />

      {/* Bootstrap Forms Section */}
      <BootstrapForms />

      {/* Bootstrap Navigation Section */}
      <BootstrapNavigation />
    </div>
  );
}
