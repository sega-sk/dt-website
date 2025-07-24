import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function CookiePage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white text-gray-900 pt-14 sm:pt-16">
        <div className="max-w-3xl mx-auto px-4 py-16">
          <h1 className="text-3xl font-bold mb-6">Cookie Policy</h1>
          <p className="text-sm text-gray-500 mb-8">Last updated: May 31, 2025</p>

          <div className="space-y-6">
            <section>
              <h2 className="text-2xl font-semibold mb-2">What Are Cookies?</h2>
              <p>
                As is common practice with almost all professional websites, this site uses cookies, which are tiny files that are downloaded to your computer, to improve your experience. This page describes what information they gather, how we use it and why we sometimes need to store these cookies.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-2">How We Use Cookies</h2>
              <p>
                We use cookies for a variety of reasons detailed below. Unfortunately, in most cases, there are no industry standard options for disabling cookies without completely disabling the functionality and features they add to this site. It is recommended that you leave on all cookies if you are not sure whether you need them or not in case they are used to provide a service that you use.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-2">Disabling Cookies</h2>
              <p>
                You can prevent the setting of cookies by adjusting the settings on your browser (see your browser Help for how to do this). Be aware that disabling cookies will affect the functionality of this and many other websites that you visit. Disabling cookies will usually result in also disabling certain functionality and features of this site. Therefore it is recommended that you do not disable cookies.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-2">The Cookies We Set</h2>
              <ul className="list-disc list-inside ml-4 mt-2">
                <li>
                  <strong>Site preferences cookies:</strong> In order to provide you with a great experience on this site, we provide the functionality to set your preferences for how this site runs when you use it. In order to remember your preferences, we need to set cookies so that this information can be called whenever you interact with a page.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-2">Third-Party Cookies</h2>
              <p>
                In some special cases, we also use cookies provided by trusted third parties. This site uses Google Analytics which is one of the most widespread and trusted analytics solutions on the web for helping us to understand how you use the site and ways that we can improve your experience.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-2">Contact</h2>
              <p>
                If you have any questions about this Cookie Policy or our use of cookies, you can contact us at:<br />
                <strong>Dealertower</strong><br />
                12725 SW Millikan Way<br />
                Suite 300<br />
                Beaverton OR 97005
              </p>
            </section>

          </div>
        </div>
        <Footer />
      </main>
    </>
  );
} 