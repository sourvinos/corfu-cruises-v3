using System;
using System.Collections;
using System.Collections.Generic;
using Infrastructure;

namespace Customers {

    public class UpdateInvalidCustomer : IEnumerable<object[]> {

        IEnumerator IEnumerable.GetEnumerator() => GetEnumerator();

        public IEnumerator<object[]> GetEnumerator() {
            yield return Nationality_Must_Exist();
            yield return TaxOffice_Must_Exist();
            yield return VatRegime_Must_Exist();
            yield return Customer_Must_Not_Be_Already_Updated();
        }

        private static object[] Nationality_Must_Exist() {
            return new object[] {
                new TestCustomer {
                    StatusCode = 456,
                    Id = 1,
                    NationalityId = 9999,
                    TaxOfficeId = Guid.Parse("00b19ade-546c-7351-a164-9f5eeb0b3a69"),
                    VatRegimeId = Guid.Parse("9735d2c5-4fdf-4549-84e7-b2ae4070ac3a"),
                    Description = Helpers.CreateRandomString(128),
                    TaxNo = "099999999",
                    BalanceLimit = 0M,
                    PutAt = "2023-09-07 09:52:22"
                }
            };
        }

        private static object[] TaxOffice_Must_Exist() {
            return new object[] {
                new TestCustomer {
                    StatusCode = 458,
                    Id = 1,
                    NationalityId = 1,
                    TaxOfficeId = Guid.Parse("ea6d1494-a7b4-47f4-b7ce-a462a73ae6f3"),
                    VatRegimeId = Guid.Parse("9735d2c5-4fdf-4549-84e7-b2ae4070ac3a"),
                    Description = Helpers.CreateRandomString(128),
                    TaxNo = "099999999",
                    BalanceLimit = 0M,
                    PutAt = "2023-09-07 09:52:22"
                }
            };
        }

        private static object[] VatRegime_Must_Exist() {
            return new object[]{
                new TestCustomer {
                    StatusCode = 463,
                    Id = 1,
                    NationalityId = 1,
                    TaxOfficeId = Guid.Parse("d142adde-3d28-4095-1987-93a362297ed8"),
                    VatRegimeId = Guid.Parse("f34c709f-95e4-4c97-a76e-edb1d13b5b1c"),
                    Description = Helpers.CreateRandomString(128),
                    TaxNo = "099999999",
                    BalanceLimit = 0M,
                    PutAt = "2023-09-07 09:52:22"
                }
            };
        }

        private static object[] Customer_Must_Not_Be_Already_Updated() {
            return new object[] {
                new TestCustomer {
                    StatusCode = 415,
                    Id = 1,
                    NationalityId = 1,
                    TaxOfficeId = Guid.Parse("d142adde-3d28-4095-1987-93a362297ed8"),
                    VatRegimeId = Guid.Parse("9735d2c5-4fdf-4549-84e7-b2ae4070ac3a"),
                    Description = Helpers.CreateRandomString(128),
                    TaxNo = "099999999",
                    BalanceLimit = 0M,
                    PutAt = "2023-09-07 09:55:22"
                }
            };
        }

    }

}
