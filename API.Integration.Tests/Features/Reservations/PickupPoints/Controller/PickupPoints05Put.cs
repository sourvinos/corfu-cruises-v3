using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using Cases;
using Infrastructure;
using Responses;
using Xunit;

namespace PickupPoints {

    [Collection("Sequence")]
    public class PickupPoints05Put : IClassFixture<AppSettingsFixture> {

        #region variables

        private readonly AppSettingsFixture _appSettingsFixture;
        private readonly HttpClient _httpClient;
        private readonly TestHostFixture _testHostFixture = new();
        private readonly string _actionVerb = "put";
        private readonly string _baseUrl;
        private readonly string _url = "/pickupPoints";
        private readonly string _notFoundUrl = "/pickupPoints/9999";

        #endregion

        public PickupPoints05Put(AppSettingsFixture appsettings) {
            _appSettingsFixture = appsettings;
            _baseUrl = _appSettingsFixture.Configuration.GetSection("TestingEnvironment").GetSection("BaseUrl").Value;
            _httpClient = _testHostFixture.Client;
        }

        [Theory]
        [ClassData(typeof(UpdateValidPickupPoint))]
        public async Task Unauthorized_Not_Logged_In(TestPickupPoint record) {
            await InvalidCredentials.Action(_httpClient, _baseUrl, _url, _actionVerb, "", "", record);
        }

        [Theory]
        [ClassData(typeof(UpdateValidPickupPoint))]
        public async Task Unauthorized_Invalid_Credentials(TestPickupPoint record) {
            await InvalidCredentials.Action(_httpClient, _baseUrl, _url, _actionVerb, "user-does-not-exist", "not-a-valid-password", record);
        }

        [Theory]
        [ClassData(typeof(InactiveUsersCanNotLogin))]
        public async Task Unauthorized_Inactive_Users(Login login) {
            await InvalidCredentials.Action(_httpClient, _baseUrl, _url, _actionVerb, login.Username, login.Password, null);
        }

        [Theory]
        [ClassData(typeof(UpdateValidPickupPoint))]
        public async Task Simple_Users_Can_Not_Update(TestPickupPoint record) {
            await Forbidden.Action(_httpClient, _baseUrl, _url, _actionVerb, "simpleuser", "1234567890", record);
        }

        [Fact]
        public async Task Admins_Can_Not_Update_When_Not_Found() {
            await RecordNotFound.Action(_httpClient, _baseUrl, _notFoundUrl, "john", "Aba439de-446e-4eef-8c4b-833f1b3e18aa%");
        }

        [Theory]
        [ClassData(typeof(UpdateInvalidPickupPoint))]
        public async Task Admins_Can_Not_Update_When_Invalid(TestPickupPoint record) {
            var actionResponse = await RecordInvalidNotSaved.Action(_httpClient, _baseUrl, _url, _actionVerb, "john", "Aba439de-446e-4eef-8c4b-833f1b3e18aa%", record);
            Assert.Equal((HttpStatusCode)record.StatusCode, actionResponse.StatusCode);
        }

        [Theory]
        [ClassData(typeof(UpdateValidPickupPoint))]
        public async Task Admins_Can_Update_When_Valid(TestPickupPoint record) {
            await RecordSaved.Action(_httpClient, _baseUrl, _url, _actionVerb, "john", "Aba439de-446e-4eef-8c4b-833f1b3e18aa%", record);
        }

    }

}