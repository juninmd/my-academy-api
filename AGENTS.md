# AGENTS.md – Guidelines for AI Coding Agents

These guidelines are crucial for the development and maintenance of this repository. Strict adherence is expected to ensure code quality, maintainability, and stability.

**1. DRY (Don't Repeat Yourself)**

*   All code within a single file should represent a single, well-defined concept or functionality.
*   Avoid duplicate logic or implementations.
*   When necessary, leverage existing code patterns and abstractions.
*   Favor composition over inheritance when appropriate.

**2. KISS (Keep It Simple, Stupid)**

*   Prioritize clarity and readability.
*   Strive for concise and understandable code.
*   Avoid unnecessary complexity.
*   Keep functions and classes small and focused.

**3. SOLID Principles**

*   **Single Responsibility Principle:** Each class/module should have one and only one reason to change.
*   **Open/Closed Principle:**  Code should be open for extension but closed for modification.
*   **Liskov Substitution Principle:**  Subclasses should be able to replace their base classes without altering the correctness of the program.
*   **Interface Segregation Principle:** Clients should not be forced to use interfaces they do not require.
*   **Dependency Inversion Principle:** High-level modules should not depend on low-level modules; they should depend on abstractions.

**4. YAGNI (You Aren't Gonna Need It)**

*   Implement only the necessary functionality.
*   Avoid adding features or code that is not currently required.
*   Refactor only when necessary and with a clear understanding of the existing system.
*   Focus on the essential requirements.

**5. Code Quality & Structure**

*   **Naming Conventions:** Use consistent naming conventions (e.g., snake\_case).  All functions and classes should have descriptive names.
*   **Comments:** Provide clear and concise comments to explain complex logic or non-obvious decisions. Do not over-comment.
*   **Code Formatting:**  Adhere to a consistent code style using a formatter (e.g., Prettier, Black).
*   **Error Handling:** Implement robust error handling to gracefully manage unexpected situations.
*   **Logging:** Implement consistent logging practices for debugging and monitoring.

**6. File Length Constraint (180 lines max)**

*   Each file shall not exceed 180 lines of code.  Code should be easily readable and maintainable.

**7. Test Coverage Requirements (80% Minimum)**

*   All code must undergo rigorous testing.
*   A minimum of 80% of the code should be covered by unit tests.
*   Test cases should cover all critical functionality and edge cases.
*   Test cases should be designed to accurately reflect the intended behavior.

**8.  Development Workflow**

*   **Pull Request Review:** All changes must be reviewed by at least two team members before merging.
*   **Code Review:** Conduct regular code reviews to ensure quality and consistency.
*   **Unit Testing:**  Ensure comprehensive unit tests are written and executed for each function and class.
*   **Static Analysis:** Utilize static analysis tools (e.g., SonarQube) to identify potential bugs and code style violations.
*   **Continuous Integration:** Integrate code into a continuous integration pipeline for automated testing and build processes.

**9.  Specific Requirements (Example - Adapt as Needed)**

*   **Data Structures:**  Use appropriate data structures for specific tasks (e.g., dictionaries for lookups, sets for unique elements).
*   **Algorithms:**  Select efficient algorithms and data structures.
*   **API Design:**  Follow established API design principles (e.g., RESTful principles).
*   **Documentation:**  Include clear and concise documentation for APIs and core components.

**10.  Maintainability Considerations**

*   **Modularity:** Divide the system into manageable modules with well-defined interfaces.
*   **Abstraction:**  Use abstraction to hide implementation details and provide a simplified interface to the core logic.
*   **Versioning:**  Implement a versioning strategy to manage code changes and maintain compatibility.

These guidelines are intended to promote a high-quality and maintainable AGENTS.md repository.  Developers are expected to understand and adhere to these principles.