using System;

namespace API.Features.RetailSales {

    public class RetailSaleAadeVM {

        public Guid ReservationId { get; set; }
        public string UId { get; set; }
        public string Mark { get; set; }
        public string MarkCancel { get; set; }
        public string QrUrl { get; set; }

    }

}