"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { useAuth } from "@/components/auth-provider";
import { useToast } from "@/hooks/use-toast";
import { Check, Crown, Star, TrendingUp, Users, Zap } from "lucide-react";

// ===== PREMIUM FEATURES DATA =====
const premiumFeatures = [
  {
    icon: <Star className="h-6 w-6 text-yellow-500" />,
    title: "Premium African Recipes",
    description:
      "Access to exclusive, chef-curated recipes from renowned African culinary experts.",
  },
  {
    icon: <TrendingUp className="h-6 w-6 text-green-500" />,
    title: "Complete 30-Day Meal Plans",
    description:
      "Fully customizable meal plans with nutritional information and shopping lists.",
  },
  {
    icon: <Users className="h-6 w-6 text-blue-500" />,
    title: "Advanced Health Tracking",
    description:
      "Detailed BMI tracking, nutritional analysis, and personalized health insights.",
  },
  {
    icon: <Zap className="h-6 w-6 text-purple-500" />,
    title: "Ad-Free Experience",
    description: "Enjoy REHMO without any interruptions or advertisements.",
  },
];

// ===== SUBSCRIPTION PLANS =====
const subscriptionPlans = [
  {
    id: "monthly",
    name: "Monthly",
    price: "2500frs",
    period: "per month",
    description: "Perfect for trying out premium features",
    features: [
      "All premium recipes",
      "Complete meal plans",
      "Health tracking",
      "Ad-free experience",
      "Priority support",
    ],
    popular: false,
  },
  {
    id: "quarterly",
    name: "Quarterly",
    price: "6000frs",
    period: "per quarter",
    description: "Save 17% with quarterly billing",
    originalPrice: "8000frs",
    features: [
      "All monthly features",
      "Seasonal recipe collections",
      "Advanced meal customization",
      "Nutrition consultations",
      "Early access to new features",
    ],
    popular: true,
  },
  {
    id: "yearly",
    name: "Yearly",
    price: "12000frs",
    period: "per year",
    description: "Best value - save 25%",
    originalPrice: "15000frs",
    features: [
      "All quarterly features",
      "Exclusive cooking masterclasses",
      "Personal recipe recommendations",
      "Premium community access",
      "Annual health report",
    ],
    popular: false,
  },
];

// ===== PREMIUM PAGE =====
export default function PremiumPage() {
  const { user, upgradeToPremium } = useAuth();
  const { toast } = useToast();
  const router = useRouter();

  // ===== HANDLE SUBSCRIPTION =====
  const handleSubscribe = (planId: string) => {
    // Simulate payment process
    toast({
      title: "Processing Payment...",
      description: "Please wait while we process your subscription.",
    });

    // Simulate payment delay
    setTimeout(() => {
      upgradeToPremium();
      toast({
        title: "Welcome to Premium!",
        description:
          "Your subscription has been activated. Enjoy all premium features!",
      });
      router.push("/");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* ===== HEADER SECTION ===== */}
      <div className="relative food-gradient">
        <div className="absolute inset-0 bg-black/20" />
        <div className="container relative z-10 py-16 md:py-24">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <Crown className="h-8 w-8 text-yellow-400" />
              <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
                Go Premium
              </h1>
            </div>
            <p className="text-lg text-white/90 max-w-2xl">
              Unlock the full potential of REHMO with exclusive recipes,
              advanced features, and personalized experiences.
            </p>
          </div>
        </div>
      </div>

      {/* ===== PREMIUM FEATURES SECTION ===== */}
      <section className="py-16 bg-background">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Premium Features</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover what makes REHMO Premium the ultimate African cuisine
              experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {premiumFeatures.map((feature, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="flex justify-center mb-4">{feature.icon}</div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SUBSCRIPTION PLANS SECTION ===== */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Choose Your Plan</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Select the perfect subscription plan that fits your culinary
              journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {subscriptionPlans.map((plan) => (
              <Card
                key={plan.id}
                className={`relative ${
                  plan.popular ? "border-orange-500 shadow-lg scale-105" : ""
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-orange-500 text-white px-4 py-1">
                      Most Popular
                    </Badge>
                  </div>
                )}

                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                  <div className="mt-4">
                    <div className="flex items-center justify-center space-x-2">
                      <span className="text-4xl font-bold">{plan.price}</span>
                      <span className="text-muted-foreground">
                        {plan.period}
                      </span>
                    </div>
                    {plan.originalPrice && (
                      <p className="text-sm text-muted-foreground line-through">
                        {plan.originalPrice}
                      </p>
                    )}
                  </div>
                </CardHeader>

                <CardContent>
                  <ul className="space-y-3">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>

                <CardFooter>
                  <Button
                    className={`w-full ${
                      plan.popular
                        ? "bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                        : ""
                    }`}
                    variant={plan.popular ? "default" : "outline"}
                    onClick={() => handleSubscribe(plan.id)}
                    disabled={user?.isPremium}
                  >
                    {user?.isPremium ? "Already Premium" : "Subscribe Now"}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS SECTION ===== */}
      <section className="py-16 bg-background">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What Premium Users Say</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card>
              <CardContent className="pt-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-current text-yellow-500"
                    />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  "The premium meal plans have completely transformed how I
                  approach African cooking. The nutritional insights are
                  incredibly helpful!"
                </p>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    A
                  </div>
                  <div>
                    <p className="font-medium">Amara Okafor</p>
                    <p className="text-sm text-muted-foreground">
                      Premium Member
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-current text-yellow-500"
                    />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  "The exclusive recipes and ad-free experience make REHMO
                  Premium worth every penny. Highly recommended!"
                </p>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    K
                  </div>
                  <div>
                    <p className="font-medium">Kwame Asante</p>
                    <p className="text-sm text-muted-foreground">
                      Premium Member
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
