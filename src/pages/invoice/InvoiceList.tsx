import { useState } from "react";
import type { InvoiceData } from "../../types/invoice";
import InvoiceTable from "./components/InvoiceTable";
import InvoiceListItems from "./components/InvoiceListItems";
import { useLocation } from "react-router";


const InvoiceList = () => {

  const location = useLocation();

  const invoices = location.state?.invoices ?? [];
  const [selectedInvoice, setSelectedInvoice] = useState<InvoiceData | null>(null);

  return (
    <div className="w-full h-full flex overflow-hidden relative">
      <div
        className={`transition-all duration-500 ease-in-out 
        ${selectedInvoice ? "w-1/2" : "w-full"}`}
      >
        <InvoiceListItems
          invoices={invoices}
          setSelectedInvoice={setSelectedInvoice}
        />
      </div>

      <div
        className={`overflow-hidden
        transition-all duration-500 ease-in-out
        ${selectedInvoice ? "w-1/2 opacity-100" : "w-0 opacity-0"}`}
      >
        {selectedInvoice && (
          <InvoiceTable
            invoice={selectedInvoice}
            onClose={() => setSelectedInvoice(null)}
          />
        )}
      </div>
    </div>
  );
};

export default InvoiceList;
