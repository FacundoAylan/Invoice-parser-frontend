import { HiXMark } from "react-icons/hi2";
import type { InvoiceData, Item } from "@/types/invoice";
import { FiDownload } from "react-icons/fi";

interface InvoiceTable{
  invoice: InvoiceData,
  onClose: ()=>void,
};

const InvoiceTable = ({ invoice, onClose }: InvoiceTable) => {
  return (
    <section className="w-full h-full flex justify-center pt-6 px-2">
      <div className="relative w-full max-w-4xl flex flex-col p-4 overflow-hidden bg-gray-700 rounded-3xl">
        <button
          className="absolute top-4 right-4 z-5 hover:scale-110 hover:cursor-pointer text-red-600"
          onClick={onClose}
        >
          <HiXMark className="text-xl" />
        </button>
        {/* Invoice Header */}
        <div className="flex flex-wrap gap-3 items-center justify-between p-2 pt-8 rounded-xl shrink-0">
          <span className="font-bold text-white bg-gray-800 px-4 py-2 rounded-3xl border border-green-700 text-xs md:text-sm">
            {invoice.vendorName}
          </span>
          <div className="flex gap-2 text-xs">
            <span className="bg-[#0A2540] border border-green-700/60 px-3 py-1.5 rounded-3xl text-white">
              Fecha: <span className="text-white">{invoice.dateOfInvoice}</span>
            </span>
            <span className="bg-[#0A2540] border border-green-700/60 px-3 py-1.5 rounded-3xl text-white">
              Factura:{" "}
              <span className="text-white">{invoice.invoiceNumber}</span>
            </span>
          </div>
        </div>
        {/* Table Headers */}
        <div className="grid grid-cols-[1fr_70px_100px_90px] md:grid-cols-[1fr_80px_120px_110px] text-white text-xs uppercase tracking-wider p-2 shrink-0 text-right">
          <span className="text-left font-semibold">Producto</span>
          <span className="text-center font-semibold">Cant.</span>
          <span className="font-semibold">P. Unitario</span>
          <span className="font-semibold">Subtotal</span>
        </div>
        {/* Invoice Items */}
        <div className="flex-1 flex flex-col gap-1 overflow-y-auto min-h-0 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
          {invoice.items.map((item: Item, index: number) => (
            <div
              key={index}
              className="grid grid-cols-[1fr_70px_100px_90px] md:grid-cols-[1fr_80px_120px_110px] bg-[#0A2540] transition-all duration-150 p-3 rounded-xl items-center text-right border border-gray-800/60"
            >
              <div
                className="text-left font-medium text-white text-xs md:text-sm truncate pr-2"
                title={item.description}
              >
                {item.description}
              </div>

              <div className="text-center">
                <span className="inline-block border-2 border-green-700 text-gray-200 text-xs font-semibold px-2.5 py-0.5 rounded-3xl">
                  {item.quantityPurchased}
                </span>
              </div>

              <div>
                <span className="inline-block bg-gray-800/30 border border-gray-700/40 text-gray-300 text-xs md:text-sm px-2 py-0.5 rounded-3xl">
                  ${item.unitPriceWithoutIva.toFixed(2)}
                </span>
              </div>

              <div className="font-bold text-gray-200 text-sm">
                $
                {(item.quantityPurchased * item.unitPriceWithoutIva).toFixed(2)}
              </div>
            </div>
          ))}
        </div>
        <div className="w-full flex justify-center items-center">
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
            onClick={() => "Aqui va el codigo de Nahuel invoice"}
          >
            <FiDownload size={20} />
            <span>Descargar Excel</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default InvoiceTable;
