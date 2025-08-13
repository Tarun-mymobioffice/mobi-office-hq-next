"use client";

import React, { useState } from "react";
import Image from "next/image";
import PrimaryButton from "./primary-btn";
import SecondaryButton from "./secondary-btn";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="d-flex justify-content-between align-items-center py-2 px-5 w-100 border-bottom border-1 border-gray-light-1 position-sticky top-0 bg-white z-50">
      {/* Logo */}
      <div>
        <Image src="/mobioffice-logo.svg" alt="logo" width={204} height={69} />
      </div>

      {/* Desktop buttons */}
      <div className="d-none d-md-flex flex-row gap-2">
        <SecondaryButton title="Login" />
        <PrimaryButton title="Signup" />
      </div>

      {/* Mobile hamburger */}
      <div className="d-md-none">
        <button
          className="btn p-2 border-0 bg-transparent"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <i className={`bi ${menuOpen ? "bi-x" : "bi-list"} fs-3`}></i>
        </button>
        {/* Popover Menu */}
        {menuOpen && (
          <div
            className="position-absolute end-0 mt-2 p-3 bg-white border rounded shadow"
            style={{ zIndex: 1000 }}
          >
            <div className="d-flex flex-column gap-2">
              <SecondaryButton title="Login" />
              <PrimaryButton title="Signup" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
