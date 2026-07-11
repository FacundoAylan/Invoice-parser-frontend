import { useMemo, useState } from "react";
import type { ChangeEvent } from "react";
import type { Item } from "@/types/invoice";

interface InvoiceItemRowProps {
  item: Item;
  isEditing: boolean;
}

type FormState = {
  quantity: number;
  price: number;
};

export const InvoiceItemRow = ({ item, isEditing }: InvoiceItemRowProps) => {
  const [form, setForm] = useState<FormState>({
    quantity: item.quantityPurchased,
    price: item.unitPriceWithoutIva,
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value === "" ? 0 : Number(value),
    }));
  };

  const total = useMemo(
    () => form.quantity * form.price,
    [form.quantity, form.price],
  );

  return (
    <div
      className="
        grid grid-cols-[0.8fr_80px_100px_100px]
        bg-[#0A2540]
        p-4
        rounded-xl
        items-center
        border border-gray-800/60
        transition-all
        duration-150
      "
    >
      <div className="flex flex-col gap-1 min-w-0">
        <span
          className="font-semibold text-white text-sm truncate"
          title={item.description}
        >
          {item.description}
        </span>

        <div className="flex flex-col gap-0.5 mt-1 md:hidden">
          <span className="text-xs text-gray-400">
            Cant: {isEditing ? form.quantity : item.quantityPurchased}
          </span>

          <span className="text-xs text-gray-400">
            Unit: $
            {isEditing
              ? form.price.toFixed(2)
              : item.unitPriceWithoutIva.toFixed(2)}
          </span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row md:grid md:grid-cols-[80px_120px_100px_auto] items-center gap-4 w-full md:justify-items-end">
        {/* Cantidad */}
        <div
          className={`${isEditing ? "flex" : "hidden md:flex"} items-center justify-center`}
        >
          {isEditing ? (
            <input
              name="quantity"
              value={form.quantity}
              onChange={handleInputChange}
              className="w-full text-center bg-gray-900 text-white text-sm font-semibold px-2 py-1.5 border border-green-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500"
            />
          ) : (
            <span 
              className="inline-block border-2 border-green-700 text-gray-200 text-xs font-semibold px-2.5 py-0.5 rounded-3xl"
            >
              {item.quantityPurchased}
            </span>
          )}
        </div>

        {/* Precio */}
        <div
          className={`${isEditing ? "flex" : "hidden md:flex"} items-center justify-end`}
        >
          {isEditing ? (
            <div className="flex items-center bg-gray-900 border border-gray-700 rounded-lg px-2 py-1.5 w-full md:w-28">
              <span className="text-gray-500 mr-1">$</span>

              <input
                name="price"
                value={form.price}
                onChange={handleInputChange}
                className="w-full bg-transparent text-right text-white text-sm focus:outline-none"
              />
            </div>
          ) : (
            <span className="inline-block bg-gray-800/30 border border-gray-700/40 text-gray-300 text-sm px-2 py-0.5 rounded-3xl">
              ${item.unitPriceWithoutIva.toFixed(2)}
            </span>
          )}
        </div>

        {/* Total */}
        <div className="text-right flex items-center sm:items-end sm:flex-col justify-between border-t sm:border-0 border-gray-800 pt-2 sm:pt-0 w-full sm:w-auto">
          <span className="text-xs text-gray-400 sm:hidden">Total:</span>

          <span className="font-bold text-green-400 text-base">
            $
            {(isEditing
              ? total
              : item.quantityPurchased * item.unitPriceWithoutIva
            ).toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
};
