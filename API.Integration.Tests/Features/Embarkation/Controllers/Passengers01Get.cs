using System.Linq;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;
using API.Features.Embarkation;
using Cases;
using Infrastructure;
using Responses;
using Xunit;

namespace Embarkation {

    [Collection("Sequence")]
    public class Passengers01Get : IClassFixture<AppSettingsFixture> {

        #region variables

        private readonly AppSettingsFixture _appSettingsFixture;
        private readonly HttpClient _httpClient;
        private readonly TestHostFixture _testHostFixture = new();
        private readonly string _actionVerb = "post";
        private readonly string _baseUrl;
        private readonly string _url = "/embarkation";

        #endregion

        public Passengers01Get(AppSettingsFixture appsettings) {
            _appSettingsFixture = appsettings;
            _baseUrl = _appSettingsFixture.Configuration.GetSection("TestingEnvironment").GetSection("BaseUrl").Value;
            _httpClient = _testHostFixture.Client;
        }

        [Fact]
        public async Task Unauthorized_Not_Logged_In() {
            await InvalidCredentials.Action(_httpClient, _baseUrl, _url, _actionVerb, "", "", null);
        }

        [Fact]
        public async Task Unauthorized_Invalid_Credentials() {
            await InvalidCredentials.Action(_httpClient, _baseUrl, _url, _actionVerb, "user-does-not-exist", "not-a-valid-password", null);
        }

        [Theory]
        [ClassData(typeof(InactiveUsersCanNotLogin))]
        public async Task Unauthorized_Inactive_Users(Login login) {
            await InvalidCredentials.Action(_httpClient, _baseUrl, _url, _actionVerb, login.Username, login.Password, null);
        }

        [Theory]
        [ClassData(typeof(CreateEmbarkationCriteria))]
        public async Task Simple_Users_Can_Not_List(TestEmbarkationCriteria criteria) {
            await Forbidden.Action(_httpClient, _baseUrl, _url, _actionVerb, "simpleuser", "1234567890", criteria);
        }

        [Theory]
        [ClassData(typeof(CreateEmbarkationCriteria))]
        public async Task Admins_Can_List(TestEmbarkationCriteria criteria) {
            var actionResponse = await ListByPost.Action(_httpClient, _baseUrl, _url, "john", "ec11fc8c16db", criteria);
            var records = JsonSerializer.Deserialize<EmbarkationFinalGroupVM>(await actionResponse.Content.ReadAsStringAsync(), new JsonSerializerOptions { PropertyNameCaseInsensitive = true });
            Assert.Equal(70, records.TotalPax);
            Assert.Equal(68, records.EmbarkedPassengers);
            Assert.Equal(28, records.Reservations.Count());
        }

    }

}