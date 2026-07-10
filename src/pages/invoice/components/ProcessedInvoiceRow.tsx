import type { InvoiceData } from "@/types/invoice";

interface ProcessedInvoiceRowProps {
  invoice: InvoiceData;
  onSelect: () => void;
}

const ProcessedInvoiceRow = ({
  invoice,
  onSelect,
}: ProcessedInvoiceRowProps) => {
  return (
    <div className="grid grid-cols-[1fr_100px] md:grid-cols-[1fr_120px_140px_120px] bg-[#0A2540] transition-all duration-150 p-3 rounded-xl items-center border border-gray-800/60">
      <div className="text-left font-medium text-white text-xs md:text-sm truncate pr-2">
        {invoice.vendorName}
      </div>

      <div className="hidden md:flex justify-center">
        <span className="inline-block bg-gray-800/40 border border-gray-700/40 text-gray-300 text-xs px-2.5 py-1 rounded-3xl">
          {invoice.dateOfInvoice}
        </span>
      </div>

      <div className="hidden md:block text-right text-gray-400 text-xs md:text-sm font-mono">
        {invoice.invoiceNumber}
      </div>

      <div className="flex justify-center">
        <button
          onClick={onSelect}
          className="w-full max-w-25 px-3 py-1.5 rounded-3xl text-xs font-semibold border-2 border-[#7ED957]/60 text-[#7ED957] transition-all duration-200 shadow-md hover:cursor-pointer hover:scale-105"
        >
          Ver factura
        </button>
      </div>
    </div>
  );
};

export default ProcessedInvoiceRow;
