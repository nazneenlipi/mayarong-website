export function Footer() {
  return (
    <footer className="bg-primary text-white py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-bold mb-4">MAYA RANG</h3>
            <p className="text-sm opacity-90">Premium watches and bags for the discerning customer.</p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Products</h4>
            <ul className="space-y-2 text-sm opacity-90">
              <li>
                <a href="#" className="hover:opacity-100 transition">
                  Watches
                </a>
              </li>
              <li>
                <a href="#" className="hover:opacity-100 transition">
                  Bags
                </a>
              </li>
              <li>
                <a href="#" className="hover:opacity-100 transition">
                  New Arrivals
                </a>
              </li>
              <li>
                <a href="#" className="hover:opacity-100 transition">
                  Sale
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm opacity-90">
              <li>
                <a href="#" className="hover:opacity-100 transition">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:opacity-100 transition">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="hover:opacity-100 transition">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:opacity-100 transition">
                  Careers
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm opacity-90">
              <li>
                <a href="#" className="hover:opacity-100 transition">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:opacity-100 transition">
                  Shipping Info
                </a>
              </li>
              <li>
                <a href="#" className="hover:opacity-100 transition">
                  Returns
                </a>
              </li>
              <li>
                <a href="#" className="hover:opacity-100 transition">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 pt-8 text-center text-sm opacity-75">
          <p>© 2025 MAYA RANG. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
