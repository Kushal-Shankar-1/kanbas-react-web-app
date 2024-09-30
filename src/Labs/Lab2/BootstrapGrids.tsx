import React from "react";

export default function BootstrapGrids() {
  return (
    <div id="wd-bs-grid-system" className="mt-4">
      <h2>Grid system</h2>

      {/* First Row */}
      <div className="row mb-4">
        <div className="col bg-danger text-white p-3">
          <h3>Left half</h3>
        </div>
        <div className="col bg-primary text-white p-3">
          <h3>Right half</h3>
        </div>
      </div>
      
      {/* Second Row */}
      <div className="row mb-4">
        <div className="col-4 bg-warning p-3">
          <h3>One third</h3>
        </div>
        <div className="col-8 bg-success text-white p-3">
          <h3>Two thirds</h3>
        </div>
      </div>
      
      {/* Third Row */}
      <div className="row mb-4">
        <div className="col-2 bg-dark text-white p-3">
          <h3>Sidebar</h3>
        </div>
        <div className="col-8 bg-secondary text-white p-3">
          <h3>Main content</h3>
        </div>
        <div className="col-2 bg-info p-3">
          <h3>Sidebar</h3>
        </div>
      </div>

      {/* Responsive Grid Section */}
      <div id="wd-bs-responsive-grids" className="mt-4">
        <h2>Responsive grid system</h2>
        <div className="row">
          <div className="col-12 col-md-6 col-xl-3 bg-warning p-3">
            <h3>Column A</h3>
          </div>
          <div className="col-12 col-md-6 col-xl-3 bg-primary text-white p-3">
            <h3>Column B</h3>
          </div>
          <div className="col-12 col-md-6 col-xl-3 bg-danger text-white p-3">
            <h3>Column C</h3>
          </div>
          <div className="col-12 col-md-6 col-xl-3 bg-success text-white p-3">
            <h3>Column D</h3>
          </div>
        </div>
      </div>

      {/* Dramatic Responsive Grid Section */}
      <div id="wd-bs-responsive-dramatic" className="mt-4">
        <h2>Responsive grid system</h2>
        <div className="row">
          {[...Array(12)].map((_, index) => (
            <div
              key={index}
              className={`col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 col-xxl-1 p-3 ${
                index % 4 === 0 ? "bg-warning" :
                index % 4 === 1 ? "bg-primary text-white" :
                index % 4 === 2 ? "bg-danger text-white" : "bg-success text-white"
              }`}
            >
              <h4>{index + 1}</h4>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
