import { useEffect, useState } from "react";
import Routes from "./routes/Routes";

function App() {
  const [posts, setPosts] = useState([]);
  // useEffect(() => {
  //   // Fetch data from the provided URL
  //   fetch("https://axelonepostfeature.onrender.com/api/homepage")
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error("Network response was not ok");
  //       }
  //       return response.json();
  //     })
  //     .then((data) => {
  //       console.log(data.data);
  //       setPosts(data.data.posts);

  //       // Log the fetched data then i use the dot notation to return only post array to the empti post state
  //     })
  //     .catch((error) => {
  //       console.error(
  //         "There has been a problem with your fetch operation:",
  //         error
  //       );
  //     });
  // }, []);

  return (
    <>
      <Routes />

      <div className="p-20 text-center">
        {/* {posts ? (
          posts.map((item) => {
            return (
              <div>
                <h1> {item.description} </h1>
              </div>
            );
          })
        ) : (
          <div>loading...</div>
        )} */}
      </div>
    </>
  );
}

export default App;
