import { Truck, Users, BookOpen, Zap, DollarSign, Shield, ArrowRight } from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: <Truck size={40} />,
      title: "Fast Delivery",
      description: "Express delivery within 24-48 hours to your doorstep with real-time tracking",
    },
    {
      icon: <Users size={40} />,
      title: "Direct from Farmers",
      description: "Connect directly with verified farmers, eliminating middlemen for better prices",
    },
    {
      icon: <BookOpen size={40} />,
      title: "Farming Guide",
      description: "Get expert advice and tips on agriculture, pest management, and crop planning",
    },
    {
      icon: <Zap size={40} />,
      title: "Quick Orders",
      description: "Simple and fast ordering process with multiple payment options",
    },
    {
      icon: <DollarSign size={40} />,
      title: "Fair Pricing",
      description: "Competitive prices with no hidden charges - what you see is what you pay",
    },
    {
      icon: <Shield size={40} />,
      title: "Quality Guarantee",
      description: "All products verified for quality and freshness with money-back guarantee",
    },
  ];

  const processSteps = [
    {
      number: "1",
      title: "Browse Products",
      description: "Explore our wide range of fresh agricultural products",
    },
    {
      number: "2",
      title: "Add to Cart",
      description: "Select quantities and add items to your shopping cart",
    },
    {
      number: "3",
      title: "Checkout",
      description: "Secure payment with multiple payment options",
    },
    {
      number: "4",
      title: "Delivery",
      description: "Get fresh products delivered to your door within 24-48 hours",
    },
  ];

  return (
    <div className="bg-white">
      {/* Header */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-20 px-4 relative overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-teal-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">Our Services</h1>
          <p className="text-xl text-slate-300 font-light">
            Comprehensive support for farmers and buyers on the agricultural journey
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-slate-900 mb-16">What We Offer</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white border border-slate-200 p-8 rounded-2xl hover:shadow-xl hover:scale-105 transition-all duration-300 hover:-translate-y-2 text-center"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="text-teal-600 mb-4 flex justify-center">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-semibold mb-3 text-slate-900">{service.title}</h3>
                <p className="text-slate-600 font-light">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-slate-900 mb-16">How It Works</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {processSteps.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-gradient-to-br from-teal-50 to-cyan-50 p-8 rounded-xl text-center h-full border border-teal-200 hover:shadow-lg transition-shadow duration-300">
                  <div className="w-14 h-14 bg-gradient-to-br from-teal-500 to-cyan-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold shadow-lg">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-slate-900">{step.title}</h3>
                  <p className="text-slate-600 font-light text-sm">{step.description}</p>
                </div>

                {/* Arrow between steps */}
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:flex absolute right-0 top-1/4 -mr-4 text-teal-400">
                    <ArrowRight size={24} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-slate-900 mb-12">Why Choose Bharat Mandi?</h2>

          <div className="space-y-6">
            <div className="flex gap-4 group hover:translate-x-2 transition-transform duration-300">
              <div className="w-8 h-8 bg-gradient-to-br from-teal-400 to-cyan-400 rounded-full flex items-center justify-center flex-shrink-0 mt-1 shadow-md">
                <span className="text-white text-sm font-bold">✓</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-slate-900">
                  Direct Farmer Connection
                </h3>
                <p className="text-slate-600 font-light">
                  Buy directly from verified farmers, cutting out middlemen and ensuring fair prices for both parties.
                </p>
              </div>
            </div>

            <div className="flex gap-4 group hover:translate-x-2 transition-transform duration-300">
              <div className="w-8 h-8 bg-gradient-to-br from-teal-400 to-cyan-400 rounded-full flex items-center justify-center flex-shrink-0 mt-1 shadow-md">
                <span className="text-white text-sm font-bold">✓</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-slate-900">
                  Fresh Produce Guarantee
                </h3>
                <p className="text-slate-600 font-light">
                  All products come directly from farms and are quality-checked to ensure freshness.
                </p>
              </div>
            </div>

            <div className="flex gap-4 group hover:translate-x-2 transition-transform duration-300">
              <div className="w-8 h-8 bg-gradient-to-br from-teal-400 to-cyan-400 rounded-full flex items-center justify-center flex-shrink-0 mt-1 shadow-md">
                <span className="text-white text-sm font-bold">✓</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-slate-900">
                  Transparent Pricing
                </h3>
                <p className="text-slate-600 font-light">
                  See exactly what you're paying for with no hidden charges or surprise fees.
                </p>
              </div>
            </div>

            <div className="flex gap-4 group hover:translate-x-2 transition-transform duration-300">
              <div className="w-8 h-8 bg-gradient-to-br from-teal-400 to-cyan-400 rounded-full flex items-center justify-center flex-shrink-0 mt-1 shadow-md">
                <span className="text-white text-sm font-bold">✓</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-slate-900">
                  Expert Support
                </h3>
                <p className="text-slate-600 font-light">
                  Get guidance from agricultural experts on farming practices and product selection.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-lg mb-8 font-light">
            Join thousands of farmers and buyers already using Bharat Mandi
          </p>
          <button className="bg-white text-teal-600 px-8 py-3 rounded-lg font-semibold hover:bg-slate-100 transition-all duration-300 hover:scale-105 shadow-lg">
            Explore Products
          </button>
        </div>
      </section>
    </div>
  );
};

export default Services;
