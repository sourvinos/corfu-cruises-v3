using System;
using System.Collections;
using System.Collections.Generic;

namespace Reservations {

    public class ActiveAdminsCanNotCreateWhenInvalid : IEnumerable<object[]> {

        IEnumerator IEnumerable.GetEnumerator() => GetEnumerator();

        public IEnumerator<object[]> GetEnumerator() {
            yield return Nothing_For_This_Day();
            yield return Nothing_For_This_Day_And_Destination();
            yield return Nothing_For_This_Day_And_Destination_And_Port();
            yield return Duplicate_Records_Are_Not_Allowed();
            yield return Passenger_Count_Is_Not_Correct();
            yield return Customer_Must_Exist();
            yield return Customer_Must_Be_Active();
            yield return PickupPoint_Must_Exist();
            yield return PickupPoint_Must_Be_Active();
            yield return Port_Must_Exist();
            yield return Port_Must_Be_Active();
            yield return Gender_Must_Exist();
            yield return Gender_Must_Be_Active();
            yield return Nationality_Must_Exist();
            yield return Nationality_Must_Be_Active();
        }

        private static object[] Nothing_For_This_Day() {
            return new object[] {
                new TestNewReservation {
                    StatusCode = 410,
                    Date = "2022-03-01",
                    Now = new DateTime(2022, 4, 30, 12, 00, 00),
                    CustomerId = 1,
                    DestinationId = 1,
                    PickupPointId = 133,
                    PortId = 1,
                    TicketNo = "D5",
                    Adults = 2,
                    Passengers = new List<TestPassenger>() {
                        new() { Lastname = "TIMMINS", Firstname = "JOAN", Birthdate = "2065-08-21", NationalityId = 70, GenderId = 2 },
                        new() { Lastname = "TIMMINS", Firstname = "ALAN", Birthdate = "2065-07-17", NationalityId = 70, GenderId = 1 },
                    }
                }
            };
        }

        private static object[] Nothing_For_This_Day_And_Destination() {
            return new object[] {
                new TestNewReservation {
                    StatusCode = 410,
                    Date = "2022-03-04",
                    Now = new DateTime(2022, 4, 30, 12, 00, 00),
                    CustomerId = 1,
                    DestinationId = 3,
                    PickupPointId = 133,
                    PortId = 1,
                    TicketNo = "D5",
                    Adults = 2,
                    Passengers = new List<TestPassenger>() {
                        new() { Lastname = "TIMMINS", Firstname = "JOAN", Birthdate = "2065-08-21", NationalityId = 70, GenderId = 2 },
                        new() { Lastname = "TIMMINS", Firstname = "ALAN", Birthdate = "2065-07-17", NationalityId = 70, GenderId = 1 },
                    }
                }
            };
        }

        private static object[] Nothing_For_This_Day_And_Destination_And_Port() {
            return new object[] {
                new TestNewReservation {
                    StatusCode = 410,
                    Date = "2022-03-04",
                    Now = new DateTime(2022, 3, 2, 12, 00, 00),
                    CustomerId = 1,
                    DestinationId = 1,
                    PickupPointId = 266,
                    PortId = 2,
                    TicketNo = "Eagle Travel",
                    Adults = 5,
                    Passengers = new List<TestPassenger>() {
                        new() { Lastname = "sacomono", Firstname = "MARIECLEO", Birthdate = "1981-08-14", NationalityId = 89, GenderId = 2 },
                        new() { Lastname = "KAGREN", Firstname = "BIRCH", Birthdate = "1957-12-13", NationalityId = 89, GenderId = 2 },
                        new() { Lastname = "ANDREW", Firstname = "SUZAN", Birthdate = "1975-08-21", NationalityId = 89, GenderId = 2 },
                        new() { Lastname = "ADEONOJOBI", Firstname = "PETER", Birthdate = "1965-11-11", NationalityId = 89, GenderId = 1 },
                        new() { Lastname = "DERBY ", Firstname = "ELAINE", Birthdate = "1964-12-12", NationalityId = 89, GenderId = 2 }
                    }
                }
            };
        }

        private static object[] Duplicate_Records_Are_Not_Allowed() {
            return new object[] {
                new TestNewReservation {
                    StatusCode = 409,
                    Date = "2023-07-01",
                    Now = new DateTime(2022, 4, 30, 12, 00, 00),
                    CustomerId = 2,
                    DestinationId = 1,
                    PickupPointId = 129,
                    PortId = 1,
                    RefNo = "PA74512",
                    TicketNo = "OUH74",
                    Adults = 2
                }
            };
        }

        private static object[] Passenger_Count_Is_Not_Correct() {
            return new object[]{
                new TestNewReservation{
                    StatusCode = 455,
                    Date = "2022-03-04",
                    Now = new DateTime(2022, 3, 5, 12, 00, 00),
                    CustomerId = 1,
                    DestinationId = 1,
                    PickupPointId = 642,
                    PortId = 1,
                    RefNo = "PA74512",
                    TicketNo = "xxxx",
                    Adults = 2,
                    Passengers = new List<TestPassenger>() {
                        new() { Lastname = "AEDAN", Firstname = "ZAYAS", Birthdate = "1992-06-12", NationalityId = 123, GenderId = 1 },
                        new() { Lastname = "ALONA", Firstname = "CUTLER", Birthdate = "1964-04-28", NationalityId = 127, GenderId = 2 },
                        new() { Lastname = "LYA", Firstname = "TROWBRIDGE", Birthdate = "2015-01-21", NationalityId = 211, GenderId = 1 },
                    }
                }
            };
        }

        private static object[] Customer_Must_Exist() {
            return new object[] {
                new TestNewReservation {
                    StatusCode = 450,
                    Date = "2022-03-04",
                    Now = new DateTime(2022, 4, 30, 12, 00, 00),
                    CustomerId = 999,
                    DestinationId = 1,
                    PickupPointId = 285,
                    PortId = 1,
                    RefNo = "PA74512",
                    TicketNo = "xxxxxx"
                }
            };
        }

        private static object[] Customer_Must_Be_Active() {
            return new object[] {
                new TestNewReservation {
                    StatusCode = 450,
                    Date = "2022-03-04",
                    Now = new DateTime(2022, 4, 30, 12, 00, 00),
                    CustomerId = 195,
                    DestinationId = 1,
                    PickupPointId = 642,
                    PortId = 1,
                    RefNo = "PA74512",
                    TicketNo = "xxxxxx"
                }
            };
        }

        private static object[] Gender_Must_Exist() {
            return new object[]{
                new TestNewReservation{
                    StatusCode = 457,
                    Date = "2022-03-04",
                    Now = new DateTime(2022, 4, 30, 12, 00, 00),
                    CustomerId = 1,
                    DestinationId = 1,
                    PickupPointId = 12,
                    PortId = 1,
                    RefNo = "PA74512",
                    TicketNo = "xxxx",
                    Adults = 2,
                    Passengers = new List<TestPassenger>() {
                        new() { Lastname = "AEDAN", Firstname = "ZAYAS", Birthdate = "1992-06-12", NationalityId = 1, GenderId = 5 },
                    }
                }
            };
        }

        private static object[] Gender_Must_Be_Active() {
            return new object[]{
                new TestNewReservation{
                    StatusCode = 457,
                    Date = "2022-03-04",
                    Now = new DateTime(2022, 4, 30, 12, 00, 00),
                    CustomerId = 1,
                    DestinationId = 1,
                    PickupPointId = 12,
                    PortId = 1,
                    RefNo = "PA74512",
                    TicketNo = "xxxx",
                    Adults = 2,
                    Passengers = new List<TestPassenger>() {
                        new() { Lastname = "AEDAN", Firstname = "ZAYAS", Birthdate = "1992-06-12", NationalityId = 1, GenderId = 4 },
                    }
                }
            };
        }

        private static object[] Nationality_Must_Exist() {
            return new object[]{
                new TestNewReservation{
                    StatusCode = 456,
                    Date = "2022-03-04",
                    Now = new DateTime(2022, 4, 30, 12, 00, 00),
                    CustomerId = 1,
                    DestinationId = 1,
                    PickupPointId = 12,
                    PortId = 1,
                    RefNo = "PA74512",
                    TicketNo = "xxxx",
                    Adults = 2,
                    Passengers = new List<TestPassenger>() {
                        new() { Lastname = "AEDAN", Firstname = "ZAYAS", Birthdate = "1992-06-12", NationalityId = 999, GenderId = 3 },
                    }
                }
            };
        }

        private static object[] Nationality_Must_Be_Active() {
            return new object[]{
                new TestNewReservation{
                    StatusCode = 456,
                    Date = "2022-03-04",
                    Now = new DateTime(2022, 4, 30, 12, 00, 00),
                    CustomerId = 1,
                    DestinationId = 1,
                    PickupPointId = 12,
                    PortId = 1,
                    RefNo = "PA74512",
                    TicketNo = "xxxx",
                    Adults = 2,
                    Passengers = new List<TestPassenger>() {
                        new() { Lastname = "AEDAN", Firstname = "ZAYAS", Birthdate = "1992-06-12", NationalityId = 255, GenderId = 3 },
                    }
                }
            };
        }

        private static object[] PickupPoint_Must_Be_Active() {
            return new object[] {
                new TestNewReservation {
                    StatusCode = 452,
                    Date = "2022-03-04",
                    Now = new DateTime(2022, 4, 30, 12, 00, 00),
                    CustomerId = 1,
                    DestinationId = 1,
                    PickupPointId = 23,
                    PortId = 1,
                    Adults = 2,
                    RefNo = "PA74512",
                    TicketNo = "xxxxx"
                }
            };
        }

        private static object[] PickupPoint_Must_Exist() {
            return new object[] {
                new TestNewReservation {
                    StatusCode = 452,
                    Date = "2022-03-04",
                    Now = new DateTime(2022, 4, 30, 12, 00, 00),
                    CustomerId = 1,
                    DestinationId = 1,
                    PickupPointId = 999,
                    PortId = 1,
                    Adults = 2,
                    RefNo = "PA74512",
                    TicketNo = "xxxxx"
                }
            };
        }

        private static object[] Port_Must_Exist() {
            return new object[] {
                new TestNewReservation {
                    StatusCode = 452,
                    Date = "2022-03-04",
                    Now = new DateTime(2022, 4, 30, 12, 00, 00),
                    CustomerId = 1,
                    DestinationId = 1,
                    PickupPointId = 23,
                    PortId = 99,
                    Adults = 2,
                    RefNo = "PA74512",
                    TicketNo = "xxxxx"
                }
            };
        }

        private static object[] Port_Must_Be_Active() {
            return new object[] {
                new TestNewReservation {
                    StatusCode = 452,
                    Date = "2022-03-04",
                    Now = new DateTime(2022, 4, 30, 12, 00, 00),
                    CustomerId = 1,
                    DestinationId = 1,
                    PickupPointId = 23,
                    PortId = 3,
                    Adults = 2,
                    RefNo = "PA74512",
                    TicketNo = "xxxxx"
                }
            };
        }

    }

}
