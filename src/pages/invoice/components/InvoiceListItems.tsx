import { useNavigate } from "react-router";
import type { InvoiceData} from "../../../types/invoice";


const InvoiceListItems = ({ invoices, setSelectedInvoice }) => {

  const navigate = useNavigate();

  const handleRedirectClick = ()=>{
    navigate("/");
  };

  return (
    <div className="relative w-full h-full mx-auto p-4 shadow-2xl overflow-y-scroll">
      <div className="grid grid-cols-[1fr_100px_110px_100px] md:grid-cols-[1fr_120px_140px_120px] text-gray-500 text-xs uppercase tracking-wider px-4 pb-2 text-right">
        <span className="text-left font-semibold">Proveedor</span>
        <span className="text-center font-semibold">Fecha</span>
        <span className="font-semibold">Nº Factura</span>
        <span className="text-center font-semibold">Acción</span>
      </div>

      {/* List invoice */}
      <div className="flex flex-col gap-2">
        {invoices.map((invoice: InvoiceData, index: number) => (
          <div
            key={index}
            className="grid grid-cols-[1fr_100px_110px_100px] md:grid-cols-[1fr_120px_140px_120px] bg-[#0A2540] hover:scale-101 transition-all duration-150 p-3 rounded-xl items-center text-right border border-gray-800/60"
          >
            {/* Proveedor */}
            <div className="text-left font-medium text-white text-xs md:text-sm truncate pr-2">
              {invoice.vendorName}
            </div>

            {/* Fecha */}
            <div className="text-center">
              <span className="inline-block bg-gray-800/40 border border-gray-700/40 text-gray-300 text-xs px-2.5 py-1 rounded-3xl">
                {invoice.dateOfInvoice}
              </span>
            </div>

            {/* N°Factura */}
            <div className="text-gray-400 text-xs md:text-sm font-mono">
              {invoice.invoiceNumber}
            </div>

            <div className="text-center">
              <button
                onClick={() => setSelectedInvoice(invoice)}
                className="w-full max-w-[100px] inline-block px-3 py-1.5 rounded-3xl text-xs font-semibold border-2 border-[#7ED957]/60 text-[#7ED957] transition-all duration-200 shadow-md hover:cursor-pointer"
              >
                Ver Factura
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="w-full flex justify-center items-center pt-6">
        <button
          className="bg-[#0a2540] py-2 px-4 
          rounded-3xl border-2 border-[#7ED957]/60 text-white 
          text-green-500 font-semibold
          hover:cursor-pointer hover:scale-101
          transition-all duration-200"
          onClick={handleRedirectClick}
        >
          Cargar nuevas facturas
        </button>
      </div>
    </div>
  );
};

export default InvoiceListItems;