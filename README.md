# Smart Parking Management System
Technical Answers for Real World Problems (TARP) project for 6rd semester.

# PROBLEM STATEMENT:

What is smart parking?

The goal is to efficiently determine parking space through an interconnected system with smartphones and other sensors. This real time feedback is accomplished using counters and sensors embedded in the parking area.

# Challenges faced

1. Time :
Time taken to search for a parking space can be utilized elsewhere efficiently, especially in deployment areas such as hospitals etc. This holds true during exit aswell.

2. Inappropriate and unorganized parking:
In the current system drivers roam about the lot searching for any free space this leads to unnecessary banter and commotion, moreover the disorganization often cause delay in exit due to parking traffic.

3. Environmental factors:
Beside time, a lot of fuel is consumed looking for a parking space.

4. Clogging roads:
The insufficient utilization of the parking space and the current system proves to be frustration which causes drivers to park their vehicles on the road thus clogging them.

# Flowchart
<img width="474" alt="image" src="https://user-images.githubusercontent.com/91727830/230726032-e1ceea53-d623-4316-aaaa-c598a7e76752.png">


# Circuit Diagram

![image](https://user-images.githubusercontent.com/91727830/230726120-f942cb80-3dac-44ee-8de8-7d959d817bfb.png)

# UML Diagram
![image](https://user-images.githubusercontent.com/91727830/230725829-3acdfa8e-e59b-456a-8299-d51efdaf79c0.png)

![image](https://user-images.githubusercontent.com/91727830/230725853-eb87b3a0-e99b-4ad4-a8c4-1746506b3b96.png)

![image](https://user-images.githubusercontent.com/91727830/230725860-faf0d9d5-c940-4a94-9967-d82bc3e690ae.png)

# Hardware

![image](https://user-images.githubusercontent.com/91727830/230726155-b6fa7055-ee55-4484-b99b-b0c3f8c5fbb9.png)

![image](https://user-images.githubusercontent.com/91727830/230726164-5c905bd2-8d10-4b76-9a79-fda7635ac71d.png)

Admin panel

Admin login page

![image](https://user-images.githubusercontent.com/91727830/230726195-a3dd0512-ca72-4fa2-9d31-0332f88b1d3d.png)

 
The admin has to enter the Gate number and Vehicle number to generate the QR Code. This QR code will be scanned by the Vehicle driver to book a slot. The Gate number can be ignored and can be hardcoded in the Gate system or computer itself.
 
![image](https://user-images.githubusercontent.com/91727830/230726203-5e7dcf66-8805-4982-a6f2-28e2a1bfbc8a.png)


#### The Vehicle Driver panel

After scanning the QR code, the driver can book a slot in first floor or second floor according to their favorite spots. 
 
![image](https://user-images.githubusercontent.com/91727830/230726217-b6cad063-b06c-4fff-b6fe-78fa9876b2e1.png)

Let us see an example of how it works

Let’s say F2 and F3 slots are occupied, means in this both the slots, a vehicle is parked.

![image](https://user-images.githubusercontent.com/91727830/230726233-236920a2-2056-4e5c-bf7d-bfa3dc3a1470.png)

Let’s say the user have reserved F1. Meaning the slot is just reserved and not occupied. Now the Boom Barrier will open for 3 seconds for the user to drive their car in.

After reserving the slot, the user can pay the bill while exiting the parking. The below panel is shown the user.

![image](https://user-images.githubusercontent.com/91727830/230726256-7c5baae1-d1d7-4200-8251-1e7b6f859139.png)

![image](https://user-images.githubusercontent.com/91727830/230726271-e09f02bc-4cf3-4204-88ac-4bb6ae4b3fa0.png)

After a user reserving a slot, this is what is shown to the other user in real-time, so that another user cannot book the same slot. 

![image](https://user-images.githubusercontent.com/91727830/230726280-3f69b98c-092a-4919-a682-6533fdf004ab.png)

Once the reserved slot owner occupies the slot, the status is changed to occupied.

![image](https://user-images.githubusercontent.com/91727830/230726289-f583a7d3-80fa-4347-a42b-f46e4121a41f.png)

After leaving the slot, the status is marked as empty.
 
 ![image](https://user-images.githubusercontent.com/91727830/230726293-2562bcae-9fa4-45f3-aa60-1e4307ba0a00.png)

Finally, we have successfully implemented the hardware for Smart Parking Management and the Website user interface for the users to book slots and pay according to the parking time.


## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```
