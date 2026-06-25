import { BrowserRouter, Route } from "react-router";
import { RoutesWithNotFound } from "./components";
import ImageUploader from "./pages/imageUploader/ImageUploader";
import InvoiceList from "./pages/invoice/InvoiceList";
import App from "./App";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <RoutesWithNotFound>
        <Route element={<App/>}>
          <Route path="/" element={<ImageUploader />} />
          <Route path="/invoices" element={<InvoiceList />} />
        </Route>
      </RoutesWithNotFound>
    </BrowserRouter>
  );
};

export default AppRouter;