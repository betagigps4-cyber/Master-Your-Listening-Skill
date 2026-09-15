import { Scenario } from '../types';

export const scenariosPrimary: Record<string, Scenario[]> = {
  "Section 1": [
    {
      title: "Favorite Fruit",
      description: "A conversation about fruits.",
      transcript: "[F4]Favorite Fruit.[M3] I like mangoes very much, but my sister Rina loves eating bananas.",
      questions: [
        { id: "s1q1", text: "What fruit does Rina love?", options: ["Apple", "Mango", "Banana", "Orange"], correct: "Banana", category: "factual" }
      ]
    }
  ],
  "Section 2": [
    {
      title: "Profession",
      description: "People talking about jobs.",
      transcript: "[M5]Profession.[F5] My father is a doctor. He works in a hospital. My uncle works in a school, he is a teacher.",
      questions: [
        { id: "s2q1", text: "What is the profession of the uncle?", options: ["Farmer", "Teacher", "Doctor", "Driver"], correct: "Teacher", category: "factual" }
      ]
    }
  ],
  "Section 3": [
    {
      title: "Going to School",
      description: "How to travel to school.",
      transcript: "[M4]Going to School.[M5] Amin usually goes to school by bus. However, today his father is dropping him off in a car.",
      questions: [
        { id: "s3q1", text: "How does Amin usually go to school?", options: ["By bus", "By car", "By rickshaw", "On foot"], correct: "By bus", category: "factual" }
      ]
    }
  ],
  "Section 4": [
    {
      title: "Age",
      description: "Talking about age.",
      transcript: "[F4]Age.[M3] Today is Kamal's birthday. He is turning ten years old today. His cousin Sumon is twelve.",
      questions: [
        { id: "s4q1", text: "How old is Kamal?", options: ["Eight", "Nine", "Eleven", "Ten"], correct: "Ten", category: "numbers" }
      ]
    }
  ],
  "Section 5": [
    {
      title: "Favorite Color",
      description: "Choosing a dress color.",
      transcript: "[F5]Favorite Color.[F4] Look at these dresses. The red one is beautiful, but I will buy the blue dress because it is my favorite color.",
      questions: [
        { id: "s5q1", text: "Which dress will she buy?", options: ["Green", "Red", "Blue", "Yellow"], correct: "Blue", category: "factual" }
      ]
    }
  ],
  "Section 6": [
    {
      title: "Wake up time",
      description: "Morning routine.",
      transcript: "[M5]Wake up time.[M4] I always wake up early. I get out of bed at 6 AM, but my brother sleeps until 8 AM.",
      questions: [
        { id: "s6q1", text: "When does the brother sleep until?", options: ["6 AM", "7 AM", "9 AM", "8 AM"], correct: "8 AM", category: "numbers" }
      ]
    }
  ],
  "Section 7": [
    {
      title: "Pets",
      description: "Talking about domestic animals.",
      transcript: "[F4]Pets.[M5] We have a few pets at home. We have a dog named Tommy and a white cat named Snow.",
      questions: [
        { id: "s7q1", text: "What is the name of the cat?", options: ["Snow", "Tommy", "Kitty", "Tiger"], correct: "Snow", category: "factual" }
      ]
    }
  ],
  "Section 8": [
    {
      title: "Sports",
      description: "Playing games in the afternoon.",
      transcript: "[M4]Sports.[M3] In the afternoon, we play in the field. Rahim likes playing football, but I prefer playing cricket.",
      questions: [
        { id: "s8q1", text: "What does Rahim like playing?", options: ["Tennis", "Football", "Cricket", "Badminton"], correct: "Football", category: "factual" }
      ]
    }
  ],
  "Section 9": [
    {
      title: "Weather",
      description: "A rainy day.",
      transcript: "[F5]Weather.[M4] We cannot go out to play today. It is raining heavily outside. We will stay inside and read books.",
      questions: [
        { id: "s9q1", text: "Why can't they go out to play?", options: ["It is too hot", "It is dark", "It is raining heavily", "They are sick"], correct: "It is raining heavily", category: "factual" }
      ]
    }
  ],
  "Section 10": [
    {
      title: "Buying Books",
      description: "Purchasing items from a shop.",
      transcript: "[M5]Buying Books.[F4] Good morning. I need two storybooks and three pens. How much are they?",
      questions: [
        { id: "s10q1", text: "How many pens does she need?", options: ["One", "Two", "Four", "Three"], correct: "Three", category: "numbers" }
      ]
    }
  ],
  "Section 11": [
    {
      title: "Breakfast Time",
      description: "Eating in the morning.",
      transcript: "[M3]Breakfast Time.[F4] For breakfast, I usually eat bread and eggs. But today, my mother made pancakes.",
      questions: [
        { id: "s11q1", text: "What did her mother make today?", options: ["Bread", "Eggs", "Pancakes", "Rice"], correct: "Pancakes", category: "factual" }
      ]
    }
  ],
  "Section 12": [
    {
      title: "Leisure Activities",
      description: "What people do in their free time.",
      transcript: "[F5]Leisure Activities.[M4] My sister enjoys painting landscapes, but I love reading science fiction books in my free time.",
      questions: [
        { id: "s12q1", text: "What does the sister enjoy doing?", options: ["Reading books", "Painting landscapes", "Playing sports", "Singing"], correct: "Painting landscapes", category: "factual" }
      ]
    }
  ],
  "Section 13": [
    {
      title: "Holiday Trip",
      description: "Going on vacation.",
      transcript: "[M5]Holiday Trip.[F5] Last summer, we went to Sylhet to see the tea gardens. Next year, we plan to visit Cox's Bazar.",
      questions: [
        { id: "s13q1", text: "Where did they go last summer?", options: ["Sylhet", "Cox's Bazar", "Dhaka", "Rajshahi"], correct: "Sylhet", category: "factual" }
      ]
    }
  ],
  "Section 14": [
    {
      title: "Grandparents",
      description: "Visiting relatives.",
      transcript: "[F4]Grandparents.[M3] We visit our grandparents every Friday. My grandmother bakes cookies, and my grandfather tells us stories.",
      questions: [
        { id: "s14q1", text: "What does the grandfather do?", options: ["Bakes cookies", "Watches TV", "Tells stories", "Reads newspapers"], correct: "Tells stories", category: "factual" }
      ]
    }
  ],
  "Section 15": [
    {
      title: "Buying Groceries",
      description: "Getting food from the market.",
      transcript: "[M4]Buying Groceries.[M5] Please buy a liter of milk, a dozen eggs, and some fresh vegetables from the market.",
      questions: [
        { id: "s15q1", text: "How many eggs should be bought?", options: ["Ten", "A half dozen", "Two dozen", "A dozen"], correct: "A dozen", category: "numbers" }
      ]
    }
  ],
  "Section 16": [
    {
      title: "First Period",
      description: "The start of the school day.",
      transcript: "[F5]First Period.[M4] Our first class starts at 9 AM. Today, we have Mathematics first, followed by English.",
      questions: [
        { id: "s16q1", text: "What subject is the first class today?", options: ["English", "Science", "History", "Mathematics"], correct: "Mathematics", category: "factual" }
      ]
    }
  ],
  "Section 17": [
    {
      title: "Planting Trees",
      description: "Gardening in the yard.",
      transcript: "[M5]Planting Trees.[F4] Yesterday, we planted a mango tree and a guava tree in our garden. I water them every afternoon.",
      questions: [
        { id: "s17q1", text: "When does she water the trees?", options: ["In the morning", "In the afternoon", "At night", "At noon"], correct: "In the afternoon", category: "factual" }
      ]
    }
  ],
  "Section 18": [
    {
      title: "Finding the Library",
      description: "Asking for the way.",
      transcript: "[F4]Finding the Library.[M5] Excuse me, where is the public library? Go straight, then take the first left. It is next to the post office.",
      questions: [
        { id: "s18q1", text: "What is the library next to?", options: ["The post office", "The school", "The hospital", "The bank"], correct: "The post office", category: "factual" }
      ]
    }
  ],
  "Section 19": [
    {
      title: "Feeling Sick",
      description: "A visit to the clinic.",
      transcript: "[M3]Feeling Sick.[F5] Hasan didn't come to school today. He has a fever and a bad cough, so his mother took him to the doctor.",
      questions: [
        { id: "s19q1", text: "Why did Hasan not come to school?", options: ["He is on vacation", "He missed the bus", "He has a fever", "He is visiting family"], correct: "He has a fever", category: "inference" }
      ]
    }
  ],
  "Section 20": [
    {
      title: "The Zoo",
      description: "Seeing wild animals.",
      transcript: "[F5]The Zoo.[M4] When we visited the zoo, we saw lions, tigers, and bears. My favorite animal was the tall giraffe eating leaves.",
      questions: [
        { id: "s20q1", text: "What was his favorite animal?", options: ["The giraffe", "The lion", "The tiger", "The bear"], correct: "The giraffe", category: "factual" }
      ]
    }
  ],
  "Section 21": [
    {
      title: "Museum Visit",
      description: "Looking at historical artifacts.",
      transcript: "[M4]Museum Visit.[F4] We saw dinosaur bones on the first floor. But the ancient coins on the second floor were the most interesting to me.",
      questions: [
        { id: "s21q1", text: "What was on the second floor?", options: ["Dinosaur bones", "Ancient coins", "Old paintings", "Statues"], correct: "Ancient coins", category: "factual" }
      ]
    }
  ],
  "Section 22": [
    {
      title: "Cooking Dinner",
      description: "Preparing a meal in the evening.",
      transcript: "[F5]Cooking Dinner.[M3] Tonight, my dad is making his special chicken curry. I am helping by chopping the onions and tomatoes.",
      questions: [
        { id: "s22q1", text: "What is the dad making?", options: ["Beef roast", "Fish fry", "Chicken curry", "Vegetable soup"], correct: "Chicken curry", category: "factual" }
      ]
    }
  ],
  "Section 23": [
    {
      title: "Learning Guitar",
      description: "Taking a music class.",
      transcript: "[M5]Learning Guitar.[F5] I have my music class every Tuesday evening. I am learning to play the guitar, and my sister is learning the piano.",
      questions: [
        { id: "s23q1", text: "When is the music class?", options: ["Monday morning", "Tuesday evening", "Friday afternoon", "Sunday morning"], correct: "Tuesday evening", category: "numbers" }
      ]
    }
  ],
  "Section 24": [
    {
      title: "Train Journey",
      description: "Traveling to another city.",
      transcript: "[F4]Train Journey.[M4] Our train leaves at 10 AM. We need to reach the station by 9:30 AM to find our seats in the compartment.",
      questions: [
        { id: "s24q1", text: "What time does the train leave?", options: ["9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM"], correct: "10:00 AM", category: "numbers" }
      ]
    }
  ],
  "Section 25": [
    {
      title: "House Chores",
      description: "Cleaning the living room.",
      transcript: "[M3]House Chores.[F4] Every weekend, we clean the house together. My brother sweeps the floor, while I dust the furniture.",
      questions: [
        { id: "s25q1", text: "Who sweeps the floor?", options: ["The father", "The mother", "The brother", "The sister"], correct: "The brother", category: "factual" }
      ]
    }
  ],
  "Section 26": [
    {
      title: "New Hobby",
      description: "Taking photos in the park.",
      transcript: "[F5]New Hobby.[M5] I recently bought a new camera. I love taking pictures of birds, but capturing insects is quite difficult.",
      questions: [
        { id: "s26q1", text: "What does he love taking pictures of?", options: ["People", "Buildings", "Insects", "Birds"], correct: "Birds", category: "factual" }
      ]
    }
  ],
  "Section 27": [
    {
      title: "Shopping for Shoes",
      description: "Buying footwear for winter.",
      transcript: "[M4]Shopping for Shoes.[F5] I need a pair of warm boots for the winter. The black ones are nice, but I think the brown ones fit better.",
      questions: [
        { id: "s27q1", text: "Which boots does she think fit better?", options: ["The black ones", "The red ones", "The brown ones", "The white ones"], correct: "The brown ones", category: "factual" }
      ]
    }
  ],
  "Section 28": [
    {
      title: "Hospital Visit",
      description: "Seeing a sick friend.",
      transcript: "[F4]Hospital Visit.[M3] My friend Tariq broke his arm playing basketball. We are going to the hospital this evening to bring him some fruits.",
      questions: [
        { id: "s28q1", text: "How did Tariq break his arm?", options: ["Playing football", "Riding a bike", "Playing basketball", "Falling from a tree"], correct: "Playing basketball", category: "factual" }
      ]
    }
  ],
  "Section 29": [
    {
      title: "Exam Preparation",
      description: "Studying for final tests.",
      transcript: "[M5]Exam Preparation.[F4] The final exams start next week. I have finished studying science, but I still need to revise my history notes.",
      questions: [
        { id: "s29q1", text: "Which subject does she still need to revise?", options: ["Science", "History", "Mathematics", "English"], correct: "History", category: "factual" }
      ]
    }
  ],
  "Section 30": [
    {
      title: "Picnic Day",
      description: "Having lunch outdoors.",
      transcript: "[F5]Picnic Day.[M4] We spread a large mat under a big oak tree. We ate sandwiches and drank fresh orange juice while enjoying the breeze.",
      questions: [
        { id: "s30q1", text: "What kind of juice did they drink?", options: ["Apple juice", "Mango juice", "Orange juice", "Grape juice"], correct: "Orange juice", category: "factual" }
      ]
    }
  ],
  "Section 31": [
    {
      title: "Name",
      description: "A person name.",
      transcript: "[M5]A Person Name.[M4] Hasan and Jamil are two friends. Jamil is an engineer and his friend Hasan is a businessman.",
      questions: [
        { id: "s31q1", text: "Who is a businessman?", options: ["Zakir", "Jamil", "Hasan", "Jahid"], correct: "Hasan", category: "factual" }
      ]
    }
  ],
  "Section 32": [
    {
      title: "Mobile Number",
      description: "A Person’s mobile number.",
      transcript: "[M5]A Person’s mobile number.[M3]Hello. I am Rifat Hossain. My mobile number is 01728295215. My father’s mobile number is 01727876543",
      questions: [
        { id: "s32q1", text: "What is Rifat’s father’s mobile number?", options: ["01728215215", "01727876543", "01728295215", "01718295215"], correct: "01727876543", category: "numbers" }
      ]
    }
  ],
  "Section 33": [
    {
      title: "City Name",
      description: "A person City Name.",
      transcript: "[M5]A Person City Name.[F5]Hello, I am Rakib. At present I live in London. My younger brother Habib lives in New Delhi",
      questions: [
        { id: "s33q1", text: "Where does Habib live?", options: ["Riad", "London", "Cape Town", "New Delhi"], correct: "New Delhi", category: "factual" }
      ]
    }
  ],
  "Section 34": [
    {
      title: "At the Zoo",
      description: "A boy named Imran talks about his visit to the zoo.",
      transcript: "[M5]Imran shares his zoo trip.[F5]Last Sunday I went to the zoo. I saw lions, tigers, and elephants. My favourite animal was the giraffe.",
      questions: [
        { id: "s34q1", text: "Where did Imran go?", options: ["Park", "Zoo", "Museum", "Library"], correct: "Zoo", category: "factual" },
        { id: "s34q2", text: "Which animal was Imran's favourite?", options: ["Lion", "Tiger", "Elephant", "Giraffe"], correct: "Giraffe", category: "factual" }
      ]
    }
  ],
  "Section 35": [
    {
      title: "Helping Mother",
      description: "A girl named Rupa talks about helping her mother.",
      transcript: "[M5]Rupa describes her chores.[F5]I help my mother in the kitchen. I wash vegetables and set the table. My mother cooks delicious food.",
      questions: [
        { id: "s35q1", text: "Where does Rupa help her mother?", options: ["Garden", "Kitchen", "School", "Shop"], correct: "Kitchen", category: "factual" },
        { id: "s35q2", text: "What does Rupa's mother do?", options: ["Teaches", "Cooks food", "Reads books", "Sews clothes"], correct: "Cooks food", category: "factual" }
      ]
    }
  ],
  "Section 36": [
    {
      title: "Playing Cricket",
      description: "A boy named Arif talks about playing cricket.",
      transcript: "[M5]Arif shares his hobby.[F5]I love playing cricket. I am a batsman. I play with my friends in the playground every evening.",
      questions: [
        { id: "s36q1", text: "What is Arif's role in cricket?", options: ["Bowler", "Batsman", "Wicketkeeper", "Coach"], correct: "Batsman", category: "factual" },
        { id: "s36q2", text: "When does Arif play cricket?", options: ["Morning", "Afternoon", "Evening", "Night"], correct: "Evening", category: "factual" }
      ]
    }
  ],
  "Section 37": [
    {
      title: "Visiting Grandparents",
      description: "A girl named Salma talks about visiting her grandparents.",
      transcript: "[M5]Salma describes her visit.[F5]I visited my grandparents last month. They live in a village. My grandmother told me stories and my grandfather took me fishing.",
      questions: [
        { id: "s37q1", text: "Where do Salma's grandparents live?", options: ["City", "Village", "Town", "Capital"], correct: "Village", category: "factual" },
        { id: "s37q2", text: "What did Salma's grandfather do?", options: ["Took her fishing", "Cooked food", "Read books", "Played cricket"], correct: "Took her fishing", category: "factual" }
      ]
    }
  ],
  "Section 38": [
    {
      title: "Library Visit",
      description: "A boy named Jamil talks about visiting the library.",
      transcript: "[M5]Jamil shares his experience.[F5]I went to the library yesterday. I borrowed two story books. The library was quiet and full of books.",
      questions: [
        { id: "s38q1", text: "What did Jamil borrow from the library?", options: ["Textbooks", "Story books", "Magazines", "Newspapers"], correct: "Story books", category: "factual" },
        { id: "s38q2", text: "How was the library?", options: ["Noisy", "Quiet", "Crowded", "Empty"], correct: "Quiet", category: "factual" }
      ]
    }
  ],
  "Section 39": [
    {
      title: "Morning Walk",
      description: "A girl named Farida talks about her morning walk.",
      transcript: "[M5]Farida describes her routine.[F5]I go for a walk every morning. I see birds and flowers. Walking makes me healthy and happy.",
      questions: [
        { id: "s39q1", text: "When does Farida go for a walk?", options: ["Morning", "Afternoon", "Evening", "Night"], correct: "Morning", category: "factual" },
        { id: "s39q2", text: "What does walking make Farida feel?", options: ["Sad", "Tired", "Healthy and happy", "Hungry"], correct: "Healthy and happy", category: "inference" }
      ]
    }
  ],
  "Section 40": [
    {
      title: "Cooking Rice",
      description: "A boy named Shanto talks about cooking rice.",
      transcript: "[M5]Shanto explains cooking.[F5]I learned to cook rice from my mother. First, I wash the rice. Then I boil it in water. After some time, the rice is ready to eat.",
      questions: [
        { id: "s40q1", text: "Who taught Shanto to cook rice?", options: ["His father", "His mother", "His sister", "His teacher"], correct: "His mother", category: "factual" },
        { id: "s40q2", text: "What is the first step in cooking rice?", options: ["Boil water", "Wash the rice", "Serve rice", "Add salt"], correct: "Wash the rice", category: "factual" }
      ]
    }
  ],
  "Section 41": [
    {
      title: "Festival Celebration",
      description: "A girl named Anika talks about celebrating a festival.",
      transcript: "[M5]Anika shares her joy.[F5]We celebrated Eid at our home. We wore new clothes and ate delicious food. I visited my relatives and received gifts.",
      questions: [
        { id: "s41q1", text: "Which festival did Anika celebrate?", options: ["Eid", "Pohela Boishakh", "Christmas", "Durga Puja"], correct: "Eid", category: "factual" },
        { id: "s41q2", text: "What did Anika receive from relatives?", options: ["Books", "Gifts", "Flowers", "Money"], correct: "Gifts", category: "factual" }
      ]
    }
  ],
  "Section 42": [
    {
      title: "Planting Trees",
      description: "A boy named Babul talks about planting trees.",
      transcript: "[M5]Babul explains his activity.[F5]I planted a mango tree in front of my house. I water it every day. I hope it will grow big and give us fruits.",
      questions: [
        { id: "s42q1", text: "What kind of tree did Babul plant?", options: ["Banana", "Mango", "Guava", "Jackfruit"], correct: "Mango", category: "factual" },
        { id: "s42q2", text: "What does Babul do every day for the tree?", options: ["Fertilize", "Water it", "Cut it", "Climb it"], correct: "Water it", category: "factual" }
      ]
    }
  ],
  "Section 43": [
    {
      title: "Watching Television",
      description: "A girl named Rina talks about watching television.",
      transcript: "[M5]Rina shares her pastime.[F5]I watch television in the evening. My favourite program is cartoons. Sometimes I watch news with my father.",
      questions: [
        { id: "s43q1", text: "When does Rina watch television?", options: ["Morning", "Afternoon", "Evening", "Night"], correct: "Evening", category: "factual" },
        { id: "s43q2", text: "What is Rina's favourite program?", options: ["Cartoons", "News", "Sports", "Drama"], correct: "Cartoons", category: "factual" }
      ]
    }
  ],
  "Section 44": [
    {
      title: "Lost Umbrella",
      description: "Searching for a missing umbrella in the school corridor.",
      transcript: "[M5]Lost Umbrella.[F4] Excuse me, have you seen a long umbrella in the corridor? [M3] Yes, I found a dark green umbrella near the staircase and left it with the security guard.",
      questions: [
        { id: "s44q1", text: "What color is the lost umbrella?", options: ["Black", "Dark green", "Blue", "Yellow"], correct: "Dark green", category: "factual" },
        { id: "s44q2", text: "Where did the boy leave the umbrella?", options: ["In the classroom", "Under a desk", "With the security guard", "In the canteen"], correct: "With the security guard", category: "factual" }
      ]
    }
  ],
  "Section 45": [
    {
      title: "Borrowing a Bicycle",
      description: "Asking a friend to borrow a bike for an urgent errand.",
      transcript: "[F5]Borrowing a Bicycle.[M4] Hi Tarek, may I borrow your bicycle for one hour? I need to pick up medicine for my grandfather from the pharmacy. [M2] Of course, Nabil! The keys to the lock are on the front porch.",
      questions: [
        { id: "s45q1", text: "Why does Nabil need to borrow the bicycle?", options: ["To ride in the park", "To buy medicine for his grandfather", "To go to school", "To visit his cousin"], correct: "To buy medicine for his grandfather", category: "factual" },
        { id: "s45q2", text: "Where are the keys to the bicycle lock?", options: ["Inside the kitchen", "In Tarek's pocket", "On the front porch", "Under the mat"], correct: "On the front porch", category: "factual" }
      ]
    }
  ],
  "Section 46": [
    {
      title: "Weekend Camping",
      description: "Packing essential gear for a weekend scout trip.",
      transcript: "[M5]Weekend Camping.[F3] Are we ready for the scout camp this weekend? [M4] Almost! We have the two-person tent and warm blankets, but we still need to pack a flashlight and clean drinking water.",
      questions: [
        { id: "s46q1", text: "What kind of tent do they have?", options: ["One-person tent", "Two-person tent", "Four-person tent", "Family tent"], correct: "Two-person tent", category: "factual" },
        { id: "s46q2", text: "What do they still need to pack?", options: ["Cooking stove and plates", "A flashlight and clean drinking water", "Warm coats and boots", "Compass and map"], correct: "A flashlight and clean drinking water", category: "factual" }
      ]
    }
  ],
  "Section 47": [
    {
      title: "Ice Cream Flavors",
      description: "Ordering cold sweet treats at a beach kiosk.",
      transcript: "[F4]Ice Cream Flavors.[M3] Welcome to the beach kiosk! We have chocolate, vanilla, and strawberry ice cream today. [F2] I would like one scoop of vanilla and one scoop of strawberry in a waffle cone, please.",
      questions: [
        { id: "s47q1", text: "Which two flavors does the customer order?", options: ["Chocolate and vanilla", "Vanilla and strawberry", "Chocolate and mango", "Strawberry and chocolate"], correct: "Vanilla and strawberry", category: "factual" },
        { id: "s47q2", text: "How does she want her ice cream served?", options: ["In a paper cup", "In a waffle cone", "In a glass bowl", "With soda"], correct: "In a waffle cone", category: "factual" }
      ]
    }
  ],
  "Section 48": [
    {
      title: "Art and Painting Class",
      description: "Students painting scenic landscapes in art class.",
      transcript: "[M5]Art and Painting Class.[F5] Today our art teacher asked everyone to draw their favorite scenery. Arif drew green hills with a flowing river, while I painted a colorful sunset behind coconut trees.",
      questions: [
        { id: "s48q1", text: "What did Arif draw?", options: ["A busy street", "Green hills with a flowing river", "A sailing boat", "A big red flower"], correct: "Green hills with a flowing river", category: "factual" },
        { id: "s48q2", text: "What did the speaker paint?", options: ["A colorful sunset behind coconut trees", "A family portrait", "A flock of birds", "A rainy village"], correct: "A colorful sunset behind coconut trees", category: "factual" }
      ]
    }
  ],
  "Section 49": [
    {
      title: "Feeding the Birds",
      description: "Grandmother scattering grains for birds in the morning.",
      transcript: "[M4]Feeding the Birds.[M3] Every morning at eight o'clock, my grandmother sprinkles grains of wheat on the terrace. Dozens of small pigeons fly down to eat peacefully.",
      questions: [
        { id: "s49q1", text: "What time does grandmother feed the birds?", options: ["Six o'clock", "Seven o'clock", "Eight o'clock", "Nine o'clock"], correct: "Eight o'clock", category: "numbers" },
        { id: "s49q2", text: "What does grandmother sprinkle on the terrace?", options: ["Bread crumbs", "Grains of wheat", "Rice flakes", "Sunflower seeds"], correct: "Grains of wheat", category: "factual" }
      ]
    }
  ],
  "Section 50": [
    {
      title: "Science Fair Project",
      description: "Demonstrating a volcano experiment at the school science fair.",
      transcript: "[F5]Science Fair Project.[F3] Our team made a baking soda volcano for the science exhibition. When the judges visited our table, red foam erupted safely, and we won the second prize!",
      questions: [
        { id: "s50q1", text: "What model did the team build for the science exhibition?", options: ["A solar system", "A water purifier", "A baking soda volcano", "A wind turbine"], correct: "A baking soda volcano", category: "factual" },
        { id: "s50q2", text: "Which prize did the team win?", options: ["First prize", "Second prize", "Third prize", "Honorary medal"], correct: "Second prize", category: "factual" }
      ]
    }
  ],
  "Section 51": [
    {
      title: "Birthday Surprise",
      description: "Siblings preparing a birthday gift and treats for their mother.",
      transcript: "[M5]Birthday Surprise.[M2] Tomorrow is Mother's birthday! My sister made a handmade greeting card, and I bought a box of fresh chocolate pastries from the bakery.",
      questions: [
        { id: "s51q1", text: "What did the sister make for their mother?", options: ["A knitted scarf", "A handmade greeting card", "A photo album", "A beaded necklace"], correct: "A handmade greeting card", category: "factual" },
        { id: "s51q2", text: "What did the speaker buy from the bakery?", options: ["A strawberry cake", "A box of fresh chocolate pastries", "Fruit cookies", "Apple pie"], correct: "A box of fresh chocolate pastries", category: "factual" }
      ]
    }
  ],
  "Section 52": [
    {
      title: "Post Office Letter",
      description: "Sending an international birthday card by airmail.",
      transcript: "[F4]Post Office Letter.[M4] Good morning officer, I would like to post this birthday card to my pen pal in Canada. [M5] Certainly! That will be fifty taka for the airmail stamp, and it will take seven days to arrive.",
      questions: [
        { id: "s52q1", text: "Where is the boy sending the birthday card?", options: ["Australia", "Canada", "United Kingdom", "Japan"], correct: "Canada", category: "factual" },
        { id: "s52q2", text: "How many days will the card take to arrive?", options: ["Three days", "Five days", "Seven days", "Ten days"], correct: "Seven days", category: "numbers" }
      ]
    }
  ],
  "Section 53": [
    {
      title: "Community Clean-up",
      description: "Students volunteering to clean up the local playground.",
      transcript: "[M5]Community Clean-up.[F5] On Saturday morning, twenty students gathered at the neighborhood playground. We wore gloves, collected discarded plastic wrappers into big blue bags, and planted twelve flowering bushes along the fence.",
      questions: [
        { id: "s53q1", text: "How many students participated in the playground clean-up?", options: ["Ten", "Fifteen", "Twenty", "Twenty-five"], correct: "Twenty", category: "numbers" },
        { id: "s53q2", text: "How many flowering bushes did they plant along the fence?", options: ["Six", "Eight", "Ten", "Twelve"], correct: "Twelve", category: "numbers" }
      ]
    }
  ]
};
