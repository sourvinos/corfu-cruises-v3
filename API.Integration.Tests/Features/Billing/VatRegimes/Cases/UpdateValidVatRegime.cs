using System.Collections;
using System.Collections.Generic;
using Infrastructure;

namespace VatRegimes {

    public class UpdateValidCode : IEnumerable<object[]> {

        IEnumerator IEnumerable.GetEnumerator() => GetEnumerator();

        public IEnumerator<object[]> GetEnumerator() {
            yield return ValidRecord();
        }

        private static object[] ValidRecord() {
            return new object[] {
                new TestVatRegime {
                    Id = 1,
                    Description = Helpers.CreateRandomString(128),
                    HasVat = true,
                    PutAt = "2024-01-01 00:00"
                }
            };
        }

    }

}
