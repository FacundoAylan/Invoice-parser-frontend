import { Footer, ImageUploader, InvoiceList, Loading, Navbar } from "./components";
import { usePost } from "./hook/useFetch";
import type { ImagePayload } from "./types/image";
import type { InvoiceData } from "./types/invoice";

function App() {

  const { execute, data, loading, error } = usePost<
    InvoiceData[],
    ImagePayload[]
  >("http://localhost:3000/api/v1/invoice");

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <h1>Hubo un error</h1>;
  }


  return (
    <div className="flex flex-col h-screen bg-gray-800">
      <Navbar />

      <main className="flex-1 min-h-0 flex">
        {data ? (
          <InvoiceList invoices={data??[]} />
        ) : (
          <ImageUploader
            execute={execute}
            data={data}
            loading={loading}
            error={error}
          />
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;
