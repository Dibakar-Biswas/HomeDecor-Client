// import React from "react";
// import Logo from "../../../components/Logo/Logo";
// import { Link } from "react-router";

// const Footer = () => {
//   return (
//     <footer className="footer footer-horizontal footer-center  p-10">
//       <aside>
//         <Link to='/'><Logo></Logo></Link>
//         <p className="font-bold">
//           ACME Industries Ltd.
//           <br />
//           Providing reliable tech since 1992
//         </p>
//         <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
//       </aside>
//       <nav>
//         <div className="grid grid-flow-col gap-4">
//           <a>
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               width="24"
//               height="24"
//               viewBox="0 0 24 24"
//               className="fill-current"
//             >
//               <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
//             </svg>
//           </a>
//           <a>
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               width="24"
//               height="24"
//               viewBox="0 0 24 24"
//               className="fill-current"
//             >
//               <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
//             </svg>
//           </a>
//           <a>
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               width="24"
//               height="24"
//               viewBox="0 0 24 24"
//               className="fill-current"
//             >
//               <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
//             </svg>
//           </a>
//         </div>
//       </nav>
//     </footer>
//   );
// };

// export default Footer;

import React from "react";
import { FaFacebook, FaInstagram, FaGithub, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import Logo from "../../../components/Logo/Logo";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="py-10 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Contact Section */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-3">Contact Us</h3>
          <p>House 22, New Market Road</p>
          <p>Jashore 7400, Bangladesh</p>
          <p className="mt-2">Customer Support: +880 1711 223344</p>
          <p>Email: info@styledecor.com</p>
        </div>

        {/* Social Media Section */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-3">Follow Us</h3>
          <div className="flex flex-col gap-2">
            <a
              href="https://www.facebook.com/dibakar.biswas.640187/"
              className="flex items-center gap-2"
              target="_blank"
              rel="noreferrer"
            >
              <FaFacebook /> Facebook
            </a>

            <a
              href="https://x.com/Dibakar1806"
              className="flex items-center gap-2"
              target="_blank"
              rel="noreferrer"
            >
              <FaXTwitter /> X(Twitter)
            </a>

            <a
              href="https://www.linkedin.com/in/dibakar742/"
              className="flex items-center gap-2"
              target="_blank"
              rel="noreferrer"
            >
              <FaLinkedin /> LinkedIn
            </a>

            <a
              href="https://github.com/Dibakar-Biswas"
              className="flex items-center gap-2"
              target="_blank"
              rel="noreferrer"
            >
              <FaGithub /> GitHub
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-white mb-3">
            Working Hours
          </h3>
          <p>Saturday – Thursday: 9:00 AM – 7:00 PM</p>
          <p className="mb-4">Friday: Closed</p>
          <Link to="/">
            <Logo></Logo>
          </Link>
        </div>
      </div>

      <div className="text-center mt-10 text-sm border-t border-gray-700 pt-5">
        <p>© {new Date().getFullYear()} Style Decor. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
