import { useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";

export const loader = async () => {
  return json({ id: 1, name: "hoge" });
};

export default function Page() {
  const data = useLoaderData<{ id: number; name: string }>();
  return (
    <div>
      <h1>Sample Page</h1>
      <p>id: {data.id}</p>
      <p>name: {data.name}</p>
    </div>
  );
}
