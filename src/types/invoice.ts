// -----------------Interface Invoice--------------------------
export interface Item {
  description: string;
  quantityPurchased: number;
  unitPriceWithoutIva: number;
}

export interface InvoiceData {
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
//---------------------------------------------------