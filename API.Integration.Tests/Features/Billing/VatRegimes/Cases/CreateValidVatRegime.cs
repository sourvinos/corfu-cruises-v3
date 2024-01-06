using System.Collections;
using System.Collections.Generic;
using Infrastructure;

namespace VatRegimes {

    public class CreateValidCode : IEnumerable<object[]> {

        IEnumerator IEnumerable.GetEnumerator() => GetEnumerator();

        public IEnumerator<object[]> GetEnumerator() {
            yield return ValidRecord();
        }

        private static object[] ValidRecord() {
            return new object[] {
                new TestVatRegime {
                    Description = Helpers.CreateRandomString(128),
                    HasVat = true,
                    IsActive = true
                }
            };
        }

    }

}
