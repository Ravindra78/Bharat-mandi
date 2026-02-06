import { Target, Users, Heart, Eye, Sparkles } from "lucide-react";

const About = () => {
  const team = [
    { id: 1, name: "Rajesh Kumar", role: "Co-founder & CEO", imageUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=400&fit=crop" },
    { id: 2, name: "Priya Singh", role: "Co-founder & CTO", imageUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop" },
    { id: 3, name: "Amit Patel", role: "Head of Operations", imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop" },
    { id: 4, name: "Neha Sharma", role: "Farmer Relations", imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop" },
  ];

  const stats = [
    { number: "10K+", label: "Farmers Connected" },
    { number: "50K+", label: "Happy Customers" },
    { number: "500+", label: "Products Available" },
    { number: "2L+", label: "Orders Delivered" },
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-20 px-4 relative overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-teal-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">About Bharat Mandi</h1>
          <p className="text-xl text-slate-300 font-light">
            Revolutionizing agriculture through direct farmer-to-buyer connections
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-8 text-center text-slate-900">Our Story</h2>
          <p className="text-lg text-slate-700 mb-6 leading-relaxed font-light">
            Bharat Mandi was born from a simple yet powerful idea: farmers deserve fair prices, and
            consumers deserve fresh produce. Traditional agricultural supply chains are fraught with
            middlemen who eat into profits and compromise quality.
          </p>
          <p className="text-lg text-slate-700 mb-6 leading-relaxed font-light">
            In 2023, our founder Rajesh Kumar, a tech enthusiast with deep roots in farming, decided
            to change this. He built Bharat Mandi as a platform that eliminates middlemen and
            creates a direct marketplace between farmers and buyers.
          </p>
          <p className="text-lg text-slate-700 leading-relaxed font-light">
            Today, we're proud to connect over 10,000 farmers with 50,000+ customers, delivering
            fresh, organic products with fair pricing and transparency at every step.
          </p>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-20 px-4 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Mission */}
            <div className="bg-white border border-slate-200 p-8 rounded-2xl shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 hover:-translate-y-2 text-center">
              <div className="inline-block bg-teal-100 p-4 rounded-full mb-4">
                <Target className="text-teal-600" size={40} />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-slate-900">Our Mission</h3>
              <p className="text-slate-600 font-light">
                To empower farmers with fair market access and provide consumers with fresh,
                quality agricultural products at transparent prices.
              </p>
            </div>

            {/* Vision */}
            <div className="bg-white border border-slate-200 p-8 rounded-2xl shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 hover:-translate-y-2 text-center" style={{ transitionDelay: "100ms" }}>
              <div className="inline-block bg-cyan-100 p-4 rounded-full mb-4">
                <Eye className="text-cyan-600" size={40} />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-slate-900">Our Vision</h3>
              <p className="text-slate-600 font-light">
                To become India's leading platform connecting farmers directly with consumers,
                transforming agriculture through technology and trust.
              </p>
            </div>

            {/* Values */}
            <div className="bg-white border border-slate-200 p-8 rounded-2xl shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 hover:-translate-y-2 text-center" style={{ transitionDelay: "200ms" }}>
              <div className="inline-block bg-red-100 p-4 rounded-full mb-4">
                <Heart className="text-red-600" size={40} />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-slate-900">Our Values</h3>
              <p className="text-slate-600 font-light">
                Transparency, integrity, sustainability, and a deep commitment to supporting
                Indian agriculture and rural communities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-slate-900 mb-16">Our Impact</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="group">
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-teal-500 to-cyan-500 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
                  {stat.number}
                </div>
                <p className="text-slate-600 font-light">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 px-4 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-slate-900 mb-16">Meet Our Team</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={member.id} className="bg-white border border-slate-200 rounded-2xl shadow-md p-8 text-center hover:shadow-lg hover:scale-105 transition-all duration-300 hover:-translate-y-2" style={{ transitionDelay: `${index * 100}ms` }}>
                <div className="w-24 h-24 rounded-full overflow-hidden mb-4 mx-auto border-4 border-teal-200">
                  <img src={member.imageUrl} alt={member.name} className="w-full h-full object-cover" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-slate-900">{member.name}</h3>
                <p className="text-teal-600 font-medium">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why We're Different */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-slate-900 mb-12">Why We're Different</h2>

          <div className="space-y-6">
            <div className="flex gap-4 group hover:translate-x-2 transition-transform duration-300">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-gradient-to-br from-teal-500 to-cyan-500 text-white shadow-md">
                  <Target size={24} />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-slate-900">Farmer-First Approach</h3>
                <p className="text-slate-600 font-light">
                  We prioritize farmer welfare with fair pricing, direct market access, and support
                  services that help them thrive.
                </p>
              </div>
            </div>

            <div className="flex gap-4 group hover:translate-x-2 transition-transform duration-300">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-gradient-to-br from-teal-500 to-cyan-500 text-white shadow-md">
                  <Users size={24} />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-slate-900">Community Building</h3>
                <p className="text-slate-600 font-light">
                  We're not just a platform - we're building a community of farmers and consumers
                  who trust and support each other.
                </p>
              </div>
            </div>

            <div className="flex gap-4 group hover:translate-x-2 transition-transform duration-300">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-gradient-to-br from-teal-500 to-cyan-500 text-white shadow-md">
                  <Heart size={24} />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-slate-900">Sustainability</h3>
                <p className="text-slate-600 font-light">
                  We promote organic farming practices and sustainable agriculture to ensure a
                  healthier future for our communities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Join Our Mission</h2>
          <p className="text-lg mb-8 font-light">
            Be part of a movement transforming Indian agriculture
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-teal-600 px-8 py-3 rounded-lg font-semibold hover:bg-slate-100 transition-all duration-300 hover:scale-105 shadow-lg">
              Shop with Us
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-teal-600 transition-all duration-300 hover:scale-105">
              Become a Farmer Partner
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
