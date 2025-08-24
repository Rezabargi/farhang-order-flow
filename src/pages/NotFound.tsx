import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-subtle">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 font-persian">۴۰۴</h1>
        <p className="text-xl text-muted-foreground mb-4 font-persian">صفحه مورد نظر یافت نشد</p>
        <a href="/" className="text-primary hover:text-primary-glow underline font-persian">
          بازگشت به صفحه اصلی
        </a>
      </div>
    </div>
  );
};

export default NotFound;
