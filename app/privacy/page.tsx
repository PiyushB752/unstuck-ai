import Link from "next/link";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#F8F9F6] px-6 py-16">
      <article className="mx-auto max-w-3xl">
        <Link
          href="/"
          className="text-sm font-medium text-[#68785F] hover:underline"
        >
          ← Back to Unstuck AI
        </Link>

        <h1 className="mt-10 text-3xl font-semibold text-[#252820]">
          Privacy Policy
        </h1>

        <p className="mt-3 text-sm text-gray-500">
          Last updated: November 2026
        </p>

        <div className="mt-10 space-y-8 text-sm leading-7 text-gray-600">
          <section>
            <h2 className="text-lg font-semibold text-[#252820]">
              1. Information We Collect
            </h2>
            <p className="mt-2">
              Unstuck AI collects the problems and task descriptions you
              voluntarily submit, along with the suggestions generated for
              you. A browser-generated client identifier is used to associate
              your sessions and action history.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[#252820]">
              2. How We Use Your Information
            </h2>
            <p className="mt-2">
              Your information is used to generate practical next steps,
              maintain your action history, and improve your experience within
              the application.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[#252820]">
              3. Third-Party Services
            </h2>
            <p className="mt-2">
              Unstuck AI uses Groq to process submitted text and generate
              suggestions, and MongoDB to store session and action data.
              These services process data according to their respective
              privacy policies.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[#252820]">
              4. Data Storage
            </h2>
            <p className="mt-2">
              Session and action history is stored in a MongoDB database and
              associated with your browser's client identifier.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[#252820]">
              5. Sensitive Information
            </h2>
            <p className="mt-2">
              Please avoid submitting passwords, financial details, or other
              highly sensitive personal information.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[#252820]">
              6. Contact
            </h2>
            <p className="mt-2">
              For questions about this policy, contact the Unstuck AI
              development team through the project repository.
            </p>
          </section>
        </div>
      </article>
    </main>
  );
}