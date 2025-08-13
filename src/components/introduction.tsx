/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import styles from "@/app/styles/components/Introduction.module.scss";
import Link from "next/link";
import Image from "next/image";
import { SVG_ICONS } from "@/models/svgs";
import PrimaryButton from "./primary-btn";
import { IconKey, Int_Heading } from "@/models/types";
import LoginCanvas from "./login-canvas";
import { Suspense } from "react";


interface Int_Props {
  page: string;
  headingList: Int_Heading[];
  paragraph: string;
  introImage?: IconKey;
  primaryButton?: {
    text: string;
    onClick: () => void;
    icon: string;
  };
  searchbox: boolean;
  badge?: {
    text: string;
    className?: string;
    icon: string;
    iconSrc?: string;
    onClick: () => void;
  };
}

const Introduction = ({
  page = "landing",
  headingList = [],
  paragraph = "",
  introImage = "PEOPLE_GROUP" as any,
  primaryButton = {
    text: "",
    onClick: () => {},
    icon: "",
  },
  searchbox = false,
  badge = {
    text: "",
    className: "",
    icon: "",
    onClick: () => {},
  },
}: Int_Props) => {
  return (
    <div className="bg-patterned d-flex justify-content-center">
      <div
        className={`${styles.intro_div} w-100 pb-md-0 p-md-5 p-4 pb-0 overflow-hidden ${page}`}
      >
        <div className={`${styles.nav_container} row mb-4`}>
          <Link
            href="/"
            className={`${styles.logo_container} col d-flex d-md-none align-items-center`}
          >
            <div
              className="svg-div cursor-pointer"
              dangerouslySetInnerHTML={{
                __html: SVG_ICONS.MOBIOFFICE_LOGO("white", 28, 26),
              }}
            />
            <div
              className="svg-div cursor-pointer"
              dangerouslySetInnerHTML={{
                __html: SVG_ICONS.MOBIOFFICE_TEXT("white", 12, 75),
              }}
            />
          </Link>
          <Link
            href="/"
            className={`${styles.logo_container} col d-none d-md-flex align-items-center`}
          >
            <div
              className="svg-div cursor-pointer"
              dangerouslySetInnerHTML={{
                __html: SVG_ICONS.MOBIOFFICE_LOGO("white", 56, 53),
              }}
            />
            <div
              className="svg-div cursor-pointer"
              dangerouslySetInnerHTML={{
                __html: SVG_ICONS.MOBIOFFICE_TEXT("white", 24, 150),
              }}
            />
          </Link>

          <div className="col d-flex justify-content-end align-items-center">
            <Suspense >
            <LoginCanvas />
            </Suspense>
          </div>
        </div>

        {/* Conditional Rendering based on 'page' */}
        <div className="row overflow-hidden">
          <div
            className={`${styles.intro_content} col-12 col-lg-6 d-flex flex-column justify-content-center align-items-center text-center text-lg-start z-1`}
          >
            {/* Heading */}
            <div className="w-100 d-flex flex-column gap-3 mb-4">
              {/* Badge */}
              {badge.text && (
                <div className="d-flex w-100 align-items-center justify-content-center justify-content-lg-start">
                  <div
                    className={`${styles.intro_badge} d-flex align-items-center text-white font-size-12 text-uppercase`}
                  >
                    {badge.iconSrc ? (
                      <Image
                        src={badge.iconSrc}
                        alt="gems"
                        width={16}
                        height={16}
                      />
                    ) : (
                      <div
                        className="svg-div"
                        dangerouslySetInnerHTML={{
                          __html: badge.icon,
                        }}
                      />
                    )}
                    {badge.text}
                  </div>
                </div>
              )}
              {headingList?.length && (
                <h1 className={`${styles.intro_1} fw-normal m-0`}>
                  {headingList.map((heading, index) => {
                    const { text, isHighlight } = heading;
                    if (!isHighlight) return text;
                    return (
                      <span key={index} className={styles.intro_1_orange}>
                        {text}
                      </span>
                    );
                  })}
                </h1>
              )}

              {/* Paragraph */}
              {paragraph && (
                <p
                  className={`${styles.intro_2} paragraph w-100 text-center text-lg-start`}
                >
                  {paragraph}
                </p>
              )}

              {/* Primary Button */}
              {primaryButton.text && (
                <div className="w-100 d-flex justify-content-center justify-content-lg-start align-items-center">
                  <PrimaryButton
                    title={primaryButton.text}
                    icon={primaryButton.icon}
                    onClick={primaryButton.onClick}
                  />
                </div>
              )}

              {/* Search Box */}
              {searchbox && (
                <div
                  className="form-control p-1"
                  style={{ background: "#4A4666" }}
                >
                  <div className="d-flex justify-content-center">
                    <div className="position-sticky product_features_image_container d-flex align-items-start justify-content-start">
                      <Image
                        src={`/applications/our-solutions/searchBoxIcon.svg`}
                        alt={"feature.iconSrc"}
                        fill
                      />
                    </div>
                    <input
                      className="col-11 border-0"
                      type="name"
                      placeholder="Search Solution Here.."
                      style={{
                        background: "#4A4666",
                        color: "white",
                        border: 0,
                        outline: "none",
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="col-12 col-lg-6 d-flex justify-content-center justify-content-lg-end align-items-center">
            <div
              className={`${styles.intro_image} position-sticky d-flex align-items-start justify-content-start`}
            >
              <Image
                src={`/applications/introduction/${introImage}.svg`}
                alt={"feature.iconSrc"}
                fill
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Introduction;
