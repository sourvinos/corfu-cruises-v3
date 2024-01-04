using System;
using System.Collections;
using System.Collections.Generic;
using Infrastructure;

namespace PaymentMethods {

    public class UpdateValidPaymentMethod : IEnumerable<object[]> {

        IEnumerator IEnumerable.GetEnumerator() => GetEnumerator();

        public IEnumerator<object[]> GetEnumerator() {
            yield return ValidRecord();
        }

        private static object[] ValidRecord() {
            return new object[] {
                new TestPaymentMethod {
                    Id = Guid.Parse("439e8738-31dd-42bf-9392-1fafc741a27c"),
                    Description = Helpers.CreateRandomString(128),
                    PutAt = "2024-01-04 03:00:00"
                }
            };
        }

    }

}
