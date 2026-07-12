import type { Item } from "@/types/invoice";

interface InvoiceItemRowProps {
  item: Item;
  isEditing: boolean;
  form: { quantity: number | ""; price: number | "" };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  total: number;
}

export const InvoiceItemRow = ({
  item,
  isEditing,
  form,
  handleInputChange,
  total
}: InvoiceItemRowProps) => {
  return (
    <div
      className="
        grid grid-cols-[1fr_80px_100px_100px]
        bg-[#0A2540]
        px-4 py-2
        rounded-xl
        items-center
        border border-gray-800/60
        transition-all
        duration-150
      "
    >
      <div className="flex flex-col min-w-0">
        <span
          className="font-semibold text-white text-sm truncate"
          title={item.description}
        >
          {item.description}
        </span>
        {/*Mobile description */}
        <div className="flex flex-col gap-0.5 mt-1 md:hidden">
          <span className="text-xs text-gray-400">
            Cant: {isEditing ? form.quantity : item.quantityPurchased}
          </span>

          <span className="text-xs text-gray-400">
            Unit: $
            {isEditing
              ? Number(form.price).toFixed(2)
              : item.unitPriceWithoutIva.toFixed(2)}
          </span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row md:grid md:grid-cols-[70px_100px_100px] items-center gap-4 w-full md:justify-items-center">
        {/* Quantity */}
        <div
          className={`${isEditing ? "flex" : "hidden md:flex"} items-center justify-center`}
        >
          {isEditing ? (
            <input
              name="quantity"
              value={form.quantity}
              onChange={handleInputChange}
              className="w-[50%] text-center bg-gray-900 text-white text-sm font-semibold p-2 border border-green-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500"
            />
          ) : (
            <span className="inline-block border-2 border-green-700 text-gray-200 text-xs font-semibold px-2.5 py-0.5 rounded-3xl">
              {item.quantityPurchased}
            </span>
          )}
        </div>

        {/* Price */}
        <div
          className={`${isEditing ? "flex" : "hidden md:flex"} items-center justify-start`}
        >
          {isEditing ? (
            <div className="flex items-center bg-gray-900 border border-gray-700 rounded-lg p-2 w-full md:w-24">
              <span className="text-gray-500">$</span>

              <input
                name="price"
                value={form.price}
                onChange={handleInputChange}
                className="w-[75%] bg-transparent text-right text-white text-sm focus:outline-none"
              />
            </div>
          ) : (
            <span className="inline-block bg-gray-800/30 border border-gray-700/40 text-gray-300 text-sm rounded-3xl">
              ${item.unitPriceWithoutIva.toFixed(2)}
            </span>
          )}
        </div>

        {/* Total */}
        <div className="text-right flex items-center sm:items-end sm:flex-col justify-between border-t sm:border-0 border-gray-800 pt-2 sm:pt-0 w-full sm:w-auto">
          <span className="text-xs text-gray-400 sm:hidden">Total:</span>

          <span className="font-bold text-green-400 text-sm">
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
