import React from 'react';
import { Users, Trophy, MapPin, Linkedin, GraduationCap, MapPinIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import aayush from '../assets/aayush.jpg';
import parichit from '../assets/parichit.jpg';

const AboutUs = () => {
  const stats = [
    { icon: <Users className="w-8 h-8 text-emerald-600" />, value: "1000+", label: "Active Players" },
    { icon: <Trophy className="w-8 h-8 text-emerald-600" />, value: "5000+", label: "Bookings" },
    { icon: <MapPin className="w-8 h-8 text-emerald-600" />, value: "50+", label: "Venues" }
  ];

  const teamMembers = [
    {
      name: "Ayush Dahal",
      role: "Founder & CEO",
      image: aayush,
      college: "Computer Science, KU",
      address: "Banepa, Nepal",
      linkedin: "linkedin.com/in/aayush-dahal-a80ab9279"
    },
    {
      name: "Swoham Kayastha",
      role: "Technical Lead",
      image: "/api/placeholder/400/400",
      college: "Computer Science, KU",
      address: "Banepa, Nepal",
      linkedin: "linkedin.com/in/swohamkayastha/"
    },
    {
        name: "Roshish Sainju",
        role: "Lead Developer",
        image: "/api/placeholder/400/400",
        college: "Computer Science, KU",
        address: "Bhaktapur, Nepal",
        linkedin: "linkedin.com/in/roshis-sainju-a74877328/"
      },
    {
        name: "Parichit Giri",
        role: "Lead Engineer",
        image: parichit ,
        college: "Computer Science, KU",
        address: "Kathmandu, Nepal",
        linkedin: "linkedin.com/in/parichit-giri-467218343/"
    },
    {
      name: "Elvis Vaidhya",
      role: "Lead Designer",
      image: "/api/placeholder/400/400",
      college: "Computer Science, KU",
      address: "Banepa, Nepal",
      linkedin: "linkedin.com/in/"
    }
  ];

  const features = {
    players: [
      "Easy online booking system",
      "Real-time venue availability",
      "Detailed venue information",
      "Secure payment options",
      "Mobile-friendly interface",
      "Rating and review system"
    ],
    owners: [
      "Efficient venue management",
      "Increased visibility",
      "Booking analytics",
      "Automated scheduling",
      "Revenue tracking",
      "Customer insights"
    ]
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-gradient-to-b from-green-50 to-white">
      {/* Main container */}
      <div className="w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="w-full text-center mb-16">
          <div className="w-full bg-gradient-to-r from-green-900 to-gray-900 text-white rounded-3xl p-8 sm:p-12 lg:p-16 shadow-xl">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              Revolutionizing Futsal in Nepal
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl max-w-3xl mx-auto text-emerald-50">
              Connecting players with the best futsal venues across Nepal through seamless digital booking
            </p>
          </div>
        </div>

        {/* Mission Section */}
        <Card className="w-full mb-16 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardContent className="p-8 sm:p-10 lg:p-12 bg-gradient-to-br from-white to-emerald-50">
            <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-emerald-800">Our Mission</h2>
            <p className="text-gray-700 text-lg sm:text-xl leading-relaxed">
              To make futsal accessible to everyone in Nepal by providing a hassle-free booking platform
              that connects players with quality venues while helping venue owners maximize their potential.
            </p>
          </CardContent>
        </Card>

        {/* Stats Section */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {stats.map((stat, index) => (
            <Card key={index} className="transform hover:-translate-y-1 transition-all duration-300">
              <CardContent className="p-8 text-center bg-gradient-to-br from-white to-emerald-50">
                <div className="flex justify-center mb-4">{stat.icon}</div>
                <div className="text-3xl lg:text-4xl font-bold mb-2 text-emerald-800">{stat.value}</div>
                <div className="text-emerald-600 text-lg">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Why Choose Us Section */}
        <div className="w-full mb-16">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-8 text-center text-emerald-800">
            Why Choose Us
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {/* For Players */}
            <Card className="shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8 bg-gradient-to-br from-white to-emerald-50">
                <h3 className="text-xl sm:text-2xl font-semibold mb-6 text-emerald-700">For Players</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {features.players.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* For Venue Owners */}
            <Card className="shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8 bg-gradient-to-br from-white to-emerald-50">
                <h3 className="text-xl sm:text-2xl font-semibold mb-6 text-emerald-700">For Venue Owners</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {features.owners.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Team Section */}
        <div className="w-full pb-8 flez flex-col justify-center items-center">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-8 text-center text-green-800">
            Our Team
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6 sm:p-8 text-center bg-gradient-to-br from-white to-emerald-50">
                  <div className="relative mb-6">
                    <div className="w-32 h-32 sm:w-40 sm:h-40 mx-auto rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 p-1">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full rounded-full object-cover"
                      />
                    </div>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-semibold mb-2 text-emerald-800">{member.name}</h3>
                  <p className="text-emerald-600 text-lg font-medium mb-4">{member.role}</p>
                  <div className="space-y-3">
                    <div className="flex items-center justify-center gap-2">
                      <GraduationCap className="w-5 h-5" />
                      <span className="text-gray-600">{member.college}</span>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <MapPinIcon className="w-5 h-5" />
                      <span className="text-gray-600">{member.address}</span>
                    </div>
                    <a 
                      href={`https://${member.linkedin}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 text-emerald-600 hover:text-emerald-700 transition-colors"
                    >
                      <Linkedin className="w-5 h-5" />
                      <span>Connect</span>
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;