export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t mt-16">
      <div className="container mx-auto px-4 py-10">
        {/* Top section */}
        <div className="mb-10">
          <h4 className="text-lg font-semibold text-gray-900 text-center sm:text-left">
            Get the FreshCart app
          </h4>
          <p className="text-sm text-gray-600 mt-1 text-center sm:text-left">
            We will send you a link, open it on your phone to download the app.
          </p>

          <div className="mt-4 flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Email..."
              className="w-full sm:flex-1 px-4 py-2 border border-gray-200 rounded-lg bg-white
                         focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <button
              className="w-full sm:w-auto bg-green-600 text-white px-6 py-2 rounded-lg
                         hover:bg-green-700 transition"
            >
              Share App Link
            </button>
          </div>
        </div>

        {/* Middle section */}
        <div className="border-t pt-6 flex flex-col gap-6">
          {/* Payment methods */}
          <div className="flex flex-wrap justify-center sm:justify-start items-center gap-5">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg"
              alt="Visa"
              className="h-6"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg"
              alt="Mastercard"
              className="h-6"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"
              alt="PayPal"
              className="h-6"
            />
          </div>

          {/* Store badges */}
          <div className="flex flex-col sm:flex-row justify-center sm:justify-end items-center gap-4">
            <img
              src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
              alt="App Store"
              className="h-10"
            />
            <img
              src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
              alt="Google Play"
              className="h-12"
            />
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-8 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} FreshCart. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

