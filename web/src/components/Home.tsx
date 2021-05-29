import useAuth from '../hooks/useAuth';

export default function Home() {
  const { currentUser } = useAuth();
  console.log(currentUser);
  return <div>Hola {currentUser?.username} </div>;
}
