import React from "react";

interface Feature {
  icon: JSX.Element;
  title: string;
  description: string;
}

const features: Feature[] = [
    {
      icon: (
        <img src="/images/navigation.svg" alt="Free delivery" className="w-10 h-10" />
      ),
      title: "Free Delivery All Year Long",
      description:
        "Get your prescriptions and health essentials delivered to your doorstep, absolutely free, all year round. Convenience and care at no extra cost.",
    },
    {
      icon: (
        <img src="/images/support.svg" alt="Customer Support" className="w-10 h-10" />
      ),
      title: "24/7 Customer Support",
      description:
        "Our dedicated support team is available round the clock to assist you with your healthcare needs and answer your queries.",
    },
    {
      icon: (
        <img src="/images/cart.svg" alt="Fast Shopping Cart" className="w-10 h-10" />
      ),
      title: "Quick & Easy Checkout",
      description:
        "Our shopping cart ensures a smooth and fast checkout process so you can get your medicines and health products without any hassle.",
    },
    {
      icon: (
        <img src="/images/delivery.svg" alt="Same Day Delivery" className="w-10 h-10" />
      ),
      title: "Same-Day Delivery",
      description:
        "For your convenience, we offer same-day delivery for select products, ensuring you get your health essentials when you need them most.",
    },
  ];
  

const FeaturesSection: React.FC = () => {
  return (
    <div className="bg-gray-100 py-8 px-4 mt-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, index) => (
          <div key={index} className="text-center">
            <div className="flex justify-center items-center mb-4">
              {feature.icon}
            </div>
            <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturesSection;
