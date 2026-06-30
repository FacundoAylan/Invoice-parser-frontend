import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import type { InvoiceList } from "@/types/invoice";

const exportInvoicesToExcel = async (invoices: InvoiceList[]) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Facturas procesadas");

  worksheet.columns = [
    { header: "Proveedor", key: "vendorName", width: 25 },
    { header: "Fecha", key: "dateOfInvoice", width: 15 },
    { header: "Nro Factura", key: "InvoiceNumber", width: 20 },
    { header: "Insumo", key: "description", width: 45 },
    { header: "Unidades", key: "quantityPurchased", width: 10 },
    { header: "Precio Unitario (Con IVA)", key: "UnitPriceWithIva", width: 20 },
    {
      header: "Precio Unitario (SIN IVA)",
      key: "UnitPriceWithoutIva",
      width: 20,
    },
  ];

  invoices.forEach(({ invoice }) => {
    invoice.items.forEach((item) => {
      worksheet.addRow({
        vendorName: invoice.vendorName,
        dateOfInvoice: invoice.dateOfInvoice,
        InvoiceNumber: invoice.invoiceNumber,
        description: item.description,
        quantityPurchased: item.quantityPurchased,
        UnitPriceWithIva: item.unitPriceWithIva,
        UnitPriceWithoutIva: item.unitPriceWithoutIva,
      });
    });
  });

  worksheet.getColumn("UnitPriceWithIva").numFmt = '"$"#,##0.00';
  worksheet.getColumn("UnitPriceWithoutIva").numFmt = '"$"#,##0.00';

  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  saveAs(
    blob,
    `Reporte_Facturas_${new Date().toISOString().split("T")[0]}.xlsx`,
  );
};

export default exportInvoicesToExcel;
