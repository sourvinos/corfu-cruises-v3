using System.Collections;
using System.Collections.Generic;
using Infrastructure;

namespace DocumentTypes {

    public class UpdateInvalidDocumentType : IEnumerable<object[]> {

        IEnumerator IEnumerable.GetEnumerator() => GetEnumerator();

        public IEnumerator<object[]> GetEnumerator() {
            yield return Code_Must_Not_Be_Already_Updated();
        }

        private static object[] Code_Must_Not_Be_Already_Updated(){
            return new object[] {
                new TestDocumentType {
                    StatusCode = 415,
                    Id = 3,
                    Description = Helpers.CreateRandomString(128),
                    Batch = Helpers.CreateRandomString(5),
                    LastDate = "1970-01-01",
                    LastNo = 1,
                    IsActive = true,
                    Customers = "+",
                    Suppliers = " ",
                    IsMyData = true,
                    Table8_1 = "Table8_1",
                    Table8_8 ="Table8_8",
                    Table8_9 ="Table8_9",                    
                    PutAt = "2022-09-07 09:55:22"
                }
            };
        }

    }

}
