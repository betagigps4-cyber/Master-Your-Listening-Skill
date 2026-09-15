import { Scenario } from '../types';

export const scenariosZero: Record<string, Scenario[]> = {
  "Section 1": [
    {
      title: "Name",
      description: "A person name.",
      transcript: "[M5]A Person Name.[M4]Hello. This is Maruf Ali.",
      questions: [
        { id: "p1q1", text: "What is the person’s name?", options: ["Miraj Ali", "Mazid Ali", "Maruf Ali", "Masuk Ali"], correct: "Maruf Ali", category: "factual" }
      ]
    }
  ],
  "Section 2": [
    {
      title: "Mobile Number",
      description: "A Person’s mobile number.",
      transcript: "[M5]A Person’s mobile number.[M3]Hello. I am Rifat Hossain. My mobile number is 01728295215.",
      questions: [
        { id: "p2q1", text: "What is the person’s mobile number?", options: ["01728215215", "01728295225", "01728295215", "01718295215"], correct: "01728295215", category: "numbers" }
      ]
    }
  ],
  "Section 3": [
    {
      title: "City Name",
      description: "A person City Name.",
      transcript: "[M5]A Person City Name.[F5]Hello. At present I live in London.",
      questions: [
        { id: "p3q1", text: "Where does the person live?", options: ["Riad", "London", "Cape Town", "Lisbon"], correct: "London", category: "factual" }
      ]
    }
  ],
  "Section 4": [
    {
      title: "Game",
      description: "A person’s Favorite Game.",
      transcript: "[M5]A person’s Favorite Game.[M2]Hello. This is Araf Hossen. I like playing cricket most.",
      questions: [
        { id: "p4q1", text: "What is his favorite game?", options: ["Football", "Badminton", "Tennis ball", "Cricket"], correct: "Cricket", category: "factual" }
      ]
    }
  ],
  "Section 5": [
    {
      title: "Choice",
      description: "A person favorite food.",
      transcript: "[M5]A person favorite food.[M3]Hello. This is Md. Kabir Ahmed. I like to eat noodles most.",
      questions: [
        { id: "p5q1", text: "What is the person’s favorite food?", options: ["Burger", "Noodles", "Milk", "Biriani"], correct: "Noodles", category: "factual" }
      ]
    }
  ],
  "Section 6": [
    {
      title: "Flower",
      description: "A person favorite flower.",
      transcript: "[M5]A person favorite flower.[F5]Hello. This is Mrs. Nilufa Yasmin. I like rose most.",
      questions: [
        { id: "p6q1", text: "What is the person’s favorite flower?", options: ["Tulip", "Marigold", "Rose", "Water lily"], correct: "Rose", category: "factual" }
      ]
    }
  ],
  "Section 7": [
    {
      title: "Fruit",
      description: "A person favorite fruit.",
      transcript: "[M5]A person favorite fruit.[F5]Hello. This is Mrs. Taslima Akter. I like guava most.",
      questions: [
        { id: "p7q1", text: "What is the person’s favorite fruit?", options: ["mango", "apple", "orange", "guava"], correct: "guava", category: "factual" }
      ]
    }
  ],
  "Section 8": [
    {
      title: "Profession",
      description: "A person's occupation.",
      transcript: "[M5]A person's occupation.[M4]Hello. I am Tariqul Islam. I work as a software engineer at a local tech company.",
      questions: [
        { id: "p8q1", text: "What is the person's profession?", options: ["Doctor", "Teacher", "Software engineer", "Banker"], correct: "Software engineer", category: "factual" }
      ]
    }
  ],
  "Section 9": [
    {
      title: "Pet",
      description: "A person's pet animal.",
      transcript: "[M5]A person's pet animal.[F3]Hi, I'm Nusrat. I have a small white rabbit that I take care of every day.",
      questions: [
        { id: "p9q1", text: "What kind of pet does the person have?", options: ["Cat", "Dog", "Parrot", "Rabbit"], correct: "Rabbit", category: "factual" }
      ]
    }
  ],
  "Section 10": [
    {
      title: "Color",
      description: "A person's favorite color.",
      transcript: "[M5]A person's favorite color.[M2]Greetings. This is Fahim. Whenever I buy new clothes, I always choose the color blue.",
      questions: [
        { id: "p10q1", text: "What is the person's favorite color?", options: ["Red", "Green", "Blue", "Black"], correct: "Blue", category: "factual" }
      ]
    }
  ],
  "Section 11": [
    {
      title: "Transport",
      description: "A person's daily transport.",
      transcript: "[M5]A person's daily transport.[F5]Hello. I am Salma Khatun. I usually travel to my workplace by bus.",
      questions: [
        { id: "p11q1", text: "How does the person travel to work?", options: ["By train", "By bus", "By rickshaw", "By car"], correct: "By bus", category: "factual" }
      ]
    }
  ],
  "Section 12": [
    {
      title: "Season",
      description: "A person's favorite season.",
      transcript: "[M5]A person's favorite season.[M3]Hello everyone. I am Rakib. I really enjoy winter because of the fresh vegetables and cool weather.",
      questions: [
        { id: "p12q1", text: "Which season does the person enjoy most?", options: ["Summer", "Winter", "Spring", "Autumn"], correct: "Winter", category: "factual" }
      ]
    }
  ],
  "Section 13": [
    {
      title: "Hobby",
      description: "A person's favorite hobby.",
      transcript: "[M5]A person's favorite hobby.[F2]Hello. I am Sadia. In my free time, I love doing photography.",
      questions: [
        { id: "p13q1", text: "What is the person's favorite hobby?", options: ["Reading", "Photography", "Gardening", "Painting"], correct: "Photography", category: "factual" }
      ]
    }
  ],
  "Section 14": [
    {
      title: "Subject",
      description: "A person's favorite academic subject.",
      transcript: "[M5]A person's favorite academic subject.[M3]Hi there. My name is Hasan. Whenever I am studying, I find mathematics the most interesting.",
      questions: [
        { id: "p14q1", text: "What is the person's favorite academic subject?", options: ["Mathematics", "History", "Science", "Geography"], correct: "Mathematics", category: "factual" }
      ]
    }
  ],
  "Section 15": [
    {
      title: "Instrument",
      description: "A person's favorite musical instrument.",
      transcript: "[M5]A person's favorite musical instrument.[F4]Greetings. I am Ruma. I have been practicing playing the guitar for three years.",
      questions: [
        { id: "p15q1", text: "Which musical instrument does the person play?", options: ["Piano", "Flute", "Violin", "Guitar"], correct: "Guitar", category: "factual" }
      ]
    }
  ],
  "Section 16": [
    {
      title: "Language",
      description: "A person's spoken language.",
      transcript: "[M5]A person's spoken language.[M4]Hello. This is Imran. Besides my mother tongue, I am very fluent in speaking Spanish.",
      questions: [
        { id: "p16q1", text: "Which language is the person fluent in?", options: ["French", "Arabic", "Spanish", "German"], correct: "Spanish", category: "factual" }
      ]
    }
  ],
  "Section 17": [
    {
      title: "Device",
      description: "A person's most used electronic device.",
      transcript: "[M5]A person's most used electronic device.[F5]Hello. I am Farhana. For my online classes, I constantly use my laptop.",
      questions: [
        { id: "p17q1", text: "Which device does the person use for online classes?", options: ["Smartphone", "Tablet", "Laptop", "Desktop"], correct: "Laptop", category: "factual" }
      ]
    }
  ],
  "Section 18": [
    {
      title: "Beverage",
      description: "A person's favorite beverage.",
      transcript: "[M5]A person's favorite beverage.[M2]Hi, I am Kamal. In the morning, I always prefer drinking a hot cup of coffee.",
      questions: [
        { id: "p18q1", text: "What is the person's favorite beverage?", options: ["Tea", "Coffee", "Juice", "Milk"], correct: "Coffee", category: "factual" }
      ]
    }
  ],
  "Section 19": [
    {
      title: "Movie Genre",
      description: "A person's preferred movie genre.",
      transcript: "[M5]A person's preferred movie genre.[F3]Hello. My name is Sumaiya. Whenever I go to the cinema, I love watching science fiction movies.",
      questions: [
        { id: "p19q1", text: "What type of movies does the person love watching?", options: ["Comedy", "Action", "Science fiction", "Horror"], correct: "Science fiction", category: "factual" }
      ]
    }
  ],
  "Section 20": [
    {
      title: "Exercise",
      description: "A person's daily exercise routine.",
      transcript: "[M5]A person's daily exercise routine.[M4]Greetings. This is Shafiq. To stay fit, I go for a long walk every evening.",
      questions: [
        { id: "p20q1", text: "What does the person do to stay fit?", options: ["Swimming", "Cycling", "Running", "Walking"], correct: "Walking", category: "factual" }
      ]
    }
  ],
  "Section 21": [
    {
      title: "Destination",
      description: "A person's dream holiday destination.",
      transcript: "[M5]A person's dream holiday destination.[F4]Hi everyone. I am Nila. If I get a long vacation, I would love to visit the mountains.",
      questions: [
        { id: "p21q1", text: "Where would the person love to visit for a vacation?", options: ["The beach", "The mountains", "A forest", "A desert"], correct: "The mountains", category: "factual" }
      ]
    }
  ],
  "Section 22": [
    {
      title: "Chore",
      description: "A person's regular household chore.",
      transcript: "[M5]A person's regular household chore.[M3]Hello. I am Jamal. On weekends, it is my responsibility to do the laundry.",
      questions: [
        { id: "p22q1", text: "What household chore is the person responsible for on weekends?", options: ["Cooking", "Cleaning floors", "Doing the laundry", "Washing dishes"], correct: "Doing the laundry", category: "factual" }
      ]
    }
  ],
  "Section 23": [
    {
      title: "Attire",
      description: "A person's preferred clothing.",
      transcript: "[M5]A person's preferred clothing.[M2]Hello, this is Asif. For casual outings, I feel most comfortable wearing a t-shirt and jeans.",
      questions: [
        { id: "p23q1", text: "What does the person prefer wearing for casual outings?", options: ["Formal suit", "Panjabi", "T-shirt and jeans", "Polo shirt"], correct: "T-shirt and jeans", category: "factual" }
      ]
    }
  ],
  "Section 24": [
    {
      title: "Weather",
      description: "A person's preferred weather condition.",
      transcript: "[M5]A person's preferred weather condition.[F2]Hi, I am Mita. I absolutely love it when it is rainy outside.",
      questions: [
        { id: "p24q1", text: "What is the person's preferred weather condition?", options: ["Sunny", "Rainy", "Cloudy", "Windy"], correct: "Rainy", category: "factual" }
      ]
    }
  ],
  "Section 25": [
    {
      title: "Day",
      description: "A person's favorite day of the week.",
      transcript: "[M5]A person's favorite day of the week.[M4]Hello. I am Rahman. My favorite day of the week is Friday because it is my day off.",
      questions: [
        { id: "p25q1", text: "Which day of the week is the person's favorite?", options: ["Sunday", "Monday", "Thursday", "Friday"], correct: "Friday", category: "factual" }
      ]
    }
  ],
  "Section 26": [
    {
      title: "Full Name",
      description: "A person's full name.",
      transcript: "[M5]A Person Full Name.[M4]Good morning. My name is Ayesha Rahman.",
      questions: [
        { id: "p26q1", text: "What is the person’s name?", options: ["Ayesha Rahman", "Afsana Rahman", "Ayesha Karim", "Afsana Karim"], correct: "Ayesha Rahman", category: "factual" }
      ]
    }
  ],
  "Section 27": [
    {
      title: "Phone Number",
      description: "A person's phone number.",
      transcript: "[M5]A Person Phone Number.[M3]Hello. This is Tanvir Ahmed. You can call me at 01817654321.",
      questions: [
        { id: "p27q1", text: "What is the person’s phone number?", options: ["01817654321", "01817654312", "01717654321", "01817645321"], correct: "01817654321", category: "numbers" }
      ]
    }
  ],
  "Section 28": [
    {
      title: "Current City",
      description: "Where the person currently lives.",
      transcript: "[M5]A Person Current City.[F5]Hi. I currently live in Dhaka.",
      questions: [
        { id: "p28q1", text: "Where does the person live?", options: ["Chittagong", "Dhaka", "Sylhet", "Khulna"], correct: "Dhaka", category: "factual" }
      ]
    }
  ],
  "Section 29": [
    {
      title: "Email Address",
      description: "A person's email address.",
      transcript: "[M5]A Person Email Address.[M4]Hello. I'm Samir Khan. My email is samir.khan@example.com.",
      questions: [
        { id: "p29q1", text: "What is the person’s email address?", options: ["samir.khan@example.com", "samir.k@example.com", "samir.khan@mail.com", "samirkhan@example.com"], correct: "samir.khan@example.com", category: "factual" }
      ]
    }
  ],
  "Section 30": [
    {
      title: "Age",
      description: "A person's age.",
      transcript: "[M5]A Person Age.[F4]Hello. I'm Mina. I am 29 years old.",
      questions: [
        { id: "p30q1", text: "How old is the person?", options: ["27", "28", "29", "30"], correct: "29", category: "numbers" }
      ]
    }
  ],
  "Section 31": [
    {
      title: "Occupation",
      description: "A person's job or occupation.",
      transcript: "[M5]A Person Occupation.[M4]Good afternoon. My name is Rashed. I work as a school teacher.",
      questions: [
        { id: "p31q1", text: "What is the person’s occupation?", options: ["Doctor", "Engineer", "School teacher", "Accountant"], correct: "School teacher", category: "factual" }
      ]
    }
  ],
  "Section 32": [
    {
      title: "Appointment Time",
      description: "A scheduled appointment time.",
      transcript: "[M5]An Appointment Time.[F3]Hello. This is Farhana. My appointment is at 3:30 PM tomorrow.",
      questions: [
        { id: "p32q1", text: "When is the person’s appointment?", options: ["2:30 PM tomorrow", "3:30 PM tomorrow", "3:30 PM today", "4:30 PM tomorrow"], correct: "3:30 PM tomorrow", category: "numbers" }
      ]
    }
  ],
  "Section 33": [
    {
      title: "Nationality",
      description: "A person's nationality.",
      transcript: "[M5]A Person Nationality.[M4]Hi. I'm Luis Garcia. I'm from Spain.",
      questions: [
        { id: "p33q1", text: "What is the person’s nationality?", options: ["Portugal", "Spain", "Mexico", "Argentina"], correct: "Spain", category: "factual" }
      ]
    }
  ],
  "Section 34": [
    {
      title: "Favorite Food",
      description: "A person's favorite food.",
      transcript: "[M5]A Person Favorite Food.[F4]Hello. I'm Nabila. My favorite food is biryani.",
      questions: [
        { id: "p34q1", text: "What is the person’s favorite food?", options: ["Pizza", "Biryani", "Sushi", "Pasta"], correct: "Biryani", category: "factual" }
      ]
    }
  ],
  "Section 35": [
    {
      title: "Travel Destination",
      description: "A place the person plans to visit.",
      transcript: "[M5]A Person Travel Destination.[M3]Hi. I'm Karim. Next month I'm going to visit Cox's Bazar.",
      questions: [
        { id: "p35q1", text: "Where is the person going next month?", options: ["Sundarbans", "Cox's Bazar", "Rangamati", "Saint Martin"], correct: "Cox's Bazar", category: "factual" }
      ]
    }
  ],
  "Section 36": [
    {
      title: "Departure Gate",
      description: "Airport boarding gate announcement.",
      transcript: "[M5]Departure Gate.[F3]Attention passengers, flight BG-402 to Dubai will board at Gate 14.",
      questions: [
        { id: "p36q1", text: "Which gate will flight BG-402 board at?", options: ["Gate 4", "Gate 12", "Gate 14", "Gate 40"], correct: "Gate 14", category: "numbers" }
      ]
    }
  ],
  "Section 37": [
    {
      title: "Room Number",
      description: "Hotel check-in room key assignment.",
      transcript: "[M5]Room Number.[M2]Welcome to Ocean View Hotel. Here is your key card for Room 305 on the third floor.",
      questions: [
        { id: "p37q1", text: "What is the guest's room number?", options: ["Room 205", "Room 305", "Room 350", "Room 503"], correct: "Room 305", category: "numbers" }
      ]
    }
  ],
  "Section 38": [
    {
      title: "Postal Code",
      description: "Mailing address postal code.",
      transcript: "[M5]Postal Code.[F4]Hello. My office address is in Dhanmondi, and the postal code is 1209.",
      questions: [
        { id: "p38q1", text: "What is the postal code of the office?", options: ["1205", "1209", "1219", "1902"], correct: "1209", category: "numbers" }
      ]
    }
  ],
  "Section 39": [
    {
      title: "Price Tag",
      description: "Price of an item at a convenience store.",
      transcript: "[M5]Price Tag.[M4]Excuse me, how much is this bottle of mineral water? It costs 25 taka.",
      questions: [
        { id: "p39q1", text: "How much does the bottle of water cost?", options: ["15 taka", "20 taka", "25 taka", "35 taka"], correct: "25 taka", category: "numbers" }
      ]
    }
  ],
  "Section 40": [
    {
      title: "Bus Route",
      description: "Public bus line number.",
      transcript: "[M5]Bus Route.[F2]To go to the central railway station from here, you should catch bus number 7.",
      questions: [
        { id: "p40q1", text: "Which bus number goes to the central railway station?", options: ["Bus number 4", "Bus number 7", "Bus number 11", "Bus number 17"], correct: "Bus number 7", category: "factual" }
      ]
    }
  ],
  "Section 41": [
    {
      title: "Meeting Day",
      description: "Scheduled team meeting day of the week.",
      transcript: "[M5]Meeting Day.[M3]Please remember everyone, our weekly project meeting is rescheduled to Wednesday morning.",
      questions: [
        { id: "p41q1", text: "On which day will the project meeting be held?", options: ["Monday", "Tuesday", "Wednesday", "Thursday"], correct: "Wednesday", category: "factual" }
      ]
    }
  ],
  "Section 42": [
    {
      title: "Building Floor",
      description: "Elevator floor destination in an office or clinic.",
      transcript: "[M5]Building Floor.[F5]Good morning. The dental clinic is located on the fifth floor of this building.",
      questions: [
        { id: "p42q1", text: "On which floor is the dental clinic?", options: ["Third floor", "Fourth floor", "Fifth floor", "Sixth floor"], correct: "Fifth floor", category: "factual" }
      ]
    }
  ],
  "Section 43": [
    {
      title: "Classroom Name",
      description: "Classroom room label for an exam.",
      transcript: "[M5]Classroom Name.[M4]Attention students, the English listening test will take place in Room B-2.",
      questions: [
        { id: "p43q1", text: "Where will the English listening test take place?", options: ["Room A-1", "Room B-2", "Room C-3", "Room D-4"], correct: "Room B-2", category: "factual" }
      ]
    }
  ],
  "Section 44": [
    {
      title: "Favorite Animal",
      description: "Animal observation preference.",
      transcript: "[M5]Favorite Animal.[F3]Hello. I'm Samira. Whenever we visit wildlife sanctuaries, I love observing the elephants.",
      questions: [
        { id: "p44q1", text: "Which animal does Samira love observing?", options: ["Tigers", "Elephants", "Lions", "Monkeys"], correct: "Elephants", category: "factual" }
      ]
    }
  ],
  "Section 45": [
    {
      title: "Luggage Weight",
      description: "Airport check-in baggage weight allowance.",
      transcript: "[M5]Luggage Weight.[M2]Good day. Your checked suitcase weighs exactly 18 kilograms, which is within the allowed limit.",
      questions: [
        { id: "p45q1", text: "How much does the suitcase weigh?", options: ["15 kilograms", "18 kilograms", "20 kilograms", "28 kilograms"], correct: "18 kilograms", category: "numbers" }
      ]
    }
  ]
};
