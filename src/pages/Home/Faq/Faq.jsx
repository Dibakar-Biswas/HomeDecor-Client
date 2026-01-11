import React from 'react';

const FAQ = () => {
  return (
    <div className="py-12 px-6 bg-base-100">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl text-primary font-bold text-center mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-center text-base-content/70 mb-10">
          Find answers to common questions about our decoration services
        </p>

        <div className="space-y-4">
          {/* Question 1 */}
          <div className="collapse collapse-arrow bg-base-200 border border-base-300">
            <input type="radio" name="faq-accordion" defaultChecked />
            <div className="collapse-title text-lg font-semibold text-base-content">
              What types of decoration services do you offer?
            </div>
            <div className="collapse-content text-base-content/80">
              <p>
                We offer a wide range of decoration services including wedding
                decorations, birthday party setups, corporate events, home
                decorations, seminar and conference arrangements, and custom
                themed decorations. Each service is tailored to meet your
                specific needs and preferences.
              </p>
            </div>
          </div>

          {/* Question 2 */}
          <div className="collapse collapse-arrow bg-base-200 border border-base-300">
            <input type="radio" name="faq-accordion" />
            <div className="collapse-title text-lg font-semibold text-base-content">
              How far in advance should I book a decoration service?
            </div>
            <div className="collapse-content text-base-content/80">
              <p>
                We recommend booking at least 2-3 weeks in advance for small
                events and 1-2 months for larger events like weddings or
                corporate functions. However, we do accept last-minute bookings
                based on availability. Contact us as soon as possible to secure
                your preferred date.
              </p>
            </div>
          </div>

          {/* Question 3 */}
          <div className="collapse collapse-arrow bg-base-200 border border-base-300">
            <input type="radio" name="faq-accordion" />
            <div className="collapse-title text-lg font-semibold text-base-content">
              What is included in the decoration package price?
            </div>
            <div className="collapse-content text-base-content/80">
              <p>
                Our packages include decoration materials, setup and installation,
                on-site coordination during the event, and post-event cleanup and
                removal. The exact items included vary by package. Each service
                listing shows detailed pricing per square foot and what's included.
              </p>
            </div>
          </div>

          {/* Question 4 */}
          <div className="collapse collapse-arrow bg-base-200 border border-base-300">
            <input type="radio" name="faq-accordion" />
            <div className="collapse-title text-lg font-semibold text-base-content">
              Can I customize the decoration design?
            </div>
            <div className="collapse-content text-base-content/80">
              <p>
                Absolutely! We encourage customization to match your vision. You
                can discuss your color preferences, themes, specific requirements,
                and budget with our team. We'll work with you to create a
                personalized decoration plan that fits your event perfectly.
              </p>
            </div>
          </div>

          {/* Question 5 */}
          <div className="collapse collapse-arrow bg-base-200 border border-base-300">
            <input type="radio" name="faq-accordion" />
            <div className="collapse-title text-lg font-semibold text-base-content">
              What payment methods do you accept?
            </div>
            <div className="collapse-content text-base-content/80">
              <p>
                We accept various payment methods including credit/debit cards,
                mobile banking (bKash, Nagad, Rocket), bank transfers, and cash.
                Online payments are processed securely through Stripe. A 30-50%
                advance payment is required to confirm your booking, with the
                balance due before or on the event day.
              </p>
            </div>
          </div>

          {/* Question 6 */}
          <div className="collapse collapse-arrow bg-base-200 border border-base-300">
            <input type="radio" name="faq-accordion" />
            <div className="collapse-title text-lg font-semibold text-base-content">
              Do you provide decoration services outside Dhaka?
            </div>
            <div className="collapse-content text-base-content/80">
              <p>
                Yes, we provide decoration services throughout Bangladesh.
                Additional transportation and accommodation charges may apply for
                locations outside Dhaka division. Please contact us with your
                location details for a custom quote.
              </p>
            </div>
          </div>

          {/* Question 7 */}
          <div className="collapse collapse-arrow bg-base-200 border border-base-300">
            <input type="radio" name="faq-accordion" />
            <div className="collapse-title text-lg font-semibold text-base-content">
              What is your cancellation policy?
            </div>
            <div className="collapse-content text-base-content/80">
              <p>
                Cancellations made 15+ days before the event receive a full refund
                minus processing fees. Cancellations 7-14 days before receive 50%
                refund. Cancellations less than 7 days before are non-refundable,
                but you can reschedule within 3 months subject to availability.
              </p>
            </div>
          </div>

          {/* Question 8 */}
          <div className="collapse collapse-arrow bg-base-200 border border-base-300">
            <input type="radio" name="faq-accordion" />
            <div className="collapse-title text-lg font-semibold text-base-content">
              How long does the decoration setup take?
            </div>
            <div className="collapse-content text-base-content/80">
              <p>
                Setup time varies depending on the complexity and size of the
                decoration. Small events typically take 2-4 hours, while larger
                events like weddings may require 6-8 hours or more. We always
                complete setup well before your event start time.
              </p>
            </div>
          </div>

          {/* Question 9 */}
          <div className="collapse collapse-arrow bg-base-200 border border-base-300">
            <input type="radio" name="faq-accordion" />
            <div className="collapse-title text-lg font-semibold text-base-content">
              Can I see samples or portfolios of previous work?
            </div>
            <div className="collapse-content text-base-content/80">
              <p>
                Yes! You can view our portfolio on the Service page where each
                decoration package includes photos of previous setups. You can
                also visit our office to see physical samples and discuss your
                requirements with our design team.
              </p>
            </div>
          </div>

          {/* Question 10 */}
          <div className="collapse collapse-arrow bg-base-200 border border-base-300">
            <input type="radio" name="faq-accordion" />
            <div className="collapse-title text-lg font-semibold text-base-content">
              What happens if there's damage to the venue during setup?
            </div>
            <div className="collapse-content text-base-content/80">
              <p>
                We take utmost care during setup and removal to prevent any damage
                to your venue. Our team is fully trained and insured. In the rare
                event of accidental damage, our insurance covers repairs or
                compensation as per our service agreement terms.
              </p>
            </div>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="mt-12 text-center bg-base-200 p-8 rounded-lg border border-base-300">
          <h3 className="text-2xl font-bold text-base-content mb-3">
            Still Have Questions?
          </h3>
          <p className="text-base-content/70 mb-6">
            Our team is here to help! Contact us for personalized assistance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="btn btn-primary text-white"
            >
              Contact Us
            </a>
            <a
              href="tel:+8801711223344"
              className="btn btn-outline btn-primary"
            >
              Call Now: +880 1711 223344
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
