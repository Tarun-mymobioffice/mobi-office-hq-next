"use client";
import React from "react";
import styles from "@/app/styles/components/WhatsappBtn.module.scss";
import { SVG_ICONS } from "@/models/svgs";

interface Props {
  onClick?: () => void;
}

const WhatsappButton = ({ onClick = () => {} }: Props) => {
  return (
    <button
      className={`${styles.container} bg-primary-light border-one border-primary-dark`}
      onClick={onClick}
    >
      <span
        className={styles.svg}
        dangerouslySetInnerHTML={{
          __html: SVG_ICONS.WHATSAPP_LOGO("#7263E1", 21, 20),
        }}
      />
      <span className="text-primary font-size-14 fw-bold">WhatsApp Chat</span>
    </button>
  );
};

export default WhatsappButton;
