# PeerConnect.ai

PeerConnect.ai is an AI-powered platform designed to help students find ideal learning partners. Developed for a hackathon, the platform allows students to either add themselves to a list or find their best peer match using an AI model. The Google Gemini API provides detailed explanations for why a particular peer is a good match based on the student's profile.

Video Demo [here](https://www.loom.com/share/72128cc400514be7a1a3ea62c7501006?sid=fe18381e-110c-4057-9a50-c96c8ecfc9a0)
Live link: https://peer-learning-ai.vercel.app/
## Track: EduTech 

### Problem Statement
In educational settings, students often struggle to find suitable peers for collaborative learning and peer tutoring. Traditional methods of pairing students based on basic criteria like availability and subjects of interest often fall short in identifying the best matches that can truly enhance learning experiences. There is a need for a more sophisticated, AI-powered solution that can match students based on a deeper understanding of their strengths, weaknesses, learning styles, and feedback.

#### Problem It Solves
- **Isolation**: Addresses the issue of isolation among students by connecting them with potential learning partners.
- **Finding Learning Partners**: Simplifies the process of finding suitable study partners through detailed AI analysis.

## Features

### 1. Student Registration
- Students can add their details, including:
  - Name
  - Age
  - Subjects of interest
  - Grade
  - Study preferences

### 2. Find Peer Match
- Students can discover the best potential learning partner by clicking the "Find Peer Match" button.
- The Google Gemini API analyzes student profiles and provides a comprehensive explanation for the recommended peer match.
- The explanation is formatted and displayed clearly on the UI, with markdown elements removed.

## Tech Stack

- **Next.js:** Framework for building the front-end and server-side rendering of the application.
- **MongoDB:** Database for storing and managing student profiles and related data.
- **Google Gemini API:** AI service used to analyze student profiles and find suitable peer matches.

## Future Features

### 1. Messaging
- Integration of a messaging feature to allow students to communicate directly with their potential peers.
- Enables students to arrange study sessions or discuss learning needs.

### 2. Social Profiles
- Addition of social features to view and connect with social profiles of other students.
- Enhances community engagement and allows students to interact on a social level.

### 3. Analytics 
- analytics to the UI using Chart.js and Ant Design UI
- And, using clodflare AI workers for more efficient AI model to match students.

## UI/UX Design

- **Add Student Form:**
  - Users can enter their details into a well-styled form.
  - Designed with Tailwind CSS for a clean and modern look.

- **Find Peer Match Form:**
  - Form to submit student details for peer matching.
  - Displays peer match results with clear formatting and detailed explanations provided by the AI.

- **Student List:**
  - Shows a list of all registered students with their details.
  - Provides options to view detailed information about each student.

## Demo

![Screenshot (95)](https://github.com/user-attachments/assets/7fc15370-9fb9-4fc0-8b79-938ea43b4a85)

![Screenshot (96)](https://github.com/user-attachments/assets/8a848c99-a76e-46be-944e-613302ef37c3)

![Screenshot (98)](https://github.com/user-attachments/assets/a7bb058e-f228-4344-90c4-30db26b7d8c2)

![Screenshot (99)](https://github.com/user-attachments/assets/bb6a56f9-bd24-4478-b6f3-3643f9425fe6)

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/peerconnect-ai.git
    ```

2. Navigate into the project directory:
    ```bash
    cd peerconnect-ai
    ```

3. Install dependencies:
    ```bash
    npm install
    ```

4. Create a `.env` file in the root directory and add your environment variables (e.g., MongoDB URI, Google Gemini API key).

5. Run the development server:
    ```bash
    next dev
    ```

6. Open your browser and visit `http://localhost:3000`.


## Acknowledgments

- Thanks to the Google Gemini API for providing powerful AI capabilities.
- Special thanks to the hackathon organizers and mentors for their support.


