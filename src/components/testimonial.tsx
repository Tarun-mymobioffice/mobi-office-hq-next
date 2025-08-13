"use client";

import React from "react";

import style from "@/app/styles/pages/home.module.scss";
import ClientCards from "./client_card";
import ClientSlider from "./clients";
import { TESTIMONIALS } from "@/models/constants";


export default function TestimonialCards({ bg = "bg-white" }) {
  return (
    <div className={`${bg} d-flex justify-content-center`}>
      <div className={style.section}>
        <div className={style.section_header}>
          <h1 className="heading text-dark-blue">Real Stories, Real Impact</h1>
          <p className="text-gray font-family-inter m-0">{`Growing Businesses love MobiOffice. Don’t just take our word for it – see what business owners have to say!`}</p>
        </div>
        <div className="section-content w-100">
          <div
            className={`${style.client_review_image} d-none d-sm-block position-sticky d-flex align-items-center justify-content-center h-100 w-100`}
          >
            <ClientSlider data={TESTIMONIALS} />
          </div>
          <div
            className={`${style.client_image} d-sm-none d-block position-sticky`}
          >
            <ClientCards clients={TESTIMONIALS} />
          </div>
        </div>
      </div>
    </div>
  );
}
