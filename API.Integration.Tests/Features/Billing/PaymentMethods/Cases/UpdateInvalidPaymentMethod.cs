using System;
using System.Collections;
using System.Collections.Generic;
using Infrastructure;

namespace PaymentMethods {

    public class UpdateInvalidPaymentMethod : IEnumerable<object[]> {

        IEnumerator IEnumerable.GetEnumerator() => GetEnumerator();

        public IEnumerator<object[]> GetEnumerator() {
            yield return PaymentMethod_Must_Not_Be_Already_Updated();
        }

        private static object[] PaymentMethod_Must_Not_Be_Already_Updated(){
            return new object[] {
                new TestPaymentMethod {
                    StatusCode = 415,
                    Id = Guid.Parse("439e8738-31dd-42bf-9392-1fafc741a27c"),
                    Description = Helpers.CreateRandomString(128),
                    PutAt = "2024-01-01 00:00:00"
                }
            };
        }

    }

}
