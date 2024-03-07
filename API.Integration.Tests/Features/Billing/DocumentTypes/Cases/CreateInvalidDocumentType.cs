using System.Collections;
using System.Collections.Generic;
using Infrastructure;

namespace DocumentTypes {

    public class CreateInvalidDocumentType : IEnumerable<object[]> {

        IEnumerator IEnumerable.GetEnumerator() => GetEnumerator();

        public IEnumerator<object[]> GetEnumerator() {
            yield return DiscriminatorMustBeValid();
        }

        private static object[] DiscriminatorMustBeValid() {
            return new object[] {
                new TestDocumentType {
                    StatusCode = 466,
                    Abbreviation = Helpers.CreateRandomString(5),
                    Description = Helpers.CreateRandomString(128),
                    Batch = Helpers.CreateRandomString(5),
                    LastDate = "1970-01-01",
                    LastNo = 1,
                    Customers = "+",
                    Suppliers = "",
                    DiscriminatorId = 3,
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
