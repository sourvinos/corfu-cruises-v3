using System;
using System.Collections;
using System.Collections.Generic;

namespace Prices {

    public class UpdateInvalidPrice : IEnumerable<object[]> {

        IEnumerator IEnumerable.GetEnumerator() => GetEnumerator();

        public IEnumerator<object[]> GetEnumerator() {
            yield return Customer_Must_Exist();
            yield return Destination_Must_Exist();
            yield return Port_Must_Exist();
            yield return AdultsWithTransferMustNotBeNegative();
            yield return AdultsWithoutTransferMustNotBeNegative();
            yield return KidsWithTransferMustNotBeNegative();
            yield return KidsWithoutTransferMustNotBeNegative();
            yield return Price_Must_Not_Be_Already_Updated();
        }

        private static object[] Customer_Must_Exist() {
            return new object[] {
                new TestPrice {
                    StatusCode = 450,
                    Id = Guid.Parse("4566b88d-ed00-4996-be85-732c93f24943"),
                    CustomerId = 9999,
                    DestinationId = 1,
                    PortId = 1,
                    From = "2023-01-01",
                    To = "2023-01-01",
                    AdultsWithTransfer = 0.01M,
                    AdultsWithoutTransfer = 0.02M,
                    KidsWithTransfer = 0.03M,
                    KidsWithoutTransfer = 0.04M,
                    PutAt = "2023-12-29 05:09:04"
                }
            };
        }

        private static object[] Destination_Must_Exist() {
            return new object[] {
                new TestPrice {
                    StatusCode = 451,
                    Id = Guid.Parse("4566b88d-ed00-4996-be85-732c93f24943"),
                    CustomerId = 1,
                    DestinationId = 9999,
                    PortId = 1,
                    From = "2023-01-01",
                    To = "2023-12-31",
                    AdultsWithTransfer = 0.01M,
                    AdultsWithoutTransfer = 0.02M,
                    KidsWithTransfer = 0.03M,
                    KidsWithoutTransfer = 0.04M,
                    PutAt = "2023-12-29 05:09:04"
                }
            };
        }

        private static object[] Port_Must_Exist() {
            return new object[] {
                new TestPrice {
                    StatusCode = 460,
                    Id = Guid.Parse("4566b88d-ed00-4996-be85-732c93f24943"),
                    CustomerId = 1,
                    DestinationId = 1,
                    PortId = 9999,
                    From = "2023-01-01",
                    To = "2023-12-31",
                    AdultsWithTransfer = 0.01M,
                    AdultsWithoutTransfer = 0.02M,
                    KidsWithTransfer = 0.03M,
                    KidsWithoutTransfer = 0.04M,
                    PutAt = "2023-12-29 05:09:04"
                }
            };
        }

        private static object[] AdultsWithTransferMustNotBeNegative() {
            return new object[] {
                new TestPrice {
                    StatusCode = 461,
                    Id = Guid.Parse("4566b88d-ed00-4996-be85-732c93f24943"),
                    CustomerId = 1,
                    DestinationId = 1,
                    PortId = 1,
                    From = "2023-01-01",
                    To = "2023-12-31",
                    AdultsWithTransfer = -0.01M,
                    AdultsWithoutTransfer = 0.02M,
                    KidsWithTransfer = 0.03M,
                    KidsWithoutTransfer = 0.04M,
                    PutAt = "2023-12-29 05:09:04"
                }
            };
        }

        private static object[] AdultsWithoutTransferMustNotBeNegative() {
            return new object[] {
                new TestPrice {
                    StatusCode = 461,
                    Id = Guid.Parse("4566b88d-ed00-4996-be85-732c93f24943"),
                    CustomerId = 1,
                    DestinationId = 1,
                    PortId = 1,
                    From = "2023-01-01",
                    To = "2023-12-31",
                    AdultsWithTransfer = 0.01M,
                    AdultsWithoutTransfer = -0.02M,
                    KidsWithTransfer = 0.03M,
                    KidsWithoutTransfer = 0.04M,
                    PutAt = "2023-12-29 05:09:04"
                }
            };
        }

        private static object[] KidsWithTransferMustNotBeNegative() {
            return new object[] {
                new TestPrice {
                    StatusCode = 461,
                    Id = Guid.Parse("4566b88d-ed00-4996-be85-732c93f24943"),
                    CustomerId = 1,
                    DestinationId = 1,
                    PortId = 1,
                    From = "2023-01-01",
                    To = "2023-12-31",
                    AdultsWithTransfer = 0.01M,
                    AdultsWithoutTransfer = 0.02M,
                    KidsWithTransfer = -0.03M,
                    KidsWithoutTransfer = 0.04M,
                    PutAt = "2023-12-29 05:09:04"
                }
            };
        }

        private static object[] KidsWithoutTransferMustNotBeNegative() {
            return new object[] {
                new TestPrice {
                    StatusCode = 461,
                    Id = Guid.Parse("4566b88d-ed00-4996-be85-732c93f24943"),
                    CustomerId = 1,
                    DestinationId = 1,
                    PortId = 1,
                    From = "2023-01-01",
                    To = "2023-12-31",
                    AdultsWithTransfer = 0.01M,
                    AdultsWithoutTransfer = 0.02M,
                    KidsWithTransfer = 0.03M,
                    KidsWithoutTransfer = -0.04M,
                    PutAt = "2023-12-29 05:09:04"
                }
            };
        }

        private static object[] Price_Must_Not_Be_Already_Updated() {
            return new object[] {
                new TestPrice {
                    StatusCode = 415,
                    Id = Guid.Parse("4566b88d-ed00-4996-be85-732c93f24943"),
                    CustomerId = 1,
                    DestinationId = 1,
                    PortId = 1,
                    From = "2023-01-01",
                    To = "2023-01-01",
                    AdultsWithTransfer = 0.01M,
                    AdultsWithoutTransfer = 0.02M,
                    KidsWithTransfer = 0.03M,
                    KidsWithoutTransfer = 0.04M,
                    PutAt = "2023-09-07 09:00:41"
                }
            };
        }

    }

}
