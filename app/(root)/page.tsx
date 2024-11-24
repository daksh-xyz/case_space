import SearchForm from "@/components/SearchForm";
import IdeaCard, { IdeaTypeCard } from "@/components/IdeaCard";
import { IDEAS_QUERY } from "@/sanity/lib/queries";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { auth } from "@/auth";

export default async function Home({ searchParams }: { searchParams: Promise<{ query: string }>}) {
  const query = (await searchParams).query;
  const params = { search: query || null };

  const session = await auth();

  console.log(session?.id)

  const { data: posts } = await sanityFetch({query: IDEAS_QUERY, params})

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
          posts.map((post: IdeaTypeCard ) => (
            <IdeaCard key={post?._id} post={post} />
          ))
        ) : (
            <p className="no-results">No such ideas found</p>
        )}
      </ul>

    </section>
    <SanityLive />
    </>
  );
}
