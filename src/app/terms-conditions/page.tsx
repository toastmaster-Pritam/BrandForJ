"use client";

import React from "react";

const TermsAndConditions = () => {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">Terms & Conditions</h1>
      <p className="mb-6 text-gray-700 text-center">
        Welcome to BrandForj! By using our platform, you agree to the following terms:
      </p>

      <div className="space-y-6 text-gray-700">
        <div>
          <h2 className="text-xl font-semibold mb-2">1. Use Of Services</h2>
          <ul className="list-disc list-inside">
            <li>You must be at least 18 years old to use our services.</li>
            <li>You are responsible for all activity on your account.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">2. Intellectual Property</h2>
          <ul className="list-disc list-inside">
            <li>All content, including AI-generated assets, is partially owned by BrandForj.</li>
            <li>
              Users may use platform-generated assets for personal or commercial use, but cannot resell or
              redistribute them.
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">3. Payment & Subscriptions</h2>
          <ul className="list-disc list-inside">
            <li>Payments are processed via Stripe.</li>
            <li>Subscription fees are non-refundable unless stated otherwise.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">4. User Conduct</h2>
          <ul className="list-disc list-inside">
            <li>No illegal, abusive, or harmful activities.</li>
            <li>No unauthorized access or use of our platform.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">5. Limitation Of Liability</h2>
          <ul className="list-disc list-inside">
            <li>
              We are not responsible for any indirect damages arising from the use of our platform.
            </li>
            <li>Services are provided &ldquo;as-is&ldquo; without guarantees of uninterrupted availability.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">6. Termination</h2>
          <ul className="list-disc list-inside">
            <li>
              We reserve the right to suspend or terminate accounts violating these terms.
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">7. Governing Law</h2>
          <p>
            These terms are governed by the laws of the USA.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Contact Us</h2>
          <p>
            For inquiries, contact us at <a href="mailto:Support@Brandforj.Com" className="text-blue-500">Support@Brandforj.Com</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
