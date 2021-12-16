import { useRouter } from "next/router";

const ParamPage = () => {
  const router = useRouter();
  return (
    <div>
      <h1>Hello from page with param</h1>
      <code>provided param is: {router.query.id}</code>
    </div>
  );
};

export default ParamPage;
