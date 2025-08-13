import Image from "next/image";
import React from "react";

const cardData = [
  {
    img: "/mid-section/security.svg",
    title: "One login. One view.",
    text: "Sign in once to see every app and KPI you care about."
  },
  {
    img: "/mid-section/security1.svg",
    title: "Real-time KPIs across apps",
    text: "Sign in once to see every app and KPI you care about."
  },
  {
    img: "/mid-section/security2.svg",
    title: "Role-based workflows & approvals",
    text: "Sign in once to see every app and KPI you care about."
  },
  {
    img: "/mid-section/security3.svg",
    title: "Enterprise-grade security & audit trails",
    text: "Sign in once to see every app and KPI you care about."
  }
];

export default function MidSection() {
  return (
    <div className=" bg-bg-light p-4 p-md-5 ">
      <div className="row g-3 justify-content-center ">
        {cardData.map((card, index) => (
          <div key={index} className={`col-12 col-md-6 col-lg-3`} >
            <div className="card h-100 border-1">
              <div className="card-body text-center">
                <Image
                  src={card.img}
                  alt={card.title}
                  className="mb-3"
                  width={82}
                  height={82}
                  style={{ width: "82px", height: "82px" }}
                />
                <h5 className="card-title fw-bold">{card.title}</h5>
                <p className="card-text text-muted">{card.text}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="d-flex flex-column justify-content-center align-items-center w-100 mt-5">

        <div className="d-flex flex-column gap-2 align-items-center">
          <h1>How it Works</h1>
          <p>With a well-structured approach, we ensure your satisfaction at every stage</p>
        </div>

        <Image
        src="/mid-section/Content.svg"
        alt="security"
        width={1200}
        height={356}
        style={{ 
          minWidth:"1200px",
          minHeight:"356px",
          objectFit:"cover"
        }}
      />
        
      </div>
    </div>
  );
}
