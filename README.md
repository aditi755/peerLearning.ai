# PeerConnect.ai

PeerConnect.ai is an AI-powered platform designed to help students find ideal learning partners. Developed for a hackathon, the platform allows students to either add themselves to a list or find their best peer match using an AI model. The Google Gemini API provides detailed explanations for why a particular peer is a good match based on the student's profile.

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

## Problem Solved

- **Isolation:** Addresses the issue of isolation among students by connecting them with potential learning partners.
- **Finding Learning Partners:** Simplifies the process of finding suitable study partners through detailed AI analysis.

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

## Contributing

Contributions are welcome! Please open an issue or submit a pull request with improvements or bug fixes.


## Acknowledgments

- Thanks to the Google Gemini API for providing powerful AI capabilities.
- Special thanks to the hackathon organizers and mentors for their support.

---

For any questions or issues, please contact [your-email@example.com](mailto:your-email@example.com).
