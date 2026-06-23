import type { InvoiceData, Item } from "../../../types/invoice";

interface InvoiceTable{
  invoice: InvoiceData,
  onClose: ()=>void,
};

const InvoiceTable = ({ invoice, onClose }: InvoiceTable) => {
  return (
    <section className="w-full h-full flex justify-center items-center bg-[#1a1c20] relative border-l-2 border-white">
      <button
        className="absolute top-2 right-2 z-5 hover:scale-110 hover:cursor-pointer text-red-600"
        onClick={onClose}
      >
        X
      </button>

      <div className="w-full max-w-4xl h-[80vh] flex flex-col  bg-[#121417] p-4 shadow-2xl overflow-hidden">
        {/* Invoice Header */}
        <div className="flex flex-wrap gap-3 items-center justify-between p-2 rounded-xl shrink-0">
          <span className="font-bold text-white bg-gray-800 px-4 py-2 rounded-3xl border border-gray-700 text-xs md:text-sm">
            {invoice.vendorName}
          </span>
          <div className="flex gap-2 text-xs">
            <span className="bg-gray-800/60 border border-gray-700/60 px-3 py-1.5 rounded-3xl text-gray-400">
              Fecha:{" "}
              <span className="text-gray-200">{invoice.dateOfInvoice}</span>
            </span>
            <span className="bg-gray-800/60 border border-gray-700/60 px-3 py-1.5 rounded-3xl text-gray-400">
              Factura:{" "}
              <span className="text-gray-200">{invoice.invoiceNumber}</span>
            </span>
          </div>
        </div>
        {/* Table Headers */}
        <div className="grid grid-cols-[1fr_70px_100px_90px_50px] md:grid-cols-[1fr_80px_120px_110px_60px] text-gray-500 text-xs uppercase tracking-wider p-2 shrink-0 text-right">
          <span className="text-left font-semibold">Descripción</span>
          <span className="text-center font-semibold">Cant.</span>
          <span className="font-semibold">P. Unitario</span>
          <span className="font-semibold">Subtotal</span>
          <span className="text-center font-semibold">Acción</span>
        </div>
        {/* Invoice Items */}
        <div className="flex-1 flex flex-col gap-1 overflow-y-auto min-h-0 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
          {invoice.items.map((item: Item, index: number) => (
            <div
              key={index}
              className="grid grid-cols-[1fr_70px_100px_90px_50px] md:grid-cols-[1fr_80px_120px_110px_60px] bg-[#1c1f24] hover:bg-[#22262c] transition-all duration-150 p-3 rounded-xl items-center text-right border border-gray-800/60"
            >
              <div
                className="text-left font-medium text-white text-xs md:text-sm truncate pr-2"
                title={item.description}
              >
                {item.description}
              </div>

              <div className="text-center">
                <span className="inline-block bg-gray-800 border border-gray-700 text-gray-200 text-xs font-semibold px-2.5 py-0.5 rounded-3xl">
                  {item.quantityPurchased}
                </span>
              </div>

              <div>
                <span className="inline-block bg-gray-800/30 border border-gray-700/40 text-gray-300 text-xs md:text-sm px-2 py-0.5 rounded-3xl">
                  ${item.unitPrice.toFixed(2)}
                </span>
              </div>

              <div className="font-bold text-gray-200 text-sm">
                ${(item.quantityPurchased * item.unitPrice).toFixed(2)}
              </div>

              <div className="text-center">
                <button
                  onClick={() => console.log("Eliminar ítem index:", index)}
                  className="text-gray-500 hover:text-red-400 hover:bg-red-500/10 p-1.5 rounded-lg transition-colors duration-200"
                  title="Eliminar ítem"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    className="w-4 h-4 mx-auto"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.74 9l-.34 6m-4.74 0l-.34-6M9 3.5V4.5M15 3.5V4.5M4.5 4.5h15m-1.5 0l-1.07 13.44A2.25 2.25 0 0114.53 20H9.47a2.25 2.25 0 01-2.24-2.06L6.15 4.5h12.3M10 9v6M14 9v6"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
        {/* Invoice Totals */}
        <div className="flex flex-col gap-1 border-t border-gray-800/80 pt-3 space-y-2 shrink-0 font-semibold text-xs md:text-sm text-gray-400">
          <div className="flex justify-between items-center bg-[#1c1f24]/40 px-4 py-2 rounded-xl border border-gray-800/40">
            <span>Subtotal</span>
            <span className="text-gray-200">
              ${invoice.totalCostExcludingTaxes.toFixed(2)}
            </span>
          </div>

          <div className="flex justify-between items-center bg-[#1c1f24]/40 px-4 py-2 rounded-xl border border-gray-800/40">
            <span>Impuestos</span>
            <span className="text-gray-200">
              ${invoice.totalTaxes.toFixed(2)}
            </span>
          </div>

          <div className="flex justify-between items-center bg-[#1c1f24] px-4 py-3 rounded-xl border border-gray-700/30 text-gray-300 text-sm md:text-base">
            <span>Total</span>
            <span className="text-lg md:text-xl font-bold text-[#7ED957]">
              ${invoice.totalCostIncludingTaxes.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InvoiceTable;
