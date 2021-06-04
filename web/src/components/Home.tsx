import useAuth from '../hooks/useAuth';
import Navbar from './nav/Navbar';

export default function Home() {
  const { currentUser } = useAuth();
  console.log(currentUser);
  return (
    <>
      <Navbar />
      <div>Hola {currentUser?.username} </div>
    </>
  );
}
