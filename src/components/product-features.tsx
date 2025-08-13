import Image from "next/image";
import style from "@/app/styles/components/Product_Features.module.scss";
import { Int_FeatureCard, Int_ProductFeatures } from "@/models/types";

function ProductFeatures({
  title = "",
  desc = "",
  features = [],
  background = "bg-purple-light",
  header_class = "",
  font_size = "",
}: Int_ProductFeatures) {
  return (
    <div
      className={`d-flex align-items-center justify-content-center ${background}`}
    >
      <div className="section">
        <div className={`section-header ${header_class}`}>
          <h1
            className={`${font_size} sub-heading text-start text-md-start text-dark font-size-30`}
          >
            {title}
          </h1>
          <p className="text-start text-md-start paragraph text-gray">{desc}</p>
        </div>
        <div className="section-content">
          <div className="row g-4">
            {features.map((feature: Int_FeatureCard, index: number) => (
              <div className="col-12 col-md-6 col-lg-4" key={index}>
                <div
                  className="d-flex"
                  role={feature.onClick ? "button" : undefined}
                  onClick={feature.onClick ? feature.onClick : () => {}}
                >
                  {feature.icon && !feature.iconSrc && (
                    <div
                      dangerouslySetInnerHTML={{ __html: feature.icon }}
                      className="me-2"
                    />
                  )}
                  {!feature.icon && feature.iconSrc && (
                    <div className="position-sticky product_features_image_container d-flex align-items-start justify-content-start">
                      <Image src={feature.iconSrc} alt={feature.iconSrc} fill />
                    </div>
                  )}
                  <div className="row">
                    {feature.title ? (
                      <h3
                        className={`${style.title} col-12 fw-bold xl:font-size-20 md:font-size-16`}
                      >
                        {feature.title}
                      </h3>
                    ) : (
                      ""
                    )}
                    <div
                      className={`${style.content} col-12 text-gray font-family-inter`}
                    >
                      {feature.desc}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductFeatures;
