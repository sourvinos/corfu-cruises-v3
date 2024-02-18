using System.Collections;
using System.Collections.Generic;
using Infrastructure;

namespace Customers {

    public class CreateValidCustomer : IEnumerable<object[]> {

        IEnumerator IEnumerable.GetEnumerator() => GetEnumerator();

        public IEnumerator<object[]> GetEnumerator() {
            yield return ValidRecord();
        }

        private static object[] ValidRecord() {
            return new object[] {
                new TestCustomer {
                    NationalityId = 1,
                    TaxOfficeId = 1,
                    VatRegimeId = 1,
                    Abbreviation = Helpers.CreateRandomString(128),
                    Description = Helpers.CreateRandomString(512),
                    VatNumber = Helpers.CreateRandomString(36),
                    Branch = 0,
                    Address = Helpers.CreateRandomString(128),
                    City = Helpers.CreateRandomString(128),
                    PostalCode = Helpers.CreateRandomString(10),
                    BalanceLimit = 0M
                }
            };
        }

    }

}
