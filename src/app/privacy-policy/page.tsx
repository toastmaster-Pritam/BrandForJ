"use client";

import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">Privacy Policy</h1>
      <p className="mb-6 text-gray-700">
        At BrandForj, we respect your privacy and are committed to protecting your personal data. This
        privacy policy outlines how we collect, use, and safeguard your information in compliance with
        GDPR and other applicable laws.
      </p>

      <div className="space-y-6 text-gray-700">
        <div>
          <h2 className="text-xl font-semibold mb-2">1. Data We Collect</h2>
          <ul className="list-disc list-inside">
            <li>Personal details (name, email, company info) when you register.</li>
            <li>Usage data (IP address, browser type, interactions) for analytics.</li>
            <li>Payment details for subscriptions (processed securely via Stripe).</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">2. How We Use Your Data</h2>
          <ul className="list-disc list-inside">
            <li>To provide and improve our services.</li>
            <li>To personalize user experience.</li>
            <li>To process payments and manage subscriptions.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">3. Data Sharing & Security</h2>
          <ul className="list-disc list-inside">
            <li>We do not sell your data to third parties.</li>
            <li>Your data is stored securely with encryption and access controls.</li>
            <li>Third-party services (e.g., Stripe) handle payments securely.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">4. Your Rights</h2>
          <ul className="list-disc list-inside">
            <li>Access, modify, or delete your data.</li>
            <li>Withdraw consent at any time.</li>
            <li>Request a copy of your stored data.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">5. Cookies & Tracking</h2>
          <p>
            We use cookies to enhance your experience. You can manage your preferences in browser
            settings.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">6. Contact Us</h2>
          <p>
            For any privacy concerns, contact us at <a href="mailto:Support@Brandforj.Com" className="text-blue-500">Support@Brandforj.Com</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
