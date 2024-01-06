namespace API.Features.Reservations.Manifest {

    public interface IManifestRepository {

        ManifestFinalVM Get(string date, int destinationId, int[] portIds, int? shipId);

    }

}