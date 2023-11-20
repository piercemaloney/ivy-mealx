import React from "react";
import { Image } from "@chakra-ui/react";
import im from "../mealex-qrcode.png";

const QrCodeComponent: React.FC = () => {
  return <Image src={im} alt="Meal Exchange QR Code" />;
};

export default QrCodeComponent;
