[Back to the introduction](readme.md)

## The Backend  🚀

📌 API

This project was started when .NET was still in v3.1 and it follows the updates up to this day with v7.0. EF Core has the responsibility to query and alter the database. The directory structure is separated into two base directories: Features (vertical slices) and Infrastructure for easy identification and replication in other projects.

📌 The database

MySQL is the data store. Except the usual primary and foreign keys, constraints are used to prevent a record from deletion if it's used in another table.

📌 Logging

All database errors are caught by Serilog and stored in text files. After each database job is completed, regardless of the outcome, the users are informed with messages.

📌Controlled access

Identity Server is used without third-party dependencies, complete with password change and password reset. Three levels of access is used based on the user's role: Admins, simple users and guests. There will be another role added, to allow access to the accountants, so they can manage sales and billing.

📌 Data validation

All model rules are kept in seperate files by using fluent validation. This leaves every domain object noise-free.

📌 Data Transfer Objects

At least one pair for each table is used, different for reading and writing. All mapping between the two objects is done with Automapper.

📌 Integration tests

The part that deals with validating a new reservation before it can be saved is complex. Currently, about fifteen (15) checks are performed to ensure that each new reservation complies with a set of rules. To accomplish this, there is a mirror database which is used to test these rules. In total, there are about five hundred and fifty (550) tests.

📌 Concurrency checks

One of the latest additions was the ability to check (during the update process) whether a record (of any table) has been altered since it was last read from the database. When this is the case, the user that attempts to overwrite these changes is informed and the update is not committed.


## The front-end  🚀

📌 Welcome to Angular

In the beginning there was v7. Now we are on v16 and looking forward for the next version. The directory structure follows this of the API with vertical slices based on the feature. Custom components with lots of functionality and simple components that just accept some inputs have been created.

📌 Material design

Angular Material has always been used. However, the update from v14 to v15 (and now on the latest v16) in mid July 2023, was an absolute nightmare due to the braking changes. But it was worth it. 

📌 Styling

I believe that the UI has to be designed so that the users can have an experience. I see the state of some b2b's out there where the developers have just thrown the components on the screen without thinking and without any care for the end-user. Just interested in getting-the-job-done and deliver another product. However, since beauty is in the eye of the beholder, I will not go any futher battering the majority of the designers.

📌 Foreign Language support

Support for any language is done with a custom implementation of my own, completely without Angular i18n. The users can switch language at any time and the changes are reflected application-wide instantaneously without the need to logout. All elements are affected, including table headers and messages. The addition of any number of languages can be done with ease because the language files are kept separate. Currently there's support for Czech, English, French, German and Greek.

📌 Statistics

Based on the foreign keys of the reservations table, there are YTD reports. For the moment, only data from the current year is calculated, however very soon there will be the ability to compare two subsequest years.

[Back to the introduction](readme.md)