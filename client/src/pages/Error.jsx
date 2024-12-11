// import error routing component
import { useRouteError } from "react-router-dom";
// mod 20 act 24
export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>An unexpected error has occurred. Please try again later.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
