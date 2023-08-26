import "./globals.css";
import "@/node_modules/react-modal-video/scss/modal-video.scss";
import Navbar from "@/app/_components/templates/Navbar/index";
import Footer from "@/app/_components/templates/Footer/index";
import Wagmi from "@/app/_components/web3/wagmi/index";

export const metadata = {
  title: "Extinct-fuzzy-unicorn-pet",
  description: "web3 monster collection game platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
        <Footer />
        <Wagmi />
      </body>
    </html>
  );
}
