using System.Collections;
using System.Collections.Generic;
using Infrastructure;

namespace Registrars {

    public class UpdateValidRegistrar : IEnumerable<object[]> {

        IEnumerator IEnumerable.GetEnumerator() => GetEnumerator();

        public IEnumerator<object[]> GetEnumerator() {
            yield return ValidRecord();
        }

        private static object[] ValidRecord() {
            return new object[] {
                new TestRegistrar {
                    Id = 1,
                    ShipId = 1,
                    Fullname = Helpers.CreateRandomString(128),
                    PutAt = "2023-09-14 05:17:49"
                }
            };
        }

    }

}
