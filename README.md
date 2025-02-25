# RDS Management

RDS Management is a software solution designed to measure fusional vergence ranges using Random Dot Stereogram (RDS) images. The project aims to present red and blue dot disparities to assess the break and recovery points of visual fusion. This tool is essential for clinical and research purposes in the field of vision science.

## Objective

The goal of this project is to develop a software-based Random Dot Stereogram (RDS) solution that measures fusional vergence ranges by presenting red and blue dot disparities. The software will measure the disparity in arc seconds and detect the break point (where fusion is lost) and recovery point (where fusion is regained).

## Key Features and Requirements

1. **Random Dot Stereogram (RDS) Generation:**
   - Create red and blue dot images with precise disparity control.
   - Adjust disparity dynamically to assess fusional vergence limits.

2. **Disparity Measurement:**
   - Disparity should be quantified in arc seconds to ensure high precision.
   - Support both convergence and divergence testing.

3. **Break and Recovery Point Detection:**
   - Identify the disparity value at which fusion breaks.
   - Detect the point at which fusion is regained after break.

4. **User Interaction and Testing Workflow:**
   - Provide a method for users to respond to stimuli (e.g., keyboard/mouse input).
   - Record user responses to determine break and recovery points.

5. **Data Logging and Analysis:**
   - Store test results for analysis and comparison.
   - Optionally, generate reports for clinical or research use.

## Technologies Used

- **JavaScript**: 98.7%
- **HTML**: 1.2%
- **CSS**: 0.1%

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js
- npm (Node Package Manager)

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/Nasir-buddy/RDS-Management.git
    cd RDS-Management
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Start the development server:

    ```bash
    npm start
    ```

## Usage

After starting the development server, open your web browser and navigate to `http://localhost:3000  || or any available port will automatically select by the compiler` to access the application.

## Contributing

We welcome contributions! Please read our [Contributing Guidelines](CONTRIBUTING.md) for more information.

## Author
- Nasir Ali
