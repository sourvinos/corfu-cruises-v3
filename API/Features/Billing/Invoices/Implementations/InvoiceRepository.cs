using System.Xml;
using System.IO;
using System.Text;
using System.Xml.Linq;
using System.Net.Http;
using System.Xml.Serialization;
using System.Threading.Tasks;

namespace API.Features.Billing.Invoices {

    public class InvoiceRepository : IInvoiceRepository {

        public InvoiceRepository() { }

        public XElement BuildInvoice(InvoiceVM invoiceVM) {
            XNamespace x = "http://www.aade.gr/myDATA/invoice/v1.0";
            XNamespace xsi = "http://www.w3.org/2001/XMLSchema-instance";
            XNamespace icls = "https://www.aade.gr/myDATA/incomeClassificaton/v1.0";
            XNamespace schemaLocation = XNamespace.Get("http://www.aade.gr/myDATA/invoice/v1.0/InvoicesDoc-v0.6.xsd");
            XElement root = new(x + "InvoicesDoc",
                new XAttribute("xmlns", "http://www.aade.gr/myDATA/invoice/v1.0"),
                new XAttribute(xsi + "schemaLocation", schemaLocation),
                new XAttribute(XNamespace.Xmlns + "xsi", "http://www.w3.org/2001/XMLSchema-instance"),
                new XAttribute(XNamespace.Xmlns + "icls", "https://www.aade.gr/myDATA/incomeClassificaton/v1.0"),
                new XAttribute(XNamespace.Xmlns + "ecls", "https://www.aade.gr/myDATA/expensesClassificaton/v1.0")
            );
            XElement invoice = new(x + "invoice",
                new XElement(x + "issuer",
                    new XElement(x + "vatNumber", invoiceVM.Issuer.VatNumber),
                    new XElement(x + "country", invoiceVM.Issuer.Country),
                    new XElement(x + "branch", invoiceVM.Issuer.Branch)),
                // new XElement(x + "address",
                //     new XElement(x + "street", invoiceVM.Issuer.Address.Street),
                //     new XElement(x + "number", invoiceVM.Issuer.Address.Number),
                //     new XElement(x + "postalCode", invoiceVM.Issuer.Address.PostalCode),
                //     new XElement(x + "city", invoiceVM.Issuer.Address.City)),
                new XElement(x + "counterpart",
                    new XElement(x + "vatNumber", invoiceVM.CounterPart.VatNumber),
                    new XElement(x + "country", invoiceVM.CounterPart.Country),
                    new XElement(x + "branch", invoiceVM.CounterPart.Branch),
                        new XElement(x + "address",
                            new XElement(x + "street", invoiceVM.CounterPart.Address.Street),
                            new XElement(x + "number", invoiceVM.CounterPart.Address.Number),
                            new XElement(x + "postalCode", invoiceVM.CounterPart.Address.PostalCode),
                            new XElement(x + "city", invoiceVM.CounterPart.Address.City))),
                new XElement(x + "invoiceHeader",
                    new XElement(x + "series", invoiceVM.InvoiceHeader.Series),
                    new XElement(x + "aa", invoiceVM.InvoiceHeader.Aa),
                    new XElement(x + "issueDate", invoiceVM.InvoiceHeader.IssueDate),
                    new XElement(x + "invoiceType", invoiceVM.InvoiceHeader.InvoiceType),
                    new XElement(x + "currency", invoiceVM.InvoiceHeader.Currency)),
                new XElement(x + "paymentMethods",
                    new XElement(x + "paymentMethodDetails",
                        new XElement(x + "type", invoiceVM.PaymentMethods[0].PaymentMethodDetails.Type),
                        new XElement(x + "amount", invoiceVM.PaymentMethods[0].PaymentMethodDetails.Amount),
                        new XElement(x + "paymentMethodInfo", invoiceVM.PaymentMethods[0].PaymentMethodDetails.PaymentMethodInfo))),
                    new XElement(x + "invoiceDetails",
                    new XElement(x + "lineNumber", invoiceVM.InvoiceDetails[0].LineNumber),
                    new XElement(x + "netValue", invoiceVM.InvoiceDetails[0].NetValue),
                    new XElement(x + "vatCategory", invoiceVM.InvoiceDetails[0].VatCategory),
                    new XElement(x + "vatAmount", invoiceVM.InvoiceDetails[0].VatAmount),
                        new XElement(x + "incomeClassification",
                            new XElement(x + "classificationType", new XAttribute(XNamespace.Xmlns + "icls", x), invoiceVM.InvoiceSummary.IncomeClassification.ClassificationType),
                            new XElement(x + "classificationCategory", new XAttribute(XNamespace.Xmlns + "icls", x), invoiceVM.InvoiceSummary.IncomeClassification.ClassificationCategory),
                            new XElement(x + "amount", new XAttribute(XNamespace.Xmlns + "icls", x), invoiceVM.InvoiceSummary.IncomeClassification.Amount))),
                new XElement(x + "invoiceSummary",
                    new XElement(x + "totalNetValue", invoiceVM.InvoiceSummary.TotalNetValue),
                    new XElement(x + "totalVatAmount", invoiceVM.InvoiceSummary.TotalVatAmount),
                    new XElement(x + "totalWithheldAmount", invoiceVM.InvoiceSummary.TotalWithheldAmount),
                    new XElement(x + "totalFeesAmount", invoiceVM.InvoiceSummary.TotalFeesAmount),
                    new XElement(x + "totalStampDutyAmount", invoiceVM.InvoiceSummary.TotalStampDutyAmount),
                    new XElement(x + "totalOtherTaxesAmount", invoiceVM.InvoiceSummary.TotalOtherTaxesAmount),
                    new XElement(x + "totalDeductionsAmount", invoiceVM.InvoiceSummary.TotalDeductionsAmount),
                    new XElement(x + "totalGrossValue", invoiceVM.InvoiceSummary.TotalGrossValue),
                    new XElement(x + "incomeClassification",
                        new XElement(x + "classificationType", new XAttribute(XNamespace.Xmlns + "icls", x), invoiceVM.InvoiceSummary.IncomeClassification.ClassificationType),
                        new XElement(x + "classificationCategory", new XAttribute(XNamespace.Xmlns + "icls", x), invoiceVM.InvoiceSummary.IncomeClassification.ClassificationCategory),
                        new XElement(x + "amount", new XAttribute(XNamespace.Xmlns + "icls", x), invoiceVM.InvoiceSummary.IncomeClassification.Amount))));
            root.Add(invoice);
            return root;
        }

        public async Task<string> SendInvoiceAsync(XElement invoice) {
            using var client = new HttpClient();
            client.DefaultRequestHeaders.Add("aade-user-id", "demo-sourvinos");
            client.DefaultRequestHeaders.Add("Ocp-Apim-Subscription-Key", "d8683e2328380a9342d7fed8cdead4f3");
            client.DefaultRequestHeaders.Add("Accept", "application/xml");
            string xml = "";
            XmlSerializer serializer = new(typeof(XElement));
            await using (var stringWriter = new Utf8StringWriter()) {
                await using XmlWriter writer = XmlWriter.Create(stringWriter, new XmlWriterSettings() { Async = true });
                serializer.Serialize(writer, invoice);
                xml = stringWriter.ToString();
            }
            HttpContent body = new StringContent(xml, Encoding.UTF8, "application/xml");
            var response = client.PostAsync("https://mydataapidev.aade.gr/SendInvoices", body).Result;
            return await response.Content.ReadAsStringAsync();
            // if (response.IsSuccessStatusCode) {
            //     var content = await response.Content.ReadAsStringAsync();
            //     return content;
            // }
        }

    }

    public class Utf8StringWriter : StringWriter {

        public override Encoding Encoding => Encoding.UTF8;

    }

}