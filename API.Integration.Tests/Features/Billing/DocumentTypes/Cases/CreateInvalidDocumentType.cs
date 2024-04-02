using System.Collections;
using System.Collections.Generic;
using Infrastructure;

namespace DocumentTypes {

    public class CreateInvalidDocumentType : IEnumerable<object[]> {

        IEnumerator IEnumerable.GetEnumerator() => GetEnumerator();

        public IEnumerator<object[]> GetEnumerator() {
            yield return Company_Must_Exist();
            yield return Company_Must_Be_Active();
        }

        private static object[] Company_Must_Exist() {
            return new object[] {
                new TestDocumentType {
                    StatusCode = 449,
                    ShipOwnerId = 9999,
                    Abbreviation = Helpers.CreateRandomString(5),
                    Description = Helpers.CreateRandomString(128),
                    Batch = Helpers.CreateRandomString(5),
                    LastDate = "1970-01-01",
                    LastNo = 1,
                    Customers = "+",
                    Suppliers = "",
                    DiscriminatorId = 1,
                    IsMyData = true,
                    Table8_1 = "Table8_1",
                    Table8_8 = "Table8_8",
                    Table8_9 = "Table8_9",
                    IsActive = true
                }
            };
        }

        private static object[] Company_Must_Be_Active() {
            return new object[] {
                new TestDocumentType {
                    StatusCode = 449,
                    ShipOwnerId = 4,
                    Abbreviation = Helpers.CreateRandomString(5),
                    Description = Helpers.CreateRandomString(128),
                    Batch = Helpers.CreateRandomString(5),
                    LastDate = "1970-01-01",
                    LastNo = 1,
                    Customers = "+",
                    Suppliers = "",
                    DiscriminatorId = 1,
                    IsMyData = true,
                    Table8_1 = "Table8_1",
                    Table8_8 = "Table8_8",
                    Table8_9 = "Table8_9",
                    IsActive = true
                }
            };
        }

    }

}
