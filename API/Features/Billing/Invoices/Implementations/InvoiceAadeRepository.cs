using System.Xml;
using System.IO;
using System.Text;
using System.Xml.Linq;
using System.Net.Http;
using System.Xml.Serialization;
using System.Threading.Tasks;

namespace API.Features.Billing.Invoices {

    public class InvoiceAadeRepository : IInvoiceAadeRepository {

        public InvoiceAadeRepository() { }

        public void BuildXMLAsync(InvoiceVM invoiceVM) {

            using StringWriter sw = new();
            using XmlTextWriter xtw = new("fileName.xml", null);
            xtw.Namespaces = false;
            xtw.Formatting = Formatting.Indented;
            xtw.WriteStartElement("InvoicesDoc");
            xtw.WriteAttributeString("xmlns", "http://www.aade.gr/myDATA/invoice/v1.0");
            xtw.WriteAttributeString("xmlns:xsi", "http://www.w3.org/2001/XMLSchema-instance");
            xtw.WriteAttributeString("xmlns:icls", "https://www.aade.gr/myDATA/incomeClassificaton/v1.0");
            xtw.WriteAttributeString("xmlns:ecls", "https://www.aade.gr/myDATA/expensesClassificaton/v1.0");
            xtw.WriteAttributeString("xsi:schemaLocation", "http://www.aade.gr/myDATA/invoice/v1.0/InvoicesDoc-v0.6.xsd");
            xtw.WriteStartElement("invoice");
            xtw.WriteStartElement("issuer");
            xtw.WriteElementString("vatNumber", invoiceVM.Issuer.VatNumber);
            xtw.WriteElementString("country", invoiceVM.Issuer.Country);
            xtw.WriteElementString("branch", invoiceVM.Issuer.Branch.ToString());
            xtw.WriteEndElement();
            xtw.WriteStartElement("counterpart");
            xtw.WriteElementString("vatNumber", invoiceVM.CounterPart.VatNumber);
            xtw.WriteElementString("country", invoiceVM.CounterPart.Country);
            xtw.WriteElementString("branch", invoiceVM.CounterPart.Branch.ToString());
            xtw.WriteStartElement("address");
            xtw.WriteElementString("postalCode", invoiceVM.CounterPart.Address.PostalCode);
            xtw.WriteElementString("city", invoiceVM.CounterPart.Address.City);
            xtw.WriteEndElement();
            xtw.WriteEndElement();
            xtw.WriteStartElement("invoiceHeader");
            xtw.WriteElementString("series", invoiceVM.InvoiceHeader.Series);
            xtw.WriteElementString("aa", invoiceVM.InvoiceHeader.Aa);
            xtw.WriteElementString("issueDate", invoiceVM.InvoiceHeader.IssueDate);
            xtw.WriteElementString("invoiceType", invoiceVM.InvoiceHeader.InvoiceType);
            xtw.WriteElementString("currency", invoiceVM.InvoiceHeader.Currency);
            xtw.WriteEndElement();
            xtw.WriteStartElement("paymentMethods");
            xtw.WriteStartElement("paymentMethodDetails");
            xtw.WriteElementString("type", invoiceVM.PaymentMethods[0].PaymentMethodDetails.Type.ToString());
            xtw.WriteElementString("amount", invoiceVM.PaymentMethods[0].PaymentMethodDetails.Amount.ToString());
            xtw.WriteEndElement();
            xtw.WriteEndElement();
            xtw.WriteStartElement("invoiceDetails");
            xtw.WriteElementString("lineNumber", invoiceVM.InvoiceDetails[0].LineNumber.ToString());
            xtw.WriteElementString("netValue", invoiceVM.InvoiceDetails[0].NetValue.ToString());
            xtw.WriteElementString("vatCategory", invoiceVM.InvoiceDetails[0].VatCategory.ToString());
            xtw.WriteElementString("vatAmount", invoiceVM.InvoiceDetails[0].VatAmount.ToString());
            xtw.WriteStartElement("incomeClassification");
            xtw.WriteElementString("icls:classificationType", invoiceVM.InvoiceSummary.IncomeClassification.ClassificationType);
            xtw.WriteElementString("icls:classificationCategory", invoiceVM.InvoiceSummary.IncomeClassification.ClassificationCategory);
            xtw.WriteElementString("icls:amount", invoiceVM.InvoiceSummary.IncomeClassification.Amount.ToString());
            xtw.WriteEndElement();
            xtw.WriteEndElement();
            xtw.WriteStartElement("invoiceSummary");
            xtw.WriteElementString("totalNetValue", invoiceVM.InvoiceSummary.TotalNetValue.ToString());
            xtw.WriteElementString("totalVatAmount", invoiceVM.InvoiceSummary.TotalVatAmount.ToString());
            xtw.WriteElementString("totalWithheldAmount", invoiceVM.InvoiceSummary.TotalWithheldAmount.ToString());
            xtw.WriteElementString("totalFeesAmount", invoiceVM.InvoiceSummary.TotalFeesAmount.ToString());
            xtw.WriteElementString("totalStampDutyAmount", invoiceVM.InvoiceSummary.TotalStampDutyAmount.ToString());
            xtw.WriteElementString("totalOtherTaxesAmount", invoiceVM.InvoiceSummary.TotalOtherTaxesAmount.ToString());
            xtw.WriteElementString("totalDeductionsAmount", invoiceVM.InvoiceSummary.TotalDeductionsAmount.ToString());
            xtw.WriteElementString("totalGrossValue", invoiceVM.InvoiceSummary.TotalGrossValue.ToString());
            xtw.WriteStartElement("incomeClassification");
            xtw.WriteElementString("icls:classificationType", invoiceVM.InvoiceSummary.IncomeClassification.ClassificationType);
            xtw.WriteElementString("icls:classificationCategory", invoiceVM.InvoiceSummary.IncomeClassification.ClassificationCategory);
            xtw.WriteElementString("icls:amount", invoiceVM.InvoiceSummary.IncomeClassification.Amount.ToString());
            xtw.WriteEndElement();
            xtw.WriteEndElement();
            xtw.WriteEndElement();
            xtw.WriteEndElement();
            xtw.Close();
        }

        public async Task<string> SendInvoiceAsync(XElement invoice) {
            using var client = new HttpClient();
            client.DefaultRequestHeaders.Add("aade-user-id", "demo-sourvinos");
            client.DefaultRequestHeaders.Add("Ocp-Apim-Subscription-Key", "d8683e2328380a9342d7fed8cdead4f3");
            client.DefaultRequestHeaders.Add("Accept", "application/xml");
            string xml = "";
            XmlSerializer serializer = new(typeof(XElement));
            await using (var stringWriter = new StringWriter()) {
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

        public void WriteXML(XElement invoice) {
            string docPath = Directory.GetCurrentDirectory() + "\\Output\\File.xml";
            using StreamWriter outputFile = new(Path.Combine(docPath));
            outputFile.WriteLine(invoice);
        }

    }

}