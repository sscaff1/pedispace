# pediSpace
## Pedicab business management made easy
### Powered by Meteor and MongoDB

## Main Features
 - Scheduling
	- Managers and Admins can set rates for each day in the schedule. They can accompany the rates with comments. For example, a comment like "Mardi Gras" will act as justification for a much higher shift rate.
	- Bikers can request schedules by filling out a simple form. If they request a date with a predefined shift rate, they will see that in their form request. No guessing as to what the rate will be on a particular date.
	- All users can print schedules. Managers and Admins will see all users scheduled for their respective locations while bikers will see a schedule that only includes themselves.
	- Managers and Admins can schedule riders for particular shifts.
 - Bike, Location & Radio Management
	- Bikes and radios can be added by Managers & Admins. Locations can be added by Admins. Bikes and Radios are specific to a particular location. By default when adding bikes and radios, each is set to active. When a bike or radio is set to active, it is available for bikers when they fill out the shift add forms.
	- Bikes and radios can be set to inactive by managers and admins. When they are set to inactive, they will not appear as available when bikers are filling out the shift add form.
 - Detailed User Functionality - *Note all users created by a fixture.js file should change their password immediately.*
	- Admin are set up when the application is installed. I created a fixture.js file that by default creates some users. You can see an example of this fixture.js file by following the [Discover Meteor](http://discovermeteor.com) book. I did not include a fixture.js file in this repository Admin have access to all locations and can view all data. They can also edit other users across locations. Admin are the only users that can add new locations to the application.
	- Managers can be created by the fixture.js file or a user can be edited by an admin to create a manager. Managers have all access to their location. Managers cannot access other location data and cannot add new locations.
	- Bikers are created when users register. These users will then appear on the drop down menu in the shift add form for the shop. Bikers are able to request schedule, edit their profile, and print out their schedule. Managers and Admins can now scheduled registered bikers for shifts as well.
	- Shop users are created by default through the fixtures.js file. They can also be created by registering a user and then changing the role of that user to shop. The shop can only do one thing: add new shifts. As designed, there should be one shop user per location. While in the shop and changing or starting shifts, the shop user should be logged in. When the shop user is logged in, the bikers will be able to input their shifts quickly without having to log in and out. The shift rate will also dynamically populate for defined shift rates. Not every shift will have a rate because the admins or managers may not have put in a rate.
## Next Steps
 - Shop users are created when a new location is added.
 - Admins and managers can add users when logged in.
 - Mechanics are another user that can more traditionally clock in and out.
 - Biker performance ranking.
## About
This app was created by [Tela Edge, LLC](http://telaedge.com). The purpose of this app was to make pedicab management dirt simple. The product is currently in beta. The source code is open source, and I encourage contributions. Email me at [steven@telaedge.com](mailto:steven@telaedge.com) if you have any questions or like to use this product for your business. 