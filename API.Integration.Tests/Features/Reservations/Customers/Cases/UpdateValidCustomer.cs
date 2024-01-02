using System;
using System.Collections;
using System.Collections.Generic;
using Infrastructure;

namespace Customers {

    public class UpdateValidCustomer : IEnumerable<object[]> {

        IEnumerator IEnumerable.GetEnumerator() => GetEnumerator();

        public IEnumerator<object[]> GetEnumerator() {
            yield return ValidRecord();
        }

        private static object[] ValidRecord() {
            return new object[] {
                new TestCustomer {
                    Id = 1,
                    NationalityId = 1,
                    TaxOfficeId = Guid.Parse("d142adde-3d28-4095-1987-93a362297ed8"),
                    VatRegimeId =  Guid.Parse("9735d2c5-4fdf-4549-84e7-b2ae4070ac3a"),
                    Description = Helpers.CreateRandomString(128),
                    TaxNo = "099999999",
                    BalanceLimit = 0M,
                    PutAt = "2023-09-07 09:52:22"
                }
            };
        }

    }

}
