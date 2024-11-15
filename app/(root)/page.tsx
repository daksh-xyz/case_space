import Image from "next/image";
import SearchForm from "@/components/SearchForm";
import IdeaCard from "@/components/IdeaCard";

export default async function Home({ searchParams }: { searchParams: Promise<{ query: string }>}) {
  const query = (await searchParams).query;

  const posts = [{
    _createdAt: new Date(),
    views: 55,
    author: { _id: 1, name: "Daksh Lal" },
    _id: 1,
    description: "Gay",
    image: "https://placeholder.com/600x400",
    category: "Robots",
    title: "We Robots"
  },]

  return (
    <>
    <section className="pink_container">
      <h1 className="heading">Pitch Your Idea, <br /> Connect with Developers</h1>
      <p className="sub-heading !max-w-3xl">
        Submit Ideas, Vote on Projects, and Get Noticed in Virtual Showcases.
      </p>
      <SearchForm query={query} />
    </section>

    <section className="section_container">
      <p className="text-30-semibold">
        {query ? `Search reults for "${query}"` : 'All Project Ideas'}
      </p>

      <ul className="mt-7 card_grid">
        {posts?.length > 0 ? (
          posts.map((post: IdeaCardType, index: number) => (
            <IdeaCard key={post?._id} post={post} />
          ))
        ) : (
            <p className="no-results">No such ideas found</p>
        )}
      </ul>

    </section>
    </>
  );
}
