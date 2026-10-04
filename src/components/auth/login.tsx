"use client";

import { useState, type FormEvent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faLock,
  faArrowRight,
  faLeaf,
  faShieldHeart,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";

import { useRouter } from "@/components/providers";
import { useAuthStore } from "@/store/auth";
import { api } from "@/lib/api";
import { toast } from "@/hooks/use-toast";

export function LoginPage() {
  const { navigate } = useRouter();

  const setSession = useAuthStore(
    (state) => state.setSession,
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] =
    useState(false);
  const [rememberMe, setRememberMe] =
    useState(true);
  const [busy, setBusy] = useState(false);

  const onSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (busy) {
      return;
    }

    const normalizedEmail = email
      .trim()
      .toLowerCase();

    if (!normalizedEmail || !password) {
      toast({
        title: "Complete your details",
        description:
          "Enter your email and password to continue.",
        variant: "destructive",
      });

      return;
    }

    setBusy(true);

    try {
      const response = await api<{
        user: {
          id: string;
          email: string;
          name: string;
          role: string;
        };
        token: string;
      }>("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({
          email: normalizedEmail,
          password,
        }),
      });

      setSession(
        response.user,
        response.token,
      );

      toast({
        title: "Welcome back",
        description: response.user.name,
      });

      /*
       * The current auth store controls session persistence.
       * Keep the preference here so the control is functional
       * without inventing a separate backend remember-me flow.
       */
      if (typeof window !== "undefined") {
        window.localStorage.setItem(
          "verdant-remember-me",
          rememberMe ? "true" : "false",
        );
      }

      navigate("account");
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Please check your email and password.";

      toast({
        title: "Login failed",
        description: message,
        variant: "destructive",
      });
    } finally {
      setBusy(false);
    }
  };

  const handleForgotPassword = () => {
    toast({
      title: "Password reset",
      description:
        "Password recovery isn't available yet. Please contact Verdant support.",
    });
  };

  return (
    <main className="page-dense min-h-[80vh] pt-28 pb-16 md:pt-36">
      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2 lg:gap-16">
        {/* =========================================
            VISUAL
        ========================================= */}

        <div
          className="relative hidden h-[560px] overflow-hidden rounded-[2.5rem] glass-card lg:block"
          data-animate="scale"
        >
          <img
            src="/images/verdant/hero-field.webp"
            alt="Wild meadow at golden hour"
            className="h-full w-full object-cover"
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
              className="mb-4 flex h-12 w-12 items-center justify-center rounded-full"
              style={{
                background:
                  "rgba(212, 168, 65, 0.95)",
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
              style={{
                color: "var(--beige)",
              }}
            >
              Slow letters from the meadow.
            </h2>

            <p
              className="mt-2 max-w-md text-sm leading-relaxed"
              style={{
                color:
                  "rgba(239, 229, 210, 0.85)",
              }}
            >
              Your account keeps your wishlist,
              order history, and field-notes
              subscription in one place.
            </p>
          </div>
        </div>

        {/* =========================================
            FORM
        ========================================= */}

        <div
          className="mx-auto w-full max-w-xl"
          data-animate="rise"
        >
          <p className="tag-soft mb-4">
            Welcome back
          </p>

          <h1
            className="font-display mb-4 text-4xl leading-[1.05] md:text-5xl"
            style={{
              color: "var(--forest-deep)",
            }}
          >
            Sign in to Verdant
          </h1>

          <p
            className="mb-8 text-base leading-relaxed"
            style={{
              color:
                "var(--muted-foreground)",
            }}
          >
            Pick up where you left off — your
            bag, wishlist, and orders are
            waiting.
          </p>

          <form
            onSubmit={onSubmit}
            className="space-y-5"
            noValidate={false}
          >
            {/* Email */}

            <div>
              <label
                htmlFor="login-email"
                className="mb-2 block text-sm font-medium"
                style={{
                  color:
                    "var(--forest-deep)",
                }}
              >
                Email
              </label>

              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2">
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    className="text-[13px]"
                    style={{
                      color:
                        "var(--muted-foreground)",
                    }}
                  />
                </span>

                <input
                  id="login-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  inputMode="email"
                  required
                  value={email}
                  onChange={(event) =>
                    setEmail(
                      event.target.value,
                    )
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
                htmlFor="login-password"
                className="mb-2 block text-sm font-medium"
                style={{
                  color:
                    "var(--forest-deep)",
                }}
              >
                Password
              </label>

              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2">
                  <FontAwesomeIcon
                    icon={faLock}
                    className="text-[13px]"
                    style={{
                      color:
                        "var(--muted-foreground)",
                    }}
                  />
                </span>

                <input
                  id="login-password"
                  name="password"
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(event) =>
                    setPassword(
                      event.target.value,
                    )
                  }
                  placeholder="••••••••"
                  className="input-glass pl-11 pr-20"
                  disabled={busy}
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(
                      (current) => !current,
                    )
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full px-3 py-1.5 text-xs font-semibold transition-opacity hover:opacity-70"
                  style={{
                    background:
                      "rgba(31, 61, 43, 0.08)",
                    color:
                      "var(--forest-deep)",
                  }}
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >
                  {showPassword
                    ? "Hide"
                    : "Show"}
                </button>
              </div>
            </div>

            {/* Remember / Forgot */}

            <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center sm:justify-between">
              <label
                htmlFor="remember-me"
                className="flex cursor-pointer items-center gap-2 text-sm"
                style={{
                  color:
                    "var(--muted-foreground)",
                }}
              >
                <input
                  id="remember-me"
                  name="rememberMe"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(event) =>
                    setRememberMe(
                      event.target.checked,
                    )
                  }
                  className="h-4 w-4 rounded"
                  disabled={busy}
                />

                Remember me
              </label>

              <button
                type="button"
                onClick={
                  handleForgotPassword
                }
                className="w-fit text-sm font-medium transition-opacity hover:opacity-70"
                style={{
                  color:
                    "var(--straw-deep)",
                }}
                disabled={busy}
              >
                Forgot password?
              </button>
            </div>

            {/* Submit */}

            <button
              type="submit"
              disabled={busy}
              className="btn-straw mt-2 w-full justify-center disabled:cursor-not-allowed disabled:opacity-60"
            >
              {busy ? (
                "Signing in…"
              ) : (
                <>
                  Sign in

                  <FontAwesomeIcon
                    icon={faArrowRight}
                    className="text-[13px]"
                  />
                </>
              )}
            </button>
          </form>

          {/* Signup */}

          <div
            className="mt-7 flex items-center justify-center gap-2 text-sm"
            style={{
              color:
                "var(--muted-foreground)",
            }}
          >
            <span>New to Verdant?</span>

            <button
              type="button"
              onClick={() =>
                navigate("signup")
              }
              className="font-semibold transition-opacity hover:opacity-70"
              style={{
                color:
                  "var(--straw-deep)",
              }}
            >
              Create an account
            </button>
          </div>

          {/* Trust */}

          <div
            className="mt-8 grid grid-cols-1 gap-4 rounded-[1.25rem] p-4 text-xs sm:grid-cols-3"
            style={{
              background:
                "rgba(255, 252, 244, 0.45)",
              color:
                "var(--muted-foreground)",
              border:
                "1px solid rgba(31, 61, 43, 0.08)",
            }}
          >
            {[
              {
                icon: faShieldHeart,
                text: "TLS 1.3 encryption",
              },
              {
                icon: faCircleCheck,
                text: "No spam, ever",
              },
              {
                icon: faLeaf,
                text: "1% of every order replants a tree",
              },
            ].map((item) => (
              <div
                key={item.text}
                className="flex items-center gap-2"
              >
                <FontAwesomeIcon
                  icon={item.icon}
                  className="shrink-0 text-[12px]"
                  style={{
                    color:
                      "var(--forest)",
                  }}
                />

                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}