using System;
using System.Collections;
using System.Collections.Generic;
using Infrastructure;

namespace TaxOffices {

    public class UpdateInvalidTaxOffice : IEnumerable<object[]> {

        IEnumerator IEnumerable.GetEnumerator() => GetEnumerator();

        public IEnumerator<object[]> GetEnumerator() {
            yield return TaxOffice_Must_Not_Be_Already_Updated();
        }

        private static object[] TaxOffice_Must_Not_Be_Already_Updated(){
            return new object[] {
                new TestTaxOffice {
                    StatusCode = 415,
                    Id = Guid.Parse("0c7b3828-67ea-5f27-4739-0c92526c7122"),
                    Description = Helpers.CreateRandomString(128),
                    PutAt = "2023-09-07 09:55:22"
                }
            };
        }

    }

}
