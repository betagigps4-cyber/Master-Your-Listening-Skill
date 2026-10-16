import { Scenario } from '../types';

export const scenariosHighSchool: Record<string, Scenario[]> = {
  "Section 1": [
    {
      title: "Introduction",
      description: "A young girl named Meena introduces herself.",
      transcript: "[M5]A young girl named Meena introduces herself.[F5]Hello. My name is Meena. I am a girl. I am seven years old. I live in Dhaka. I am a student.",
      questions: [
        { id: "hs1q1", text: "What is the girl's name?", options: ["Rina", "Meena", "Tina", "Sima"], correct: "Meena", category: "factual" },
        { id: "hs1q2", text: "How old is she?", options: ["Six", "Eight", "Nine", "Seven"], correct: "Seven", category: "numbers" },
        { id: "hs1q3", text: "Where does she live?", options: ["Sylhet", "Khulna", "Dhaka", "Rajshahi"], correct: "Dhaka", category: "factual" }
      ]
    }
  ],
  "Section 2": [
    {
      title: "Family",
      description: "Rahim talks about his small family and their occupations.",
      transcript: "[M5]Rahim talks about his small family and their occupations.[F5]This is Rahim. He has a small family. His father is a farmer. His mother is a teacher. Rahim has one little sister.",
      questions: [
        { id: "hs2q1", text: "What kind of family does Rahim have?", options: ["Small", "Big", "Very big", "No family"], correct: "Small", category: "factual" },
        { id: "hs2q2", text: "What does Rahim's father do?", options: ["Teacher", "Doctor", "Driver", "Farmer"], correct: "Farmer", category: "factual" },
        { id: "hs2q3", text: "How many sisters does Rahim have?", options: ["Two", "One", "Three", "Four"], correct: "One", category: "numbers" }
      ]
    }
  ],
  "Section 3": [
    {
      title: "Food",
      description: "A speaker shares their favorite food and fruits.",
      transcript: "[M5]A speaker shares their favorite food and fruits.[F5]I love to eat. My favorite food is rice and fish. My mother cooks very well. I like to eat sweet mangoes in the summer.",
      questions: [
        { id: "hs3q1", text: "What is the favorite food?", options: ["Bread and butter", "Rice and meat", "Rice and fish", "Milk and banana"], correct: "Rice and fish", category: "factual" },
        { id: "hs3q2", text: "Who cooks very well?", options: ["Father", "Mother", "Sister", "Brother"], correct: "Mother", category: "factual" },
        { id: "hs3q3", text: "What fruit does the speaker like?", options: ["Mangoes", "Apples", "Oranges", "Papayas"], correct: "Mangoes", category: "factual" }
      ]
    }
  ],
  "Section 4": [
    {
      title: "School",
      description: "Hasan goes to his big school in the morning to play and study.",
      transcript: "[M5]Hasan goes to his big school in the morning to play and study.[F5]It is morning. Hasan goes to school. His school is big. It is red and white. He likes his school. He plays with his friends there.",
      questions: [
        { id: "hs4q1", text: "Where does Hasan go in the morning?", options: ["Market", "Park", "Hospital", "School"], correct: "School", category: "factual" },
        { id: "hs4q2", text: "What colors is the school?", options: ["Green and white", "Black and white", "Red and white", "Blue and yellow"], correct: "Red and white", category: "factual" },
        { id: "hs4q3", text: "Who does he play with?", options: ["Brothers", "Friends", "Sisters", "Teachers"], correct: "Friends", category: "factual" }
      ]
    }
  ],
  "Section 5": [
    {
      title: "The National Bird",
      description: "A description of a Doel sitting on a tree.",
      transcript: "[M5]A description of a Doel sitting on a tree.[F5]Look at the bird. It is a Doel. The Doel is black and white. It is sitting on a green tree. It sings a very sweet song.",
      questions: [
        { id: "hs5q1", text: "What bird is this?", options: ["Crow", "Pigeon", "Doel", "Parrot"], correct: "Doel", category: "factual" },
        { id: "hs5q2", text: "What color is the Doel?", options: ["Black and white", "Red and green", "Blue and yellow", "Brown and white"], correct: "Black and white", category: "factual" },
        { id: "hs5q3", text: "Where is the bird sitting?", options: ["On a house", "On the ground", "On a wall", "On a green tree"], correct: "On a green tree", category: "factual" }
      ]
    }
  ],
  "Section 6": [
    {
      title: "Transport",
      description: "Kamal is going to the market by rickshaw.",
      transcript: "[M5]Kamal is going to the market by rickshaw.[F5]Kamal is going to the market. He is riding in a rickshaw. The rickshaw has three wheels. It is moving slowly down the road.",
      questions: [
        { id: "hs6q1", text: "Where is Kamal going?", options: ["School", "Market", "Village", "Home"], correct: "Market", category: "factual" },
        { id: "hs6q2", text: "What is he riding in?", options: ["Bus", "Car", "Train", "Rickshaw"], correct: "Rickshaw", category: "factual" },
        { id: "hs6q3", text: "How many wheels does a rickshaw have?", options: ["Two", "Four", "Three", "Six"], correct: "Three", category: "numbers" }
      ]
    }
  ],
  "Section 7": [
    {
      title: "The Village",
      description: "A speaker describes the beauty of their village and the nearby river.",
      transcript: "[M5]A speaker describes the beauty of their village and the nearby river.[F5]My village is very beautiful. There is a big river near my house. The water is clean. Many small boats are on the river.",
      questions: [
        { id: "hs7q1", text: "How is the village?", options: ["Beautiful", "Dirty", "Bad", "Small"], correct: "Beautiful", category: "factual" },
        { id: "hs7q2", text: "What is near the house?", options: ["A big pond", "A big river", "A big tree", "A big market"], correct: "A big river", category: "factual" },
        { id: "hs7q3", text: "What are on the river?", options: ["Big ships", "Cars", "Buses", "Small boats"], correct: "Small boats", category: "factual" }
      ]
    }
  ],
  "Section 8": [
    {
      title: "Clothes",
      description: "Ruma wears a new dress to visit her grandmother.",
      transcript: "[M5]Ruma wears a new dress to visit her grandmother.[F5]Today is Friday. Ruma is wearing a new dress. It is a blue Salwar Kameez. She is very happy. She is going to her grandmother's house.",
      questions: [
        { id: "hs8q1", text: "What day is it today?", options: ["Saturday", "Sunday", "Friday", "Monday"], correct: "Friday", category: "factual" },
        { id: "hs8q2", text: "What color is Ruma's dress?", options: ["Blue", "Green", "Red", "Yellow"], correct: "Blue", category: "factual" },
        { id: "hs8q3", text: "Where is she going?", options: ["Uncle's house", "Aunt's house", "Grandmother's house", "Friend's house"], correct: "Grandmother's house", category: "factual" }
      ]
    }
  ],
  "Section 9": [
    {
      title: "Weather",
      description: "A speaker talks about a rainy day at home with an umbrella.",
      transcript: "[M5]A speaker talks about a rainy day at home with an umbrella.[F5]It is raining today. The sky is dark. I am sitting at home. I have a big umbrella. My umbrella is black.",
      questions: [
        { id: "hs9q1", text: "How is the weather today?", options: ["Sunny", "Hot", "Cold", "Raining"], correct: "Raining", category: "factual" },
        { id: "hs9q2", text: "What color is the sky?", options: ["Blue", "Dark", "White", "Red"], correct: "Dark", category: "factual" },
        { id: "hs9q3", text: "What color is the umbrella?", options: ["Black", "Red", "Green", "Blue"], correct: "Black", category: "factual" }
      ]
    }
  ],
  "Section 10": [
    {
      title: "Daily Routine",
      description: "A speaker describes their morning routine before reading a book.",
      transcript: "[M5]A speaker describes their morning routine before reading a book.[F5]I wake up in the morning. I wash my face with water. I eat my breakfast. Then, I sit down and read my English book.",
      questions: [
        { id: "hs10q1", text: "What does the speaker wash their face with?", options: ["Soap", "Water", "Milk", "Oil"], correct: "Water", category: "factual" },
        { id: "hs10q2", text: "What does the speaker eat?", options: ["Lunch", "Dinner", "Snacks", "Breakfast"], correct: "Breakfast", category: "factual" },
        { id: "hs10q3", text: "Which book does the speaker read?", options: ["Bengali book", "Math book", "English book", "Science book"], correct: "English book", category: "factual" }
      ]
    }
  ],
  "Section 11": [
    {
      title: "The Cow",
      description: "A description of a domestic cow and what it gives us.",
      transcript: "[M5]A description of a domestic cow and what it gives us.[F5]This is a cow. It is a domestic animal. It has four legs and two horns. The cow gives us milk. It eats green grass.",
      questions: [
        { id: "hs11q1", text: "How many legs does the cow have?", options: ["Two", "Three", "Four", "Five"], correct: "Four", category: "numbers" },
        { id: "hs11q2", text: "What does the cow give us?", options: ["Milk", "Eggs", "Bread", "Water"], correct: "Milk", category: "factual" },
        { id: "hs11q3", text: "What does the cow eat?", options: ["Rice", "Grass", "Meat", "Fruit"], correct: "Grass", category: "factual" }
      ]
    }
  ],
  "Section 12": [
    {
      title: "Tea",
      description: "A grandfather drinks tea in a red cup every morning.",
      transcript: "[M5]A grandfather drinks tea in a red cup every morning.[F5]My grandfather likes tea. He drinks tea in a red cup. He puts a little sugar in his tea. He drinks it every morning.",
      questions: [
        { id: "hs12q1", text: "When does he drink tea?", options: ["At night", "In the afternoon", "In the evening", "In the morning"], correct: "In the morning", category: "factual" },
        { id: "hs12q2", text: "What is the color of the cup?", options: ["Blue", "Red", "White", "Green"], correct: "Red", category: "factual" },
        { id: "hs12q3", text: "What does he put in the tea?", options: ["Sugar", "Salt", "Ginger", "Honey"], correct: "Sugar", category: "factual" }
      ]
    }
  ],
  "Section 13": [
    {
      title: "The Sun",
      description: "Facts about the sun, its color, and what it provides.",
      transcript: "[M5]Facts about the sun, its color, and what it provides.[F5]The sun is in the sky. It is a big yellow ball. The sun gives us light and heat. It rises in the east every day.",
      questions: [
        { id: "hs13q1", text: "What color is the sun?", options: ["Red", "Yellow", "Green", "Blue"], correct: "Yellow", category: "factual" },
        { id: "hs13q2", text: "What does the sun give us?", options: ["Water and food", "Cold and rain", "Light and heat", "Moon and stars"], correct: "Light and heat", category: "factual" },
        { id: "hs13q3", text: "Where does the sun rise?", options: ["West", "North", "South", "East"], correct: "East", category: "factual" }
      ]
    }
  ],
  "Section 14": [
    {
      title: "The Fruit Market",
      description: "Babu buys bananas for his sister at the market.",
      transcript: "[M5]Babu buys bananas for his sister at the market.[F5]Babu is at the market. He sees many fruits. There are red apples and yellow bananas. He buys five bananas for his sister.",
      questions: [
        { id: "hs14q1", text: "Where is Babu?", options: ["At the market", "At school", "At home", "In the park"], correct: "At the market", category: "factual" },
        { id: "hs14q2", text: "How many bananas does he buy?", options: ["Two", "Three", "Four", "Five"], correct: "Five", category: "numbers" },
        { id: "hs14q3", text: "What color are the bananas?", options: ["Red", "Green", "Yellow", "Black"], correct: "Yellow", category: "factual" }
      ]
    }
  ],
  "Section 15": [
    {
      title: "Playing Football",
      description: "Boys play football in the field during the afternoon.",
      transcript: "[M5]Boys play football in the field during the afternoon.[F5]It is afternoon. The boys are in the field. They are playing football. They are very happy. Playing is good for health.",
      questions: [
        { id: "hs15q1", text: "When are the boys playing?", options: ["Morning", "Afternoon", "Night", "Evening"], correct: "Afternoon", category: "factual" },
        { id: "hs15q2", text: "What are they playing?", options: ["Football", "Cricket", "Ha-du-du", "Chess"], correct: "Football", category: "factual" },
        { id: "hs15q3", text: "Where are the boys?", options: ["In the room", "In the classroom", "In the market", "In the field"], correct: "In the field", category: "factual" }
      ]
    }
  ],
  "Section 16": [
    {
      title: "The Boatman",
      description: "Majhi is a boatman who crosses the river every day.",
      transcript: "[M5]Majhi is a boatman who crosses the river every day.[F5]Majhi is a boatman. He has a small wooden boat. He crosses the river every day. He helps people go to the other side.",
      questions: [
        { id: "hs16q1", text: "What does Majhi have?", options: ["A car", "A cycle", "A boat", "A bus"], correct: "A boat", category: "factual" },
        { id: "hs16q2", text: "What is the boat made of?", options: ["Paper", "Wood", "Plastic", "Iron"], correct: "Wood", category: "factual" },
        { id: "hs16q3", text: "Where does he work?", options: ["On the river", "On the road", "In the field", "In the school"], correct: "On the river", category: "factual" }
      ]
    }
  ],
  "Section 17": [
    {
      title: "Gardening",
      description: "Lipu takes care of his small garden and flowers.",
      transcript: "[M5]Lipu takes care of his small garden and flowers.[F5]Lipu has a small garden. There are many flowers in the garden. He waters the plants every afternoon. He loves his roses.",
      questions: [
        { id: "hs17q1", text: "What does Lipu have?", options: ["A big farm", "A shop", "A pond", "A garden"], correct: "A garden", category: "factual" },
        { id: "hs17q2", text: "When does he water the plants?", options: ["At night", "In the morning", "In the afternoon", "At noon"], correct: "In the afternoon", category: "factual" },
        { id: "hs17q3", text: "Which flower does he love?", options: ["Lily", "Rose", "Lotus", "Tulip"], correct: "Rose", category: "factual" }
      ]
    }
  ],
  "Section 18": [
    {
      title: "My Cat",
      description: "A speaker talks about their pet cat and what it does.",
      transcript: "[M5]A speaker talks about their pet cat and what it does.[F5]I have a pet cat. Its name is Pussy. It is very soft. It drinks milk. It catches mice in the house.",
      questions: [
        { id: "hs18q1", text: "What animal is the pet?", options: ["A cat", "A dog", "A rabbit", "A bird"], correct: "A cat", category: "factual" },
        { id: "hs18q2", text: "What is the cat's name?", options: ["Tom", "Pussy", "Mini", "Kitty"], correct: "Pussy", category: "factual" },
        { id: "hs18q3", text: "What does the cat catch?", options: ["Birds", "Fish", "Flies", "Mice"], correct: "Mice", category: "factual" }
      ]
    }
  ],
  "Section 19": [
    {
      title: "The Train",
      description: "A description of a long train and the sound it makes.",
      transcript: "[M5]A description of a long train and the sound it makes.[F5]The train is long. It runs on the lines. It makes a \"choo-choo\" sound. Many people travel by train in Bangladesh.",
      questions: [
        { id: "hs19q1", text: "How is the train?", options: ["Short", "Small", "Long", "Thin"], correct: "Long", category: "factual" },
        { id: "hs19q2", text: "Where does the train run?", options: ["On the water", "In the sky", "On the grass", "On the lines"], correct: "On the lines", category: "factual" },
        { id: "hs19q3", text: "What sound does it make?", options: ["Choo-choo", "Honk-honk", "Beep-beep", "Meow-meow"], correct: "Choo-choo", category: "factual" }
      ]
    }
  ],
  "Section 20": [
    {
      title: "The National Flag",
      description: "A description of the beautiful national flag.",
      transcript: "[M5]A description of the beautiful national flag.[F5]Our national flag is beautiful. It is bottle green. There is a red circle in the middle. We love our flag.",
      questions: [
        { id: "hs20q1", text: "How is the national flag?", options: ["Bad", "Beautiful", "Small", "Old"], correct: "Beautiful", category: "factual" },
        { id: "hs20q2", text: "What color is the flag?", options: ["Green", "Blue", "Yellow", "White"], correct: "Green", category: "factual" },
        { id: "hs20q3", text: "What shape is in the middle?", options: ["Square", "Triangle", "Circle", "Star"], correct: "Circle", category: "factual" }
      ]
    }
  ],
  "Section 21": [
    {
      title: "Classroom Instructions",
      description: "A teacher makes announcements.",
      transcript: "[M1]Good morning, class. Before we start today's lesson, I have a few important announcements. First, your homework for today is on page forty-five of your textbook. You need to complete exercises one through five. Please write your answers in your notebook, not on loose paper. Second, we will have a short test next Monday. The test will cover chapters three and four. Make sure you review the vocabulary words at the end of each chapter. There are twenty words in total. Third, please remember to bring your coloured pencils for tomorrow's art class. You will need red, blue, yellow, and green. If you don't have them, you can share with your partner. Finally, the school library is open every day from eight in the morning to four in the afternoon. I encourage all of you to borrow at least one book this week. Are there any questions? [F2]Yes, Maria? Is the test going to include listening exercises? [M1]No, Maria, the test will only have reading and writing sections. The listening test will be separate, on Wednesday. OK, let's begin today's lesson.",
      questions: [
        { id: "p1s1q1", text: "Which textbook page is the homework on?", options: ["Page 40", "Page 45", "Page 50", "Page 55"], correct: "Page 45", category: "numbers" },
        { id: "p1s1q2", text: "How many vocabulary words do students need to review?", options: ["10", "15", "20", "25"], correct: "20", category: "numbers" },
        { id: "p1s1q3", text: "When is the listening test?", options: ["Monday", "Tuesday", "Wednesday", "Thursday"], correct: "Wednesday", category: "factual" }
      ]
    }
  ],
  "Section 22": [
    {
      title: "Talking About My Best Friend",
      description: "A student describes their best friend.",
      transcript: "[F3]My best friend's name is Ahmed. He is eleven years old, just like me. We have been friends since we were in Class Three. Ahmed lives near my house, so we walk to school together every morning. He is very good at sports, especially football. He is the captain of our school football team. Last month, our team won the inter-school football tournament. Ahmed scored two goals in the final match! Apart from sports, Ahmed also enjoys drawing. He has a sketchbook where he draws animals and birds. His drawings are really beautiful. My favourite one is a picture of a parrot that he drew last week. Ahmed wants to be an artist when he grows up, but his parents want him to be a doctor. I think he should follow his dream. Ahmed's favourite food is biryani, and his favourite colour is green. He has a younger sister named Fatima who is seven years old.",
      questions: [
        { id: "p1s2q1", text: "Since which class have they been friends?", options: ["Class One", "Class Two", "Class Three", "Class Four"], correct: "Class Three", category: "numbers" },
        { id: "p1s2q2", text: "How many goals did Ahmed score in the final match?", options: ["One", "Two", "Three", "Four"], correct: "Two", category: "numbers" },
        { id: "p1s2q3", text: "What does Ahmed want to be when he grows up?", options: ["Doctor", "Engineer", "Artist", "Teacher"], correct: "Artist", category: "factual" }
      ]
    }
  ],
  "Section 23": [
    {
      title: "Meeting Someone New",
      description: "Two students introduce themselves.",
      transcript: "[F1]Two students introduce themselves.[F5]Hello! My name is Tom. What is your name? [F1]Hi Tom, I'm Lisa. Nice to meet you. [F5]Nice to meet you too, Lisa. Where are you from? [F1]I'm from Australia. How about you? [F5]I'm from Canada. Oh, that's nice. How old are you, Lisa? [F1]I'm twelve years old. And you? [F5]I'm thirteen. What class are you in? [F1]I'm in Class Seven A. [F5]I'm in Class Seven B. Do you like our school? [F1]Yes, I love it. The teachers are very kind. My favourite subject is English. What about you? [F5]I like Mathematics the most. That's interesting. Well, it's time for class. See you later, Lisa! [F1]Bye, Tom!",
      questions: [
        { id: "z1s1q1", text: "Where is Lisa from?", options: ["Canada", "Australia", "England", "America"], correct: "Australia", category: "factual" },
        { id: "z1s1q2", text: "How old is Tom?", options: ["Eleven", "Twelve", "Thirteen", "Fourteen"], correct: "Thirteen", category: "numbers" },
        { id: "z1s1q3", text: "What is Tom's favourite subject?", options: ["English", "Mathematics", "Science", "Art"], correct: "Mathematics", category: "factual" }
      ]
    }
  ],
  "Section 24": [
    {
      title: "At the School Canteen",
      description: "A student orders food at the canteen.",
      transcript: "[M4]Good morning! What would you like to eat today? [F5]I'd like a sandwich, please. [M4]What kind of sandwich? We have cheese, chicken, and egg sandwiches. [F5]A chicken sandwich, please. [M4]Would you like anything to drink? [F5]Yes, a glass of orange juice, please. [M4]Anything else? [F5]No, that's all. [M4]OK, one chicken sandwich and one orange juice. That's three dollars and fifty cents. [F5]Here's five dollars. [M4]Thank you. Here's your change, one dollar and fifty cents. [F5]Oh wait, could I also have a small chocolate cake? [M4]Sure, that's one dollar extra. So the total is four dollars and fifty cents. [F5]Here you go. [M4]Thank you! Enjoy your meal.",
      questions: [
        { id: "z1s2q1", text: "What kind of sandwich did the student order?", options: ["Cheese", "Chicken", "Egg", "Ham"], correct: "Chicken", category: "factual" },
        { id: "z1s2q2", text: "How much change did the student receive before ordering the cake?", options: ["Fifty cents", "One dollar", "One dollar fifty cents", "Two dollars"], correct: "One dollar fifty cents", category: "numbers" },
        { id: "z1s2q3", text: "What was the final total bill?", options: ["$3.50", "$4.00", "$4.50", "$5.00"], correct: "$4.50", category: "numbers" }
      ]
    }
  ],
  "Section 25": [
    {
      title: "Planning a School Trip",
      description: "Students plan a trip.",
      transcript: "[M2]OK everyone, let's finalise the details for our science museum trip next week. First, the date. We originally planned for Thursday, but the museum confirmed that Thursday is fully booked for school groups. So we have two options: Wednesday the fifteenth or Friday the seventeenth. Which do you prefer? [F2]Wednesday works better for me because I have a piano lesson on Friday afternoon. [F3]Same here, Wednesday is good. [M2]OK, Wednesday it is. Now, transport. We can either take the school bus, which is free, or we can hire a mini coach for about eighty dollars total. The school bus fits forty students but it's quite old. The mini coach is more comfortable and has air conditioning. How many students are going? [F2]Thirty-two so far, and three more might join. [M2]Let's go with the mini coach. That means each student pays about two dollars and twenty cents. What about lunch? The museum has a cafeteria, but it's a bit expensive. I suggest everyone brings a packed lunch. We can eat in the museum garden if the weather is nice. Finally, we need to bring our science notebooks because Ms. Chen wants us to complete a worksheet during the visit.",
      questions: [
        { id: "hs1s1q1", text: "Why was the original Thursday plan changed?", options: ["Bad weather forecast", "Museum fully booked", "Bus unavailable", "Teacher absent"], correct: "Museum fully booked", category: "inference" },
        { id: "hs1s1q2", text: "How much will each student pay for transport approximately?", options: ["$1.50", "$2.20", "$2.80", "$3.00"], correct: "$2.20", category: "numbers" },
        { id: "hs1s1q3", text: "What does Ms. Chen want students to bring?", options: ["Laptop", "Science notebook", "Camera", "Art supplies"], correct: "Science notebook", category: "factual" }
      ]
    }
  ],
  "Section 26": [
    {
      title: "Sports Day Preparation",
      description: "Team members organise relay race squads.",
      transcript: "[M1]Right, let's sort out the relay teams for sports day. We need four runners for the four-by-one-hundred-metre relay and four for the four-by-four-hundred-metre relay. For the hundred-metre relay, I think James should run first because he has the fastest start. Then Sarah for the second leg, she's really consistent. Marcus third, and I'll do the anchor leg. What about the four-hundred relay? That's tougher. We need runners with good stamina. David, you ran the eight hundred last year, right? [M3]Yeah, but I pulled a muscle recently. I can try, but I'm not sure about my fitness. [M1]OK, let's have you as a reserve and put Nina in instead. She's been training for cross-country. Nina, are you OK with that? [F3]Sure, I'll run the second leg. [M1]Priya, you take first leg, and Kevin, you do anchor. Now, practice schedule. We'll train every Tuesday and Thursday after school from four to five thirty. The sports day is on March twenty-second, so we have three weeks. Make sure you bring proper running shoes and water bottles.",
      questions: [
        { id: "hs1s2q1", text: "Who will run the anchor leg for the hundred-metre relay?", options: ["James", "Sarah", "Marcus", "The speaker"], correct: "The speaker", category: "factual" },
        { id: "hs1s2q2", text: "Why was David moved to reserve for the four-hundred relay?", options: ["He was unavailable", "Schedule conflict", "He recently pulled a muscle", "He didn't want to participate"], correct: "He recently pulled a muscle", category: "inference" },
        { id: "hs1s2q3", text: "How many weeks of practice do they have before sports day?", options: ["One", "Two", "Three", "Four"], correct: "Three", category: "numbers" }
      ]
    }
  ],
  "Section 27": [
    {
      title: "Debate Club Auditions",
      description: "Students organize audition trials for an upcoming regional debate championship.",
      transcript: "[M2]Attention everyone, let's go over the arrangements for the regional debate championship next month. The motion is: 'Artificial intelligence poses a greater risk than benefit to creative education.' We have nine applicants auditioning for our four-member delegation—three main speakers and one alternate. Mr. Reynolds booked the multimedia conference room for Tuesday from three-thirty to five o'clock. Each speaker will get four minutes for their opening argument and two minutes for cross-examination. Please submit your speaking outlines by Monday noon so the judging panel can review them in advance.",
      questions: [
        { id: "hs27q1", text: "How many applicants are auditioning for the debate team?", options: ["Six", "Eight", "Nine", "Twelve"], correct: "Nine", category: "numbers" },
        { id: "hs27q2", text: "How much time is allocated for cross-examination?", options: ["One minute", "Two minutes", "Three minutes", "Four minutes"], correct: "Two minutes", category: "numbers" },
        { id: "hs27q3", text: "Where will the audition trials take place?", options: ["In the school auditorium", "In the multimedia conference room", "In the main library", "In the science lab"], correct: "In the multimedia conference room", category: "factual" }
      ]
    }
  ],
  "Section 28": [
    {
      title: "Chemistry Lab Titration",
      description: "Lab partners collaborate to execute an accurate acid-base titration.",
      transcript: "[F3]Okay Fahim, let's double check our setup before turning the burette valve. We need safety goggles on at all times. We have measured twenty-five millilitres of hydrochloric acid into the conical flask and added three drops of phenolphthalein indicator. [M4]Right. Now we slowly add sodium hydroxide solution from the burette while gently swirling the flask. We are looking for the exact moment the clear liquid turns into a persistent, faint pink color. Remember, we must record the starting volume, which is at twelve point four millilitres, and repeat the trial three times to calculate a concordant average.",
      questions: [
        { id: "hs28q1", text: "How many drops of phenolphthalein indicator did they add?", options: ["Two drops", "Three drops", "Four drops", "Five drops"], correct: "Three drops", category: "numbers" },
        { id: "hs28q2", text: "What color change indicates the titration endpoint?", options: ["Turns dark blue", "Turns yellow", "Turns faint pink", "Turns cloudy white"], correct: "Turns faint pink", category: "factual" },
        { id: "hs28q3", text: "What is the initial volume on the burette?", options: ["10.2 millilitres", "12.4 millilitres", "15.0 millilitres", "25.0 millilitres"], correct: "12.4 millilitres", category: "numbers" }
      ]
    }
  ],
  "Section 29": [
    {
      title: "School Newspaper Editorial Board",
      description: "Student journalists review article submissions and layout deadlines.",
      transcript: "[F4]Welcome to the editorial meeting for the spring edition of The Campus Chronicle. We have thirty-two pages to lay out by next Friday. The lead feature will be Ayesha's interview with the national badminton coach. Liam is writing an investigative piece on food waste in the school cafeteria. We received forty-five photo submissions for the wildlife photography contest, and the art committee will select the top three for the cover spread. Also, the administration approved our request to print three hundred copies on recycled paper, which saves twenty percent on printing costs.",
      questions: [
        { id: "hs29q1", text: "What is the lead feature article about?", options: ["Cafeteria food waste", "An interview with the national badminton coach", "School library renovation", "Wildlife photography contest"], correct: "An interview with the national badminton coach", category: "factual" },
        { id: "hs29q2", text: "How many copies did the administration approve to print?", options: ["Two hundred", "Two hundred and fifty", "Three hundred", "Four hundred"], correct: "Three hundred", category: "numbers" },
        { id: "hs29q3", text: "How much cost is saved by using recycled paper?", options: ["Ten percent", "Fifteen percent", "Twenty percent", "Twenty-five percent"], correct: "Twenty percent", category: "numbers" }
      ]
    }
  ],
  "Section 30": [
    {
      title: "Model United Nations Briefing",
      description: "Delegates prepare position papers for the regional environmental summit.",
      transcript: "[M1]Good afternoon delegates. For this year's Model United Nations conference at City Hall, our school will represent the delegation of Japan in the United Nations Environment Programme. Our primary topic is establishing legally binding treaties to reduce microplastic contamination in the Pacific basin. Each delegate must submit a two-page position paper by October tenth. The registration fee is twenty dollars per delegate, which covers the conference binder, lunch on both days, and the delegate reception on Saturday evening.",
      questions: [
        { id: "hs30q1", text: "Which country will the school represent at the conference?", options: ["Germany", "Canada", "Japan", "South Korea"], correct: "Japan", category: "factual" },
        { id: "hs30q2", text: "What is the deadline for submitting the position papers?", options: ["October fifth", "October eighth", "October tenth", "October fifteenth"], correct: "October tenth", category: "numbers" },
        { id: "hs30q3", text: "How much is the registration fee per delegate?", options: ["$15", "$20", "$25", "$30"], correct: "$20", category: "numbers" }
      ]
    }
  ],
  "Section 31": [
    {
      title: "Library Research Orientation",
      description: "A school librarian explains reference tools and reservation policies.",
      transcript: "[F2]Good morning, Year Ten students. Welcome to your independent research orientation. You can access our digital journal database from any campus computer using your student ID card. For physical lending, senior students are permitted to borrow up to five books for a period of fourteen days. Rare reference encyclopedias and archived local newspapers must remain in the silent reading room on the second floor. Please note that this Thursday, the library will close at three-thirty PM instead of five o'clock for inventory cataloging.",
      questions: [
        { id: "hs31q1", text: "How many books can senior students borrow at one time?", options: ["Three", "Four", "Five", "Six"], correct: "Five", category: "numbers" },
        { id: "hs31q2", text: "Where must rare reference encyclopedias be read?", options: ["In the computer lab", "In the silent reading room on the second floor", "In the teacher's lounge", "At home"], correct: "In the silent reading room on the second floor", category: "factual" },
        { id: "hs31q3", text: "Why is the library closing early on Thursday?", options: ["Staff illness", "Electrical maintenance", "Inventory cataloging", "Examination prep"], correct: "Inventory cataloging", category: "factual" }
      ]
    }
  ],
  "Section 32": [
    {
      title: "Student Council Election Campaign",
      description: "Candidates discuss election manifestos and campaign guidelines.",
      transcript: "[M3]All candidates running for Student Council executive positions must follow the campaign ethics code strictly. Campaigning begins on Monday morning and concludes on Thursday afternoon at four o'clock. Each presidential ticket is limited to twenty printed posters and forty handbills, and all campaign materials must be stamped by the vice-principal's office before posting. Candidate speeches will take place during the general assembly on Wednesday at nine AM in the main gymnasium. Voting will be conducted digitally on Friday morning through the student portal.",
      questions: [
        { id: "hs32q1", text: "When does the election campaign conclude?", options: ["Tuesday at noon", "Wednesday evening", "Thursday afternoon at four o'clock", "Friday morning"], correct: "Thursday afternoon at four o'clock", category: "factual" },
        { id: "hs32q2", text: "Where will candidate speeches be delivered on Wednesday?", options: ["In the auditorium", "In the main gymnasium", "In the cafeteria", "On the sports ground"], correct: "In the main gymnasium", category: "factual" },
        { id: "hs32q3", text: "How many handbills is each presidential ticket permitted to distribute?", options: ["Twenty", "Thirty", "Forty", "Fifty"], correct: "Forty", category: "numbers" }
      ]
    }
  ],
  "Section 33": [
    {
      title: "Annual Drama Production",
      description: "The stage director and backstage manager plan prop and lighting cues.",
      transcript: "[F5]We have only ten days remaining before opening night of our annual Shakespeare production, 'The Merchant of Venice'. The stage management team has completed the set construction for the courtroom scene. We rented eight wireless headset microphones, but two are experiencing audio interference and need fresh lithium batteries. Full dress rehearsals are scheduled for Monday and Tuesday from four to seven PM. All actors must report to the costume dressing room forty-five minutes before curtain call.",
      questions: [
        { id: "hs33q1", text: "Which play is the drama club staging this year?", options: ["Hamlet", "Macbeth", "The Merchant of Venice", "Romeo and Juliet"], correct: "The Merchant of Venice", category: "factual" },
        { id: "hs33q2", text: "How many wireless headset microphones were rented?", options: ["Six", "Eight", "Ten", "Twelve"], correct: "Eight", category: "numbers" },
        { id: "hs33q3", text: "When must actors report to the dressing room?", options: ["30 minutes before curtain call", "45 minutes before curtain call", "60 minutes before curtain call", "90 minutes before curtain call"], correct: "45 minutes before curtain call", category: "numbers" }
      ]
    }
  ],
  "Section 34": [
    {
      title: "Peer Tutoring Initiative",
      description: "A coordinator outlines the weekly schedule for peer academic support.",
      transcript: "[M5]The mathematics and science peer tutoring center will officially open this Monday. Sessions will operate every Tuesday and Thursday afternoon from three-fifteen to four-thirty in Room 204. We have paired sixteen student tutors from Year Eleven with junior students needing assistance in algebra, geometry, and basic chemistry. Tutors will earn community service credits, receiving two hours of volunteer certification for every full week of service.",
      questions: [
        { id: "hs34q1", text: "In which room will the peer tutoring sessions take place?", options: ["Room 102", "Room 204", "Room 305", "Room 410"], correct: "Room 204", category: "factual" },
        { id: "hs34q2", text: "How many Year Eleven student tutors have volunteered?", options: ["Twelve", "Fourteen", "Sixteen", "Twenty"], correct: "Sixteen", category: "numbers" },
        { id: "hs34q3", text: "How many volunteer service hours do tutors earn per week?", options: ["One hour", "Two hours", "Three hours", "Four hours"], correct: "Two hours", category: "numbers" }
      ]
    }
  ],
  "Section 35": [
    {
      title: "Charity Winter Drive",
      description: "Student volunteers organize collection and distribution of winter blankets.",
      transcript: "[F3]Our school youth red crescent unit is launching the annual winter relief drive. We are setting up collection bins near the administrative building and the secondary gate from November fifteenth to twenty-fifth. Our goal is to collect four hundred warm fleece blankets and five hundred woollen sweaters for families affected by severe cold in Kurigram and Dinajpur. A transport truck has been donated by a parent committee to deliver the supplies on the first Saturday of December.",
      questions: [
        { id: "hs35q1", text: "What is the collection goal for warm fleece blankets?", options: ["300", "400", "500", "600"], correct: "400", category: "numbers" },
        { id: "hs35q2", text: "Which districts will receive the relief supplies?", options: ["Sylhet and Sunamganj", "Kurigram and Dinajpur", "Khulna and Jessore", "Barisal and Bhola"], correct: "Kurigram and Dinajpur", category: "factual" },
        { id: "hs35q3", text: "When will the transport truck deliver the collected items?", options: ["Last Friday of November", "First Saturday of December", "Second Sunday of December", "Christmas morning"], correct: "First Saturday of December", category: "factual" }
      ]
    }
  ],
  "Section 36": [
    {
      title: "Career Mentorship Forum",
      description: "Guidance department invites industry professionals to share career pathways.",
      transcript: "[M2]Next Wednesday, the career counseling department will host our annual professional exploration day in the multipurpose hall from ten AM to two PM. We will feature guest speakers from three distinct fields: civil infrastructure engineering, renewable energy technology, and pediatric medicine. Students can attend two seminar panels and one interactive roundtable discussion. Registration is mandatory through the online portal by Monday evening, as seating in each room is capped at forty participants to facilitate meaningful discussion.",
      questions: [
        { id: "hs36q1", text: "At what time does the professional exploration day start?", options: ["9:00 AM", "10:00 AM", "11:00 AM", "1:00 PM"], correct: "10:00 AM", category: "numbers" },
        { id: "hs36q2", text: "How many interactive roundtable discussions can each student attend?", options: ["One", "Two", "Three", "Four"], correct: "One", category: "numbers" },
        { id: "hs36q3", text: "What is the maximum seating capacity for each seminar room?", options: ["25 participants", "30 participants", "35 participants", "40 participants"], correct: "40 participants", category: "numbers" }
      ]
    }
  ]
};

export const scenariosIntermediate: Record<string, Scenario[]> = {
  "Section 1": [
    {
      title: "The Accommodation Booking",
      description: "A customer calls a hostel to book a room for a short stay.",
      transcript: "[F1]Good morning, Willow Tree Hostel. How can I help you? [M1]Hi, I’d like to book a room for two nights next week, please. [F1]Certainly. What dates will you be staying with us? [M1]From the 14th to the 16th of April. [F1]Great. And can I take your name? [M1]Yes, it’s Mark Branscombe. [F1]Could you spell your surname for me, please? [M1]Sure, it’s B-R-A-N-S-C-O-M-B-E. [F1]Thank you. And a contact number? [M1]It’s 07745 223 990.",
      questions: [
        { id: "t1q1", text: "What are the dates of the stay?", options: ["13th to 15th of April", "14th to 16th of April", "14th to 16th of August"], correct: "14th to 16th of April", category: "numbers" },
        { id: "t1q2", text: "What is the customer's contact number?", options: ["07745 223 990", "07754 223 990", "07745 233 909"], correct: "07745 223 990", category: "numbers" }
      ]
    }
  ],
  "Section 2": [
    {
      title: "Joining a Leisure Club",
      description: "A woman inquires about membership options at a local leisure centre.",
      transcript: "[M2]Welcome to the Riverside Leisure Centre. Are you looking to join? [F2]Yes, I’m interested in the swimming and gym membership. [M2]We have a 'Gold' package that covers both. It’s £45 a month. [F2]That sounds perfect. What are the opening hours for the pool? [M2]The pool opens at 6:30 AM on weekdays and closes at 9:00 PM. [F2]Okay, I’ll take it. My address is 24 Sycamore Road, and the postcode is PE4 5GT. [M2]S-Y-C-A-M-O-R-E... got it.",
      questions: [
        { id: "t2q1", text: "How much is the 'Gold' membership per month?", options: ["£35", "£45", "£55"], correct: "£45", category: "numbers" },
        { id: "t2q2", text: "What time does the pool close on weekdays?", options: ["8:30 PM", "9:00 PM", "9:30 PM"], correct: "9:00 PM", category: "numbers" }
      ]
    }
  ],
  "Section 3": [
    {
      title: "Reporting a Lost Item",
      description: "A man reports a missing bag to the Lost Property Office.",
      transcript: "[M3]Lost Property Office, how can I help? [M4]Hello, I left my bag on the train from London this morning and I’m hoping it’s been handed in. [M3]Okay, let’s take some details. What color is the bag? [M4]It’s dark blue with a silver zipper. [M3]And what was inside? [M4]My laptop, a pair of reading glasses, and a red notebook. [M3]What time did your train arrive? [M4]It was the 10:15 AM service. [M3]Okay, let me give you a reference number: it’s L-P-9-9-2.",
      questions: [
        { id: "t3q1", text: "Which description matches the lost bag?", options: ["Light blue with a silver zipper", "Dark blue with a black zipper", "Dark blue with a silver zipper"], correct: "Dark blue with a silver zipper", category: "factual" },
        { id: "t3q2", text: "What is the reference number provided?", options: ["L-P-9-9-2", "L-B-9-9-2", "L-P-8-8-2"], correct: "L-P-9-9-2", category: "numbers" }
      ]
    }
  ],
  "Section 4": [
    {
      title: "Job Enquiry (Part-Time Work)",
      description: "A student calls a restaurant regarding a job advertisement.",
      transcript: "[F3]Hello, Luigi’s Restaurant. [M5]Hi, I’m calling about the part-time waiter position advertised in the window. [F3]Ah, yes. We’re looking for someone to cover weekend evening shifts. Have you worked in hospitality before? [M5]Yes, I worked in a café for six months last year. What are the hours? [F3]It would be Fridays and Saturdays, from 5:30 PM until midnight. [M5]And the pay rate? [F3]It starts at £10.50 an hour, plus tips. If you’re interested, please email your CV to manager@luigis.co.uk.",
      questions: [
        { id: "t4q1", text: "When are the required shifts?", options: ["Friday and Saturday evenings", "Saturday and Sunday evenings", "Friday and Saturday mornings"], correct: "Friday and Saturday evenings", category: "factual" },
        { id: "t4q2", text: "What is the hourly pay rate?", options: ["£10.00", "£10.15", "£10.50"], correct: "£10.50", category: "numbers" }
      ]
    }
  ],
  "Section 5": [
    {
      title: "Booking a Tour",
      description: "A tourist books a day trip for their family with a travel agent.",
      transcript: "[F4]Sunways Travel, Sheila speaking. [M1]Hi Sheila, I want to book a day trip to the Highland Castle for next Tuesday. [F4]Next Tuesday... let me check. Yes, we have seats available. Will it just be for one person? [M1]No, for two adults and one child. [F4]Okay. The total will be £85. The coach leaves from the main square at 8:45 AM sharp, so please arrive 10 minutes early. [M1]8:45, understood. Does the price include lunch? [F4]No, you’ll need to bring a packed lunch or buy food at the castle café.",
      questions: [
        { id: "t5q1", text: "What is the total cost for the group?", options: ["£75", "£85", "£95"], correct: "£85", category: "numbers" },
        { id: "t5q2", text: "What is the situation regarding lunch?", options: ["It is included in the price.", "You must bring your own; there is no café.", "You can bring your own or buy it there."], correct: "You can bring your own or buy it there.", category: "factual" }
      ]
    }
  ],
  "Section 6": [
    {
      title: "Renting an Apartment",
      description: "A client discusses rental terms for a two-bedroom apartment.",
      transcript: "[M2]City Properties, how can I help? [F5]I’m looking for a two-bedroom apartment near the university. [M2]We have one available on Station Road. It’s fully furnished and available from the 1st of September. [F5]How much is the rent? [M2]It’s £850 per month, and water is included, but you have to pay for electricity and internet. [F5]That’s within my budget. Is there a parking space? [M2]No private parking, unfortunately, but there is free street parking nearby.",
      questions: [
        { id: "t6q1", text: "Which of these is included in the monthly rent?", options: ["Electricity", "Water", "Internet"], correct: "Water", category: "factual" },
        { id: "t6q2", text: "What is true about the parking?", options: ["There is a private garage.", "There is no parking at all.", "There is free parking on the street."], correct: "There is free parking on the street.", category: "factual" }
      ]
    }
  ],
  "Section 7": [
    {
      title: "Event Registration (Seminar)",
      description: "An attendee registers at the front desk of a marketing seminar.",
      transcript: "[F1]Registration desk, can I have your name, please? [F2]Yes, it’s Sarah Jenkins. I’m here for the marketing seminar. [F1]J-E-N-K-I-N-S. Yes, here you are. Have you paid the registration fee? [F2]I paid online yesterday. Do you need my receipt? [F1]Yes, please. Oh, and I need to ask—do you have any dietary requirements for the catered lunch? [F2]Yes, I’m vegetarian. [F1]Noted. The seminar is in Room 14 on the second floor. It starts at exactly 9:30 AM.",
      questions: [
        { id: "t7q1", text: "How did Sarah Jenkins pay her fee?", options: ["In cash at the desk", "Online the day before", "By bank transfer a week ago"], correct: "Online the day before", category: "factual" },
        { id: "t7q2", text: "Where is the seminar being held?", options: ["Room 14, 2nd floor", "Room 40, 2nd floor", "Room 14, 1st floor"], correct: "Room 14, 2nd floor", category: "factual" }
      ]
    }
  ],
  "Section 8": [
    {
      title: "Moving Company Quote",
      description: "A mover provides a cost estimate for a house relocation.",
      transcript: "[M3]Rapid Removals, giving you a quote. Where are you moving from? [F3]From flat 4, 12 Bridge Street. [M3]And the destination? [F3]It’s a house in Oxford. The postcode is OX1 3PQ. [M3]What date are you looking to move? [F3]The 22nd of November. [M3]Are there any particularly heavy items? [F3]Yes, we have a piano, and a large oak dining table. [M3]We’ll need an extra man for the piano. That will be an additional £50 on the quote.",
      questions: [
        { id: "t8q1", text: "What is the destination postcode in Oxford?", options: ["OX1 3BQ", "OX2 3PQ", "OX1 3PQ"], correct: "OX1 3PQ", category: "numbers" },
        { id: "t8q2", text: "Why is there an extra £50 charge?", options: ["For moving a piano", "For long-distance travel", "For moving an oak table"], correct: "For moving a piano", category: "inference" }
      ]
    }
  ],
  "Section 9": [
    {
      title: "Car Hire Enquiry",
      description: "A driver rents a vehicle for the weekend and discusses insurance.",
      transcript: "[F4]Fast Track Car Hire. [M4]Hello, I’d like to rent a compact car for the weekend. [F4]Let’s see. We have a Ford Fiesta available. It’s £35 a day. [M4]Does that include insurance? [F4]Basic insurance is included, but fully comprehensive is an extra £10 a day. [M4]I’ll take the comprehensive. I’ll need the car from Friday afternoon to Monday morning. [F4]No problem. Can I have your driver’s license number? [M4]Yes, it’s M-O-R-G-A-N-8-8-2.",
      questions: [
        { id: "t9q1", text: "How much does the insurance upgrade cost per day?", options: ["£10", "£35", "£45"], correct: "£10", category: "numbers" },
        { id: "t9q2", text: "The license number ends in which three digits?", options: ["8-2-2", "8-8-2", "9-8-2"], correct: "8-8-2", category: "numbers" }
      ]
    }
  ],
  "Section 10": [
    {
      title: "Medical Clinic Registration",
      description: "A new patient registers at a medical clinic and books an appointment.",
      transcript: "[F5]Good afternoon, Oakfield Medical Clinic. Are you a new patient? [M5]Yes, I just moved to the area. I need to register. [F5]I’ll need some details. What is your full name and date of birth? [M5]David Chelmsford. C-H-E-L-M-S-F-O-R-D. My date of birth is the 3rd of August, 1992. [F5]Thank you. Do you have any current medical conditions we should know about? [M5]I have asthma, and I need to renew my prescription for an inhaler. [F5]Okay, I can book you in to see Dr. Evans next Wednesday at 2:15 PM.",
      questions: [
        { id: "t10q1", text: "What is the patient's date of birth?", options: ["3rd of April 1992", "13th of August 1992", "3rd of August 1992"], correct: "3rd of August 1992", category: "numbers" },
        { id: "t10q2", text: "Why does the patient need to see a doctor?", options: ["For a general check-up", "To renew an asthma prescription", "To treat a new allergy"], correct: "To renew an asthma prescription", category: "factual" }
      ]
    }
  ],
  "Section 11": [
    {
      title: "Campus Library Orientation",
      description: "A university librarian leads new students through the main library.",
      transcript: "[F2]Alright everyone, welcome to the Meridian University Library. I'm Dr. Patricia Holmes, and I'll be giving you a quick orientation today. Our library has four floors open to students. The ground floor is where you'll find the circulation desk, the returns drop box, and our popular new arrivals section. The first floor is dedicated entirely to digital resources. We have eighty workstations, two printing stations, and three group collaboration pods with large screens. Your student ID doubles as your print card. Each semester you get two hundred free black and white pages and fifty colour pages. Moving up to the second floor, that's where the main book collection lives. It's organised by the Library of Congress classification system, not Dewey Decimal. We also have twelve individual study carrels on this floor available on a first-come, first-served basis. The third floor is our quiet study zone. No conversations, no phone calls, complete silence enforced. It also houses the rare books collection and our archive of theses and dissertations. Study rooms two-oh-one through two-ten on the second floor can be booked online through the student portal, up to two weeks in advance. Each booking is for a maximum of three hours.",
      questions: [
        { id: "i1s1q1", text: "How many free colour pages do students get per semester?", options: ["25", "50", "100", "200"], correct: "50", category: "numbers" },
        { id: "i1s1q2", text: "Which classification system does the library use?", options: ["Dewey Decimal", "Library of Congress", "Universal Decimal", "Bliss Classification"], correct: "Library of Congress", category: "factual" },
        { id: "i1s1q3", text: "What is the maximum duration for a study room booking?", options: ["One hour", "Two hours", "Three hours", "Four hours"], correct: "Three hours", category: "numbers" }
      ]
    }
  ],
  "Section 12": [
    {
      title: "Study Group Project Planning",
      description: "Four students discuss their upcoming group presentation.",
      transcript: "[M1]OK so the presentation is in exactly two weeks, on the fifteenth. We need to have a solid draft by the tenth so we can practice at least twice before the actual day. The topic is the impact of remote work on urban community structures. We need to cover economic effects, social isolation metrics, changes in local business patterns, and environmental implications of reduced commuting. [F3]I can take the economic section. I've already found a couple of papers from the Brookings Institute on how downtown revenue shifted during the pandemic. Lisa, what about you? [F2]I'll do the social isolation part. There's that famous Harvard study on neighbourhood ties that weakened after twenty-twenty. [M1]Dev, do you want the business patterns section? [M2]Yeah, I was actually thinking about interviewing a few local shop owners near campus. Would that count as primary data? [F3]Absolutely, the professor specifically said primary research would be rewarded. Just make sure you get their consent recorded and keep a transcript. [M2]That leaves environmental implications for me. [M1]I'll focus on carbon emission reductions from commuting and whether that offset increased residential energy use. Let's set a check-in meeting for next Wednesday at four in the student centre.",
      questions: [
        { id: "i1s2q1", text: "When is the presentation due?", options: ["The 10th", "The 12th", "The 15th", "The 20th"], correct: "The 15th", category: "numbers" },
        { id: "i1s2q2", text: "What type of data collection does the professor encourage?", options: ["Secondary research only", "Primary research", "Survey-based only", "Statistical modelling"], correct: "Primary research", category: "inference" },
        { id: "i1s2q3", text: "What does the student assigned to environmental implications plan to focus on?", options: ["Air quality indices", "Public transportation usage", "Commuting emissions versus residential energy", "Urban green space development"], correct: "Commuting emissions versus residential energy", category: "factual" }
      ]
    }
  ]
};

export { scenariosAdvance } from './scenariosAdvance';


export { scenariosPro } from './scenariosPro';

export { scenariosHigherOrder } from './scenariosHigherOrder';
