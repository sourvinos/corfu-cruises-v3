using System.Collections;
using System.Collections.Generic;
using Infrastructure;

namespace Registrars {

    public class UpdateInvalidRegistrar : IEnumerable<object[]> {

        IEnumerator IEnumerable.GetEnumerator() => GetEnumerator();

        public IEnumerator<object[]> GetEnumerator() {
            yield return Ship_Must_Exist();
            yield return Registrar_Must_Not_Be_Already_Updated();
        }

        private static object[] Ship_Must_Exist() {
            return new object[] {
                new TestRegistrar {
                    StatusCode = 454,
                    Id = 8,
                    ShipId = 99,
                    Fullname = Helpers.CreateRandomString(128)
                }
            };
        }

        private static object[] Registrar_Must_Not_Be_Already_Updated() {
            return new object[] {
                new TestRegistrar {
                    StatusCode = 415,
                    Id = 1,
                    ShipId = 7,
                    Fullname = Helpers.CreateRandomString(128),
                    RowVersion = "2023-09-07 09:55:22"
                }
            };
        }

    }

}
