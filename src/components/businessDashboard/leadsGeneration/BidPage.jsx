// import { Button } from "@chakra-ui/react"

import { useEffect, useState } from "react";

const people = [
  {
    amount: "1000",
    email: "leslie.alexander@example.com",
    role: "Co-Founder / CEO",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    lastSeen: "3h ago",
    lastSeenDateTime: "2023-01-23T13:23Z",
  },
  {
    amount: "2000",
    email: "michael.foster@example.com",
    role: "Co-Founder / CTO",
    imageUrl:
      "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    lastSeen: "3h ago",
    lastSeenDateTime: "2023-01-23T13:23Z",
  },
  {
    amount: "1500",
    email: "dries.vincent@example.com",
    role: "Business Relations",
    imageUrl:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    lastSeen: null,
  },
  {
    amount: "1456",
    email: "lindsay.walton@example.com",
    role: "Front-end Developer",
    imageUrl:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    lastSeen: "3h ago",
    lastSeenDateTime: "2023-01-23T13:23Z",
  },
  {
    amount: "2678",
    email: "courtney.henry@example.com",
    role: "Designer",
    imageUrl:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    lastSeen: "3h ago",
    lastSeenDateTime: "2023-01-23T13:23Z",
  },
  {
    amount: "T2679",
    email: "tom.cook@example.com",
    role: "Director of Product",
    imageUrl:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    lastSeen: null,
  },
];

function BidPage() {
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState("");

  const [leads, setLeads] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // const (data) props.location;
  const BASE_URL = "https://test-api.fyndah.com/api/v1/search/requests/9/bid";
  useEffect(function () {
    async function fetchLeads() {
      try {
        setIsLoading(true);
        const res = await fetch(BASE_URL, {
          method: "GET",
          // body: JSON.stringify(newCity), // Used in post requests.
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FwaS5meW5kYWguY29tL2FwaS92MS9hdXRoL2xvZ2luIiwiaWF0IjoxNzE3Nzg3NzAyLCJleHAiOjE3MTc3OTEzMDIsIm5iZiI6MTcxNzc4NzcwMiwianRpIjoiWW1TaVI4MHN2TUFkbmwxRyIsInN1YiI6IjM1IiwicHJ2IjoiMjNiZDVjODk0OWY2MDBhZGIzOWU3MDFjNDAwODcyZGI3YTU5NzZmNyJ9.T5pIwLEmEF-Iga6EMCz7n_G_QOSLWNSGweBCUgpqtvA`,
          },
        });

        const data = await res.json();
        setLeads(data);
        console.log(leads);
      } catch {
        // alert("There was an Error loading data");
      } finally {
        setIsLoading(false);
      }
    }
    fetchLeads();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    await fetch(`https://test-api.fyndah.com/api/v1/search/requests/:activesearchrequestId/bid`, {
      method: "POST",
      body: JSON.stringify({ bid_amount: amount }), // Used in post requests.
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FwaS5meW5kYWguY29tL2FwaS92MS9hdXRoL2xvZ2luIiwiaWF0IjoxNzE3Nzg3NzAyLCJleHAiOjE3MTc3OTEzMDIsIm5iZiI6MTcxNzc4NzcwMiwianRpIjoiWW1TaVI4MHN2TUFkbmwxRyIsInN1YiI6IjM1IiwicHJ2IjoiMjNiZDVjODk0OWY2MDBhZGIzOWU3MDFjNDAwODcyZGI3YTU5NzZmNyJ9.T5pIwLEmEF-Iga6EMCz7n_G_QOSLWNSGweBCUgpqtvA`,
      },
    });
  }

  return (
    <div className="flex flex-col items-center justify-center mt-48">
      <h1 className="mb-48 mt-32 text-yellow px-20 py-2 text-4xl font-black bg-fixed mx-auto bg-stone-300 fixed top-0 h-20 rounded-full">
        This is the Bidding Information Page
      </h1>
      <div className="mb-6">
        {!open && (
          <button
            onClick={() => setOpen(true)}
            className="bg-stone-400 font-black px-1 py-0 rounded-2xl"
          >
            {open ? "Close Bid form" : "Open Bid form"}
          </button>
        )}
      </div>

      {open && (
        <form>
          <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <img
                className="mx-auto h-10 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt="Company Logo"
              />
              <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Please Place your Bid
              </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form
                onSubmit={handleSubmit}
                className="space-y-6"
                action="#"
                method="POST"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Bid
                    </label>
                    <div className="text-sm">
                      <a
                        href="#"
                        className="font-semibold text-indigo-600 hover:text-indigo-500"
                      >
                        Learn how bids work
                      </a>
                    </div>
                  </div>
                  <div className="mt-2">
                    <input
                      id="number"
                      name="number"
                      type="number"
                      value="200"
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="Enter bid amount"
                      autoComplete="current-password"
                      required
                      // disabled={isLoading}
                      disabled="true"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                  {/* The Bid Amount is Fixed */}
                  <p>You are about to place a bid of $200 USD</p>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Place Bid
                  </button>
                </div>
              </form>

              <p className="mt-10 text-center text-sm text-gray-500">
                {/* <p
                href="#"
                className="bg-slate-300 font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
              >
                Close Bid Form
              </p> */}
                <button
                  onClick={() => setOpen(false)}
                  className="text-lg bg-yellow-400 font-black px-1 py-0 rounded-2xl"
                >
                  {open ? "Close Bid Form" : "Open Bid Form"}
                </button>
              </p>
            </div>
          </div>
        </form>
      )}

      {/* Now the list of available bids */}
      <h2 className="mt-10 text-blue-300 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Currently Available Bids for this Request
      </h2>
      <ul role="list" className="divide-y divide-gray-100">
        <p></p>
        {people.map((person) => (
          <li key={person.email} className="flex justify-between gap-x-6 py-5">
            <div className="flex min-w-0 gap-x-4">
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-gray-900 font-black">
                  Bid Amount: ${person.amount} USD
                </p>
                {/* <p className="mt-1 truncate text-xs leading-5 text-gray-500">{person.email}</p> */}
              </div>
            </div>
            <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
              {
                <p className="text-sm leading-6 text-gray-900">
                  Bid Status: {}
                </p>
              }
              {/* <Button>Pay for Bid</Button> */}
            </div>
          </li>
        ))}
      </ul>

      {/* Make a bide a sort drop down form */}
      {/* It shoulbe be a form to receive the users input and send it to the database. 
                        This form would hlawaays be available incse that user wants to make a bid that is change his previous ammount
                       Show active bids shpuld be a list of bid that are currently active with prices showing beside them  */}

      {/* show the bid status bside the amount of the list */}

      {/*  */}
    </div>
  );
}

export default BidPage;
