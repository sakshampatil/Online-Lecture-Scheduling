import LoginForm from "../../components/auth/LoginForm";

const LoginPage = () => {
  return (
    <div className="flex h-screen bg-gray-100 items-center justify-center">
      <div className="bg-white shadow-md rounded-lg px-8 py-6 max-w-sm">
        <h1>Login</h1>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
