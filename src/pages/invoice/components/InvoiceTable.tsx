import { useState, type ChangeEvent } from "react";
import { HiXMark } from "react-icons/hi2";
import type { Item } from "@/types/invoice";
import { useImagesStore } from "@/store/images.store";
import { useInvoiceStore } from "@/store/invoices.store"; // Asegúrate de importar tu store de facturas
import ImageInspector from "@/components/imageInspector/ImageInspector";
import { InvoiceItemRow } from "./InvoiceItemRow";

interface InvoiceTableProps {
  imageId: string;
  onClose: () => void;
}

type TableFormState = {
  [itemIndex: number]: {
    quantity: number | "";
    price: number | "";
  };
};

const InvoiceTable = ({ imageId, onClose }: InvoiceTableProps) => {

  const invoices = useInvoiceStore((state)=> state.invoices);
  const invoicesImage = useImagesStore((state) => state.images);
  const updateInvoiceItem = useInvoiceStore((state) => state.updateInvoiceItem);

  const invoice = invoices.find((inv) => inv.imageId == imageId )
  const invoiceImage = invoicesImage.find((img) => img.imageId === invoice?.imageId);

  const [isEditing, setIsEditing] = useState(false);

  // Initialize invoice editng state
  const [form, setForm] = useState<TableFormState>({});

  const handleEditStart = () => {
    const initialState: TableFormState = {};
    invoice?.items.forEach((item, index) => {
      initialState[index] = {
        quantity: item.quantityPurchased,
        price: item.unitPriceWithoutIva,
      };
    });
    setForm(initialState);
    setIsEditing(true);
  };

  const handleInputChange = (
    index: number,
    e: ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [index]: {
        ...prev[index],
        [name]: value === "" ? 0 : Number(value),
      },
    }));
  };

  // Save updated invoice item to zustand store
  const handleSave = () => {
    invoice?.items.forEach((item, index) => {
      const editedValues = form[index];
      if (editedValues) {
        const updatedItem: Item = {
          ...item,
          quantityPurchased:
            editedValues.quantity === "" ? 0 : editedValues.quantity,
          unitPriceWithoutIva:
            editedValues.price === "" ? 0 : editedValues.price,
        };
        updateInvoiceItem(invoice?.imageId, index, updatedItem);
      }
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setForm({});
    setIsEditing(false);
  };

  return (
    <section className="w-full h-[95%] flex justify-center gap-2 pt-6 px-2">
      {/* Invoice image */}
      <div className="w-full h-full bg-gray-600 rounded-3xl">
        {invoiceImage && <ImageInspector image={invoiceImage} />}
      </div>

      {/* Close button & Content container */}
      <div className="relative w-full max-w-4xl flex flex-col p-4 overflow-hidden bg-gray-700 rounded-3xl">
        <button
          type="button"
          className="absolute top-4 right-4 z-5 hover:scale-110 hover:cursor-pointer text-red-600"
          onClick={onClose}
        >
          <HiXMark className="text-xl" />
        </button>

        {/* Invoice Header */}
        <div className="flex flex-wrap gap-3 items-center justify-center md:justify-between p-2 pt-8 rounded-xl shrink-0">
          <span className="font-bold text-white bg-gray-800 px-4 py-2 rounded-xl md:rounded-3xl border border-green-700 text-xs md:text-sm truncate max-w-[150px] md:max-w-[250px] inline-block">
            {invoice?.vendorName}
          </span>
          <div className="flex gap-2 text-xs">
            <span className="bg-[#0A2540] border border-green-700/60 px-3 py-1.5 rounded-xl md:rounded-3xl text-white">
              Fecha:{" "}
              <span className="text-white">{invoice?.dateOfInvoice}</span>
            </span>
            <span className="bg-[#0A2540] border border-green-700/60 px-3 py-1.5 rounded-xl md:rounded-3xl text-white">
              Factura:{" "}
              <span className="text-white">{invoice?.invoiceNumber}</span>
            </span>
          </div>
        </div>

        {/* Table Headers */}
        <div className="w-full grid grid-cols-[1fr_80px_100px_100px] text-white text-xs uppercase tracking-wider px-4 py-2 shrink-0 border-b border-gray-800/40">
          <span className="text-left font-semibold">Producto</span>

          <span className="text-center font-semibold">Cant.</span>

          <span className="text-right font-semibold">P. Unitario</span>

          <span className="text-right font-semibold">Subtotal</span>
        </div>

        {/* Items Rows */}
        <div className="flex-1 flex flex-col gap-3 overflow-y-auto min-h-0 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
          {invoice?.items.map((item: Item, index: number) => {
            const rowForm = form[index] || {
              quantity: item.quantityPurchased,
              price: item.unitPriceWithoutIva,
            };

            const rowTotal = (rowForm.quantity || 0) * (rowForm.price || 0);

            return (
              <InvoiceItemRow
                key={`${invoice?.imageId}-${index}`}
                item={item}
                isEditing={isEditing}
                form={rowForm}
                handleInputChange={(e) => handleInputChange(index, e)}
                total={rowTotal}
              />
            );
          })}
        </div>

        {/* Action Table Buttons */}
        <div className="flex flex-row justify-end gap-2 text-xs w-full sm:w-auto mt-4 shrink-0">
          {isEditing ? (
            <div className="flex gap-2 w-full sm:w-auto">
              <button
                type="button"
                onClick={handleCancel}
                className="bg-red-500 text-white font-medium px-4 py-2 rounded-lg border border-gray-700 transition-all duration-200 hover:bg-red-700 hover:scale-105 hover:cursor-pointer flex-1 sm:flex-none whitespace-nowrap"
              >
                Cancelar
              </button>

              <button
                type="button"
                onClick={handleSave}
                className="bg-[#7ED957] text-[#0A2540] font-semibold px-4 py-2 rounded-lg transition-all duration-200 hover:bg-[#6CC84A] hover:scale-105 hover:cursor-pointer flex-1 sm:flex-none whitespace-nowrap"
              >
                Guardar
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={handleEditStart}
              className="bg-[#0A2540] text-white font-bold px-5 py-2 rounded-lg border border-gray-700 transition-all duration-200 hover:scale-105 hover:cursor-pointer w-full sm:w-auto whitespace-nowrap"
            >
              Editar Factura
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default InvoiceTable;
