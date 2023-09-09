using System.Collections;
using System.Collections.Generic;
using Infrastructure;

namespace Ports {

    public class UpdateInvalidPort : IEnumerable<object[]> {

        IEnumerator IEnumerable.GetEnumerator() => GetEnumerator();

        public IEnumerator<object[]> GetEnumerator() {
            yield return StopOrderNotUnique();
            yield return Port_Must_Not_Be_Already_Updated();
        }

        private static object[] StopOrderNotUnique() {
            return new object[] {
                new TestPort {
                    StatusCode = 493,
                    Id = 1,
                    Description = Helpers.CreateRandomString(128),
                    Abbreviation= Helpers.CreateRandomString(5),
                    StopOrder = 2
                }
            };
        }

        private static object[] Port_Must_Not_Be_Already_Updated() {
            return new object[] {
                new TestPort {
                    StatusCode = 415,
                    Id = 1,
                    Abbreviation = Helpers.CreateRandomString(5),
                    Description = Helpers.CreateRandomString(128),
                    StopOrder = 1,
                    RowVersion = "2023-09-07 09:55:22"
                }
            };
        }

    }

}
