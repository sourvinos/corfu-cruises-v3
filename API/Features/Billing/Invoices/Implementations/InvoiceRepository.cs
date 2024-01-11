using System.Xml;
using System.IO;
using System.Text;
using System.Xml.Linq;

namespace API.Features.Billing.Invoices {

    public class InvoiceRepository : IInvoiceRepository {

        public InvoiceRepository() { }

        public void BuildInvoiceXML(InvoiceVM invoiceVM) {
            XNamespace aw = "http://www.aade.gr/myDATA/invoice/v1.0";
            XNamespace xsi = "http://www.w3.org/2001/XMLSchema-instance";
            XNamespace schemaLocation = XNamespace.Get("http://www.aade.gr/myDATA/invoice/v1.0/InvoicesDoc-v0.6.xsd");
            XElement root = new(aw + "InvoicesDoc",
                new XAttribute("xmlns", "http://www.aade.gr/myDATA/invoice/v1.0"),
                new XAttribute(XNamespace.Xmlns + "xsi", "http://www.w3.org/2001/XMLSchema-instance"),
                new XAttribute(XNamespace.Xmlns + "icls", "https://www.aade.gr/myDATA/incomeClassificaton/v1.0"),
                new XAttribute(XNamespace.Xmlns + "ecls", "https://www.aade.gr/myDATA/expensesClassificaton/v1.0"),
                new XAttribute(xsi + "schemaLocation", schemaLocation)
            );
            XElement invoice = new(aw + "invoice",
                new XElement(aw + "issuer",
                    new XElement(aw + "vatNumber", invoiceVM.Issuer.VatNumber),
                    new XElement(aw + "country", invoiceVM.Issuer.Country),
                    new XElement(aw + "branch", invoiceVM.Issuer.Branch)),
                        new XElement(aw + "address",
                            new XElement(aw + "street", invoiceVM.Issuer.Address.Street),
                            new XElement(aw + "number", invoiceVM.Issuer.Address.Number),
                            new XElement(aw + "postalCode", invoiceVM.Issuer.Address.PostalCode),
                            new XElement(aw + "city", invoiceVM.Issuer.Address.City)),
                new XElement(aw + "counterpart",
                    new XElement(aw + "vatNumber", invoiceVM.CounterPart.VatNumber),
                    new XElement(aw + "country", invoiceVM.CounterPart.Country),
                    new XElement(aw + "branch", invoiceVM.CounterPart.Branch),
                        new XElement(aw + "address",
                            new XElement(aw + "street", invoiceVM.CounterPart.Address.Street),
                            new XElement(aw + "number", invoiceVM.CounterPart.Address.Number),
                            new XElement(aw + "postalCode", invoiceVM.CounterPart.Address.PostalCode),
                            new XElement(aw + "city", invoiceVM.CounterPart.Address.City))),
                new XElement(aw + "invoiceHeader",
                    new XElement(aw + "series", invoiceVM.InvoiceHeader.Series),
                    new XElement(aw + "aa", invoiceVM.InvoiceHeader.Aa),
                    new XElement(aw + "issueDate", invoiceVM.InvoiceHeader.IssueDate),
                    new XElement(aw + "invoiceType", invoiceVM.InvoiceHeader.InvoiceType),
                new XElement(aw + "paymentMethods",
                    new XElement(aw + "paymentMethodDetails",
                        new XElement(aw + "type", invoiceVM.PaymentMethods[0].PaymentMethodDetails.Type),
                        new XElement(aw + "amount", invoiceVM.PaymentMethods[0].PaymentMethodDetails.Amount),
                        new XElement(aw + "paymentMethodInfo", invoiceVM.PaymentMethods[0].PaymentMethodDetails.PaymentMethodInfo))),
                    new XElement(aw + "invoiceDetails",
                    new XElement(aw + "lineNumber", invoiceVM.InvoiceDetails[0].LineNumber),
                    new XElement(aw + "netValue", invoiceVM.InvoiceDetails[0].NetValue),
                    new XElement(aw + "vatCategory", invoiceVM.InvoiceDetails[0].VatCategory),
                    new XElement(aw + "vatAmount", invoiceVM.InvoiceDetails[0].VatAmount)),
                new XElement(aw + "invoiceSummary",
                    new XElement(aw + "totalNetValue", invoiceVM.InvoiceSummary.TotalNetValue),
                    new XElement(aw + "totalVatAmount", invoiceVM.InvoiceSummary.TotalVatAmount),
                    new XElement(aw + "totalWithheldAmount", invoiceVM.InvoiceSummary.TotalWithheldAmount),
                    new XElement(aw + "totalFeesAmount", invoiceVM.InvoiceSummary.TotalFeesAmount),
                    new XElement(aw + "totalStampDutyAmount", invoiceVM.InvoiceSummary.TotalStampDutyAmount),
                    new XElement(aw + "totalOtherTaxesAmount", invoiceVM.InvoiceSummary.TotalOtherTaxesAmount),
                    new XElement(aw + "totalDeductionsAmount", invoiceVM.InvoiceSummary.TotalDeductionsAmount),
                    new XElement(aw + "totalGrossValue", invoiceVM.InvoiceSummary.TotalGrossValue))));
            root.Add(invoice);
            string docPath = Directory.GetCurrentDirectory() + "\\Output\\File.xml";
            using StreamWriter outputFile = new(Path.Combine(docPath));
            outputFile.WriteLine(root);
        }

    }

}