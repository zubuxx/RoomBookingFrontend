# RoomBooking Application

Web application designed to manage rooms renting, clients and reservations.

## Table of contents

- [General info](#general-info)
- [Technologies](#Technologies)
- [Setup](#Setup)
- [Sources](#Sources)

## General

App has separate admin and user modules. Only admins can update, add and remove reservations, rooms and users. Users are only authorized to view the information. Calendar page allows to check all reservations for the particular day.

## Technologies

Following technologies are used in the project:

Frontend:

- Angular CLI version: 11.2.7
- Bootstrap version:
- CSS

Backend:

- Spring Boot version: 2.4.5
- PostgreSQL: 13.2
- Spring Data JPA version: 2.5.0
- Spring Security version: 5.4.6

All codes of backend are available [here](https://github.com/zubuxx/RoomBookingBackend).

## Setup

Run application by typing in command line: `ng serve`. App will run on port 4200 by default. Then navigate to `http://localhost:4200/`. Make sure, that backend has been already running properly.
If you need instructions, how to setup backend, check the [repository](https://github.com/zubuxx/RoomBookingBackend), please.

## Sources

Project is inspired by the course
"Angular for java developers." created by Matt Greencroft.
