import React from "react";
import Image from "next/image";
import Link from "next/link";
import PrimaryButton from "./primary-btn";
import SecondaryButton from "./secondary-btn";

interface Props {
  title: string;
  subtitle: string;
  description: string;
  primaryBtnText: string;
  primaryBtnLink: string;
  secondaryBtnText: string;
  secondaryBtnLink: string;
  imageSrc: string;
  imageAlt: string;
}

export default function HeroSection({
  title,
  subtitle,
  description,
  primaryBtnText,
  primaryBtnLink,
  secondaryBtnText,
  secondaryBtnLink,
  imageSrc,
  imageAlt,
}: Props) {
  return (
    <section className="p-4 p-md-5  d-flex flex-column flex-lg-row align-items-center justify-content-center bg-bg-light" style={{
      

    }}>
      <div className="row align-items-center g-4 " style={{
        maxWidth:"1380px"
      }}>
        {/* Left Side */}
        <div className="col-12 col-lg-6">
          <h1 className="fw-bold mb-3">
            {title} <br />
            <span className="fw-normal">{subtitle}</span>
          </h1>
          <p className="text-muted mb-4">{description}</p>
          <div className="d-flex gap-3 flex-wrap">
            <PrimaryButton title={primaryBtnText}  />
            <SecondaryButton title={secondaryBtnText} />
          </div>
        </div>

        {/* Right Side */}
        <div className="col-12 col-lg-6 text-end">
          <div className="d-flex flex-row justify-content-md-end ">
          <Image
            src={imageSrc}
            alt={imageAlt}
            width={620}
            height={421}
            style={{
              objectFit:"cover",
              width:"620px",
              height:"421px",
              borderRadius:"20px"
            }}
          />
          </div>
        </div>
      </div>
    </section>
  );
}
