"use client";
import React from "react";

const ContactUsPage = () => {
  return (
    <section className="bg-black text-white py-16 px-6 md:px-20">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-start">
        {/* Contact Info */}
        <div>
          <h2 className="text-4xl font-bold mb-6">Contact Us</h2>
          <p className="text-lg text-gray-300 mb-6">
            Have questions or need assistance? We’re here to help. Get in touch
            with us using the details below or visit our location.
          </p>

          <div className="space-y-4">
            <p>
              <strong>📍 Address:</strong> Shop # 16D 2nd Floor Singapore Plaza
              , Bank Road , Saddar , Rawalpindi
            </p>
            <p>
              <strong>📞 Phone:</strong> +92-3165428934
            </p>
            <p>
              <strong>📧 Email:</strong> isquaregadgets@gmail.com
            </p>
          </div>

          <button className="mt-6 bg-sony hover:shadow-md hover:shadow-white transition-all px-6 py-3 rounded-lg font-semibold shadow-lg">
            <a href={`https://wa.me/923165428934`}>Send a Message</a>
          </button>
        </div>

        {/* Google Map */}
        <div className="w-full h-80 md:h-[450px] rounded-lg overflow-hidden shadow-lg">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2626.724240598597!2d73.05231757452742!3d33.594051541787195!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38df95ae778216d1%3A0x2135d4e3b2fb20!2sSingapore%20Plaza!5e1!3m2!1sen!2s!4v1755011129645!5m2!1sen!2s"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default ContactUsPage;
