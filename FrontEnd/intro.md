# 1. Introduction

### 🔸 Who we are
We are a private shipping company based in Corfu, Greece. We operate from April to October and organize daily boat trips to the surrounding islands and the nearby coast of the Greek mainland.

### 🔸 What we do
Our job is to pickup and transfer the persons who book the trips from their staying locations around the island to various ports. They then board one of our ships, taken to their destination and brought back in the evening.

### 🔸 Why do we need an app?
We need to keep detailed records of the persons who book a boat trip because:
   1. They need to be transfered from their accomodation to a particular port.
   2. We need to know who made each reservation. What is one of our employees or someone else?
   3. We need to have some personal info about the passengers to comply with the port authority regulations.

### 🔸 What the app should do
* The primary objective is to allow authenticated users to create, edit and delete reservations and perform specific tasks such as boarding.
* The secondary objective is to allow the passengers to enter their details (check-in) before boarding.

### 🔸 Who will use the app
Users are seperated into three roles: 1. admins, 2. simple users and 3. guests.
   1. Admins: Under this role we need to have our employees with an an active account. They should be able to use the app without restrictions.
   2. Simple users: These are travel offices, hotels and various individuals with an an active account. They should only be able to create new reservations. Editing and deleting should not be allowed. Entering too many passengers that could cause overbooking should also be not allowed. They should also be able to enter, edit and delete the passenger details of each reservation at any time between the initial creation of the reservation but before the ship's departure.
   3. Guests: Persons who have already made a reservation should be able (without credentials) to enter the passenger details (check-in) of those who travel with them. Like simple users, they should be able to do this at any time between the initial creation of the reservation but before the ship's departure.

# 2. Let's dig a little deeper

### 🔸 This is how things are done
Suppose you're on holiday with your family, and, as most visitors do, you want to see the surrounding islands and maybe visit a couple of beaches in the mainland. There are various travel offices around the island so usually, while you're having an evening walk in a resort, you go in one of them and book a trip! That simple. The typical questions you'll have to answer are these: Where you wish to go (the destination), when (the date) and how many others will be going with you (total pax). Then, you are given the exact place and time you should be ready and waiting to be picked up. The transfer from the place of your choice (usually  your accommodation or somewhere near-by) to a port is done by private coaches. In some cases, mini buses or taxis are used, if for example you stay somewhere remote and the use of a coach is inconvenient. After the drop-off, you board one of our ships, enjoy yourselves wherever you go and come back. Obviously you'll be driven back to your accommodation, so you get back on the coach and... that was it! Enjoyed? We hope so!

### 🔸 Things are not that simple are we would like them to be
Port authority regulations are strict about boat trips, that's why you can't just board a boat with your loved ones and sail away! Before you continue your evening walk, you'll be asked to give some personal info about the persons travelling with you. We need to know each passenger's lastname, firstname, birthdate, nationality and, in the rare occasion, the need for special care.

### 🔸 Passenger details
They can be entered into the system in two ways: Our way or your way! Our way goes like this: If the employee at the travel office has enough time or wants to be extra helpful, he/she can enter the passenger details while you wait. Then, you either get an email on your phone with the details about the trip, including all passenger details, or you get a printed piece of paper. This will be your boarding pass which includes a refNo and a QR code. As an alternative (your way), the reservation can be entered into the system without the passenger details. So, the employee enters some basic info, saves, and gets a refNo as a response. You are then given this refNo and you can enter the passenger details yourself at a later time, but obviously before boarding. This means that you'll need internet access to input the passenger details in the app from your mobile device.

### 🔸 Payments
Usually, you pay where you made the reservation and get a receipt. The issuer of this receipt is the point of sale (where you made the reservation) and not our company, unless you made the reservation in one of our offices. Currently, payments and receipts are not managed by the app. Nonetheless, the point of sale must be billed and will be issued an invoice. At the moment, this is done by an external app, but not for long: This functionality will be implemented and merged into the existing app during the winter months of 2023-24 and will be ready for the next season.

### 🔸 You are done
Hopefully, this wasn't too much for you, so enjoy the rest of your evening walk.

# 3. What we have to do
### 🔸Before the end of each day

Late in the afternoon, we have to prepare things for the next day: 
1. Coaches will have to be booked with their drivers and pickups to be scheduled. A coach starts its journey early each morning, picks up passengers along a route and transfers them to a port. A number of passengers is assigned to a driver with the pickup points and he/she does the pickups. If on a particular route we have more people to pickup than the max capacity of a coach, we'll have to find another driver to carry the remaing persons.
2. We must create a pre-boarding list (a draft manifest) for each ship, based on the capacity of each ship, the expected passengers and the destination. This is done so we can have a picture of how many passengers will board each ship and how many ships we'll need.

⚡ A note of caution: The time we usually close our offices varies from the time all other third-party offices close. Yes, we usually close earlier than them! So, what happens if they have a late request for the next day? If there are available seats, the reservation will be created normally, but not always: Since the pickups have already been organized and the drivers have gone to sleep or are at a bar somewhere 😎, if the reservation has a transfer, that is if the passengers require to be driven to the port, this is an issue. The reservation must not be created and we must inform the user. Neither us nor the drivers have to be ready to pickup extra passengers who decide in the middle of the night to go on a boat trip the next morning! However, they can always go to the port themselves. If they stay within a reasonable distance from the port, they can either walk or use other means of transport.

### 🔸 The next morning at the port

Coaches arrive from all over and people are getting off. Our job is to find each reservation, its passengers and board each one of them. This is an important step, because we need to know exactly how many passengers will be on board each ship. There are frequent port authority checks, so everything has to be in order.

* Boarding the easy way 😀
    
    * You are with another three persons, your wife and two children.
    * You have already done the check-in (as described above) and you have a printed piece of paper with the reservation details.
    * You show us this, while one of our employees stands before you with a tablet and does a quick search. The search can be done either by searching based on the refNo or by scanning the QR code.
        * We find the reservation with the personal details of each one.
        * We mark each one who is present as boarded, total four persons.
        * That was it, you can now board. 🥂

* Boarding with delays 😡

    * You are with another three persons, your wife and two children. 
    * Because you were too busy enjoying the sun, or the employee at the office did not enter the passenger details (remember, he/she is not obligated to do so) your check-in never happened.
    * All you have is a refNo. That means that check-in and boarding have to be done before you are allowed to get on the ship.
        * We find the reservation based on the refNo only. Remember, the QR code in on the boarding pass which you don't have.
        * You give us the passenger details and we enter them into the app while you wait.
        * We mark each one who is present as boarded, total three persons. The wife will stay behind and get a tan at the local beach 😂
        * That was it, you can now board. 🥂

* Boarding complete, cleared for departure 🚀

    * This process takes about twenty to thirty minutes, based on the number of passengers and whether they have done their check-in or not.

* Post-facto

    * Since everything is in order, the ship leaves the dock. We must then send the manifest to the port authorities and we are done!

### 🔸 We are done with boarding, let's get back in the office

* Billing in progress, please wait!

Within the next few hours, all hotels, travel offices and individuals (We call them 'customers') who have made a reservation on our behalf, must be billed and issued an invoice. As I have already mentioned, for the time being this billing is done by an external app. This means, because the two apps are not connected, that we have to look at the reservations for each customer, 'copy' all needed details and issue one invoice per customer. The following is is an accurate description of the process:

Each customer is a different story, billing is a complex task and we have different billing strategies depending on the following:

* Which customer will be billed: Not everyone is treated equally, so there are different charges for almost every customer.
* Where did the passengers go to: Did they go somewhere near-by or did they go far away?
* At which port did the boarding take place? It's fair to bill someone based on the distance between the port of departure and the destination. If the departure took place from a port which is closer to the destination, the charges will be lower than those from a port further away.
* What was the age group of the passengers? Were they adults, children of new born babies? Did any of those travel for free for courtesy reasons, like reps or the boss's wife? Adults usually pay full price, children below a certain age pay less and babies travel for free.
* Did every passenger show up, or did any of them decided not to go? As far as I know, these 'no-show' cases are charged normally to avoid the abusive usage of the app.

### 🔸 The never-ending circle

This was a brief description of how things work. The same story is repeated every day from the end of April till the middle of October. 
