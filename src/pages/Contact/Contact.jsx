import React from 'react';

const Contact = () => {
    return (
        <div className="py-12 px-6 bg-gray-100 text-gray-800">
            
            <div className="max-w-4xl mx-auto">
                
                <h2 className="text-4xl text-primary font-bold text-center mb-10">Contact Us</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

                    
                    <div className="contact-block bg-white shadow-md p-6 rounded-lg">
                        <h3 className="text-xl font-semibold mb-3">Address</h3>
                        <p>
                            House 22, New Market Road, <br />
                            Jashore 7400, Bangladesh
                        </p>
                    </div>

                    <div className="contact-block bg-white shadow-md p-6 rounded-lg">
                        <h3 className="text-xl font-semibold mb-3">Phone Numbers</h3>
                        <p>Customer Support: +880 1711 223344</p>
                        <p>Business Enquiries: +880 1911 556677</p>
                        <p>Event & Decoration Booking: +880 1300 889900</p>
                    </div>

                    <div className="contact-block bg-white shadow-md p-6 rounded-lg">
                        <h3 className="text-xl font-semibold mb-3">Email</h3>
                        <p>General Queries: info@styledecor.com</p>
                        <p>Bookings & Events: bookings@styledecor.com</p>
                        <p>Support: support@styledecor.com</p>
                    </div>

                    <div className="contact-block bg-white shadow-md p-6 rounded-lg">
                        <h3 className="text-xl font-semibold mb-3">Working Hours</h3>
                        <p>Saturday – Thursday: 9:00 AM – 7:00 PM</p>
                        <p>Friday: Closed (Available for pre-booked events)</p>
                    </div>

                </div>
            </div>

        </div>
    );
};

export default Contact;
