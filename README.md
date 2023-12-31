# greenr
<img width="944" alt="Screenshot 2023-11-19 130138" src="https://github.com/czerkisi/mhacks16/assets/93162463/f72f93a7-80d4-4fd5-a1d9-60dd599dcd88">

## Inspiration
The inspiration for this project stems from a growing global awareness and concern for environmental sustainability, particularly in urban settings. In a world grappling with climate change and resource depletion, there is an increasing need for tools that can help individuals and organizations make informed decisions about property usage and investments. By providing accessible and comprehensive environmental metrics for properties, Greenr aims to empower users with the knowledge to make choices that are not only beneficial for them but also for the planet.

While governments often possess extensive environmental data on properties, this information is typically disparate, scattered, and overwhelming for the average user to navigate. Accessing and synthesizing this data to make informed decisions can be a daunting task. Our platform addresses this challenge by consolidating these diverse data sets and presenting them through a cohesive and understandable scoring mechanism.

By offering a standardized metric for evaluation, we enable users to easily assess and compare the environmental impact of various properties at a glance. This approach simplifies the decision-making process, making it more accessible and user-friendly. We aim to demystify the complexity of environmental data, providing a clear and concise resource that empowers users to make well-informed choices about their living or investment spaces based on reliable and comprehensive environmental insights.

## What it does
### [Demo](https://youtu.be/mpb8KvebNy4?si=l37Gwy-UR4jCpcmB)
Greenr is an innovative web application designed to provide users with detailed environmental assessments of properties, focusing on ease of use and clear, actionable insights. The application effectively bridges the gap between complex environmental data and the everyday user, enabling informed decisions regarding property sustainability. Users start by entering an address on the main page, which serves as the central point for the analysis. They can then specify their preferred property type, such as office buildings or residential properties, and also how many nearby properties they want to see (denoted as 'k'). Utilizing the entered address, the application calculates the distance to nearby properties of the selected type, identifying the closest based on the user's 'k' value, and then presents the list, each with its address, sustainability score, and all the other relative details. This score is derived from an aggregation of various environmental metrics - including *carbon footprint rating, energy efficiency rating, water efficiency rating, renewable energy utilization, and sustainability certifications*, which is then normalized to provide a straightforward indication of each property’s environmental impact. The output is designed to give users an at-a-glance understanding of the sustainability of properties in their area of interest, facilitating more environmentally conscious decisions.

## How We Built It
Greenr's web application, developed with React and Flask, leverages advanced data handling and responsive UI/UX design to facilitate property sustainability assessment. Upon receiving a desired location and filtering criteria from the user, the Google Geocoding API geolocates the address. We then apply the Haversine formula to calculate distances to nearby properties, prioritizing the 'k' closest ones for analysis.

The front-end, optimized for various devices, dynamically displays these properties with addresses and sustainability scores. In the backend, we process data such as greenhouse gas emissions and energy usage. Using scikit-learn, we first employ logarithmic transformations, which can prevent any undefined result. The application then employs MinMax scaling. This step is critical in ensuring that each environmental feature or data point is scaled to a consistent range, specifically between 0 and 1, bringing them onto a common scale without distorting differences in the ranges of values. Normalization is then done by subtracting the minimum value of the feature and then dividing by the range, returning a score ranging from 0 to 100.

For enhanced user engagement, we implemented a specialized GPT model. This model provides detailed explanations of sustainability metrics, advice on carbon footprint reduction, and insights into green technology trends, powered by AI-driven insights.

Additionally, we've integrated robust security measures like SSL encryption, optimized our Flask backend for efficient request handling, and utilized a CI/CD pipeline for streamlined testing and deployment. The application's PWA features enhance the user experience, while user analytics help us continuously improve our service.

This technical framework, combining responsive design, advanced data processing, and AI-driven insights, forms the core of Greenr's approach to promoting environmentally informed decisions.


## Challenges we ran into
One of the most daunting challenges was managing the sheer volume and complexity of the data, which included over 28,000 rows and more than 250 columns. The task of preprocessing this vast amount of data to make it manageable and useful was not trivial. We had to devise efficient ways to handle, clean, and structure this data, ensuring that it could be processed quickly and accurately. This step was crucial for the foundation of our application, as the quality of our insights and the performance of the entire system depended on how well we managed this data.

Another significant challenge was developing the formula to calculate the ultimate sustainability score. With five different environmental metrics to consider, each requiring a different weight, the task was complex. Determining these weights was difficult due to limited research resources and the need to account for varying property types. Additionally, as our model relied on unsupervised learning, due to the lack of labeled data in our dataset, this added an extra layer of complexity in deriving a meaningful and accurate scoring system. Balancing these factors to create a fair and representative scoring formula required careful consideration and innovative data science techniques.

Additionally, integrating and rerendering the map in React posed a technical challenge. Ensuring that the map updated dynamically in response to user inputs, without compromising the application's performance or user experience, required meticulous coding and optimization. React's rerendering had to be managed efficiently to reflect real-time changes in data and user selections, especially when displaying the properties and their sustainability scores on the map. This aspect was vital for providing an interactive and responsive user interface that met the needs of our users.


## Accomplishments that we're proud of
Advanced Technology Integration: The successful integration of React, Flask, and scikit-learn stands as a significant accomplishment. This combination allowed us to build a highly interactive and responsive frontend with React, ensuring a seamless user experience. Simultaneously, Flask provided a robust and scalable backend, capable of handling complex data processing and API interactions efficiently. The incorporation of scikit-learn for data science tasks, particularly in processing and normalizing environmental metrics, underscores our commitment to utilizing the best tools available for developing a sophisticated and reliable application. This integration not only demonstrates our technical proficiency but also our ability to leverage these technologies in harmony to create a powerful tool for sustainability assessment.

Innovative Sustainability Scoring System: Developing the sustainability scoring system is another achievement we take great pride in. By employing a combination of logarithmic transformation and MinMaxScaler normalization, we were able to convert complex environmental data like Site EUI and Weather Normalized Source EUI into a simple, understandable score ranging from 0 to 100. This scoring system is a key feature of our application, making it possible for users, regardless of their technical background, to easily comprehend and compare the environmental impact of different properties. The methodology behind this scoring system is carefully designed to ensure accuracy and relevance, reflecting our deep understanding of environmental metrics and our commitment to making sustainability assessment accessible and actionable for all users.

## What we learned
Data Management Skills

Algorithm Development for Sustainability Scoring
Technology Integration
Responsive UI/UX Design
Handling Unsupervised Learning Challenges
Importance of Accessibility in Environmental Data
AI Integration for Enhanced User Engagement 

## What's next for Mhacks16
Looking ahead, we are focused on enhancing and expanding our web application to offer a more intuitive and insightful experience. While we have successfully trained the ChatGPT model with our data and algorithms, a current limitation is the lack of API endpoints, preventing us from embedding it seamlessly into our website as a chatbot. Our immediate goal is to try establishing these endpoints, enabling the integration of the GPT bot directly into our web app. This integration will significantly enhance user interaction, offering direct, conversational assistance and enriching the overall user experience. Additionally, we aim to provide more educational resources and assistance. Many metrics in our dataset might be unfamiliar to users, and our goal is to demystify these metrics, offering clear explanations and context, which can be achieved with the advent of the chatbot. This enhancement is crucial in empowering users to make more environmentally-friendly decisions, backed by a thorough understanding of the data and its implications.

For the scale of the project, our focus has currently been on using a dataset specific to New York due to time constraints. However, our ambition is to expand its applicability to a broader geographic scope. We envision the product being used in various regions and cities, assisting a wider audience in making informed, sustainable choices regarding properties. This expansion will not only increase the reach of our application but also contribute significantly to global efforts in promoting sustainable living and development.

We are also exploring various monetization models to ensure the sustainability of our business. These include subscription models for advanced features, partnerships with real estate and environmental agencies, and offering tailored analytics services to businesses. Additionally, leveraging data for insights and trends in the real estate market presents an opportunity for revenue generation.
