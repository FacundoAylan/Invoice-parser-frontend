import { HiXMark } from "react-icons/hi2";
import type { InvoiceData, Item } from "@/types/invoice";
import { useImagesStore } from "@/store/images.store";
import ImageInspector from "@/components/imageInspector/ImageInspector";
import { InvoiceItemRow } from "./InvoiceItemRow";
import { useState } from "react";

interface InvoiceTable{
  invoice: InvoiceData,
  onClose: ()=>void,
};

const InvoiceTable = ({ invoice, onClose }: InvoiceTable) => {

  const invoicesImage = useImagesStore((state) => state.images);

  const invoiceImage = invoicesImage.find((img) => img.imageId === invoice.imageId);

  const [isEditing, setIsEditing] = useState(false);
  const handleSave = () => {};
  const handleCancel = () => {};


  return (
    <section className="w-full h-[95%] flex justify-center gap-2 pt-6 px-2">
      {/* Invoice image */}
      <div className="w-full h-full bg-gray-600 rounded-3xl">
        {invoiceImage && <ImageInspector image={invoiceImage} />}
      </div>

      {/*Close button */}
      <div className="relative w-full max-w-4xl flex flex-col p-4 overflow-hidden bg-gray-700 rounded-3xl">
        <button
          className="absolute top-4 right-4 z-5 hover:scale-110 hover:cursor-pointer text-red-600"
          onClick={onClose}
        >
          <HiXMark className="text-xl" />
        </button>

        {/* Invoice Header */}
        <div className="flex flex-wrap gap-3 items-center justify-center md:justify-between p-2 pt-8 rounded-xl shrink-0">
          <span className="font-bold text-white bg-gray-800 px-4 py-2 rounded-xl md:rounded-3xl border border-green-700 text-xs md:text-sm truncate max-w-[150px] md:max-w-[250px] inline-block">
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
        {/* Header */}
        <div className="w-full grid grid-cols-[1fr_80px_100px_100px] text-white text-xs uppercase tracking-wider px-4 py-2 shrink-0 border-b border-gray-800/40">
          <span className="text-left font-semibold">Producto</span>
          <span className="text-center font-semibold">Cant.</span>
          <span className="text-right font-semibold">P. Unitario</span>
          <span className="text-right font-semibold">Subtotal</span>
        </div>

        {/* Items */}
        <div className="flex-1 flex flex-col gap-3 overflow-y-auto min-h-0 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
          {invoice.items.map((item: Item, index: number) => (
            <InvoiceItemRow
              key={`${invoice.imageId}-${index}`}
              item={item}
              isEditing={isEditing}
            />
          ))}
        </div>

        {/* Button */}
        <div className="flex flex-row justify-end gap-2 text-xs w-full sm:w-auto mt-2 sm:mt-0">
          {isEditing ? (
            <div className="flex gap-2 w-full sm:w-auto">
              <button
              onClick={handleCancel}
                className="
                  bg-red-500 text-white font-medium px-4 py-2 rounded-lg
                  border border-gray-700
                  transition-transform duration-200 ease-in-out
                  hover:bg-red-700 hover:scale-105 hover:cursor-pointer
                  flex-1 sm:flex-none whitespace-nowrap
                "
              >
                Cancelar
              </button>

              <button
                onClick={handleSave}
                className="
                  bg-[#7ED957] text-[#0A2540] font-semibold px-4 py-2 rounded-lg
                  transition-transform duration-200 ease-in-out
                  hover:bg-[#6CC84A] hover:scale-105 hover:cursor-pointer
                  flex-1 sm:flex-none whitespace-nowrap
                "
              >
                Guardar
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="
                bg-[#0A2540] text-white font-bold px-4 py-2 rounded-lg
                border border-gray-700
                transition-transform duration-200 ease-in-out
                hover:scale-105 hover:cursor-pointer
                w-full sm:w-auto whitespace-nowrap
              "
            >
              Editar
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default InvoiceTable;
