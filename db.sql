CREATE TABLE `app_users` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `pass` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `blogs` (
  `id` INT AUTO_INCREMENT,
  `blog_title` VARCHAR(255),
  `blog_author` VARCHAR(255),
  `blog_content` VARCHAR(1024),
  `created_at` TIMESTAMP NOT NULL,
  PRIMARY KEY (`id`)
);

INSERT INTO blogs (blog_title, blog_author, blog_content, created_at)
VALUES
('My First Day at School', 'ThicBoy1', 'Today was my first day at a new school, and I felt a mix of excitement and nervousness. We started with an introductory class where the teachers explained the rules and schedule. I met new classmates; some were shy, while others immediately started joking around. In math class, we worked on problems in groups, which I found quite interesting. After school, I went with a few new friends to the nearby park, talking about hobbies and plans for school activities. It was a day full of new experiences and friendships.', '2025-08-25 08:30:00'),

('Morning Routine for Productivity', 'MataKovacic123', 'I decided to try a new morning routine to boost my productivity. I woke up at 6:00 AM, drank a glass of cold water, and did a short stretching session. Then I had oatmeal with fruits and a cup of green tea. I felt refreshed and ready to tackle my daily tasks. I made a to-do list and a schedule for the day, realizing how planning ahead helps the day run smoothly and calmly.', '2025-08-25 09:15:00'),

('Experimenting in the Kitchen', 'CoolDude42', 'Today I decided to cook something new – spaghetti with vegetables and homemade pesto sauce. I spent time picking fresh ingredients at the market and carefully followed the recipe steps. Although I had to improvise with some spices a few times, the final result was fantastic. My family praised the taste, and I felt proud that I could prepare a complete meal by myself. After eating, I wrote in my cooking journal what went well and what I could improve next time.', '2025-08-25 11:00:00'),

('Weekend Planning', 'LudaMaca77', 'The weekend is coming, so I decided to make a detailed plan of activities. First, I plan to go on a nature hike with friends, walking along nearby trails and having a picnic by the river. I also plan to visit the modern art museum and go to the cinema in the evening. I want to try a new restaurant that recently opened downtown. Planning ahead gives me a sense of control and helps me make the most of my free time.', '2025-08-25 13:45:00'),

('Studying for History Test', 'NinjaPera99', 'Today I spent several hours studying for a big history test. I reviewed the timeline of important events and studied biographies of famous personalities, taking notes and creating mind maps to memorize information better. I took breaks to stretch and rest my eyes, which helped my concentration. I feel much more prepared and confident for tomorrow’s test, though there is still some material to review. I also discussed difficult topics with friends to better understand historical events.', '2025-08-25 15:30:00');