import Link from "next/link";
import React from "react";
// Importamos los íconos lineales de react-icons/fi
import { FiFacebook, FiInstagram, FiLinkedin, FiYoutube } from "react-icons/fi";
import { FaTiktok } from "react-icons/fa6";

export default function Footer() {
  return (
    <div className="w-full flex items-center justify-center py-8 border-t-[1px] border-t-darkGray">
      <div className="w-[80%] flex flex-col md:flex-row justify-between gap-8">
        {/* Primera columna con íconos sociales y descripción */}

        <div className="flex flex-col md:flex-row gap-5">
          <div className="w-[250px] flex flex-col justify-center mr-24">
            <p className="font-chackra text-meant text-[24px] font-semibold mb-2">
              The Panda.
            </p>
            <p className="font-chackra text-lightWhite mb-1">
              Mobile auto repairs and services
            </p>
            <div className="flex flex-row gap-4">
              {/* Circulo externo con color meant y el icono lineal */}
              <div className="w-10 h-10 bg-meant rounded-full flex items-center justify-center cursor-pointer transition-all hover:bg-[#38a17b]">
                <div className="w-8 h-8 border border-darkBlack rounded-full flex items-center justify-center">
                  <Link href="https://www.facebook.com/PandaMarsLLC/">
                    <FiFacebook className="text-darkBlack text-xl" />
                  </Link>
                </div>
              </div>

              <div className="w-10 h-10 bg-meant rounded-full flex items-center justify-center cursor-pointer transition-all hover:bg-[#38a17b]">
                <div className="w-8 h-8 border border-darkBlack rounded-full flex items-center justify-center">
                  <Link href="https://www.youtube.com/channel/UCBbLAJCJvUbgHwgmZiENFWA">
                    <FiYoutube className="text-darkBlack text-xl" />
                  </Link>
                </div>
              </div>

              <div className="w-10 h-10 bg-meant rounded-full flex items-center justify-center cursor-pointer transition-all hover:bg-[#38a17b]">
                <div className="w-8 h-8 border border-darkBlack rounded-full flex items-center justify-center">
                  <Link href="https://www.linkedin.com/company/the-panda-m-a-r-s-llc/">
                  </Link>
                  <FiLinkedin className="text-darkBlack text-xl" />
                </div>
              </div>
              <div className="w-10 h-10 bg-meant rounded-full flex items-center justify-center cursor-pointer transition-all hover:bg-[#38a17b]">
                <div className="w-8 h-8 border border-darkBlack rounded-full flex items-center justify-center">
                  <Link href="https://www.tiktok.com/@pandamarsllc">
                    <FaTiktok className="text-darkBlack text-xl" />
                  </Link>
                </div>
              </div>

              <div className="w-10 h-10 bg-meant rounded-full flex items-center justify-center cursor-pointer transition-all hover:bg-[#38a17b]">
                <div className="w-8 h-8 border border-darkBlack rounded-full flex items-center justify-center">
                  <Link href="https://www.instagram.com/pandamarsllc/?hl=en">
                    <FiInstagram className="text-darkBlack text-xl" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Segunda columna con más espacio entre los menús */}
          <div className="flex flex-row gap-24">
            {/* Menú de Products */}
            <div className="flex flex-col">
              <p className="font-chackra text-meant text-[18px] font-semibold mb-2">
                Products
              </p>
              <Link
                href="/home/technician"
                className="text-lightWhite hover:text-meant text-[15px] mb-1 font-jost"
              >
                Technician App
              </Link>
              <Link
                href="/home/customer"
                className="text-lightWhite hover:text-meant text-[15px] mb-1 font-jost"
              >
                Customer App
              </Link>
              <Link
                href="/home/generative"
                className="text-lightWhite hover:text-meant text-[15px] font-jost"
              >
                Panda AI App
              </Link>
            </div>

            {/* Menú de Resources */}
            <div className="flex flex-col">
              <p className="font-chackra text-meant text-[18px] font-semibold mb-2">
                Resources
              </p>
              <Link
                href="/politics/privacy"
                className="text-lightWhite hover:text-meant text-[15px] mb-1 font-jost"
              >
                Privacy Policy
              </Link>
              <Link
                href="/politics/terms"
                className="text-lightWhite hover:text-meant text-[15px] mb-1 font-jost"
              >
                Terms and Conditions
              </Link>
              <Link
                href="/faq"
                className="text-lightWhite hover:text-meant text-[15px] font-jost"
              >
                FAQ
              </Link>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-start items-start space-y-2">
          {/* Título */}
          <p className="text-lightGray font-jost text-[16px] leading-relaxed border-l-2 border-meant pl-3">
            Email us at{" "}
            <span className="text-lightWhite font-semibold underline hover:text-meant transition-all">
              contact@panda-mars.com
            </span>
            <br />
            <span className="text-lightWhite font-semibold">
              7600 Chevy Chase Dr, Austin, TX 78752
            </span>
            <br />
            Call or text us at{" "}
            <span className="text-lightWhite font-semibold hover:text-meant transition-all">
              (737) 366-6773
            </span>
          </p>

          {/* Línea divisoria */}
          <div className="w-full h-[1px] bg-gray-700 my-2" />

          {/* Derechos reservados */}
          <p className="text-lightWhite text-xs xl:text-base leading-loose">
            © 2024 The Panda M.A.R.S. LLC. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
