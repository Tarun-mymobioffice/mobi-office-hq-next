import React, { FC } from "react";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import Image from "next/image";
import styles from "@/app/styles/components/ClientSlider.module.scss";
import { Int_TestimonialProps } from "@/models/types";


interface Int_ClientSliderProps {
  data: Int_TestimonialProps[];
}

// TestimonialCard Component
const TestimonialCard: FC<Int_TestimonialProps> = ({ image, author, role, company, content }) => {
  const swiper = useSwiper();

  return (
    <div className={`${styles.testimonial_wrapper} border-one border-gray-light border-radius-10`}>
      <div className={styles.testimonial_card}>
        <div className={styles.image_wrapper}>
          <Image src={image} alt={`${author}`} fill className={styles.image} />
        </div>
        <div className={styles.content_wrapper}>
          <p className={`${styles.content} font-size-16 font-family-inter`}>{content}</p>
          <div className={`${styles.author_info} d-flex`}>
            <div>
              <div className="d-flex gap-1">
                <h3 className={`${styles.author} m-0`}>{author}</h3>
                <h4 className={`${styles.role}`}>{role}</h4>
              </div>
              <p className={`${styles.company}`} dangerouslySetInnerHTML={{ __html: company || "" }}></p>
            </div>
            <div className={styles.navigation}>
              <button className={styles.nav_button} aria-label="Previous testimonial" onClick={() => swiper.slidePrev()}>
                <Image src="/applications/trybe/icons/arrow-left.svg" alt="Previous" width={20} height={20} />
              </button>
              <button className={styles.nav_button} aria-label="Next testimonial" onClick={() => swiper.slideNext()}>
                <Image src="/applications/trybe/icons/arrow-right.svg" alt="Next" width={20} height={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ClientSlider Component
const ClientSlider: FC<Int_ClientSliderProps> = ({ data }) => {
  return (
    <Swiper
      spaceBetween={20}
      breakpoints={{
        320: { slidesPerView: 0.5 },
        768: { slidesPerView: 0.5 },
        1024: { slidesPerView: 1 },
        1440: { slidesPerView: 1.5 },
        1920: { slidesPerView: 2.1 },
      }}
      centeredSlides={false}
      loop={true}
      aria-expanded={true}
      modules={[Pagination, Navigation]}
      navigation>
      {data.map((item, index) => (
        <SwiperSlide key={index}>
          <TestimonialCard image={item.image} mobileImage={item.mobileImage} author={item.author} role={item.role} company={item.company} content={item.content} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ClientSlider;
