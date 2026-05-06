import { type FormEvent, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AuthLayout from "../layouts/authLayout";
import { verifyEmail } from "../api/authApi";

export default function VerifyEmailPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const initialEmail = location.state?.email || "";

  const [email, setEmail] = useState(initialEmail);
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleVerify = async (e: FormEvent) => {
    e.preventDefault();
    setMessage("");
    setIsSubmitting(true);

    try {
      await verifyEmail({ email, code });

      setMessage("Email verified successfully. Redirecting to login...");

      setTimeout(() => {
        navigate("/login");
      }, 1200);
    } catch (error: any) {
      setMessage(
        error?.response?.data?.message || "Unable to verify email."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout
      title="Verify your email"
      subtitle="Enter the 6-digit code sent to your email address."
    >
      <form onSubmit={handleVerify} className="space-y-5">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Email address
          </label>
          <input
            type="email"
            required
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-slate-900"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Verification code
          </label>
          <input
            type="text"
            required
            maxLength={6}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-center text-lg font-semibold tracking-[0.5em] outline-none focus:border-slate-900"
            placeholder="000000"
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
          />
        </div>

        {message && (
          <p className="rounded-xl bg-slate-100 px-4 py-3 text-sm text-slate-700">
            {message}
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-60"
        >
          {isSubmitting ? "Verifying..." : "Verify email"}
        </button>

        <p className="text-center text-sm text-slate-500">
          Already verified?{" "}
          <Link to="/login" className="font-semibold text-slate-950">
            Log in
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}