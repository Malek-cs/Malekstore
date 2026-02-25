import "./globals.css";
import "./fanta.css";
import Link from "next/link";
import Cart from "@/components/Cart";
import EmailInput from "@/components/EmailInput";
import ProductsProvider from "@/context/ProductContext";
import Script from "next/script"; // 1. استيراد السكربت

export const metadata = {
  title: "Haya Candles",
  description: "The best candles are found here",
};

export default function RootLayout({ children }) {
  return (
    <ProductsProvider>
      <html lang="en">
        <head>
          <link 
            rel="stylesheet" 
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" 
          />
        </head>
        <body>
          {/* 2. إضافة سكربت Paddle هنا ليتم تحميله في كل الصفحات */}
          <Script 
            src="https://cdn.paddle.com/paddle/v2/paddle.js" 
            strategy="afterInteractive" 
          />

          <div id="portal"></div>
          <div id="app">
            <header>
              <div className="header-content">
                <Link href="/" className="logo-link">
                  <img 
                    src="/low_res/HayaStore.jpg" 
                    alt="HAYASTORE - jordanian Hands" 
                    className="brand-logo-img"
                  />
                  <h1 className="brand-logo">HAYASTORE</h1>
                  <span className="brand-sub">Jordanian Hands</span>
                </Link>
                <h5 className="mid-text">- Cool Candles for cool people</h5>
                <Cart />
              </div>
            </header>

            <main>{children}</main>

            <div className="hr"></div>

            <footer>
              <div className="email-container">
                <h5>Get a sneak peak at new additions to the store...</h5>
                <EmailInput />
              </div>
              <div className="links-container">
                <div>
                  <h3>Store</h3>
                  <Link href="/">Home</Link>
                  <Link href="/cart">Cart</Link>
                </div>
              </div>
              <div className="socials">
                <p>To contact us</p>
                <p>© {new Date().getFullYear()} Haya Ali</p>
                <div className="social-links">
                  <Link href="https://www.instagram.com/natureby.haya/" target="_blank">
                    <i className="fa-brands fa-instagram"></i>
                  </Link>
                  <Link href="https://wa.me/962782772920" target="_blank">
                    <i className="fa-brands fa-whatsapp"></i>
                  </Link>
                </div>
              </div>
            </footer>
          </div>
        </body>
      </html>
    </ProductsProvider>
  );
}