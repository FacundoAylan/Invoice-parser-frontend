import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import ImageUploader from "@/pages/imageUploader/ImageUploader";
import InvoiceList from "@/pages/invoice/InvoiceList";
import App from "./App";
import { ErrorPage, NotFoundPage } from "./components";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<App />}>
          <Route index element={<ImageUploader />} />
          <Route path="invoices" element={<InvoiceList />} />
          <Route path="/error" element={<ErrorPage />} />
          <Route path="404" element={<NotFoundPage />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
