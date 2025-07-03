
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import { supabase } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";

const Index = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      setLoading(false);
    };

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    getInitialSession();

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-secondary/30 flex items-center justify-center relative overflow-hidden">
        <div className="text-center relative z-10 fade-in-up">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-card/80 backdrop-blur-md border border-border rounded-2xl p-6 medical-pulse shadow-2xl">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary/30 border-t-primary mx-auto"></div>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">LifeLink</h2>
          <p className="text-muted-foreground font-medium">Loading your experience...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {user && (
        <div className="bg-gradient-to-r from-accent/10 to-accent/5 border-l-4 border-accent p-6 mx-4 rounded-r-xl shadow-lg backdrop-blur-sm fade-in-up">
          <div className="flex items-center">
            <div className="bg-accent/20 rounded-full p-2 mr-4">
              <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center">
                <span className="text-accent-foreground text-sm font-bold">✓</span>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-accent-foreground">Welcome back!</h3>
              <p className="text-sm text-accent-foreground/80">
                {user.email} - You are now signed in to LifeLink.
              </p>
            </div>
          </div>
        </div>
      )}
      <HeroSection />
      <FeaturesSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
