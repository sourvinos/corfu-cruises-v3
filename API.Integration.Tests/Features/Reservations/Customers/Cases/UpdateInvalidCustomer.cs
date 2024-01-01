using System;
using System.Collections;
using System.Collections.Generic;
using Infrastructure;

namespace Customers {

    public class UpdateInvalidCustomer : IEnumerable<object[]> {

        IEnumerator IEnumerable.GetEnumerator() => GetEnumerator();

        public IEnumerator<object[]> GetEnumerator() {
            yield return Customer_Must_Not_Be_Already_Updated();
        }

        private static object[] Customer_Must_Not_Be_Already_Updated(){
            return new object[] {
                new TestCustomer {
                    StatusCode = 415,
                    Id = 1,
                    TaxOfficeId = Guid.Parse("00b19ade-546c-7351-a164-9f5eeb0b3a69"),
                    Description = Helpers.CreateRandomString(128),
                    TaxNo = "099999999",
                    PutAt = "2023-09-07 09:55:22"
                }
            };
        }

    }

}
