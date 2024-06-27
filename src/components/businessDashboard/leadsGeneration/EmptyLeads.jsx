import LinkButton from "./LinkButton";

function EmptyLeads({posts, data}) {
  return (
    <div className="flex flex-col items-center justify-center mt-24 px-4 py-3 ">
      <LinkButton to= {posts}>&larr; Back to the Search Request Page</LinkButton>

      <p className="mt-7 font-semibold"> {data} </p>
    </div>
  );
}

export default EmptyLeads;
