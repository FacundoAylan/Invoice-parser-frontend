import { useNavigate } from "react-router";
import { FiDownload } from "react-icons/fi";
import type { InvoiceData } from "@/types/invoice";
import exportInvoicesToExcel from "@/utils/excel/exportInvoicesToExcel";

interface InvoiceListItemsProps {
  invoices: InvoiceData[];
  setSelectedInvoice: (invoice: InvoiceData) => void;
}

const InvoiceListItems = ({
  invoices,
  setSelectedInvoice,
}: InvoiceListItemsProps) => {
  const navigate = useNavigate();

  const handleRedirectClick = () => {
    navigate("/");
  };

  return (
    <div className="relative w-full h-full mx-auto p-4 shadow-2xl overflow-y-scroll">
      {/* Header */}
      <div className="grid grid-cols-[1fr_100px] md:grid-cols-[1fr_120px_140px_120px] text-gray-500 text-xs uppercase tracking-wider px-4 pb-2">
        <span className="text-left font-semibold">Proveedor</span>

        <span className="hidden md:block text-center font-semibold">Fecha</span>

        <span className="hidden md:block text-right font-semibold">
          Nº Factura
        </span>

        <span className="text-center font-semibold">Acción</span>
      </div>

      {/* List invoice */}
      <div className="flex flex-col gap-2">
        {invoices.map((invoice, index) => (
          <div
            key={index}
            className="grid grid-cols-[1fr_100px] md:grid-cols-[1fr_120px_140px_120px] bg-[#0A2540] hover:scale-101 transition-all duration-150 p-3 rounded-xl items-center border border-gray-800/60"
          >
            {/* Proveedor */}
            <div className="text-left font-medium text-white text-xs md:text-sm truncate pr-2">
              {invoice.vendorName}
            </div>

            {/* Fecha */}
            <div className="hidden md:flex justify-center">
              <span className="inline-block bg-gray-800/40 border border-gray-700/40 text-gray-300 text-xs px-2.5 py-1 rounded-3xl">
                {invoice.dateOfInvoice}
              </span>
            </div>

            {/* Nº Factura */}
            <div className="hidden md:block text-right text-gray-400 text-xs md:text-sm font-mono">
              {invoice.invoiceNumber}
            </div>

            {/* Acción */}
            <div className="flex justify-center">
              <button
                onClick={() => setSelectedInvoice(invoice)}
                className="w-full max-w-25 px-3 py-1.5 rounded-3xl text-xs font-semibold border-2 border-[#7ED957]/60 text-[#7ED957] transition-all duration-200 shadow-md hover:cursor-pointer"
              >
                Ver factura
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="w-full flex flex-wrap justify-center items-center gap-4 pt-6">
        <button
          onClick={handleRedirectClick}
          className="
            px-6 py-3
            rounded-xl
            border border-[#7ED957]
            bg-[#0A2540]
            text-white
            font-semibold
            transition-all duration-200
            hover:bg-[#12345A]
            hover:shadow-lg
            hover:-translate-y-0.5 hover:cursor-pointer
            active:translate-y-0
          "
        >
          Cargar nuevas facturas
        </button>

        <button
          className="
            flex items-center gap-2
            px-6 py-3
            rounded-xl
            bg-[#8fbe4e]
            text-[#0A2540]
            font-semibold
            transition-all duration-200
            hover:bg-[#91E86A]
            hover:shadow-lg
            hover:-translate-y-0.5 hover:cursor-pointer
            active:translate-y-0
          "
          onClick={() =>
            exportInvoicesToExcel(invoices.map((inv) => ({ invoice: inv })))
          }
        >
          <FiDownload size={20} />
          <span>Descargar facturas</span>
        </button>
      </div>
    </div>
  );
};

export default InvoiceListItems;
