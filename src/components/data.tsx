import {
  FaceSmileIcon,
  ChartBarSquareIcon,
  CursorArrowRaysIcon,
  DevicePhoneMobileIcon,
  AdjustmentsHorizontalIcon,
  SunIcon,
} from "@heroicons/react/24/solid";

import benefitOneImg from "../../public/img/benefit-one.png";
import benefitTwoImg from "../../public/img/benefit-two.png";

const benefitOne = {
  title: "Benefits of using our platform",
  desc: "By using our product, you can save time and money. Our platform is designed to help you find the best candidates for your job.",
  image: benefitOneImg,
  bullets: [
    {
      title: "Our platform understand your needs",
      desc: "Very smart AI that understands your needs and requirements to find the best candidates for your job.",
      icon: <FaceSmileIcon />,
    },
    {
      title: "Streamline your manpower acquisition",
      desc: "Increase your manpower acquisition with our AI-driven platform.",
      icon: <ChartBarSquareIcon />,
    },
    {
      title: "Drive manpower retention",
      desc: "Retain your employees with our AI-powered solutions.",
      icon: <CursorArrowRaysIcon />,
    },
  ],
};

const benefitTwo = {
  title: "More useful features",
  desc: "Our platform is designed to help you find the best candidates for your job. We have many features that can help you to find the best candidates for your job.",
  image: benefitTwoImg,
  bullets: [
    {
      title: "Mobile Friendly Design",
      desc: "Smart Hiring Platform is designed as a mobile first responsive template.",
      icon: <DevicePhoneMobileIcon />,
    },
    {
      title: "Resume AI Analyzer",
      desc: "Resume AI Analyzer is a powerful tool that helps you to analyze your resume and get feedback on how to improve it.",
      icon: <AdjustmentsHorizontalIcon />,
    },
    {
      title: "Easy application process",
      desc: "Apply for jobs with ease using our streamlined application process.",
      icon: <SunIcon />,
    },
  ],
};


export {benefitOne, benefitTwo};
