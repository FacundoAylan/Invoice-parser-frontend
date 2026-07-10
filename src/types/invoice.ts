export interface Item {
  description: string;
  quantityPurchased: number;
  unitPriceWithIva: number;
  unitPriceWithoutIva: number;
}

export interface InvoiceData {
  imageId: string;
  vendorName: string;
  dateOfInvoice: string;
  invoiceNumber: string;
  totalCostExcludingTaxes: number;
  totalTaxes: number;
  totalCostIncludingTaxes: number;
  items: Item[];
}

export interface InvoiceList {
  invoice: InvoiceData;
}
