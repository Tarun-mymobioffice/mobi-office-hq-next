"use client";
import Slider from "react-infinite-logo-slider";
import styles from "@/app/styles/components/Marquee.module.scss";

const LOGOS = [
  "/clients/ANUBHA.svg",
  "/clients/ANUBHA_FABRICS_PVT_LTD.svg",
  "/clients/BENARA.svg",
  "/clients/CITIZEN.svg",
  "/clients/FOUNTAIN_HEAD.svg",
  "/clients/KG.svg",
  "/clients/KP.svg",
  "/clients/LINEN.svg",
  "/clients/OM_INFRA.svg",
  "/clients/PROTEGO.svg",
  "/clients/SINO.svg",
  "/clients/TESCO.svg",
  "/clients/ACME.svg",
];

const Marquee = () => {
  return (
    <>
      {" "}
      <div className="py-3">
        <div className="px-5 mx-2">
        <div className="d-flex align-items-center my-4 ">
          <div className="flex-grow-1 border-top"></div>
          <span className="mx-3 text-muted small">
            Trusted by teams across manufacturing, textiles, gems & jewellery,
            education, hospitality.
          </span>
          <div className="flex-grow-1 border-top"></div>
        </div>
        </div>

        <div className="logos">
          <Slider duration={40} pauseOnHover={false}>
            {LOGOS.map((src, index) => (
              <Slider.Slide key={index}>
                <img className={styles.img} src={src} alt="" />
              </Slider.Slide>
            ))}
          </Slider>
        </div>
      </div>
    </>
  );
};

export default Marquee;
