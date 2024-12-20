import { RiInstagramFill } from "react-icons/ri";
import { FaFacebook } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="border-t">
      <div className="container mx-auto p-4 flex flex-col gap-4 lg:flex-row lg:justify-between">
        {/* Text Section */}
        <p className="text-left lg:order-1 lg:w-auto">
          all rights reserved. 2024
        </p>

        {/* Icons Section */}
        <div className="flex items-center gap-4 text-2xl justify-start lg:justify-end">
          <a href="" className="hover:text-primary">
            <FaFacebook />
          </a>
          <a href="" className="hover:text-primary">
            <RiInstagramFill />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
