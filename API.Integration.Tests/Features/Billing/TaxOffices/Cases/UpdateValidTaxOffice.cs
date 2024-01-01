using System;
using System.Collections;
using System.Collections.Generic;
using Infrastructure;

namespace TaxOffices {

    public class UpdateValidTaxOffice : IEnumerable<object[]> {

        IEnumerator IEnumerable.GetEnumerator() => GetEnumerator();

        public IEnumerator<object[]> GetEnumerator() {
            yield return ValidRecord();
        }

        private static object[] ValidRecord() {
            return new object[] {
                new TestTaxOffice {
                    Id = Guid.Parse("0c7b3828-67ea-5f27-4739-0c92526c7122"),
                    Description = Helpers.CreateRandomString(128),
                    PutAt = "2024-01-01 00:00:00"
                }
            };
        }

    }

}
