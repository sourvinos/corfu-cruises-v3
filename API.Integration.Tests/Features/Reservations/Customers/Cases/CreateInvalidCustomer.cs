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
                    TaxOfficeId = 1,
                    VatRegimeId = 1,
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
                    NationalityId = 254,
                    TaxOfficeId = 1,
                    VatRegimeId = 1,
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
                    TaxOfficeId = 999,
                    VatRegimeId = 1,
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
                    TaxOfficeId = 144,
                    VatRegimeId = 1,
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
                    TaxOfficeId = 1,
                    VatRegimeId = 99,
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
                    TaxOfficeId = 1,
                    VatRegimeId = 3,
                    Description = Helpers.CreateRandomString(128),
                    TaxNo = "099999999",
                    BalanceLimit = 0M
                }
            };
        }

    }

}
