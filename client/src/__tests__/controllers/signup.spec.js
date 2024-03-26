const { signup } = require('../../controllers/signup');
//   it('renders correctly', () => {
//     const { getByText, getByPlaceholderText } = render(<LoginSignup />);
//     const loginHeaderText = getByText(/Login/i); // Selecting the login text inside the header
//     expect(loginHeaderText).toBeInTheDocument();
//     expect(getByPlaceholderText('Username')).toBeInTheDocument();
//     expect(getByPlaceholderText('Password')).toBeInTheDocument();
//   });

//   it('displays confirm password input when sign up is selected', () => {
//     const { getByText, getByPlaceholderText } = render(<LoginSignup />);
//     const signUpButton = getByText('Sign Up');
//     fireEvent.click(signUpButton); // Simulate selecting sign up action
//     const confirmPasswordInput = getByPlaceholderText('Confirm Password');
//     expect(confirmPasswordInput).toBeInTheDocument();
//   });
