using System;
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
                    TaxOfficeId = Guid.Parse("00b19ade-546c-7351-a164-9f5eeb0b3a69"),
                    VatRegimeId = Guid.Parse("9735d2c5-4fdf-4549-84e7-b2ae4070ac3a"),
                    NationalityId = 1,
                    Description = Helpers.CreateRandomString(128),
                    TaxNo = "099999999",
                    BalanceLimit = 0M
                }
            };
        }

    }

}
