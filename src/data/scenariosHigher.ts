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

export const scenariosAdvance: Record<string, Scenario[]> = {
  "Section 1": [
    {
      title: "Graduate Job Interview",
      description: "A formal job interview.",
      transcript: "[M1]Good morning, Ms. Rahman. Thank you for coming in today. Let me start by asking about your experience at DataFlow Analytics. You were there for two years as a junior data analyst, is that correct? [F2]That's correct. I joined in January twenty-twenty-two and left in December twenty-twenty-three. During my time there, I primarily worked on customer segmentation projects using Python and SQL. [M1]Can you give me a specific example of a project where your analysis led to a measurable business outcome? [F2]Certainly. In my second year, I led a churn prediction model that identified customers likely to cancel their subscriptions within the next three months. The model achieved eighty-seven percent accuracy, and by targeting those customers with personalised retention offers, we reduced the monthly churn rate from four point two percent to three point one percent. [M1]That's impressive. What about your experience with data visualisation tools? [F2]I'm proficient in Tableau and Power BI. At DataFlow, I built executive dashboards that were reviewed weekly by the C-suite. I also have experience with D3.js for custom interactive visualisations. Regarding salary expectations, what range are you looking for? Based on my research and experience, I'm looking for a range of seventy to eighty-five thousand annually, but I'm flexible depending on the benefits package and growth opportunities.",
      questions: [
        { id: "a1s1q1", text: "What was the accuracy of the churn prediction model?", options: ["75%", "80%", "87%", "92%"], correct: "87%", category: "numbers" },
        { id: "a1s1q2", text: "By how much did the monthly churn rate decrease?", options: ["From 4.2% to 3.1%", "From 5.0% to 3.1%", "From 4.2% to 2.5%", "From 3.1% to 4.2%"], correct: "From 4.2% to 3.1%", category: "numbers" },
        { id: "a1s1q3", text: "What salary range did the candidate mention?", options: ["$60K–$75K", "$70K–$85K", "$80K–$95K", "$85K–$100K"], correct: "$70K–$85K", category: "numbers" }
      ]
    }
  ],
  "Section 2": [
    {
      title: "Research Methodology Lecture",
      description: "A professor explains research methodologies.",
      transcript: "[M5]Today we're going to discuss the critical distinction between qualitative and quantitative research methodologies, and more importantly, when and why you should choose one over the other. Quantitative research deals with numbers and measurable variables. It uses statistical analysis to test hypotheses and establish patterns across large sample sizes. The gold standard here is the randomised controlled trial, but in social sciences, we more commonly use surveys with Likert scales or structured observational coding. The strength of quantitative methods is generalisability. If you survey a representative sample of five hundred people, you can statistically infer findings to a population of millions, typically with a margin of error of plus or minus four to five percent at a ninety-five percent confidence level. Qualitative research, on the other hand, focuses on understanding meaning, context, and process. Methods include in-depth interviews, focus groups, ethnographic observation, and thematic analysis of texts. Sample sizes are deliberately small, often between twelve and thirty participants, because the goal is not statistical generalisation but rather analytical generalisation, meaning you develop theoretical insights that can apply to similar contexts. The most robust approach is often mixed methods, where you use qualitative findings to generate hypotheses and then test them quantitatively, or vice versa.",
      questions: [
        { id: "a1s2q1", text: "What is described as the gold standard in quantitative research?", options: ["Survey research", "Case studies", "Randomised controlled trial", "Ethnography"], correct: "Randomised controlled trial", category: "factual" },
        { id: "a1s2q2", text: "What is the typical sample size range for qualitative research?", options: ["5–10", "12–30", "50–100", "200–500"], correct: "12–30", category: "numbers" },
        { id: "a1s2q3", text: "In qualitative research, what type of generalisation is the goal?", options: ["Statistical", "Analytical", "Demographic", "Predictive"], correct: "Analytical", category: "inference" }
      ]
    }
  ]
};

export const scenariosPro: Record<string, Scenario[]> = {
  "Section 1": [
    {
      title: "Thermodynamic Feedback Loops in Arctic Systems",
      description: "A professor delivers a guest lecture on nonlinear climate dynamics.",
      transcript: "[M5]Good afternoon. Today I want to walk you through one of the most critical yet underappreciated mechanisms in climate science: the nonlinear feedback loops operating in Arctic systems. The first feedback mechanism is the ice-albedo feedback. Sea ice has an albedo of roughly zero point six to zero point eight, meaning it reflects sixty to eighty percent of incoming solar radiation. Open ocean water, by contrast, has an albedo of about zero point zero six. So as sea ice retreats, the exposed dark water absorbs dramatically more solar energy, which in turn warms the water further, melting more ice. This is a positive feedback loop. What makes this particularly dangerous is its threshold behaviour. The second mechanism is permafrost carbon feedback. The Arctic permafrost contains approximately fifteen hundred gigatons of organic carbon, nearly twice the amount currently in the atmosphere. Microbial decomposition of this formerly frozen organic matter releases both carbon dioxide and methane. Methane is roughly eighty times more potent as a greenhouse gas over a twenty-year horizon compared to CO2. Recent field studies from the Siberian Arctic suggest that methane emissions from thawing permafrost may be thirty to forty percent higher than our current models predict, because they fail to account for abrupt thaw processes like thermokarst lake formation. The interaction between these two feedbacks makes Arctic systems genuinely unpredictable.",
      questions: [
        { id: "pr1s1q1", text: "What is the approximate albedo of open ocean water?", options: ["0.06", "0.20", "0.40", "0.60"], correct: "0.06", category: "numbers" },
        { id: "pr1s1q2", text: "How much organic carbon does Arctic permafrost contain?", options: ["500 gigatons", "1000 gigatons", "1500 gigatons", "2000 gigatons"], correct: "1500 gigatons", category: "numbers" },
        { id: "pr1s1q3", text: "Why are current methane emission models likely underestimating actual releases?", options: ["They ignore microbial activity entirely", "They fail to account for abrupt thaw processes like thermokarst lakes", "They overestimate soil moisture levels", "They use incorrect temperature baselines"], correct: "They fail to account for abrupt thaw processes like thermokarst lakes", category: "inference" }
      ]
    }
  ],
  "Section 2": [
    {
      title: "Synaptic Plasticity and Memory Consolidation",
      description: "A neuroscience researcher presents findings.",
      transcript: "[F2]What I'd like to present today is a synthesis of our lab's recent work on how transient experiences become durable memories at the synaptic level. The foundational concept here is long-term potentiation, or LTP, first demonstrated by Bliss and Lomo in nineteen seventy-three. The molecular cascade is well-established. High-frequency glutamatergic activation of AMPA receptors depolarises the postsynaptic membrane, displacing the magnesium block from NMDA receptors. Calcium then floods through these NMDA channels, activating calcium-calmodulin-dependent protein kinase two, CaMKII for short. CaMKII autophosphorylates, meaning it becomes active even after calcium levels normalise, and this sustained kinase activity drives AMPA receptor insertion into the postsynaptic membrane. Our recent work investigated how this process interacts with sleep. Using in vivo two-photon calcium imaging in mice, we found that during slow-wave sleep, dendritic spines that were potentiated during wakefulness undergo a second wave of structural enlargement. Crucially, this only occurs for spines that were co-activated with other spines on the same dendritic branch during the waking experience. Spines potentiated in isolation actually showed slight retraction during sleep. This explains why spaced learning is more effective than massed learning.",
      questions: [
        { id: "pr1s2q1", text: "What role does the magnesium block play in LTP?", options: ["It prevents glutamate release", "It blocks NMDA receptors until membrane depolarisation", "It activates CaMKII directly", "It causes AMPA receptor internalisation"], correct: "It blocks NMDA receptors until membrane depolarisation", category: "factual" },
        { id: "pr1s2q2", text: "What happens to spines potentiated in isolation during slow-wave sleep?", options: ["They enlarge further", "They remain unchanged", "They show slight retraction", "They migrate to other dendrites"], correct: "They show slight retraction", category: "factual" },
        { id: "pr1s2q3", text: "According to the research, why is spaced learning more effective?", options: ["It creates stronger individual spines", "It allows sleep-dependent linking of correlated patterns between sessions", "It increases NMDA receptor density", "It reduces interference from competing memories"], correct: "It allows sleep-dependent linking of correlated patterns between sessions", category: "inference" }
      ]
    }
  ],
  "Section 3": [
    {
      title: "Quantum Decoherence and Error Mitigation",
      description: "A physicist explains decoherence timescales and quantum error correction codes.",
      transcript: "[M1]Welcome back. Today we examine the fundamental barrier to scalable quantum computing: environmental decoherence. In superconducting transmon qubits, energy relaxation time T1 and phase coherence time T2 typically range between eighty and one hundred and twenty microseconds at operating temperatures of fifteen millikelvin. Environmental noise, particularly 1/f magnetic flux noise and dielectric loss in substrate interfaces, causes superposition states to degrade into classical statistical mixtures. To protect quantum information, surface code architectures distribute one logical qubit across a two-dimensional lattice of physical qubits. For a distance-seven surface code, which requires ninety-seven physical data and syndrome qubits, the theoretical threshold for physical gate error rate is approximately one percent. However, to achieve a logical error rate below ten to the negative twelve—necessary for running Shor's algorithm on RSA-2048 keys—physical two-qubit gate fidelities must exceed ninety-nine point nine percent. Recent pulse-shaping protocols using DRAG techniques have suppressed phase leakage by nearly forty-two percent.",
      questions: [
        { id: "pr1s3q1", text: "At what operating temperature are the transmon qubits typically maintained?", options: ["4 Kelvin", "15 millikelvin", "77 millikelvin", "1.2 Kelvin"], correct: "15 millikelvin", category: "numbers" },
        { id: "pr1s3q2", text: "How many physical qubits does a distance-seven surface code require?", options: ["49", "64", "97", "128"], correct: "97", category: "numbers" },
        { id: "pr1s3q3", text: "What primary factor causes superposition states to degrade into classical mixtures?", options: ["Laser pulse drift", "Environmental noise such as flux noise and dielectric loss", "Excessive physical qubit distances", "Spontaneous optical emission"], correct: "Environmental noise such as flux noise and dielectric loss", category: "inference" }
      ]
    }
  ],
  "Section 4": [
    {
      title: "CRISPR-Cas Off-Target Cleavage Dynamics",
      description: "A geneticist presents kinetics of guide RNA mismatch tolerance.",
      transcript: "[F2]In today's seminar, we evaluate the kinetic constraints governing Cas9 off-target cleavage. Wild-type SpCas9 relies on a twenty-nucleotide single-guide RNA that recognizes targets adjacent to a 5-prime NGG protospacer adjacent motif, or PAM. Our high-throughput sequencing assays, utilizing GUIDE-seq across twelve human cell lines, revealed that single-base mismatches within the seed region—the eight to twelve nucleotides adjacent to the PAM—reduce cleavage affinity by ninety-five to ninety-nine percent. Conversely, mismatches located toward the 5-prime distal end of the guide often permit cleavage rates up to sixty-four percent of on-target efficacy. To overcome this promiscuity, we engineered high-fidelity variants such as eSpCas9 and SpCas9-HF1 by neutralizing non-specific positively charged residues in the DNA-binding groove. In comparative trials on human T-cells, these engineered nucleases maintained over ninety percent of on-target editing efficiency while decreasing detectable off-target chromosomal translocations from three point eight percent down to zero point zero five percent.",
      questions: [
        { id: "pr1s4q1", text: "By how much do single-base mismatches in the seed region reduce cleavage affinity?", options: ["50% to 60%", "70% to 80%", "85% to 90%", "95% to 99%"], correct: "95% to 99%", category: "numbers" },
        { id: "pr1s4q2", text: "What modification was made to create the high-fidelity Cas9 variants?", options: ["Neutralizing positive charges in the DNA-binding groove", "Shortening the guide RNA sequence to ten nucleotides", "Replacing the magnesium cofactor with zinc", "Deleting the PAM recognition domain entirely"], correct: "Neutralizing positive charges in the DNA-binding groove", category: "factual" },
        { id: "pr1s4q3", text: "What was the reduced rate of chromosomal translocations achieved in human T-cells?", options: ["0.5%", "0.05%", "0.15%", "0.005%"], correct: "0.05%", category: "numbers" }
      ]
    }
  ],
  "Section 5": [
    {
      title: "Deep-Sea Hydrothermal Chemosynthesis",
      description: "A marine biogeochemist details metabolic pathways of benthic vent ecosystems.",
      transcript: "[M5]At abyssal depths exceeding two thousand five hundred metres, hydrothermal vent ecosystems thrive completely decoupled from solar photosynthesis. The thermodynamic foundation of these communities rests on sulfur-oxidizing and methane-oxidizing chemolithoautotrophic bacteria. In giant tube worms of the species Riftia pachyptila, which lack a mouth and digestive tract entirely, trophosome tissue houses endosymbiotic bacteria at densities exceeding ten to the tenth cells per gram of wet weight. These endosymbionts utilize hydrogen sulfide emitted at hydrothermal fluid temperatures of up to three hundred and eighty degrees Celsius, oxidizing it with dissolved oceanic oxygen to synthesize carbohydrates via the Calvin-Benson cycle. The free energy yield of this sulfide oxidation reaction is approximately seven hundred and ninety-seven kilojoules per mole of hydrogen sulfide. Carbon isotope ratio measurements show delta thirteen carbon values averaging minus eleven per mil, distinct from minus twenty-two per mil in typical photosynthetic phytoplankton, definitively demonstrating an independent carbon fixation pathway.",
      questions: [
        { id: "pr1s5q1", text: "What is the bacterial density found in the trophosome tissue of Riftia pachyptila?", options: ["10^6 cells per gram", "10^8 cells per gram", "10^10 cells per gram", "10^12 cells per gram"], correct: "10^10 cells per gram", category: "numbers" },
        { id: "pr1s5q2", text: "What is the approximate free energy yield per mole of hydrogen sulfide oxidation?", options: ["450 kilojoules", "620 kilojoules", "797 kilojoules", "915 kilojoules"], correct: "797 kilojoules", category: "numbers" },
        { id: "pr1s5q3", text: "What do the distinct delta thirteen carbon values confirm?", options: ["The presence of high hydrostatic pressure", "An independent, non-photosynthetic carbon fixation pathway", "Rapid breakdown of ribosomal RNA", "Nutrient contamination from surface waters"], correct: "An independent, non-photosynthetic carbon fixation pathway", category: "inference" }
      ]
    }
  ],
  "Section 6": [
    {
      title: "Macroeconomic Central Bank Balance Sheet Normalization",
      description: "An economist analyzes liquidity contraction and bond yield curves.",
      transcript: "[F4]Good morning colleagues. Today we analyze the macroeconomic ramifications of central bank quantitative tightening. Following the unprecedented liquidity expansion that expanded the Federal Reserve's balance sheet to almost nine trillion dollars by early twenty-twenty-two, the subsequent runoff policy capped monthly portfolio reductions at ninety-five billion dollars—sixty billion in Treasury securities and thirty-five billion in agency mortgage-backed securities. This contractionary vector exerted substantial upward pressure on term premiums, shifting the ten-year Treasury yield from one point five percent to a peak of five point zero two percent in October twenty-twenty-three. The reverse repurchase facility usage contracted sharply from two point five five trillion dollars down to less than four hundred billion, signaling that excess banking reserves were reabsorbing sovereign issuance. Econometric vector autoregressions indicate that every trillion dollars of balance sheet roll-off produces an interest rate tightening equivalent to approximately twenty-eight to thirty-four basis points on the policy rate.",
      questions: [
        { id: "pr1s6q1", text: "What was the monthly cap on Treasury security reductions during quantitative tightening?", options: ["$35 billion", "$60 billion", "$95 billion", "$120 billion"], correct: "$60 billion", category: "numbers" },
        { id: "pr1s6q2", text: "What peak yield did the ten-year Treasury reach in October 2023?", options: ["4.25%", "4.80%", "5.02%", "5.35%"], correct: "5.02%", category: "numbers" },
        { id: "pr1s6q3", text: "What policy rate equivalent tightening does each trillion dollars of balance sheet reduction represent?", options: ["10–15 basis points", "18–22 basis points", "28–34 basis points", "40–50 basis points"], correct: "28–34 basis points", category: "numbers" }
      ]
    }
  ],
  "Section 7": [
    {
      title: "Perovskite Photovoltaic Degradation Mechanisms",
      description: "A materials scientist explains ion migration and moisture-induced phase segregation.",
      transcript: "[M3]Despite lead-halide perovskite solar cells achieving certified laboratory power conversion efficiencies exceeding twenty-six percent, operational stability remains the primary impediment to commercial deployment. Under continuous one-sun illumination at sixty-five degrees Celsius, methylammonium lead iodide undergoes rapid degradation. The intrinsic vulnerability stems from low activation energy for halide ion migration—typically zero point two five to zero point five eight electron volts. When biased, iodide anions accumulate at the electron transport layer interface, generating internal screening electric fields that diminish open-circuit voltage by up to eighty millivolts. Furthermore, atmospheric moisture ingress triggers irreversible hydration, transforming the black photoactive alpha phase into a wide-bandgap yellow monohydrate phase within forty-eight hours. By substituting formamidinium and incorporating two-dimensional phenethylammonium capping layers, our consortium reduced interfacial trap density by seventy-four percent and maintained ninety-one percent of initial efficiency over eighteen hundred hours of unencapsulated damp-heat testing.",
      questions: [
        { id: "pr1s7q1", text: "What is the typical activation energy range for halide ion migration in perovskite cells?", options: ["0.10 to 0.20 eV", "0.25 to 0.58 eV", "0.85 to 1.10 eV", "1.45 to 1.75 eV"], correct: "0.25 to 0.58 eV", category: "numbers" },
        { id: "pr1s7q2", text: "What structural transformation occurs when the material reacts with atmospheric moisture?", options: ["Transformation from black alpha phase into yellow monohydrate phase", "Decomposition into pure metallic lead crystals", "Expansion of the conductive valence band", "Immediate vaporization of halide salts"], correct: "Transformation from black alpha phase into yellow monohydrate phase", category: "factual" },
        { id: "pr1s7q3", text: "How much initial efficiency was maintained after 1800 hours using capping layers?", options: ["82%", "88%", "91%", "96%"], correct: "91%", category: "numbers" }
      ]
    }
  ],
  "Section 8": [
    {
      title: "Stellar Nucleosynthesis and the r-Process",
      description: "An astrophysicist explains rapid neutron capture in kilonova mergers.",
      transcript: "[F1]The cosmic synthesis of elements heavier than iron requires extreme neutron flux environments, known as the r-process, or rapid neutron-capture process. In these regimes, the rate of neutron capture by atomic nuclei is far higher than the rate of beta-minus decay. Until recently, core-collapse supernovae were presumed to be the primary site. However, the multi-messenger detection of gravitational wave event GW170817, paired with optical observations of the kilonova AT2017gfo, verified that binary neutron star mergers are the dominant cosmic forge for heavy lanthanides and actinides. Spectroscopic modeling of the ejecta revealed an expansion velocity of zero point one to zero point three times the speed of light, yielding approximately ten to the minus two solar masses of r-process material—including an estimated ten to fifteen Earth masses of pure gold and platinum. The radioactive decay of these heavy isotopes powered a quasi-blackbody thermal light curve peaking at an absolute magnitude of minus fifteen point eight over twelve days.",
      questions: [
        { id: "pr1s8q1", text: "Which astrophysical event verified binary neutron star mergers as the dominant forge for r-process elements?", options: ["Supernova SN1987A", "Gravitational wave event GW170817", "Black hole merger GW150914", "Pulsar PSR B1919+21"], correct: "Gravitational wave event GW170817", category: "factual" },
        { id: "pr1s8q2", text: "What expansion velocity was observed in the kilonova ejecta?", options: ["0.01 to 0.05 times the speed of light", "0.1 to 0.3 times the speed of light", "0.5 to 0.7 times the speed of light", "Equal to the speed of light"], correct: "0.1 to 0.3 times the speed of light", category: "numbers" },
        { id: "pr1s8q3", text: "Why is neutron capture termed 'rapid' in the r-process?", options: ["It operates faster than nuclear fusion", "It occurs faster than the rate of beta-minus decay", "It takes place in less than one nanosecond", "It cools the ambient gas immediately"], correct: "It occurs faster than the rate of beta-minus decay", category: "inference" }
      ]
    }
  ],
  "Section 9": [
    {
      title: "Transformer Attention Complexity and Linear Scaling",
      description: "A computer science researcher dissects quadratic self-attention bottlenecks.",
      transcript: "[M1]The foundational self-attention mechanism in the standard Transformer scales quadratically with sequence length N, requiring O(N squared) memory and compute complexity due to the full attention matrix multiplication Q K-transpose. When context lengths expand to one hundred and twenty-eight thousand tokens, computing thirty-two attention heads with head dimension sixty-four demands over twenty-four gigabytes of activation memory per layer alone. To mitigate this computational bottleneck without sacrificing modeling expressivity, linear attention formulations replace the softmax operation with kernelized feature maps, decomposing attention into associative matrix multiplications that evaluate in O(N) linear time. Alternatively, FlashAttention reorganizes GPU memory access, tiling softmax computations into static SRAM blocks to reduce High Bandwidth Memory read-writes by up to four-fold. Benchmark evaluations across eight thousand token sequences show FlashAttention achieves a three point two times wall-clock speedup while reducing peak GPU memory footprint by sixty-eight percent.",
      questions: [
        { id: "pr1s9q1", text: "What is the theoretical memory and compute complexity of standard self-attention?", options: ["O(N)", "O(N log N)", "O(N squared)", "O(N cubed)"], correct: "O(N squared)", category: "factual" },
        { id: "pr1s9q2", text: "By how much does FlashAttention reduce High Bandwidth Memory read-writes?", options: ["Two-fold", "Three-fold", "Up to four-fold", "Six-fold"], correct: "Up to four-fold", category: "numbers" },
        { id: "pr1s9q3", text: "What wall-clock speedup was observed for eight thousand token sequences?", options: ["1.8 times", "2.5 times", "3.2 times", "4.6 times"], correct: "3.2 times", category: "numbers" }
      ]
    }
  ],
  "Section 10": [
    {
      title: "Microbiome-Gut-Brain Axis and Neuroinflammation",
      description: "A neuroimmunologist details vagus nerve signaling and short-chain fatty acid metabolites.",
      transcript: "[F2]Bidirectional communication along the microbiome-gut-brain axis operates via three primary pathways: autonomic vagal innervation, neuroendocrine signaling through the hypothalamic-pituitary-adrenal axis, and circulating microbial metabolites. Enteric fermentation of dietary soluble fiber produces short-chain fatty acids—predominantly acetate, propionate, and butyrate in a molar ratio of approximately sixty to twenty to twenty. Butyrate serves not only as the primary energetic substrate for colonocytes but also acts as an endogenous histone deacetylase inhibitor, suppressing pro-inflammatory cytokine expression. In germ-free murine models, the blood-brain barrier exhibits pronounced structural permeability, marked by a seventy-five percent downregulation of the tight junction proteins claudin-5 and occludin. When germ-free mice receive monocolonization with Clostridium orbiscindens, or supplementation with physiological doses of sodium butyrate, microglial maturation normalizes and blood-brain barrier transendothelial electrical resistance restores to baseline within seventy-two hours.",
      questions: [
        { id: "pr1s10q1", text: "What is the typical molar ratio of acetate, propionate, and butyrate produced by gut fermentation?", options: ["40:40:20", "50:30:20", "60:20:20", "70:15:15"], correct: "60:20:20", category: "numbers" },
        { id: "pr1s10q2", text: "What biological effect occurs to the blood-brain barrier in germ-free mice?", options: ["It thickens by fifty percent", "It displays increased permeability due to down-regulated tight junction proteins", "It calcifies rapidly", "It blocks glucose transport entirely"], correct: "It displays increased permeability due to down-regulated tight junction proteins", category: "inference" },
        { id: "pr1s10q3", text: "How quickly does transendothelial electrical resistance restore after butyrate supplementation?", options: ["24 hours", "48 hours", "72 hours", "96 hours"], correct: "72 hours", category: "numbers" }
      ]
    }
  ],
  "Section 11": [
    {
      title: "Magnetohydrodynamics in Tokamak Fusion Reactors",
      description: "A plasma physicist explains neoclassical tearing modes and magnetic confinement.",
      transcript: "[M5]Achieving net energy gain in magnetic confinement fusion requires sustaining high-beta plasmas while suppressing magnetohydrodynamic instabilities. In advanced tokamak designs, such as ITER, the core plasma reaches ion temperatures of one hundred and fifty million Kelvin, confined by a toroidal magnetic field of five point three Tesla. However, when the normalized plasma pressure beta-N exceeds approximately two point eight, neoclassical tearing modes, or NTMs, are destabilized. These helical magnetic islands tear and reconnect the nested magnetic flux surfaces, degrading energy confinement time by up to forty-five percent and threatening sudden plasma disruption. To stabilize these islands, modern tokamaks inject localized electron cyclotron current drive, or ECCD, targeting the rational magnetic surfaces q equals two or three-halves. Experiments on the DIII-D and ASDEX Upgrade facilities demonstrate that injecting just two point four megawatts of steerable gyrotron microwave power at one hundred and seventy gigahertz reduces island width by eighty-two percent, restoring high-confinement mode operation.",
      questions: [
        { id: "pr1s11q1", text: "What is the core toroidal magnetic field strength designed for ITER?", options: ["2.4 Tesla", "3.8 Tesla", "5.3 Tesla", "7.1 Tesla"], correct: "5.3 Tesla", category: "numbers" },
        { id: "pr1s11q2", text: "How much energy confinement time can be lost due to neoclassical tearing modes?", options: ["Up to 20%", "Up to 30%", "Up to 45%", "Up to 60%"], correct: "Up to 45%", category: "numbers" },
        { id: "pr1s11q3", text: "What mechanism is deployed to actively suppress magnetic island growth?", options: ["Localized electron cyclotron current drive using microwave power", "Increasing cryogenic cooling of the divertor plates", "Injecting neutral argon gas into the vacuum vessel", "Lowering the core plasma temperature below one million Kelvin"], correct: "Localized electron cyclotron current drive using microwave power", category: "factual" }
      ]
    }
  ],
  "Section 12": [
    {
      title: "Epigenetic Clocks and DNA Methylation Biomarkers",
      description: "A biogerontologist examines DNA methylation algorithms estimating biological age.",
      transcript: "[F4]Over the past decade, epigenetic clocks based on DNA methylation arrays have emerged as the most accurate molecular biomarkers of human chronological and biological aging. The seminal Horvath multi-tissue clock interrogates three hundred and fifty-three specific CpG dinucleotides across thirty-six distinct somatic cell types, exhibiting an exceptional Pearson correlation of zero point nine six with chronological age and a median absolute error of three point six years. Second-generation clocks, such as GrimAge and PhenoAge, incorporate plasma protein surrogates and mortality risk phenotypes rather than pure chronological age alone. GrimAge tracks one thousand and thirty CpG sites and predicts remaining lifespan and hazard ratios for age-related cardiovascular morbidity with an area under the receiver operating characteristic curve of zero point eight four. In clinical trials evaluating caloric restriction and senolytic therapies, individuals showing accelerated epigenetic aging—where DNAm age exceeds chronological age by five or more years—experienced a statistically significant forty-eight percent higher all-cause mortality rate over a fifteen-year tracking window.",
      questions: [
        { id: "pr1s12q1", text: "How many CpG dinucleotides are analyzed by the original Horvath multi-tissue clock?", options: ["180", "265", "353", "512"], correct: "353", category: "numbers" },
        { id: "pr1s12q2", text: "What is the median absolute error of the Horvath epigenetic clock?", options: ["1.8 years", "2.5 years", "3.6 years", "5.0 years"], correct: "3.6 years", category: "numbers" },
        { id: "pr1s12q3", text: "What elevated mortality rate was found in individuals with accelerated epigenetic aging exceeding five years?", options: ["24%", "35%", "48%", "62%"], correct: "48%", category: "numbers" }
      ]
    }
  ]
};

export const scenariosHigherOrder: Record<string, Scenario[]> = {
  "Section 1": [
    {
      title: "Panel Discussion on Urban Climate Resilience",
      description: "Three experts debate structural challenges.",
      transcript: "[M2]Thank you all for joining this panel on urban climate resilience. I'd like to start with Dr. Okafor. You've argued that current resilience frameworks are fundamentally misaligned with the speed of climate change. Can you elaborate? [F1]Absolutely. The problem is that most city resilience plans operate on twenty to thirty-year timescales, updating infrastructure codes and zoning regulations incrementally. But the Intergovernmental Panel on Climate Change's latest assessment shows that extreme weather events in urban areas have increased by forty-seven percent since two thousand, and that rate is accelerating. Our planning cycles simply cannot keep up. [M2]Professor Lindström, do you agree with that assessment? [F2]Partially. I think Dr. Okafor is right about the mismatch in timescales, but I'd push back on the framing. The issue isn't just speed; it's nonlinearity. Climate impacts on cities don't increase linearly with temperature rise. There are tipping points. For example, our models show that once mean urban temperature increases exceed two point five degrees Celsius above pre-industrial baselines, the compound effect of heat stress on infrastructure, combined with increased storm intensity, creates cascading failures that are orders of magnitude more costly than the sum of individual impacts. [M2]Ms. Nakamura, from a policy perspective, how do we address this? [M1]The uncomfortable truth is that our current governance structures are designed for incremental risk management, not systemic transformation. Most cities have a climate department with limited budget and authority, while the real decisions about land use, transport, and energy are made by separate departments with competing mandates. What we need is what I call mainstreaming, where climate resilience criteria are embedded into every budgetary and planning decision across all municipal departments. [M2]But Dr. Okafor, doesn't that face enormous political resistance? [F1]Of course it does. But here's where the data helps. Our cost-benefit analyses consistently show that every dollar invested in proactive resilience infrastructure saves between four and eleven dollars in post-disaster recovery costs. That's a compelling economic argument even for politicians with short electoral cycles.",
      questions: [
        { id: "ho1s1q1", text: "By what percentage have extreme weather events in urban areas increased since 2000?", options: ["27%", "37%", "47%", "57%"], correct: "47%", category: "numbers" },
        { id: "ho1s1q2", text: "What does Professor Lindström identify as the key issue beyond speed?", options: ["Funding shortages", "Nonlinearity and tipping points", "Public apathy", "Technological limitations"], correct: "Nonlinearity and tipping points", category: "inference" },
        { id: "ho1s1q3", text: "According to Dr. Okafor, how much does each dollar invested in resilience save in recovery costs?", options: ["$2–$5", "$4–$11", "$6–$15", "$10–$20"], correct: "$4–$11", category: "numbers" }
      ]
    }
  ],
  "Section 2": [
    {
      title: "Peer Review of a Neuroscience Paper",
      description: "Two researchers critically evaluate a paper.",
      transcript: "[M1]So, have you finished reviewing the Chen et al. paper on optogenetic manipulation of memory reconsolidation? [F2]I have, and I have serious concerns about their central claim. They argue that targeted photostimulation of engram cells in the basolateral amygdala during the reconsolidation window can selectively weaken fear memory without affecting the original engram. But their experimental design has a fundamental confound. [M1]Which is? [F2]They use c-Fos-tTA transgenic mice with doxycycline-controlled ChR2 expression. The problem is that doxycycline withdrawal itself has been shown to produce neuroinflammatory responses in the amygdala that can independently modulate fear expression. Their control group received doxycycline throughout, so any difference between experimental and control groups could be attributable to the withdrawal effect rather than the optogenetic stimulation. [M1]That's a valid concern, but wouldn't their second experiment address that? [F2]In experiment two, they used a chemogenetic approach with DREADDs instead of optogenetics. But look at their sample sizes. The optogenetic experiment had N equals eight per group, and the chemogenetic had N equals six. For behavioural fear conditioning studies with the variability we typically see, those sample sizes are severely underpowered. A proper power analysis for a medium effect size at eighty percent power would suggest at least N equals fifteen per group. [M1]I also noticed they used a single retention interval of twenty-four hours. Memory reconsolidation effects are known to be temporally graded. Without testing at longer intervals, say seven or fourteen days, we can't determine whether the effect they observed was true memory weakening or temporary retrieval deficit. [F2]Exactly. And their statistical analysis relies on repeated-measures ANOVA without checking the sphericity assumption. With small sample sizes, violations of Mauchly's test can inflate Type One error rates substantially. I'm recommending major revision with these specific methodological corrections.",
      questions: [
        { id: "ho1s2q1", text: "What is the fundamental confound identified in the paper's experimental design?", options: ["Small sample size", "Doxycycline withdrawal causing neuroinflammation", "Improper statistical tests", "Single retention interval"], correct: "Doxycycline withdrawal causing neuroinflammation", category: "inference" },
        { id: "ho1s2q2", text: "What minimum sample size per group does the reviewer suggest for adequate power?", options: ["8", "10", "12", "15"], correct: "15", category: "numbers" },
        { id: "ho1s2q3", text: "What statistical assumption does the reviewer note was not checked?", options: ["Normality", "Homogeneity of variance", "Sphericity", "Independence"], correct: "Sphericity", category: "factual" }
      ]
    }
  ],
  "Section 3": [
    {
      title: "Symposium on Central Bank Digital Currencies and Financial Stability",
      description: "Three financial economists debate systemic run risk and monetary sovereignty.",
      transcript: "[M2]Let's turn our attention to the systemic design choices of wholesale versus retail Central Bank Digital Currencies. Governor Alvarez, your central bank published an extensive white paper asserting that unconstrained retail CBDCs could disintermediate commercial banking systems during stress events. Could you summarize the quantitative basis for that warning? [F3]Certainly. Our financial stress models simulated an acute confidence shock where depositors can transfer retail savings into zero-credit-risk central bank digital accounts with a single smartphone click. Without individual holding caps, commercial banks lost up to thirty-four percent of their demand deposit base within seventy-two hours. This deposit flight compressed bank net interest margins by two hundred and twenty basis points and forced premature liquidation of illiquid commercial loans. [M2]Professor Vance, you have disputed those liquidity stress projections. What is your counter-argument? [M4]Governor Alvarez's simulation makes the erroneous assumption that central banks would offer unremunerated, unlimited accounts without automated circuit breakers. If you implement a two-tier remuneration framework—where balances up to three thousand euros earn benchmark interest while holdings beyond that threshold face punitive negative interest—flight-to-safety elasticity falls by over seventy-eight percent. Furthermore, commercial banks today rely on wholesale repo and syndicated credit facilities; core retail deposits account for less than forty-two percent of total funding for tier-one global lenders. [F1]If I may interject from a sovereign regulatory perspective: the real dilemma is cross-border currency substitution in emerging markets. If the Federal Reserve or European Central Bank issues a frictionless global digital currency, small open economies could experience backdoor dollarization, losing domestic monetary policy transmission within eighteen months.",
      questions: [
        { id: "ho1s3q1", text: "By how much did commercial banks lose their demand deposit base in the unconstrained simulation?", options: ["Up to 15%", "Up to 24%", "Up to 34%", "Up to 48%"], correct: "Up to 34%", category: "numbers" },
        { id: "ho1s3q2", text: "What counter-measure does Professor Vance propose to reduce deposit flight elasticity?", options: ["A complete ban on retail digital currency transfers", "A two-tier remuneration framework with holding thresholds", "Mandatory commercial bank nationalization", "Extending deposit insurance to infinity"], correct: "A two-tier remuneration framework with holding thresholds", category: "inference" },
        { id: "ho1s3q3", text: "What long-term systemic risk for emerging markets does the regulatory panelist highlight?", options: ["Sudden hyperinflation in consumer commodities", "Backdoor dollarization eroding monetary policy transmission", "Collapse of domestic telecommunications networks", "Exorbitant card processing transaction fees"], correct: "Backdoor dollarization eroding monetary policy transmission", category: "factual" }
      ]
    }
  ],
  "Section 4": [
    {
      title: "Critique of Amyloid-Beta Targeted Monoclonal Antibodies",
      description: "Neurologists and trial statisticians dissect clinical efficacy and ARIA safety signals.",
      transcript: "[M1]Today we're conducting an evidence review of recent Phase III trial data for monoclonal antibodies targeting amyloid-beta plaques in early Alzheimer's disease. Dr. Chen, the reported twenty-seven percent slowing in CDR-SB decline after eighteen months has been heralded as a clinical breakthrough. Does the data justify that optimism? [F2]We must look critically at the absolute effect size rather than relative percentage metrics. On the eighteen-point Clinical Dementia Rating-Sum of Boxes scale, a twenty-seven percent relative slowing corresponds to an absolute difference of just zero point four five points. Published consensus panels in clinical neurology have established that the minimum clinically meaningful difference perceptible to patients and caregivers is between zero point nine and one point zero points. So while statistically significant at p less than zero point zero zero one, the clinical benefit remains borderline imperceptible over an eighteen-month horizon. [M3]Dr. Chen is omitting the biomarker correlation. Positron emission tomography demonstrated a seventy-eight percent reduction in cortical amyloid plaque burden, driving mean centiloid levels below the threshold of pathology. [F2]Biomarker clearance does not equal cognitive preservation, Dr. Rossi. More importantly, we cannot ignore safety signals. Amyloid-related imaging abnormalities with edema, or ARIA-E, occurred in twenty-one point five percent of the treatment cohort, compared to only zero point eight percent in the placebo arm. In homozygous APOE-epsilon-4 carriers, that incidence surged to thirty-six percent, accompanied by a two point eight percent risk of symptomatic intracerebral microhemorrhage.",
      questions: [
        { id: "ho1s4q1", text: "What absolute difference on the eighteen-point CDR-SB scale did the trial demonstrate?", options: ["0.20 points", "0.45 points", "0.95 points", "1.40 points"], correct: "0.45 points", category: "numbers" },
        { id: "ho1s4q2", text: "What is the consensus minimum clinically meaningful difference on the CDR-SB scale?", options: ["0.3 to 0.5 points", "0.6 to 0.8 points", "0.9 to 1.0 points", "1.2 to 1.5 points"], correct: "0.9 to 1.0 points", category: "numbers" },
        { id: "ho1s4q3", text: "What is Dr. Chen's primary critique regarding the clinical outcome?", options: ["The drug failed to bind to amyloid plaques in the brain", "The absolute cognitive improvement fell below the threshold of meaningful perception", "The Phase III trial recruited fewer than one hundred participants", "Placebo patients showed higher rates of cerebral edema"], correct: "The absolute cognitive improvement fell below the threshold of meaningful perception", category: "inference" }
      ]
    }
  ],
  "Section 5": [
    {
      title: "Debate on Geoengineering Stratospheric Aerosol Injection",
      description: "Atmospheric scientists evaluate solar radiation management and geopolitical termination shock.",
      transcript: "[F1]We are convening this interdisciplinary roundtable to address stratospheric aerosol injection as a potential intervention for acute solar radiation management. Dr. Holbrook, your atmospheric modeling group proposes delivering ten megatons of sulfur dioxide per year into the lower tropical stratosphere. What are the projected climatic consequences? [M5]Our simulations with the Community Earth System Model demonstrate that injecting ten megatons of sulfur dioxide annually at an altitude of twenty kilometres would generate a global radiative forcing of negative one point eight watts per square metre. This would effectively offset approximately one point two degrees Celsius of mean surface warming within thirty-six months. The estimated deployment cost is extraordinarily low—under four billion dollars annually using a specialized fleet of high-altitude aircraft. [F3]The direct thermal calculation is deceptively simple, but the regional ecological disruption is catastrophic. Dispersing sulfate aerosols alters the tropical Hadley circulation, weakening the South Asian and West African summer monsoons by fourteen to twenty-two percent. That directly jeopardizes agricultural yields for over two billion subsistence farmers. [M2]Furthermore, there is the existential dilemma of 'termination shock'. If emissions continue unchecked under the psychological moral hazard of a geoengineering shield, and a geopolitical crisis or supply disruption forces a sudden cessation of injections, global temperatures would rebound at a rate of zero point eight degrees Celsius per decade. That is five times faster than any ecological adaptation threshold in evolutionary history.",
      questions: [
        { id: "ho1s5q1", text: "What annual delivery volume of sulfur dioxide is proposed in the modeling group's scenario?", options: ["5 megatons", "10 megatons", "15 megatons", "25 megatons"], correct: "10 megatons", category: "numbers" },
        { id: "ho1s5q2", text: "According to the ecological critique, by how much could summer monsoons be weakened in South Asia and West Africa?", options: ["5 to 10%", "8 to 12%", "14 to 22%", "25 to 35%"], correct: "14 to 22%", category: "numbers" },
        { id: "ho1s5q3", text: "What is the primary danger associated with the phenomenon of 'termination shock'?", options: ["A sudden rapid rebound in global temperatures if aerosol injections cease", "Depletion of all commercial aviation fuel reserves", "Permanent freezing of the northern polar ice cap", "Total failure of satellite orbital communication arrays"], correct: "A sudden rapid rebound in global temperatures if aerosol injections cease", category: "inference" }
      ]
    }
  ],
  "Section 6": [
    {
      title: "Discourse on Algorithmic Bias in Criminal Justice Risk Assessments",
      description: "Legal scholars and data scientists debate predictive parity versus error-rate balance.",
      transcript: "[M2]Welcome to our legal colloquium on algorithmic decision-support systems in judicial sentencing and bail determinations. Professor Morales, COMPAS and similar recidivism risk-scoring instruments have faced sharp criticism regarding racial disparity. What is the mathematical root of this controversy? [F4]The heart of the dispute lies in the mathematical incompatibility of fairness criteria. In twenty-sixteen, a prominent investigative report highlighted that among defendants who did not recidivate over a two-year observation period, Black defendants were twice as likely to be misclassified as high risk compared to white defendants—forty-four point nine percent versus twenty-three point five percent. Conversely, among defendants who did recidivate, white defendants were flagged as low risk at nearly double the rate of Black defendants. [M3]Allow me to clarify the statistical defense presented by the algorithm developers. The tool satisfies predictive parity, meaning that for any given score—say, an assigned risk score of seven—the probability of re-arrest is identical across both racial groups, roughly sixty-one percent. Kleinberg and colleagues proved mathematically in twenty-sixteen that unless the base rate of arrests is identical across groups, an algorithm cannot simultaneously satisfy predictive parity and balance the false positive and false negative error rates across groups. [F4]That is precisely the point. The underlying training data relies on arrests rather than actual offenses committed. When systemic policing patterns yield disparate arrest base rates, optimizing for predictive parity mathematically guarantees an unequal distribution of false positive burdens on historically over-policed communities.",
      questions: [
        { id: "ho1s6q1", text: "What was the false positive rate for Black non-recidivating defendants in the referenced investigation?", options: ["23.5%", "34.2%", "44.9%", "58.1%"], correct: "44.9%", category: "numbers" },
        { id: "ho1s6q2", text: "What mathematical theorem regarding fairness criteria was established by Kleinberg and colleagues?", options: ["Algorithms can never achieve greater than fifty percent accuracy", "Predictive parity and equal error rates cannot be satisfied simultaneously when base rates differ", "Larger training datasets eliminate all algorithmic disparities", "Recidivism risk scores always drift toward the mean over time"], correct: "Predictive parity and equal error rates cannot be satisfied simultaneously when base rates differ", category: "factual" },
        { id: "ho1s6q3", text: "Why does Professor Morales argue that relying on arrest records distorts fairness?", options: ["Arrest rates reflect historical policing patterns rather than true offense frequencies", "Arrest data is too expensive for municipal court systems to purchase", "Court clerks frequently misplace printed arrest warrants", "State laws prohibit storing arrest histories for longer than six months"], correct: "Arrest rates reflect historical policing patterns rather than true offense frequencies", category: "inference" }
      ]
    }
  ],
  "Section 7": [
    {
      title: "Symposium on Nuclear Fission SMRs versus Renewable Grids",
      description: "Energy systems engineers debate Levelized Cost of Energy and baseload reliability.",
      transcript: "[M1]Our symposium today addresses the comparative techno-economics of Small Modular Nuclear Reactors, or SMRs, versus high-penetration renewable microgrids with long-duration storage. Dr. Lindbergh, nuclear advocates assert that SMRs solve the capital expenditure bottlenecks of traditional gigawatt-scale plants through factory modularization. What does the current cost curve indicate? [F2]The theoretical promise of SMRs was a Levelized Cost of Electricity below sixty dollars per megawatt-hour. However, recent commercial pilot projects demonstrate costs between one hundred and twenty and one hundred and eighty dollars per megawatt-hour. By contrast, unsubsidized utility-scale solar photovoltaic arrays and onshore wind currently produce electricity at thirty-two to forty-six dollars per megawatt-hour. Even after adding lithium-iron-phosphate battery storage for four-hour shifting at fifty-five dollars per megawatt-hour, the combined renewable system remains substantially cheaper. [M5]Dr. Lindbergh's calculation works only up to approximately seventy percent grid penetration. When you model an eighty-five to one hundred percent variable renewable grid during winter meteorological lulls—known in Europe as Dunkelflaute, where solar and wind drop below ten percent of rated capacity for up to two consecutive weeks—the cost of scaling synthetic hydrogen or flow batteries rises exponentially. Our power flow models show that maintaining five nines of grid reliability without firm, dispatchable baseload like nuclear requires overbuilding renewable generation capacity by three point four times peak demand. That requires colossal land footprints and rare-earth mineral extraction.",
      questions: [
        { id: "ho1s7q1", text: "What is the current estimated LCOE range for SMR commercial pilot projects?", options: ["$40 to $60 per MWh", "$70 to $95 per MWh", "$120 to $180 per MWh", "$210 to $260 per MWh"], correct: "$120 to $180 per MWh", category: "numbers" },
        { id: "ho1s7q2", text: "What term describes the prolonged two-week weather lull where wind and solar drop below ten percent capacity?", options: ["Solstice minimum", "Dunkelflaute", "Intermittent vortex", "Thermodynamic stall"], correct: "Dunkelflaute", category: "factual" },
        { id: "ho1s7q3", text: "According to Dr. Lindbergh's opponent, how much must renewable generation be overbuilt to ensure reliability without nuclear baseload?", options: ["1.5 times peak demand", "2.2 times peak demand", "3.4 times peak demand", "5.0 times peak demand"], correct: "3.4 times peak demand", category: "numbers" }
      ]
    }
  ],
  "Section 8": [
    {
      title: "Critique of Evolutionary Mismatch in Metabolic Syndrome",
      description: "Anthropologists and endocrinologists evaluate the 'thrifty gene' versus 'drifty gene' hypotheses.",
      transcript: "[F1]We welcome Dr. O'Connor and Professor Thorne to debate evolutionary paradigms for the global pandemic of metabolic syndrome and Type II diabetes. Dr. O'Connor, James Neel's nineteen-sixty-two 'thrifty gene' hypothesis posited that alleles predisposing to insulin resistance were positively selected to survive recurrent paleolithic famines. Why has that paradigm faced mounting skepticism? [M3]The mathematical predictions of the thrifty gene model simply fail empirical muster. If famine mortality exerted strong positive selection pressure for thrifty genotypes over hundreds of millennia, those alleles should have swept toward fixation in human populations. Today, however, obesity prevalence in affluent societies plateaus between thirty-five and forty-five percent rather than approaching one hundred percent. Furthermore, bioarchaeological studies of hunter-gatherer skeletons indicate that paleolithic mortality was predominantly driven by infectious pathogens and traumatic injury, not seasonal starvations severe enough to cause selective reproductive death. [F3]Our team proposes John Speakman's 'drifty gene' hypothesis as a superior model. When early hominids developed mastery of fire and weaponry roughly two million years ago, they eliminated the primary predatory selection pressure that previously penalized excess body mass. Without predation culling slower, heavier individuals, genetic mutations regulating upper adipose limits drifted neutrally through random genetic drift. When placed in an obesogenic food environment saturated with refined carbohydrates, this neutral distribution manifests as variable susceptibility, perfectly aligning with the forty-four percent heritability coefficient we observe in modern twin cohorts.",
      questions: [
        { id: "ho1s8q1", text: "In what year did James Neel initially propose the 'thrifty gene' hypothesis?", options: ["1952", "1962", "1974", "1988"], correct: "1962", category: "numbers" },
        { id: "ho1s8q2", text: "Why does Dr. O'Connor argue the thrifty gene hypothesis is mathematically flawed?", options: ["Insulin was discovered only in the twentieth century", "Thrifty alleles did not reach fixation and obesity plateaus well below 100%", "Famine never occurred anywhere in human history", "Twin studies demonstrate zero genetic heritability for diabetes"], correct: "Thrifty alleles did not reach fixation and obesity plateaus well below 100%", category: "inference" },
        { id: "ho1s8q3", text: "What evolutionary event does the 'drifty gene' model identify as removing the selective penalty against excess body mass?", options: ["The agricultural transition to wheat cultivation", "Mastery of fire and weapons eliminating major predatory pressure", "Migration out of the African continent", "The emergence of industrial manufacturing"], correct: "Mastery of fire and weapons eliminating major predatory pressure", category: "factual" }
      ]
    }
  ],
  "Section 9": [
    {
      title: "Deliberation on Universal Basic Income and Labor Market Dynamics",
      description: "Labor economists and welfare policy analysts scrutinize unconditional cash transfer pilots.",
      transcript: "[M2]Today we review findings from universal basic income trials conducted across Finland, Kenya, and North American municipalities. Dr. Selassie, critics have long warned that guaranteeing unconditional monthly cash transfers would induce widespread labor market disengagement. Did empirical evaluations substantiate that fear? [F2]The empirical results unequivocally refute the catastrophic withdrawal narrative. In the Finnish nationwide randomized controlled trial, recipients receiving five hundred and sixty euros monthly exhibited a modest one point two percent increase in days employed compared to the control group, primarily because the unconditional stipend eliminated the punitive marginal tax traps embedded in means-tested social assistance. In the GiveDirectly trials in rural Kenya, universal cash transfers stimulated micro-enterprise capitalization, boosting local business revenues by thirty-eight percent without any decrease in total hours worked. [M1]However, we must differentiate between localized, time-limited pilot demonstrations and permanent macroeconomic universal programs. When workers know a pilot will expire in twenty-four months, their intertemporal labor supply calculus remains anchored to their long-term career trajectory. If you fund a permanent nationwide basic income of twelve thousand dollars annually across all adults in an economy like the United States, it requires financing equal to twelve to fifteen percent of GDP. Static microeconomic simulations by the Congressional Budget Office indicate that marginal income tax rates would need to increase from thirty-seven percent to over fifty-four percent, triggering an aggregate labor supply contraction of four point five to six point eight percent among secondary household earners.",
      questions: [
        { id: "ho1s9q1", text: "What monthly cash benefit did participants receive in the Finnish universal basic income experiment?", options: ["350 euros", "450 euros", "560 euros", "700 euros"], correct: "560 euros", category: "numbers" },
        { id: "ho1s9q2", text: "What key difference between temporary pilots and permanent programs does the counter-speaker emphasize?", options: ["Pilots use physical currency while permanent programs use debit cards", "Workers adjust long-term behavior differently when they know an experiment has a fixed expiration", "Pilots only recruit retired seniors over age sixty-five", "Permanent programs are legally exempt from government oversight"], correct: "Workers adjust long-term behavior differently when they know an experiment has a fixed expiration", category: "inference" },
        { id: "ho1s9q3", text: "What percentage increase in local business revenues was observed in the Kenyan rural cash transfer study?", options: ["18%", "24%", "38%", "52%"], correct: "38%", category: "numbers" }
      ]
    }
  ],
  "Section 10": [
    {
      title: "Colloquium on Antitrust Law and Digital Platform Monopolies",
      description: "Competition lawyers and tech economists dispute the consumer welfare standard.",
      transcript: "[F4]Our colloquium today centers on the applicability of traditional antitrust doctrine to dominant zero-price digital platforms. Professor Sterling, the prevailing Robert Bork consumer welfare standard focuses almost exclusively on short-term output restrictions and consumer price increases. Why do modern neo-Brandeisian scholars argue this framework is obsolete? [M5]The consumer welfare framework was forged in an era of industrial manufacturing cartels. When digital platforms provide consumer services—such as internet search, social networking, and navigational mapping—at a monetary price of zero, the classical test concludes by definition that no antitrust harm has occurred. Yet this ignores non-monetary pricing: consumers pay through attention capture and invasive surveillance data extraction. Dominant platforms leverage multi-sided network effects and massive data flywheels to acquire emergent nascent competitors—what we term 'killer acquisitions'—long before those startups can mature into viable rivals. [F1]I must caution against abandoning the objective discipline of price and output metrics. If competition authorities discard quantifiable consumer welfare standards in favor of subjective goals like protecting small business competitors or regulating platform influence, antitrust enforcement degenerates into arbitrary political interference. Furthermore, dynamic competition in high-tech markets is characterized by Schumpeterian creative destruction: platforms do not extract monopoly rents with impunity because technological paradigm shifts—such as generative AI models disrupting search indexing—can obsolete dominant incumbents within twenty-four to thirty-six months.",
      questions: [
        { id: "ho1s10q1", text: "Why do critics argue the traditional consumer welfare standard fails when applied to modern digital platforms?", options: ["Digital platforms operate only within a single nation", "Platforms provide zero-monetary-price services while extracting attention and proprietary data", "Antitrust courts lack jurisdiction over internet service providers", "Consumers refuse to use digital platforms without government subsidies"], correct: "Platforms provide zero-monetary-price services while extracting attention and proprietary data", category: "inference" },
        { id: "ho1s10q2", text: "What term describes the strategic purchase of emergent startup competitors to prevent competitive maturation?", options: ["Horizontal mergers", "Killer acquisitions", "Predatory pricing", "Vertical foreclosure"], correct: "Killer acquisitions", category: "factual" },
        { id: "ho1s10q3", text: "What economic concept does the defending panelist cite to argue high-tech monopolies are inherently temporary?", options: ["Pareto optimality", "Schumpeterian creative destruction", "Keynesian liquidity traps", "Nash equilibrium"], correct: "Schumpeterian creative destruction", category: "factual" }
      ]
    }
  ],
  "Section 11": [
    {
      title: "Symposium on Deep Brain Stimulation and Neural Agency",
      description: "Bioethicists and functional neurosurgeons debate autonomy and personality alterations in closed-loop DBS.",
      transcript: "[M1]Welcome to this joint neurosurgical and philosophical symposium on closed-loop deep brain stimulation. Dr. Gutierrez, adaptive DBS implants now use real-time local field potential sensing in the subthalamic nucleus to adjust electrical stimulation pulses autonomously. While motor symptom relief in Parkinson's disease improves by up to sixty-four percent, neuropsychiatric assessments report postoperative mood destabilization and altered personality traits in up to fourteen percent of patients. How should clinicians delineate therapeutic efficacy from compromised personal autonomy? [F3]The neuroethical challenge is profound. In open-loop systems, voltage parameters are set manually by a neurologist during clinic visits. In closed-loop autonomous closed-circuit devices, machine learning classifiers dynamically modulate frequency and pulse width hundreds of times per minute. Patients have articulated experiences of alien control, stating that they cannot distinguish whether an impulsive spending spree or sudden hyper-religiosity originates from their authentic self or from the stimulator's algorithmic modulation. When an implanted device alters risk preference and emotional valence, standard definitions of informed consent and moral culpability break down. [M4]We must avoid over-pathologizing therapeutic neuro-modulation. Disease states themselves, such as advanced Parkinsonian akinesia or treatment-resistant major depressive disorder, profoundly impair human agency and executive control. Our longitudinal cohorts across two hundred and eighty patients indicate that when DBS restores motor fluency and executive initiation, ninety-two percent of patients report a restored sense of authentic selfhood rather than diminished autonomy.",
      questions: [
        { id: "ho1s11q1", text: "What percentage improvement in Parkinson's motor symptoms is reported with adaptive closed-loop DBS?", options: ["35%", "48%", "64%", "80%"], correct: "64%", category: "numbers" },
        { id: "ho1s11q2", text: "What ethical dilemma do patients express regarding closed-loop algorithmic stimulation?", options: ["Difficulty distinguishing authentic personal emotions and impulses from device-induced effects", "Inability to power the battery using inductive household chargers", "Refusal of insurance providers to replace electrode leads", "Excessive noise generated by the cranial pulse generator"], correct: "Difficulty distinguishing authentic personal emotions and impulses from device-induced effects", category: "inference" },
        { id: "ho1s11q3", text: "In the longitudinal cohort of 280 patients, what proportion reported a restored sense of authentic selfhood?", options: ["68%", "75%", "84%", "92%"], correct: "92%", category: "numbers" }
      ]
    }
  ],
  "Section 12": [
    {
      title: "Forum on Sovereign Debt Restructuring and Vulture Fund Litigation",
      description: "International trade lawyers and development economists examine collective action clauses and sovereign immunity.",
      transcript: "[F2]Our concluding session investigates legal architecture governing sovereign debt defaults in developing nations. Minister Kaboré, your country endured seven years of protracted litigation in external commercial courts after restructuring sovereign Eurobonds. What structural flaws in international financial architecture enable holdout creditors? [M3]The fundamental vulnerability is the absence of an international statutory bankruptcy framework for sovereign nations, equivalent to Chapter 9 or Chapter 11 municipal codes. When a sovereign debtor experiences debt distress and negotiates an orderly haircut—say, a forty percent principal reduction accepted by ninety percent of institutional bondholders—specialized distressed-asset hedge funds, often termed vulture funds, purchase defaulted paper on secondary markets for pennies on the dollar. They then invoke waiver-of-immunity clauses in foreign jurisdictions like New York or London, suing for one hundred percent face value plus compound penalty interest. In our case, a twenty-million-dollar secondary purchase was parlayed into a one-hundred-and-fifteen-million-dollar enforcement judgment, freezing our national central bank's foreign exchange assets. [F4]Recent contractual reforms have substantially closed these holdout loopholes. The widespread adoption of single-limb Collective Action Clauses, or CACs, mandated by the International Capital Market Association since twenty-fourteen, allows an aggregated vote across all bond series. If a supermajority of seventy-five percent of aggregate bondholders approves the restructuring plan, the terms are legally crammed down onto one hundred percent of creditors, neutralizing minority holdout litigation.",
      questions: [
        { id: "ho1s12q1", text: "What structural gap in international financial law enables holdout creditor litigation?", options: ["The absence of an international statutory bankruptcy framework for sovereigns", "The lack of digital banking systems in developing countries", "The prohibition of legal arbitration in commercial treaties", "The total exemption of commercial banks from paying capital gains tax"], correct: "The absence of an international statutory bankruptcy framework for sovereigns", category: "inference" },
        { id: "ho1s12q2", text: "In the case study cited by Minister Kaboré, what judgment amount resulted from a twenty-million-dollar distressed purchase?", options: ["$45 million", "$78 million", "$115 million", "$150 million"], correct: "$115 million", category: "numbers" },
        { id: "ho1s12q3", text: "What supermajority threshold is required under ICMA single-limb Collective Action Clauses to bind all creditors?", options: ["60%", "66.7%", "75%", "85%"], correct: "75%", category: "numbers" }
      ]
    }
  ]
};
