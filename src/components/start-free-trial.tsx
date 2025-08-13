import React, { useEffect, useRef } from "react";
import style from "@/app/styles/components/Start-Free-Trial.module.scss";

interface Int_FreeTrialProps {
  msg: string;
}

const FreeTrial = ({ msg }: Int_FreeTrialProps) => {
  const svgContainer = useRef<HTMLDivElement>(null);

  useEffect(function mount() {
    function onScroll() {
      console.log("scroll!");
    }

    window.addEventListener("scroll", onScroll);

    return function unMount() {
      window.removeEventListener("scroll", onScroll);
    };
  });

  useEffect(() => {
    const loadSVG = async () => {
      try {
        const isMobile = window.innerWidth <= 769;
        const svgPath = isMobile
          ? "/background_free_trial_mobile.svg"
          : "/background_free_trial.svg";
        const response = await fetch(svgPath);
        const svgContent = await response.text();
        if (svgContainer.current) {
          svgContainer.current.innerHTML = svgContent;
        }
      } catch (error) {
        console.error("Error loading SVG:", error);
      }
    };

    loadSVG();

    const MAX_ATTEMPTS = 25;
    const CHECK_INTERVAL = 200;
    let attemptCount = 0;

    const intervalHandler = setInterval(() => {
      const features =
        typeof window !== "undefined" && typeof document !== "undefined"
          ? document.querySelectorAll(".free_trial_image")
          : null;
      if (features && features.length) {
        clearInterval(intervalHandler);
        features.forEach((feature) => {
          feature.addEventListener("click", (event: Event) => {
            const currentTarget = event.currentTarget as HTMLElement;
            const elementId = currentTarget.getAttribute("id");
            if (elementId === "free_trial") {
              window.open(
                "https://wa.me/+919925039603?text=" + encodeURIComponent(msg),
                "_blank"
              );
            }
          });
        });
        return;
      }

      if (attemptCount >= MAX_ATTEMPTS) {
        clearInterval(intervalHandler);
        console.warn(
          "Max attempts reached. Elements with the class 'tribe_features' were not found."
        );
      }

      attemptCount++;
    }, CHECK_INTERVAL);

    return () => {
      clearInterval(intervalHandler);
    };
  }, []);

  return (
    <div className={`${style.bg} d-flex justify-content-center`}>
      <div className={`align-items-center justify-content-center`}>
        <div ref={svgContainer}></div>
      </div>
    </div>
  );
};

export default FreeTrial;
