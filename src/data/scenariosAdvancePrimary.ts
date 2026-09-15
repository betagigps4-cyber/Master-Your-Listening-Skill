import { Scenario } from '../types';

export const scenariosAdvancePrimary: Record<string, Scenario[]> = {
  "Section 1": [
    {
      title: "Personal Introduction",
      description: "A young girl named Mina introduces herself.",
      transcript: "[M5]A young girl named Mina introduces herself.[F5]Hello. My name is Mina. I am a girl. I am seven years old. I live in Dhaka. I am a student.",
      questions: [
        { id: "ap1q1", text: "What is the girl's name?", options: ["Rina", "Mina", "Tina", "Sima"], correct: "Mina", category: "factual" },
        { id: "ap1q2", text: "How old is she?", options: ["Six", "Eight", "Nine", "Seven"], correct: "Seven", category: "numbers" }
      ]
    }
  ],
  "Section 2": [
    {
      title: "My Family",
      description: "Rahim talks about his family members.",
      transcript: "[M5]A boy named Rahim describes his family.[F5]My name is Rahim. I have a small family. My father is a teacher. My mother is a housewife. I have one elder sister. We live in a house in Khulna.",
      questions: [
        { id: "ap2q1", text: "What is Rahim's father's profession?", options: ["Doctor", "Teacher", "Farmer", "Engineer"], correct: "Teacher", category: "factual" },
        { id: "ap2q2", text: "Where does Rahim live?", options: ["Dhaka", "Chittagong", "Khulna", "Sylhet"], correct: "Khulna", category: "factual" }
      ]
    }
  ],
  "Section 3": [
    {
      title: "My School",
      description: "A student describes her school and class routine.",
      transcript: "[M5]A girl named Sara talks about her school.[F5]I study in class seven at Government High School. Our school starts at 8 o'clock. We have six periods every day. My favourite subject is English. There is a big playground in our school.",
      questions: [
        { id: "ap3q1", text: "In which class does Sara study?", options: ["Six", "Seven", "Eight", "Nine"], correct: "Seven", category: "numbers" },
        { id: "ap3q2", text: "What is Sara's favourite subject?", options: ["Math", "Science", "English", "Bangla"], correct: "English", category: "factual" }
      ]
    }
  ],
  "Section 4": [
    {
      title: "Daily Routine",
      description: "A boy shares his daily activities.",
      transcript: "[M5]A boy named Karim describes his daily routine.[F5]I wake up at 6 o'clock in the morning. I say my prayers and then study. I go to school at 7:30. After school I play cricket with my friends. I go to bed at 10 o'clock.",
      questions: [
        { id: "ap4q1", text: "At what time does Karim wake up?", options: ["5 o'clock", "6 o'clock", "7 o'clock", "8 o'clock"], correct: "6 o'clock", category: "numbers" },
        { id: "ap4q2", text: "What does Karim play after school?", options: ["Football", "Badminton", "Cricket", "Hockey"], correct: "Cricket", category: "factual" }
      ]
    }
  ],
  "Section 5": [
    {
      title: "Favourite Food",
      description: "A girl talks about her favourite foods.",
      transcript: "[M5]A girl named Priya speaks about food.[F5]I like rice and fish very much. My mother cooks ilish fish on special days. I also enjoy mangoes in summer. I do not like bitter gourd. My favourite dessert is firni.",
      questions: [
        { id: "ap5q1", text: "What is Priya's favourite fish?", options: ["Rui", "Ilish", "Pangas", "Shrimp"], correct: "Ilish", category: "factual" },
        { id: "ap5q2", text: "Which fruit does Priya enjoy in summer?", options: ["Apple", "Banana", "Mango", "Orange"], correct: "Mango", category: "factual" }
      ]
    }
  ],
  "Section 6": [
    {
      title: "Village Visit",
      description: "A student describes a visit to his village.",
      transcript: "[M5]A boy named Sohel talks about his village.[F5]Last month I went to my village in Barisal. I saw many paddy fields. We crossed the river by boat. My grandmother cooked fresh vegetables. Village life is very peaceful.",
      questions: [
        { id: "ap6q1", text: "Where is Sohel's village?", options: ["Khulna", "Barisal", "Rajshahi", "Rangpur"], correct: "Barisal", category: "factual" },
        { id: "ap6q2", text: "How did they cross the river?", options: ["By bridge", "By boat", "By bus", "By train"], correct: "By boat", category: "factual" }
      ]
    }
  ],
  "Section 7": [
    {
      title: "Pohela Boishakh",
      description: "A student explains the Bengali New Year festival.",
      transcript: "[M5]A girl named Nadia talks about a festival.[F5]Pohela Boishakh is our Bengali New Year. We wear new clothes. People go to Ramna Park in Dhaka. There are cultural programmes and fairs. We eat panta ilish on this day.",
      questions: [
        { id: "ap7q1", text: "What is Pohela Boishakh?", options: ["Religious festival", "Bengali New Year", "Independence Day", "Victory Day"], correct: "Bengali New Year", category: "factual" },
        { id: "ap7q2", text: "What special food is eaten on this day?", options: ["Biriyani", "Panta Ilish", "Korma", "Haleem"], correct: "Panta Ilish", category: "factual" }
      ]
    }
  ],
  "Section 8": [
    {
      title: "Protecting the Environment",
      description: "A student speaks about saving the environment.",
      transcript: "[M5]A boy named Amit discusses the environment.[F5]We should plant more trees. We must not throw plastic in rivers. Saving water is important. In Bangladesh we need to protect our rivers like the Padma and Jamuna.",
      questions: [
        { id: "ap8q1", text: "What should we plant more of?", options: ["Flowers", "Trees", "Vegetables", "Grass"], correct: "Trees", category: "factual" },
        { id: "ap8q2", text: "Which rivers are mentioned?", options: ["Ganges and Brahmaputra", "Padma and Jamuna", "Meghna and Karnaphuli", "Teesta and Surma"], correct: "Padma and Jamuna", category: "factual" }
      ]
    }
  ],
  "Section 9": [
    {
      title: "My Hobby",
      description: "A student talks about her hobby.",
      transcript: "[M5]A girl named Lamia shares her hobby.[F5]My hobby is reading story books. I like books about adventure and Bangladeshi freedom fighters. I read every evening after homework. I want to be a writer one day.",
      questions: [
        { id: "ap9q1", text: "What is Lamia's hobby?", options: ["Painting", "Reading books", "Gardening", "Dancing"], correct: "Reading books", category: "factual" },
        { id: "ap9q2", text: "What does Lamia want to become?", options: ["Doctor", "Teacher", "Writer", "Engineer"], correct: "Writer", category: "factual" }
      ]
    }
  ],
  "Section 10": [
    {
      title: "My Future Plan",
      description: "A student shares his ambition.",
      transcript: "[M5]A boy named Farhan talks about his dream.[F5]I am in class nine. I want to be a doctor. I will study hard in science. I want to serve poor people in villages of Bangladesh. I believe education can change our country.",
      questions: [
        { id: "ap10q1", text: "What does Farhan want to become?", options: ["Engineer", "Doctor", "Teacher", "Pilot"], correct: "Doctor", category: "factual" },
        { id: "ap10q2", text: "Which class is Farhan studying in?", options: ["Seven", "Eight", "Nine", "Ten"], correct: "Nine", category: "numbers" }
      ]
    }
  ],
  "Section 11": [
    {
      title: "Seasons of Bangladesh",
      description: "A student describes the seasons in Bangladesh.",
      transcript: "[M5]A boy named Ashik talks about seasons.[F5]Bangladesh has six seasons. Summer is very hot. Rainy season brings heavy rainfall. Winter is cool and pleasant. We grow paddy in the rainy season. Mangoes are available in summer.",
      questions: [
        { id: "ap11q1", text: "How many seasons are there in Bangladesh?", options: ["Three", "Four", "Five", "Six"], correct: "Six", category: "numbers" },
        { id: "ap11q2", text: "Which season brings heavy rainfall?", options: ["Summer", "Winter", "Rainy season", "Autumn"], correct: "Rainy season", category: "factual" }
      ]
    }
  ],
  "Section 12": [
    {
      title: "Independence Day",
      description: "A girl talks about 26th March.",
      transcript: "[M5]A girl named Rupa describes Independence Day.[F5]26th March is our Independence Day. In 1971, Bangladesh became independent. We hoist the national flag. Schools arrange parades and cultural programmes. We remember our freedom fighters.",
      questions: [
        { id: "ap12q1", text: "When is Independence Day celebrated?", options: ["14th August", "26th March", "16th December", "21st February"], correct: "26th March", category: "numbers" },
        { id: "ap12q2", text: "In which year did Bangladesh become independent?", options: ["1947", "1952", "1971", "1975"], correct: "1971", category: "numbers" }
      ]
    }
  ],
  "Section 13": [
    {
      title: "Cricket Match",
      description: "A boy describes watching a cricket match.",
      transcript: "[M5]A boy named Sabbir talks about cricket.[F5]Yesterday I watched a cricket match between Bangladesh and India. Bangladesh won by 25 runs. Shakib Al Hasan took three wickets. We all cheered loudly. Cricket is our favourite sport.",
      questions: [
        { id: "ap13q1", text: "Against which team did Bangladesh play?", options: ["Pakistan", "India", "Sri Lanka", "Australia"], correct: "India", category: "factual" },
        { id: "ap13q2", text: "By how many runs did Bangladesh win?", options: ["15 runs", "25 runs", "40 runs", "50 runs"], correct: "25 runs", category: "numbers" }
      ]
    }
  ],
  "Section 14": [
    {
      title: "Means of Transport",
      description: "A student talks about travelling in Bangladesh.",
      transcript: "[M5]A girl named Nisha speaks about transport.[F5]In Dhaka we use rickshaws and CNGs for short distances. For long journeys we take buses or trains. Many people travel by launch on rivers. I like travelling by train the most.",
      questions: [
        { id: "ap14q1", text: "What is commonly used for short distances in Dhaka?", options: ["Bus", "Rickshaw", "Aeroplane", "Boat"], correct: "Rickshaw", category: "factual" },
        { id: "ap14q2", text: "Which mode of transport does Nisha like most?", options: ["Bus", "Launch", "Train", "Rickshaw"], correct: "Train", category: "factual" }
      ]
    }
  ],
  "Section 15": [
    {
      title: "Good Health Habits",
      description: "A student explains healthy daily habits.",
      transcript: "[M5]A boy named Tanvir talks about health.[F5]We should eat fresh vegetables and fruits. Drinking clean water is very important. I exercise every morning. We must wash hands before eating. Sleep at least 8 hours every night.",
      questions: [
        { id: "ap15q1", text: "How many hours should we sleep at night?", options: ["4 hours", "6 hours", "8 hours", "10 hours"], correct: "8 hours", category: "numbers" },
        { id: "ap15q2", text: "What should we do before eating?", options: ["Run", "Wash hands", "Play", "Watch TV"], correct: "Wash hands", category: "factual" }
      ]
    }
  ],
  "Section 16": [
    {
      title: "Our National Flag",
      description: "A student describes the national flag of Bangladesh.",
      transcript: "[M5]A girl named Farhana describes the flag.[F5]Our national flag is green with a red circle. The green colour stands for our fertile land. The red circle represents the blood of our martyrs. We show respect by hoisting it on important days.",
      questions: [
        { id: "ap16q1", text: "What is the background colour of our national flag?", options: ["Red", "Blue", "Green", "White"], correct: "Green", category: "factual" },
        { id: "ap16q2", text: "What does the red circle represent?", options: ["Peace", "Fertile land", "Blood of martyrs", "River"], correct: "Blood of martyrs", category: "factual" }
      ]
    }
  ],
  "Section 17": [
    {
      title: "The Royal Bengal Tiger",
      description: "A student talks about the national animal.",
      transcript: "[M5]A boy named Rifat talks about wildlife.[F5]The Royal Bengal Tiger is our national animal. It lives in the Sundarbans. The Sundarbans is the largest mangrove forest. We should protect tigers from hunters. They are now endangered.",
      questions: [
        { id: "ap17q1", text: "What is the national animal of Bangladesh?", options: ["Lion", "Elephant", "Royal Bengal Tiger", "Deer"], correct: "Royal Bengal Tiger", category: "factual" },
        { id: "ap17q2", text: "Where does the Royal Bengal Tiger live?", options: ["Cox's Bazar", "Sylhet", "The Sundarbans", "Bandarban"], correct: "The Sundarbans", category: "factual" }
      ]
    }
  ],
  "Section 18": [
    {
      title: "Using the Internet",
      description: "A student talks about the benefits of the internet.",
      transcript: "[M5]A girl named Sonia speaks about technology.[F5]Internet helps us to study and learn new things. We can search information for our assignments. But we should not spend too much time on social media. We must be careful about online safety.",
      questions: [
        { id: "ap18q1", text: "What is one main benefit of the internet mentioned?", options: ["Playing games", "Learning new things", "Eating food", "Sleeping"], correct: "Learning new things", category: "factual" },
        { id: "ap18q2", text: "What should we be careful about?", options: ["Online safety", "Weather", "Food", "Cricket"], correct: "Online safety", category: "factual" }
      ]
    }
  ],
  "Section 19": [
    {
      title: "Village Market",
      description: "A boy describes a haat or village market.",
      transcript: "[M5]A boy named Milon talks about the market.[F5]Every Friday there is a haat near our village. Farmers sell fresh vegetables, fruits and fish. People come from nearby villages. I go with my mother to buy clothes and spices.",
      questions: [
        { id: "ap19q1", text: "When is the village haat held?", options: ["Every Monday", "Every Friday", "Every Sunday", "Every Saturday"], correct: "Every Friday", category: "numbers" },
        { id: "ap19q2", text: "What do farmers mainly sell?", options: ["Clothes", "Fresh vegetables and fish", "Books", "Toys"], correct: "Fresh vegetables and fish", category: "factual" }
      ]
    }
  ],
  "Section 20": [
    {
      title: "The River Padma",
      description: "A student talks about an important river.",
      transcript: "[M5]A girl named Meher talks about rivers.[F5]The Padma is one of the largest rivers in Bangladesh. Many people catch fish in this river. In the rainy season it becomes very wide. Rivers help our farmers to grow crops.",
      questions: [
        { id: "ap20q1", text: "What is the Padma?", options: ["A mountain", "A river", "A forest", "A city"], correct: "A river", category: "factual" },
        { id: "ap20q2", text: "What do rivers help farmers to do?", options: ["Build houses", "Grow crops", "Play cricket", "Study"], correct: "Grow crops", category: "factual" }
      ]
    }
  ],
  "Section 21": [
    {
      title: "Eid-ul-Fitr Celebration",
      description: "A student describes how she celebrates Eid.",
      transcript: "[M5]A girl named Sumaiya talks about Eid.[F5]Eid-ul-Fitr comes after Ramadan. We wear new clothes and go to the Eid prayer. My mother prepares special dishes like biryani and shemai. We visit our relatives and exchange greetings. Eid brings joy and happiness.",
      questions: [
        { id: "ap21q1", text: "When does Eid-ul-Fitr come?", options: ["Before Ramadan", "After Ramadan", "In winter", "In summer"], correct: "After Ramadan", category: "factual" },
        { id: "ap21q2", text: "What special dishes are prepared?", options: ["Panta Ilish and Haleem", "Biryani and Shemai", "Pizza and Burger", "Khichuri"], correct: "Biryani and Shemai", category: "factual" }
      ]
    }
  ],
  "Section 22": [
    {
      title: "My Favourite Teacher",
      description: "A boy talks about his favourite teacher.",
      transcript: "[M5]A boy named Asif describes his teacher.[F5]My favourite teacher is Mrs. Rehana. She teaches us Mathematics. She explains lessons very clearly and kindly. She always encourages us to work hard. She is like a mother to us.",
      questions: [
        { id: "ap22q1", text: "What subject does Mrs. Rehana teach?", options: ["English", "Mathematics", "Science", "History"], correct: "Mathematics", category: "factual" },
        { id: "ap22q2", text: "How does the teacher behave with students?", options: ["Strictly", "Kindly", "Angrily", "Silently"], correct: "Kindly", category: "inference" }
      ]
    }
  ],
  "Section 23": [
    {
      title: "A Journey by Bus",
      description: "A girl shares her experience of a bus journey.",
      transcript: "[M5]A girl named Tahmina talks about her journey.[F5]Last week I went to my aunt’s house in Rajshahi by bus. The journey took six hours. I saw green paddy fields on both sides. The bus was comfortable but the road was a bit bumpy.",
      questions: [
        { id: "ap23q1", text: "Where did Tahmina go by bus?", options: ["Sylhet", "Chittagong", "Rajshahi", "Cox’s Bazar"], correct: "Rajshahi", category: "factual" },
        { id: "ap23q2", text: "How long did the journey take?", options: ["Three hours", "Four hours", "Six hours", "Eight hours"], correct: "Six hours", category: "numbers" }
      ]
    }
  ],
  "Section 24": [
    {
      title: "Importance of Trees",
      description: "A student explains why trees are important.",
      transcript: "[M5]A boy named Robin speaks about trees.[F5]Trees give us oxygen and fruits. They make the air fresh and cool. We get wood and medicine from trees. Cutting trees causes floods and pollution. We should plant at least one tree every year.",
      questions: [
        { id: "ap24q1", text: "What do trees give us?", options: ["Oxygen and fruits", "Plastic and toys", "Cars and bikes", "Books and pens"], correct: "Oxygen and fruits", category: "factual" },
        { id: "ap24q2", text: "What problem does cutting trees cause?", options: ["Floods and pollution", "More rain", "Better roads", "Good harvest"], correct: "Floods and pollution", category: "factual" }
      ]
    }
  ],
  "Section 25": [
    {
      title: "Bangladesh National Anthem",
      description: "A student talks about the national anthem.",
      transcript: "[M5]A girl named Shreya describes the anthem.[F5]Our national anthem is ‘Amar Sonar Bangla’. It was written by Rabindranath Tagore. We sing it every morning at school. It shows our love for Bangladesh. The anthem is very sweet and inspiring.",
      questions: [
        { id: "ap25q1", text: "Who wrote the national anthem?", options: ["Kazi Nazrul Islam", "Rabindranath Tagore", "Jibanananda Das", "Begum Rokeya"], correct: "Rabindranath Tagore", category: "factual" },
        { id: "ap25q2", text: "What is the name of our national anthem?", options: ["Joy Bangla", "Amar Sonar Bangla", "Bangladesh", "Padma"], correct: "Amar Sonar Bangla", category: "factual" }
      ]
    }
  ],
  "Section 26": [
    {
      title: "Road Safety Rules",
      description: "A boy explains basic road safety.",
      transcript: "[M5]A boy named Fahim talks about safety.[F5]We must follow traffic rules. Walk on the footpath and use zebra crossing. Look left and right before crossing the road. Never play on the road. Wearing helmet is important while riding bicycle or bike.",
      questions: [
        { id: "ap26q1", text: "Where should we walk?", options: ["On the road", "On the footpath", "In the middle", "On the roof"], correct: "On the footpath", category: "factual" },
        { id: "ap26q2", text: "What should we wear while riding a bicycle?", options: ["Cap", "Helmet", "Sunglasses", "Gloves"], correct: "Helmet", category: "factual" }
      ]
    }
  ],
  "Section 27": [
    {
      title: "The Sundarbans",
      description: "A student describes the mangrove forest.",
      transcript: "[M5]A girl named Keya talks about Sundarbans.[F5]The Sundarbans is the largest mangrove forest in the world. It is located in southern Bangladesh. Many wild animals live there including the Royal Bengal Tiger. It protects us from cyclones.",
      questions: [
        { id: "ap27q1", text: "Where is the Sundarbans located?", options: ["Northern Bangladesh", "Southern Bangladesh", "Eastern Bangladesh", "Western Bangladesh"], correct: "Southern Bangladesh", category: "factual" },
        { id: "ap27q2", text: "What does the Sundarbans protect us from?", options: ["Earthquakes", "Cyclones", "Drought", "Heavy snow"], correct: "Cyclones", category: "factual" }
      ]
    }
  ],
  "Section 28": [
    {
      title: "My Pet",
      description: "A boy describes his pet animal.",
      transcript: "[M5]A boy named Rony talks about his pet.[F5]I have a small brown cat named Mimi. She likes to drink milk and play with wool. I take care of her every day. She sleeps on my bed at night. Having a pet makes me happy.",
      questions: [
        { id: "ap28q1", text: "What is the name of the pet?", options: ["Lucy", "Mimi", "Tomi", "Kiki"], correct: "Mimi", category: "factual" },
        { id: "ap28q2", text: "What colour is the cat?", options: ["Black", "White", "Brown", "Grey"], correct: "Brown", category: "factual" }
      ]
    }
  ],
  "Section 29": [
    {
      title: "21st February - International Mother Language Day",
      description: "A student talks about Language Movement.",
      transcript: "[M5]A girl named Nabila speaks about 21st February.[F5]On 21st February 1952, many people sacrificed their lives for Bangla language. We observe this day as Shaheed Day. We place flowers at Shaheed Minar. Now it is observed all over the world.",
      questions: [
        { id: "ap29q1", text: "In which year did the Language Movement happen?", options: ["1947", "1952", "1971", "1975"], correct: "1952", category: "numbers" },
        { id: "ap29q2", text: "Where do people place flowers?", options: ["At school", "At Shaheed Minar", "At home", "At stadium"], correct: "At Shaheed Minar", category: "factual" }
      ]
    }
  ],
  "Section 30": [
    {
      title: "Fish Cultivation",
      description: "A student talks about fish farming in Bangladesh.",
      transcript: "[M5]A boy named Siam talks about fish.[F5]Bangladesh is famous for fish. Many people do fish cultivation in ponds. We get protein from fish. Common fishes are Rui, Catla and Tilapia. Fish farming helps our economy and farmers.",
      questions: [
        { id: "ap30q1", text: "Why is fish important for us?", options: ["Gives protein", "Gives oil", "Gives wood", "Gives clothes"], correct: "Gives protein", category: "factual" },
        { id: "ap30q2", text: "Where do people do fish cultivation?", options: ["In rivers only", "In ponds", "In sea only", "In hills"], correct: "In ponds", category: "factual" }
      ]
    }
  ],
  "Section 31": [
    {
      title: "Daily Routine",
      description: "A boy named Hasan talks about his daily routine.",
      transcript: "[M5]Hasan describes his day.[F5]I wake up at 6 o'clock. I brush my teeth and take breakfast. Then I go to school. After school, I play football with my friends.",
      questions: [
        { id: "ap31q1", text: "When does Hasan wake up?", options: ["5 o'clock", "6 o'clock", "7 o'clock", "8 o'clock"], correct: "6 o'clock", category: "numbers" },
        { id: "ap31q2", text: "What does Hasan play after school?", options: ["Cricket", "Football", "Hockey", "Basketball"], correct: "Football", category: "factual" }
      ]
    }
  ],
  "Section 32": [
    {
      title: "My Best Friend",
      description: "A girl named Laila talks about her best friend.",
      transcript: "[M5]Laila introduces her best friend.[F5]My best friend is Rina. She is very kind. We study in the same class. We like to read story books together.",
      questions: [
        { id: "ap32q1", text: "What is Laila's best friend's name?", options: ["Rina", "Mina", "Sima", "Tina"], correct: "Rina", category: "factual" },
        { id: "ap32q2", text: "What do Laila and Rina like to do?", options: ["Play football", "Read story books", "Sing songs", "Watch TV"], correct: "Read story books", category: "factual" }
      ]
    }
  ],
  "Section 33": [
    {
      title: "A Visit to the Park",
      description: "Rafiq describes his visit to the park.",
      transcript: "[M5]Rafiq shares his experience.[F5]Yesterday I went to the park with my cousin. We saw many flowers and birds. We played on the swings and had ice cream.",
      questions: [
        { id: "ap33q1", text: "Who did Rafiq go to the park with?", options: ["His friend", "His cousin", "His brother", "His sister"], correct: "His cousin", category: "factual" },
        { id: "ap33q2", text: "What did Rafiq eat at the park?", options: ["Cake", "Ice cream", "Biscuits", "Chocolate"], correct: "Ice cream", category: "factual" }
      ]
    }
  ],
  "Section 34": [
    {
      title: "My Pet",
      description: "A boy named Karim talks about his pet cat.",
      transcript: "[M5]Karim describes his pet.[F5]I have a pet cat. Its name is Snowy. It is white and very playful. I feed it milk every day.",
      questions: [
        { id: "ap34q1", text: "What is the name of Karim's cat?", options: ["Tommy", "Snowy", "Kitty", "Mimi"], correct: "Snowy", category: "factual" },
        { id: "ap34q2", text: "What does Karim feed his cat?", options: ["Fish", "Milk", "Rice", "Bread"], correct: "Milk", category: "factual" }
      ]
    }
  ],
  "Section 35": [
    {
      title: "Shopping at the Market",
      description: "A girl named Nila talks about shopping.",
      transcript: "[M5]Nila shares her shopping experience.[F5]I went to the market with my mother. We bought vegetables, fruits, and fish. The market was very crowded.",
      questions: [
        { id: "ap35q1", text: "Who did Nila go to the market with?", options: ["Her father", "Her mother", "Her sister", "Her brother"], correct: "Her mother", category: "factual" },
        { id: "ap35q2", text: "What did Nila buy from the market?", options: ["Clothes", "Books", "Vegetables, fruits, and fish", "Shoes"], correct: "Vegetables, fruits, and fish", category: "factual" }
      ]
    }
  ],
  "Section 36": [
    {
      title: "A Rainy Day",
      description: "Shuvo describes a rainy day.",
      transcript: "[M5]Shuvo talks about the weather.[F5]It rained all day yesterday. I stayed at home and read books. My little brother played indoor games.",
      questions: [
        { id: "ap36q1", text: "What did Shuvo do on the rainy day?", options: ["Played football", "Read books", "Went shopping", "Watched TV"], correct: "Read books", category: "factual" },
        { id: "ap36q2", text: "What did Shuvo's brother do?", options: ["Played indoor games", "Went to school", "Slept", "Read books"], correct: "Played indoor games", category: "factual" }
      ]
    }
  ],
  "Section 37": [
    {
      title: "My Village",
      description: "A boy named Alam describes his village.",
      transcript: "[M5]Alam shares about his village.[F5]I live in a small village. There are green fields and rivers. People in my village are very friendly. I love my village.",
      questions: [
        { id: "ap37q1", text: "What does Alam say about his village?", options: ["It is big", "It is small", "It is crowded", "It is noisy"], correct: "It is small", category: "factual" },
        { id: "ap37q2", text: "What natural features are in Alam's village?", options: ["Mountains", "Green fields and rivers", "Desert", "Sea"], correct: "Green fields and rivers", category: "factual" }
      ]
    }
  ],
  "Section 38": [
    {
      title: "My Hobby",
      description: "A girl named Sima talks about her hobby.",
      transcript: "[M5]Sima describes her hobby.[F5]My hobby is drawing. I like to draw flowers and animals. I use colours to make my drawings beautiful.",
      questions: [
        { id: "ap38q1", text: "What is Sima's hobby?", options: ["Singing", "Drawing", "Dancing", "Reading"], correct: "Drawing", category: "factual" },
        { id: "ap38q2", text: "What does Sima like to draw?", options: ["Mountains", "Flowers and animals", "Cars", "Houses"], correct: "Flowers and animals", category: "factual" }
      ]
    }
  ],
  "Section 39": [
    {
      title: "A Train Journey",
      description: "Rina describes her train journey.",
      transcript: "[M5]Rina shares her travel story.[F5]Last week I travelled by train to Chittagong. The train was fast and comfortable. I enjoyed looking at the fields and rivers from the window.",
      questions: [
        { id: "ap39q1", text: "Where did Rina travel by train?", options: ["Dhaka", "Khulna", "Chittagong", "Sylhet"], correct: "Chittagong", category: "factual" },
        { id: "ap39q2", text: "What did Rina enjoy during the journey?", options: ["Sleeping", "Looking at fields and rivers", "Eating food", "Talking to friends"], correct: "Looking at fields and rivers", category: "factual" }
      ]
    }
  ],
  "Section 40": [
    {
      title: "My Birthday Party",
      description: "A boy named Tanvir talks about his birthday party.",
      transcript: "[M5]Tanvir describes his birthday.[F5]I celebrated my birthday last Friday. My friends came to my house. We played games and ate cake. It was a happy day.",
      questions: [
        { id: "ap40q1", text: "When did Tanvir celebrate his birthday?", options: ["Monday", "Friday", "Sunday", "Saturday"], correct: "Friday", category: "numbers" },
        { id: "ap40q2", text: "What did Tanvir and his friends eat?", options: ["Biscuits", "Cake", "Ice cream", "Pizza"], correct: "Cake", category: "factual" }
      ]
    }
  ],
  "Section 41": [
    {
      title: "A Visit to the National Zoo",
      description: "A student shares an exciting day observing wildlife at the zoo.",
      transcript: "[M5]A student shares an exciting day observing wildlife at the zoo.[F5]Last Saturday, my family visited the National Zoo in Mirpur. We saw spotted deer grazing peacefully, colorful macaws in the aviary, and two majestic Royal Bengal tigers resting under the shade.",
      questions: [
        { id: "ap41q1", text: "When did the speaker visit the National Zoo?", options: ["Last Friday", "Last Saturday", "Last Sunday", "Last Tuesday"], correct: "Last Saturday", category: "factual" },
        { id: "ap41q2", text: "Where were the two Royal Bengal tigers resting?", options: ["In the water pond", "Under the shade", "On a rock", "Inside a cave"], correct: "Under the shade", category: "factual" }
      ]
    }
  ],
  "Section 42": [
    {
      title: "My School Science Club",
      description: "Farhan describes the weekly activities of their school science club.",
      transcript: "[M5]Farhan describes their school science club.[M4]I am an active member of our school science club. We meet every Thursday afternoon in the physics laboratory. This month, our team designed a solar-powered water heating model for the district science fair.",
      questions: [
        { id: "ap42q1", text: "On which day does the science club meet?", options: ["Monday afternoon", "Wednesday morning", "Thursday afternoon", "Saturday morning"], correct: "Thursday afternoon", category: "factual" },
        { id: "ap42q2", text: "What model did the team design for the science fair?", options: ["A wind turbine", "A solar-powered water heating model", "A weather station", "A robotic arm"], correct: "A solar-powered water heating model", category: "factual" }
      ]
    }
  ],
  "Section 43": [
    {
      title: "Cooking Khichuri on a Rainy Day",
      description: "A brother describes a warm family meal during heavy monsoon rain.",
      transcript: "[M5]A boy describes a warm family meal during heavy monsoon rain.[F4]Whenever it pours outside during monsoon, my mother prepares fragrant bhuna khichuri. Yesterday, she served hot khichuri with crispy fried eggplant, boiled eggs, and spicy mango pickles.",
      questions: [
        { id: "ap43q1", text: "What special dish does mother prepare when it rains?", options: ["Chicken biryani", "Fragrant bhuna khichuri", "Fried rice", "Vegetable noodles"], correct: "Fragrant bhuna khichuri", category: "factual" },
        { id: "ap43q2", text: "What was served with the khichuri?", options: ["Fish curry and salad", "Fried eggplant, boiled eggs, and pickles", "Lentil soup and bread", "Chicken kebab and chutney"], correct: "Fried eggplant, boiled eggs, and pickles", category: "factual" }
      ]
    }
  ],
  "Section 44": [
    {
      title: "A Boat Race on the Jamuna",
      description: "An exciting description of a traditional Nouka Baich competition.",
      transcript: "[M5]An exciting description of a traditional Nouka Baich competition.[M3]During the autumn festival, hundreds of villagers gathered on the banks of the Jamuna river. We watched seven long racing boats compete. The rowers chanted energetic folk songs as their wooden oars splashed together in perfect rhythm.",
      questions: [
        { id: "ap44q1", text: "On which river was the boat race held?", options: ["Padma river", "Meghna river", "Jamuna river", "Karnafuli river"], correct: "Jamuna river", category: "factual" },
        { id: "ap44q2", text: "How many racing boats competed in the race?", options: ["Five", "Six", "Seven", "Ten"], correct: "Seven", category: "numbers" }
      ]
    }
  ],
  "Section 45": [
    {
      title: "Visiting a Pottery Village",
      description: "A girl recounts visiting an artisan pottery workshop in Dhamrai.",
      transcript: "[M5]A girl recounts visiting an artisan pottery workshop.[F3]During our excursion to Dhamrai, we visited a traditional pottery workshop. An artisan named Biren uncle showed us how to spin moist red clay on a fast potter's wheel to make smooth tea cups and terracotta flower vases.",
      questions: [
        { id: "ap45q1", text: "Which town's pottery workshop did they visit?", options: ["Sonargaon", "Dhamrai", "Comilla", "Narsingdi"], correct: "Dhamrai", category: "factual" },
        { id: "ap45q2", text: "What kind of clay did the artisan spin on the wheel?", options: ["White ceramic clay", "Moist red clay", "Dry sand", "Grey cement"], correct: "Moist red clay", category: "factual" }
      ]
    }
  ],
  "Section 46": [
    {
      title: "The School Garden Project",
      description: "Students tending vegetable and flower beds at school.",
      transcript: "[M5]Students tending vegetable and flower beds at school.[F5]Our class started a kitchen garden behind the library. Every afternoon after recess, we water the rows of sweet spinach, red tomatoes, and yellow marigold flowers. Yesterday, we picked five ripe tomatoes for the first time.",
      questions: [
        { id: "ap46q1", text: "Where is the student kitchen garden located?", options: ["In front of the main gate", "Behind the library", "Beside the canteen", "Near the football field"], correct: "Behind the library", category: "factual" },
        { id: "ap46q2", text: "How many ripe tomatoes did they pick yesterday?", options: ["Three", "Four", "Five", "Six"], correct: "Five", category: "numbers" }
      ]
    }
  ],
  "Section 47": [
    {
      title: "A Day at the National Museum",
      description: "A journey through the historical galleries of the National Museum.",
      transcript: "[M5]A journey through the historical galleries of the museum.[M2]Yesterday our history teacher took us to the National Museum at Shahbagh. We spent two hours in the archaeological gallery viewing ancient brass coins, stone sculptures from the Buddhist era, and vintage weapons from the Mughal period.",
      questions: [
        { id: "ap47q1", text: "Where is the National Museum situated?", options: ["Gulshan", "Shahbagh", "Motijheel", "Mirpur"], correct: "Shahbagh", category: "factual" },
        { id: "ap47q2", text: "How long did the students spend in the archaeological gallery?", options: ["One hour", "Two hours", "Three hours", "Four hours"], correct: "Two hours", category: "numbers" }
      ]
    }
  ],
  "Section 48": [
    {
      title: "My Grandfather's Village Orchard",
      description: "A boy talks about spending holidays in his grandfather's fruit orchard.",
      transcript: "[M5]A boy talks about his grandfather's fruit orchard.[M4]In the summer holidays, I visit my grandfather in Rajshahi. He owns a big orchard with thirty mango trees and twelve guava trees. In the afternoon, we sit beneath the cool shade of an old banyan tree and drink fresh tender coconut water.",
      questions: [
        { id: "ap48q1", text: "In which city is grandfather's orchard located?", options: ["Rangpur", "Rajshahi", "Bogra", "Kushtia"], correct: "Rajshahi", category: "factual" },
        { id: "ap48q2", text: "How many guava trees does grandfather own?", options: ["Ten", "Twelve", "Twenty", "Thirty"], correct: "Twelve", category: "numbers" }
      ]
    }
  ],
  "Section 49": [
    {
      title: "Winter Morning Pithe Festival",
      description: "A joyful family morning making traditional winter rice cakes.",
      transcript: "[M5]A joyful family morning making traditional winter rice cakes.[F4]Winter mornings in our village are foggy and chilly. My grandmother sits by the clay stove preparing hot bhapa pithe and chitoi pithe. She drizzles sweet liquid date palm jaggery over the steamed rice cakes for breakfast.",
      questions: [
        { id: "ap49q1", text: "What kind of pithe did grandmother prepare?", options: ["Patisapta and samosa", "Hot bhapa pithe and chitoi pithe", "Puri and paratha", "Semolina halwa"], correct: "Hot bhapa pithe and chitoi pithe", category: "factual" },
        { id: "ap49q2", text: "What sweet syrup is drizzled over the rice cakes?", options: ["Honey syrup", "Sugar syrup", "Date palm jaggery", "Chocolate sauce"], correct: "Date palm jaggery", category: "factual" }
      ]
    }
  ],
  "Section 50": [
    {
      title: "A Visit to the Book Fair",
      description: "Exploring stalls and buying books at the Ekushey Boi Mela.",
      transcript: "[M5]Exploring stalls and buying books at the Ekushey Boi Mela.[F2]Every February, I visit the Ekushey Boi Mela at the Bangla Academy premises. This year, I saved my pocket money and bought three storybooks and a science comic. I even got an autograph from my favorite children's author!",
      questions: [
        { id: "ap50q1", text: "In which month is the Ekushey Boi Mela held?", options: ["January", "February", "March", "December"], correct: "February", category: "factual" },
        { id: "ap50q2", text: "How many storybooks did the student purchase?", options: ["Two", "Three", "Four", "Five"], correct: "Three", category: "numbers" }
      ]
    }
  ]
};
