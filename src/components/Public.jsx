import { Link } from "react-router-dom";

const Public = () => {
  return (
    <main className="w-full sm:px-12 px-4 py-5 min-h-[80vh]">
      <p>
        Public page
        <br />
        Pets near me
        <br />
        <Link to="/api/auth/signup">Sign up</Link> to get started. Or
        <br />
        <Link to="/api/auth/signin">Sign in</Link> if you already have an
        account.
      </p>
    </main>
  );
};

export default Public;
