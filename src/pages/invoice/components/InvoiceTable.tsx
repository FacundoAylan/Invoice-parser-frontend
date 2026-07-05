import { HiXMark } from "react-icons/hi2";
import type { InvoiceData, Item } from "@/types/invoice";

interface InvoiceTable{
  invoice: InvoiceData,
  onClose: ()=>void,
};

const InvoiceTable = ({ invoice, onClose }: InvoiceTable) => {
  return (
    <section className="w-full h-[95%] flex justify-center pt-6 px-2">
      <div className="relative w-full max-w-4xl flex flex-col p-4 overflow-hidden bg-gray-700 rounded-3xl">
        <button
          className="absolute top-4 right-4 z-5 hover:scale-110 hover:cursor-pointer text-red-600"
          onClick={onClose}
        >
          <HiXMark className="text-xl" />
        </button>
        {/* Invoice Header */}
        <div className="flex flex-wrap gap-3 items-center justify-center md:justify-between p-2 pt-8 rounded-xl shrink-0">
          <span className="font-bold text-white bg-gray-800 px-4 py-2 rounded-xl md:rounded-3xl border border-green-700 text-xs md:text-sm">
            {invoice.vendorName}
          </span>
          <div className="flex gap-2 text-xs">
            <span className="bg-[#0A2540] border border-green-700/60 px-3 py-1.5 rounded-xl md:rounded-3xl text-white">
              Fecha: <span className="text-white">{invoice.dateOfInvoice}</span>
            </span>
            <span className="bg-[#0A2540] border border-green-700/60 px-3 py-1.5 rounded-xl md:rounded-3xl text-white">
              Factura:{" "}
              <span className="text-white">{invoice.invoiceNumber}</span>
            </span>
          </div>
        </div>
        {/* Table Headers */}
        {/* Encabezado */}
        <div className="hidden md:grid md:grid-cols-[1fr_80px_120px_110px] text-white text-xs uppercase tracking-wider p-2 shrink-0 text-right">
          <span className="text-left font-semibold">Producto</span>
          <span className="text-center font-semibold">Cant.</span>
          <span className="font-semibold">P. Unitario</span>
          <span className="font-semibold">Subtotal</span>
        </div>

        {/* Items */}
        <div className="flex-1 flex flex-col gap-2 overflow-y-auto min-h-0 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
          {invoice.items.map((item: Item, index: number) => (
            <div
              key={index}
              className="
        grid grid-cols-1 md:grid-cols-[1fr_80px_120px_110px]
        bg-[#0A2540]
        transition-all duration-150
        p-3 rounded-xl
        items-center
        text-right
        border border-gray-800/60
        gap-2
      "
            >
              {/* Mobile: stack info */}
              <div className="flex flex-col md:block text-left">
                <span
                  className="font-medium text-white text-sm truncate"
                  title={item.description}
                >
                  {item.description}
                </span>
                <span className="text-xs text-gray-400 md:hidden">
                  Cant: {item.quantityPurchased}
                </span>
                <span className="text-xs text-gray-400 md:hidden">
                  Unit: ${item.unitPriceWithoutIva.toFixed(2)}
                </span>
                <span className="text-xs text-gray-400 md:hidden">
                  Subtotal: $
                  {(item.quantityPurchased * item.unitPriceWithoutIva).toFixed(
                    2,
                  )}
                </span>
              </div>

              {/* Desktop: columnas separadas */}
              <div className="hidden md:flex justify-center">
                <span className="inline-block border-2 border-green-700 text-gray-200 text-xs font-semibold px-2.5 py-0.5 rounded-3xl">
                  {item.quantityPurchased}
                </span>
              </div>

              <div className="hidden md:block">
                <span className="inline-block bg-gray-800/30 border border-gray-700/40 text-gray-300 text-sm px-2 py-0.5 rounded-3xl">
                  ${item.unitPriceWithoutIva.toFixed(2)}
                </span>
              </div>

              <div className="hidden md:block font-bold text-gray-200 text-sm">
                $
                {(item.quantityPurchased * item.unitPriceWithoutIva).toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InvoiceTable;
