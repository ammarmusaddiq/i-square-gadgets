import React from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { MailOpenIcon, PhoneIcon } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { MailOpen } from "lucide-react";

const Footer = () => {
  return (
    <footer>
      <div className="flex flex-col md:flex-row items-start justify-center px-6 md:px-16 lg:px-32 gap-10 py-14 border-b border-gray-500/30 text-gray-500">
        <div className="w-4/5">
          <Image className="w-28 md:w-32" src={assets.logo} alt="logo" />
          <p className="mt-6 text-sm">
            <strong className="text-white">I-Square Gadgets</strong> offers all
            types of used mobiles in Saddar Singapore Plaza. All kind of
            flagship phones like OnePlus , Apple , Samsung , Google , RedMagic
            etc are available.
          </p>
        </div>

        <div className="w-1/2 flex items-center justify-start md:justify-center">
          <div>
            <h2 className="font-medium text-white mb-5">Company</h2>
            <ul className="text-sm space-y-2">
              <li>
                <a className="hover:underline transition" href="/">
                  Home
                </a>
              </li>
              <li>
                <a className="hover:underline transition" href="/about-us">
                  About us
                </a>
              </li>
              <li>
                <a className="hover:underline transition" href="/contact-us">
                  Contact us
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="w-1/2 flex items-start justify-start md:justify-center">
          <div>
            <h2 className="font-medium text-white mb-5">Get in touch</h2>
            <div className="text-sm space-y-2 ">
              <div className="flex items-center space-x-2">
                <FaWhatsapp className="text-green-500 w-4 h-4 " />
                <a
                  href={`https://wa.me/923165428934`}
                  className="hover:text-white"
                >
                  +92-3165428934
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <MailOpenIcon className="text-green-500 w-4 h-4" />
                <a
                  href={`https://mail.google.com/mail/?view=cm&fs=1&to=isquaregadgets@gmail.com`}
                  className="hover:text-white"
                >
                  iSquareGadgets@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p className="py-4 text-center text-xs md:text-sm text-white">
        Copyright 2025 © FTSSolution.tech All Right Reserved.
      </p>
    </footer>
  );
};

export default Footer;
