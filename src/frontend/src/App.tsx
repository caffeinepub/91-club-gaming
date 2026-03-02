import { Badge } from "@/components/ui/badge";
import { Toaster } from "@/components/ui/sonner";
import {
  ArrowRight,
  Check,
  ChevronRight,
  Copy,
  Crown,
  DollarSign,
  ExternalLink,
  Flame,
  Gamepad2,
  Rocket,
  Shield,
  Star,
  Trophy,
  Users,
  Zap,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import {
  useGetVisitorCount,
  useIncrementVisitorCount,
} from "./hooks/useQueries";

const REGISTER_LINK =
  "https://www.aajclub.com/#/register?invitationCode=13814651728";
const INVITE_CODE = "13814651728";

// ─── Particle Canvas ──────────────────────────────────────────────────────────
function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animFrame: number;
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
      color: string;
    }> = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const colors = [
      "rgba(212,160,23,",
      "rgba(255,200,50,",
      "rgba(180,100,20,",
      "rgba(255,80,60,",
    ];

    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4 - 0.2,
        size: Math.random() * 2.5 + 0.5,
        opacity: Math.random() * 0.6 + 0.1,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(212,160,23,${0.06 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      // Draw particles
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.opacity})`;
        ctx.fill();
      }

      animFrame = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animFrame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
}

// ─── Hero Section ─────────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse 80% 60% at 50% 0%, oklch(0.18 0.06 280 / 0.6) 0%, oklch(0.08 0.015 265) 100%)",
      }}
    >
      {/* Background image */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: "url('/assets/generated/hero-bg.dim_1920x1080.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Particles */}
      <ParticleCanvas />

      {/* Decorative rings */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/10"
        style={{ width: "600px", height: "600px" }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/5"
        style={{ width: "900px", height: "900px" }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        {/* Badge */}
        <div className="animate-fade-in-up mb-6 flex justify-center">
          <Badge
            className="px-4 py-1.5 text-sm font-body border"
            style={{
              background: "oklch(0.75 0.18 60 / 0.1)",
              borderColor: "oklch(0.75 0.18 60 / 0.3)",
              color: "oklch(0.85 0.2 75)",
            }}
          >
            <Flame className="w-3.5 h-3.5 mr-1.5 inline" />
            #1 Gaming Platform — Join Millions of Winners
          </Badge>
        </div>

        {/* Logo */}
        <div className="animate-fade-in-up mb-6 flex justify-center">
          <img
            src="/assets/generated/logo-91club.dim_400x400.png"
            alt="91 Club Logo"
            className="w-24 h-24 md:w-32 md:h-32 object-contain animate-float"
          />
        </div>

        {/* Main heading */}
        <h1
          className="animate-fade-in-up-delay-1 font-heading text-6xl md:text-8xl lg:text-9xl mb-4 leading-none tracking-tight"
          style={{ letterSpacing: "-0.03em" }}
        >
          <span className="shimmer">91 CLUB</span>
        </h1>

        <p className="animate-fade-in-up-delay-2 font-heading text-2xl md:text-3xl lg:text-4xl mb-3 text-foreground/80 font-bold">
          Join the Ultimate Gaming Experience
        </p>

        <p className="animate-fade-in-up-delay-2 font-body text-base md:text-lg mb-10 text-foreground/50 max-w-2xl mx-auto leading-relaxed">
          Compete, win, and claim massive rewards on India's most trusted gaming
          platform. Real money. Real prizes. Real excitement.
        </p>

        {/* CTA Buttons */}
        <div className="animate-fade-in-up-delay-3 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href={REGISTER_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-heading font-bold text-lg btn-gold-glow animate-pulse-glow"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.75 0.18 60), oklch(0.65 0.16 55))",
              color: "oklch(0.1 0.02 60)",
            }}
          >
            <Crown className="w-5 h-5" />
            Register Now — It's Free
            <ArrowRight className="w-5 h-5" />
          </a>
          <a
            href="#invite-code"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-body text-base border transition-all hover:bg-accent"
            style={{
              borderColor: "oklch(0.75 0.18 60 / 0.3)",
              color: "oklch(0.75 0.18 60)",
            }}
          >
            Get Invite Code
            <ChevronRight className="w-4 h-4" />
          </a>
        </div>

        {/* Stats row */}
        <div className="animate-fade-in-up-delay-3 mt-14 flex flex-wrap justify-center gap-8 md:gap-12">
          {[
            { value: "10M+", label: "Active Players" },
            { value: "₹50 Cr+", label: "Winnings Paid" },
            { value: "100%", label: "Secure & Trusted" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div
                className="font-heading text-2xl md:text-3xl font-bold"
                style={{ color: "oklch(0.75 0.18 60)" }}
              >
                {stat.value}
              </div>
              <div className="font-body text-sm text-foreground/50 mt-0.5">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-foreground/30">
        <span className="font-body text-xs tracking-widest uppercase">
          Scroll
        </span>
        <div className="w-px h-8 bg-gradient-to-b from-foreground/30 to-transparent" />
      </div>
    </section>
  );
}

// ─── Invite Code Section ───────────────────────────────────────────────────────
function InviteCodeSection() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(INVITE_CODE);
      setCopied(true);
      toast.success("Invite code copied!", {
        description: "Paste it when registering for exclusive bonuses",
      });
      setTimeout(() => setCopied(false), 3000);
    } catch {
      toast.error(`Could not copy. Code: ${INVITE_CODE}`);
    }
  };

  return (
    <section
      id="invite-code"
      className="relative py-24 overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, oklch(0.08 0.015 265) 0%, oklch(0.12 0.04 280) 50%, oklch(0.08 0.015 265) 100%)",
      }}
    >
      {/* Decorative background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl pointer-events-none"
        style={{
          width: "600px",
          height: "300px",
          background: "oklch(0.75 0.18 60 / 0.08)",
        }}
      />

      <div className="relative z-10 container max-w-3xl mx-auto px-4 text-center">
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-body mb-6 border"
          style={{
            background: "oklch(0.75 0.18 60 / 0.1)",
            borderColor: "oklch(0.75 0.18 60 / 0.25)",
            color: "oklch(0.85 0.2 75)",
          }}
        >
          <Star className="w-3.5 h-3.5 fill-current" />
          Exclusive Invitation
        </div>

        <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl mb-4 text-foreground">
          Use My{" "}
          <span style={{ color: "oklch(0.75 0.18 60)" }}>Invite Code</span>
        </h2>

        <p className="font-body text-foreground/60 mb-12 text-lg max-w-xl mx-auto">
          Enter this exclusive code when registering to unlock bonus rewards and
          start your winning journey.
        </p>

        {/* Invite Code Display */}
        <div
          className="relative mx-auto max-w-md rounded-2xl p-1 mb-8"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.75 0.18 60 / 0.4), oklch(0.75 0.18 60 / 0.1), oklch(0.75 0.18 60 / 0.4))",
          }}
        >
          <div
            className="rounded-xl px-8 py-6 flex items-center justify-between gap-4"
            style={{ background: "oklch(0.13 0.025 265)" }}
          >
            <div className="flex flex-col items-start">
              <span className="font-body text-xs tracking-widest uppercase text-foreground/40 mb-1">
                Invite Code
              </span>
              <span
                className="font-mono text-3xl md:text-4xl font-bold tracking-wider"
                style={{ color: "oklch(0.85 0.2 75)" }}
              >
                {INVITE_CODE}
              </span>
            </div>
            <button
              type="button"
              onClick={handleCopy}
              className="flex-shrink-0 flex items-center gap-2 px-5 py-3 rounded-xl font-body text-sm font-semibold transition-all duration-200 hover:scale-105 active:scale-95"
              style={{
                background: copied
                  ? "oklch(0.55 0.18 145)"
                  : "linear-gradient(135deg, oklch(0.75 0.18 60), oklch(0.65 0.16 55))",
                color: copied ? "white" : "oklch(0.1 0.02 60)",
              }}
              aria-label="Copy invite code"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  Copy
                </>
              )}
            </button>
          </div>
        </div>

        <p className="font-body text-sm text-foreground/40 mb-8">
          Enter this code when registering to get exclusive bonuses and bonus
          credits
        </p>

        <a
          href={REGISTER_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-heading font-bold text-base transition-all hover:scale-105"
          style={{
            background: "oklch(0.52 0.22 22)",
            color: "white",
            boxShadow: "0 0 20px oklch(0.52 0.22 22 / 0.4)",
          }}
        >
          <ExternalLink className="w-4 h-4" />
          Register with This Code
        </a>
      </div>
    </section>
  );
}

// ─── Features Section ─────────────────────────────────────────────────────────
const features = [
  {
    icon: Trophy,
    title: "Win Big Rewards",
    description:
      "Compete in daily tournaments and weekly championships. Top players earn massive cash prizes and exclusive bonuses.",
    accent: "oklch(0.75 0.18 60)",
    bgAccent: "oklch(0.75 0.18 60 / 0.08)",
  },
  {
    icon: Zap,
    title: "Daily Challenges",
    description:
      "New challenges every day keep the excitement fresh. Complete missions to earn bonus coins and unlock premium rewards.",
    accent: "oklch(0.52 0.22 22)",
    bgAccent: "oklch(0.52 0.22 22 / 0.08)",
  },
  {
    icon: Shield,
    title: "Trusted Platform",
    description:
      "Licensed and regulated. Over 10 million players trust 91 Club for a fair, transparent, and secure gaming experience.",
    accent: "oklch(0.6 0.2 200)",
    bgAccent: "oklch(0.6 0.2 200 / 0.08)",
  },
  {
    icon: Rocket,
    title: "Fast Payouts",
    description:
      "Withdraw your winnings instantly. No delays, no hidden fees. Money in your account within minutes.",
    accent: "oklch(0.68 0.18 145)",
    bgAccent: "oklch(0.68 0.18 145 / 0.08)",
  },
];

function FeaturesSection() {
  return (
    <section
      id="features"
      className="relative py-24"
      style={{ background: "oklch(0.08 0.015 265)" }}
    >
      <div className="container max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-body mb-6 border"
            style={{
              background: "oklch(0.75 0.18 60 / 0.08)",
              borderColor: "oklch(0.75 0.18 60 / 0.2)",
              color: "oklch(0.75 0.18 60)",
            }}
          >
            <Gamepad2 className="w-3.5 h-3.5" />
            Why Choose 91 Club
          </div>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl mb-4">
            Everything You Need to{" "}
            <span style={{ color: "oklch(0.75 0.18 60)" }}>Win</span>
          </h2>
          <p className="font-body text-foreground/50 text-lg max-w-2xl mx-auto">
            91 Club combines thrilling gameplay with unmatched rewards — built
            for players who play to win.
          </p>
        </div>

        {/* Feature cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="card-glow rounded-2xl p-8 group"
                style={{
                  background: "oklch(0.12 0.02 265)",
                }}
              >
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110"
                  style={{ background: feature.bgAccent }}
                >
                  <Icon className="w-7 h-7" style={{ color: feature.accent }} />
                </div>
                <h3
                  className="font-heading text-xl font-bold mb-3"
                  style={{ color: "oklch(0.95 0.02 80)" }}
                >
                  {feature.title}
                </h3>
                <p className="font-body text-foreground/55 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* App mockup */}
        <div className="mt-20 flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 text-center lg:text-left">
            <h3 className="font-heading text-3xl md:text-4xl mb-4">
              Play Anywhere,{" "}
              <span style={{ color: "oklch(0.75 0.18 60)" }}>Win Anytime</span>
            </h3>
            <p className="font-body text-foreground/55 text-lg mb-8 leading-relaxed">
              91 Club's mobile-optimized platform lets you play your favorite
              games and manage winnings from any device, anytime.
            </p>
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              {[
                "Color Prediction",
                "Lottery Games",
                "Mini Games",
                "Live Casino",
              ].map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-2 rounded-full font-body text-sm border"
                  style={{
                    borderColor: "oklch(0.75 0.18 60 / 0.25)",
                    color: "oklch(0.75 0.18 60)",
                    background: "oklch(0.75 0.18 60 / 0.06)",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="flex-shrink-0 w-64 md:w-72">
            <img
              src="/assets/generated/app-mockup.dim_600x800.png"
              alt="91 Club App"
              className="w-full object-contain rounded-2xl animate-float"
              style={{
                filter: "drop-shadow(0 20px 60px oklch(0.75 0.18 60 / 0.2))",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── How to Join Section ───────────────────────────────────────────────────────
const steps = [
  {
    number: "01",
    icon: ExternalLink,
    title: "Click Register",
    description:
      'Tap the "Register Now" button and you\'ll be taken directly to the 91 Club registration page.',
    action: { label: "Register Now →", href: REGISTER_LINK },
  },
  {
    number: "02",
    icon: Copy,
    title: "Enter Invite Code",
    description: `When prompted, enter the invite code: ${INVITE_CODE}. This unlocks your exclusive welcome bonus.`,
    highlight: INVITE_CODE,
  },
  {
    number: "03",
    icon: DollarSign,
    title: "Start Playing & Winning",
    description:
      "Make your first deposit, claim your bonus, and start competing in games to win real cash prizes!",
  },
];

function HowToJoinSection() {
  return (
    <section
      id="how-to-join"
      className="relative py-24 overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, oklch(0.09 0.02 270) 0%, oklch(0.11 0.03 265) 100%)",
      }}
    >
      {/* Background decorative grid */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "linear-gradient(oklch(0.75 0.18 60 / 0.5) 1px, transparent 1px), linear-gradient(90deg, oklch(0.75 0.18 60 / 0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 container max-w-5xl mx-auto px-4">
        <div className="text-center mb-16">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-body mb-6 border"
            style={{
              background: "oklch(0.52 0.22 22 / 0.1)",
              borderColor: "oklch(0.52 0.22 22 / 0.3)",
              color: "oklch(0.75 0.18 80)",
            }}
          >
            <Star className="w-3.5 h-3.5" />3 Simple Steps
          </div>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl mb-4">
            How to{" "}
            <span style={{ color: "oklch(0.75 0.18 60)" }}>Get Started</span>
          </h2>
          <p className="font-body text-foreground/50 text-lg max-w-xl mx-auto">
            Join thousands of winners in under 2 minutes. It's that easy.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line */}
          <div
            className="absolute left-1/2 top-16 bottom-16 w-px hidden lg:block -translate-x-1/2"
            style={{
              background:
                "linear-gradient(to bottom, transparent, oklch(0.75 0.18 60 / 0.3) 20%, oklch(0.75 0.18 60 / 0.3) 80%, transparent)",
            }}
          />

          <div className="space-y-8 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.number}
                  className="relative flex flex-col items-center text-center"
                  style={{ animationDelay: `${index * 0.15}s` }}
                >
                  {/* Number + Icon */}
                  <div className="relative mb-6">
                    <div
                      className="w-20 h-20 rounded-2xl flex items-center justify-center border-2 relative z-10"
                      style={{
                        background:
                          "linear-gradient(135deg, oklch(0.75 0.18 60 / 0.15), oklch(0.75 0.18 60 / 0.05))",
                        borderColor: "oklch(0.75 0.18 60 / 0.4)",
                        boxShadow: "0 0 24px oklch(0.75 0.18 60 / 0.15)",
                      }}
                    >
                      <Icon
                        className="w-8 h-8"
                        style={{ color: "oklch(0.75 0.18 60)" }}
                      />
                    </div>
                    <div
                      className="absolute -top-3 -right-3 w-8 h-8 rounded-full flex items-center justify-center text-xs font-heading font-bold"
                      style={{
                        background:
                          "linear-gradient(135deg, oklch(0.75 0.18 60), oklch(0.65 0.16 55))",
                        color: "oklch(0.1 0.02 60)",
                      }}
                    >
                      {index + 1}
                    </div>
                  </div>

                  <h3 className="font-heading text-xl font-bold mb-3 text-foreground">
                    {step.title}
                  </h3>
                  <p className="font-body text-foreground/55 leading-relaxed text-sm mb-4">
                    {step.description}
                  </p>

                  {step.highlight && (
                    <div
                      className="inline-block px-4 py-2 rounded-lg font-mono text-lg font-bold"
                      style={{
                        background: "oklch(0.75 0.18 60 / 0.12)",
                        color: "oklch(0.85 0.2 75)",
                        border: "1px solid oklch(0.75 0.18 60 / 0.3)",
                      }}
                    >
                      {step.highlight}
                    </div>
                  )}

                  {step.action && (
                    <a
                      href={step.action.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm font-body font-semibold transition-all hover:gap-2"
                      style={{ color: "oklch(0.75 0.18 60)" }}
                    >
                      {step.action.label}
                    </a>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Testimonials Section ─────────────────────────────────────────────────────
const testimonials = [
  {
    name: "Rahul M.",
    location: "Mumbai",
    text: "I joined 91 Club 6 months ago with just ₹500. Today I've won over ₹45,000! The invite code bonus really helped me get started.",
    stars: 5,
    won: "₹45,000+",
  },
  {
    name: "Priya S.",
    location: "Bengaluru",
    text: "Best color prediction game I've ever played. Fast payouts, super easy withdrawal. The platform is completely trustworthy.",
    stars: 5,
    won: "₹12,500+",
  },
  {
    name: "Amit K.",
    location: "Delhi",
    text: "Used this invite code and got bonus credits on registration. Already made my investment back 3x in the first week!",
    stars: 5,
    won: "₹28,000+",
  },
];

function TestimonialsSection() {
  return (
    <section
      className="relative py-24"
      style={{ background: "oklch(0.08 0.015 265)" }}
    >
      <div className="container max-w-6xl mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="font-heading text-4xl md:text-5xl mb-4">
            Winners Are{" "}
            <span style={{ color: "oklch(0.75 0.18 60)" }}>Talking</span>
          </h2>
          <p className="font-body text-foreground/50 text-lg">
            Real players, real wins. Join the community.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="card-glow rounded-2xl p-6"
              style={{ background: "oklch(0.12 0.02 265)" }}
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.stars }, (_, i) => i).map((starIdx) => (
                  <Star
                    key={starIdx}
                    className="w-4 h-4 fill-current"
                    style={{ color: "oklch(0.75 0.18 60)" }}
                  />
                ))}
              </div>

              <p className="font-body text-foreground/70 leading-relaxed mb-5 text-sm">
                "{t.text}"
              </p>

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-heading text-sm font-bold text-foreground">
                    {t.name}
                  </div>
                  <div className="font-body text-xs text-foreground/40">
                    {t.location}
                  </div>
                </div>
                <div
                  className="px-3 py-1.5 rounded-lg font-heading text-sm font-bold"
                  style={{
                    background: "oklch(0.75 0.18 60 / 0.12)",
                    color: "oklch(0.85 0.2 75)",
                  }}
                >
                  Won {t.won}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CTA Banner Section ────────────────────────────────────────────────────────
function CTABannerSection() {
  return (
    <section
      className="relative py-24 overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, oklch(0.15 0.05 280) 0%, oklch(0.12 0.04 265) 50%, oklch(0.15 0.05 280) 100%)",
      }}
    >
      {/* Gold accent circles */}
      <div
        className="absolute -top-20 -left-20 w-80 h-80 rounded-full blur-3xl pointer-events-none"
        style={{ background: "oklch(0.75 0.18 60 / 0.08)" }}
      />
      <div
        className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full blur-3xl pointer-events-none"
        style={{ background: "oklch(0.52 0.22 22 / 0.1)" }}
      />

      <div className="relative z-10 container max-w-4xl mx-auto px-4 text-center">
        <div
          className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 animate-pulse-glow"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.75 0.18 60 / 0.2), oklch(0.75 0.18 60 / 0.05))",
            border: "1px solid oklch(0.75 0.18 60 / 0.3)",
          }}
        >
          <Crown
            className="w-10 h-10"
            style={{ color: "oklch(0.75 0.18 60)" }}
          />
        </div>

        <h2 className="font-heading text-4xl md:text-6xl lg:text-7xl mb-4 leading-tight">
          Ready to <span className="text-gold-gradient">Win?</span>
          <br />
          Join 91 Club Today!
        </h2>

        <p className="font-body text-foreground/55 text-lg mb-10 max-w-xl mx-auto">
          Thousands of players are winning right now. Use invite code{" "}
          <span
            className="font-mono font-bold"
            style={{ color: "oklch(0.85 0.2 75)" }}
          >
            {INVITE_CODE}
          </span>{" "}
          for your exclusive welcome bonus.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href={REGISTER_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 px-10 py-5 rounded-xl font-heading font-bold text-xl btn-gold-glow"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.75 0.18 60), oklch(0.65 0.16 55))",
              color: "oklch(0.1 0.02 60)",
            }}
          >
            <Users className="w-6 h-6" />
            Register Free Now
            <ArrowRight className="w-6 h-6" />
          </a>
        </div>

        <p className="font-body text-xs text-foreground/30 mt-6">
          Free registration • Instant access • 18+ only • Play responsibly
        </p>
      </div>
    </section>
  );
}

// ─── Header / Navbar ─────────────────────────────────────────────────────────
function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "oklch(0.1 0.02 265 / 0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid oklch(0.25 0.04 265)" : "none",
      }}
    >
      <div className="container max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <a
          href="#hero"
          className="flex items-center gap-2 font-heading text-xl font-bold"
          style={{ color: "oklch(0.75 0.18 60)" }}
        >
          <img
            src="/assets/generated/logo-91club.dim_400x400.png"
            alt="91 Club"
            className="w-8 h-8 object-contain"
          />
          91 CLUB
        </a>

        <nav className="hidden md:flex items-center gap-6">
          {[
            { label: "Features", href: "#features" },
            { label: "Invite Code", href: "#invite-code" },
            { label: "How to Join", href: "#how-to-join" },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="font-body text-sm text-foreground/60 hover:text-foreground transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href={REGISTER_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-heading font-bold text-sm btn-gold-glow"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.75 0.18 60), oklch(0.65 0.16 55))",
            color: "oklch(0.1 0.02 60)",
          }}
        >
          Register Now
        </a>
      </div>
    </header>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer({ visitorCount }: { visitorCount?: bigint }) {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";
  const caffeineLink = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`;

  return (
    <footer
      className="relative py-12 border-t"
      style={{
        background: "oklch(0.07 0.01 265)",
        borderColor: "oklch(0.18 0.03 265)",
      }}
    >
      <div className="container max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {/* Brand */}
          <div>
            <div
              className="flex items-center gap-2 font-heading text-xl font-bold mb-3"
              style={{ color: "oklch(0.75 0.18 60)" }}
            >
              <img
                src="/assets/generated/logo-91club.dim_400x400.png"
                alt="91 Club"
                className="w-7 h-7 object-contain"
              />
              91 CLUB
            </div>
            <p className="font-body text-sm text-foreground/40 leading-relaxed max-w-xs">
              India's premier online gaming platform. Join millions of players
              and start winning today.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              className="font-heading text-sm font-bold mb-4 uppercase tracking-wider"
              style={{ color: "oklch(0.75 0.18 60)" }}
            >
              Quick Links
            </h4>
            <ul className="space-y-2">
              {[
                { label: "Register Now", href: REGISTER_LINK, external: true },
                { label: "Features", href: "#features", external: false },
                {
                  label: "How to Join",
                  href: "#how-to-join",
                  external: false,
                },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    className="font-body text-sm text-foreground/50 hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Invite Code */}
          <div>
            <h4
              className="font-heading text-sm font-bold mb-4 uppercase tracking-wider"
              style={{ color: "oklch(0.75 0.18 60)" }}
            >
              My Invite Code
            </h4>
            <div
              className="inline-block px-5 py-3 rounded-xl font-mono text-xl font-bold mb-2"
              style={{
                background: "oklch(0.75 0.18 60 / 0.1)",
                color: "oklch(0.85 0.2 75)",
                border: "1px solid oklch(0.75 0.18 60 / 0.25)",
              }}
            >
              {INVITE_CODE}
            </div>
            <p className="font-body text-xs text-foreground/35 mt-2">
              Use when registering for bonuses
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="pt-6 border-t flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderColor: "oklch(0.18 0.03 265)" }}
        >
          <div className="font-body text-xs text-foreground/35 text-center md:text-left">
            © {year} 91 Club. All rights reserved. &nbsp;|&nbsp; 18+ only. Play
            responsibly.
          </div>

          {visitorCount !== undefined && visitorCount > BigInt(0) && (
            <div className="flex items-center gap-2 font-body text-xs text-foreground/30">
              <Users className="w-3.5 h-3.5" />
              <span>
                {Number(visitorCount).toLocaleString()} visitors joined
              </span>
            </div>
          )}

          <div className="font-body text-xs text-foreground/30 text-center md:text-right">
            Built with ❤️ using{" "}
            <a
              href={caffeineLink}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground/60 transition-colors underline underline-offset-2"
            >
              caffeine.ai
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── App Root ─────────────────────────────────────────────────────────────────
export default function App() {
  const { data: visitorCount } = useGetVisitorCount();
  const { mutate: incrementCount } = useIncrementVisitorCount();

  useEffect(() => {
    incrementCount();
  }, [incrementCount]);

  return (
    <div
      className="min-h-screen"
      style={{ background: "oklch(0.08 0.015 265)" }}
    >
      <Header />
      <main>
        <HeroSection />
        <InviteCodeSection />
        <FeaturesSection />
        <HowToJoinSection />
        <TestimonialsSection />
        <CTABannerSection />
      </main>
      <Footer visitorCount={visitorCount} />
      <Toaster
        theme="dark"
        toastOptions={{
          style: {
            background: "oklch(0.14 0.02 265)",
            border: "1px solid oklch(0.75 0.18 60 / 0.3)",
            color: "oklch(0.95 0.02 80)",
          },
        }}
      />
    </div>
  );
}
