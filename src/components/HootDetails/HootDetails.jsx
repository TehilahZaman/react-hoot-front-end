import { useParams } from "react-router";
import { useState, useEffect } from "react";
import * as hootService from "../../services/hootService";

export default function HootDetails() {
  const { hootId } = useParams();
  const [hoot, setHoot] = useState(null);

  useEffect(() => {
    async function fetchHoot() {
      // call the show function in service
      // pass in the hootId information
      const hootData = await hootService.show(hootId);
      console.log(hootData, "check data log");
      setHoot(hootData);
    }
    // call the function
    fetchHoot();
    // set -- to when the url patameter/ hoodId changes
  }, [hootId]);

  // check the hoot state
  console.log("hoot state:", hoot);
  // check the hoot id is logging/coming through
  console.log("hootId", hootId);

  if (!hoot) return <main>Loading... </main>;
  return (
    <main>
      <section>
        <header>
          <p>{hoot.category.toUpperCase()}</p>
          <h1>{hoot.title}</h1>
          <p>
            {`${hoot.author.username} posted on ${new Date(
              hoot.createdAt
            ).toLocaleDateString()}`}
          </p>
        </header>
        <p>{hoot.text}</p>
      </section>
      <section>
        <h2>comments</h2>

        {!hoot.comments.length && <p>There are no comments.</p>}
        {hoot.comments.map((comment) => (
          <article key={comment._id}>
            <header>
              <p>{`${comment.author} commented on ${new Date(
                comment.createdAt
              ).toLocaleDateString()}`}</p>
            </header>
            <p>{comment.text}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
