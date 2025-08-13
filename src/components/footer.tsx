"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Footer() {
  const openWhatsApp = () => {
    window.open("https://wa.me/919099137602", "_blank");
  };

  return (
    <footer className="bg-primary text-white p-4 p-md-5 ">
      {/* Top Section */}
      <div className="my-4">
        <div className="row gy-4 align-items-start">
          {/* Logo + HQ */}
          <div className="col-12">
            <div className="d-flex align-items-center gap-2">
              <Image
                src="/mobioffice-white-logo.svg"
                alt="logo"
                width={204}
                height={69}
              />
            </div>
          </div>

          {/* Address */}
          <div className="col-12">
            <div className="d-flex align-items-start gap-2">
              <i className="bi bi-geo-alt-fill fs-5"></i>
              <p className="mb-0">
                514, 5th Floor, Rajhans Montessa, Dumas Rd - Magdalla, Surat,
                Gujarat 395007
              </p>
            </div>
          </div>

          {/* Phone + WhatsApp */}
          <div className="col-12 d-flex align-items-center gap-3 flex-wrap">
            <div className="d-flex align-items-center gap-2">
              <i className="bi bi-telephone-fill fs-5"></i>
              <span>+91 - 9099137602</span>
            </div>
            <button
              className="btn text-white d-flex align-items-center gap-2"
              style={{ backgroundColor: "#3FCB7F",borderRadius:"100px" }}
              onClick={openWhatsApp}
            >
              <i className="bi bi-whatsapp"></i>
              WhatsApp Chat
            </button>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-white my-4" />

        {/* Bottom Section */}
        <div className="row align-items-center gy-3">
          <div className="col-12 col-md-4 order-2 order-md-1 text-center text-md-start">
            <p className="mb-0 small">
              © 2025 MobiOffice. All rights reserved.
            </p>
          </div>
          <div className="col-12 col-md-4 order-1 order-md-2 text-center">
            {/* Close button (if needed) */}
            {/* <button className="btn btn-outline-light rounded-circle p-2">
              <i className="bi bi-x-lg"></i>
            </button> */}
          </div>
          <div className="col-12 col-md-4 order-3 order-md-3 d-flex justify-content-center justify-content-md-end gap-3">
            <Link href="/privacypolicy" className="text-white small">
              Privacy Policy
            </Link>
            <Link href="/termsservices" className="text-white small">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
