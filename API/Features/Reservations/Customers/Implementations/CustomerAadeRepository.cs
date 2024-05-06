using AutoMapper;
using System.Xml;
using System.Net;
using System.IO;
using API.Infrastructure.Helpers;

namespace API.Features.Reservations.Customers {

    public class CustomerAadeRepository : ICustomerAadeRepository {

        private readonly IMapper mapper;

        public CustomerAadeRepository() { }

        public StreamWriter GetAsync() {
            return SaveResponse(DoTasks());
        }

        private static string DoTasks() {
            const string url = "https://www1.gsis.gr/wsaade/RgWsPublic2/RgWsPublic2";
            const string action = "POST";
            XmlDocument soapEnvelopeXml = CreateSoapEnvelope();
            soapEnvelopeXml = ReplaceFieldsWithVariables(soapEnvelopeXml);
            HttpWebRequest webRequest = CreateWebRequest(url, action);
            InsertSoapEnvelopeIntoWebRequest(soapEnvelopeXml, webRequest);
            string result;
            using (WebResponse response = webRequest.GetResponse()) {
                using StreamReader rd = new(response.GetResponseStream());
                result = rd.ReadToEnd();
            }
            return result;
        }

        private static HttpWebRequest CreateWebRequest(string url, string action) {
            HttpWebRequest webRequest = (HttpWebRequest)WebRequest.Create(url);
            webRequest.Headers.Add("SOAPAction", action);
            webRequest.ContentType = "application/soap+xml;charset=\"utf-8\"";
            webRequest.Accept = "application/xml";
            webRequest.Method = "POST";
            return webRequest;
        }

        private static XmlDocument CreateSoapEnvelope() {
            XmlDocument soapEnvelopeXml = new();
            soapEnvelopeXml.LoadXml(@"<?xml version=""1.0""?>
                <env:Envelope xmlns:ns3=""http://rgwspublic2/RgWsPublic2"" xmlns:ns2=""http://rgwspublic2/RgWsPublic2Service"" xmlns:ns1=""http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd"" xmlns:env=""http://www.w3.org/2003/05/soap-envelope"">
                    <env:Header>
                        <ns1:Security>
                            <ns1:UsernameToken>
                                <ns1:Username></ns1:Username>
                                <ns1:Password></ns1:Password>
                            </ns1:UsernameToken>
                        </ns1:Security>
                    </env:Header>
                    <env:Body>
                        <ns2:rgWsPublic2AfmMethod>
                            <ns2:INPUT_REC>
                                <ns3:afm_called_by/>
                                <ns3:afm_called_for></ns3:afm_called_for>
                            </ns2:INPUT_REC>
                        </ns2:rgWsPublic2AfmMethod>
                    </env:Body>
                </env:Envelope>");
            return soapEnvelopeXml;
        }

        private static void InsertSoapEnvelopeIntoWebRequest(XmlDocument soapEnvelopeXml, HttpWebRequest webRequest) {
            using Stream stream = webRequest.GetRequestStream();
            soapEnvelopeXml.Save(stream);
        }

        private static XmlDocument ReplaceFieldsWithVariables(XmlDocument soapEnvelopeXml) {
            var x = soapEnvelopeXml.GetElementsByTagName("ns1:Username");
            x[0].InnerText = "KEP997346439";
            var z = soapEnvelopeXml.GetElementsByTagName("ns1:Password");
            z[0].InnerText = "PKE997346439";
            var i = soapEnvelopeXml.GetElementsByTagName("ns3:afm_called_for");
            i[0].InnerText = "099863549";
            return soapEnvelopeXml;
        }

        private static StreamWriter SaveResponse(string response) {
            using StreamWriter outputFile = new(FileSystemHelpers.CreateResponseFullPathName("xmls"));
            outputFile.Write(response);
            return outputFile;
        }

    }

}