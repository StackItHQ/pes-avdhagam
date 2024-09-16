[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/AHFn7Vbn)
# Superjoin Hiring Assignment

### Welcome to Superjoin's hiring assignment! 🚀

### Objective
Build a solution that enables real-time synchronization of data between a Google Sheet and a specified database (e.g., MySQL, PostgreSQL). The solution should detect changes in the Google Sheet and update the database accordingly, and vice versa.

### Problem Statement
Many businesses use Google Sheets for collaborative data management and databases for more robust and scalable data storage. However, keeping the data synchronised between Google Sheets and databases is often a manual and error-prone process. Your task is to develop a solution that automates this synchronisation, ensuring that changes in one are reflected in the other in real-time.

### Requirements:
1. Real-time Synchronisation
  - Implement a system that detects changes in Google Sheets and updates the database accordingly.
   - Similarly, detect changes in the database and update the Google Sheet.
  2.	CRUD Operations
   - Ensure the system supports Create, Read, Update, and Delete operations for both Google Sheets and the database.
   - Maintain data consistency across both platforms.
   
### Optional Challenges (This is not mandatory):
1. Conflict Handling
- Develop a strategy to handle conflicts that may arise when changes are made simultaneously in both Google Sheets and the database.
- Provide options for conflict resolution (e.g., last write wins, user-defined rules).
    
2. Scalability: 	
- Ensure the solution can handle large datasets and high-frequency updates without performance degradation.
- Optimize for scalability and efficiency.

## Submission ⏰
The timeline for this submission is: **Next 2 days**

Some things you might want to take care of:
- Make use of git and commit your steps!
- Use good coding practices.
- Write beautiful and readable code. Well-written code is nothing less than a work of art.
- Use semantic variable naming.
- Your code should be organized well in files and folders which is easy to figure out.
- If there is something happening in your code that is not very intuitive, add some comments.
- Add to this README at the bottom explaining your approach (brownie points 😋)
- Use ChatGPT4o/o1/Github Co-pilot, anything that accelerates how you work 💪🏽. 

Make sure you finish the assignment a little earlier than this so you have time to make any final changes.

Once you're done, make sure you **record a video** showing your project working. The video should **NOT** be longer than 120 seconds. While you record the video, tell us about your biggest blocker, and how you overcame it! Don't be shy, talk us through, we'd love that.

We have a checklist at the bottom of this README file, which you should update as your progress with your assignment. It will help us evaluate your project.

- [ ] My code's working just fine! 🥳
- [ ] I have recorded a video showing it working and embedded it in the README ▶️
- [ ] I have tested all the normal working cases 😎
- [ ] I have even solved some edge cases (brownie points) 💪
- [ ] I added my very planned-out approach to the problem at the end of this README 📜

## Got Questions❓
Feel free to check the discussions tab, you might get some help there. Check out that tab before reaching out to us. Also, did you know, the internet is a great place to explore? 😛

We're available at techhiring@superjoin.ai for all queries. 

All the best ✨.

## Developer's Section
*Add your video here, and your approach to the problem (optional). Leave some comments for us here if you want, we will be reading this :)*

- [x] My code's working just fine! 🥳
- [x] I have recorded a video showing it working and embedded it in the README ▶️
- [x] I have tested all the normal working cases 😎
- [x] I added my very planned-out approach to the problem at the end of this README 📜

### Overview
This project facilitates real-time synchronization between Google Sheets and MongoDB. 
 
#### Features

Real-Time Data Synchronization: Directly updates both Google Sheets and MongoDB through API requests, ensuring that changes are instantly propagated to both systems.

Conflict Resolution: Handles data conflicts by comparing timestamps and resolving discrepancies, maintaining data integrity and consistency.

Public Access with ngrok: Utilizes ngrok to expose the local server to the internet, enabling easy testing and integration with external services.

#### Technologies Used
* Backend: Node.js with Express for handling API requests.
* Database: MongoDB for storing data records.
* Spreadsheet API: Google Sheets API for managing spreadsheet data.
* Conflict Handling: Timestamp-based logic to resolve data conflicts.
* Ngrok: For exposing the local server to the internet and facilitating external access during development.


### 1. Spreadsheet Integration

Real-Time Edit Tracking:

The script utilizes the onEdit trigger to monitor any changes made within the Google Sheets document.
It records each edit with comprehensive details including the timestamp of the change, the sheet name, the specific cell location (both column and row), the old value of the cell, and the new value.

### 2. Backend Synchronization

HTTP Request Handling:

Edits made to the spreadsheet are communicated to a backend server via HTTP requests. The method of the request (POST or PUT) is determined based on the nature of the edit:
POST Request: Used when a cell’s old value is empty (i.e., a new entry or addition). This request creates a new record in the backend to reflect the addition.
PUT Request: Used when a cell that previously had a value is updated. This request updates the existing record in the backend with the new value.
DELETE Request: If a cell that previously contained a value is emptied, a DELETE request is sent to remove the record from the backend, ensuring the backend reflects the exact state of the spreadsheet.

### 3. ngrok Integration
ngrok is used to expose the local backend server to the internet. This is particularly useful for testing and development purposes, allowing the Google Sheets script to send HTTP requests to a locally running server even if it's not publicly accessible.

link to demo: https://www.loom.com/share/1bf1170248a24732b52bd8323579dcbd?sid=4138226e-57d4-4b9f-8db8-adb9311f3f7b
