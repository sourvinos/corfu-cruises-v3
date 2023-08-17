namespace API.Features.Embarkation {

    public class EmbarkationFinalPassengerVM {

        public int Id { get; set; }
        public string Lastname { get; set; }
        public string Firstname { get; set; }
        public bool IsBoarded { get; set; }

        public EmbarkationFinalPassengerNationalityVM Nationality { get; set; }

    }

}