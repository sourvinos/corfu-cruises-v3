using System;
using System.Collections;
using System.Collections.Generic;
using Infrastructure;

namespace Codes {

    public class UpdateInvalidCode : IEnumerable<object[]> {

        IEnumerator IEnumerable.GetEnumerator() => GetEnumerator();

        public IEnumerator<object[]> GetEnumerator() {
            yield return Code_Must_Not_Be_Already_Updated();
        }

        private static object[] Code_Must_Not_Be_Already_Updated(){
            return new object[] {
                new TestCode {
                    StatusCode = 415,
                    Id = Guid.Parse("14d7b5ec-a13c-480d-b67e-f75991afde33"),
                    Description = Helpers.CreateRandomString(128),
                    PutAt = "2022-09-07 09:55:22"
                }
            };
        }

    }

}
