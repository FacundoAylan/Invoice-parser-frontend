import { useEffect, useRef, useState } from "react";
import InvoiceTable from "./components/InvoiceTable";
import InvoiceListItems from "./components/InvoiceListItems";
import { useInvoiceStore } from "@/store/invoices.store";
import { useImagesStore } from "@/store/images.store";
import { HiPlus } from "react-icons/hi2";
import { toast, Toaster } from "sonner";

const InvoiceList = () => {
  const invoices = useInvoiceStore((state) => state.invoices);
  const images = useImagesStore((state) => state.images);
  const markAsUploaded = useImagesStore((state) => state.markAsUploaded);

  const [selectedInvoice, setSelectedInvoice] = useState<string | null>(null);
  const [showPending, setShowPending] = useState<boolean>(false);

  const alertMostrado = useRef(false);

  useEffect(() => {
    if (invoices.length > 0) {
      const processedIds = invoices.map((inv) => inv.imageId);
      markAsUploaded(processedIds);
    }
  }, [invoices, markAsUploaded]);

  useEffect(() => {
    const hasPendingImages = images.some((img) => !img.uploaded);

    if (images.length > 0 && hasPendingImages && !alertMostrado.current) {
      const timer = setTimeout(() => {
        toast.error("¡Atención! Todavía quedan imágenes pendientes de procesar.");
        alertMostrado.current = true;
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [images]);

  const pendingImages = images.filter((img) => !img.uploaded);

  const togglePendingView = () => {
    setShowPending((prev) => !prev);
  };

  return (
    <div className="w-full h-full flex flex-col overflow-hidden relative">
      {/* Modal Alert */}
      <Toaster position="top-center" richColors />

      <div className="p-2 flex justify-between items-center bg-slate-900 border-b border-slate-800 z-10">
        <h2 className="text-xl font-bold text-white">
          {showPending ? "Facturas no procesadas" : "Facturas procesadas"}
        </h2>

        <button
          type="button"
          onClick={togglePendingView}
          className={`flex items-center gap-2 px-6 py-2 rounded-xl font-semibold transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 hover:cursor-pointer active:translate-y-0 border ${
            showPending
              ? "bg-[#7ED957] text-[#0A2540] border-[#7ED957] font-bold"
              : "bg-[#0A2540] text-white border-[#7ED957] hover:bg-[#12345A]"
          }`}
        >
          <HiPlus
            className={`text-xl transition-transform duration-300 ${showPending ? "rotate-45 text-[#0A2540]" : "text-[#7ED957]"}`}
          />
          {showPending
            ? "Ver facturas procesadas"
            : `Ver pendientes (${pendingImages.length})`}
        </button>
      </div>

      <div className="w-full h-full flex overflow-hidden relative">
        <div className="w-full h-full flex overflow-hidden relative">
          <div
            className={`transition-all duration-800 ease-in-out shrink-0
            ${selectedInvoice ? "w-0 opacity-0 pointer-events-none" : "w-full opacity-100"}`}
          >
            <InvoiceListItems
              invoices={invoices}
              pendingImages={pendingImages}
              showPending={showPending}
              setSelectedInvoice={setSelectedInvoice}
            />
          </div>

          <div
            className={`transition-all duration-800 ease-in-out shrink-0
            ${selectedInvoice ? "w-full opacity-100" : "w-0 opacity-0 pointer-events-none"}`}
          >
            {selectedInvoice && (
              <InvoiceTable
                imageId={selectedInvoice}
                onClose={() => setSelectedInvoice(null)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceList;
