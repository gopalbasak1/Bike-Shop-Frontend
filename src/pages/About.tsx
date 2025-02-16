import React from "react";

const AboutPage = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">
        About Our Bike Shop
      </h1>

      <p className="text-lg text-gray-700 text-center mb-6">
        Welcome to <span className="font-semibold">Bike Shop</span>, your
        ultimate destination for top-quality bicycles and accessories. We are
        passionate about cycling and committed to providing the best products
        and services to riders of all levels.
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="p-4 bg-gray-100 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">🚴 Our Mission</h2>
          <p className="text-gray-600">
            Our mission is to make cycling accessible and enjoyable for
            everyone. We aim to provide high-quality bikes, expert service, and
            a great shopping experience.
          </p>
        </div>

        <div className="p-4 bg-gray-100 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">🔧 Our Services</h2>
          <p className="text-gray-600">
            We offer a wide range of services, including bike sales, repairs,
            custom builds, and expert advice. Our team is here to help you find
            the perfect ride!
          </p>
        </div>

        <div className="p-4 bg-gray-100 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">🌎 Sustainability</h2>
          <p className="text-gray-600">
            We care about the environment! Our shop supports sustainable
            transportation by offering eco-friendly bikes and repair services to
            extend the life of your bicycle.
          </p>
        </div>

        <div className="p-4 bg-gray-100 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">🏆 Why Choose Us?</h2>
          <p className="text-gray-600">
            - Premium-quality bikes and accessories <br />
            - Expert customer support <br />
            - Affordable prices <br />- Hassle-free online shopping
          </p>
        </div>
      </div>

      <div className="text-center mt-8">
        <h2 className="text-xl font-semibold">📍 Visit Our Store</h2>
        <p className="text-gray-600">123 Bike Street, City Name, Country</p>
        <p className="text-gray-600">
          📞 +123 456 7890 | ✉️ support@bikeshop.com
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
