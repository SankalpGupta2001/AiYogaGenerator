# AiYogaGenerator
![Screenshot (7)](https://github.com/SankalpGupta2001/AiYogaGenerator/assets/83775048/71c9cd55-41b0-400e-9eeb-c9bebf1bf78b)
![Screenshot (8)](https://github.com/SankalpGupta2001/AiYogaGenerator/assets/83775048/44cacdc4-e9d0-4b0f-84e0-fbe4b22f97eb)

Step to run the code : 

1) cd backend
2) node server.js
3) cd frontend
4) npm start

Now project will be running in localhost 

Detail Explaination of Project : 


#1) In this I have used Google Palm API to generate routines
#2) Here we have to give two input duration (in minutes) and difficulty (beginner , intermediate , advanced) and will give your Daily Yoga Routine in free of cost .
#3) We can down load also  the rotine as pdf form
#4) The data is stored in the supabase in table format

#I have choose the design of database as this format

#id                    Pose                       Repetitions                 Descriptions 


As the data i was expecting from AI will be in three lines , First line will be main heading of pose then second line repetitions then third line descriptions . But some time AI will produced some wrong format data so for that I have seperate data in three lines so from this most of the time data is coming in right format.

But rememeber on checking if data will come in wrong format then please regenerate the data as it is Goggle Palm AI so it can give sometime incorrect format . 

I'm adding some screenshot also for reference . 

In last I will say I have enjoyed this assignment very much 

Thank you so much
