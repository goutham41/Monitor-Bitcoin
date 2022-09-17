# Cryptocurrency Price Tracker

This api monitors every 30sec the current bincoin price .
And see if the current price breaking maximum (or) minimum price than it alert by sending email.

---
## Requirements

For development, you will only need Node.js and a node global package, installed in your environement.

---
## Install

    $ git clone https://github.com/goutham41/Monitor-Bitcoin.git
    $ cd server
    $ npm install
    
---
## Running the project

    $ node index.js 
    $ (or) npm run start 
    $ server runs on port 8080
 
---
## get request to Monitor Bitcon

    $ get request  :  http://localhost:8080/?date=01/05/2022&page=1&limit=10
    $ query contains : 
                      example : 
                     {
                        date  : 01/25/2022,
                        page  : 1,
                        limit : 10
                      }
    Here Limit indicates to get response 10 monitored data .
    By Giving page No your can  create the pagination .
    You can also filter by date.
 
---
## Environment variables 
    
    $ create .env file 
    $ On that we have to give 
  
                user="--------"
                password="--------"
                HOST= smtp.mailtrap.io
                FROM=mailtrap.io
                TO=email
                MAX=Number
                MIN=Number
                PORT=Number
                
 ---
 ## Example to create .env file
 
         $ Mailtrap credentials : 
           
                user= create mailtrap user id
                password= create mailtrap user password
                HOST= "smtp.mailtrap.io"
                FROM="monitorcrypto.mailtrap.io"
                
         $ User credentials  :
      
                TO="helloworld@gmail.com"
                MAX=25000
                MIN=19000
                PORT=8080 

---

    
    
    
