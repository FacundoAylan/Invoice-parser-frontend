import { useNavigate } from "react-router";
import { FiDownload, FiPlus, FiX } from "react-icons/fi";
import type { InvoiceData } from "@/types/invoice";
import type { StoredImage } from "@/store/images.store";
import exportInvoicesToExcel from "@/utils/excel/exportInvoicesToExcel";
import { useInvoiceStore } from "@/store/invoices.store";
import { useImagesStore } from "@/store/images.store";
import ImageInspector from "@/components/imageInspector/ImageInspector";
import { useState } from "react";
import PendingImageRow from "./PendingImageRow";
import ProcessedInvoiceRow from "./ProcessedInvoiceRow";

interface InvoiceListItemsProps {
  invoices: InvoiceData[];
  pendingImages: StoredImage[];
  showPending: boolean;
  setSelectedInvoice: (imageId: string) => void;
}

const InvoiceListItems = ({
  invoices,
  pendingImages,
  showPending,
  setSelectedInvoice,
}: InvoiceListItemsProps) => {
  const [selectedImg, setSelectedImg] = useState<StoredImage | null>(null);
  const navigate = useNavigate();
  const clearInvoices = useInvoiceStore((state) => state.clearInvoices);
  const clearImages = useImagesStore((state) => state.clearImages);

  const handleNewInvoices = () => {
    clearInvoices();
    clearImages();
    navigate("/");
  };

  const viewImage = !!selectedImg;

  return (
    <div className="relative w-full h-full mx-auto p-2 shadow-2xl">
      {(!showPending || !viewImage) && (
        <div className="grid grid-cols-[1fr_100px] md:grid-cols-[1fr_120px_140px_120px] text-gray-500 text-xs uppercase tracking-wider px-4 pb-2">
          <span className="text-left font-semibold">
            {showPending ? "Vista previa" : "Proveedor"}
          </span>
          <span className="hidden md:block text-center font-semibold">
            {showPending ? "Formato" : "Fecha"}
          </span>
          <span className="hidden md:block text-right font-semibold">
            {showPending ? "ID de imagen" : "Nº Factura"}
          </span>
          <span className="text-center font-semibold">Acción</span>
        </div>
      )}

      <div className="w-full flex gap-4 overflow-hidden max-h-[90vh]">
        <div
          className={`max-h-[330px] flex flex-col gap-2 transition-all duration-500 ease-in-out ${viewImage && showPending ? "w-1/2" : "w-full"} px-4 overflow-y-scroll`}
        >
          {showPending ? (
            pendingImages.length === 0 ? (
              <p className="text-gray-400 text-center py-8">
                No quedan imágenes pendientes de procesar 🎉
              </p>
            ) : (
              pendingImages.map((img) => (
                <PendingImageRow
                  key={img.imageId}
                  img={img}
                  viewImage={viewImage}
                  onViewClick={() => setSelectedImg(img)}
                />
              ))
            )
          ) : invoices.length === 0 ? (
            <p className="text-gray-400 text-center py-8">
              No hay facturas procesadas.
            </p>
          ) : (
            invoices.map((invoice, index) => (
              <ProcessedInvoiceRow
                key={index}
                invoice={invoice}
                onSelect={() => setSelectedInvoice(invoice.imageId)}
              />
            ))
          )}
        </div>

        {showPending && (
          <div
            className={`relative overflow-hidden transition-all duration-500 ease-in-out h-[90vh] ${
              viewImage
                ? "w-1/2 opacity-100"
                : "w-0 opacity-0 pointer-events-none"
            }`}
          >
            {selectedImg && (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setSelectedImg(null)}
                  className="absolute top-4 right-4 z-50 p-1 text-red-500 rounded-3xl bg-gray-600 hover:text-red-600 transition-all cursor-pointer"
                >
                  <FiX size={24} />
                </button>
                <ImageInspector image={selectedImg} />
              </div>
            )}
          </div>
        )}
      </div>

      {!showPending && (
        <div className="w-full flex flex-wrap justify-center items-center gap-4 pt-6">
          <button
            type="button"
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0A2540] text-white font-semibold transition-all duration-200 hover:bg-[#123557] hover:shadow-lg hover:-translate-y-0.5 hover:cursor-pointer active:translate-y-0"
            onClick={() => navigate("/")}
          >
            <FiPlus size={20} />
            <span>Agregar más facturas</span>
          </button>
          <button
            type="button"
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#8fbe4e] text-[#0A2540] font-semibold transition-all duration-200 hover:bg-[#91E86A] hover:shadow-lg hover:-translate-y-0.5 hover:cursor-pointer active:translate-y-0"
            onClick={() =>
              exportInvoicesToExcel(invoices.map((inv) => ({ invoice: inv })))
            }
          >
            <FiDownload size={20} />
            <span>Descargar facturas</span>
          </button>

          <button
            type="button"
            onClick={handleNewInvoices}
            className="px-6 py-3 rounded-xl border border-[#7ED957] bg-[#0A2540] text-white font-semibold transition-all duration-200 hover:bg-[#12345A] hover:shadow-lg hover:-translate-y-0.5 hover:cursor-pointer active:translate-y-0"
          >
            Cargar nuevas facturas
          </button>
        </div>
      )}
    </div>
  );
};

export default InvoiceListItems;
