
import { Target,CalendarDays,Bell,LineChart } from "lucide-react";
import { useNavigate } from "react-router-dom";
const steps = [
  {
    icon: <Target className="w-8 h-8 text-primary" />,
    title: "Set your goal",
    description: "Create habits you want to build and stay focused every day.",
  },
  {
    icon: <CalendarDays className="w-8 h-8 text-primary" />,
    title: "Track your day",
    description: "Mark your daily progress and stay accountable.",
  },
  {
    icon: <Bell className="w-8 h-8 text-primary" />,
    title: "Get reminders",
    description: "Never miss a habit with smart notifications.",
  },
  {
    icon: <LineChart className="w-8 h-8 text-primary" />,
    title: "See your progress",
    description: "Visualize your growth with charts and streaks.",
  },
];
export const HowItWorks = () => {
    const navigate=useNavigate();
  return (
    <section id="how-it-works" className="py-20 relative overflow-hidden rounded-lg">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 via-transparent to-blue-500/5"></div>
      <div className="absolute top-1/2 left-1/4 w-72 h-72 bg-teal-400/10 rounded-full blur-3xl transform -translate-y-1/2"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-2 bg-teal-500/10 rounded-full mb-4">
            <span className="text-teal-400 text-sm font-medium px-3 py-1 ">How It Works</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-gray-100 to-teal-400 bg-clip-text text-transparent">
            Better Habits
          </h2>
          <p className=" text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed ">
            Develop life-changing habits in just four simple steps
          </p>
          
        </div>

        {/* Steps Flow */}
        <div className="relative">
          {/* Connection Lines */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-teal-400/30 to-transparent transform -translate-y-1/2"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
            {steps.map((step, idx) => (
              <div key={idx} className="relative group">
                {/* Step Number */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-teal-400 to-blue-400 rounded-full flex items-center justify-center text-sm font-bold text-black z-10">
                  {idx + 1}
                </div>
                
                {/* Main Content */}
                <div className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-3xl p-8 h-full transition-all duration-500 hover:bg-gray-800/80 hover:border-teal-400/50 hover:shadow-2xl hover:shadow-teal-400/10 group-hover:-translate-y-2">
                  {/* Icon Container */}
                  <div className="relative mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-teal-400/20 to-blue-400/20 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <div className="text-2xl text-teal-400 group-hover:text-white transition-colors duration-300">
                        {step.icon}
                      </div>
                    </div>
                    {/* Glow Effect */}
                    <div className="absolute inset-0 w-16 h-16 bg-teal-400/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                  
                  {/* Text Content */}
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold text-white group-hover:text-teal-400 transition-colors duration-300">
                      {step.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                      {step.description}
                    </p>
                  </div>
                  
                  {/* Hover Accent */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-400 to-blue-400 rounded-b-3xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                </div>
                
                {/* Arrow for larger screens */}
                {idx < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-6 transform -translate-y-1/2 text-teal-400/60">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="animate-pulse">
                      <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        
        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center space-x-2 text-teal-400 bg-teal-400/10 px-6 py-3 rounded-full border border-teal-400/20">
            <span className="w-2 h-2 bg-teal-400 rounded-full animate-pulse"></span>
            <span className="text-sm font-medium">Start now and feel the change</span>
          </div>
        </div>
      </div>
    </section>
  );
};