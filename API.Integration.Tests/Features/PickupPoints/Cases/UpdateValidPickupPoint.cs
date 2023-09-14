using System.Collections;
using System.Collections.Generic;
using Infrastructure;

namespace PickupPoints {

    public class UpdateValidPickupPoint : IEnumerable<object[]> {

        IEnumerator IEnumerable.GetEnumerator() => GetEnumerator();

        public IEnumerator<object[]> GetEnumerator() {
            yield return ValidRecord();
        }

        private static object[] ValidRecord() {
            return new object[] {
                new TestPickupPoint {
                    Id = 1,
                    CoachRouteId = 4,
                    Description = Helpers.CreateRandomString(128),
                    ExactPoint = Helpers.CreateRandomString(128),
                    Time = "08:00",
                    IsActive = true,
                    PutAt = "2023-09-07 09:54:23"
                }
            };
        }

    }

}
