import {
  TestTube,
  MapPin,
  TrendingUp,
  Check,
  AlertCircle,
  Leaf,
  Heart,
  Target,
  Clock,
  Users,
} from "lucide-react";
import { useAuth } from "../hooks/useAuth";

const SoilTesting = () => {
  const { user, isAuthenticated, loading } = useAuth();
  const isPremium = Boolean(
    user?.isPremium || user?.premium || user?.role === "premium",
  );

  const handleUpgrade = () => {
    // Redirect to upgrade page — adjust route as needed
    window.location.href = "/auth/upgrade";
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }
  const tests = [
    {
      id: 1,
      name: "Fertility Test",
      price: "₹499",
      duration: "3-5 Days",
      parameters: "NPK, Micronutrients, pH, EC",
      imageUrl:
        "https://unicropbiochem.com/assets/images/blogs/1747285038112webp.webp",
      popular: true,
    },
    {
      id: 2,
      name: "Micronutrient Test",
      price: "₹599",
      duration: "4-6 Days",
      parameters: "Zn, Fe, Cu, Mn, B",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9jL54LUMak94IMS5nG5Ou_s4Lfm5qECOKjQ&s",
      popular: false,
    },
    {
      id: 3,
      name: "Pesticide Residue",
      price: "₹1,299",
      duration: "7 Days",
      parameters: "40+ Pesticide Analysis",
      imageUrl:
        "https://ars.els-cdn.com/content/image/1-s2.0-S0269749123008941-ga1.jpg",
      popular: false,
    },
    {
      id: 4,
      name: "Complete Soil Profile",
      price: "₹2,499",
      duration: "10 Days",
      parameters: "All tests + Heavy Metals",
      imageUrl:
        "https://media.istockphoto.com/id/1437631528/vector/soil-layer-infographics-earth-subsoil-texture.jpg?s=612x612&w=0&k=20&c=Ux5CGXubAE72Uieog0_3vNMoNzOA0VmrlYqiK5HWhVo=",
      popular: true,
    },
    {
      id: 5,
      name: "Organic Matter Test",
      price: "₹399",
      duration: "2-3 Days",
      parameters: "Carbon, Nitrogen, Humus",
      imageUrl:
        "https://www.labsertchemical.com/image/cache/catalog/labsert/Soil-Comparison-Test-350x350.png",
      popular: false,
    },
    {
      id: 6,
      name: "Contaminants Check",
      price: "₹1,499",
      duration: "8 Days",
      parameters: "Heavy Metals, Toxins",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXzEkeWrYWhX8BMvV8r0sBbLanRNyZ_3V-5g&s",
      popular: false,
    },
  ];

  const benefits = [
    {
      icon: TrendingUp,
      title: "Increase Yield",
      desc: "Optimize fertilizer use for 15-25% yield improvement",
    },
    {
      icon: Heart,
      title: "Reduce Costs",
      desc: "Save 20-30% on unnecessary fertilizer spending",
    },
    {
      icon: Leaf,
      title: "Sustainable Farming",
      desc: "Right nutrients for environmental protection",
    },
    {
      icon: Target,
      title: "Targeted Solutions",
      desc: "Customized recommendations for your crops",
    },
    {
      icon: Clock,
      title: "Quick Results",
      desc: "Fast turnaround time with detailed reports",
    },
    {
      icon: Users,
      title: "Expert Guidance",
      desc: "Free consultation from agricultural scientists",
    },
  ];

  const samples = [
    {
      id: 1,
      name: "Wheat Field Test",
      location: "Punjab",
      nitrogen: "24 mg/kg",
      phosphorus: "18 mg/kg",
      potassium: "156 mg/kg",
      recommendation: "Increase K fertilizer by 20kg/acre",
      status: "Completed",
    },
    {
      id: 2,
      name: "Sugarcane Plot",
      location: "Maharashtra",
      nitrogen: "32 mg/kg",
      phosphorus: "12 mg/kg",
      potassium: "198 mg/kg",
      recommendation: "Reduce N, maintain P & K levels",
      status: "Completed",
    },
    {
      id: 3,
      name: "Cotton Farm",
      location: "Gujarat",
      nitrogen: "18 mg/kg",
      phosphorus: "14 mg/kg",
      potassium: "128 mg/kg",
      recommendation: "Add 30kg N, 15kg P per acre",
      status: "Pending",
    },
  ];

  const faq = [
    {
      q: "How to collect soil sample?",
      a: "Take samples from 5-7 spots in your field at 6-inch depth. Mix them together and send 500g.",
    },
    {
      q: "When to do soil test?",
      a: "Best done 2-3 months before sowing season for proper planning.",
    },
    {
      q: "What if test shows deficiency?",
      a: "Our experts provide customized fertilizer recommendations based on your crop.",
    },
    {
      q: "Is testing cost-effective?",
      a: "Yes! Right fertilizer use saves 20-30% costs and increases yield by 15-25%.",
    },
  ];

  return (
    <div className="bg-white min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-2xl p-12 mb-16">
          <h1 className="text-5xl font-bold mb-4">Soil Testing Services</h1>
          <p className="text-xl font-light">
            Professional soil analysis to maximize crop yield and minimize
            fertilizer costs.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border-2 border-green-200 text-center hover:shadow-lg transition-all">
            <p className="text-4xl font-bold text-green-600">45,000+</p>
            <p className="text-slate-700 font-light mt-2">Tests Completed</p>
          </div>
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-8 border-2 border-emerald-200 text-center hover:shadow-lg transition-all">
            <p className="text-4xl font-bold text-emerald-600">98%</p>
            <p className="text-slate-700 font-light mt-2">
              Farmer Satisfaction
            </p>
          </div>
          <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl p-8 border-2 border-teal-200 text-center hover:shadow-lg transition-all">
            <p className="text-4xl font-bold text-teal-600">3-10</p>
            <p className="text-slate-700 font-light mt-2">
              Days Report Delivery
            </p>
          </div>
          <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl p-8 border-2 border-cyan-200 text-center hover:shadow-lg transition-all">
            <p className="text-4xl font-bold text-cyan-600">₹399+</p>
            <p className="text-slate-700 font-light mt-2">Affordable Testing</p>
          </div>
        </div>

        {/* Test Packages */}
        <section className="mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-8">
            Test Packages Available
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tests.map((test) => (
              <div
                key={test.id}
                className={`rounded-2xl overflow-hidden border-2 transition-all hover:scale-105 ${test.popular ? "border-green-400 shadow-lg ring-2 ring-green-200" : "border-slate-200"}`}
              >
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 h-20 overflow-hidden">
                  <img
                    src={test.imageUrl}
                    alt={test.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 bg-white">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-slate-900">
                      {test.name}
                    </h3>
                    {test.popular && (
                      <span className="text-xs font-bold bg-green-500 text-white px-3 py-1 rounded-full whitespace-nowrap ml-2">
                        Most Popular
                      </span>
                    )}
                  </div>
                  <p className="text-3xl font-bold text-green-600 mb-4">
                    {test.price}
                  </p>
                  <div className="bg-slate-50 rounded-lg p-4 mb-4 space-y-2 text-sm">
                    <p>
                      <strong>Duration:</strong> {test.duration}
                    </p>
                    <p>
                      <strong>Parameters:</strong> {test.parameters}
                    </p>
                  </div>
                  {parseInt(String(test.price).replace(/[^0-9]/g, "")) > 1000 &&
                  !isPremium ? (
                    <div className="flex flex-col gap-3">
                      <div className="p-4 bg-yellow-50 rounded-md border border-yellow-200 text-yellow-900 text-sm">
                        Premium Feature — Upgrade to access this test and
                        advanced reports.
                      </div>
                      <button
                        onClick={handleUpgrade}
                        className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-lg font-semibold transition-all"
                      >
                        Upgrade to Order
                      </button>
                    </div>
                  ) : (
                    <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold transition-all">
                      Order Test
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Benefits */}
        <section className="mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-8">
            Why Test Your Soil?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border-2 border-green-200 hover:shadow-lg transition-all"
              >
                <div className="inline-block bg-green-100 p-3 rounded-full mb-4">
                  <benefit.icon className="text-green-600" size={32} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {benefit.title}
                </h3>
                <p className="text-slate-600 font-light">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Sample Reports */}
        <section className="mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-8">
            Recent Test Results & Recommendations
          </h2>
          <div className="space-y-4">
            {samples.map((sample) => (
              <div
                key={sample.id}
                className="bg-white rounded-2xl border-2 border-slate-200 p-6 hover:border-green-400 hover:shadow-lg transition-all"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">
                      {sample.name}
                    </h3>
                    <p className="text-sm text-slate-600 flex items-center gap-1">
                      <MapPin size={16} /> {sample.location}
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-4 text-center">
                    <p className="text-sm text-slate-600 font-light">
                      NPK Levels
                    </p>
                    <p className="text-xs">
                      <strong>N:</strong> {sample.nitrogen} |{" "}
                      <strong>P:</strong> {sample.phosphorus} |{" "}
                      <strong>K:</strong> {sample.potassium}
                    </p>
                  </div>
                  <div className="text-right">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${sample.status === "Completed" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}
                    >
                      {sample.status}
                    </span>
                  </div>
                </div>
                <div className="bg-slate-50 rounded-lg p-4 border-l-4 border-green-500">
                  <p className="text-sm font-semibold text-slate-900 mb-1">
                    Expert Recommendation:
                  </p>
                  {isPremium ? (
                    <p className="text-sm text-slate-700 font-light">
                      {sample.recommendation}
                    </p>
                  ) : (
                    <div className="flex items-center justify-between gap-4">
                      <p className="text-sm text-slate-700 font-light opacity-60">
                        Upgrade to Premium to view full expert recommendations
                        and tailored action plans.
                      </p>
                      <button
                        onClick={handleUpgrade}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-md text-sm font-semibold"
                      >
                        Upgrade
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* How to Order */}
        <section className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-12 border-2 border-green-200 mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-12">
            How to Order Your Test
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {[
              {
                step: "1",
                title: "Choose Test",
                desc: "Select your soil test package",
              },
              {
                step: "2",
                title: "Collect Sample",
                desc: "Take soil from 5-7 spots",
              },
              { step: "3", title: "Send Sample", desc: "Ship to nearest lab" },
              {
                step: "4",
                title: "Lab Analysis",
                desc: "Scientists test your soil",
              },
              {
                step: "5",
                title: "Get Report",
                desc: "Recommendations delivered",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl p-4 text-center border-2 border-green-200"
              >
                <div className="text-4xl font-bold text-green-600 mb-2">
                  {item.step}
                </div>
                <h3 className="text-sm font-bold text-slate-900 mb-1">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-600 font-light">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section>
          <h2 className="text-4xl font-bold text-slate-900 mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faq.map((item, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border-2 border-green-200"
              >
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  {item.q}
                </h3>
                <p className="text-slate-700 font-light ml-0">{item.a}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default SoilTesting;
