using System;
using System.Collections;
using System.Collections.Generic;

namespace Reservations {

    public class ActiveAdminsCanDeleteOwnedByAnyone : IEnumerable<object[]> {

        IEnumerator IEnumerable.GetEnumerator() => GetEnumerator();

        public IEnumerator<object[]> GetEnumerator() {
            yield return Admins_Can_Delete_Own_Records();
            yield return Admins_Can_Delete_Records_Owned_By_Other_Admins();
            yield return Admins_Can_Delete_Records_Owned_By_Simple_Users();
        }

        private static object[] Admins_Can_Delete_Own_Records() {
            return new object[] {
                new TestNewReservation {
                    ReservationId = Guid.Parse("08da1e1d-fa42-4964-8f5b-69a521ba2992")
                }
            };
        }

        private static object[] Admins_Can_Delete_Records_Owned_By_Other_Admins() {
            return new object[] {
                new TestNewReservation {
                    ReservationId = Guid.Parse("08da1f85-42c0-4777-8fe5-3ab3a814fa66")
                }
            };
        }

        private static object[] Admins_Can_Delete_Records_Owned_By_Simple_Users() {
            return new object[] {
                new TestNewReservation {
                    ReservationId = Guid.Parse("08da4544-4981-49c1-836e-be0a8ee707c1")
                }
            };
        }

    }

}