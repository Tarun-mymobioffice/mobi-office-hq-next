"use client";

import styles from "@/app/styles/pages/ContactUs.module.scss";
import About from "@/components/about";
import ButterBar from "@/components/butter-bar";
import Footer from "@/components/footer";
import Introduction from "@/components/introduction";
import PrimaryButton from "@/components/primary-btn";
import WhatsappButton from "@/components/whatsapp-btn";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import IntlTelInput, { CountryData } from "react-intl-tel-input";
import "react-intl-tel-input/dist/main.css";
import { SVG_ICONS } from "@/models/svgs";
import { Int_LocationContactProps, PAGES } from "../../models/types";

interface Int_BreadCrumb {
  BREADCRUMB_ITEMS: string[];
}

// Define a type for form data
interface Int_FormData {
  FirstName: string; // Required
  LastName: string; // Required
  EmailID: string; // Required
  MobileNumber: string; // Required
  NumberPreFix: string; // Required
  Message: string; //Required
  SupportEmail: string; // Required
}

const HEADING_LIST = [
  {
    isHighlight: true,
    text: "Contact Us",
  },
];
const BREADCRUMB_ITEMS = ["MobiOffice", "Book a Demo"];

const BreadCrumb = ({ BREADCRUMB_ITEMS }: Int_BreadCrumb) => {
  return (
    <div className={`${styles.breadcrumb_container} w-100 text-capitalize d-flex justify-content-center align-items-center text-primary font-size-16`}>
      {BREADCRUMB_ITEMS.map((item, index) => (
        <span key={index}>
          {index > 0 && <span dangerouslySetInnerHTML={{ __html: SVG_ICONS.BREADCRUMB_RIGHT_ARROW("#7263E2", 24, 20) }} />}
          {item}
        </span>
      ))}
    </div>
  );
};

const LocationContact = ({ appName }: Int_LocationContactProps) => {
  const [formData, setFormData] = useState<Int_FormData>({
    FirstName: "",
    LastName: "",
    MobileNumber: "",
    NumberPreFix: "",
    EmailID: "",
    Message: "",
    SupportEmail: "internal@doubletick.mobi",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false); // Added loading state

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const [phoneValue, setPhoneValue] = useState("");
  const handlePhoneNumberChange = (isValid: boolean, value: string) => {
    setPhoneValue(value);
    setFormData(prevState => ({ ...prevState, MobileNumber: value }));
  };
  const handlePhoneNumberBlurChange = (isValid: boolean, value: string, country: CountryData) => {
    setFormData(prevState => ({ ...prevState, NumberPreFix: country.dialCode || "" }));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.FirstName) newErrors.FirstName = "First name is required.";
    if (!formData.LastName) newErrors.LastName = "Last name is required.";
    if (!formData.MobileNumber) newErrors.MobileNumber = "Mobile number is required.";
    if (!formData.EmailID) newErrors.EmailID = "Email is required.";
    if (!/\S+@\S+\.\S+/.test(formData.EmailID)) newErrors.EmailID = "Email address is invalid.";
    if (!formData.Message) newErrors.Message = "Message is required.";

    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({}); // Clear previous errors
    setIsLoading(true); // Set loading to true when submission starts

    const requestBody = {
      instanceID: "",
      name: "mobioffice/io/getstarted",
      action: {
        name: "user input",
        payload: {
          name: `${formData.FirstName} ${formData.LastName}`,
          app: appName,
          phone: `${formData.NumberPreFix}${formData.MobileNumber}`,
          email: formData.EmailID,
          message: formData.Message,
        },
      },
    };

    const secretKey = process.env.NEXT_PUBLIC_MSTATE_SECRET_KEY;
    if (!secretKey) {
      throw new Error("MSTATE_SECRET_KEY is missing in environment variables");
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_MSTATE_API_URL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "secret-key": secretKey,
          Accept: "application/json, text/plain, */*",
        },
        body: JSON.stringify(requestBody),
      });

      const result = await response.json();

      if (response.ok) {
        setShowSuccess(true);
        setFormData({
          FirstName: "",
          LastName: "",
          MobileNumber: "",
          NumberPreFix: "",
          EmailID: "",
          Message: "",
          SupportEmail: "internal@doubletick.mobi",
        });
        setPhoneValue("");
      } else {
        setErrors(result.errors || { server: "Something went wrong." });
      }
    } catch (error) {
      console.error("Error during submission:", error);
      setErrors({ server: "An error occurred. Please try again." });
    } finally {
      setIsLoading(false); // Set loading to false when submission ends
    }
  };

  return (
    <div className={`${styles.location_contact} d-flex justify-content-center`}>
      <div className="section w-100">
        <div className="row g-0">
          <div className={`${styles.border_right} col-12 col-md-6 p-4 d-flex flex-column gap-3 justify-content-start`}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14885.607426371054!2d72.7498813!3d21.1364001!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be0528431271647%3A0xc580cdb2cda7fedb!2sRajhans%20Montessa!5e0!3m2!1sen!2snl!4v1683816155875!5m2!1sen!2snl"
              width="100%"
              height="450"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"></iframe>
            <div className="d-flex gap-2 align-items-center justify-content-start">
              <div dangerouslySetInnerHTML={{ __html: SVG_ICONS.LOCATION("black", 21, 20) }} />
              <p className="text-gray text-start text-md-start font-size-14 pt-1 m-0">514, 5th Floor, Rajhans Montessa, Dumas Rd - Magdalla, Surat, Gujarat 395007</p>
            </div>
            <div className="d-flex gap-2 align-items-center justify-content-start">
              <div dangerouslySetInnerHTML={{ __html: SVG_ICONS.PHONE("black", 21, 20) }} />
              <p className="text-gray text-start text-md-start font-size-14 pt-1 m-0">+91-9925039603</p>
              <div className="d-none d-md-block">
                <WhatsappButton
                  onClick={() => {
                    window.open(
                      "https://wa.me/+919925039603?text=" +
                        encodeURI(`Hello,
    I am interested in learning more about MobiOffice and how I can build a digital foundation for my company. Please get in touch with me.`),
                      "_blank"
                    );
                  }}
                />
              </div>
            </div>
            <div className="d-flex gap-2 align-items-center justify-content-start d-md-none">
              <WhatsappButton
                onClick={() => {
                  window.open(
                    "https://wa.me/+919925039603?text=" +
                      encodeURI(`Hello,
    I am interested in learning more about MobiOffice and how I can build a digital foundation for my company. Please get in touch with me.`),
                    "_blank"
                  );
                }}
              />
            </div>
          </div>
          <div className={`${styles.border_left} col-12 col-md-6 p-4`} id="contact-form">
            <form onSubmit={handleSubmit}>
              <div className="row g-3">
                <div className="col-12">
                  <BreadCrumb BREADCRUMB_ITEMS={BREADCRUMB_ITEMS} />
                </div>
                {!showSuccess && (
                  <>
                    <div className="col-6">
                      <label className={`${styles.form_label} font-size-12 text-gray`}>
                        First Name <span className="text-red">*</span>
                      </label>
                      <input
                        name="FirstName"
                        value={formData.FirstName}
                        disabled={isLoading}
                        onChange={handleChange}
                        className={`${styles.form_control} border-radius-8 overflow-hidden text-dark-blue font-size-14 w-100`}
                        type="text"
                      />
                      {errors.FirstName && <div className="text-danger">{errors.FirstName}</div>}
                    </div>
                    <div className="col-6">
                      <label className={`${styles.form_label} font-size-12 text-gray`}>
                        Last Name <span className="text-red">*</span>
                      </label>
                      <input
                        name="LastName"
                        value={formData.LastName}
                        disabled={isLoading}
                        onChange={handleChange}
                        className={`${styles.form_control} border-radius-8 overflow-hidden text-dark-blue font-size-14 w-100`}
                        type="text"
                      />
                      {errors.LastName && <div className="text-danger">{errors.LastName}</div>}
                    </div>
                    <div className="col-12">
                      <label className={`${styles.form_label} font-size-12 text-gray`}>
                        Mobile Number <span className="text-red">*</span>
                      </label>
                      <IntlTelInput
                        defaultCountry="in"
                        preferredCountries={["in"]}
                        containerClassName="intl-tel-input w-100"
                        value={phoneValue}
                        disabled={isLoading}
                        inputClassName={`${styles.form_control} border-radius-8 overflow-hidden text-dark-blue font-size-14 w-100`}
                        onPhoneNumberChange={handlePhoneNumberChange}
                        onPhoneNumberBlur={handlePhoneNumberBlurChange}
                      />
                      {errors.MobileNumber && <div className="text-danger">{errors.MobileNumber}</div>}
                    </div>
                    <div className="col-12">
                      <label className={`${styles.form_label} font-size-12 text-gray`}>
                        Email Address <span className="text-red">*</span>
                      </label>
                      <input
                        name="EmailID"
                        value={formData.EmailID}
                        disabled={isLoading}
                        onChange={handleChange}
                        className={`${styles.form_control} border-radius-8 overflow-hidden text-dark-blue font-size-14 w-100`}
                        type="EmailID"
                      />
                      {errors.EmailID && <div className="text-danger">{errors.EmailID}</div>}
                    </div>
                    <div className="col-12">
                      <label className={`${styles.form_label} font-size-12 text-gray`}>
                        Message <span className="text-red">*</span>
                      </label>
                      <textarea
                        name="Message"
                        value={formData.Message}
                        disabled={isLoading}
                        onChange={handleChange}
                        className={`${styles.form_control} border-radius-8 overflow-hidden text-dark-blue font-size-14 w-100`}
                        cols={30}
                      />
                      {errors.Message && <div className="text-danger">{errors.Message}</div>}
                    </div>
                    {isLoading && ( // Added loading indicator
                      <div className="col-12 text-center">
                        <div className="spinner-border text-primary" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      </div>
                    )}
                    <div className="col-12">
                      <PrimaryButton title={isLoading ? "Sending..." : "Send Message"} disabled={isLoading} className="w-100 d-flex align-items-center justify-content-center" />
                    </div>
                  </>
                )}
                {showSuccess && (
                  <div className="col-12">
                    <div className={styles.submit_response}>
                      <div className={styles.submit_response_main}>
                        <div className={styles.submit_response_main_content}>
                          <div className={styles.submit_response_main_content_title}>Your request has been sent!</div>
                          <div className={styles.submit_response_main_content_desc}>One of our representatives will contact you shortly.</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function ContactUs() {
  const router = useRouter();

  const [pageFromHash, setPageFromHash] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const hash = window.location.hash;
      const params = new URLSearchParams(hash.split("?")[1]);
      setPageFromHash(params.get("page"));
    }
  }, []);

  return (
    <div>
      <ButterBar
        onScheduleCallBack={() => {
          router.push("/contactus#contact-form?page=contactus");
        }}
      />
      <Introduction page={PAGES.CONTACT_US} headingList={HEADING_LIST} searchbox={false} introImage={"CONTACT_US"} paragraph="We’re here to help — Get in touch with us anytime." />
      <LocationContact appName={pageFromHash} />
      <About
        primaryButton={{
          title: "Book a Demo",
          onClick: () => {
            router.push("/contactus#contact-form?page=contactus");
          },
          icon: SVG_ICONS.RIGHT_ARROW("white", 24, 24),
        }}
      />
      <Footer />
    </div>
  );
}
