"use client";

import React from "react";
import styles from "@/app/styles/components/PrimaryBtn.module.scss";

interface Props {
  title?: string;
  icon?: string;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

const PrimaryButton = ({ title = "", icon = "", className = "", onClick = () => {}, disabled = false }: Props) => {
  return (
    <button className={`${styles.container} ${disabled ? "bg-primary-light" : `bg-primary`} ${className}`} disabled={disabled} onClick={onClick}>
      <span className={`${disabled ? "text-dark" : `text-white`} font-size-14 fw-semibold`}>{title}</span>
      {icon && <div className="btn-icon" dangerouslySetInnerHTML={{ __html: icon }} />}
    </button>
  );
};

export default PrimaryButton;
