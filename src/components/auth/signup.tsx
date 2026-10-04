"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faLock,
  faUser,
  faArrowRight,
  faLeaf,
  faShieldHeart,
  faCircleCheck,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "@/components/providers";
import { useAuthStore } from "@/store/auth";
import { api } from "@/lib/api";
import { toast } from "@/hooks/use-toast";

export function SignupPage() {
  const { navigate } = useRouter();
  const setSession = useAuthStore((s) => s.setSession);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });

  const [show, setShow] = useState(false);
  const [busy, setBusy] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const updateField = (
    field: keyof typeof form,
    value: string
  ) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (busy) return;

    const name = form.name.trim();
    const email = form.email.trim().toLowerCase();
    const password = form.password;
    const confirm = form.confirm;

    if (!name) {
      toast({
        title: "Name required",
        description: "Please enter your full name.",
        variant: "destructive",
      });
      return;
    }

    if (name.length < 2) {
      toast({
        title: "Name is too short",
        description: "Please enter your full name.",
        variant: "destructive",
      });
      return;
    }

    if (!email) {
      toast({
        title: "Email required",
        description: "Please enter your email address.",
        variant: "destructive",
      });
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    if (password.length < 8) {
      toast({
        title: "Password too short",
        description: "Use at least 8 characters.",
        variant: "destructive",
      });
      return;
    }

    if (password !== confirm) {
      toast({
        title: "Passwords don't match",
        description:
          "Please make sure both password fields are identical.",
        variant: "destructive",
      });
      return;
    }

    if (!agreed) {
      toast({
        title: "Please accept the Terms",
        description:
          "You need to accept the terms before creating an account.",
        variant: "destructive",
      });
      return;
    }

    setBusy(true);

    try {
      const res = await api<{
        user: {
          id: string;
          email: string;
          name: string;
          role: string;
        };
        token: string;
      }>("/api/auth/signup", {
        method: "POST",
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      setSession(res.user, res.token);

      toast({
        title: "Welcome to Verdant",
        description: `Welcome, ${res.user.name}.`,
      });

      navigate("account");
    } catch (err) {
      toast({
        title: "Sign up failed",
        description:
          err instanceof Error
            ? err.message
            : "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="page-dense pt-28 md:pt-36 pb-16 min-h-[80vh]">
      <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center max-w-6xl mx-auto">

        {/* FORM */}
        <div
          data-animate="rise"
          className="order-2 lg:order-1 w-full max-w-xl mx-auto"
        >
          <p className="tag-soft mb-4">
            Join the meadow
          </p>

          <h1
            className="font-display text-4xl md:text-5xl leading-[1.05] mb-4"
            style={{ color: "var(--forest-deep)" }}
          >
            Create your account
          </h1>

          <p
            className="mb-8 text-base leading-relaxed"
            style={{ color: "var(--muted-foreground)" }}
          >
            Joining Verdant keeps your bag and wishlist across devices,
            gives you a 10% welcome credit on your first order, and puts
            your order history one tap away.
          </p>

          <form
            onSubmit={onSubmit}
            className="space-y-5"
          >
            {/* Full name */}
            <div>
              <label
                htmlFor="signup-name"
                className="text-sm font-medium mb-2 block"
                style={{ color: "var(--forest-deep)" }}
              >
                Full name
              </label>

              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2">
                  <FontAwesomeIcon
                    icon={faUser}
                    className="text-[13px]"
                    style={{
                      color: "var(--muted-foreground)",
                    }}
                  />
                </span>

                <input
                  id="signup-name"
                  type="text"
                  required
                  autoComplete="name"
                  value={form.name}
                  onChange={(e) =>
                    updateField("name", e.target.value)
                  }
                  placeholder="Sara El-Sayed"
                  className="input-glass pl-11"
                  disabled={busy}
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="signup-email"
                className="text-sm font-medium mb-2 block"
                style={{ color: "var(--forest-deep)" }}
              >
                Email
              </label>

              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2">
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    className="text-[13px]"
                    style={{
                      color: "var(--muted-foreground)",
                    }}
                  />
                </span>

                <input
                  id="signup-email"
                  type="email"
                  required
                  autoComplete="email"
                  value={form.email}
                  onChange={(e) =>
                    updateField("email", e.target.value)
                  }
                  placeholder="your@email.com"
                  className="input-glass pl-11"
                  disabled={busy}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="signup-password"
                className="text-sm font-medium mb-2 block"
                style={{ color: "var(--forest-deep)" }}
              >
                Password
              </label>

              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2">
                  <FontAwesomeIcon
                    icon={faLock}
                    className="text-[13px]"
                    style={{
                      color: "var(--muted-foreground)",
                    }}
                  />
                </span>

                <input
                  id="signup-password"
                  type={show ? "text" : "password"}
                  required
                  autoComplete="new-password"
                  value={form.password}
                  onChange={(e) =>
                    updateField("password", e.target.value)
                  }
                  placeholder="At least 8 characters"
                  className="input-glass pl-11 pr-12"
                  disabled={busy}
                />

                <button
                  type="button"
                  onClick={() => setShow((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full transition-colors hover:bg-forest/10"
                  aria-label={
                    show ? "Hide password" : "Show password"
                  }
                  disabled={busy}
                >
                  <FontAwesomeIcon
                    icon={show ? faEyeSlash : faEye}
                    className="text-[12px]"
                    style={{
                      color: "var(--muted-foreground)",
                    }}
                  />
                </button>
              </div>

              <p
                className="mt-2 text-xs"
                style={{
                  color: "var(--muted-foreground)",
                }}
              >
                Minimum 8 characters.
              </p>
            </div>

            {/* Confirm password */}
            <div>
              <label
                htmlFor="signup-confirm"
                className="text-sm font-medium mb-2 block"
                style={{ color: "var(--forest-deep)" }}
              >
                Confirm password
              </label>

              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2">
                  <FontAwesomeIcon
                    icon={faLock}
                    className="text-[13px]"
                    style={{
                      color: "var(--muted-foreground)",
                    }}
                  />
                </span>

                <input
                  id="signup-confirm"
                  type={show ? "text" : "password"}
                  required
                  autoComplete="new-password"
                  value={form.confirm}
                  onChange={(e) =>
                    updateField("confirm", e.target.value)
                  }
                  placeholder="Repeat your password"
                  className="input-glass pl-11"
                  disabled={busy}
                />
              </div>
            </div>

            {/* Terms */}
            <label
              className="flex items-start gap-3 text-sm cursor-pointer pt-1"
              style={{ color: "var(--muted-foreground)" }}
            >
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) =>
                  setAgreed(e.target.checked)
                }
                className="mt-1 shrink-0 rounded"
                disabled={busy}
              />

              <span className="leading-relaxed">
                I&apos;ve read and accept the{" "}
                <button
                  type="button"
                  onClick={() => navigate("terms")}
                  className="font-semibold hover:opacity-70 transition-opacity"
                  style={{ color: "var(--straw-deep)" }}
                  disabled={busy}
                >
                  Terms of Use
                </button>
                ,{" "}
                <button
                  type="button"
                  onClick={() => navigate("privacy")}
                  className="font-semibold hover:opacity-70 transition-opacity"
                  style={{ color: "var(--straw-deep)" }}
                  disabled={busy}
                >
                  Privacy Policy
                </button>
                , and{" "}
                <button
                  type="button"
                  onClick={() => navigate("egypt-trading")}
                  className="font-semibold hover:opacity-70 transition-opacity"
                  style={{ color: "var(--straw-deep)" }}
                  disabled={busy}
                >
                  Egyptian Trading Laws
                </button>
                .
              </span>
            </label>

            {/* Submit */}
            <button
              type="submit"
              disabled={busy}
              className="btn-straw w-full justify-center mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {busy ? (
                "Creating account…"
              ) : (
                <>
                  Create account
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    className="text-[13px]"
                  />
                </>
              )}
            </button>
          </form>

          {/* Login */}
          <div
            className="mt-7 flex items-center justify-center gap-2 text-sm"
            style={{
              color: "var(--muted-foreground)",
            }}
          >
            <span>Already a Verdant member?</span>

            <button
              type="button"
              onClick={() => navigate("login")}
              className="font-semibold hover:opacity-70 transition-opacity"
              style={{ color: "var(--straw-deep)" }}
            >
              Sign in
            </button>
          </div>
        </div>

        {/* VISUAL */}
        <div
          className="hidden lg:block relative h-[560px] rounded-[2.5rem] overflow-hidden glass-card order-1 lg:order-2"
          data-animate="scale"
        >
          <img
            src="/images/verdant/atelier.webp"
            alt="Handloom weaving"
            className="w-full h-full object-cover"
          />

          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(15, 36, 23, 0.4) 0%, rgba(15, 36, 23, 0.15) 50%, rgba(15, 36, 23, 0.7) 100%)",
            }}
          />

          <div className="absolute inset-0 flex flex-col justify-end p-10">
            <span
              className="w-12 h-12 rounded-full flex items-center justify-center mb-4"
              style={{
                background: "rgba(212, 168, 65, 0.95)",
              }}
            >
              <FontAwesomeIcon
                icon={faLeaf}
                className="text-[16px]"
                style={{
                  color: "var(--forest-deep)",
                }}
              />
            </span>

            <h2
              className="font-display text-3xl leading-tight"
              style={{ color: "var(--beige)" }}
            >
              One account. A quieter inbox.
            </h2>

            <p
              className="mt-2 text-sm leading-relaxed max-w-md"
              style={{
                color: "rgba(239, 229, 210, 0.85)",
              }}
            >
              One slow letter a fortnight — never spam,
              unsubscribe anytime.
            </p>

            <div className="mt-5 flex flex-wrap gap-2.5">
              {[
                {
                  icon: faShieldHeart,
                  text: "TLS 1.3 encryption",
                },
                {
                  icon: faCircleCheck,
                  text: "10% welcome credit",
                },
                {
                  icon: faLeaf,
                  text: "1% replants trees",
                },
              ].map((f) => (
                <span
                  key={f.text}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold"
                  style={{
                    background:
                      "rgba(239, 229, 210, 0.18)",
                    color: "var(--beige)",
                    border:
                      "1px solid rgba(239, 229, 210, 0.3)",
                  }}
                >
                  <FontAwesomeIcon
                    icon={f.icon}
                    className="text-[11px]"
                  />
                  {f.text}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}