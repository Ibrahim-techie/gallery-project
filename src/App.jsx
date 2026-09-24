import axios from "axios";
import Imagecard from "./components/Imagecard";
import { useEffect, useState } from "react";
import "./custom.css";

function App() {
  const [picsurl, setpicsurl] = useState([]);
  const [page, setpage] = useState(1);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    const URL = `https://picsum.photos/v2/list?page=${page}&limit=60`;
    async function fetchImages() {
      setloading(true);
      setpicsurl([]);
      try {
        const response = await axios.get(URL);
        setpicsurl(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setloading(false);
      }
    }

    fetchImages();
  }, [page]);

  function addindex(val = null) {
    if (val !== null) {
      setpage(val);
      return;
    } else {
      if (page === 20) return;
      setpage((prev) => prev + 1);
    }
  }

  function removeindex() {
    if (page === 1) return;
    console.log(page);

    setpage((prev) => prev - 1);
  }

  return (
    <div className="bg-gray-800 h-screen w-full overflow-auto ">
      <h1 className="py-6 text-center text-4xl font-bold text-white">
        📸 Image Gallery
      </h1>
      <div>
        {loading ? (
          <div className="flex min-h-[70vh] items-center justify-center">
            <div role="status">
              <svg
                aria-hidden="true"
                className="h-12 w-12 animate-spin fill-blue-600 text-gray-300"
                viewBox="0 0 100 101"
                fill="none"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        ) : (
         <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {picsurl.map((el) => (
              <Imagecard
                key={el.id}
                download_url={el.download_url}
                author={el.author}
                url={el.url}
              />
            ))}
          </div>
        )}
      </div>

      <footer className="sticky bottom-0 bg-gray-900 py-5">
        <div className="mx-auto flex max-w-fit items-center justify-between px-6 gap-2 ">
          <nav>
            <ul className="flex -space-x-px text-xl ">
              <li>
                <a
                  href="#"
                  type="button"
                  className="flex items-center justify-center text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading font-medium rounded-s-base text-sm px-3 h-10 focus:outline-none anchor
                  "
                  onClick={() => removeindex()}
                >
                  Previous
                </a>
              </li>
              <li>
                <a
                  href="#"
                  type="button"
                  className="flex items-center justify-center text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading font-medium text-sm w-10 h-10 focus:outline-none anchor"
                  onClick={() => addindex(1)}
                >
                  1
                </a>
              </li>
              <li>
                <a
                  href="#"
                  type="button"
                  className="flex items-center justify-center text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading font-medium text-sm w-10 h-10 focus:outline-none anchor "
                  onClick={() => addindex(2)}
                >
                  2
                </a>
              </li>
              <li>
                <a
                  href="#"
                  type="button"
                  aria-current="page"
                  className="flex items-center justify-center text-fg-brand bg-neutral-tertiary-medium box-border border border-default-medium hover:text-fg-brand font-medium text-sm w-10 h-10 focus:outline-none anchor"
                  onClick={() => addindex(3)}
                >
                  3
                </a>
              </li>
              <li>
                <a
                  href="#"
                  type="button"
                  className="flex items-center justify-center text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading font-medium text-sm w-10 h-10 focus:outline-none anchor "
                  onClick={() => addindex(4)}
                >
                  4
                </a>
              </li>
              <li>
                <a
                  href="#"
                  type="button"
                  className="flex items-center justify-center text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading font-medium text-sm w-10 h-10 focus:outline-none anchor"
                  onClick={() => addindex(5)}
                >
                  5
                </a>
              </li>
              <li>
                <a
                  href="#"
                  type="button"
                  className="flex items-center justify-center text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading font-medium rounded-e-base text-sm px-3 h-10 focus:outline-none anchor"
                  onClick={() => addindex()}
                >
                  Next
                </a>
              </li>
            </ul>
          </nav>
          <p className="text-white text-xl font-semibold">Page {page} / 20</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
