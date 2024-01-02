using System;
using System.Collections;
using System.Collections.Generic;
using Infrastructure;

namespace Customers {

    public class CreateInvalidCustomer : IEnumerable<object[]> {

        IEnumerator IEnumerable.GetEnumerator() => GetEnumerator();

        public IEnumerator<object[]> GetEnumerator() {
            yield return Nationality_Must_Exist();
            yield return Nationality_Must_Be_Active();
            yield return TaxOffice_Must_Exist();
            yield return TaxOffice_Must_Be_Active();
            yield return VatRegime_Must_Exist();
            yield return VatRegime_Must_Be_Active();
        }

        private static object[] Nationality_Must_Exist() {
            return new object[] {
                new TestCustomer {
                    StatusCode = 456,
                    NationalityId = 9999,
                    TaxOfficeId = Guid.Parse("00b19ade-546c-7351-a164-9f5eeb0b3a69"),
                    VatRegimeId = Guid.Parse("9735d2c5-4fdf-4549-84e7-b2ae4070ac3a"),
                    Description = Helpers.CreateRandomString(128),
                    TaxNo = "099999999",
                    BalanceLimit = 0M
                }
            };
        }

        private static object[] Nationality_Must_Be_Active() {
            return new object[] {
                new TestCustomer {
                    StatusCode = 456,
                    NationalityId = 255,
                    TaxOfficeId = Guid.Parse("00b19ade-546c-7351-a164-9f5eeb0b3a69"),
                    VatRegimeId = Guid.Parse("9735d2c5-4fdf-4549-84e7-b2ae4070ac3a"),
                    Description = Helpers.CreateRandomString(128),
                    TaxNo = "099999999",
                    BalanceLimit = 0M
                }
            };
        }

        private static object[] TaxOffice_Must_Exist() {
            return new object[] {
                new TestCustomer {
                    StatusCode = 458,
                    NationalityId = 1,
                    TaxOfficeId = Guid.Parse("ea6d1494-a7b4-47f4-b7ce-a462a73ae6f3"),
                    VatRegimeId = Guid.Parse("9735d2c5-4fdf-4549-84e7-b2ae4070ac3a"),
                    Description = Helpers.CreateRandomString(128),
                    TaxNo = "099999999",
                    BalanceLimit = 0M
                }
            };
        }

        private static object[] TaxOffice_Must_Be_Active() {
            return new object[] {
                new TestCustomer {
                    StatusCode = 458,
                    NationalityId = 1,
                    TaxOfficeId = Guid.Parse("29c8fa5d-95f0-33d5-66e0-fbe41f368cff"),
                    VatRegimeId = Guid.Parse("9735d2c5-4fdf-4549-84e7-b2ae4070ac3a"),
                    Description = Helpers.CreateRandomString(128),
                    TaxNo = "099999999",
                    BalanceLimit = 0M
                }
            };
        }

        private static object[] VatRegime_Must_Exist() {
            return new object[]{
                new TestCustomer {
                    StatusCode = 463,
                    NationalityId = 1,
                    TaxOfficeId = Guid.Parse("00b19ade-546c-7351-a164-9f5eeb0b3a69"),
                    VatRegimeId = Guid.Parse("f34c709f-95e4-4c97-a76e-edb1d13b5b1c"),
                    Description = Helpers.CreateRandomString(128),
                    TaxNo = "099999999",
                    BalanceLimit = 0M
                }
            };
        }

        private static object[] VatRegime_Must_Be_Active() {
            return new object[] {
                new TestCustomer {
                    StatusCode = 463,
                    NationalityId = 1,
                    TaxOfficeId = Guid.Parse("00b19ade-546c-7351-a164-9f5eeb0b3a69"),
                    VatRegimeId = Guid.Parse("51c16717-c294-40ff-90de-b41060c85e30"),
                    Description = Helpers.CreateRandomString(128),
                    TaxNo = "099999999",
                    BalanceLimit = 0M
                }
            };
        }

    }

}
