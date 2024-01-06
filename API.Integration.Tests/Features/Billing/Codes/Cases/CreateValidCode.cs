using System.Collections;
using System.Collections.Generic;
using Infrastructure;

namespace Codes {

    public class CreateValidCode : IEnumerable<object[]> {

        IEnumerator IEnumerable.GetEnumerator() => GetEnumerator();

        public IEnumerator<object[]> GetEnumerator() {
            yield return ValidRecord();
        }

        private static object[] ValidRecord() {
            return new object[] {
                new TestCode {
                    Description = Helpers.CreateRandomString(128),
                    Batch = Helpers.CreateRandomString(5),
                    LastDate = "1970-01-01",
                    LastNo = 1,
                    IsActive = true,
                    Customers = "+",
                    Suppliers = "",
                    IsMyData = true,
                    Table8_1 = "Table8_1",
                    Table8_8 ="Table8_8",
                    Table8_9 ="Table8_9"
                }
            };
        }

    }

}
