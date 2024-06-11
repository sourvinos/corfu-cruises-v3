using API.Infrastructure.Classes;
using API.Infrastructure.Helpers;
using Microsoft.AspNetCore.Mvc;
using PdfSharp.Drawing;
using PdfSharp.Fonts;
using PdfSharp.Pdf;
using PdfSharp;
using System.Drawing.Imaging;
using System.Drawing;
using System.Globalization;
using System.IO;
using ZXing.QrCode;
using ZXing.Windows.Compatibility;
using ZXing;
using System.Collections.Generic;

namespace API.Features.RetailSales {

    public class RetailSalePdfRepository : IRetailSalePdfRepository {

        #region public methods

        public string BuildPdf(InvoicePdfVM invoice) {
            var locale = CultureInfo.CreateSpecificCulture("el-GR");
            GlobalFontSettings.FontResolver = new FileFontResolver();
            System.Text.Encoding.RegisterProvider(System.Text.CodePagesEncodingProvider.Instance);
            PdfDocument document = new();
            PdfPage page = document.AddPage();
            page.Size = PageSize.A4;
            XFont logoFont = new("ACCanterBold", 20);
            XFont headerFont = new("ACCanterBold", 10);
            XFont robotoMonoFont = new("RobotoMono", 7);
            XFont robotoMonoFontBig = new("RobotoMono", 8);
            XGraphics gfx = XGraphics.FromPdfPage(page);
            AddLogo(gfx);
            AddIssuer(gfx, logoFont, robotoMonoFont, invoice);
            AddInvoiceDetails(gfx, headerFont, robotoMonoFont, invoice);
            AddReservation(gfx, headerFont, robotoMonoFont, invoice);
            AddPaxAndPrices(gfx, headerFont, robotoMonoFont, locale, invoice);
            AddPassengers(gfx, headerFont, robotoMonoFont, invoice);
            AddSummary(gfx, headerFont, robotoMonoFont, robotoMonoFontBig, locale, invoice);
            AddAade(gfx, robotoMonoFont, invoice.Aade);
            var filename = invoice.Id + ".pdf";
            var fullpathname = Path.Combine("Reports" + Path.DirectorySeparatorChar + "Invoices" + Path.DirectorySeparatorChar + filename);
            document.Save(fullpathname);
            return filename;
        }

        public string BuildMultiPagePdf(IEnumerable<InvoicePdfVM> invoices) {
            PdfDocument document = new();
            GlobalFontSettings.FontResolver = new FileFontResolver();
            System.Text.Encoding.RegisterProvider(System.Text.CodePagesEncodingProvider.Instance);
            XFont logoFont = new("ACCanterBold", 20);
            XFont headerFont = new("ACCanterBold", 10);
            XFont robotoMonoFont = new("RobotoMono", 7);
            XFont robotoMonoFontBig = new("RobotoMono", 8);
            CultureInfo locale = CultureInfo.CreateSpecificCulture("el-GR");
            foreach (var invoice in invoices) {
                PdfPage page = document.AddPage();
                page.Size = PageSize.A4;
                XGraphics gfx = XGraphics.FromPdfPage(page);
                AddLogo(gfx);
                AddIssuer(gfx, logoFont, robotoMonoFont, invoice);
                AddInvoiceDetails(gfx, headerFont, robotoMonoFont, invoice);
                AddReservation(gfx, headerFont, robotoMonoFont, invoice);
                AddPaxAndPrices(gfx, headerFont, robotoMonoFont, locale, invoice);
                AddPassengers(gfx, headerFont, robotoMonoFont, invoice);
                AddSummary(gfx, headerFont, robotoMonoFont, robotoMonoFontBig, locale, invoice);
                AddAade(gfx, robotoMonoFont, invoice.Aade);
            }
            var filename = "CombinedInvoices" + ".pdf";
            var fullpathname = Path.Combine("Reports" + Path.DirectorySeparatorChar + "Invoices" + Path.DirectorySeparatorChar + filename);
            document.Save(fullpathname);
            return filename;
        }

        public FileStreamResult OpenPdf(string filename) {
            var fullpathname = Path.Combine("Reports" + Path.DirectorySeparatorChar + "Invoices" + Path.DirectorySeparatorChar + filename);
            byte[] byteArray = File.ReadAllBytes(fullpathname);
            MemoryStream memoryStream = new(byteArray);
            return new FileStreamResult(memoryStream, "application/pdf");
        }

        #endregion

        #region private methods

        public void AddLogo(XGraphics gfx) {
            XImage image = XImage.FromFile(Path.Combine("Images" + Path.DirectorySeparatorChar + "Background.png"));
            gfx.DrawImage(image, 40, 20, 100, 100);
        }

        private static void AddIssuer(XGraphics gfx, XFont logoFont, XFont robotoMonoFont, InvoicePdfVM invoice) {
            var top = 42;
            var left = 40;
            gfx.DrawString(invoice.Issuer.FullDescription, logoFont, XBrushes.Black, new XPoint(left += 95, top));
            gfx.DrawString(invoice.Issuer.Profession, robotoMonoFont, XBrushes.Black, new XPoint(left += 5, top += 10));
            gfx.DrawString("ΑΦΜ: " + invoice.Issuer.VatNumber, robotoMonoFont, XBrushes.Black, new XPoint(left += 5, top += 10));
            gfx.DrawString("ΔΟΥ: " + invoice.Issuer.TaxOffice, robotoMonoFont, XBrushes.Black, new XPoint(left, top += 10));
            gfx.DrawString(invoice.Issuer.Street + " " + invoice.Issuer.Number + " " + invoice.Issuer.PostalCode, robotoMonoFont, XBrushes.Black, new XPoint(left, top += 10));
            gfx.DrawString(invoice.Issuer.City, robotoMonoFont, XBrushes.Black, new XPoint(left -= 4, top += 10));
            gfx.DrawString("ΤΗΛΕΦΩΝΑ: " + invoice.Issuer.Phones, robotoMonoFont, XBrushes.Black, new XPoint(left -= 4, top += 10));
            gfx.DrawString("EMAIL: " + invoice.Issuer.Email, robotoMonoFont, XBrushes.Black, new XPoint(left -= 7, top += 10));
        }

        private static void AddInvoiceDetails(XGraphics gfx, XFont headerFont, XFont robotoMonoFont, InvoicePdfVM invoice) {
            var top = 29;
            var right = 560;
            gfx.DrawString("ΗΜΕΡΟΜΗΝΙΑ ΕΚΔΟΣΗΣ: " + DateHelpers.FormatDateStringToLocaleString(invoice.Header.Date), robotoMonoFont, XBrushes.Black, new XRect(right, top, 0, 0), new() { Alignment = XStringAlignment.Far });
            gfx.DrawString(invoice.DocumentType.Description, headerFont, XBrushes.Black, new XRect(right, top += 10, 0, 0), new() { Alignment = XStringAlignment.Far });
            gfx.DrawString("ΣΕΙΡΑ: " + invoice.DocumentType.Batch, robotoMonoFont, XBrushes.Black, new XRect(right, top += 10, 0, 0), new() { Alignment = XStringAlignment.Far });
            gfx.DrawString("ΝΟ: " + invoice.Header.InvoiceNo, robotoMonoFont, XBrushes.Black, new XRect(right, top += 10, 0, 0), new() { Alignment = XStringAlignment.Far });
            gfx.DrawString("ΤΡΟΠΟΣ ΠΛΗΡΩΜΗΣ: " + invoice.Header.PaymentMethod, robotoMonoFont, XBrushes.Black, new XRect(right, top += 10, 0, 0), new() { Alignment = XStringAlignment.Far });
        }

        private static void AddReservation(XGraphics gfx, XFont headerFont, XFont robotoMonoFont, InvoicePdfVM invoice) {
            var top = 150;
            var left = 40;
            gfx.DrawString("ΛΕΠΤΟΜΕΡΕΙΕΣ ΚΡΑΤΗΣΗΣ", headerFont, XBrushes.Black, new XRect(left, top, 0, 0), new() { Alignment = XStringAlignment.Near });
            gfx.DrawString("REFNO: " + invoice.Reservation.RefNo, robotoMonoFont, XBrushes.Black, new XRect(left, top += 15, 0, 0), new() { Alignment = XStringAlignment.Near });
            gfx.DrawString("ΗΜΕΡΟΜΗΝΙΑ ΕΚΔΡΟΜΗΣ: " + DateHelpers.FormatDateStringToLocaleString(invoice.Reservation.Date), robotoMonoFont, XBrushes.Black, new XRect(left, top += 10, 0, 0), new() { Alignment = XStringAlignment.Near });
            gfx.DrawString("ΠΡΟΟΡΙΣΜΟΣ: " + invoice.Reservation.Destination, robotoMonoFont, XBrushes.Black, new XRect(left, top += 10, 0, 0), new() { Alignment = XStringAlignment.Near });
            gfx.DrawString("ΕΙΣΙΤΗΡΙΟ: " + invoice.Reservation.TicketNo, robotoMonoFont, XBrushes.Black, new XRect(left, top += 10, 0, 0), new() { Alignment = XStringAlignment.Near });
            gfx.DrawString("ΠΕΛΑΤΗΣ: " + invoice.Reservation.Customer, robotoMonoFont, XBrushes.Black, new XRect(left, top += 10, 0, 0), new() { Alignment = XStringAlignment.Near });
            gfx.DrawString("ΣΗΜΕΙΟ ΠΑΡΑΛΑΒΗΣ: " + invoice.Reservation.PickupPoint + " " + invoice.Reservation.ExactPoint, robotoMonoFont, XBrushes.Black, new XRect(left, top += 10, 0, 0), new() { Alignment = XStringAlignment.Near });
            gfx.DrawString("ΩΡΑ ΠΑΡΑΛΑΒΗΣ: " + invoice.Reservation.Time, robotoMonoFont, XBrushes.Black, new XRect(left, top += 10, 0, 0), new() { Alignment = XStringAlignment.Near });
            gfx.DrawString("ΠΑΡΑΤΗΡΗΣΕΙΣ: " + invoice.Reservation.Remarks, robotoMonoFont, XBrushes.Black, new XRect(left, top += 10, 0, 0), new() { Alignment = XStringAlignment.Near });
        }

        private static void AddPaxAndPrices(XGraphics gfx, XFont headerFont, XFont robotoMonoFont, CultureInfo locale, InvoicePdfVM invoice) {
            var top = 265;
            var left = 40;
            var paxRight = 100;
            var pricesRight = 150;
            var totalPriceRight = 200;
            gfx.DrawString("ΑΤΟΜΑ & ΧΡΕΩΣΕΙΣ", headerFont, XBrushes.Black, new XRect(left, top, 0, 0), new() { Alignment = XStringAlignment.Near });
            gfx.DrawString("ΕΝΗΛΙΚΕΣ", robotoMonoFont, XBrushes.Black, new XRect(left, top += 15, 0, 0), new() { Alignment = XStringAlignment.Near });
            gfx.DrawString(invoice.Persons.Adults.ToString(), robotoMonoFont, XBrushes.Black, new XRect(paxRight, top, 0, 0), new() { Alignment = XStringAlignment.Far });
            gfx.DrawString(invoice.Persons.AdultsPrice.ToString("N2", locale), robotoMonoFont, XBrushes.Black, new XRect(pricesRight, top, 0, 0), new() { Alignment = XStringAlignment.Far });
            gfx.DrawString(invoice.Persons.AdultsTotalPrice.ToString("N2", locale), robotoMonoFont, XBrushes.Black, new XRect(totalPriceRight, top, 0, 0), new() { Alignment = XStringAlignment.Far });
            gfx.DrawString("ΠΑΙΔΙΑ", robotoMonoFont, XBrushes.Black, new XRect(left, top += 10, 0, 0), new() { Alignment = XStringAlignment.Near });
            gfx.DrawString(invoice.Persons.Kids.ToString(), robotoMonoFont, XBrushes.Black, new XRect(paxRight, top, 0, 0), new() { Alignment = XStringAlignment.Far });
            gfx.DrawString(invoice.Persons.KidsPrice.ToString("N2", locale), robotoMonoFont, XBrushes.Black, new XRect(pricesRight, top, 0, 0), new() { Alignment = XStringAlignment.Far });
            gfx.DrawString(invoice.Persons.KidsTotalPrice.ToString("N2", locale), robotoMonoFont, XBrushes.Black, new XRect(totalPriceRight, top, 0, 0), new() { Alignment = XStringAlignment.Far });
            gfx.DrawString("ΔΩΡΕΑΝ", robotoMonoFont, XBrushes.Black, new XRect(left, top += 10, 0, 0), new() { Alignment = XStringAlignment.Near });
            gfx.DrawString(invoice.Persons.Free.ToString(), robotoMonoFont, XBrushes.Black, new XRect(paxRight, top, 0, 0), new() { Alignment = XStringAlignment.Far });
            gfx.DrawString("ΣΥΝΟΛΑ", headerFont, XBrushes.Black, new XRect(left, top += 15, 0, 0), new() { Alignment = XStringAlignment.Near });
            gfx.DrawString(invoice.Persons.TotalPax.ToString(), robotoMonoFont, XBrushes.Black, new XRect(paxRight, top, 0, 0), new() { Alignment = XStringAlignment.Far });
            gfx.DrawString("€" + invoice.Persons.TotalPrice.ToString("N2", locale), robotoMonoFont, XBrushes.Black, new XRect(totalPriceRight, top, 0, 0), new() { Alignment = XStringAlignment.Far });
        }

        private static void AddPassengers(XGraphics gfx, XFont headerFont, XFont robotoMonoFont, InvoicePdfVM invoice) {
            var top = 325;
            var left = 40;
            gfx.DrawString("ΕΠΙΒΑΤΕΣ", headerFont, XBrushes.Black, new XRect(left, top += 20, 0, 0), new() { Alignment = XStringAlignment.Near });
            top += 5;
            foreach (var passenger in invoice.Passengers) {
                gfx.DrawString(passenger.Lastname + " " + passenger.Firstname, robotoMonoFont, XBrushes.Black, new XRect(left, top += 10, 0, 0), new() { Alignment = XStringAlignment.Near });
            }
        }

        private static void AddSummary(XGraphics gfx, XFont headerFont, XFont robotoMonoFont, XFont robotoMonoFontBig, CultureInfo locale, InvoicePdfVM invoice) {
            var top = 620;
            var left = 450;
            var amountsRight = 560;
            gfx.DrawString("ΑΞΙΕΣ ΠΑΡΑΣΤΑΤΙΚΟΥ", headerFont, XBrushes.Black, new XRect(left, top += 20, 0, 0), new() { Alignment = XStringAlignment.Near });
            gfx.DrawString("ΚΑΘΑΡΗ ΑΞΙΑ", robotoMonoFont, XBrushes.Black, new XRect(left, top += 15, 0, 0), new() { Alignment = XStringAlignment.Near });
            gfx.DrawString(invoice.Summary.NetAmount.ToString("N2", locale), robotoMonoFont, XBrushes.Black, new XRect(amountsRight, top, 0, 0), new() { Alignment = XStringAlignment.Far });
            gfx.DrawString("ΦΠΑ " + invoice.Summary.VatPercent + "%", robotoMonoFont, XBrushes.Black, new XRect(left, top += 10, 0, 0), new() { Alignment = XStringAlignment.Near });
            gfx.DrawString(invoice.Summary.VatAmount.ToString("N2", locale), robotoMonoFont, XBrushes.Black, new XRect(amountsRight, top, 0, 0), new() { Alignment = XStringAlignment.Far });
            gfx.DrawString("ΣΥΝΟΛΙΚΗ ΑΞΙΑ", headerFont, XBrushes.Black, new XRect(left, top += 15, 0, 0), new() { Alignment = XStringAlignment.Near });
            gfx.DrawString("€" + invoice.Summary.GrossAmount.ToString("N2", locale), robotoMonoFontBig, XBrushes.Black, new XRect(amountsRight, top, 0, 0), new() { Alignment = XStringAlignment.Far });
        }

        private static void AddAade(XGraphics gfx, XFont font, InvoicePdfAadeVM aade) {
            var bottom = 810;
            var right = 560;
            gfx.DrawString(aade.Mark != "" ? "MAPK " + aade.Mark : "", font, XBrushes.Black, new XRect(right, bottom - 70, 0, 0), new() { Alignment = XStringAlignment.Far });
            if (aade.Mark != "") {
                gfx.DrawImage(AddQrCode(aade.QrUrl != "" ? aade.QrUrl : "NOTHING HERE"), 500, 749, 60, 60);
            }
            gfx.DrawString(aade.UId != "" ? aade.UId : "ΧΩΡΙΣ ΜΑΡΚ ΛΟΓΩ ΑΠΩΛΕΙΑΣ ΔΙΑΣΥΝΔΕΣΗΣ", font, XBrushes.Black, new XRect(right, bottom, 0, 0), new() { Alignment = XStringAlignment.Far });
        }

        private static XImage AddQrCode(string qrUrl) {
            QrCodeEncodingOptions options = new() { DisableECI = true, CharacterSet = "UTF-8" };
            BarcodeWriter writer = new() { Format = BarcodeFormat.QR_CODE, Options = options };
            Bitmap qrCodeBitmap = writer.Write(qrUrl);
            MemoryStream strm = new();
            qrCodeBitmap.Save(strm, ImageFormat.Png);
            return XImage.FromStream(strm);
        }

        #endregion

    }

}