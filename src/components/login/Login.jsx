import { useNavigate } from "react-router";

export default function Login({ onLogin }) {
  const submitAction = (formdata) => {
    const email = formdata.get("email");
    const password = formdata.get("password");
    if (!email || !password) {
      alert("Email and password must be filled");
      return;
    }
    onLogin({ email, password });
  };
  return (
    // <!-- Login Page ( Only htmlFor Guest users ) -->
    <section id="login-page">
      <form id="login" action={submitAction}>
        <div className="container">
          <h1>Login</h1>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Your Email"
          />

          <label htmlFor="login-pass">Password</label>
          <input
            type="password"
            id="login-password"
            name="password"
            placeholder="Password"
          />
          <input type="submit" className="btn submit" value="Login" />
        </div>
      </form>
    </section>
  );
}
