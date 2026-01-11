import React from 'react';

const Contact = () => {
    return (
        <div className="py-12 px-6 bg-base-100">
            
            <div className="max-w-4xl mx-auto">
                
                <h2 className="text-4xl text-primary font-bold text-center mb-10">Contact Us</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

                    
                    <div className="contact-block bg-base-200 shadow-md p-6 rounded-lg border border-base-300">
                        <h3 className="text-xl font-semibold mb-3 text-base-content">Address</h3>
                        <p className="text-base-content/80">
                            House 22, New Market Road, <br />
                            Jashore 7400, Bangladesh
                        </p>
                    </div>

                    <div className="contact-block bg-base-200 shadow-md p-6 rounded-lg border border-base-300">
                        <h3 className="text-xl font-semibold mb-3 text-base-content">Phone Numbers</h3>
                        <p className="text-base-content/80">Customer Support: +880 1711 223344</p>
                        <p className="text-base-content/80">Business Enquiries: +880 1911 556677</p>
                        <p className="text-base-content/80">Event & Decoration Booking: +880 1300 889900</p>
                    </div>

                    <div className="contact-block bg-base-200 shadow-md p-6 rounded-lg border border-base-300">
                        <h3 className="text-xl font-semibold mb-3 text-base-content">Email</h3>
                        <p className="text-base-content/80">General Queries: info@styledecor.com</p>
                        <p className="text-base-content/80">Bookings & Events: bookings@styledecor.com</p>
                        <p className="text-base-content/80">Support: support@styledecor.com</p>
                    </div>

                    <div className="contact-block bg-base-200 shadow-md p-6 rounded-lg border border-base-300">
                        <h3 className="text-xl font-semibold mb-3 text-base-content">Working Hours</h3>
                        <p className="text-base-content/80">Saturday – Thursday: 9:00 AM – 7:00 PM</p>
                        <p className="text-base-content/80">Friday: Closed (Available for pre-booked events)</p>
                    </div>

                </div>
            </div>

        </div>
    );
};

export default Contact;
