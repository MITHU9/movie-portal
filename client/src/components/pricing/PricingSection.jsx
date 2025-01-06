import React from "react";

const PricingSection = () => {
  return (
    <section className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 py-16">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-4xl md:text-5xl font-bold">Choose Your Plan</h2>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            Flexible plans tailored for every movie lover. Cancel anytime.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Basic Plan */}
          <div
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 transform hover:scale-105 transition"
            data-aos="fade-right"
          >
            <h3 className="text-2xl font-semibold">Basic</h3>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              For casual viewers.
            </p>
            <div className="mt-6">
              <span className="text-4xl font-bold">$5</span>
              <span className="text-gray-600 dark:text-gray-400">/mo</span>
            </div>
            <ul className="mt-6 space-y-3 text-gray-600 dark:text-gray-400">
              <li>Access to 1,000+ movies</li>
              <li>Standard Definition</li>
              <li>Watch on 1 device</li>
            </ul>
          </div>

          {/* Standard Plan */}
          <div
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border-4 border-blue-600 transform hover:scale-105 transition"
            data-aos="fade-up"
          >
            <h3 className="text-2xl font-semibold">Standard</h3>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Perfect for movie enthusiasts.
            </p>
            <div className="mt-6">
              <span className="text-4xl font-bold">$10</span>
              <span className="text-gray-600 dark:text-gray-400">/mo</span>
            </div>
            <ul className="mt-6 space-y-3 text-gray-600 dark:text-gray-400">
              <li>Access to 5,000+ movies</li>
              <li>High Definition</li>
              <li>Watch on 2 devices</li>
              <li>Ad-free experience</li>
            </ul>
          </div>

          {/* Premium Plan */}
          <div
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 transform hover:scale-105 transition"
            data-aos="fade-right"
          >
            <h3 className="text-2xl font-semibold">Premium</h3>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              For movie lovers and families.
            </p>
            <div className="mt-6">
              <span className="text-4xl font-bold">$15</span>
              <span className="text-gray-600 dark:text-gray-400">/mo</span>
            </div>
            <ul className="mt-6 space-y-3 text-gray-600 dark:text-gray-400">
              <li>Access to all movies</li>
              <li>4K Ultra HD</li>
              <li>Watch on 4 devices</li>
              <li>Ad-free experience</li>
              <li>Exclusive content</li>
            </ul>
          </div>

          {/* Family Plan */}
          <div
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 transform hover:scale-105 transition"
            data-aos="fade-up"
          >
            <h3 className="text-2xl font-semibold">Family</h3>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              For families who love movies.
            </p>
            <div className="mt-6">
              <span className="text-4xl font-bold">$20</span>
              <span className="text-gray-600 dark:text-gray-400">/mo</span>
            </div>
            <ul className="mt-6 space-y-3 text-gray-600 dark:text-gray-400">
              <li>Access to all movies</li>
              <li>4K Ultra HD</li>
              <li>Watch on 6 devices</li>
              <li>Ad-free experience</li>
              <li>Priority customer support</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
