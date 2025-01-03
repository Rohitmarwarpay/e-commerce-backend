import User from "../models/User6.model.js"; // Ensure you have the correct path and '.js' if using ES modules

export class Validator6 {
  /**
   * Validates input fields
   * - Fields shouldn't be empty
   * - Email should follow a valid format
   */
  inputValidation(inputs) {
    const arrayOfInputs = Object.keys(inputs);
    // console.log("In validator");
    // console.log(inputs);

    for (let i = 0; i < arrayOfInputs.length; i++) {
      const inputKey = arrayOfInputs[i];
      const input = inputs[inputKey];

      // Check if input is empty
      if (!input) {
        return {
          isInputValid: false,
          msg: `${inputKey} field cannot be empty`, // Corrected to show field name instead of input value
        };
      }

      // Check if email is valid
      if (inputKey === "email") {
        const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!emailRegex.test(input)) {
          return {
            isInputValid: false,
            msg: "Email address is not valid",
          };
        }
      }
    }

    return {
      isInputValid: true,
    };
  }

  /**
   * Fetches a user from the database based on email
   * @param {string} email - The user's email
   * @param {object} options - Options object containing `attempt` (either 'logIn' or 'signUp')
   */
  async getUser(email, { attempt }) {
    const user = await User.findOne({ email });

    if (user) {
      if (attempt === "logIn") {
        return {
          isNewUserEntry: false,
          userData: user,
          msg: "User exists. Proceed to login.",
        };
      } else {
        return {
          isNewUserEntry: false,
          userData: user,
          msg: "User already exists. Try signing up with another email.",
        };
      }
    } else {
      if (attempt === "logIn") {
        return {
          isNewUserEntry: true,
          userData: null,
          msg: "User does not exist.",
        };
      } else {
        return {
          isNewUserEntry: true,
          userData: null,
          msg: "Email not found. You can sign up.",
        };
      }
    }
  }
}
