using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Imaging;
using System.Globalization;
using System.IO;
using System.Threading.Tasks;
using API.Infrastructure.Classes;
using API.Infrastructure.Helpers;
using API.Infrastructure.Responses;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PdfSharp.Drawing;
using PdfSharp.Fonts;
using PdfSharp.Pdf;
using ZXing;
using ZXing.QrCode;
using ZXing.Windows.Compatibility;

namespace API.Features.Billing.Ledgers {

    [Route("api/[controller]")]
    public class LedgersBillingController : ControllerBase {

        #region variables

        private readonly ILedgerBillingRepository repo;

        #endregion

        public LedgersBillingController(ILedgerBillingRepository repo) {
            this.repo = repo;
        }

        [HttpPost("buildLedger")]
        [Authorize(Roles = "user, admin")]
        public Task<List<LedgerVM>> BuildLedger([FromBody] LedgerCriteria criteria) {
            return ProcessLedger(criteria);
        }

        [HttpPost("buildLedgerPdf")]
        [Authorize(Roles = "user, admin")]
        public async Task<ResponseWithBody> BuildLedgerPdf([FromBody] LedgerCriteria criteria) {
            var ledger = await ProcessLedger(criteria);
            var locale = CultureInfo.CreateSpecificCulture("el-GR");
            GlobalFontSettings.FontResolver = new FileFontResolver();
            System.Text.Encoding.RegisterProvider(System.Text.CodePagesEncodingProvider.Instance);
            PdfDocument document = new();
            PdfPage page = document.AddPage();
            XFont logoFont = new("ACCanterBold", 20);
            XFont robotoMonoFont = new("RobotoMono", 6);
            XFont monotypeFont = new("MonoType", 6);
            XGraphics gfx = XGraphics.FromPdfPage(page);
            gfx.DrawString(ledger[1].ShipOwner.Description, logoFont, XBrushes.Black, new XPoint(40, 40));
            gfx.DrawString("ΚΑΡΤΕΛΑ ΠΕΛΑΤΗ: " + ledger[1].Customer.Description, robotoMonoFont, XBrushes.Black, new XPoint(40, 53));
            gfx.DrawString("ΔΙΑΣΤΗΜΑ: " + criteria.FromDate + " - " + criteria.ToDate, robotoMonoFont, XBrushes.Black, new XPoint(40, 62));
            gfx.DrawString("ΗΜΕΡΟΜΗΝΙΑ", robotoMonoFont, XBrushes.Black, new XPoint(40, 90));
            gfx.DrawString("ΠΑΡΑΣΤΑΤΙΚΟ", robotoMonoFont, XBrushes.Black, new XPoint(80, 90));
            gfx.DrawString("ΣΕΙΡΑ", robotoMonoFont, XBrushes.Black, new XPoint(218, 90));
            gfx.DrawString("NO", robotoMonoFont, XBrushes.Black, new XPoint(270, 90));
            gfx.DrawString("ΧΡΕΩΣΗ", robotoMonoFont, XBrushes.Black, new XPoint(434, 90));
            gfx.DrawString("ΠΙΣΤΩΣΗ", robotoMonoFont, XBrushes.Black, new XPoint(490, 90));
            gfx.DrawString("ΥΠΟΛΟΙΠΟ", robotoMonoFont, XBrushes.Black, new XPoint(547, 90));
            int verticalPosition = 100;
            for (int i = 0; i < ledger.Count; i++) {
                verticalPosition += 12;
                gfx.DrawString(ledger[i].Date, robotoMonoFont, XBrushes.Black, new XPoint(40, verticalPosition));
                gfx.DrawString(ledger[i].DocumentType.Description, robotoMonoFont, XBrushes.Black, new XPoint(80, verticalPosition));
                gfx.DrawString(ledger[i].DocumentType.Batch, robotoMonoFont, XBrushes.Black, new XPoint(220, verticalPosition));
                gfx.DrawString(ledger[i].InvoiceNo, robotoMonoFont, XBrushes.Black, new XPoint(270, verticalPosition));
                gfx.DrawString(ledger[i].Debit.ToString("N2", locale), monotypeFont, XBrushes.Black, new XPoint(456 - ledger[i].Debit.ToString("N2", locale).Length * 3, verticalPosition));
                gfx.DrawString(ledger[i].Credit.ToString("N2", locale), monotypeFont, XBrushes.Black, new XPoint(516 - ledger[i].Credit.ToString("N2", locale).Length * 3, verticalPosition));
                gfx.DrawString(ledger[i].Balance.ToString("N2", locale), monotypeFont, XBrushes.Black, new XPoint(576 - ledger[i].Balance.ToString("N2", locale).Length * 3, verticalPosition));
            }
            var filename = criteria.CustomerId.ToString() + "-" + criteria.ShipOwnerId.ToString() + ".pdf";
            document.Save(filename);
            return new ResponseWithBody {
                Code = 200,
                Icon = Icons.Info.ToString(),
                Message = ApiMessages.OK(),
                Body = filename
            };
        }

        private async Task<List<LedgerVM>> ProcessLedger(LedgerCriteria criteria) {
            var records = repo.BuildBalanceForLedger(await repo.GetForLedger(criteria.FromDate, criteria.ToDate, criteria.CustomerId, criteria.ShipOwnerId));
            var previous = repo.BuildPrevious(records, criteria.FromDate);
            var requested = repo.BuildRequested(records, criteria.FromDate);
            var total = repo.BuildTotal(records);
            return repo.MergePreviousRequestedAndTotal(previous, requested, total);
        }

    }

}