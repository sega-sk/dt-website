import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white text-gray-900 pt-14 sm:pt-16">
        <div className="max-w-3xl mx-auto px-4 py-16">
          <h1 className="text-3xl font-bold mb-6">Privacy Notice</h1>
          <p className="text-sm text-gray-500 mb-8">Last updated: May 31, 2025</p>

          <div className="space-y-6">
            <section>
              <h2 className="text-2xl font-semibold mb-2">Introduction</h2>
              <p>
                Welcome to Dealertower. We respect your privacy and are committed to protecting your personal data. This privacy notice will inform you as to how we look after your personal data when you visit our website (regardless of where you visit it from) and tell you about your privacy rights and how the law protects you.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-2">1. Important Information and Who We Are</h2>
              <p>
                Dealertower is the controller and responsible for your personal data (collectively referred to as “Dealertower”, “we”, “us” or “our” in this privacy notice).
              </p>
              <p className="mt-2">
                <strong>Our business address:</strong><br />
                12725 SW Millikan Way<br />
                Suite 300<br />
                Beaverton OR 97005
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-2">2. The Data We Collect About You</h2>
              <p>
                Personal data, or personal information, means any information about an individual from which that person can be identified. We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:
              </p>
              <ul className="list-disc list-inside ml-4 mt-2">
                <li><strong>Identity Data</strong> includes first name, last name, username or similar identifier.</li>
                <li><strong>Contact Data</strong> includes billing address, delivery address, email address and telephone numbers.</li>
                <li><strong>Technical Data</strong> includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform, and other technology on the devices you use to access this website.</li>
                <li><strong>Usage Data</strong> includes information about how you use our website, products and services.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-2">3. How We Use Your Personal Data</h2>
              <p>
                We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
              </p>
              <ul className="list-disc list-inside ml-4 mt-2">
                <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
                <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
                <li>Where we need to comply with a legal obligation.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-2">4. Data Security</h2>
              <p>
                We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-2">5. Your Legal Rights</h2>
              <p>
                Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to request access, correction, erasure, or to object to processing.
              </p>
            </section>

          </div>
        </div>
        <Footer />
      </main>
    </>
  );
} 