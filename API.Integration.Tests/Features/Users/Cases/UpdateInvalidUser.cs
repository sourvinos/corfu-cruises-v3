using System.Collections;
using System.Collections.Generic;

namespace Users {

    public class UpdateInvalidUser : IEnumerable<object[]> {

        IEnumerator IEnumerable.GetEnumerator() => GetEnumerator();

        public IEnumerator<object[]> GetEnumerator() {
            yield return UsernameAlreadyExists();
            yield return EmailAlreadyExists();
        }

        private static object[] UsernameAlreadyExists() {
            return new object[] {
                new TestUpdateUser {
                    StatusCode = 492,
                    Id = "c0e4af2d-be81-41a3-8e6c-67aea53ee486",
                    CustomerId = 2,
                    UserName = "mpotsis",
                    Displayname = "WOW",
                    Email = "candebeleted@server.com",
                    IsAdmin = false,
                    IsActive = true
                }
            };
        }

        private static object[] EmailAlreadyExists() {
            return new object[] {
                new TestUpdateUser {
                    StatusCode = 492,
                    Id = "c0e4af2d-be81-41a3-8e6c-67aea53ee486",
                    UserName = "wow",
                    Displayname = "Wow",
                    CustomerId = 2,
                    Email = "operations.corfucruises@gmail.com",
                    IsAdmin = false,
                    IsActive = true
                }
            };
        }

    }

}
