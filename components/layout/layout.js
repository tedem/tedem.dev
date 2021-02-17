import Header from "../layout/header";
import Footer from "../layout/footer";

export default function Layout({ children }) {
  return (
    <div id="app">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
