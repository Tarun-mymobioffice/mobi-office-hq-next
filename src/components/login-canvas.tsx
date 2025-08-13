"use client";

import React, { useEffect, useState } from "react";
import PrimaryButton from "./primary-btn";

import { Offcanvas, OverlayTrigger, Tooltip } from "react-bootstrap";
import Image from "next/image";
import styles from "@/app/styles/components/LoginCanvas.module.scss";
import { PAGES, Int_SiteUserLogin, Int_AppLogin } from "@/models/types";
import { SVG_ICONS } from "@/models/svgs";
import { useRouter, useSearchParams } from "next/navigation";

interface Int_LoginCanvasProps {
  PLACEMENT?: "end" | "start" | "top" | "bottom";
}

interface Int_UserInfo {
  UID: string;
  CID: number;
  MagicBellID: string | null;
  EmployeeID: string;
  Name: string;
  Username: string;
  EmailID: string;
  Password: string;
  PhonePreFix: string;
  Phone: string;
  UserToken: string | null;
  UserLogoName: string;
  UserLogoUrl: string;
  UserLogoSize: number;
  UserLogoType: string;
  IsActive: boolean;
}

interface Int_Application {
  AID: string;
  ID: string;
  ApplicationName: string;
  ApplicationTitle: string;
  ApplicationUrl: string;
  ApplicationLogoName: string;
  ApplicationLogoUrl: string;
  ApplicationLogoType: string;
  ApplicationLogoSize: number;
  ApplicationHeaderLogoName: string;
  ApplicationHeaderLogoUrl: string;
  ApplicationHeaderLogoType: string;
  ApplicationHeaderLogoSize: number;
  ApplicationSymbolName: string;
  ApplicationSymbolUrl: string;
  ApplicationSymbolType: string;
}

interface Int_Company {
  ID: string;
  AID: number;
  CID: number;
  ApplicationUrl: string | null;
  IsActive: boolean;
  CompanyName: string;
  CompanyNickName: string;
  CompanyLogoName: string;
  CompanyLogoUrl: string;
  CompanyLogoType: string;
  CompanyLogoSize: number;
  FullName: string;
  CompanyEmail: string;
  IsPasswordMatched: boolean;
  Applications: Int_Application[];
}

const LoginCanvas = ({ PLACEMENT = "end" }: Int_LoginCanvasProps) => {
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    const params = new URLSearchParams(searchParams.toString());
    params.delete("login");
    router.replace(`?${params.toString()}`);
  };

  const router = useRouter();

  const [canvasPage, setCanvasPage] = useState("login");
  const [selectedType, setSelectedType] = useState("email");
  const [logInForm, setLogInForm] = useState({
    email: "",
    mobile: "",
    password: "",
  });
  const [nextClicked, setNextClicked] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [appsToken, setAppsToken] = useState("");
  const [userInfo, setUserInfo] = useState<Int_UserInfo | null>(null);
  const [selectedFaq, setSelectedFaq] = useState<number>(-1);
  const [appsTable, setAppsTable] = useState<Int_Company[]>([]);
  const [isMounted, setMounted] = useState(false);
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const storedToken = sessionStorage.getItem("token");
      if (!storedToken) return;
  
      setIsLoading(true); // ✅ start loading
  
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_USER_MANAGEMENT_API_URL}account/site-user-login?appName=${PAGES.MOBIOFFICE_ERP}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${JSON.parse(storedToken)}`,
            },
          }
        );
  
        const res = await response.json();
  
        if (res.Table && res.token && res.userInfo) {
          setAppsTable(res.Table);
          setAppsToken(res.token);
          setUserInfo(res.userInfo);
          setCanvasPage("apps");
        } else {
          sessionStorage.removeItem("token");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        sessionStorage.removeItem("token");
      } finally {
        setIsLoading(false); // ✅ ensure it's stopped even on error
      }
    };
  
    fetchUserData();
  }, []);
  

  useEffect(() => {
    const loginParam = searchParams.get("login");
    if (loginParam === "true") {
      setShow(true);
      setCanvasPage("login");
    }
  }, [searchParams]);

  useEffect(() => {
    if (isMounted) {
      if (window.location.hash.split("#")[1] == "onlogout") {
        history.replaceState(null, " ", " ");
        handleShow();
      }
    } else {
      setMounted(true);
    }
  }, [isMounted]);

  const handleShow = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("login", "true");
    router.replace(`?${params.toString()}`);
  };

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLogInForm({ ...logInForm, [name]: value });
  };

  const validateLogInForm = () => {
    let isNotValid = false;
    setNextClicked(true);
    if (selectedType === "email" && !validateEmail(logInForm.email)) {
      setErrorMessage("Please enter a valid email address");
      isNotValid = true;
    } else if (selectedType === "mobile" && !logInForm.mobile) {
      setErrorMessage("Please enter a valid Mobile Number");
      isNotValid = true;
    } else if (!logInForm.password) {
      setErrorMessage("Please enter password");
      isNotValid = true;
    } else {
      setErrorMessage("");
      isNotValid = false;
    }

    return isNotValid;
  };

  const next = async () => {
    if (validateLogInForm()) return;

    const loginPayload: Int_SiteUserLogin = {
      Username: selectedType === "email" ? logInForm.email : logInForm.mobile,
      Password: logInForm.password,
    };

    try {
      setIsLoading(true);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_USER_MANAGEMENT_API_URL}account/site-user-login?appName=${PAGES.MOBIOFFICE_ERP}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loginPayload),
        }
      );

      const result = await response.json();

      if (response.ok) {
        const userObj = {
          token: result.token,
          userInfo: result.userInfo,
        };

        if (
          result.Table.length === 1 &&
          result.Table[0].Applications.length === 1
        ) {
          appCardClick(
            result.Table[0].Applications[0],
            result.Table[0],
            userObj
          );
          return; // Do not continue — user is being redirected
        }

        setErrorMessage("");
        setAppsTable(result.Table);
        setAppsToken(result.token);
        setUserInfo(result.userInfo);
        setCanvasPage("apps");
        sessionStorage.setItem("token", JSON.stringify(result.token));
      } else {
        setErrorMessage(result.message);
      }
    } catch (err) {
      console.error("Error in logging in:", err);
      setErrorMessage("Failed to login. Please try again.");
    } finally {
      setIsLoading(false); // ✅ Only runs if `return` didn’t stop the flow earlier
    }
  };

  const handleLogout = async () => {
    sessionStorage.clear();
    setUserInfo(null);
    setAppsTable([]);
    setSelectedFaq(-1);
    setCanvasPage("login");
    setNextClicked(false);
    setLogInForm({ email: "", mobile: "", password: "" });
    handleClose();
  };

  const appCardClick = async (
    app: Int_Application,
    item: Int_Company,
    userObj?: {
      token: string;
      userInfo: Int_UserInfo;
    }
  ) => {
    const appLoginPayload: Int_AppLogin = {
      appName: app.ApplicationName,
      companyName: item.CompanyName,
      token: userObj?.token || appsToken,
    };
    setIsLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_USER_MANAGEMENT_API_URL}v1/user/direct-app-login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(appLoginPayload),
        }
      );

      const result = await response.json();
      const userData = userObj?.userInfo || userInfo;
      if (response.ok) {
        const token = result.Token;
        window.open(
          `${app.ApplicationUrl}?requesttoken=${token}&companyName=${
            item.CompanyName
          }&appName=${app.ApplicationName}&companyNick=${
            item.CompanyNickName
          }&phone=${userData ? userData.Phone : ""}&userName=${
            userData ? userData.Username : ""
          }`
        );
        setIsLoading(false);
      }
    } catch (err) {
      console.error("Error in logging in:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <PrimaryButton
        title={userInfo ? userInfo.Name : "Login"}
        className="px-4"
        onClick={handleShow}
      />
      <Offcanvas
        show={show}
        onHide={handleClose}
        placement={PLACEMENT}
        className={`${styles.login_form_canvas}`}
      >
        <Offcanvas.Body>
          {canvasPage === "login" && (
            <div className={styles.login_form}>
              <div className={styles.login_form_head}>
                <p className={styles.login_form_head_title}>Login</p>
                <p className={styles.login_form_head_desc}>
                  Let’s get started with some of your details.
                </p>
              </div>
              <div className={styles.login_form_content}>
                <div className={styles.login_form_content_type_selector}>
                  <div>
                    <input
                      type="radio"
                      name="type-select"
                      value="email"
                      checked={selectedType === "email"}
                      onChange={() => setSelectedType("email")}
                    />
                    <label>Email Address</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      name="type-select"
                      value="mobile"
                      checked={selectedType === "mobile"}
                      onChange={() => setSelectedType("mobile")}
                    />
                    <label>Mobile Number</label>
                  </div>
                </div>
                {selectedType === "mobile" ? (
                  <div className={styles.input_container}>
                    <label htmlFor="mobile">Mobile Number</label>
                    <input
                      type="text"
                      className={`form-control ${
                        nextClicked && !logInForm.mobile
                          ? styles.error_input
                          : ""
                      }`}
                      name="mobile"
                      placeholder="Mobile..."
                      value={logInForm.mobile}
                      onChange={handleInputChange}
                    />
                    {nextClicked && !logInForm.mobile && (
                      <span className={styles.error_text}>
                        Please enter a valid Mobile Number
                      </span>
                    )}
                  </div>
                ) : (
                  <div className={styles.input_container}>
                    <label htmlFor="email">Email</label>
                    <input
                      type="text"
                      className={`form-control ${
                        nextClicked && !validateEmail(logInForm.email)
                          ? styles.error_input
                          : ""
                      }`}
                      name="email"
                      placeholder="Email..."
                      value={logInForm.email}
                      onChange={handleInputChange}
                    />
                    {nextClicked && !validateEmail(logInForm.email) && (
                      <span className={styles.error_text}>
                        Please enter a valid email address
                      </span>
                    )}
                  </div>
                )}
                <div className={styles.input_container}>
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className={`form-control ${
                      nextClicked && !logInForm.password
                        ? styles.error_input
                        : ""
                    }`}
                    name="password"
                    placeholder="Password..."
                    value={logInForm.password}
                    onChange={handleInputChange}
                  />
                  {nextClicked && !logInForm.password && (
                    <span className={styles.error_text}>
                      Please enter password
                    </span>
                  )}
                  <div className={styles.forgot_password}>Forgot Password?</div>
                </div>
                {isLoading && (
                  <div className={styles.next_button}>
                    <div className="spinner-border text-light" role="status">
                    </div>
                  </div>
                )}
                {!isLoading && (
                  <div className={styles.next_button} onClick={next}>
                    Next
                  </div>
                )}
                {errorMessage && nextClicked && (
                  <div className={styles.error_message}>{errorMessage}</div>
                )}
              </div>
            </div>
          )}
          {canvasPage === "apps" && (
            <div className={`${styles.apps_container} d-flex`}>
              <div className={styles.apps_container_header}>
                {selectedFaq > -1 && (
                  <i
                    className="bi bi-arrow-left"
                    onClick={() => {
                      setSelectedFaq(-1);
                    }}
                  ></i>
                )}
                <span>
                  {selectedFaq > -1
                    ? appsTable[selectedFaq].CompanyName
                    : "Select Company"}
                </span>
                <button
                  onClick={handleLogout}
                  className={`${styles.logout_button} btn btn-link text-white bg-transparent ms-auto`}
                >
                  Logout
                </button>
              </div>
              <div className={styles.apps_container_content}>
                <div className="row w-100 m-0">
                  {appsTable &&
                    !(selectedFaq > -1) &&
                    appsTable.map((item, itemIndex: number) => (
                      <div className="col-6 p-2" key={itemIndex}>
                        <div
                          className={styles.apps_card}
                          onClick={() => {
                            if (item.Applications.length === 1) {
                              appCardClick(item.Applications[0], item);
                            } else {
                              setSelectedFaq(itemIndex);
                            }
                          }}
                        >
                          <div className="d-flex align-items-center gap-2">
                            <div
                              dangerouslySetInnerHTML={{
                                __html: SVG_ICONS.MOBIOFFICE_LOGO(
                                  "#7263E2",
                                  30,
                                  30
                                ),
                              }}
                            />
                            <span>{item.CompanyName}</span>
                          </div>
                          <i className="bi bi-circle-fill icon"></i>
                        </div>
                      </div>
                    ))}
                  {appsTable &&
                    selectedFaq > -1 &&
                    appsTable[selectedFaq].Applications.map(
                      (app, appIndex: number) => (
                        <div className="col-2 p-2" key={appIndex}>
                          <div
                            className={styles.app_card}
                            onClick={() =>
                              appCardClick(app, appsTable[selectedFaq])
                            }
                          >
                            {app.ApplicationSymbolType === "SVG_LOGO" ? (
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: app.ApplicationSymbolUrl,
                                }}
                              />
                            ) : (
                              <Image
                                src={app.ApplicationSymbolUrl}
                                alt={app.ApplicationTitle}
                                width={40}
                                height={40}
                              />
                            )}
                            {app.ApplicationTitle}
                            {!appsTable[selectedFaq].IsPasswordMatched && (
                              <OverlayTrigger
                                overlay={
                                  <Tooltip id="tooltip-disabled">
                                    Password Mismatched!
                                  </Tooltip>
                                }
                              >
                                <i
                                  className={`${styles.company_card_warning_sign} bi bi-exclamation-triangle`}
                                ></i>
                              </OverlayTrigger>
                            )}
                          </div>
                        </div>
                      )
                    )}
                </div>
              </div>
            </div>
          )}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default LoginCanvas;
