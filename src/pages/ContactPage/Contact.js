import React from "react";
import inurioLogo from "../../assests/logo/injurio_logo.png";
import { Table, Tbody, Tr, Th } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { NavbarDefault } from "../../components/NavbarComponent/Navbar";
import { MdEmail } from "react-icons/md";
import { FcContacts } from "react-icons/fc";
import { BsLinkedin } from "react-icons/bs";
import { FcDocument } from "react-icons/fc";
import "./contact.css";

const Contact = () => {
  return (
    <div>
      <NavbarDefault/>
      <div className="md:h-[90vh] md:w-[100vw] flex flex-col md:flex-row justify-center  gap-5">
        <div className="md:w-[50%]  md:h-full img-bg py-10 md:py-36 ">
          <img src={inurioLogo} alt="Website_logo" className="w-9/12 mx-auto" />
        </div>

        <div className="lg:w-[40%] lg:mx-auto md:my-10 mx-2">
          <h1 className="text-5xl lg:text-7xl fw-bolder font-publicSans">
            Contact us
          </h1>
          <p className="text-2xl font-publicSans lg:ms-3">
            We want to hear from you
          </p>
          <Table className='mt-5'>
 
  <Tbody>
    <Tr className="flex items-center gap-3">
      <Th className="items-center gap-1 text-xl py-2 md:flex"><MdEmail className="hidden md:block"/> Email :</Th>
      <p className="text-center"><a href="mailto:ankitkumar040722@gmail.com" className="hover:underline lg:ms-5" target='blank'>ankitkumar040722@gmail.com</a></p>
    </Tr>
    <Tr className="flex items-center gap-3">
      <Th className="items-center gap-1 text-xl py-2 md:flex"><FcContacts  className="hidden md:block"/> Contact :</Th>
      <p className="text-center"><a href='tel:+6201947926' className='hover:underline lg:ms-5' target='blank'>6201947926</a></p>
    </Tr>
    <Tr className="flex items-center gap-3">
      <Th className="items-center gap-1 text-xl py-2 md:flex"><BsLinkedin  className="hidden md:block"/> Linkedin :</Th>
      <p className="text-center"><a href='https://www.linkedin.com/in/ankit-k-51579b1b9/' className='hover:underline lg:ms-5' target='blank'>www.linkedin.com/ankit</a></p>
    </Tr>
    <Tr className="flex items-center gap-3">
      <Th className="items-center gap-1 text-xl py-2 md:flex"><FcDocument className="hidden md:block" /> Resume :</Th>
      <p className="text-center"><a href='https://drive.google.com/file/d/1iIoFvrlXAhhjMLd-neyrxDFuzNLEl7q6/view?usp=sharing' className='hover:underline lg:ms-5' target='blank'>Ankit_Resume</a></p>
    </Tr>
  </Tbody>
</Table>

        </div>
      </div>
    </div>
  );
};

export default Contact;
