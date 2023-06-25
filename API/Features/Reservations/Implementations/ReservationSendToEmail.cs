using System;
using System.Drawing;
using System.IO;
using System.Threading.Tasks;
using API.Infrastructure.Helpers;
using MailKit.Net.Smtp;
using Microsoft.Extensions.Options;
using MimeKit;
using ZXing.QrCode;

namespace API.Features.Reservations {

    public class ReservationSendToEmail : IReservationSendToEmail {

        private readonly EmailSettings emailSettings;

        public ReservationSendToEmail(IOptions<EmailSettings> emailSettings) {
            this.emailSettings = emailSettings.Value;
        }

        public async Task SendReservationToEmail(BoardingPassReservationVM reservation) {
            string FilePath = Directory.GetCurrentDirectory() + "\\Features\\Reservations\\Templates\\BoardingPass.cshtml";
            StreamReader str = new(FilePath);
            string MailText = str.ReadToEnd();
            str.Close();
            MailText = MailText
                .Replace("[logo-image]", SetLogoImageAsBackground())
                .Replace("[logo-text]", SetLogoTextAsBackground())
                .Replace("[customer]", reservation.Customer.Description)
                .Replace("[refNo]", reservation.RefNo)
                .Replace("[ticketNo]", reservation.TicketNo)
                .Replace("[totalPax]", reservation.TotalPax.ToString())
                .Replace("[date]", DateHelpers.FormatDateStringToLocaleString(reservation.Date))
                .Replace("[destination]", reservation.Destination.Description)
                .Replace("[refNo]", reservation.RefNo)
                .Replace("[phones]", emailSettings.Phones)
                .Replace("[pickupPoint]", reservation.PickupPoint.Description)
                .Replace("[exactPoint]", reservation.PickupPoint.ExactPoint)
                .Replace("[time]", reservation.PickupPoint.Time)
                .Replace("[image]", SetBarcodeAsBackground(reservation.RefNo));
            var senderEmail = new MimeMessage {
                Sender = MailboxAddress.Parse(emailSettings.UserName)
            };
            senderEmail.From.Add(new MailboxAddress(emailSettings.From, emailSettings.UserName));
            senderEmail.To.Add(MailboxAddress.Parse(reservation.Email));
            senderEmail.Subject = "Your reservation is ready!";
            var builder = new BodyBuilder {
                HtmlBody = MailText
            };
            senderEmail.Body = builder.ToMessageBody();
            using var smtp = new SmtpClient();
            smtp.Connect(emailSettings.SmtpClient, emailSettings.Port);
            smtp.Authenticate(emailSettings.UserName, emailSettings.Password);
            await smtp.SendAsync(senderEmail);
            smtp.Disconnect(true);
        }

        private static string SetBarcodeAsBackground(string refNo) {
            return "background: url(data:image/png;base64," + Convert.ToBase64String(CreateBarcode(refNo, 200, 200, 2)) + ")";
        }

        private static string SetLogoImageAsBackground() {
            return "background: url(data:image/png;base64," + LogoService.GetBase64LogoImage() + ")";
        }

        private static string SetLogoTextAsBackground() {
            return "background: url(data:image/png;base64," + LogoService.GetBase64LogoText() + ")";
        }

        private static byte[] CreateBarcode(string text, int width, int height, int margin) {
            byte[] byteArray;
            var qrCodeWriter = new ZXing.BarcodeWriterPixelData {
                Format = ZXing.BarcodeFormat.QR_CODE,
                Options = new QrCodeEncodingOptions {
                    Height = height,
                    Width = width,
                    Margin = margin
                }
            };
            var pixelData = qrCodeWriter.Write(text);
            using (var bitmap = new Bitmap(pixelData.Width, pixelData.Height, System.Drawing.Imaging.PixelFormat.Format32bppRgb)) {
                using var ms = new MemoryStream();
                var bitmapData = bitmap.LockBits(new Rectangle(0, 0, pixelData.Width, pixelData.Height), System.Drawing.Imaging.ImageLockMode.WriteOnly, System.Drawing.Imaging.PixelFormat.Format32bppRgb);
                try {
                    System.Runtime.InteropServices.Marshal.Copy(pixelData.Pixels, 0, bitmapData.Scan0, pixelData.Pixels.Length);
                } finally {
                    bitmap.UnlockBits(bitmapData);
                }
                bitmap.Save(ms, System.Drawing.Imaging.ImageFormat.Png);
                byteArray = ms.ToArray();
            }
            return byteArray;
        }

    }

}
