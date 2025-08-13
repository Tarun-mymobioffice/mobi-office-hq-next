export interface Int_TestimonialProps {
  image: string;
  mobileImage: string;
  author: string;
  role: string;
  content: string;
  company?: string;
  rating?: number;
}

export interface Int_ProductFeatures {
  title: string;
  desc: string;
  features: Int_FeatureCard[];
  background?: string;
  header_class?: string;
  font_size?: string;
}

export interface Int_FeatureCard {
  title: string;
  desc: string;
  icon?: string;
  iconSrc?: string;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
}

export interface Int_AboutProps {
  primaryButton?: Int_PrimaryButtonProps | null;
}

export interface Int_PrimaryButtonProps {
  title: string;
  onClick: () => void;
  icon?: string;
}

export interface Int_Heading {
  isHighlight: boolean;
  text: string;
}

export type IconKey =
  | "MOBIOFFICE_ERP_INTRO"
  | "EDUCATION_INTRO"
  | "TEXTILE_INTRO"
  | "ACCOUNTING_INTRO"
  | "ORDER_MANAGEMENT_INTRO"
  | "JOB_WORK_OUTSOURCING_INTRO"
  | "PROCUREMENT_INVENTORY_INTRO"
  | "OUR_SOLUTIONS_INTRO"
  | "TRYBE_INTRO"
  | "MOBIFIXPRO_INTRO"
  | "MOBICRM_INTRO"
  | "MOBIPAYROLL_INTRO"
  | "CONTACT_US";

export interface Int_SiteUserLogin {
  Username: string;
  Password: string;
}

export interface Int_LocationContactProps {
  appName: string | null;
}

export enum PAGES {
  LANDING = "landing",
  VISITOR_MANAGEMENT = "visitor_management",
  DOUBLETICK = "doubleclick",
  ACCOUNTING = "accounting",
  MOBIOFFICE_ERP = "mobioffice-erp",
  CONTACT_US = "contact_us",
  PRIVACY_POLICY = "privacy_policy",
  ORDER_MANAGEMENT = "order-management",
  TERMS_AND_SERVICES = "terms_and_services",
  JOB_WORK_OUTSOURCING_INTRO = "job_work_&_outsourcing_intro",
  PROCUREMENT_INVENTORY_INTRO = "procurement_inventory_intro",
  MOBIFIXPRO = "mobi_fix_pro_intro",
  MOBICRM = "mobi_crm",
  MOBIPAYROLL = "payroll"
}


export interface Int_AppLogin {
  appName: string;
  companyName: string;
  token: string;
}


export interface Int_AccordionItem {
  id: number;
  question: string;
  answer: string;
}
