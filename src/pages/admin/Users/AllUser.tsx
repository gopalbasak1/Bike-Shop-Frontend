import { useGetAllUserQuery } from "@/redux/features/Users/users.api";

const AllUser = () => {
  const { data } = useGetAllUserQuery(undefined);
  console.log(data);

  return <div></div>;
};

export default AllUser;
